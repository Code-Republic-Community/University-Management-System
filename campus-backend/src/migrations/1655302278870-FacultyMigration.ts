import { MigrationInterface, QueryRunner } from 'typeorm';

export class FacultyMigration1655302278870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "faculties" RENAME COLUMN "faculty_name" TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "faculties" RENAME COLUMN "name" TO "faculty_name"`,
    );
  }
}
