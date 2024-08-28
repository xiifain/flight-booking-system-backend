import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedBookings1724874341386 implements MigrationInterface {
    name = 'AddedBookings1724874341386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "code" character varying(6) NOT NULL, "payment_id" integer, "profile_id" integer, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings_departing_flights" ("booking_id" integer NOT NULL, "flight_id" integer NOT NULL, CONSTRAINT "PK_2eaa0c42894d1f863092c24519a" PRIMARY KEY ("booking_id", "flight_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd101e36fb0c6c53873e8230de" ON "bookings_departing_flights" ("booking_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d899f65cf051b94bf5518ec9a5" ON "bookings_departing_flights" ("flight_id") `);
        await queryRunner.query(`CREATE TABLE "bookings_returning_flights" ("booking_id" integer NOT NULL, "flight_id" integer NOT NULL, CONSTRAINT "PK_23a835f84f29282a2ca5be787f9" PRIMARY KEY ("booking_id", "flight_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d6547c9dba958e7d0a95c22ea" ON "bookings_returning_flights" ("booking_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9c0d589fec2bc4a0bc70cb9c4d" ON "bookings_returning_flights" ("flight_id") `);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_5c9bd37ff5ee2ad5dc0f5307c53" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_91bc4b3fcf1cb89508f5189d4f2" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings_departing_flights" ADD CONSTRAINT "FK_cd101e36fb0c6c53873e8230deb" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bookings_departing_flights" ADD CONSTRAINT "FK_d899f65cf051b94bf5518ec9a57" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bookings_returning_flights" ADD CONSTRAINT "FK_3d6547c9dba958e7d0a95c22ea0" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bookings_returning_flights" ADD CONSTRAINT "FK_9c0d589fec2bc4a0bc70cb9c4de" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings_returning_flights" DROP CONSTRAINT "FK_9c0d589fec2bc4a0bc70cb9c4de"`);
        await queryRunner.query(`ALTER TABLE "bookings_returning_flights" DROP CONSTRAINT "FK_3d6547c9dba958e7d0a95c22ea0"`);
        await queryRunner.query(`ALTER TABLE "bookings_departing_flights" DROP CONSTRAINT "FK_d899f65cf051b94bf5518ec9a57"`);
        await queryRunner.query(`ALTER TABLE "bookings_departing_flights" DROP CONSTRAINT "FK_cd101e36fb0c6c53873e8230deb"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_91bc4b3fcf1cb89508f5189d4f2"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_5c9bd37ff5ee2ad5dc0f5307c53"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c0d589fec2bc4a0bc70cb9c4d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d6547c9dba958e7d0a95c22ea"`);
        await queryRunner.query(`DROP TABLE "bookings_returning_flights"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d899f65cf051b94bf5518ec9a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd101e36fb0c6c53873e8230de"`);
        await queryRunner.query(`DROP TABLE "bookings_departing_flights"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
    }

}
