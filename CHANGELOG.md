# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-27
### Added
- Initial monorepo scaffolding with `client`, `server`, and `docs` directories.
- Root `.gitignore` with exclusions for dependencies, environment files, build artifacts, logs, and system files.
- `docker-compose.yml` to run PostgreSQL 16 with persistent volume, healthcheck, and initial credentials.
- Root `package.json` configured as npm workspaces monorepo manager.
- Initial `package.json` files for `client` (Next.js) and `server` (NestJS).
- Initial setup documentation in `docs/setup-inicial.md`.
