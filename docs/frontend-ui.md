# Frontend UI Base (Next.js + Tailwind)

## Propósito
Inicializar la base de interfaz de usuario del monorepo para **Smart Recruitment** en `/client`, con diseño limpio y profesional orientado a operaciones de reclutamiento en la industria Oil & Gas.

## Componentes y páginas implementadas

### 1. Login (`/login`)
- Pantalla de autenticación con formulario de email y contraseña.
- Estética sobria (azules oscuros y acento ámbar) para identidad corporativa del sector.

### 2. Layout principal de Dashboard (`/dashboard`)
- Layout con barra lateral fija (`Sidebar`) y contenido principal.
- Navegación base a:
  - Dashboard
  - Candidates
  - Validación IA

### 3. Tabla de Candidates con filtros laterales (`/dashboard/candidates`)
- Componente `CandidatesTable` con:
  - Filtro por **zona**.
  - Filtro por **rotación**.
  - Filtro por **estado médico**.
- Tabla de resultados con estado (`Active` / `Archived`) representado con badges.
- Preparado para conectar con backend sin romper la estructura de UI.

### 4. Vista Dividida de Validación IA (`/dashboard/validation`)
- Componente `SplitScreenValidation` en dos columnas:
  - Izquierda: preview del archivo (CV/documento desde S3).
  - Derecha: formulario de validación de datos extraídos por IA.
- Diseñado para soportar el flujo: **Upload S3 → IA Parsing → Validación humana**.

## Estructura base creada

```text
/client
├── src/app
│   ├── login/page.tsx
│   ├── dashboard/layout.tsx
│   ├── dashboard/page.tsx
│   ├── dashboard/candidates/page.tsx
│   ├── dashboard/validation/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── src/components
│   ├── layout/sidebar.tsx
│   ├── candidates/candidates-table.tsx
│   ├── validation/split-screen-validation.tsx
│   └── ui/status-badge.tsx
├── src/lib/mock-data.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
└── tsconfig.json
```

## Dependencias y configuración
- Se configuró `Next.js` con App Router.
- Se incorporó `Tailwind CSS` + `PostCSS` + `Autoprefixer`.
- Se añadió TypeScript estricto y alias `@/*`.

## Dependencias de integración futura
1. API de autenticación y sesión (backend NestJS).
2. Endpoint de candidates con filtros server-side.
3. Integración de visor de archivos (PDF/Image) en el panel izquierdo del split-screen.
4. Persistencia de filtros en query params o storage para mejorar continuidad operativa.
