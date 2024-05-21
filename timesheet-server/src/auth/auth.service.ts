import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/schemas/Schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const oneDayInMillis = 24 * 60 * 60 * 1000;
const EXPIRE_TIME = new Date().getTime() + oneDayInMillis;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const user = await this.authModel.findOne({
      email: createAuthDto.email,
    });
    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await hash(createAuthDto.password, 10);
    const newUser = await this.authModel.create({
      ...createAuthDto,
      password: hashedPassword,
    });

    const { password, ...result } = newUser.toObject();
    return result;
  }

  /* async login(loginDto: LoginDto) {
    const user = await this.authModel.findOne({ email: loginDto.email });
    if (user && (await compare(loginDto.password, user.password))) {
      const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      return {
        user,
        backendToken: {
          accessKey: await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
            secret: process.env.JWT_SECRET,
          }),
          expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        },
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  } */

  // This is just for testing purposes when use LocalAuthGuard
  async login(user: Auth) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
        email: user.email,
      },
    };

    return {
      ...user,
      backendToken: {
        accessKey: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
          secret: process.env.JWT_SECRET,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.authModel.findOne({ email: email });
    console.log(password);
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
}
