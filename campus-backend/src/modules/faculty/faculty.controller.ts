import { UpdateResult } from 'typeorm';
import { FacultyService } from './faculty.service';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FacultyEntity } from './entities/faculty.entity';

@Controller('faculties')
@ApiTags('faculties')
export class FacultyController {
  constructor(private readonly examService: FacultyService) {}

  @ApiCreatedResponse({ description: 'Created Exam' })
  @ApiBadRequestResponse({ description: 'Invalid Date' })
  @Post()
  async create(
    @Body() createFacultyDto: CreateFacultyDto,
  ): Promise<FacultyEntity> {
    return await this.examService.createFaculty(createFacultyDto);
  }

  @ApiOkResponse({ description: 'Faculties Array' })
  @Get()
  async getFaculties(): Promise<FacultyEntity[]> {
    return await this.examService.getAllFaculties();
  }

  @ApiOkResponse({ description: 'Faculty' })
  @ApiNotFoundResponse({ description: 'Faculty Not Found' })
  @Get(':id')
  async getFacultyById(@Param('id') id: string): Promise<FacultyEntity> {
    return await this.examService.getFacultyById(id);
  }

  @ApiOkResponse({ description: 'Student Faculty Array' })
  @ApiNotFoundResponse({ description: 'Faculty Not Found' })
  @Get(':studentId')
  async getStudentFaculties(
    @Param('studentId') studentId: string,
  ): Promise<FacultyEntity[]> {
    return await this.examService.getStudentFaculties(studentId);
  }

  @ApiOkResponse({ description: 'Affected' })
  @ApiNotFoundResponse({ description: 'Faculty Not Found' })
  @Put(':id')
  async updateFaculty(
    @Param('id') id: string,
    @Body() exam: UpdateFacultyDto,
  ): Promise<UpdateResult> {
    return await this.examService.updateFaculty(id, exam);
  }

  @ApiOkResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Faculty Not Found' })
  @Delete(':id')
  async deleteFaculty(@Param('id') id: string): Promise<void> {
    return await this.examService.deleteFaculty(id);
  }
}
