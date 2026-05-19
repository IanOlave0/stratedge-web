# Guia de verificacion con MySQL

## 1. Crear la base de datos

Abre phpMyAdmin, MySQL Workbench o consola MySQL e importa:

```text
database/schema.sql
```

Esto crea:

```sql
CREATE DATABASE stratedge_db;
```

Tablas:

- `services`: catalogo de servicios.
- `portfolio_projects`: proyectos del portafolio.
- `leads`: prospectos capturados por el cotizador.
- `admins`: usuarios administradores.

## 2. Configurar conexion

Copia:

```text
.env.example
```

como:

```text
.env
```

Y ajusta:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=stratedge_db
```

## 3. Arrancar el proyecto

Si `npm` falla por falta de espacio, usa `node` directo:

Backend:

```powershell
node backend/server.js
```

Frontend:

```powershell
node node_modules\vite\bin\vite.js --host 127.0.0.1
```

URLs:

- `http://localhost:5173`
- `http://localhost:5173/cotizar`
- `http://localhost:5173/admin`
- `http://localhost:4000/api/health`

## 4. Acceso administrador

```text
usuario: admin
contrasena: Admin123!
```

## 5. Ver tablas y campos en MySQL

En phpMyAdmin:

1. Entra a `stratedge_db`.
2. Abre `leads`, `services`, `portfolio_projects` o `admins`.
3. Usa las pestanas `Estructura`, `Examinar` y `SQL`.

En SQL:

```sql
USE stratedge_db;
SHOW TABLES;
DESCRIBE leads;
DESCRIBE services;
DESCRIBE portfolio_projects;
SELECT * FROM leads ORDER BY id DESC;
```

## 6. Validaciones

Frontend:

- `src/utils/validation.js`
- `src/components/QuoteForm.jsx`

Backend:

- `backend/validation.js`
- `backend/server.js`

La informacion se valida antes de enviarse y tambien antes de insertarse en MySQL.

## 7. Pruebas de calidad

```powershell
npm.cmd run lint
npm.cmd run build
```

Si `npm.cmd` falla por `ENOSPC`, libera espacio en disco o usa comandos directos de `node` para ejecutar el proyecto.

