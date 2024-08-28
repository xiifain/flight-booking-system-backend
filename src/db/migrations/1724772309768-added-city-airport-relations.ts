import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCityAirportRelations1724772309768 implements MigrationInterface {
    name = 'AddedCityAirportRelations1724772309768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airports" ADD "city_id" integer`);
        await queryRunner.query(`ALTER TABLE "airports" ADD CONSTRAINT "FK_35db242a805855ae374834fd9f8" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airports" DROP CONSTRAINT "FK_35db242a805855ae374834fd9f8"`);
        await queryRunner.query(`ALTER TABLE "airports" DROP COLUMN "city_id"`);
    }

}
