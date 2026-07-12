import { useState } from "react";
import { C } from "../../constants";
import { useIsMobile } from "../ui/use-mobile";

type NodeId = "origen" | "ph" | "umbral" | "fau" | "fc" | "resultado";

interface Layout {
  vb: string;
  nodes: { id: NodeId; x: number; y: number; w: number; h: number }[];
  paths: { d: string; stroke: string; sw: number; op: number }[];
  texts: { x: number; y: number; content: string; fontSize: string; fill: string; fontWeight?: string }[];
}

const MOBILE: Layout = {
  vb: "0 0 320 380",
  nodes: [
    { id: "origen", x: 10, y: 30, w: 120, h: 48 },
    { id: "ph", x: 10, y: 160, w: 120, h: 56 },
    { id: "umbral", x: 150, y: 160, w: 155, h: 42 },
    { id: "fau", x: 150, y: 220, w: 155, h: 52 },
    { id: "fc", x: 150, y: 284, w: 155, h: 52 },
    { id: "resultado", x: 10, y: 240, w: 120, h: 52 },
  ],
  paths: [
    { d: "M 70 78 L 70 140 L 50 160", stroke: C.ph, sw: 2.5, op: 0.6 },
    { d: "M 70 78 L 70 140 L 200 160", stroke: "#DC2626", sw: 1.5, op: 0.5 },
    { d: "M 228 202 L 228 220", stroke: "#FCA5A5", sw: 1, op: 1 },
    { d: "M 228 272 L 228 284", stroke: "#FCA5A5", sw: 1, op: 1 },
    { d: "M 70 216 L 70 240", stroke: C.ph, sw: 1.5, op: 1 },
  ],
  texts: [
    { x: 70, y: 50, content: "IZQUIERDA", fontSize: "9", fill: C.ph, fontWeight: "600" },
    { x: 70, y: 63, content: "ALTERNATIVA 2022", fontSize: "9", fill: C.ph },
    { x: 70, y: 90, content: "~1,000,000 votos", fontSize: "10", fill: C.slate },
    { x: 70, y: 182, content: "CAPTADO POR", fontSize: "9", fill: C.ph, fontWeight: "700" },
    { x: 70, y: 195, content: "PACTO HISTÓRICO", fontSize: "9", fill: C.ph, fontWeight: "700" },
    { x: 70, y: 210, content: "+53.24% crecimiento", fontSize: "10", fill: C.ink },
    { x: 228, y: 178, content: "BAJO EL UMBRAL (3%)", fontSize: "8.5", fill: "#B91C1C", fontWeight: "600" },
    { x: 228, y: 193, content: "= 582,695 votos", fontSize: "8.5", fill: "#B91C1C" },
    { x: 228, y: 238, content: "Frente Amplio Unitario", fontSize: "8", fill: "#B91C1C", fontWeight: "600" },
    { x: 228, y: 251, content: "396,042 votos", fontSize: "9", fill: C.ink },
    { x: 228, y: 264, content: "2.03% · Sin personería", fontSize: "8", fill: C.slate },
    { x: 228, y: 302, content: "Fuerza Ciudadana\u2013Comunes", fontSize: "8", fill: "#B91C1C", fontWeight: "600" },
    { x: 228, y: 315, content: "114,722 votos", fontSize: "9", fill: C.ink },
    { x: 228, y: 328, content: "0.59% · Sin personería", fontSize: "8", fill: C.slate },
    { x: 70, y: 260, content: "Resultado 2026:", fontSize: "8", fill: C.slate },
    { x: 70, y: 273, content: "25 CURULES", fontSize: "9", fill: C.ph, fontWeight: "700" },
    { x: 70, y: 286, content: "Primera fuerza nacional", fontSize: "8", fill: C.slate },
  ],
};

const DESKTOP: Layout = {
  vb: "0 0 500 560",
  nodes: [
    { id: "origen", x: 10, y: 24, w: 130, h: 50 },
    { id: "ph", x: 10, y: 180, w: 130, h: 62 },
    { id: "umbral", x: 270, y: 180, w: 200, h: 54 },
    { id: "fau", x: 270, y: 290, w: 200, h: 62 },
    { id: "fc", x: 270, y: 420, w: 200, h: 62 },
    { id: "resultado", x: 10, y: 340, w: 130, h: 58 },
  ],
  paths: [
    { d: "M 75 74 L 75 150 L 55 180", stroke: C.ph, sw: 2.5, op: 0.6 },
    { d: "M 75 74 L 75 150 L 310 180", stroke: "#DC2626", sw: 1.5, op: 0.5 },
    { d: "M 75 242 L 75 340", stroke: C.ph, sw: 1.5, op: 1 },
    { d: "M 370 234 L 370 290", stroke: "#FCA5A5", sw: 1, op: 1 },
    { d: "M 370 234 L 370 420", stroke: "#FCA5A5", sw: 1, op: 1 },
  ],
  texts: [
    { x: 75, y: 44, content: "IZQUIERDA", fontSize: "10", fill: C.ph, fontWeight: "600" },
    { x: 75, y: 57, content: "ALTERNATIVA 2022", fontSize: "10", fill: C.ph },
    { x: 75, y: 86, content: "~1,000,000 votos", fontSize: "11", fill: C.slate },
    { x: 75, y: 202, content: "CAPTADO POR", fontSize: "10", fill: C.ph, fontWeight: "700" },
    { x: 75, y: 216, content: "PACTO HISTÓRICO", fontSize: "10", fill: C.ph, fontWeight: "700" },
    { x: 75, y: 232, content: "+53.24% crecimiento", fontSize: "11", fill: C.ink },
    { x: 370, y: 200, content: "BAJO EL UMBRAL (3%)", fontSize: "10", fill: "#B91C1C", fontWeight: "600" },
    { x: 370, y: 215, content: "= 582,695 votos", fontSize: "10", fill: "#B91C1C" },
    { x: 370, y: 312, content: "Frente Amplio Unitario", fontSize: "10", fill: "#B91C1C", fontWeight: "600" },
    { x: 370, y: 326, content: "396,042 votos", fontSize: "11", fill: C.ink },
    { x: 370, y: 340, content: "2.03% · Sin personería", fontSize: "9", fill: C.slate },
    { x: 370, y: 442, content: "Fuerza Ciudadana\u2013Comunes", fontSize: "10", fill: "#B91C1C", fontWeight: "600" },
    { x: 370, y: 456, content: "114,722 votos", fontSize: "11", fill: C.ink },
    { x: 370, y: 470, content: "0.59% · Sin personería", fontSize: "9", fill: C.slate },
    { x: 75, y: 362, content: "Resultado 2026:", fontSize: "9", fill: C.slate },
    { x: 75, y: 376, content: "25 CURULES", fontSize: "11", fill: C.ph, fontWeight: "700" },
    { x: 75, y: 390, content: "Primera fuerza nacional", fontSize: "9", fill: C.slate },
  ],
};

const tooltipContent: Record<NodeId, string> = {
  origen: "~1,000,000 votos de izquierda alternativa en 2022 (Frente Amplio, Fuerza Ciudadana, Comunes)",
  umbral: "Umbral legal del 3% = 582,695 votos válidos. Quien no lo supera pierde personería jurídica.",
  ph: "El Pacto Histórico absorbió gran parte del voto alternativo, creciendo +53.24% en 2026",
  fau: "Frente Amplio Unitario: 396,042 votos (2.03%). Pérdida de personería jurídica.",
  fc: "Fuerza Ciudadana \u2013 Comunes: 114,722 votos (0.59%). Pérdida de personería y eliminación de curules de paz.",
  resultado: "Pacto Histórico: 25 curules (primera fuerza). La izquierda disidente queda sin representación.",
};

export function SankeyFlow() {
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const isMobile = useIsMobile();
  const layout = isMobile ? MOBILE : DESKTOP;

  const fillColor = (id: NodeId) => {
    if (id === "fau" || id === "fc" || id === "umbral") {
      return hovered === id ? "#FEE2E2" : "#FEF2F2";
    }
    if (id === "ph" || id === "origen") {
      return hovered === id ? `${C.ph}33` : `${C.ph}22`;
    }
    if (id === "resultado") {
      return hovered === id ? `${C.ph}22` : `${C.ph}10`;
    }
    return "#FEF2F2";
  };

  const strokeColor = (id: NodeId) => {
    if (id === "origen" || id === "ph") return C.ph;
    if (id === "resultado") return C.border;
    if (id === "umbral") return "#DC2626";
    return "#FCA5A5";
  };

  return (
    <div className="relative select-none">
      <svg viewBox={layout.vb} className="w-full block">
        {layout.paths.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke={p.stroke} strokeWidth={p.sw} opacity={p.op} />
        ))}
        {layout.nodes.map((n) => (
          <rect key={n.id} x={n.x} y={n.y} width={n.w} height={n.h} rx={2} fill={fillColor(n.id)} stroke={strokeColor(n.id)} strokeWidth={n.id === "ph" ? 1.5 : 1} />
        ))}
        {layout.texts.map((t, i) => (
          <text key={i} x={t.x} y={t.y} textAnchor="middle" fontSize={t.fontSize} fontFamily="Roboto Mono, monospace" fill={t.fill} fontWeight={t.fontWeight || "400"}>
            {t.content}
          </text>
        ))}
        {layout.nodes.map((n) => (
          <rect key={`hit-${n.id}`} x={n.x} y={n.y} width={n.w} height={n.h} rx={2} fill="transparent" style={{ cursor: "pointer" }} onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}>
            <title>{tooltipContent[n.id]}</title>
          </rect>
        ))}
      </svg>
    </div>
  );
}
