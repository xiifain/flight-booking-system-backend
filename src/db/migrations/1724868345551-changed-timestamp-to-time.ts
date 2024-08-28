import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedTimestampToTime1724868345551 implements MigrationInterface {
    name = 'ChangedTimestampToTime1724868345551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "departure_time"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "departure_time" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "arrival_time"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "arrival_time" TIME NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "arrival_time"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "arrival_time" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "departure_time"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "departure_time" TIMESTAMP NOT NULL`);
    }

}
