import { useState } from "react";
import { C } from "../../constants";
import { SPECTRUM, SENATE } from "../../../data/senate";
import { useFilters } from "../../../context/FilterContext";

const partyNameByColor: Record<string, string> = {};
SENATE.forEach((p) => {
  partyNameByColor[p.color] = p.party;
});

export function SenateSemicircle() {
  const { highlightedParty, setHighlightedParty } = useFilters();
  const [tooltip, setTooltip] = useState<{
    party: string;
    seats: number;
    votes: number;
    pct: string;
  } | null>(null);

  const cx = 300;
  const cy = 265;
  const ARCS = [
    { r: 140, cap: 31 },
    { r: 175, cap: 36 },
    { r: 210, cap: 36 },
  ];

  const allSeats: { color: string; party: string }[] = [];
  SPECTRUM.forEach(({ color, seats }) => {
    const name = partyNameByColor[color] || "?";
    for (let i = 0; i < seats; i++) allSeats.push({ color, party: name });
  });

  const dots: { x: number; y: number; color: string; party: string }[] = [];
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
      dots.push({ x, y, color: allSeats[idx].color, party: allSeats[idx].party });
      idx++;
    }
  });

  const handleHover = (party: string) => {
    const p = SENATE.find((s) => s.party === party);
    if (p) {
      setTooltip({ party: p.party, seats: p.seats, votes: p.votes, pct: p.pct });
      setHighlightedParty(p.party);
    }
  };

  const handleLeave = () => {
    setTooltip(null);
    setHighlightedParty(null);
  };

  return (
    <div className="relative select-none">
      <svg viewBox="0 0 600 295" className="w-full max-w-[560px] block">
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
        <line
          x1={cx - 235}
          y1={cy}
          x2={cx + 235}
          y2={cy}
          stroke={C.border}
          strokeWidth="1"
        />
        {dots.map((d, i) => (
          <circle
            key={d.party + '-' + i}
            cx={d.x}
            cy={d.y}
            r={5.6}
            fill={d.color}
            className="cursor-pointer"
            onMouseEnter={() => handleHover(d.party)}
            onMouseLeave={handleLeave}
            opacity={
              highlightedParty && d.party !== highlightedParty
                ? 0.25
                : 0.9
            }
          />
        ))}
        <text
          x={cx - 210}
          y={cy + 20}
          textAnchor="middle"
          fontSize="8"
          fontFamily="Roboto Mono, monospace"
          fill={C.slate}
          opacity={0.5}
        >
          OPOSICIÓN
        </text>
        <text
          x={cx + 210}
          y={cy + 20}
          textAnchor="middle"
          fontSize="8"
          fontFamily="Roboto Mono, monospace"
          fill={C.slate}
          opacity={0.5}
        >
          GOBIERNO
        </text>
        <text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          fontSize="15"
          fontFamily="Roboto Mono, monospace"
          fontWeight="700"
          fill={C.ink}
        >
          103
        </text>
        <text
          x={cx}
          y={cy + 34}
          textAnchor="middle"
          fontSize="9"
          fontFamily="Inter, sans-serif"
          fill={C.slate}
        >
          CURULES · SENADO 2026–2030
        </text>
      </svg>

      {tooltip && (
        <div className="absolute left-1/2 top-[20%] -translate-x-1/2 bg-white border border-border-default px-3.5 py-2 rounded-sm font-mono text-[10px] pointer-events-none whitespace-nowrap shadow-sm z-10">
          <p className="font-bold text-ink mb-0.5">{tooltip.party}</p>
          <p className="text-slate">
            {tooltip.seats} curules · {tooltip.votes > 0 ? tooltip.votes.toLocaleString("es-CO") : "\u2014"} votos ({tooltip.pct})
          </p>
        </div>
      )}
    </div>
  );
}
