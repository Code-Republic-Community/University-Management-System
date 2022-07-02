import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateDepartmentDto } from './dto/update-departament.dto';
import { CreateDepartmentDto } from './dto/create-departament.dto';
import { DepartmentEntity } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentEntity> {
    const { schedule } = createDepartmentDto;
    const validDate = await this.validateDepartmentDate(schedule);
    if (!validDate) {
      throw new HttpException('invalid date', HttpStatus.FORBIDDEN);
    }
    return await this.departmentRepository
      .save(createDepartmentDto)
      .then((newDepartment: DepartmentEntity) => {
        return newDepartment;
      });
  }
  async getAllDepartments(): Promise<DepartmentEntity[]> {
    return await this.departmentRepository.find();
  }
  async getDepartmentById(id: string): Promise<DepartmentEntity> {
    return await this.departmentRepository
      .findOne(id)
      .then((department: DepartmentEntity) => {
        if (!department) {
          throw new HttpException('Department Not Found', HttpStatus.NOT_FOUND);
        }
        return department;
      });
  }
  async getFacultyDepartments(studentID: string): Promise<DepartmentEntity[]> {
    return await this.departmentRepository.find({
      where: { studentID },
    });
  }
  async updateDepartment(
    id: string,
    department: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    await this.getDepartmentById(id);
    return await this.departmentRepository.update(id, department);
  }
  async deleteDepartment(id: string): Promise<void> {
    await this.getDepartmentById(id);
    await this.departmentRepository.delete(id);
  }
  async validateDepartmentDate(schedule: string): Promise<boolean> {
    const time: Date = new Date(schedule);
    const now: Date = new Date();
    return now <= time;
  }
}
