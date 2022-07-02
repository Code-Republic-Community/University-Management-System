import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { FacultyEntity } from './entities/faculty.entity';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(FacultyEntity)
    private readonly facultyRepository: Repository<FacultyEntity>,
  ) {}

  async createFaculty(
    createFacultyDto: CreateFacultyDto,
  ): Promise<FacultyEntity> {
    return await this.facultyRepository
      .save(createFacultyDto)
      .then((newFaculty: FacultyEntity) => {
        return newFaculty;
      });
  }
  async getAllFaculties(): Promise<FacultyEntity[]> {
    return await this.facultyRepository.find();
  }
  async getFacultyById(id: string): Promise<FacultyEntity> {
    return await this.facultyRepository
      .findOne(id)
      .then((faculty: FacultyEntity) => {
        if (!faculty) {
          throw new HttpException('Faculty Not Found', HttpStatus.NOT_FOUND);
        }
        return faculty;
      });
  }
  async getStudentFaculties(studentId: string): Promise<FacultyEntity[]> {
    return await this.facultyRepository.find({
      where: { studentId },
    });
  }
  async updateFaculty(
    id: string,
    faculty: UpdateFacultyDto,
  ): Promise<UpdateResult> {
    await this.getFacultyById(id);
    return await this.facultyRepository.update(id, faculty);
  }
  async deleteFaculty(id: string): Promise<void> {
    await this.getFacultyById(id);
    await this.facultyRepository.delete(id);
  }
}
