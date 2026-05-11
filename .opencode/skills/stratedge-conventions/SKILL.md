---
name: stratedge-conventions
description: Convenciones específicas del proyecto Stratedge que complementan otros skills (shadcn, frontend-design, tailwind-css-patterns). Usar siempre que se escriba o modifique código en este proyecto. Cubre: idioma (JS, no TS), naming (inglés), comentarios (español), i18n, tema oscuro emerald, y patrones de exportación.
---

# Stratedge — Convenciones del Proyecto

Este skill define las reglas que aplican a **todo** el código del proyecto. Complementa al skill oficial `shadcn` y `frontend-design` de Anthropic con las restricciones locales.

## Reglas absolutas (aplicar en cada archivo)

### 1. JavaScript puro, nunca TypeScript

- Archivos `.jsx` y `.js` exclusivamente. **Nunca** crear `.tsx` o `.ts`.
- Al adaptar código de shadcn: eliminar anotaciones de tipo, interfaces, `import type`, genéricos.
- Los props se documentan con JSDoc en español:

```js
/**
 * @param {string} label - Texto del botón
 * @param {() => void} onClick - Manejador de clic
 * @param {"default" | "destructive"} [variant="default"] - Variante visual
 */
export default function MyButton({ label, onClick, variant = "default" }) {
```

### 2. Naming en inglés, comentarios en español

| Qué | Idioma | Ejemplo |
|-----|--------|---------|
| Variables, funciones | **inglés** | `currentStep`, `handleSubmit`, `useQuoteStore` |
| Nombres de componentes | **inglés** (PascalCase) | `QuoteWizard`, `ServiceCard` |
| Comentarios y JSDoc | **español** | `// Calcula el total de servicios seleccionados` |
| Texto de UI (labels, placeholders, errores) | **español** (i18n-ready) | Usar claves o constantes, no strings hardcodeados |

### 3. Export default

Todos los componentes usan `export default function Componente()`. No usar named exports para componentes.

```js
// Correcto
export default function ServiceSelector() { ... }

// Incorrecto
export function ServiceSelector() { ... }
```

### 4. Tema visual

| Elemento | Clases |
|----------|--------|
| Fondo de página | `bg-slate-950` |
| Tarjetas / Contenedores | `bg-slate-900 border border-slate-800` |
| Acento primario | `emerald-500`, `emerald-600` |
| Acento hover | `emerald-400` |
| Texto principal | `text-white` o `text-slate-200` |
| Texto secundario | `text-slate-400` |
| Texto terciario | `text-slate-500` |

- Fondo general de la app ya está en `App.jsx`: `<div className="min-h-screen bg-slate-950 ...">`
- **No uses `bg-white` o temas claros** a menos que sea un componente overlay (Dialog, Sheet) que shadcn maneja con sus tokens.

### 5. i18n — texto de UI preparado para internacionalización

Actualmente el texto de UI está en español, pero debe ser fácil de migrar a inglés (mercado California en el futuro).

- **Evitar** strings de UI hardcodeados en JSX profundo.
- **Preferir** un archivo de constantes o un sistema de claves:

```js
// src/i18n/strings.js (ejemplo — la implementación final puede variar)
export const UI = {
  hero: {
    tagline: "Agencia de Marketing Digital & Estrategia Avanzada",
    cta: "Cotizar Proyecto",
  },
  wizard: {
    stepLabel: (current, total) => `Paso ${current} de ${total}`,
    next: "Siguiente →",
    back: "← Anterior",
    submit: "Enviar Cotización",
  },
};
```

- Si se usa una librería como `react-i18next`, mantener los namespaces organizados por página/componente.

### 6. Dependencias del proyecto

Las que deben estar instaladas para el stack planeado:

```bash
npm install clsx tailwind-merge        # Utilidades (cn)
npm install lucide-react               # Íconos
npm install react-hook-form @hookform/resolvers zod  # Formularios + validación
```

- `clsx` + `tailwind-merge`: la función `cn()` debe vivir en `src/lib/utils.js`.
- No instalar otras librerías de componentes (MUI, Ant Design, Chakra, etc.). Solo shadcn/ui.
- No instalar otras librerías de íconos. Solo `lucide-react`.

### 7. Estructura de directorios relevante

```
src/
  components/
    ui/            ← componentes shadcn/ui (los genera el CLI oficial)
    Navbar.jsx
    Footer.jsx
    HeroSection.jsx
    ...
  pages/
    Home.jsx
    Cotizador.jsx
  lib/
    utils.js       ← función cn() y utilidades compartidas
  i18n/
    strings.js     ← constantes de texto de UI (a crear)
```
