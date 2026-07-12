# Design Guidelines — El Primer Gobierno de Izquierda

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS 4 (`@import 'tailwindcss'` with `@theme inline` tokens)
- shadcn/ui components (Radix primitives)
- Recharts for charts, Leaflet for maps
- next-themes for dark mode

## Responsive Breakpoints
- **Mobile**: `<768px` — single column, 16px padding
- **Tablet**: `≥768px` (md:) — 2-column grids, 32px padding
- **Desktop**: `≥1024px` (lg:) — multi-column, 80px padding
- Container max-width: 90rem (1440px)

## Color Tokens (Tailwind)
All colors in `constants.ts` (`C.ph`, `C.ink`, etc.) are mapped in `theme.css` under `@theme inline`:
```
bg-ivory text-ink border-border-default bg-ph text-slate bg-soft bg-dark
```
Party colors are fixed and do NOT change in dark mode.

## Typography
- **Editorial/Display**: Playfair Display (`font-editorial`)
- **Body/UI**: Inter (`font-sans` — default)
- **Data/Mono**: Roboto Mono (`font-mono`)
- Headings: `font-editorial text-xl md:text-[26px] font-medium`
- Data values: `font-mono text-2xl md:text-[32px] font-semibold`
- Labels/meta: `font-mono text-[10px] tracking-[0.12em] uppercase`

## Anatomy of a Section
```tsx
<section id="name" className="section-container py-10 md:py-16">
  <SectionNum n="§ 0X" />
  <h2 className="font-editorial text-xl md:text-[26px] ...">Title</h2>
  <p className="pl-0 md:pl-12 ...">Subtitle</p>
  <div className="pl-0 md:pl-12 grid grid-cols-1 lg:grid-cols-[...]">
    ...
  </div>
</section>
```

## Scrolling
- All sections have `id` attributes for smooth scroll navigation
- `Reveal` component wraps sections for IntersectionObserver-based fade-in
- `<html class="scroll-smooth">`

## Accessibility
- Skip-to-content link in `index.html`
- `role="tablist"`, `role="tab"`, `role="tabpanel"` on tab interfaces
- `scope="col"` on table headers
- `aria-label` on navigation and interactive controls
- Focus-visible rings: 2px solid #6D28D9

## Hover/Interactive States
- Cards: `hover:shadow-sm transition-shadow`
- Interactive table rows: `hover:opacity-80 cursor-pointer transition-all`
- Buttons/controls: `transition-all duration-150`
- Map panel: `hover:text-ink transition-colors`

## Data Management
- `MunicipiosContext` — single shared instance of `useMunicipios()` hook, provided at app level via `MunicipiosProvider`
- Consumed via `useMunicipiosData()` in `MapaTerritorial`, `BarrasIzquierda`, `LorenzCurve`
- GeoJSON (~2.3MB) parsed once; all derived computations (Gini, Lorenz, aggregates) cached with `useMemo`

## Security
- All Leaflet tooltip HTML is sanitized via `DOMPurify.sanitize()` before `bindTooltip()`
- Data comes from static `municipios.json` bundled at build time (low supply-chain risk)

## Responsive Chart Patterns
- **SVG charts** (SenateSemicircle, SankeyFlow): use `viewBox` + `w-full max-w-full md:max-w-[...]`
- **Recharts**: use `<ResponsiveContainer width="100%" height={...}>`
- **Custom div-based charts** (GiniTable, ThresholdBars, ComparisonBars, ParticipationBars): convert outer containers to Tailwind, wrap tables in `.table-responsive`, use `min-w-[...]` on content and `w-auto min-w-[...]` on labels
- Avoid fixed pixel widths on labels in mobile layouts; prefer `w-auto min-w-[3rem] shrink-0`

## Memory Management
- Async effects: always use `cancelled` flag pattern for cleanup
- IntersectionObserver: always `disconnect()` in effect return
- Leaflet event listeners cleaned up automatically on GeoJSON layer removal

## Reduced Motion
Respected globally via `prefers-reduced-motion: reduce` in `responsive.css`.
All animations disabled when user prefers reduced motion.
