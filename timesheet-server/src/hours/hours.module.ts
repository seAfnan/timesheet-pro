import { Module } from '@nestjs/common';
import { HoursService } from './hours.service';
import { HoursController } from './hours.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { WeekHours, WeekHourSchema } from 'src/schemas/Schema';

@Module({
  controllers: [HoursController],
  providers: [HoursService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([
      {
        name: WeekHours.name,
        schema: WeekHourSchema,
      },
    ]),
    JwtModule,
  ],
})
export class HoursModule {}
