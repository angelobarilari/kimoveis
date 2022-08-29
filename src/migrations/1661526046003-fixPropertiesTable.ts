import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPropertiesTable1661526046003 implements MigrationInterface {
    name = 'fixPropertiesTable1661526046003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_5ac66043d29166c56c2075f2ea9"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "addresId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_2b2211958ef1f0e3c680339100e" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "addressId" TO "addresId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_5ac66043d29166c56c2075f2ea9" FOREIGN KEY ("addresId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
