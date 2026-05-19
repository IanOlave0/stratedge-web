# Analisis segun rubrica React + Node.js

## Resumen rapido

La rubrica evalua un proyecto Full Stack, no solo Frontend. El proyecto actual ya tiene una base buena en React, vistas, diseno responsive y validaciones frontend, pero todavia falta la parte de Node.js, API REST, base de datos real, validaciones backend y seguridad.

## Evaluacion por criterio

| Criterio | Peso | Estado actual | Riesgo |
|---|---:|---|---|
| Frontend - vistas y componentes | 10% | Home, servicios, portafolio y cotizador existen | Bajo |
| Validaciones Frontend | 10% | Hay reglas para nombre, email, telefono, ZIP, fecha, links y notas | Bajo |
| CSS y diseno responsivo | 10% | Usa Tailwind y layout responsive | Bajo/medio |
| Backend - API RESTful | 15% | No existe backend Node/Express | Alto |
| Base de datos y conectividad | 15% | No hay MySQL/Mongo real; se usa localStorage | Alto |
| Validaciones Backend | 10% | No existen porque no hay backend | Alto |
| Seguridad | 10% | Se quito admin inseguro, pero no hay JWT/CORS/auth backend | Alto |
| Funcionalidades especificas | 15% | Cotizador y captura de leads funcionan de forma local | Medio |
| Entrega y presentacion | 5% | Falta actualizar README final y documentar ejecucion completa | Medio |

## Que falta para apuntar a una calificacion alta

### 1. Backend Node.js + Express

Crear una carpeta `backend/` con servidor Express y endpoints REST:

- `GET /api/services`
- `GET /api/portfolio`
- `POST /api/leads`
- `GET /api/leads`
- `PUT /api/leads/:id/status`
- `POST /api/portfolio`
- `DELETE /api/portfolio/:id`

### 2. Base de datos real

La rubrica pide persistencia real y CRUD. Opciones:

- MySQL + phpMyAdmin, recomendado si el profesor lo espera.
- SQLite, mas facil para demo local.
- MongoDB, si aceptan documentos.

Para tu reporte original, lo mas alineado es MySQL.

Tablas sugeridas:

- `services`
- `leads`
- `lead_services`
- `portfolio_projects`
- `lead_status_history`

### 3. Validaciones backend

Repetir en servidor las validaciones del frontend:

- email valido
- telefono de 10 digitos
- ZIP de 5 digitos
- fecha no pasada
- longitud maxima
- bloqueo de caracteres de script
- validar que el servicio exista

### 4. Seguridad

Para cumplir al menos competente/sobresaliente:

- CORS configurado
- Helmet para cabeceras de seguridad
- Rate limit en formularios
- Validacion/sanitizacion backend
- Si se agrega panel privado: login + JWT + rutas protegidas

Como pediste evitar una puerta facil para hackers, conviene no exponer admin publico hasta tener autenticacion real.

### 5. Documentacion

Actualizar `README.md` con:

- como instalar frontend
- como instalar backend
- como crear la base de datos
- variables de entorno
- endpoints disponibles
- capturas o instrucciones de prueba

## Como verificarlo tu mismo ahora

Frontend:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Datos actuales:

- No estan en MySQL.
- Se guardan en `localStorage`.
- Ver en navegador: F12 > Application > Local Storage > `stratedge_leads`.

Validaciones:

- Archivo principal: `src/utils/validation.js`
- Formulario: `src/components/QuoteForm.jsx`

## Prioridad recomendada

1. Crear backend Node/Express.
2. Crear base de datos MySQL.
3. Cambiar `localStorage` por peticiones `fetch` al backend.
4. Agregar validaciones backend y seguridad basica.
5. Actualizar README y guia de verificacion.

