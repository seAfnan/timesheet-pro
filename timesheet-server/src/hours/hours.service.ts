import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WeekHours } from 'src/schemas/Schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

@Injectable()
export class HoursService {
  constructor(
    @InjectModel(WeekHours.name) private weekHourModel: Model<WeekHours>,
    private jwtService: JwtService,
  ) {}

  async create(createHourDto: CreateHourDto) {
    const data = await this.weekHourModel.findOne({
      week: createHourDto.week,
    });
    if (data) {
      throw new ConflictException('Week Hours already exists');
    }
    const response = await this.weekHourModel.create(createHourDto);
    return response;
  }

  async findAll() {
    const data = await this.weekHourModel.find();
    return data;
  }

  async findOne(id: string) {
    const data = await this.weekHourModel.findById(id);
    if (!data) {
      throw new NotFoundException(`Week Hours #${id} not found`);
    }
    return data;
  }
  async update(id: string, updateHourDto: UpdateHourDto) {
    const updatedProject = await this.weekHourModel.findByIdAndUpdate(
      id,
      updateHourDto,
      { new: true },
    );
    if (!updatedProject) {
      throw new NotFoundException(`Week Hours #${id} not found`);
    }
    return updatedProject;
  }

  async remove(id: string) {
    const project = await this.weekHourModel.findByIdAndDelete(id);
    if (!project) {
      throw new NotFoundException(`Week Hours #${id} not found`);
    }
    return `Week Hours #${id} has been removed`;
  }
}
