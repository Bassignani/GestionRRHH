import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../modules/users/entities/user.entity';
import { Role } from '../modules/roles/entities/role.entity';
import { Permission } from '../modules/permissions/entities/permission.entity';
import { Candidate } from '../modules/candidates/entities/candidate.entity';
import { WorkExperience } from '../modules/candidates/entities/work-experience.entity';
import { Attachment } from '../modules/candidates/entities/attachment.entity';

dotenv.config({ path: '.env' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'smart_recruitment',
  entities: [User, Role, Permission, Candidate, WorkExperience, Attachment],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
