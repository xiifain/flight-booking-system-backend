import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedNecessaryEntitites1724765782459 implements MigrationInterface {
  name = 'AddedNecessaryEntitites1724765782459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "is_default" boolean NOT NULL DEFAULT true, "cardholder_name" character varying(255) NOT NULL, "card_number" character varying(255) NOT NULL, "expiration_month" character varying(255) NOT NULL, "cvv" character varying(255) NOT NULL, "profile_id" integer NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "airplanes" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "type" character varying(50) NOT NULL, "classes" text array NOT NULL DEFAULT '{}', "airline_id" integer NOT NULL, CONSTRAINT "PK_0c49595d788fa1c9009d7dbd290" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "country_id" integer NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "iso_code" character varying(10) NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "airlines" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "code" character varying(2) NOT NULL, "country_id" integer NOT NULL, CONSTRAINT "UQ_1fdd8f4def510635e124aed4326" UNIQUE ("code"), CONSTRAINT "PK_74f50545f40719d6a763da9da47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "airports" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "iata_code" character varying(3) NOT NULL, CONSTRAINT "PK_507127316cedb7ec7447d0cb3d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "flights" ("id" SERIAL NOT NULL, "legroom" character varying(100), "emission" character varying(100), "departure_time" TIMESTAMP NOT NULL, "arrival_time" TIMESTAMP NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "airline_id" integer, "airplane_id" integer, "departure_airport_id" integer, "destination_airport_id" integer, CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_f26b2328018bca97a2c6aa91c84" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "airplanes" ADD CONSTRAINT "FK_56731227c54c8720dcd918b0218" FOREIGN KEY ("airline_id") REFERENCES "airlines"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" ADD CONSTRAINT "FK_4aa0d9a52c36ff93415934e2d2b" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "airlines" ADD CONSTRAINT "FK_62c19cacd77284985afa4f5a61d" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_3e5c17e6b2bba063b184d30bbaf" FOREIGN KEY ("airline_id") REFERENCES "airlines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_7ce4f1631dfb4a6137bbb87654d" FOREIGN KEY ("departure_airport_id") REFERENCES "airports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_d5ec119a04387b1602c13dd9f1e" FOREIGN KEY ("destination_airport_id") REFERENCES "airports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_d5ec119a04387b1602c13dd9f1e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_7ce4f1631dfb4a6137bbb87654d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_3e5c17e6b2bba063b184d30bbaf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "airlines" DROP CONSTRAINT "FK_62c19cacd77284985afa4f5a61d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" DROP CONSTRAINT "FK_4aa0d9a52c36ff93415934e2d2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "airplanes" DROP CONSTRAINT "FK_56731227c54c8720dcd918b0218"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_f26b2328018bca97a2c6aa91c84"`,
    );
    await queryRunner.query(`DROP TABLE "flights"`);
    await queryRunner.query(`DROP TABLE "airports"`);
    await queryRunner.query(`DROP TABLE "airlines"`);
    await queryRunner.query(`DROP TABLE "countries"`);
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "airplanes"`);
    await queryRunner.query(`DROP TABLE "payments"`);
  }
}
