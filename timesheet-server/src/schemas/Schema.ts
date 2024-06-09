import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Auth {
  @Prop({ required: false })
  name?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);

@Schema({ timestamps: true })
export class WeekHours {
  @Prop({ required: true })
  week: string;

  @Prop({ required: true })
  hours: string;
}
export const WeekHourSchema = SchemaFactory.createForClass(WeekHours);

// Detail Schema
@Schema()
export class Detail {
  @Prop({ required: true })
  projectType: string;

  @Prop({ required: true })
  project: string;

  @Prop({ required: true })
  task: string;

  @Prop({ required: true })
  monday: number;

  @Prop({ required: true })
  tuesday: number;

  @Prop({ required: true })
  wednesday: number;

  @Prop({ required: true })
  thursday: number;

  @Prop({ required: true })
  friday: number;

  @Prop({ required: true })
  saturday: number;

  @Prop({ required: true })
  sunday: number;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);

enum Status {
  SELECTED = 'SELECTED',
  CHALLENGED = 'CHALLENGED',
}

// Main Record Schema
@Schema({ timestamps: true })
export class Record {
  @Prop({ required: true })
  employee: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  week: string;

  @Prop({ required: true, type: [DetailSchema] })
  details: Detail[];

  @Prop({ required: true })
  committedHours: number;

  @Prop({ required: true })
  totalHours: number;

  @Prop({ required: true })
  overtime: number;

  @Prop({ required: false })
  assignee: string;

  @Prop({ required: false })
  assigneeEmail: string;

  @Prop({ required: true, enum: Status })
  status: Status;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
