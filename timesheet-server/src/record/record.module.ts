import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from 'src/schemas/Schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';

@Module({
  controllers: [RecordController],
  providers: [RecordService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([
      {
        name: Record.name,
        schema: RecordSchema,
      },
    ]),
    JwtModule,
  ],
})
export class RecordModule {}
