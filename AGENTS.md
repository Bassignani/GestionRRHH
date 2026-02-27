# AGENTS.md - Contexto del Proyecto y Reglas del Asistente

Este documento contiene las instrucciones críticas, la arquitectura y las reglas de negocio para el desarrollo del sistema **Smart Recruitment**. El asistente debe seguir estas directrices estrictamente en cada interacción.

---

## 1. Resumen del Proyecto
**Nombre:** Smart Recruitment  
**Industria:** Recursos Humanos para el sector Oil & Gas.  
**Arquitectura:** Monorepo (Client/Server).

---

## 2. Stack Tecnológico
- **Backend:** NestJS (Node.js) en la carpeta `/server`.
- **Frontend:** Next.js (React) en la carpeta `/client`.
- **Base de Datos:** PostgreSQL (Gestionada vía Docker).
- **ORM:** TypeORM.
- **Almacenamiento:** AWS S3 (o compatible) para archivos adjuntos.
- **IA/OCR:** OpenAI API (GPT-4o) para estructuración de datos.

---

## 3. Estructura de Carpetas (Scaffolding)
```text
/smart-recruitment
├── /client (Next.js)           # Frontend
├── /server (NestJS)           # Backend
├── /docs                      # Documentación generada por el asistente
├── docker-compose.yml         # Infraestructura de Base de Datos
├── CHANGELOG.md               # Registro de cambios
├── AGENTS.md                  # Este archivo de contexto
└── package.json               # Versión global del proyecto
```

## 4. Database Schema (Entities & Relationships)

### Security & Access (RBAC)
- **`users`**: `id` (UUID), `email` (Unique), `password`, `first_name`, `last_name`, `role_id` (FK), `is_active` (Boolean).
- **`roles`**: `id`, `name` (e.g., 'Admin', 'Loader', 'Recruiter'), `description`.
- **`permissions`**: `id`, `action` (create, read, update, delete), `module` (candidates, jobs, users).
- **`role_permissions`**: `role_id` (FK), `permission_id` (FK).

### Talent Management (Candidates)
- **`candidates`**: `id` (UUID), `dni` (Unique Index), `first_name`, `last_name`, `nationality`, `address`, `marital_status`, `email`, `phone`, `zone_id` (FK), `rotation_id` (FK), `medical_status`, `status` (Enum: 'Active', 'Archived'), `ai_raw_data` (JSONB).
- **`work_experiences`**: `id`, `candidate_id` (FK), `company`, `position`, `start_date`, `end_date` (Nullable), `description`.
- **`attachments`**: `id`, `candidate_id` (FK), `type` (Enum: 'CV', 'ID_Card', 'Medical', 'Certification'), `file_url` (S3 Path), `original_name`.

### Operations (Recruitment Process)
- **`job_searches`**: `id`, `title`, `client_company`, `required_quantity` (Int), `opening_date` (Date), `closing_date` (Date), `status` (Enum: 'Open', 'Closed', 'Archived').
- **`applications`**: `id`, `candidate_id` (FK), `job_search_id` (FK), `current_stage` (e.g., 'Initial', 'Interview', 'Hired'), `status` (Enum: 'In_Progress', 'Rejected', 'Approved').
- **`interview_logs`**: `id`, `application_id` (FK), `interviewer_id` (FK), `notes` (Text), `result`, `date` (Timestamp).

---

## 5. Reglas de Gestión para el Asistente (Instrucciones de Trabajo)

### A. Documentación Obligatoria
- **Carpeta `/docs`**: Toda nueva funcionalidad, lógica de negocio compleja o cambio de arquitectura debe ser documentado por el asistente en archivos Markdown dentro de la carpeta `/docs`. Cada archivo debe explicar el propósito, la implementación y las dependencias.

### B. Control de Versiones (package.json)
- **Incremento de Versión**: Ante cualquier cambio en el código fuente (Backend o Frontend), el asistente debe incrementar la versión en el archivo `package.json` de la raíz y de los subproyectos correspondientes siguiendo el versionado semántico (Major.Minor.Patch).

### C. Registro de Cambios (CHANGELOG.md)
- **Estándar**: Todo cambio debe registrarse en `CHANGELOG.md` siguiendo estrictamente el formato de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).
- **Datos Reales**: No se permiten fechas o datos "fake". Se deben utilizar fechas reales basadas en el sistema al momento de la modificación.

### D. Lógica de Negocio y Seguridad
- **DNI Locking**: El `dni` es el identificador lógico principal. Si se intenta cargar un DNI existente, el asistente debe proponer un flujo de "Update/Merge" o reactivación si está archivado.
- **Soft Delete (Archivado)**: No se permite el borrado físico de candidatos. Se debe cambiar el `status` a 'Archived'. El acceso a estos datos está restringido a roles con permisos de Administrador.
- **Validación Humana (IA Flow)**: El proceso de ingesta es: Upload S3 -> IA Parsing -> Interfaz Split-Screen para validación y completitud de campos obligatorios.
- **Alertas de Cierre**: El sistema debe monitorear la `closing_date` de las búsquedas para generar alertas de proximidad en el Dashboard.

---

## 6. Flujo de Desarrollo (Development Workflow)

1.  **Entorno**: La base de datos PostgreSQL debe levantarse siempre mediante el archivo `docker-compose.yml`.
2.  **Base de Datos**: Los cambios en el esquema se realizan mediante Entidades de TypeORM y la generación de sus respectivas migraciones. Nunca modificar la DB manualmente.
3.  **Backend**: Implementar lógica modular en NestJS utilizando Guards para validar el RBAC en cada endpoint.
4.  **Frontend**: Desarrollar componentes reactivos en Next.js (App Router), asegurando que el estado de los filtros sea persistente y eficiente.
5.  **Cierre de Tarea**: Antes de finalizar, el asistente debe:
    - Actualizar `package.json` (Versión).
    - Actualizar `CHANGELOG.md` (Keep a Changelog).
    - Generar documentación técnica en `/docs`.

### Notas Adicionales para tu flujo de trabajo:
1. **Carpeta `/docs`:** Cada vez que el asistente cree una función (por ejemplo, el parsing de IA), le puedes decir: *"Crea la documentación técnica de este módulo en /docs/ia-parsing.md"*.
2. **CHANGELOG:** El asistente ahora sabe que no puede poner "2023-01-01". Usará la fecha del día en que estás trabajando.
3. **Versiones:** Esto te ayudará a saber qué tan avanzado está el proyecto (ej: Versión 0.5.0 suele indicar que estás a mitad de camino).

