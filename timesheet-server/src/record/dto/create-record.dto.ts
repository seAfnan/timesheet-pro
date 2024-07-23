import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_APPROVAL = 'WAITING_APPROVAL',
  CHALLENGED = 'CHALLENGED',
  CLOSED = 'CLOSED',
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

  @IsEmail()
  email: string;

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

  @IsEmail()
  assigneeEmail: string;

  @IsEnum(Status)
  status: Status;

  @IsString()
  mondayComment: string;

  @IsString()
  tuesdayComment: string;

  @IsString()
  wednesdayComment: string;

  @IsString()
  thursdayComment: string;

  @IsString()
  fridayComment: string;

  @IsString()
  saturdayComment: string;

  @IsString()
  sundayComment: string;
}
