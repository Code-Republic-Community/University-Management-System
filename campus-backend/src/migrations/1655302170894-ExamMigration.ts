import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExamMigration1655302170894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exams" RENAME COLUMN "subject_name" TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exams" RENAME COLUMN "name" TO "subject_name"`,
    );
  }
}
