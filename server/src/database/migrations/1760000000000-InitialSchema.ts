import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1760000000000 implements MigrationInterface {
  name = 'InitialSchema1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE TYPE "public"."candidates_status_enum" AS ENUM('Active', 'Archived')`);
    await queryRunner.query(`CREATE TYPE "public"."attachments_type_enum" AS ENUM('CV', 'ID_Card', 'Medical', 'Certification')`);

    await queryRunner.query(`
      CREATE TABLE "roles" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "description" text,
        CONSTRAINT "UQ_roles_name" UNIQUE ("name"),
        CONSTRAINT "PK_roles_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "permissions" (
        "id" SERIAL NOT NULL,
        "action" character varying NOT NULL,
        "module" character varying NOT NULL,
        CONSTRAINT "PK_permissions_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "first_name" character varying NOT NULL,
        "last_name" character varying NOT NULL,
        "role_id" integer NOT NULL,
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "candidates" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "dni" character varying NOT NULL,
        "first_name" character varying NOT NULL,
        "last_name" character varying NOT NULL,
        "nationality" character varying,
        "address" character varying,
        "marital_status" character varying,
        "email" character varying,
        "phone" character varying,
        "zone_id" integer,
        "rotation_id" integer,
        "medical_status" character varying,
        "status" "public"."candidates_status_enum" NOT NULL DEFAULT 'Active',
        "ai_raw_data" jsonb,
        CONSTRAINT "UQ_candidates_dni" UNIQUE ("dni"),
        CONSTRAINT "PK_candidates_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "work_experiences" (
        "id" SERIAL NOT NULL,
        "candidate_id" uuid NOT NULL,
        "company" character varying NOT NULL,
        "position" character varying NOT NULL,
        "start_date" date NOT NULL,
        "end_date" date,
        "description" text,
        CONSTRAINT "PK_work_experiences_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "attachments" (
        "id" SERIAL NOT NULL,
        "candidate_id" uuid NOT NULL,
        "type" "public"."attachments_type_enum" NOT NULL,
        "file_url" character varying NOT NULL,
        "original_name" character varying NOT NULL,
        CONSTRAINT "PK_attachments_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "role_permissions" (
        "role_id" integer NOT NULL,
        "permission_id" integer NOT NULL,
        CONSTRAINT "PK_role_permissions" PRIMARY KEY ("role_id", "permission_id")
      )
    `);

    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_users_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "work_experiences" ADD CONSTRAINT "FK_work_experiences_candidate_id" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "attachments" ADD CONSTRAINT "FK_attachments_candidate_id" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_role_permissions_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_role_permissions_permission_id" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

    await queryRunner.query(`CREATE INDEX "IDX_role_permissions_role_id" ON "role_permissions" ("role_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_role_permissions_permission_id" ON "role_permissions" ("permission_id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_role_permissions_permission_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_role_permissions_role_id"`);
    await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_role_permissions_permission_id"`);
    await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_role_permissions_role_id"`);
    await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_attachments_candidate_id"`);
    await queryRunner.query(`ALTER TABLE "work_experiences" DROP CONSTRAINT "FK_work_experiences_candidate_id"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_users_role_id"`);
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "attachments"`);
    await queryRunner.query(`DROP TABLE "work_experiences"`);
    await queryRunner.query(`DROP TABLE "candidates"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TYPE "public"."attachments_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."candidates_status_enum"`);
  }
}
