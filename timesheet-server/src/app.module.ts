import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { HoursModule } from './hours/hours.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    ProjectModule,
    HoursModule,
    RecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
