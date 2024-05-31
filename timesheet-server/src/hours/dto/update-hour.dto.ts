import { PartialType } from '@nestjs/mapped-types';
import { CreateHourDto } from './create-hour.dto';

export class UpdateHourDto extends PartialType(CreateHourDto) {}
