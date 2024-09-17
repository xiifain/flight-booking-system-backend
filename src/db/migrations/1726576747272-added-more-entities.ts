import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedMoreEntities1726576747272 implements MigrationInterface {
  name = 'AddedMoreEntities1726576747272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "flight_fares" ("id" SERIAL NOT NULL, "class" character varying(20) NOT NULL, "price" numeric(10,2) NOT NULL, "flight_instance_id" integer, CONSTRAINT "PK_d2dfc2e7d631c3115430ae0d9e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "flight_instances" ("id" SERIAL NOT NULL, "departureTime" TIMESTAMP NOT NULL, "arrivalTime" TIMESTAMP NOT NULL, "status" character varying(50), "flight_id" integer, CONSTRAINT "PK_d34799148536609d18c63fa1688" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "routes" ("id" SERIAL NOT NULL, "stops" integer, "distance" integer, "duration" integer, "origin_airport_id" integer, "destination_airport_id" integer, CONSTRAINT "PK_76100511cdfa1d013c859f01d8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "departure_time"`);
    await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "arrival_time"`);
    await queryRunner.query(`ALTER TABLE "flights" ADD "operating_days" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "flights" ADD "route_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "flight_fares" ADD CONSTRAINT "FK_68004a6af763c5d9f3aadf647ab" FOREIGN KEY ("flight_instance_id") REFERENCES "flight_instances"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight_instances" ADD CONSTRAINT "FK_0a9fedce61d5b80b6b3ba3c2bd4" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_14b2be1a0883a76ba69098947b1" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routes" ADD CONSTRAINT "FK_d993fb17f2ff6d5ee0e62fb4fdd" FOREIGN KEY ("origin_airport_id") REFERENCES "airports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "routes" ADD CONSTRAINT "FK_a491f70f8ba50f68e955820133e" FOREIGN KEY ("destination_airport_id") REFERENCES "airports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "routes" DROP CONSTRAINT "FK_a491f70f8ba50f68e955820133e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "routes" DROP CONSTRAINT "FK_d993fb17f2ff6d5ee0e62fb4fdd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_14b2be1a0883a76ba69098947b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight_instances" DROP CONSTRAINT "FK_0a9fedce61d5b80b6b3ba3c2bd4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight_fares" DROP CONSTRAINT "FK_68004a6af763c5d9f3aadf647ab"`,
    );
    await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "route_id"`);
    await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "operating_days"`);
    await queryRunner.query(`ALTER TABLE "flights" ADD "arrival_time" TIME NOT NULL`);
    await queryRunner.query(`ALTER TABLE "flights" ADD "departure_time" TIME NOT NULL`);
    await queryRunner.query(`DROP TABLE "routes"`);
    await queryRunner.query(`DROP TABLE "flight_instances"`);
    await queryRunner.query(`DROP TABLE "flight_fares"`);
  }
}
