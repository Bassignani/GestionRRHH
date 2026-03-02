# Backend DB Architecture (NestJS + TypeORM)

## Overview
This document describes the first backend database architecture for **Smart Recruitment** in the `/server` app using NestJS + TypeORM over PostgreSQL.

## Connection and environment strategy
- The backend uses `@nestjs/config` to load environment values from `.env.local` and `.env`.
- TypeORM is configured via `forRootAsync` and a centralized factory in `src/config/typeorm.config.ts`.
- A TypeORM CLI DataSource is available at `src/database/data-source.ts` for migration workflows.

### Required environment variables
- `PORT`
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`

## Entities included in this initialization

### Security / Access
1. **Role** (`roles`)
   - `id`, `name` (unique), `description`
   - Relations:
     - One-to-many with `User`
     - Many-to-many with `Permission` through `role_permissions`

2. **Permission** (`permissions`)
   - `id`, `action`, `module`
   - Relations:
     - Many-to-many with `Role`

3. **User** (`users`)
   - `id` (UUID), `email` (unique), `password`, `first_name`, `last_name`, `is_active`
   - Relations:
     - Many-to-one with `Role` using `role_id`

### Talent Management
4. **Candidate** (`candidates`)
   - `id` (UUID), `dni` (unique index), `first_name`, `last_name`, `nationality`, `address`, `marital_status`, `email`, `phone`, `zone_id`, `rotation_id`, `medical_status`, `ai_raw_data`
   - `status` enum: `Active | Archived`
   - Relations:
     - One-to-many with `WorkExperience`
     - One-to-many with `Attachment`

5. **WorkExperience** (`work_experiences`)
   - `id`, `candidate_id`, `company`, `position`, `start_date`, `end_date`, `description`
   - Relation:
     - Many-to-one with `Candidate`

6. **Attachment** (`attachments`)
   - `id`, `candidate_id`, `type`, `file_url`, `original_name`
   - `type` enum: `CV | ID_Card | Medical | Certification`
   - Relation:
     - Many-to-one with `Candidate`

## Soft Delete strategy for Candidate
- Physical deletion is not used for `Candidate`.
- The model implements a logical archive through `Candidate.status`.
- The helper method `archive()` sets status to `Archived`.
- Query-level filtering (active-only vs archived) should be enforced in service/repository methods and RBAC guards in future endpoints.

## Initial migration
- Migration file: `src/database/migrations/1760000000000-InitialSchema.ts`
- Creates:
  - enums for candidate status and attachment type
  - tables: `roles`, `permissions`, `users`, `candidates`, `work_experiences`, `attachments`, `role_permissions`
  - constraints, indexes and FK relations
  - `uuid-ossp` extension for UUID generation

## Dependencies
- `@nestjs/config`
- `@nestjs/typeorm`
- `typeorm`
- `pg`
- `dotenv`
