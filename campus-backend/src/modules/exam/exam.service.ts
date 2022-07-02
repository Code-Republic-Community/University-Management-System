import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamEntity } from './entities/exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
  ) {}

  async createExam(createExamDto: CreateExamDto): Promise<ExamEntity> {
    const { schedule } = createExamDto;
    const validDate = await this.validateExamDate(schedule);
    if (!validDate) {
      throw new HttpException('invalid date', HttpStatus.BAD_REQUEST);
    }
    return await this.examRepository
      .save(createExamDto)
      .then((newExam: ExamEntity) => {
        return newExam;
      });
  }
  async getAllExams(): Promise<ExamEntity[]> {
    return await this.examRepository.find();
  }
  async getExamById(id: string): Promise<ExamEntity> {
    return await this.examRepository.findOne(id).then((exam: ExamEntity) => {
      if (!exam) {
        throw new HttpException('Exam Not Found', HttpStatus.NOT_FOUND);
      }
      return exam;
    });
  }
  async getStudentExams(studentId: string): Promise<ExamEntity[]> {
    return await this.examRepository.find({
      where: { studentId },
    });
  }
  async updateExam(id: string, exam: UpdateExamDto): Promise<UpdateResult> {
    await this.getExamById(id);
    return await this.examRepository.update(id, exam);
  }
  async deleteExam(id: string): Promise<void> {
    await this.getExamById(id);
    await this.examRepository.delete(id);
  }

  async validateExamDate(schedule: string): Promise<boolean> {
    const time: Date = new Date(schedule);
    const now: Date = new Date();
    return now <= time;
  }
}
