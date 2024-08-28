import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1724875928256 implements MigrationInterface {
  name = 'SeedData1724875928256';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO countries (name, iso_code) VALUES ('Thailand', 'TH'), ('Indonesia', 'ID')",
    );
    await queryRunner.query(
      "INSERT INTO cities (name, country_id) VALUES ('Bangkok', 1), ('Denpasar', 2)",
    );
    await queryRunner.query(
      "INSERT INTO airlines(name, code, country_id, logo) VALUES ('Thailand AirAsia', 'FD', 1, 'https://www.gstatic.com/flights/airline_logos/70px/FD.png'), ('Thai Airways', 'TG', 1, 'https://www.gstatic.com/flights/airline_logos/70px/TG.png')",
    );
    await queryRunner.query(
      `
        INSERT INTO airplanes(code, type, classes, airline_id) VALUES
        ('FD 398', 'Airbus A320', '{Economy}', 1),
        ('FD 396', 'Airbus A320', '{Economy}', 1),
        ('TG 431', 'Boeing 777', '{Economy}', 2)
      `,
    );
    await queryRunner.query(
      `
      INSERT INTO airports(name, iata_code, city_id) VALUES
      ('Suvarnabhumi International Airport', 'BKK', 1),
      ('Don Mueang International Airport', 'DMK', 1),
      ('Ngurah Rai International Airport', 'DPS', 2)
      `,
    );
    await queryRunner.query(
      `
        INSERT INTO flights(legroom, emission, price, airline_id, airplane_id, departure_airport_id, destination_airport_id, departure_time, arrival_time) VALUES
        ('28 in', '232 kg', 9983.00, 1, 1, 1, 3, '13:05:00', '18:20:00'),
        ('28 in', '232 kg', 12000.00, 1, 2, 1, 3, '16:00:00', '21:20:00'),
        ('28 in', '232 kg', 9983.00, 1, 1, 3, 1, '13:05:00', '18:20:00'),
        ('28 in', '232 kg', 12000.00, 1, 2, 3, 1, '16:00:00', '21:20:00')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE countries');
    await queryRunner.query('TRUNCATE TABLE cities');
    await queryRunner.query('TRUNCATE TABLE airlines');
    await queryRunner.query('TRUNCATE TABLE airports');
    await queryRunner.query('TRUNCATE TABLE airplanes');
    await queryRunner.query('TRUNCATE TABLE flights');
  }
}
