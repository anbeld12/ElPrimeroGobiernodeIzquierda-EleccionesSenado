import { useState } from "react";
import { C } from "../../constants";

const nodes = [
  { id: "origen", label: "IZQUIERDA", sub: "ALTERNATIVA 2022", x: 10, y: 30, w: 120, h: 48 },
  { id: "ph", label: "CAPTADO POR", sub: "PACTO HISTÓRICO", x: 10, y: 160, w: 120, h: 56 },
  { id: "umbral", label: "BAJO EL UMBRAL (3%)", sub: "= 582,695 votos", x: 150, y: 160, w: 155, h: 42 },
  { id: "fau", label: "Frente Amplio Unitario", sub: "396,042 votos · 2.03%", x: 150, y: 220, w: 155, h: 52 },
  { id: "fc", label: "Fuerza Ciudadana–Comunes", sub: "114,722 votos · 0.59%", x: 150, y: 284, w: 155, h: 52 },
  { id: "resultado", label: "Resultado 2026:", sub: "25 CURULES", x: 10, y: 240, w: 120, h: 52 },
];

type NodeId = "origen" | "ph" | "umbral" | "fau" | "fc" | "resultado";

const tooltipPos: Record<NodeId, { top: number }> = {
  origen: { top: 30 },
  ph: { top: 160 },
  umbral: { top: 160 },
  fau: { top: 220 },
  fc: { top: 284 },
  resultado: { top: 250 },
};

export function SankeyFlow() {
  const [hovered, setHovered] = useState<NodeId | null>(null);

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

  const tooltipContent: Record<NodeId, string> = {
    origen: "~1,000,000 votos de izquierda alternativa en 2022 (Frente Amplio, Fuerza Ciudadana, Comunes)",
    umbral: "Umbral legal del 3% = 582,695 votos válidos. Quien no lo supera pierde personería jurídica.",
    ph: "El Pacto Histórico absorbió gran parte del voto alternativo, creciendo +53.24% en 2026",
    fau: "Frente Amplio Unitario: 396,042 votos (2.03%). Pérdida de personería jurídica.",
    fc: "Fuerza Ciudadana – Comunes: 114,722 votos (0.59%). Pérdida de personería y eliminación de curules de paz.",
    resultado: "Pacto Histórico: 25 curules (primera fuerza). La izquierda disidente queda sin representación.",
  };

  return (
    <div className="relative select-none">
      <svg viewBox="0 0 320 380" className="w-full max-w-full md:max-w-[320px] block">
        <rect x={10} y={30} width={120} height={48} rx={2} fill={fillColor("origen")} stroke={C.ph} strokeWidth={1} />
        <text x={70} y={50} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph} fontWeight="600">IZQUIERDA</text>
        <text x={70} y={63} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph}>ALTERNATIVA 2022</text>
        <text x={70} y={90} textAnchor="middle" fontSize="10" fontFamily="Roboto Mono, monospace" fill={C.slate}>~1,000,000 votos</text>

        <path d="M 70 78 L 70 140 L 50 160" fill="none" stroke={C.ph} strokeWidth={2.5} opacity={0.6} />
        <path d="M 70 78 L 70 140 L 200 160" fill="none" stroke="#DC2626" strokeWidth={1.5} opacity={0.5} />

        <rect x={10} y={160} width={120} height={56} rx={2} fill={fillColor("ph")} stroke={C.ph} strokeWidth={1.5} />
        <text x={70} y={182} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph} fontWeight="700">CAPTADO POR</text>
        <text x={70} y={195} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph} fontWeight="700">PACTO HISTÓRICO</text>
        <text x={70} y={210} textAnchor="middle" fontSize="10" fontFamily="Roboto Mono, monospace" fill={C.ink}>+53.24% crecimiento</text>

        <rect x={150} y={160} width={155} height={42} rx={2} fill={fillColor("umbral")} stroke="#DC2626" strokeWidth={1} />
        <text x={228} y={178} textAnchor="middle" fontSize="8.5" fontFamily="Roboto Mono, monospace" fill="#B91C1C" fontWeight="600">BAJO EL UMBRAL (3%)</text>
        <text x={228} y={193} textAnchor="middle" fontSize="8.5" fontFamily="Roboto Mono, monospace" fill="#B91C1C">= 582,695 votos</text>

        <rect x={150} y={220} width={155} height={52} rx={2} fill={fillColor("fau")} stroke="#FCA5A5" strokeWidth={1} />
        <text x={228} y={238} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill="#B91C1C" fontWeight="600">Frente Amplio Unitario</text>
        <text x={228} y={251} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ink}>396,042 votos</text>
        <text x={228} y={264} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>2.03% · Sin personería</text>

        <rect x={150} y={284} width={155} height={52} rx={2} fill={fillColor("fc")} stroke="#FCA5A5" strokeWidth={1} />
        <text x={228} y={302} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill="#B91C1C" fontWeight="600">Fuerza Ciudadana–Comunes</text>
        <text x={228} y={315} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ink}>114,722 votos</text>
        <text x={228} y={328} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>0.59% · Sin personería</text>

        <line x1={228} y1={202} x2={228} y2={220} stroke="#FCA5A5" strokeWidth={1} />
        <line x1={228} y1={272} x2={228} y2={284} stroke="#FCA5A5" strokeWidth={1} />

        <rect x={10} y={240} width={120} height={52} rx={2} fill={fillColor("resultado")} stroke={C.border} strokeWidth={1} />
        <text x={70} y={260} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>Resultado 2026:</text>
        <text x={70} y={273} textAnchor="middle" fontSize="9" fontFamily="Roboto Mono, monospace" fill={C.ph} fontWeight="700">25 CURULES</text>
        <text x={70} y={286} textAnchor="middle" fontSize="8" fontFamily="Roboto Mono, monospace" fill={C.slate}>Primera fuerza nacional</text>
        <line x1={70} y1={216} x2={70} y2={240} stroke={C.ph} strokeWidth={1.5} />

        {nodes.map((n) => (
          <rect
            key={n.id}
            x={n.x}
            y={n.y}
            width={n.w}
            height={n.h}
            rx={2}
            fill="transparent"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHovered(n.id as NodeId)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>

      {hovered && (
        <div
          style={{
            position: "absolute",
            ...tooltipPos[hovered],
            left: hovered === "origen" || hovered === "ph" || hovered === "resultado" ? 140 : 250,
            transform: "translateX(-50%)",
            background: C.white,
            border: `1px solid ${C.border}`,
            padding: "7px 11px",
            borderRadius: 2,
            fontFamily: "Roboto Mono, monospace",
            fontSize: 9,
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 10,
            maxWidth: 260,
          }}
        >
          {tooltipContent[hovered]}
        </div>
      )}
    </div>
  );
}
