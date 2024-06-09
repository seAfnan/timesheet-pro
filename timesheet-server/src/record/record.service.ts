import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Record } from 'src/schemas/Schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<Record>,
    private jwtService: JwtService,
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    const data = await this.recordModel.findOne({
      week: createRecordDto.week,
    });
    if (data) {
      throw new ConflictException('Week Record already exists');
    }
    const newRecord = await this.recordModel.create(createRecordDto);
    return newRecord;
  }

  async findAll() {
    const data = await this.recordModel.find();
    return data;
  }

  async findOne(id: string) {
    const data = await this.recordModel.findById(id);
    if (!data) {
      throw new NotFoundException(`Week Record #${id} not found`);
    }
    return data;
  }

  async update(id: string, updateRecordDto: UpdateRecordDto) {
    const data = await this.recordModel.findByIdAndUpdate(id, updateRecordDto, {
      new: true,
    });
    if (!data) {
      throw new NotFoundException(`Week Record #${id} not found`);
    }
    return data;
  }

  async remove(id: string) {
    const data = await this.recordModel.findByIdAndDelete(id);
    if (!data) {
      throw new NotFoundException(`Week Record #${id} not found`);
    }
    return `Week Record #${id} has been removed`;
  }
}
