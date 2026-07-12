import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { C } from "../../constants";
import { useMunicipiosData } from "../../../context/MunicipiosContext";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
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
      <p style={{ color: C.slate }}>Municipios acumulados: {payload[0].payload.pct}%</p>
      <p style={{ color: C.ph }}>Voto PH acumulado: {(payload[0].payload.concentracion * 100).toFixed(1)}%</p>
    </div>
  );
}

export function LorenzCurve() {
  const { computeLorenz, actualGini } = useMunicipiosData();
  const lorenzData = computeLorenz;

  return (
    <div style={{ userSelect: "none" }}>
      <p
        style={{
          fontFamily: "Roboto Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: C.slate,
          marginBottom: 12,
        }}
      >
        Curva de Lorenz — Concentración del voto PH (Gini = {actualGini.toFixed(2)})
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={lorenzData}
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
          />
          <Line
            type="monotone"
            dataKey="equidad"
            stroke="#94A3B8"
            strokeWidth={1}
            strokeDasharray="4 4"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="concentracion"
            stroke={C.ph}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: C.slate, marginTop: 4 }}>
        <span>Equidad perfecta</span>
        <span>PH 2026 (Gini = {actualGini.toFixed(2)})</span>
      </div>
    </div>
  );
}
