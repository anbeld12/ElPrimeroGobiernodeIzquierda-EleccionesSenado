import { useState, useMemo } from "react";
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
import { useMunicipiosData } from "../../../context/MunicipiosContext";
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
      <p style={{ fontWeight: 700, color: C.ink, marginBottom: 2 }}>{d.municipio}</p>
      <p style={{ color: C.slate, fontSize: 9 }}>{d.depto}</p>
      <p style={{ color: C.slate }}>PH 2022: {d.x.toFixed(1)}%</p>
      <p style={{ color: C.slate }}>Var. PH: {d.y >= 0 ? "+" : ""}{d.y.toFixed(1)} pp</p>
    </div>
  );
}

export function SvgScatter() {
  const { features } = useMunicipiosData();
  const { selectedDepto, setSelectedDepto } = useFilters();
  const [hovered, setHovered] = useState<string | null>(null);

  const data = useMemo(() =>
    features
      .filter((f: any) => {
        const p = f.properties;
        return p.pct_pacto_2022 != null && p.delta_pp != null;
      })
      .map((f: any) => {
        const p = f.properties;
        return {
          municipio: p.municipio,
          depto: p.departamento,
          x: p.pct_pacto_2022,
          y: p.delta_pp,
          isSelected: p.departamento === selectedDepto,
          isHovered: p.municipio === hovered,
        };
      }),
    [features, selectedDepto, hovered]
  );

  return (
    <div className="select-none">
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
            domain={[0, 80]}
            ticks={[0, 20, 40, 60, 80]}
            tick={{ fontSize: 8, fontFamily: "Roboto Mono, monospace", fill: C.slate }}
            tickFormatter={(v: number) => `${v}%`}
          >
            <Label
              value="% Pacto Histórico 2022"
              position="bottom"
              offset={10}
              style={{ fontSize: 8, fontFamily: "Inter, sans-serif", fill: C.slate }}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            domain={[-15, 35]}
            ticks={[-15, 0, 15, 30]}
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
            y={0}
            stroke="#94A3B8"
            strokeDasharray="3 3"
            strokeWidth={0.75}
          />
          <Scatter
            data={data}
            shape={(props: any) => {
              const { cx, cy, payload } = props;
              const isActive = payload.isSelected || payload.isHovered;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? 6 : 3}
                  fill={C.ph}
                  opacity={isActive ? 1 : 0.35}
                  stroke={isActive ? C.ink : "none"}
                  strokeWidth={isActive ? 2 : 0}
                  style={{ cursor: "pointer", transition: "all 0.15s" }}
                  onClick={() =>
                    setSelectedDepto(
                      payload.depto === selectedDepto ? null : payload.depto
                    )
                  }
                  onMouseEnter={() => setHovered(payload.municipio)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            }}
          >
          </Scatter>
        </RechartsScatter>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1.5 text-[11px] text-slate">
        <span>{data.length} municipios — cada punto es un municipio</span>
      </div>
    </div>
  );
}
