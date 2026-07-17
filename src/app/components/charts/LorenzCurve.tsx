import {
  LineChart,
  Line,
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

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const label = payload[0].name === "concentracion" ? "PH 2026" :
    payload[0].name === "concentracion2022" ? "PH 2022" : "Equidad";
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
      <p style={{ color: C.slate }}>Municipios acumulados: {d.pct}%</p>
      <p style={{ color: payload[0].color }}>{label}: {(Number(d[payload[0].name as keyof typeof d]) * 100).toFixed(1)}%</p>
    </div>
  );
}

export function LorenzCurve() {
  const { computeLorenz, computeLorenz2022, actualGini, gini2022 } = useMunicipiosData();

  const mergedData = computeLorenz.map((point, i) => ({
    ...point,
    concentracion2022: computeLorenz2022[i]?.concentracion ?? 0,
  }));

  return (
    <div style={{ userSelect: "none" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
        <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate">
          Curva de Lorenz — Concentración territorial del voto
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={mergedData}
          margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} strokeWidth={0.75} />
          <XAxis
            dataKey="pct"
            tick={{ fontSize: 8, fontFamily: "Roboto Mono, monospace", fill: C.slate }}
            tickFormatter={(v: number) => `${v}%`}
            ticks={[0, 25, 50, 75, 100]}
          />
          <YAxis
            tick={{ fontSize: 8, fontFamily: "Roboto Mono, monospace", fill: C.slate }}
            tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
            domain={[0, 1]}
            ticks={[0, 0.25, 0.5, 0.75, 1]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={80}
            stroke="#DC2626"
            strokeWidth={1}
            strokeDasharray="3 3"
          >
            <Label
              value="80% de municipios"
              position="insideTopLeft"
              style={{ fontSize: 8, fontFamily: "Roboto Mono, monospace", fill: "#DC2626" }}
            />
          </ReferenceLine>
          <Line
            type="monotone"
            dataKey="equidad"
            stroke="#94A3B8"
            strokeWidth={1}
            strokeDasharray="4 4"
            dot={false}
            name="equidad"
          />
          <Line
            type="monotone"
            dataKey="concentracion2022"
            stroke="#6D28D9"
            strokeWidth={1.5}
            strokeDasharray="4 2"
            dot={false}
            name="concentracion2022"
          />
          <Line
            type="monotone"
            dataKey="concentracion"
            stroke={C.ph}
            strokeWidth={2}
            dot={false}
            name="concentracion"
          />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: C.slate, marginTop: 4 }}>
        <span>Equidad perfecta</span>
        <span style={{ color: "#6D28D9" }}>PH 2022 (Gini = {gini2022.toFixed(2)})</span>
        <span style={{ color: C.ph }}>PH 2026 (Gini = {actualGini.toFixed(2)})</span>
      </div>
    </div>
  );
}
