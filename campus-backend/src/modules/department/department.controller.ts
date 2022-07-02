import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-departament.dto';
import { DepartmentService } from './department.service';
import { DepartmentEntity } from './entities/department.entity';
import { UpdateDepartmentDto } from './dto/update-departament.dto';

ApiTags('departments');
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Department created' })
  @ApiBadRequestResponse({ description: 'Invalid Date' })
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentEntity> {
    return await this.departmentService.createDepartment(createDepartmentDto);
  }
  @Get()
  @ApiOkResponse({ description: 'Departments Array' })
  async getDepartments(): Promise<DepartmentEntity[]> {
    return await this.departmentService.getAllDepartments();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Department' })
  @ApiNotFoundResponse({ description: 'Department Not Found' })
  async getDepartmentById(@Param('id') id: string): Promise<DepartmentEntity> {
    return await this.departmentService.getDepartmentById(id);
  }

  @Get(':departmentID')
  @ApiOkResponse({ description: 'Student Exams Array' })
  @ApiNotFoundResponse({ description: 'Departments Not Found' })
  @ApiOkResponse({ description: 'Exam' })
  @ApiNotFoundResponse({ description: 'Exam Not Found' })
  async getFacultyDepartments(
    @Param('departmentID') studentID: string,
  ): Promise<DepartmentEntity[]> {
    return await this.departmentService.getFacultyDepartments(studentID);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Affected' })
  @ApiNotFoundResponse({ description: 'Department Not Found' })
  async updateDepartment(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    return await this.departmentService.updateDepartment(
      id,
      updateDepartmentDto,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Department  Not Found' })
  async deleteDepartment(@Param('id') id: string): Promise<void> {
    return await this.departmentService.deleteDepartment(id);
  }
}
