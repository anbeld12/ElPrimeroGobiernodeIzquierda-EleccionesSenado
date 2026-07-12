import { useState } from "react";
import {
  ScatterChart as RechartsScatter,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Label,
  ResponsiveContainer,
} from "recharts";
import { C } from "../../constants";
import { SCATTER_DATA, CORRELATIONS } from "../../../data/scatter";
import { useFilters } from "../../../context/FilterContext";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        padding: "7px 11px",
        fontFamily: "Roboto Mono, monospace",
        fontSize: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ fontWeight: 700, color: C.ink, marginBottom: 2 }}>{d.dept}</p>
      <p style={{ color: C.slate }}>Alt. 2022: {d.x}%</p>
      <p style={{ color: C.slate }}>Var. PH: +{d.y} pp</p>
    </div>
  );
}

export function SvgScatter() {
  const { selectedDepto, setSelectedDepto } = useFilters();
  const [hovered, setHovered] = useState<string | null>(null);

  const data = SCATTER_DATA.map((d) => ({
    ...d,
    isSelected: d.dept === selectedDepto,
    isHovered: d.dept === hovered,
  }));

  return (
    <div className="select-none">
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-3">
        {CORRELATIONS.map((c) => (
          <span key={c.label} className="font-mono text-[10px]">
            <span style={{ color: c.color }} className="font-bold">{c.r}</span>
            <span className="text-slate"> {c.label}</span>
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <RechartsScatter
          data={data}
          margin={{ top: 16, right: 20, bottom: 36, left: 38 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={C.border}
            strokeWidth={0.75}
          />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 26]}
            ticks={[0, 5, 10, 15, 20, 25]}
            tick={{ fontSize: 8, fontFamily: "Roboto Mono, monospace", fill: C.slate }}
            tickFormatter={(v: number) => `${v}%`}
          >
            <Label
              value="% Votos alternativos 2022 (CE + FC)"
              position="bottom"
              offset={10}
              style={{ fontSize: 8, fontFamily: "Inter, sans-serif", fill: C.slate }}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 17]}
            ticks={[0, 5, 10, 15]}
            tick={{ fontSize: 8, fontFamily: "Roboto Mono, monospace", fill: C.slate }}
          >
            <Label
              value="Variación PH (pp)"
              angle={-90}
              position="insideLeft"
              offset={-25}
              style={{ fontSize: 8, fontFamily: "Inter, sans-serif", fill: C.slate }}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={5.77}
            stroke={`${C.ph}66`}
            strokeDasharray="4 4"
            strokeWidth={1}
          >
            <Label
              value="Δ PH nac. +5.77pp"
              position="insideTopRight"
              style={{ fontSize: 7.5, fontFamily: "Roboto Mono, monospace", fill: C.ph }}
            />
          </ReferenceLine>
          <Scatter
            data={data}
            shape={(props: any) => {
              const { cx, cy, payload } = props;
              const r = payload.h ? 7 : 4.5;
              const isActive = payload.isSelected || payload.isHovered;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? r + 2 : r}
                  fill={payload.h ? C.ph : "#94A3B8"}
                  opacity={isActive ? 1 : payload.h ? 0.85 : 0.5}
                  stroke={isActive ? C.ink : payload.h ? C.ph : "none"}
                  strokeWidth={isActive ? 2 : payload.h ? 1.5 : 0}
                  style={{ cursor: "pointer", transition: "all 0.15s" }}
                  onClick={() =>
                    setSelectedDepto(
                      payload.dept === selectedDepto ? null : payload.dept
                    )
                  }
                  onMouseEnter={() => setHovered(payload.dept)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            }}
          >
          </Scatter>
        </RechartsScatter>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1.5 text-[11px] text-slate">
        <div className="flex items-center gap-1.5">
          <span className="w-[9px] h-[9px] rounded-full shrink-0 bg-ph" />
          Zonas con dinámicas de orden público complejo
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[9px] h-[9px] rounded-full shrink-0 bg-[#94A3B8]" />
          Resto del país
        </div>
      </div>
    </div>
  );
}
