import { IsNumber, IsString } from 'class-validator';

export class CreateHourDto {
  @IsString()
  week: string;

  @IsNumber()
  hours: Number;
}
