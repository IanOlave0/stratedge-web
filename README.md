# Stratedge Marketing - Proyecto Full Stack

Sistema web escolar para una agencia de marketing. Sigue el planteamiento del reporte: React + Node.js + API REST + MySQL.

## Tecnologias

- React + Vite
- Tailwind CSS
- Node.js
- MySQL / phpMyAdmin
- API REST
- Validaciones frontend y backend
- Autenticacion de administrador por token firmado

## Preparar MySQL

1. Instala o abre MySQL/XAMPP.
2. Abre phpMyAdmin o MySQL Workbench.
3. Importa este archivo:

```text
database/schema.sql
```

Ese script crea la base:

```text
stratedge_db
```

Y las tablas:

- `services`
- `portfolio_projects`
- `leads`
- `admins`

## Variables de entorno

Copia `.env.example` a `.env` y ajusta tus datos de MySQL:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=stratedge_db
```

## Ejecucion

Terminal 1:

```powershell
node backend/server.js
```

Terminal 2:

```powershell
node node_modules\vite\bin\vite.js --host 127.0.0.1
```

Tambien puedes usar:

```powershell
npm.cmd run api
npm.cmd run dev
```

Si `npm` falla con `ENOSPC`, usa los comandos directos con `node`.

## URLs

- Frontend: `http://localhost:5173`
- API: `http://localhost:4000/api/health`
- Administrador: `http://localhost:5173/admin`

## Administrador

```text
usuario: admin
contrasena: Admin123!
```

## Consultar la base en MySQL/phpMyAdmin

Ejemplos:

```sql
USE stratedge_db;
SHOW TABLES;
DESCRIBE leads;
SELECT * FROM leads ORDER BY id DESC;
SELECT * FROM services;
```

## Verificacion

```powershell
npm.cmd run lint
npm.cmd run build
```

