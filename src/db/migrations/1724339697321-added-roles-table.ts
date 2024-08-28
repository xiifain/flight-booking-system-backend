import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRolesTable1724339697321 implements MigrationInterface {
  name = 'AddedRolesTable1724339697321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "role" character varying(20) NOT NULL DEFAULT 'GENERAL USER'`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "CHK_07f10537ee56a5cb9c86552b19" CHECK (role IN ('GENERAL USER', 'ADMIN'))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP CONSTRAINT "CHK_07f10537ee56a5cb9c86552b19"`,
    );
    await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "role"`);
  }
}
