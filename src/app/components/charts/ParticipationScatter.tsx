import { useMemo, useState } from "react";
import {
  ScatterChart as RechartsScatter,
  Scatter,
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
      <p style={{ color: C.slate }}>Participación: {d.pct.toFixed(1)}%</p>
      <p style={{ color: C.slate }}>Censo: {d.censo.toLocaleString("es-CO")}</p>
      <p style={{ color: C.slate }}>Votos: {d.votos.toLocaleString("es-CO")}</p>
    </div>
  );
}

const DEPT_ORDER = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar",
  "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó",
  "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira",
  "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo",
  "Quindío", "Risaralda", "San Andrés", "Santander", "Sucre", "Tolima",
  "Valle del Cauca", "Vaupés", "Vichada",
];

export function ParticipationScatter() {
  const { features } = useMunicipiosData();
  const [hovered, setHovered] = useState<string | null>(null);

  const byDept = useMemo(() => {
    const map: Record<string, { depto: string; data: any[]; avg: number }> = {};
    features.forEach((f: any) => {
      const p = f.properties;
      if (p.part_2026 == null || p.censo_2026 == null) return;
      const depto = p.departamento;
      if (!map[depto]) {
        map[depto] = { depto, data: [], avg: 0 };
      }
      map[depto].data.push({
        municipio: p.municipio,
        depto,
        pct: p.part_2026,
        censo: p.censo_2026,
        votos: p.votos_dep_2026,
      });
    });
    Object.values(map).forEach((g) => {
      g.avg = g.data.reduce((s, d) => s + d.pct, 0) / g.data.length;
    });
    return map;
  }, [features]);

  const scatterData = useMemo(() => {
    const result: any[] = [];
    DEPT_ORDER.forEach((depto) => {
      const group = byDept[depto];
      if (!group) return;
      group.data.forEach((d: any) => {
        result.push({
          ...d,
          deptIdx: DEPT_ORDER.indexOf(depto),
          isHovered: d.municipio === hovered,
        });
      });
    });
    return result;
  }, [byDept, hovered]);

  const deptTicks = useMemo(() => {
    return DEPT_ORDER
      .map((d, i) => ({ index: i, label: d }))
      .filter((_, i) => i % 6 === 0 || i === DEPT_ORDER.length - 1);
  }, []);

  return (
    <div className="select-none">
      <ResponsiveContainer width="100%" height={340}>
        <RechartsScatter
          data={scatterData}
          margin={{ top: 16, right: 20, bottom: 56, left: 42 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={C.border}
            strokeWidth={0.75}
          />
          <XAxis
            type="number"
            dataKey="deptIdx"
            domain={[0, DEPT_ORDER.length - 1]}
            tick={false}
          >
          </XAxis>
          <YAxis
            type="number"
            dataKey="pct"
            domain={[15, 80]}
            ticks={[20, 30, 40, 50, 60, 70, 80]}
            tick={{ fontSize: 8, fontFamily: "Roboto Mono, monospace", fill: C.slate }}
            tickFormatter={(v: number) => `${v}%`}
          >
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={50.62}
            stroke={C.ph}
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          <Scatter
            data={scatterData}
            shape={(props: any) => {
              const { cx, cy, payload } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={payload.isHovered ? 6 : 3}
                  fill="#0D9488"
                  opacity={payload.isHovered ? 1 : 0.3}
                  stroke={payload.isHovered ? C.ink : "none"}
                  strokeWidth={payload.isHovered ? 2 : 0}
                  style={{ cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={() => setHovered(payload.municipio)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            }}
          />
        </RechartsScatter>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[10px] text-slate font-mono">
        <span>{scatterData.length} municipios</span>
        <span className="text-ph">— Línea: media nacional 50,62%</span>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1.5 text-[8px] text-slate/60 font-mono">
        {deptTicks.map((t) => (
          <span key={t.index} className="whitespace-nowrap">{t.label}</span>
        ))}
      </div>
    </div>
  );
}
