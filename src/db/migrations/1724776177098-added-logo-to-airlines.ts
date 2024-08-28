import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedLogoToAirlines1724776177098 implements MigrationInterface {
    name = 'AddedLogoToAirlines1724776177098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airlines" ADD "logo" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airlines" DROP COLUMN "logo"`);
    }

}
