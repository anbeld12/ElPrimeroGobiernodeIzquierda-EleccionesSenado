import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// PALETTE
// ─────────────────────────────────────────────────────────────
const C = {
  ph: "#6D28D9",
  cd: "#991B1B",
  liberal: "#1E3A8A",
  alianza: "#D97706",
  conservador: "#15803D",
  laU: "#64748B",
  cambio: "#0F766E",
  ahora: "#7C3AED",
  salvacion: "#C2410C",
  indigenas: "#065F46",
  oposicion: "#374151",
  ink: "#0F172A",
  slate: "#475569",
  ivory: "#FAF9F6",
  border: "#E2E8F0",
  dark: "#1E293B",
  soft: "#F1F5F9",
  white: "#FFFFFF",
};

// ─────────────────────────────────────────────────────────────
// SENATE DATA
// ─────────────────────────────────────────────────────────────
const SENATE = [
  { party: "Pacto Histórico", votes: 4413636, pct: "22.72%", seats: 25, color: C.ph },
  { party: "Centro Democrático", votes: 3035715, pct: "15.62%", seats: 17, color: C.cd },
  { party: "Partido Liberal", votes: 2275182, pct: "11.71%", seats: 13, color: C.liberal },
  { party: "Alianza por Colombia", votes: 1904154, pct: "9.80%", seats: 10, color: C.alianza },
  { party: "Partido Conservador", votes: 1863663, pct: "9.59%", seats: 10, color: C.conservador },
  { party: "Partido de la U", votes: 1565786, pct: "8.06%", seats: 9, color: C.laU },
  { party: "Cambio Radical – ALMA", votes: 1248021, pct: "6.42%", seats: 7, color: C.cambio },
  { party: "¡Ahora Colombia!", votes: 900606, pct: "4.63%", seats: 5, color: C.ahora },
  { party: "Salvación Nacional", votes: 705924, pct: "3.63%", seats: 4, color: C.salvacion },
  { party: "Circunscripción Indígena", votes: 0, pct: "—", seats: 2, color: C.indigenas },
  { party: "Estatuto de la Oposición", votes: 0, pct: "—", seats: 1, color: C.oposicion },
];

const CAMARA = [
  { party: "Pacto Histórico", seats: 37, color: C.ph, areas: "Bogotá (8), Valle del Cauca (6), Cundinamarca (3)" },
  { party: "Partido Liberal", seats: 25, color: C.liberal, areas: "Antioquia (2), Atlántico (2), Amazonas (1)" },
  { party: "Centro Democrático", seats: 25, color: C.cd, areas: "Antioquia (7), Bogotá (7), Cundinamarca (1)" },
  { party: "Partido Conservador", seats: 19, color: C.conservador, areas: "Bolívar (3), Tolima (3), Caldas (1)" },
  { party: "Partido de la U", seats: 12, color: C.laU, areas: "Valle del Cauca (2), Guainía (1), Vichada (1)" },
  { party: "Cambio Radical – ALMA", seats: 12, color: C.cambio, areas: "Atlántico (3), Arauca (1), Magdalena (1)" },
  { party: "CITREP (Paz)", seats: 16, color: "#6EE7B7", areas: "Zonas rurales y priorizadas" },
  { party: "Otros / Minorías", seats: 27, color: "#94A3B8", areas: "Afrodescendientes, raizales, indígenas" },
];

// Spectrum order for semicircle: left (opposition) → right (government)
const SPECTRUM = [
  { color: C.oposicion, seats: 1 },
  { color: C.indigenas, seats: 2 },
  { color: C.ph, seats: 25 },
  { color: C.ahora, seats: 5 },
  { color: C.salvacion, seats: 4 },
  { color: C.liberal, seats: 13 },
  { color: C.laU, seats: 9 },
  { color: C.cambio, seats: 7 },
  { color: C.alianza, seats: 10 },
  { color: C.conservador, seats: 10 },
  { color: C.cd, seats: 17 },
];

// ─────────────────────────────────────────────────────────────
// PARTICIPATION DATA  (2022 = 54.02% per CNE records)
// ─────────────────────────────────────────────────────────────
const PARTICIPATION = [
  { stage: "Legislativas 2022", value: 54.02, fill: C.slate },
  { stage: "Legislativas 2026", value: 50.62, fill: C.ph },
  { stage: "Presidencial 1ª V.", value: 57.89, fill: C.cambio },
  { stage: "Presidencial 2ª V.", value: 63.6, fill: C.alianza },
];

// ─────────────────────────────────────────────────────────────
// SCATTER DATA — Votación listas alternativas 2022 (% dpto)
//               vs. Variación PH 2022→2026 (pp)
// X = % votos hacia listas alternativas (CE + FC) en 2022
// Y = crecimiento del PH en puntos porcentuales
// ─────────────────────────────────────────────────────────────
const SCATTER_DATA = [
  { dept: "Bogotá D.C.",      x: 18.4, y: 8.2,  h: false },
  { dept: "Antioquia",        x: 12.1, y: 3.1,  h: false },
  { dept: "Valle del Cauca",  x: 14.7, y: 7.4,  h: false },
  { dept: "Cundinamarca",     x: 16.2, y: 4.8,  h: false },
  { dept: "Atlántico",        x: 9.8,  y: 5.2,  h: false },
  { dept: "Bolívar",          x: 7.3,  y: 6.1,  h: false },
  { dept: "Cauca",            x: 8.1,  y: 12.7, h: true  },
  { dept: "Nariño",           x: 6.4,  y: 11.2, h: true  },
  { dept: "Meta",             x: 9.2,  y: 9.4,  h: true  },
  { dept: "Córdoba",          x: 5.6,  y: 4.3,  h: false },
  { dept: "Tolima",           x: 17.8, y: 3.9,  h: false },
  { dept: "Santander",        x: 19.4, y: 2.8,  h: false },
  { dept: "Nte. de Santander",x: 15.3, y: 5.6,  h: false },
  { dept: "Boyacá",           x: 20.1, y: 3.2,  h: false },
  { dept: "Huila",            x: 11.5, y: 6.8,  h: false },
  { dept: "Cesar",            x: 6.9,  y: 4.4,  h: false },
  { dept: "Chocó",            x: 3.2,  y: 15.3, h: true  },
  { dept: "Arauca",           x: 4.1,  y: 14.1, h: true  },
  { dept: "Putumayo",         x: 5.8,  y: 13.6, h: true  },
  { dept: "La Guajira",       x: 4.4,  y: 1.4,  h: false },
  { dept: "Sucre",            x: 8.7,  y: 5.7,  h: false },
  { dept: "Caldas",           x: 21.3, y: 2.1,  h: false },
  { dept: "Risaralda",        x: 22.6, y: 2.7,  h: false },
  { dept: "Caquetá",          x: 5.3,  y: 10.8, h: true  },
  { dept: "Guaviare",         x: 4.9,  y: 8.6,  h: true  },
  { dept: "Amazonas",         x: 7.1,  y: 3.1,  h: false },
  { dept: "San Andrés",       x: 13.8, y: 1.7,  h: false },
  { dept: "Vichada",          x: 2.8,  y: 0.8,  h: false },
];

// Correlation coefficients (§06)
const CORRELATIONS = [
  { label: "Verde–Centro Esperanza 2022", r: "r = −0.33", color: C.conservador },
  { label: "Fuerza Ciudadana 2022",       r: "r = +0.17", color: C.cambio },
  { label: "% Pacto Histórico 2022",      r: "r = −0.17", color: C.ph },
  { label: "Crecimiento total de votos",  r: "r = −0.02", color: C.slate },
];

// Gini coefficients (§06)
const GINI = [
  { label: "Pacto Histórico 2022 (Coalición)",  gini: "0.88", color: `${C.ph}44` },
  { label: "Pacto Histórico 2026 (Unificado)",  gini: "0.85", color: `${C.ph}88` },
  { label: "Electorado general 2026",           gini: "0.75", color: `${C.slate}44` },
];

// ─────────────────────────────────────────────────────────────
// THRESHOLD CONSTANTS
// ─────────────────────────────────────────────────────────────
const THRESHOLD = 582695;
const SCALE_MAX = 680000;
const THRESHOLD_PCT = Math.round((THRESHOLD / SCALE_MAX) * 100);

const COLLAPSE = [
  { name: "Frente Amplio Unitario", votes: 396042, pct: "2.03%" },
  { name: "Fuerza Ciudadana – Comunes", votes: 114722, pct: "0.59%" },
];

// ─────────────────────────────────────────────────────────────
// SEMICIRCLE SVG
// ─────────────────────────────────────────────────────────────
function SenateSemicircle() {
  const cx = 300;
  const cy = 265;
  const ARCS = [
    { r: 140, cap: 31 },
    { r: 175, cap: 36 },
    { r: 210, cap: 36 },
  ];

  const allSeats: string[] = [];
  SPECTRUM.forEach(({ color, seats }) => {
    for (let i = 0; i < seats; i++) allSeats.push(color);
  });

  const dots: { x: number; y: number; color: string }[] = [];
  let idx = 0;
  ARCS.forEach(({ r, cap }) => {
    const count = Math.min(cap, allSeats.length - idx);
    if (count <= 0) return;
    for (let i = 0; i < count; i++) {
      const pad = 0.08;
      const frac = count > 1 ? i / (count - 1) : 0.5;
      const angle = Math.PI - pad - frac * (Math.PI - 2 * pad);
      const x = cx + r * Math.cos(angle);
      const y = cy - r * Math.sin(angle);
      dots.push({ x, y, color: allSeats[idx] });
      idx++;
    }
  });

  return (
    <svg viewBox="0 0 600 295" className="w-full" style={{ maxWidth: 560 }}>
      {ARCS.map(({ r }) => (
        <path
          key={r}
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={C.border}
          strokeWidth="0.75"
          strokeDasharray="2 5"
        />
      ))}
      <line x1={cx - 235} y1={cy} x2={cx + 235} y2={cy} stroke={C.border} strokeWidth="1" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={5.6} fill={d.color} opacity={0.9} />
      ))}
      <text x={cx - 210} y={cy + 20} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate} opacity={0.5}>
        OPOSICIÓN
      </text>
      <text x={cx + 210} y={cy + 20} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate} opacity={0.5}>
        GOBIERNO
      </text>
      <text x={cx} y={cy + 20} textAnchor="middle" fontSize="15" fontFamily="Roboto Mono, monospace" fontWeight="700" fill={C.ink}>
        103
      </text>
      <text x={cx} y={cy + 34} textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif" fill={C.slate}>
        CURULES · SENADO 2026–2030
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ width: "100%", height: 1, backgroundColor: C.border }} />;
}

function SectionNum({ n }: { n: string }) {
  return (
    <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 11, opacity: 0.35, letterSpacing: "0.12em", textTransform: "uppercase", marginRight: 12 }}>
      {n}
    </span>
  );
}

function KpiCard({ label, value, sub, delta, up }: { label: string; value: string; sub?: string; delta?: string; up?: boolean }) {
  return (
    <div style={{ padding: "20px 24px", border: `1px solid ${C.border}`, borderRadius: 2, backgroundColor: C.white }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate, marginBottom: 8 }}>
        {label}
      </p>
      <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 32, fontWeight: 600, color: C.ink, lineHeight: 1, marginBottom: 4 }}>
        {value}
      </p>
      {sub && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.slate, marginBottom: 4 }}>{sub}</p>}
      {delta && (
        <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 11, color: up ? "#15803D" : "#B91C1C" }}>
          {delta}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// PURE SVG SCATTER — no recharts, no duplicate-key warnings
// ─────────────────────────────────────────────────────────────
function SvgScatter() {
  const [tooltip, setTooltip] = useState<{ dept: string; x: number; y: number; px: number; py: number } | null>(null);

  // Chart canvas dimensions
  const W = 560;
  const H = 290;
  const PAD = { top: 16, right: 20, bottom: 36, left: 38 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  // Axes
  const xMin = 0; const xMax = 26;
  const yMin = 0; const yMax = 17;

  const toSvgX = (v: number) => PAD.left + ((v - xMin) / (xMax - xMin)) * innerW;
  const toSvgY = (v: number) => PAD.top + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  // Grid lines
  const xTicks = [0, 5, 10, 15, 20, 25];
  const yTicks = [0, 5, 10, 15];

  // PH national reference y
  const refY = toSvgY(5.77);

  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", display: "block" }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Grid */}
        {xTicks.map((v) => (
          <line key={`gx-${v}`} x1={toSvgX(v)} y1={PAD.top} x2={toSvgX(v)} y2={PAD.top + innerH} stroke={C.border} strokeWidth={0.75} strokeDasharray="3 3" />
        ))}
        {yTicks.map((v) => (
          <line key={`gy-${v}`} x1={PAD.left} y1={toSvgY(v)} x2={PAD.left + innerW} y2={toSvgY(v)} stroke={C.border} strokeWidth={0.75} strokeDasharray="3 3" />
        ))}

        {/* Axes */}
        <line x1={PAD.left} y1={PAD.top + innerH} x2={PAD.left + innerW} y2={PAD.top + innerH} stroke={C.border} strokeWidth={1} />
        <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + innerH} stroke={C.border} strokeWidth={1} />

        {/* X axis labels */}
        {xTicks.map((v) => (
          <text key={`xl-${v}`} x={toSvgX(v)} y={PAD.top + innerH + 14} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>{v}%</text>
        ))}
        {/* Y axis labels */}
        {yTicks.map((v) => (
          <text key={`yl-${v}`} x={PAD.left - 6} y={toSvgY(v) + 3} textAnchor="end" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>{v}</text>
        ))}

        {/* Axis labels */}
        <text x={PAD.left + innerW / 2} y={H - 2} textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif" fill={C.slate}>
          % Votos alternativos 2022 (CE + FC)
        </text>
        <text x={10} y={PAD.top + innerH / 2} textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif" fill={C.slate} transform={`rotate(-90, 10, ${PAD.top + innerH / 2})`}>
          Variación PH (pp)
        </text>

        {/* PH national reference line */}
        <line x1={PAD.left} y1={refY} x2={PAD.left + innerW} y2={refY} stroke={`${C.ph}66`} strokeWidth={1} strokeDasharray="4 4" />
        <text x={PAD.left + innerW - 2} y={refY - 4} textAnchor="end" fontSize="7.5" fontFamily="Roboto Mono, monospace" fill={C.ph}>Δ PH nac. +5.77pp</text>

        {/* Data points */}
        {SCATTER_DATA.map((d) => {
          const px = toSvgX(d.x);
          const py = toSvgY(d.y);
          return (
            <circle
              key={`dot-${d.dept}`}
              cx={px}
              cy={py}
              r={d.h ? 7 : 4.5}
              fill={d.h ? C.ph : "#94A3B8"}
              opacity={d.h ? 0.85 : 0.5}
              stroke={d.h ? C.ph : "none"}
              strokeWidth={d.h ? 1.5 : 0}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setTooltip({ dept: d.dept, x: d.x, y: d.y, px, py })}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: `${(tooltip.px / W) * 100}%`,
            top: `${(tooltip.py / H) * 100}%`,
            transform: "translate(-50%, -130%)",
            background: C.white,
            border: `1px solid ${C.border}`,
            padding: "7px 11px",
            fontFamily: "Roboto Mono, monospace",
            fontSize: 10,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 10,
          }}
        >
          <p style={{ fontWeight: 700, color: C.ink, marginBottom: 2 }}>{tooltip.dept}</p>
          <p style={{ color: C.slate }}>Alt. 2022: {tooltip.x}%</p>
          <p style={{ color: C.slate }}>Var. PH: +{tooltip.y} pp</p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState<"senado" | "camara">("senado");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.ivory, fontFamily: "Inter, sans-serif", color: C.ink }}>

      {/* ── HEADER ────────────────────────────────────────────── */}
      <header style={{ height: 72, borderBottom: `1px solid ${C.border}`, backgroundColor: C.ivory }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", height: "100%", padding: "0 80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slate }}>
            BOG-2029789-1-2026-01 · EL PRIMER GOBIERNO DE IZQUIERDA EN COLOMBIA
          </span>
          <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slate }}>
            Análisis Territorial de Datos · Congreso 2026
          </span>
        </div>
      </header>

      <Divider />

      {/* ── SECTION 1: HERO ───────────────────────────────────── */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 64, alignItems: "start" }}>
          {/* Left */}
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {["Periodismo de Datos", "Colombia Legislativa"].map((badge) => (
                <span key={badge} style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${C.border}`, color: C.slate }}>
                  {badge}
                </span>
              ))}
            </div>
            <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 42, fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.01em", color: C.ink, marginBottom: 20 }}>
              La Fragmentación del Mandato: El Ascenso del Pacto Histórico y la Resistencia Conservadora en el Congreso 2026
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.slate, maxWidth: 540, marginBottom: 28 }}>
              Análisis territorial de los comicios del 8 de marzo de 2026 frente al balance histórico de 2022: un Congreso fragmentado ante la victoria de la derecha en el Ejecutivo. Datos validados por la Registraduría Nacional del Estado Civil y el Consejo Nacional Electoral.
            </p>
            <div style={{ display: "flex", gap: 20, fontSize: 11, color: C.slate, fontFamily: "Roboto Mono, monospace" }}>
              <span>08 MAR 2026</span>
              <span style={{ color: C.border }}>|</span>
              <span>Escrutinio Definitivo · 99.997% de coincidencia matemática</span>
            </div>
          </div>
          {/* Right: KPI stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <KpiCard label="Censo Electoral Nacional" value="41,287,084" sub="Ciudadanos habilitados para votar" delta="+6.34% vs. censo 2022 (38,819,901)" up={true} />
            <KpiCard label="Votación Total — Senado" value="20,900,614" sub="Sufragantes · 50.62% de Participación" delta="−4.38 pp vs. 2022 (54.02%)" up={false} />
            <KpiCard label="Abstención General" value="20,386,470" sub="Ciudadanos no votaron · 49.38%" delta="+4.38 pp vs. 2022" up={false} />
            <KpiCard label="Votos Válidos" value="19,423,187" sub="93.08% de la votación total" delta="−1.15 pp vs. 2022 (95.93%)" up={false} />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 2: DATA INTEGRITY BANNER ─────────────────── */}
      <section style={{ backgroundColor: C.dark }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 80px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 20 }}>
            <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", border: "1px solid #475569", color: "#94A3B8", flexShrink: 0, marginTop: 2 }}>
              RIGOR DE DATOS
            </span>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#CBD5E1" }}>
              Procesamiento de actas definitivas E-26 validadas con un{" "}
              <strong style={{ color: C.white }}>99.997% de coincidencia matemática</strong> entre preconteo y escrutinios definitivos. Análisis a nivel municipal y departamental. Fuentes:{" "}
              <strong style={{ color: C.white }}>Registraduría Nacional del Estado Civil</strong>,{" "}
              <strong style={{ color: C.white }}>Consejo Nacional Electoral</strong> y{" "}
              <strong style={{ color: C.white }}>DANE</strong>.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
            <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", border: "1px solid #475569", color: "#94A3B8", flexShrink: 0, marginTop: 2 }}>
              NOTA METODOLÓGICA
            </span>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#94A3B8" }}>
              El análisis evalúa al{" "}
              <strong style={{ color: "#CBD5E1" }}>Pacto Histórico como partido unificado</strong> (fusión de Polo Democrático, Unión Patriótica y Partido Comunista Colombiano aprobada en septiembre de 2025), frente a las fuerzas tradicionales de centro y centroderecha y a los movimientos alternativos (Frente Amplio Unitario y Fuerza Ciudadana–Comunes).
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 3: COMPOSITION ────────────────────────────── */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "64px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 0, marginBottom: 6 }}>
          <SectionNum n="§ 03" />
          <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 500, color: C.ink }}>
            La Nueva Composición Parlamentaria 2026–2030
          </h2>
        </div>
        <p style={{ fontSize: 13, color: C.slate, marginBottom: 32, paddingLeft: 48 }}>
          Distribución de curules asignadas mediante cifra repartidora D&apos;Hondt con umbral legal del 3% de votos válidos.
        </p>

        {/* Tab toggle */}
        <div style={{ paddingLeft: 48, marginBottom: 40 }}>
          <div style={{ display: "inline-flex", border: `1px solid ${C.border}`, overflow: "hidden", borderRadius: 2 }}>
            {(["senado", "camara"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontFamily: "Roboto Mono, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "8px 20px", cursor: "pointer", border: "none", outline: "none",
                  backgroundColor: tab === t ? C.ink : "transparent",
                  color: tab === t ? C.ivory : C.slate,
                  borderRight: t === "senado" ? `1px solid ${C.border}` : "none",
                  transition: "all 0.15s",
                }}
              >
                {t === "senado" ? "Senado (103 curules)" : "Cámara (183 curules)"}
              </button>
            ))}
          </div>
        </div>

        {tab === "senado" && (
          <div style={{ paddingLeft: 48, display: "grid", gridTemplateColumns: "7fr 5fr", gap: 48 }}>
            {/* Semicircle */}
            <div>
              <SenateSemicircle />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 32px", marginTop: 20 }}>
                {SENATE.map((p) => (
                  <div key={p.party} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: p.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "Roboto Mono, monospace", fontWeight: 600, color: C.ink, marginRight: 4 }}>{p.seats}</span>
                    <span style={{ color: C.slate }}>{p.party}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Table */}
            <div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ backgroundColor: C.soft }}>
                      {["Partido", "Votos", "%", "Curules"].map((h, i) => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: i === 0 ? "left" : "right", fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slate, fontWeight: 500, borderBottom: `1px solid ${C.border}` }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SENATE.map((p, i) => (
                      <tr key={p.party} style={{ backgroundColor: i % 2 === 0 ? "transparent" : "rgba(241,245,249,0.5)", borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: p.color, flexShrink: 0 }} />
                            <span>{p.party}</span>
                          </div>
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "Roboto Mono, monospace", color: C.slate }}>
                          {p.votes > 0 ? p.votes.toLocaleString("es-CO") : "—"}
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "Roboto Mono, monospace" }}>{p.pct}</td>
                        <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "Roboto Mono, monospace", fontWeight: 700, color: p.color }}>{p.seats}</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `2px solid ${C.ink}` }}>
                      <td style={{ padding: "10px 14px", fontWeight: 600 }}>Total General</td>
                      <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "Roboto Mono, monospace", fontWeight: 600 }}>19,423,187</td>
                      <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "Roboto Mono, monospace", fontWeight: 600 }}>100%</td>
                      <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "Roboto Mono, monospace", fontWeight: 700, color: C.ink }}>103</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, color: C.slate, marginTop: 10 }}>
                Votos en blanco: 616,998 (3.17% de los votos válidos)
              </p>
            </div>
          </div>
        )}

        {tab === "camara" && (
          <div style={{ paddingLeft: 48 }}>
            <div style={{ padding: 16, border: `1px solid ${C.border}`, borderRadius: 2, backgroundColor: C.soft, fontSize: 13, color: C.slate, marginBottom: 20 }}>
              La Cámara disminuyó de 188 (2022) a <strong style={{ color: C.ink }}>183 curules</strong> para el periodo 2026–2030 por la supresión de las 5 curules transitorias de paz del partido Comunes al expirar las garantías del Acuerdo de La Habana.
            </div>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ backgroundColor: C.soft }}>
                    {["Partido / Coalición", "Curules", "Concentración Territorial"].map((h) => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slate, fontWeight: 500, borderBottom: `1px solid ${C.border}` }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CAMARA.map((p) => (
                    <tr key={p.party} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: "10px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: p.color, flexShrink: 0 }} />
                          <span>{p.party}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 16px", fontFamily: "Roboto Mono, monospace", fontWeight: 700, color: p.color }}>{p.seats}</td>
                      <td style={{ padding: "10px 16px", color: C.slate, fontSize: 11 }}>{p.areas}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: `2px solid ${C.ink}` }}>
                    <td style={{ padding: "10px 16px", fontWeight: 600 }}>Total Cámara</td>
                    <td style={{ padding: "10px 16px", fontFamily: "Roboto Mono, monospace", fontWeight: 700, color: C.ink }}>183</td>
                    <td style={{ padding: "10px 16px", color: C.slate, fontSize: 11 }}>Distribución nacional descentralizada</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <Divider />

      {/* ── SECTION 4: PH 2022 VS 2026 ───────────────────────── */}
      <section style={{ backgroundColor: C.soft }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "64px 80px" }}>
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 6 }}>
            <SectionNum n="§ 04" />
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 500, color: C.ink }}>
              Desempeño y Consolidación del Pacto Histórico: 2022 vs. 2026
            </h2>
          </div>
          <p style={{ fontSize: 13, color: C.slate, marginBottom: 40, paddingLeft: 48 }}>
            Transición de coalición con listas cerradas a partido unificado con lista cremallera y paridad de género.
          </p>

          <div style={{ paddingLeft: 48, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
            {/* Card 2022 */}
            <div style={{ padding: 28, border: `1px solid ${C.border}`, borderRight: "none", borderRadius: "2px 0 0 2px", backgroundColor: C.white }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate }}>Legislativas 2022</span>
                <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, padding: "3px 8px", border: `1px solid ${C.border}`, color: C.slate }}>Coalición</span>
              </div>
              <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 34, fontWeight: 600, color: C.ink, marginBottom: 16 }}>2,880,254</p>
              <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 10, color: C.slate, marginBottom: 2 }}>% Electoral</p>
                  <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 20, fontWeight: 600, color: C.ph }}>16.95%</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, color: C.slate, marginBottom: 2 }}>Curules Senado</p>
                  <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 20, fontWeight: 600, color: C.ph }}>20</p>
                </div>
              </div>
              <p style={{ fontSize: 11, color: C.slate, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>Lista cerrada (bloqueada) · Listas separadas</p>
            </div>

            {/* Delta center */}
            <div style={{ padding: 28, border: `1px dashed ${C.ph}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", backgroundColor: "rgba(109,40,217,0.03)" }}>
              <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 40, fontWeight: 700, color: C.ph, lineHeight: 1 }}>+53.24%</p>
              <p style={{ fontFamily: "Playfair Display, serif", fontSize: 14, fontWeight: 500, color: C.ink, margin: "8px 0 4px" }}>Crecimiento relativo en votos</p>
              <p style={{ fontSize: 11, color: C.slate, marginBottom: 20 }}>+1,533,382 sufragios absolutos adicionales</p>
              {[
                { label: "Porcentaje electoral", val: "+5.77 pp" },
                { label: "Curules de Senado", val: "+25% (+5 escaños)" },
                { label: "Representación femenina", val: "52% (cremallera)" },
              ].map((r) => (
                <div key={r.label} style={{ width: "100%", display: "flex", justifyContent: "space-between", fontSize: 11, borderBottom: `1px solid ${C.border}`, paddingBottom: 6, marginBottom: 6 }}>
                  <span style={{ color: C.slate }}>{r.label}</span>
                  <span style={{ fontFamily: "Roboto Mono, monospace", fontWeight: 600, color: C.ph }}>{r.val}</span>
                </div>
              ))}
            </div>

            {/* Card 2026 */}
            <div style={{ padding: 28, border: `1px solid ${C.ph}`, borderLeft: "none", borderRadius: "0 2px 2px 0", backgroundColor: C.white }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate }}>Legislativas 2026</span>
                <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, padding: "3px 8px", border: `1px solid ${C.ph}`, color: C.ph }}>Partido Unificado</span>
              </div>
              <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 34, fontWeight: 600, color: C.ink, marginBottom: 16 }}>4,413,636</p>
              <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 10, color: C.slate, marginBottom: 2 }}>% Electoral</p>
                  <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 20, fontWeight: 600, color: C.ph }}>22.72%</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, color: C.slate, marginBottom: 2 }}>Curules Senado</p>
                  <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 20, fontWeight: 600, color: C.ph }}>25</p>
                </div>
              </div>
              <p style={{ fontSize: 11, color: C.slate, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>Lista cerrada cremallera · Fusión Polo + UP + PCC (sep. 2025)</p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 5: PROGRESSIVE COLLAPSE ──────────────────── */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "64px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 6 }}>
          <SectionNum n="§ 05" />
          <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 500, color: C.ink }}>
            El Colapso del Progresismo Disidente y la Pérdida del Umbral
          </h2>
        </div>
        <p style={{ fontSize: 13, color: C.slate, marginBottom: 40, paddingLeft: 48 }}>
          Movimientos que no superaron el umbral legal del 3% de votos válidos (mínimo: 582,695 sufragios).
        </p>

        {/* 5-col Sankey + 7-col data block */}
        <div style={{ paddingLeft: 48, display: "grid", gridTemplateColumns: "5fr 7fr", gap: 48 }}>

          {/* LEFT: Sankey-style SVG flow diagram */}
          <div>
            <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate, marginBottom: 16 }}>
              Flujo conceptual de votos — Izquierda alternativa 2022 → 2026
            </p>
            <svg viewBox="0 0 320 380" style={{ width: "100%", maxWidth: 320 }}>
              {/* Source node: Izquierda alternativa 2022 */}
              <rect x={10} y={30} width={120} height={48} rx={2} fill={`${C.ph}18`} stroke={C.ph} strokeWidth={1} />
              <text x={70} y={50} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph} fontWeight="600">IZQUIERDA</text>
              <text x={70} y={63} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph}>ALTERNATIVA 2022</text>
              <text x={70} y={90} textAnchor="middle" fontSize="10" fontFamily="Roboto Mono, monospace" fill={C.slate}>~1,000,000 votos</text>

              {/* Arrow down left → PH captured */}
              <path d="M 70 78 L 70 140 L 50 160" fill="none" stroke={C.ph} strokeWidth={2.5} strokeDasharray="none" opacity={0.6} />
              {/* Arrow down right → below threshold */}
              <path d="M 70 78 L 70 140 L 200 160" fill="none" stroke="#DC2626" strokeWidth={1.5} opacity={0.5} />

              {/* PH capture node */}
              <rect x={10} y={160} width={120} height={56} rx={2} fill={`${C.ph}22`} stroke={C.ph} strokeWidth={1.5} />
              <text x={70} y={182} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph} fontWeight="700">CAPTADO POR</text>
              <text x={70} y={195} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph} fontWeight="700">PACTO HISTÓRICO</text>
              <text x={70} y={210} textAnchor="middle" fontSize="10" fontFamily="Roboto Mono, monospace" fill={C.ink}>+53.24% crecimiento</text>

              {/* Below threshold nodes */}
              <rect x={150} y={160} width={155} height={42} rx={2} fill="#FEF2F2" stroke="#DC2626" strokeWidth={1} />
              <text x={228} y={178} textAnchor="middle" fontSize="8.5" fontFamily="Roboto Mono, monospace" fill="#B91C1C" fontWeight="600">BAJO EL UMBRAL (3%)</text>
              <text x={228} y={193} textAnchor="middle" fontSize="8.5" fontFamily="Roboto Mono, monospace" fill="#B91C1C">= 582,695 votos</text>

              {/* FAU sub-node */}
              <rect x={150} y={220} width={155} height={52} rx={2} fill="#FEF2F2" stroke="#FCA5A5" strokeWidth={1} />
              <text x={228} y={238} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill="#B91C1C" fontWeight="600">Frente Amplio Unitario</text>
              <text x={228} y={251} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ink}>396,042 votos</text>
              <text x={228} y={264} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>2.03% · Sin personería</text>

              {/* FC sub-node */}
              <rect x={150} y={284} width={155} height={52} rx={2} fill="#FEF2F2" stroke="#FCA5A5" strokeWidth={1} />
              <text x={228} y={302} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill="#B91C1C" fontWeight="600">Fuerza Ciudadana–Comunes</text>
              <text x={228} y={315} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ink}>114,722 votos</text>
              <text x={228} y={328} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>0.59% · Sin personería</text>

              {/* Connector lines to sub-nodes */}
              <line x1={228} y1={202} x2={228} y2={220} stroke="#FCA5A5" strokeWidth={1} />
              <line x1={228} y1={272} x2={228} y2={284} stroke="#FCA5A5" strokeWidth={1} />

              {/* Outcome label */}
              <rect x={10} y={240} width={120} height={52} rx={2} fill={`${C.ph}10`} stroke={C.border} strokeWidth={1} />
              <text x={70} y={260} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>Resultado 2026:</text>
              <text x={70} y={273} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph} fontWeight="700">25 CURULES</text>
              <text x={70} y={286} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>Primera fuerza nacional</text>
              <line x1={70} y1={216} x2={70} y2={240} stroke={C.ph} strokeWidth={1.5} />
            </svg>
          </div>

          {/* RIGHT: data block 7 cols */}
          <div>
            {/* Threshold bars */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#DC2626", flexShrink: 0 }} />
              <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slate }}>Umbral legal 3% = 582,695 votos válidos</span>
            </div>

            {COLLAPSE.map((d) => {
              const barPct = Math.round((d.votes / SCALE_MAX) * 100);
              return (
                <div key={d.name} style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
                    <span style={{ fontWeight: 500 }}>{d.name}</span>
                    <span style={{ fontFamily: "Roboto Mono, monospace", fontWeight: 600, color: "#B91C1C" }}>
                      {d.votes.toLocaleString("es-CO")} · {d.pct}
                    </span>
                  </div>
                  <div style={{ position: "relative", height: 32, backgroundColor: C.soft, border: `1px solid ${C.border}`, borderRadius: 2 }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${barPct}%`, backgroundColor: "#CBD5E1", borderRadius: 2 }} />
                    <div style={{ position: "absolute", top: -7, bottom: -7, left: `${THRESHOLD_PCT}%`, width: 2, backgroundColor: "#DC2626" }}>
                      <span style={{ position: "absolute", top: -16, left: 4, fontFamily: "Roboto Mono, monospace", fontSize: 8, color: "#DC2626", whiteSpace: "nowrap" }}>
                        UMBRAL 3%
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                    {[0, 200, 400, 582.695, 680].map((v) => (
                      <span key={v} style={{ fontFamily: "Roboto Mono, monospace", fontSize: 8, color: v === 582.695 ? "#DC2626" : C.slate }}>
                        {v === 0 ? "0" : v === 582.695 ? "582k▲" : `${v}k`}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 8, padding: "6px 12px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 2, fontSize: 11, color: "#B91C1C" }}>
                    Pérdida de personería jurídica · Exclusión parlamentaria
                  </div>
                </div>
              );
            })}

            {/* Comparison bar chart */}
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden", marginTop: 24 }}>
              <div style={{ padding: "10px 16px", borderBottom: `1px solid ${C.border}`, backgroundColor: C.soft }}>
                <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate }}>
                  Comparativa: Izquierda Alternativa 2022 vs. 2026
                </p>
              </div>
              <div style={{ padding: "16px 16px 20px" }}>
                {/* Legend */}
                <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                  {[{ label: "2022 (aprox.)", color: "#94A3B8" }, { label: "2026", color: "#DC2626" }].map((l) => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.slate }}>
                      <span style={{ width: 10, height: 10, backgroundColor: l.color, borderRadius: 1, flexShrink: 0 }} />
                      {l.label}
                    </div>
                  ))}
                </div>
                {/* CSS grouped bars */}
                {[
                  { name: "Frente Amplio Unitario", v22: 580000, v26: 396042 },
                  { name: "Fuerza Ciudadana – Comunes", v22: 420000, v26: 114722 },
                  { name: "Comunes (curules paz)", v22: 10, v26: 0 },
                ].map((row) => {
                  const max = 620000;
                  return (
                    <div key={row.name} style={{ marginBottom: 14 }}>
                      <p style={{ fontSize: 10, color: C.slate, marginBottom: 5 }}>{row.name}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ flex: 1, height: 10, backgroundColor: C.soft, borderRadius: 1, overflow: "hidden" }}>
                            <div style={{ width: `${(row.v22 / max) * 100}%`, height: "100%", backgroundColor: "#94A3B8" }} />
                          </div>
                          <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, color: C.slate, width: 58, textAlign: "right" }}>
                            {row.v22 > 100 ? `${(row.v22 / 1000).toFixed(0)}k` : "—"}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ flex: 1, height: 10, backgroundColor: C.soft, borderRadius: 1, overflow: "hidden" }}>
                            <div style={{ width: `${(row.v26 / max) * 100}%`, height: "100%", backgroundColor: "#DC2626" }} />
                          </div>
                          <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, color: "#B91C1C", width: 58, textAlign: "right" }}>
                            {row.v26 > 0 ? `${(row.v26 / 1000).toFixed(0)}k` : "0"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginTop: 16, padding: 16, backgroundColor: C.soft, border: `1px solid ${C.border}`, borderRadius: 2, fontSize: 12, color: C.slate }}>
              <strong style={{ color: C.ink }}>Nota:</strong> Las 10 curules transitorias de paz de Comunes (2022) fueron suprimidas en 2026 al concluir las garantías del Acuerdo de La Habana. La organización no obtuvo escaños por voto popular.
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 6: PARTICIPATION ──────────────────────────── */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "64px 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 6 }}>
          <SectionNum n="§ 06" />
          <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 500, color: C.ink }}>
            La Paradoja de la Movilización: Abstención y Concentración Local
          </h2>
        </div>
        <p style={{ fontSize: 13, color: C.slate, marginBottom: 40, paddingLeft: 48 }}>
          Divergencia entre la participación en legislativas y presidenciales, y el comportamiento diferencial de zonas de conflicto.
        </p>

        <div style={{ paddingLeft: 48, display: "grid", gridTemplateColumns: "7fr 5fr", gap: 48 }}>

          {/* LEFT: Scatter — Votos alternativos 2022 vs Variación PH */}
          <div>
            <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate, marginBottom: 4 }}>
              Dispersión: Votación de listas alternativas 2022 vs. Variación del Pacto Histórico por departamento
            </p>
            <p style={{ fontSize: 11, color: C.slate, marginBottom: 4 }}>
              Eje X: % votos listas alternativas (CE + FC) en 2022 · Eje Y: Variación PH 2022→2026 (pp)
            </p>
            {/* Correlation labels */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", marginBottom: 12 }}>
              {CORRELATIONS.map((c) => (
                <span key={c.label} style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10 }}>
                  <span style={{ color: c.color, fontWeight: 700 }}>{c.r}</span>
                  <span style={{ color: C.slate }}> {c.label}</span>
                </span>
              ))}
            </div>
            <SvgScatter />
            <div style={{ display: "flex", gap: 20, marginTop: 6, fontSize: 11, color: C.slate }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: C.ph, flexShrink: 0 }} />
                Zonas con dinámicas de orden público complejo (Cauca, Meta, Chocó, Arauca)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#94A3B8", flexShrink: 0 }} />
                Resto del país
              </div>
            </div>
          </div>

          {/* RIGHT: Participation bar + analysis + Gini table */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Horizontal bar: participation by stage */}
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", borderBottom: `1px solid ${C.border}`, backgroundColor: C.soft }}>
                <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate }}>
                  Participación por etapa electoral
                </p>
              </div>
              <div style={{ padding: "16px 16px 20px" }}>
                {PARTICIPATION.map((entry) => {
                  const pct = entry.value;
                  const minVal = 40;
                  const maxVal = 68;
                  const barWidth = ((pct - minVal) / (maxVal - minVal)) * 100;
                  return (
                    <div key={`part-${entry.stage}`} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ width: 126, fontSize: 10, color: C.slate, flexShrink: 0, textAlign: "right" }}>{entry.stage}</span>
                      <div style={{ flex: 1, height: 14, backgroundColor: C.soft, borderRadius: 1, overflow: "hidden" }}>
                        <div style={{ width: `${barWidth}%`, height: "100%", backgroundColor: entry.fill, borderRadius: 1 }} />
                      </div>
                      <span style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, color: C.ink, width: 40, flexShrink: 0 }}>
                        {pct}%
                      </span>
                    </div>
                  );
                })}
                <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 134, marginTop: 4 }}>
                  {[40, 50, 60, 68].map((v) => (
                    <span key={`axis-${v}`} style={{ fontFamily: "Roboto Mono, monospace", fontSize: 8, color: C.slate }}>{v}%</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Analytical text */}
            <div style={{ padding: 16, border: `1px solid ${C.border}`, borderRadius: 2, fontSize: 13, lineHeight: 1.7, color: C.slate }}>
              La participación nacional descendió al <strong style={{ color: C.ink }}>50.62%</strong> en marzo de 2026 (frente al <strong style={{ color: C.ink }}>54.02%</strong> en 2022), aunque zonas con dinámicas de orden público complejo como <strong style={{ color: C.ink }}>Cauca y Meta</strong> registraron picos significativos de movilización ciudadana.
            </div>

            {/* Gini coefficients table */}
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", borderBottom: `1px solid ${C.border}`, backgroundColor: C.soft }}>
                <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate }}>
                  Índice de Gini — Concentración territorial del voto
                </p>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(241,245,249,0.5)" }}>
                    <th style={{ padding: "8px 14px", textAlign: "left", fontFamily: "Roboto Mono, monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slate, fontWeight: 500, borderBottom: `1px solid ${C.border}` }}>
                      Colectividad
                    </th>
                    <th style={{ padding: "8px 14px", textAlign: "center", fontFamily: "Roboto Mono, monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slate, fontWeight: 500, borderBottom: `1px solid ${C.border}` }}>
                      Gini
                    </th>
                    <th style={{ padding: "8px 14px", textAlign: "left", fontFamily: "Roboto Mono, monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: C.slate, fontWeight: 500, borderBottom: `1px solid ${C.border}` }}>
                      Concentración
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GINI.map((g) => (
                    <tr key={g.label} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: "10px 14px", fontSize: 11, color: C.ink }}>{g.label}</td>
                      <td style={{ padding: "10px 14px", textAlign: "center" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 40, height: 6, backgroundColor: C.soft, borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ width: `${parseFloat(g.gini) * 100}%`, height: "100%", backgroundColor: g.color, borderRadius: 3 }} />
                          </div>
                          <span style={{ fontFamily: "Roboto Mono, monospace", fontWeight: 700, fontSize: 13, color: C.ink }}>{g.gini}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: 10, color: C.slate }}>
                        {parseFloat(g.gini) >= 0.85 ? "Alta" : "Moderada-alta"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: "8px 14px", backgroundColor: C.soft, fontSize: 10, color: C.slate }}>
                Coeficiente de Gini como proxy de concentración geográfica del voto (0 = dispersión total · 1 = concentración absoluta)
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 7: GOVERNABILITY ──────────────────────────── */}
      <section style={{ backgroundColor: C.soft }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "64px 80px" }}>
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 6 }}>
            <SectionNum n="§ 07" />
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 26, fontWeight: 500, color: C.ink }}>
              Equilibrio del Congreso frente al Ejecutivo 2026–2030
            </h2>
          </div>
          <p style={{ fontSize: 13, color: C.slate, marginBottom: 40, paddingLeft: 48 }}>
            Mapa de fuerzas en el Senado de la República · 103 curules · Periodo 2026–2030
          </p>

          {/* Presidential results */}
          <div style={{ paddingLeft: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
            {[
              { role: "Presidente Electo", name: "Abelardo de la Espriella", party: "Defensores de la Patria", pct: "49.66%", votes: "12,959,542", color: C.cd },
              { role: "Oposición — Estatuto Constitucional", name: "Iván Cepeda Castro", party: "Pacto Histórico · Senado (Estatuto de la Oposición)", pct: "48.70%", votes: "12,708,312", color: C.ph },
            ].map((p) => (
              <div key={p.name} style={{ padding: 24, border: `1px solid ${C.border}`, borderRadius: 2, backgroundColor: C.white }}>
                <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate, marginBottom: 8 }}>{p.role}</p>
                <p style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 500, color: C.ink, marginBottom: 4 }}>{p.name}</p>
                <p style={{ fontSize: 12, color: C.slate, marginBottom: 16 }}>{p.party}</p>
                <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 28, fontWeight: 700, color: p.color }}>{p.pct}</p>
                <p style={{ fontSize: 11, color: C.slate }}>{p.votes} votos (segunda vuelta)</p>
              </div>
            ))}
          </div>

          {/* Three camp cards */}
          <div style={{ paddingLeft: 48, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
            {[
              { label: "Bancada de Oposición", seats: 28, detail: "PH (25) + Indígenas (2) + Estatuto Oposición (1)", note: "Liderada por Iván Cepeda Castro", color: C.ph, bg: "rgba(109,40,217,0.04)" },
              { label: "Bloque Bisagra / Independiente", seats: 27, detail: "Liberal (13) + La U (9) + ¡Ahora Colombia! (5)", note: "Árbitro de la gobernabilidad", color: C.cambio, bg: "rgba(15,118,110,0.04)" },
              { label: "Bancada Afín al Gobierno", seats: 48, detail: "CD (17) + PC (10) + CR–ALMA (7) + SN (4) + Alianza por Colombia (10)", note: "De la Espriella — sin mayoría absoluta (52 requeridas)", color: C.cd, bg: "rgba(153,27,27,0.04)" },
            ].map((camp, i) => (
              <div
                key={camp.label}
                style={{
                  padding: 28,
                  backgroundColor: camp.bg,
                  borderRight: i < 2 ? `1px solid ${C.border}` : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: camp.color }}>{camp.label}</p>
                <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 52, fontWeight: 700, color: camp.color, lineHeight: 1 }}>{camp.seats}</p>
                <p style={{ fontSize: 11, color: C.slate }}>curules en el Senado</p>
                <p style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{camp.detail}</p>
                <p style={{ fontSize: 11, color: C.slate, fontStyle: "italic", borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>{camp.note}</p>
              </div>
            ))}
          </div>

          {/* Closing analysis */}
          <div style={{ paddingLeft: 48, marginTop: 24, padding: 24, border: `1px solid ${C.border}`, borderRadius: 2, backgroundColor: C.white, display: "grid", gridTemplateColumns: "3fr 1fr", gap: 32, alignItems: "center" }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: C.slate }}>
              <strong style={{ color: C.ink }}>Balance de gobernabilidad:</strong> De la Espriella se impone en la Presidencia pero asume sin control sobre el Capitolio. El bloque bisagra de <strong style={{ color: C.ink }}>27 senadores</strong> retiene la balanza de gobernabilidad en Colombia, condicionando cualquier agenda legislativa a intensas negociaciones regionales. La bancada del Pacto Histórico —consolidada como primera fuerza individual con 25 curules— operará como oposición estructurada bajo el marco constitucional del Estatuto de la Oposición.
            </p>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate, marginBottom: 6 }}>Margen de victoria</p>
              <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 32, fontWeight: 700, color: C.cd }}>+0.96pp</p>
              <p style={{ fontSize: 11, color: C.slate, marginTop: 4 }}>251,230 votos · resultado más ajustado en la historia reciente</p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 80px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate, marginBottom: 4 }}>Fuentes Primarias</p>
          <p style={{ fontSize: 11, color: C.slate }}>Registraduría Nacional del Estado Civil · Consejo Nacional Electoral</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "Roboto Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: C.slate, marginBottom: 4 }}>Materia</p>
          <p style={{ fontSize: 11, color: C.slate }}>BOG-2029789-1-2026-01 · Elecciones Congreso · 08.03.2026</p>
        </div>
      </footer>

    </div>
  );
}
