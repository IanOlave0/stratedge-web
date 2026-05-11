# AGENTS.md

## Project purpose
Premium web platform for a strategic marketing agency. The centerpiece is an interactive "Wizard" for real-time project quoting, with a dark professional design.

## Commands
- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build → `dist/`
- `npm run lint` — ESLint (flat config at `eslint.config.js`)
- `npm run preview` — preview the production build locally

## Stack
- **Frontend:** React 19 + Vite 8, pure JavaScript/JSX (no TypeScript)
- **Styling:** Tailwind CSS v4 (CSS-first via `@import "tailwindcss"` in `src/index.css`, `@tailwindcss/vite` plugin — no `tailwind.config.js` or `postcss.config.js` needed)
- **Routing:** React Router DOM v7 (v6-compatible API: `BrowserRouter`, `Routes`, `Route`)
- **UI components:** shadcn/ui (Radix UI primitives) — to be installed
- **Icons:** lucide-react — to be installed
- **Forms:** React Hook Form + Zod validation — to be installed
- **Backend/DB:** Por definir (PostgreSQL-based, e.g. Supabase — no confirmado)

## Architecture
```
src/
  main.jsx              → entry, renders <App />
  App.jsx               → BrowserRouter + Navbar/Footer shell, routes
  pages/
    Home.jsx            → route "/"
    Cotizador.jsx       → route "/cotizar"
  components/
    Navbar.jsx
    Footer.jsx
    HeroSection.jsx
    PortafolioGrid.jsx
    WizardCotizacion.jsx  → multi-step quote form (useState)
  index.css             → @import "tailwindcss"
  App.css               → legacy template styles (mostly unused)
```

## Design system
- **Theme:** Dark mode (`slate-950` base, `slate-900` cards, `slate-800` borders)
- **Accent:** `emerald-500` / `emerald-600`
- **Components:** shadcn/ui only for UI primitives — do not introduce other component libraries
- **Tailwind utility classes** exclusively for styling. No CSS modules or CSS-in-JS.

## Data model (planned)
Core entities and their relationships:
- **Clientes** → linked to RedesSociales, PlataformasAds, Campañas
- **Cotizaciones** ↔ Servicios (N:M via Cotizacion_Servicios)
- **Servicios** (catalog) → feeds both Wizard and Portafolio
- **Portafolio** → linked to Servicios, child table Portafolio_Imagenes
- **Administrador** → internal platform management

## Conventions
- **Code language:** Variables, functions, hooks, and component names in **English** (e.g., `currentStep`, `useQuoteStore`). camelCase for variables/functions, PascalCase for components.
- **Comments:** Technical documentation and logic explanations in **Spanish**.
- **UI text:** Currently in **Spanish**, but structured with i18n support in mind (target California / English market in the future). Use translation keys or namespaced string constants rather than hardcoded Spanish strings deep in components.
- **Exports:** `export default` for all components.
- **ESLint quirks:** `no-unused-vars` ignores uppercase identifiers (`^[A-Z_]`). Importing `React` won't trigger warnings even if JSX transform handles it.
- **No TypeScript:** Do not add `.ts`/`.tsx` files or TypeScript syntax.

## Agent Skills
Install via `npx skills add <owner/repo> --skill <name> -a opencode`. Search with `npx skills find <query>`.

**Installed (5):**

| Skill | Source | Installs | Role |
|---|---|---|---|
| `find-skills` | vercel-labs/skills | — | Busca skills en el ecosistema |
| `shadcn` | shadcn/ui (oficial) | 134K | Componentes shadcn/ui, CLI, estilos |
| `frontend-design` | anthropics/skills | 392K | Diseño frontend de alta calidad |
| `tailwind-css-patterns` | developer-kit | 10.7K | Patrones avanzados de Tailwind CSS |
| `stratedge-conventions` | custom (local) | — | Reglas del proyecto: JS puro, español, i18n, tema emerald |

**Planned:**
- `supabase` (oficial, 60.8K) — cuando se confirme el backend
- `react-hook-form-zod` (custom) — convenciones de formularios del Wizard
- `i18n` (custom) — estructura de traducciones ES→EN
