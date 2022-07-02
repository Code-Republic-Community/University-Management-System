import { MigrationInterface, QueryRunner } from 'typeorm';

export class DepartmentMigration1655302335616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "departments" RENAME COLUMN "department_name" TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "departments" RENAME COLUMN "name" TO "department_name"`,
    );
  }
}
