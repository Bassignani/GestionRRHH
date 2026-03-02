# Arquitectura de Base de Datos Backend (NestJS + TypeORM)

## Resumen
Este documento describe la primera arquitectura de base de datos backend para **Smart Recruitment** en la aplicación `/server`, usando NestJS + TypeORM sobre PostgreSQL.

## Estrategia de conexión y variables de entorno
- El backend utiliza `@nestjs/config` para cargar variables de entorno desde `.env.local` y `.env`.
- TypeORM se configura mediante `forRootAsync` y una fábrica centralizada en `src/config/typeorm.config.ts`.
- Hay un DataSource de TypeORM disponible en `src/database/data-source.ts` para los flujos de migraciones.

### Variables de entorno requeridas
- `PORT`
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`

## Entidades incluidas en esta inicialización

### Seguridad / Acceso
1. **Role** (`roles`)
   - `id`, `name` (único), `description`
   - Relaciones:
     - Uno-a-muchos con `User`
     - Muchos-a-muchos con `Permission` a través de `role_permissions`

2. **Permission** (`permissions`)
   - `id`, `action`, `module`
   - Relaciones:
     - Muchos-a-muchos con `Role`

3. **User** (`users`)
   - `id` (UUID), `email` (único), `password`, `first_name`, `last_name`, `is_active`
   - Relaciones:
     - Muchos-a-uno con `Role` usando `role_id`

### Gestión de Talento
4. **Candidate** (`candidates`)
   - `id` (UUID), `dni` (índice único), `first_name`, `last_name`, `nationality`, `address`, `marital_status`, `email`, `phone`, `zone_id`, `rotation_id`, `medical_status`, `ai_raw_data`
   - Enum `status`: `Active | Archived`
   - Relaciones:
     - Uno-a-muchos con `WorkExperience`
     - Uno-a-muchos con `Attachment`

5. **WorkExperience** (`work_experiences`)
   - `id`, `candidate_id`, `company`, `position`, `start_date`, `end_date`, `description`
   - Relación:
     - Muchos-a-uno con `Candidate`

6. **Attachment** (`attachments`)
   - `id`, `candidate_id`, `type`, `file_url`, `original_name`
   - Enum `type`: `CV | ID_Card | Medical | Certification`
   - Relación:
     - Muchos-a-uno con `Candidate`

## Estrategia de borrado lógico para Candidate
- No se utiliza borrado físico para `Candidate`.
- El modelo implementa archivado lógico mediante `Candidate.status`.
- El método auxiliar `archive()` cambia el estado a `Archived`.
- El filtrado por consultas (solo activos vs archivados) debe reforzarse en métodos de servicio/repositorio y en guards de RBAC en endpoints futuros.

## Migración inicial
- Archivo de migración: `src/database/migrations/1760000000000-InitialSchema.ts`
- Crea:
  - enums para estado de candidato y tipo de adjunto
  - tablas: `roles`, `permissions`, `users`, `candidates`, `work_experiences`, `attachments`, `role_permissions`
  - restricciones, índices y relaciones FK
  - extensión `uuid-ossp` para generación de UUID

## Dependencias
- `@nestjs/config`
- `@nestjs/typeorm`
- `typeorm`
- `pg`
- `dotenv`
