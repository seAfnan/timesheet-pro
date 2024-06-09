import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

enum Status {
  SELECTED = 'SELECTED',
  CHALLENGED = 'CHALLENGED',
}

class DetailDto {
  @IsString()
  projectType: string;

  @IsString()
  project: string;

  @IsString()
  task: string;

  @IsNumber()
  monday: number;

  @IsNumber()
  tuesday: number;

  @IsNumber()
  wednesday: number;

  @IsNumber()
  thursday: number;

  @IsNumber()
  friday: number;

  @IsNumber()
  saturday: number;

  @IsNumber()
  sunday: number;
}

export class CreateRecordDto {
  @IsString()
  employee: string;

  @IsNumber()
  year: number;

  @IsString()
  week: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailDto)
  details: DetailDto[];

  @IsNumber()
  committedHours: number;

  @IsNumber()
  totalHours: number;

  @IsNumber()
  overtime: number;

  @IsString()
  assignee: string;

  @IsString()
  assigneeEmail: string;

  @IsEnum(Status)
  status: Status;
}
