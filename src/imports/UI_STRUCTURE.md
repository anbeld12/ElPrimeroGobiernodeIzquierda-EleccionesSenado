# UI_STRUCTURE.md
## El Congreso 2026 a Través de los Datos
**Materia:** BOG-2029789-1-2026-01 — El Primer Gobierno de Izquierda en Colombia: Elementos para un Balance  
**Archivo principal:** `src/app/App.tsx`  
**Fuentes tipográficas:** `src/styles/fonts.css`  
**Tokens de diseño:** `src/styles/theme.css`

---

## 1. SISTEMA DE DISEÑO

### 1.1 Paleta de Color

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0F172A` | Encabezados, texto principal, bordes de énfasis |
| `slate` | `#475569` | Cuerpo de texto, subtítulos, etiquetas |
| `ivory` | `#FAF9F6` | Fondo global de la página |
| `white` | `#FFFFFF` | Fondo de tarjetas y tablas |
| `soft` | `#F1F5F9` | Fondo de secciones de cierre, cabeceras de tabla |
| `border` | `#E2E8F0` | Líneas divisorias (1px sólido) |
| `dark` | `#1E293B` | Fondo del banner de rigor de datos (§02) |

#### Variables políticas (uso exclusivo en datos y gráficas)

| Token | Hex | Partido / Bloque |
|---|---|---|
| `ph` | `#6D28D9` | Pacto Histórico |
| `cd` | `#991B1B` | Centro Democrático |
| `liberal` | `#1E3A8A` | Partido Liberal Colombiano |
| `alianza` | `#D97706` | Alianza por Colombia |
| `conservador` | `#15803D` | Partido Conservador |
| `laU` | `#64748B` | Partido de la U |
| `cambio` | `#0F766E` | Cambio Radical – ALMA |
| `ahora` | `#7C3AED` | ¡Ahora Colombia! |
| `salvacion` | `#C2410C` | Salvación Nacional |
| `indigenas` | `#065F46` | Circunscripción Indígena |
| `oposicion` | `#374151` | Estatuto de la Oposición |

### 1.2 Tipografía

| Rol | Familia | Peso | Tamaño | Interlineado |
|---|---|---|---|---|
| H1 — Titular héroe | Playfair Display | 500 | 42px | 1.2 |
| H2 — Encabezado de sección | Playfair Display | 500 | 26px | 1.3 |
| Cuerpo | Inter | 400 | 13–15px | 1.7 |
| Etiquetas / monospace UI | Roboto Mono | 400–600 | 9–13px | 1.4 |
| KPI grande | Roboto Mono | 600 | 32–52px | 1.0 |

- Rastreo de etiquetas uppercase: `letter-spacing: 0.12em`
- Interlineado editorial en párrafos analíticos: `line-height: 1.7`

### 1.3 Cuadrícula y Espaciado

| Parámetro | Valor |
|---|---|
| Max-width contenedor | 1440px |
| Margen lateral | 80px (`padding: 0 80px`) |
| Gutter entre columnas (CSS Grid `gap`) | 48px entre bloques mayores |
| Escala de espaciado vertical | 8 · 16 · 24 · 32 · 48 · 64px |
| Padding interno de secciones | `64px 80px` (vertical / horizontal) |
| Padding del header | `32px 80px` |
| Sangría de contenido bajo §-número | `paddingLeft: 48px` |

### 1.4 Bordes y Radio

| Elemento | Especificación |
|---|---|
| Tarjetas, tablas, banners | `border: 1px solid #E2E8F0` · `border-radius: 2px` |
| Divisor de sección | `height: 1px` · `background-color: #E2E8F0` |
| Botones de tab toggle | `border-radius: 2px` · `overflow: hidden` |
| Bloques de alerta (umbral) | `border: 1px solid #FECACA` · `background: #FEF2F2` · `border-radius: 2px` |

---

## 2. COMPONENTES GLOBALES

### `<Divider />`
Línea horizontal de 1px `#E2E8F0`. Separa todas las secciones. No tiene margen propio.

### `<SectionNum n="§ XX" />`
Etiqueta prefija de sección en `Roboto Mono` 11px, uppercase, `opacity: 0.35`. Aparece inline antes del H2. Ejemplo: `§ 03`.

### `<KpiCard />`
Tarjeta de métrica con:
- Fondo `#FFFFFF` · borde `1px #E2E8F0` · `border-radius: 2px` · `padding: 20px 24px`
- Label: `Inter` 10px · uppercase · `#475569`
- Valor: `Roboto Mono` 32px · semibold · `#0F172A`
- Sub-texto: `Inter` 13px · `#475569`
- Delta: `Roboto Mono` 11px · verde `#15803D` (positivo) o rojo `#B91C1C` (negativo)

### `<SenateSemicircle />`
SVG puro. `viewBox="0 0 600 295"`. Tres arcos concéntricos (r = 140, 175, 210) con 31 + 36 + 36 = 103 círculos `r=5.6`. Orden espectral izquierda → derecha: Oposición, Indígenas, PH, Ahora Colombia, Salvación, Liberal, La U, Cambio Radical, Alianza, Conservador, CD. Guías de arco en `strokeDasharray: "2 5"` · color `#E2E8F0`.

### `<SvgScatter />`
SVG puro `viewBox="0 0 560 290"`. Área de trazado con padding `{top:16, right:20, bottom:36, left:38}`. Incluye: grilla de líneas punteadas, ejes x/y con etiquetas en `Roboto Mono` 8px, línea de referencia PH nacional (+5.77pp) en `#6D28D9` con 40% de opacidad, círculos de datos `r=7` (highlight) / `r=4.5` (resto), tooltip posicionado por porcentaje.

---

## 3. ESTRUCTURA DE SECCIONES

---

### HEADER — Identidad institucional

| Propiedad | Valor |
|---|---|
| Altura | 72px |
| Fondo | `#FAF9F6` |
| Borde inferior | `1px solid #E2E8F0` |
| Layout | `flex · justify-content: space-between · align-items: center` |
| Tipografía | `Roboto Mono` · 11px · uppercase · `letter-spacing: 0.1em` · color `#475569` |
| Izquierda | `BOG-2029789-1-2026-01 · EL PRIMER GOBIERNO DE IZQUIERDA EN COLOMBIA` |
| Derecha | `Análisis Territorial de Datos · Congreso 2026` |

---

### § 01 — HERO: La Fragmentación del Mandato

| Propiedad | Valor |
|---|---|
| Padding | `80px 80px` |
| Layout | CSS Grid `7fr 5fr` · gap 64px |
| Fondo | `#FAF9F6` (global) |

**Columna izquierda (7fr):**
- Badges: 2 etiquetas en `Roboto Mono` 10px uppercase, `padding: 4px 10px`, `border: 1px solid #E2E8F0`
- H1: `Playfair Display` 42px / weight 500 / `letter-spacing: -0.01em` / color `#0F172A`
- Párrafo: `Inter` 15px / `line-height: 1.7` / color `#475569` / `max-width: 540px`
- Dateline: `Roboto Mono` 11px · color `#475569` · separador `|` en `#E2E8F0`

**Columna derecha (5fr) — Stack de 4 KpiCards:**
1. Censo Electoral Nacional → `41,287,084`
2. Votación Total Senado → `20,900,614` (50.62%)
3. Abstención General → `20,386,470` (49.38%)
4. Votos Válidos → `19,423,187` (93.08%)

---

### § 02 — RIGOR METODOLÓGICO

| Propiedad | Valor |
|---|---|
| Fondo | `#1E293B` (dark) |
| Padding | `32px 80px` |
| Layout | 2 filas con flex, `gap: 24px` por fila |

**Fila 1 — Rigor de datos:**
- Badge `RIGOR DE DATOS`: `Roboto Mono` 10px uppercase · `border: 1px solid #475569` · color `#94A3B8`
- Texto: `Inter` 13px / `line-height: 1.7` / color `#CBD5E1`
- Énfasis en blanco: porcentaje 99.997%, nombres de fuentes (Registraduría, CNE, DANE)

**Fila 2 — Nota metodológica:**
- Badge `NOTA METODOLÓGICA`: mismo estilo
- Texto: color `#94A3B8` / Énfasis en `#CBD5E1` para "Pacto Histórico como partido unificado"

---

### § 03 — COMPOSICIÓN PARLAMENTARIA 2026–2030

| Propiedad | Valor |
|---|---|
| Padding | `64px 80px` |
| Fondo | `#FAF9F6` |

**Tab toggle:** Dos botones `Senado (103 curules)` / `Cámara (183 curules)`. Tab activo: fondo `#0F172A` · texto `#FAF9F6`. Tab inactivo: fondo transparente · texto `#475569`. Tipografía `Roboto Mono` 10px uppercase.

#### Tab Senado — Layout: `7fr 5fr` · gap 48px

**Izquierda:**
- `<SenateSemicircle />` (SVG 600×295, responsive)
- Leyenda debajo en grid 2 columnas: dot de color + número en Roboto Mono bold + nombre partido en Inter 11px

**Derecha:**
- Tabla con `border: 1px solid #E2E8F0` · `border-radius: 2px` · `overflow: hidden`
- Cabecera: fondo `#F1F5F9` · `Roboto Mono` 9px uppercase · columnas: Partido / Votos / % / Curules
- Filas alternadas (líneas pares con `rgba(241,245,249,0.5)`)
- Fila Total: `border-top: 2px solid #0F172A`
- Curules en color del partido, peso 700
- Nota pie: `Roboto Mono` 10px · `#475569`

#### Tab Cámara — Layout: columna única

- Aviso informativo: `padding: 16px` · fondo `#F1F5F9` · `border: 1px solid #E2E8F0` · `font-size: 13px`
- Tabla 3 columnas: Partido / Curules / Concentración Territorial
- Misma estructura visual que tabla Senado

---

### § 04 — PACTO HISTÓRICO: 2022 vs. 2026

| Propiedad | Valor |
|---|---|
| Fondo | `#F1F5F9` (soft) |
| Padding | `64px 80px` |
| Layout columnas | `1fr 1fr 1fr` · gap 0 · bordes compartidos |

**Tarjeta A — 2022:** `border: 1px solid #E2E8F0` · `border-right: none` · `border-radius: 2px 0 0 2px`
- Valor principal: `Roboto Mono` 34px · `2,880,254`
- Sub-métricas: 16.95% y 20 curules en `Roboto Mono` 20px · color `#6D28D9`

**Bloque Delta central:** `border: 1px dashed #6D28D9` · fondo `rgba(109,40,217,0.03)`
- Valor grande: `Roboto Mono` 40px · weight 700 · `+53.24%` · color `#6D28D9`
- H2-style: `Playfair Display` 14px
- Tabla de 3 indicadores: fila con justify-between · `border-bottom: 1px solid #E2E8F0`

**Tarjeta B — 2026:** `border: 1px solid #6D28D9` · `border-left: none` · `border-radius: 0 2px 2px 0`
- Valor principal: `Roboto Mono` 34px · `4,413,636`
- Sub-métricas: 22.72% y 25 curules en `Roboto Mono` 20px · color `#6D28D9`

---

### § 05 — COLAPSO DEL PROGRESISMO DISIDENTE

| Propiedad | Valor |
|---|---|
| Fondo | `#FAF9F6` |
| Padding | `64px 80px` |
| Layout | `5fr 7fr` · gap 48px |

**Columna izquierda (5fr) — Diagrama de flujo SVG:**
- `viewBox="0 0 320 380"` · responsive
- Nodo origen "IZQUIERDA ALTERNATIVA 2022": rect con fondo `rgba(109,40,217,0.18)` · `stroke: #6D28D9`
- Flechas en SVG `<path>` con `stroke: #6D28D9` (izq) y `stroke: #DC2626` (der)
- Nodo "CAPTADO POR PACTO HISTÓRICO": rect `rgba(109,40,217,0.22)` · `stroke-width: 1.5`
- Nodo "BAJO EL UMBRAL (3%)": rect `#FEF2F2` · `stroke: #DC2626`
- Sub-nodos FAU y FC: rects `#FEF2F2` · `stroke: #FCA5A5`
- Nodo resultado "25 CURULES": rect `rgba(109,40,217,0.10)` · `stroke: #E2E8F0`
- Tipografía interna: `Roboto Mono` 8–9px

**Columna derecha (7fr) — Bloque de datos:**

*Barras de umbral (por partido):*
- Header: dot rojo + etiqueta `UMBRAL LEGAL 3% = 582,695 VOTOS`
- Por cada colectividad: label + valor en rojo `#B91C1C` / barra CSS `height: 32px` fondo `#F1F5F9` / barra fill `#CBD5E1` proporcional / línea de umbral `width: 2px` color `#DC2626` en posición `~86%` con etiqueta flotante `UMBRAL 3%` / escala numérica inferior en Roboto Mono 8px
- Alerta inferior: `background: #FEF2F2` · `border: 1px solid #FECACA`

*Gráfica comparativa CSS (3 grupos):*
- Título en `Roboto Mono` 9px uppercase
- Leyenda: dot gris `#94A3B8` (2022) y dot rojo `#DC2626` (2026)
- Barras en pares: `height: 10px` · `background: #F1F5F9` · fill proporcional
- Valores en `Roboto Mono` 9px alineados a la derecha

*Nota informativa:* `background: #F1F5F9` · `border: 1px solid #E2E8F0`

---

### § 06 — PARADOJA DE LA MOVILIZACIÓN

| Propiedad | Valor |
|---|---|
| Fondo | `#FAF9F6` |
| Padding | `64px 80px` |
| Layout | `7fr 5fr` · gap 48px |

**Columna izquierda (7fr) — `<SvgScatter />`:**
- Encabezado: `Roboto Mono` 9px uppercase
- Sub-encabezado: `Inter` 11px
- Coeficientes de correlación (4 etiquetas inline):
  - Verde–Centro Esperanza: `r = −0.33` · color `#15803D`
  - Fuerza Ciudadana: `r = +0.17` · color `#0F766E`
  - % PH 2022: `r = −0.17` · color `#6D28D9`
  - Crecimiento total: `r = −0.02` · color `#475569`
- Canvas SVG `560×290` · padding interno `{T:16, R:20, B:36, L:38}`
- Grilla: `strokeDasharray: "3 3"` · `stroke: #E2E8F0`
- Ejes: ticks X cada 5% (0–25) · ticks Y cada 5pp (0–15)
- Línea referencia PH: `stroke: #6D28D9` 40% opacidad · `strokeDasharray: "4 4"`
- Puntos destacados (h=true): `r=7` · `fill: #6D28D9` · `opacity: 0.85`
- Puntos regulares: `r=4.5` · `fill: #94A3B8` · `opacity: 0.5`
- Tooltip: absoluto · fondo `#FFFFFF` · `border: 1px solid #E2E8F0` · `Roboto Mono` 10px

**Columna derecha (5fr) — Stack vertical:**

*Barras de participación (CSS horizontal):*
- 4 filas: Legislativas 2022 / 2026, Presidencial 1ª V. / 2ª V.
- Colores: gris `#475569` / violeta `#6D28D9` / verde azulado `#0F766E` / dorado `#D97706`
- Escala: dominio 40–68% · `height: 14px` por barra
- Valores en `Roboto Mono` 10px a la derecha
- Eje numérico inferior: 40%, 50%, 60%, 68%

*Texto analítico:* `Inter` 13px / `padding: 16px` / `border: 1px solid #E2E8F0`

*Tabla de índices Gini:*
- Cabecera `Roboto Mono` 8px uppercase · 3 columnas: Colectividad / Gini / Concentración
- Barra visual inline: `width: 40px · height: 6px` proporcional al valor Gini
- Pie de tabla: `background: #F1F5F9` · nota metodológica 10px

---

### § 07 — EQUILIBRIO DEL CONGRESO FRENTE AL EJECUTIVO

| Propiedad | Valor |
|---|---|
| Fondo | `#F1F5F9` (soft) |
| Padding | `64px 80px` |

**Bloque presidencial — Grid `1fr 1fr`:**
- Tarjeta De la Espriella: `border: 1px solid #E2E8F0` · valor `49.66%` en `Roboto Mono` 28px · color `#991B1B`
- Tarjeta Cepeda Castro: misma estructura · valor `48.70%` · color `#6D28D9`
- Nombre en `Playfair Display` 20px · partido en `Inter` 12px

**Mapa de fuerzas — Grid `1fr 1fr 1fr` · bordes compartidos · `border: 1px solid #E2E8F0`:**

| Tarjeta | Curules | Color acento | Fondo |
|---|---|---|---|
| Bancada de Oposición | 28 | `#6D28D9` | `rgba(109,40,217,0.04)` |
| Bloque Bisagra / Independiente | 27 | `#0F766E` | `rgba(15,118,110,0.04)` |
| Bancada Afín al Gobierno | 48 | `#991B1B` | `rgba(153,27,27,0.04)` |

- Número grande: `Roboto Mono` 52px · weight 700 · color del acento
- Subtítulo del bloque: `Roboto Mono` 9px uppercase · color del acento
- Detalle de composición: `Inter` 13px · `#0F172A`
- Nota liderazgo: `Inter` 11px italic · `#475569` · `border-top: 1px solid #E2E8F0`

**Bloque de análisis final — Grid `3fr 1fr`:**
- Texto: `Inter` 14px / `line-height: 1.7` / `padding: 24px`
- Métrica de margen: `Roboto Mono` 32px · `+0.96pp` · color `#991B1B`
- Sub-nota: `Inter` 11px / `#475569`

---

### FOOTER

| Propiedad | Valor |
|---|---|
| Padding | `32px 80px` |
| Layout | `flex · justify-content: space-between` |
| Tipografía | `Roboto Mono` 9px uppercase / `Inter` 11px |
| Color | `#475569` |
| Izquierda | Fuentes primarias: Registraduría · CNE |
| Derecha | Código de materia · fecha |

---

## 4. DATOS OFICIALES DE REFERENCIA

### Senado de la República — 103 curules

| Partido | Votos | % | Curules | Token color |
|---|---|---|---|---|
| Pacto Histórico | 4,413,636 | 22.72% | 25 | `ph` #6D28D9 |
| Centro Democrático | 3,035,715 | 15.62% | 17 | `cd` #991B1B |
| Partido Liberal | 2,275,182 | 11.71% | 13 | `liberal` #1E3A8A |
| Alianza por Colombia | 1,904,154 | 9.80% | 10 | `alianza` #D97706 |
| Partido Conservador | 1,863,663 | 9.59% | 10 | `conservador` #15803D |
| Partido de la U | 1,565,786 | 8.06% | 9 | `laU` #64748B |
| Cambio Radical – ALMA | 1,248,021 | 6.42% | 7 | `cambio` #0F766E |
| ¡Ahora Colombia! | 900,606 | 4.63% | 5 | `ahora` #7C3AED |
| Salvación Nacional | 705,924 | 3.63% | 4 | `salvacion` #C2410C |
| Circunscripción Indígena | — | — | 2 | `indigenas` #065F46 |
| Estatuto de la Oposición | — | — | 1 | `oposicion` #374151 |
| **Total** | **19,423,187** | **100%** | **103** | |

### Métricas macro — Senado 2026

| Métrica | Valor | vs. 2022 |
|---|---|---|
| Censo Electoral Nacional | 41,287,084 | +6.34% |
| Participación electoral | 20,900,614 (50.62%) | −4.38 pp vs. 54.02% |
| Abstención electoral | 20,386,470 (49.38%) | +4.38 pp |
| Votos válidos | 19,423,187 (93.08%) | −1.15 pp |
| Votos en blanco | 616,998 (3.17%) | +1.07 pp |

### Pacto Histórico — Comparativa legislativa

| Indicador | 2022 | 2026 | Variación |
|---|---|---|---|
| Votación absoluta | 2,880,254 | 4,413,636 | +53.24% |
| Porcentaje electoral | 16.95% | 22.72% | +5.77 pp |
| Curules Senado | 20 | 25 | +5 (+25%) |
| Tipo de lista | Cerrada (coalición) | Cerrada cremallera paridad | Mayor representación femenina (52%) |

### Colapso izquierda disidente — Umbral legal 3% = 582,695 votos

| Colectividad | Votos 2026 | % | Consecuencia |
|---|---|---|---|
| Frente Amplio Unitario | 396,042 | 2.03% | Pérdida personería jurídica |
| Fuerza Ciudadana – Comunes | 114,722 | 0.59% | Pérdida personería · eliminación 10 curules de paz |

### Participación electoral comparada

| Etapa | Participación | Color |
|---|---|---|
| Legislativas 2022 | 54.02% | `#475569` |
| Legislativas 2026 | 50.62% | `#6D28D9` |
| Presidencial 1ª vuelta 2026 | 57.89% | `#0F766E` |
| Presidencial 2ª vuelta 2026 | 63.60% (26,345,588 sufragantes) | `#D97706` |

### Resultado presidencial 2026

| Candidato | Partido | 2ª Vuelta % | Votos |
|---|---|---|---|
| Abelardo de la Espriella (electo) | Defensores de la Patria | 49.66% | 12,959,542 |
| Iván Cepeda Castro | Pacto Histórico | 48.70% | 12,708,312 |
| Margen de victoria | | +0.96 pp | 251,230 votos |

### Mapa de fuerzas — Senado 2026–2030

| Bloque | Composición | Curules |
|---|---|---|
| Bancada de Oposición | PH (25) + Indígenas (2) + Estatuto Oposición (1) | 28 |
| Bloque Bisagra / Independiente | Liberal (13) + La U (9) + Ahora Colombia (5) | 27 |
| Bancada Afín al Gobierno | CD (17) + PC (10) + CR–ALMA (7) + SN (4) + Alianza (10) | 48 |
| **Total** | | **103** |

### Índices de Gini — Concentración territorial del voto

| Colectividad | Gini | Interpretación |
|---|---|---|
| PH 2022 (Coalición) | 0.88 | Alta concentración territorial |
| PH 2026 (Partido Unificado) | 0.85 | Alta concentración territorial |
| Electorado general 2026 | 0.75 | Moderada-alta concentración |

### Coeficientes de correlación — Scatter §06

| Variable independiente (X) | Correlación con variación PH (Y) |
|---|---|
| % votos Verde–Centro Esperanza 2022 | r = −0.33 |
| % votos Fuerza Ciudadana 2022 | r = +0.17 |
| % Pacto Histórico 2022 | r = −0.17 |
| Crecimiento total de votos 2022→2026 | r = −0.02 |

---

## 5. COMPONENTES SVG INTERNOS

### SenateSemicircle
```
viewBox: "0 0 600 295"
Centro (cx, cy): (300, 265)
Arcos: r=140 (31 dots), r=175 (36 dots), r=210 (36 dots)
Radio de cada dot: 5.6
Padding angular: 0.08 rad en cada extremo
Orden espectral: Oposición → Indígenas → PH → Ahora → Salvación → Liberal → LaU → Cambio → Alianza → Conservador → CD
```

### SvgScatter
```
viewBox: "0 0 560 290"
Padding: {top:16, right:20, bottom:36, left:38}
Eje X: % votos alternativos 2022, dominio [0–26]
Eje Y: variación PH en pp, dominio [0–17]
Línea referencia: y = 5.77pp (Δ PH nacional)
Dots destacados (h=true): r=7, fill #6D28D9, opacity 0.85
Dots regulares (h=false): r=4.5, fill #94A3B8, opacity 0.5
Tooltip: posición relativa porcentual sobre SVG
```

### Sankey Flow SVG (§05)
```
viewBox: "0 0 320 380"
Nodo fuente: rect x=10 y=30 w=120 h=48
Nodo PH captura: rect x=10 y=160 w=120 h=56
Nodo umbral: rect x=150 y=160 w=155 h=42
Sub-nodo FAU: rect x=150 y=220 w=155 h=52
Sub-nodo FC: rect x=150 y=284 w=155 h=52
Nodo resultado: rect x=10 y=240 w=120 h=52
```

---

## 6. COMPORTAMIENTO INTERACTIVO

| Componente | Interacción | Implementación |
|---|---|---|
| Tab toggle §03 | Click alterna Senado / Cámara | `useState<"senado" \| "camara">` |
| `<SvgScatter />` | Hover sobre dot muestra tooltip | `useState` · `onMouseEnter` · `onMouseLeave` |
| Filas de tablas | Hover cambia fondo | `CSS :hover` via `className="hover:bg-secondary"` o inline |

---

## 7. FUENTES Y RIGOR DE DATOS

| Fuente | Rol |
|---|---|
| Registraduría Nacional del Estado Civil | Escrutinios definitivos E-26, preconteo y resultados oficiales |
| Consejo Nacional Electoral (CNE) | Validación de umbral legal, personerías jurídicas |
| DANE | Contexto demográfico y censal |

- Coincidencia matemática preconteo vs. escrutinio definitivo: **99.997%**
- Diferencia técnica: **por debajo de cero** según el CNE
- Análisis disponible a nivel municipal y departamental
