# Smart Recruitment (Gestión RRHH)

Aplicación monorepo para la gestión del reclutamiento en el sector **Oil & Gas**, con foco en:

- Administración de candidatos y su estado (activo/archivado).
- Proceso de validación documental asistido por IA (flujo split-screen).
- Base para control de accesos por roles (RBAC).

## Arquitectura

- **Frontend:** Next.js (`/client`)
- **Backend:** NestJS (`/server`)
- **Base de datos:** PostgreSQL (Docker Compose)
- **ORM:** TypeORM

## Requisitos previos

- Node.js `>= 20`
- npm `>= 10`
- Docker + Docker Compose

## Inicialización del proyecto

1. **Instalar dependencias del monorepo**

   ```bash
   npm install
   ```

2. **Levantar PostgreSQL con Docker**

   ```bash
   docker compose up -d
   ```

3. **Verificar que la base esté saludable**

   ```bash
   docker compose ps
   ```

4. **Configurar variables de entorno del backend**

   Copiar el ejemplo y ajustar valores si aplica:

   ```bash
   cp server/.env.example server/.env
   ```

5. **Ejecutar migraciones de base de datos**

   ```bash
   npm run migration:run --workspace server
   ```

6. **Iniciar frontend y backend en modo desarrollo**

   En terminales separadas:

   ```bash
   npm run dev --workspace server
   npm run dev --workspace client
   ```

## URLs de prueba

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001` (según `PORT` en `server/.env`)

## Scripts útiles

```bash
# Ejecutar lint en todos los workspaces
npm run lint

# Build global
npm run build

# Tests globales
npm run test
```
