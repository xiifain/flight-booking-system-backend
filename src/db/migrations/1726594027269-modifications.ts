import { MigrationInterface, QueryRunner } from 'typeorm';

export class Modifications1726594027269 implements MigrationInterface {
  name = 'Modifications1726594027269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bookings_departing_flight_instances" ("booking_id" integer NOT NULL, "flight_instance_id" integer NOT NULL, CONSTRAINT "PK_56c152eae2c9b418a9e0053483e" PRIMARY KEY ("booking_id", "flight_instance_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ac04badaae603671b6a49b143e" ON "bookings_departing_flight_instances" ("booking_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be9c635c98d83766ff790276e5" ON "bookings_departing_flight_instances" ("flight_instance_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "bookings_returning_flight_instances" ("booking_id" integer NOT NULL, "flight_instance_id" integer NOT NULL, CONSTRAINT "PK_7c1f1446a3b9c11dcc8b0172b04" PRIMARY KEY ("booking_id", "flight_instance_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3bed818fbc63a40cac967c94db" ON "bookings_returning_flight_instances" ("booking_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc5b8adb4fdd18d25798df0f05" ON "bookings_returning_flight_instances" ("flight_instance_id") `,
    );
    await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "stops"`);
    await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "flight_fares" ALTER COLUMN "price" SET DEFAULT '0'`);
    await queryRunner.query(
      `ALTER TABLE "bookings_departing_flight_instances" ADD CONSTRAINT "FK_ac04badaae603671b6a49b143ec" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings_departing_flight_instances" ADD CONSTRAINT "FK_be9c635c98d83766ff790276e5e" FOREIGN KEY ("flight_instance_id") REFERENCES "flight_instances"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings_returning_flight_instances" ADD CONSTRAINT "FK_3bed818fbc63a40cac967c94db8" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings_returning_flight_instances" ADD CONSTRAINT "FK_dc5b8adb4fdd18d25798df0f052" FOREIGN KEY ("flight_instance_id") REFERENCES "flight_instances"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookings_returning_flight_instances" DROP CONSTRAINT "FK_dc5b8adb4fdd18d25798df0f052"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings_returning_flight_instances" DROP CONSTRAINT "FK_3bed818fbc63a40cac967c94db8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings_departing_flight_instances" DROP CONSTRAINT "FK_be9c635c98d83766ff790276e5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings_departing_flight_instances" DROP CONSTRAINT "FK_ac04badaae603671b6a49b143ec"`,
    );
    await queryRunner.query(`ALTER TABLE "flight_fares" ALTER COLUMN "price" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "routes" ADD "duration" integer`);
    await queryRunner.query(`ALTER TABLE "routes" ADD "stops" integer`);
    await queryRunner.query(`ALTER TABLE "flights" ADD "price" numeric(10,2) NOT NULL DEFAULT '0'`);
    await queryRunner.query(`DROP INDEX "public"."IDX_dc5b8adb4fdd18d25798df0f05"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3bed818fbc63a40cac967c94db"`);
    await queryRunner.query(`DROP TABLE "bookings_returning_flight_instances"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_be9c635c98d83766ff790276e5"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ac04badaae603671b6a49b143e"`);
    await queryRunner.query(`DROP TABLE "bookings_departing_flight_instances"`);
  }
}
