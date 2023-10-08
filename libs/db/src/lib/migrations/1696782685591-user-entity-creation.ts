import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntityCreation1696782685591 implements MigrationInterface {
    name = 'UserEntityCreation1696782685591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(32) NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "profilePictureUrl" character varying, "bio" character varying(150), "password" character varying NOT NULL, "resetPasswordCode" character varying NOT NULL, "resetPasswordAttempts" smallint NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
