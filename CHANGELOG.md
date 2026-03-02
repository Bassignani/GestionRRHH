# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2026-03-02
### Added
- README principal del proyecto con descripción breve de la aplicación y pasos de inicialización para entorno local.

### Changed
- Regla en `AGENTS.md` actualizada para exigir que toda la documentación en `/docs` se redacte en español y que se traduzca cualquier contenido existente en inglés.
- Traducción completa al español de `docs/backend-entities.md`.
- Incremento de versión en `package.json` raíz a `0.1.3` y en `client/package.json` y `server/package.json` a `0.1.2`.

## [0.1.2] - 2026-03-02
### Added
- Frontend base initialization in `/client` with Next.js App Router, TypeScript, Tailwind CSS, PostCSS, and initial linting configuration.
- Login page at `/login` with a professional visual style for Smart Recruitment (Oil & Gas).
- Dashboard shell with sidebar navigation and starter KPI cards.
- Candidates module UI with lateral filters (zona, rotación, estado médico) and listing table component.
- Split-screen validation UI for file preview vs structured form validation in `/dashboard/validation`.
- Technical frontend documentation in `/docs/frontend-ui.md`.

### Changed
- Bumped monorepo root version to `0.1.2`.
- Bumped frontend `/client` package version to `0.1.1`.

## [0.1.1] - 2026-03-02
### Added
- Backend NestJS base bootstrap in `/server` with `AppModule`, `main.ts`, and TypeORM async configuration via environment variables.
- TypeORM DataSource for CLI-driven migrations and `.env.example` for backend database configuration.
- Initial database entities in English: `User`, `Role`, `Permission`, `Candidate`, `WorkExperience`, and `Attachment`, including relations and constraints.
- Candidate logical soft delete strategy through `status` enum (`Active`/`Archived`) and `archive()` entity helper.
- First database migration creating enums, tables, relations, and indexes for the initial schema.
- Technical documentation in `docs/backend-entities.md` describing DB architecture and implementation details.

### Changed
- Bumped monorepo root version to `0.1.1`.
- Bumped backend `/server` package version to `0.1.1`.

## [0.1.0] - 2026-02-27
### Added
- Initial monorepo scaffolding with `client`, `server`, and `docs` directories.
- Root `.gitignore` with exclusions for dependencies, environment files, build artifacts, logs, and system files.
- `docker-compose.yml` to run PostgreSQL 16 with persistent volume, healthcheck, and initial credentials.
- Root `package.json` configured as npm workspaces monorepo manager.
- Initial `package.json` files for `client` (Next.js) and `server` (NestJS).
- Initial setup documentation in `docs/setup-inicial.md`.
