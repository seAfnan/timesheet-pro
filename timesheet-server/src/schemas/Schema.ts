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
