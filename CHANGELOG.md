# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
