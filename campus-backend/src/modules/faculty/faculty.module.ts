import { FacultyService } from './faculty.service';
import { Module } from '@nestjs/common';
import { FacultyController } from './faculty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultyEntity } from './entities/faculty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FacultyEntity])],
  controllers: [FacultyController],
  providers: [FacultyService],
})
export class FacultyModule {}
