import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { C } from "../../constants";
import { useFilters } from "../../../context/FilterContext";
import { useMunicipiosData } from "../../../context/MunicipiosContext";
import { useIsMobile } from "../ui/use-mobile";

interface BarData {
  depto: string;
  ph: number;
  fa: number;
}

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
      <p style={{ fontWeight: 700, color: C.ink, marginBottom: 4 }}>{d.depto}</p>
      <p style={{ color: C.ph }}>Pacto Histórico: {d.ph.toLocaleString("es-CO")}</p>
      <p style={{ color: "#e91e63" }}>Otra izquierda: {d.fa.toLocaleString("es-CO")}</p>
    </div>
  );
}

export function BarrasIzquierda() {
  const { selectedDepto, setSelectedDepto } = useFilters();
  const { aggregateByDept } = useMunicipiosData();
  const isMobile = useIsMobile();

  const data: BarData[] = aggregateByDept;

  return (
    <div style={{ userSelect: "none" }}>
      <p
        style={{
          fontFamily: "Roboto Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: C.slate,
          marginBottom: 16,
        }}
      >
        Voto de izquierda por departamento — Senado 2026
      </p>
      <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.slate }}>
          <span style={{ width: 10, height: 10, backgroundColor: C.ph, borderRadius: 1, flexShrink: 0 }} />
          Pacto Histórico
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.slate }}>
          <span style={{ width: 10, height: 10, backgroundColor: "#e91e63", borderRadius: 1, flexShrink: 0 }} />
          Otra izquierda
        </div>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 12, bottom: 0, left: isMobile ? 50 : 100 }}
          onClick={(e) => {
            if (e?.activePayload?.[0]) {
              const depto = e.activePayload[0].payload.depto;
              setSelectedDepto(depto === selectedDepto ? null : depto);
            }
          }}
        >
          <XAxis type="number" tick={{ fontSize: 9, fontFamily: "Roboto Mono, monospace", fill: C.slate }} />
          <YAxis
            type="category"
            dataKey="depto"
            tick={{ fontSize: 9, fontFamily: "Inter, sans-serif", fill: C.slate }}
            width={isMobile ? 80 : 110}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="ph" fill={C.ph} stackId="a" minPointSize={2}>
            {data.map((entry) => (
              <Cell
                key={entry.depto}
                opacity={selectedDepto && entry.depto !== selectedDepto ? 0.3 : 1}
                fill={C.ph}
              />
            ))}
          </Bar>
          <Bar dataKey="fa" fill="#e91e63" stackId="a" minPointSize={2}>
            {data.map((entry) => (
              <Cell
                key={`fa-${entry.depto}`}
                opacity={selectedDepto && entry.depto !== selectedDepto ? 0.3 : 1}
                fill="#e91e63"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
