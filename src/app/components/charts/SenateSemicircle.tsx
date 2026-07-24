import { useState, useMemo, useRef, useEffect } from "react";
import { C } from "../../constants";
import { useFilters } from "../../../context/FilterContext";
import { useIsMobile } from "../ui/use-mobile";

export interface PartyDatum {
  party: string;
  votes: number;
  pct: string;
  seats: number;
  color: string;
}

export interface SpectrumItem {
  color: string;
  seats: number;
}

interface Props {
  data: PartyDatum[];
  spectrum: SpectrumItem[];
  totalSeats: number;
  label: string;
}

export function SenateSemicircle({ data, spectrum, totalSeats, label }: Props) {
  const { highlightedParty, setHighlightedParty } = useFilters();
  const isMobile = useIsMobile();
  const [tooltip, setTooltip] = useState<{
    party: string;
    seats: number;
    votes: number;
    pct: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const partyNameByColor = useMemo(() => {
    const map: Record<string, string> = {};
    data.forEach((p) => { map[p.color] = p.party; });
    return map;
  }, [data]);

  const cx = 300;
  const cy = 265;
  const BASE_ARCS = [
    { r: 140, cap: 31 },
    { r: 175, cap: 36 },
    { r: 210, cap: 36 },
  ];
  const factor = Math.max(0.5, totalSeats / 103);
  const ARCS = BASE_ARCS.map((a) => ({
    r: a.r,
    cap: Math.round(a.cap * factor),
  }));

  const allSeats: { color: string; party: string }[] = [];
  spectrum.forEach(({ color, seats }) => {
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
    const p = data.find((s) => s.party === party);
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
    <div ref={ref} className="relative select-none">
      <svg viewBox="0 0 600 350" className="w-full max-w-[560px] block">
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
          <g
            key={d.party + '-' + i}
            className="cursor-pointer"
            onMouseEnter={() => handleHover(d.party)}
            onMouseLeave={handleLeave}
          >
            {isMobile && (
              <circle
                cx={d.x}
                cy={d.y}
                r={16}
                fill="transparent"
                style={{ pointerEvents: "all" }}
              />
            )}
            <circle
              cx={d.x}
              cy={d.y}
              r={isVisible ? 5.6 : 0}
              fill={d.color}
              pointerEvents="none"
              opacity={
                highlightedParty && d.party !== highlightedParty
                  ? 0.25
                  : isVisible ? 0.9 : 0
              }
              style={{ transitionDelay: `${i * 8}ms`, transitionDuration: "500ms", transitionProperty: "opacity, r", transitionTimingFunction: "ease-out" }}
            />
          </g>
        ))}
        <text
          x={cx - 210}
          y={cy + 28}
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
          y={cy + 28}
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
          y={cy + 28}
          textAnchor="middle"
          fontSize="15"
          fontFamily="Roboto Mono, monospace"
          fontWeight="700"
          fill={C.ink}
        >
          {totalSeats}
        </text>
        <text
          x={cx}
          y={cy + 42}
          textAnchor="middle"
          fontSize="9"
          fontFamily="Inter, sans-serif"
          fill={C.slate}
        >
          CURULES · {label} 2026–2030
        </text>
      </svg>

      {tooltip && (
        <div className={`absolute bg-white border border-border-default px-3.5 py-2 rounded-sm font-mono text-[10px] pointer-events-none shadow-sm z-10 ${
          isMobile
            ? "static mt-3 w-full text-center whitespace-normal"
            : "left-1/2 top-[20%] -translate-x-1/2 whitespace-nowrap"
        }`}>
          <p className="font-bold text-ink mb-0.5">{tooltip.party}</p>
          <p className="text-slate">
            {tooltip.seats} curules · {tooltip.votes > 0 ? tooltip.votes.toLocaleString("es-CO") : "\u2014"} votos ({tooltip.pct})
          </p>
        </div>
      )}
    </div>
  );
}
