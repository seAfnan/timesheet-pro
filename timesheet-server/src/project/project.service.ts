import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/schemas/Schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private jwtService: JwtService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectModel.findOne({
      name: createProjectDto.name,
    });
    if (project) {
      throw new ConflictException('Project already exists');
    }
    const newProject = await this.projectModel.create(createProjectDto);
    return newProject;
  }

  async findAll() {
    const projects = await this.projectModel.find();
    return projects;
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectDto,
      { new: true },
    );
    if (!updatedProject) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return updatedProject;
  }

  async remove(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id);
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return `Project #${id} has been removed`;
  }
}
