# Setup Inicial del Monorepo Smart Recruitment

## Objetivo
Inicializar una base sólida del monorepo para separar frontend (`/client`) y backend (`/server`), centralizar la gestión de scripts y habilitar infraestructura local de base de datos mediante Docker.

## Pasos realizados
1. **Estructura de carpetas**
   - Se crearon las carpetas base:
     - `/client`
     - `/server`
     - `/docs`

2. **Archivo `.gitignore` robusto**
   - Se definieron exclusiones para:
     - Dependencias (`node_modules`, cache managers)
     - Variables de entorno (`.env*`)
     - Artefactos de build (`dist`, `.next`, `build`, `coverage`)
     - Logs e información temporal
     - Archivos de sistema operativo e IDE

3. **Infraestructura de base de datos (`docker-compose.yml`)**
   - Se configuró PostgreSQL 16 con:
     - Persistencia vía volumen `postgres_data`
     - Credenciales iniciales (`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`)
     - Exposición del puerto `5432`
     - `healthcheck` para validar disponibilidad del servicio

4. **Gestión del monorepo (`package.json` raíz)**
   - Se creó el `package.json` raíz con:
     - `workspaces` para `client` y `server`
     - Scripts globales (`dev`, `build`, `lint`, `test`)
     - Restricción de versiones de Node y npm

5. **Inicialización de subproyectos**
   - Se agregaron `package.json` iniciales en:
     - `/client` (scripts orientados a Next.js)
     - `/server` (scripts orientados a NestJS)

6. **Versionado y registro de cambios**
   - Se estableció versión inicial `0.1.0` en el monorepo y subproyectos.
   - Se documentó el cambio en `CHANGELOG.md` usando formato Keep a Changelog y fecha real del sistema.

## Dependencias de esta base
- Docker y Docker Compose para la base de datos local.
- Node.js >= 20 y npm >= 10 para operar los workspaces.

## Comandos útiles
```bash
# Levantar PostgreSQL en segundo plano
docker compose up -d

# Verificar estado del servicio
docker compose ps

# Instalar dependencias de todos los workspaces
npm install
```
