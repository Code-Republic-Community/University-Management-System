import { UpdateResult } from 'typeorm';
import { ExamService } from './exam.service';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateExamDto } from './dto/create-exam.dto';
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
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ExamEntity } from './entities/exam.entity';

@ApiTags('exams')
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created Exam' })
  @ApiBadRequestResponse({ description: 'Invalid Date' })
  async create(@Body() createExamDto: CreateExamDto): Promise<ExamEntity> {
    return await this.examService.createExam(createExamDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Exams Array' })
  async getExams(): Promise<ExamEntity[]> {
    return await this.examService.getAllExams();
  }
  @Get(':id')
  @ApiOkResponse({ description: 'Exam' })
  @ApiNotFoundResponse({ description: 'Exam Not Found' })
  async getExamById(@Param('id') id: string): Promise<ExamEntity> {
    return await this.examService.getExamById(id);
  }
  @Get('student/:studentId')
  @ApiOkResponse({ description: 'Student Exams Array' })
  @ApiNotFoundResponse({ description: 'Exams Not Found' })
  async getStudentExams(
    @Param('studentId') studentId: string,
  ): Promise<ExamEntity[]> {
    return await this.examService.getStudentExams(studentId);
  }
  @Put(':id')
  @ApiOkResponse({ description: 'Affected' })
  @ApiNotFoundResponse({ description: 'Exam Not Found' })
  async updateExam(
    @Param('id') id: string,
    @Body() exam: UpdateExamDto,
  ): Promise<UpdateResult> {
    return await this.examService.updateExam(id, exam);
  }
  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Exam Not Found' })
  async deleteExam(@Param('id') id: string): Promise<void> {
    return await this.examService.deleteExam(id);
  }
}
