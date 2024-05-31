import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HoursService } from './hours.service';
import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('hours')
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Post()
  create(@Body() createHourDto: CreateHourDto) {
    return this.hoursService.create(createHourDto);
  }

  @Get()
  findAll() {
    return this.hoursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hoursService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHourDto: UpdateHourDto) {
    return this.hoursService.update(id, updateHourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hoursService.remove(id);
  }
}
