import { useState, useMemo } from "react";
import { useFilters } from "../../../context/FilterContext";
import { useMunicipiosData } from "../../../context/MunicipiosContext";
import {
  COLORES_BLOQUE,
  COLORES_PARTIDO,
  COLORES_IZQUIERDA,
  PAL_PCT,
  PAL_DELTA,
  PAL_PART,
  getLegendTitle,
  getLegendType,
} from "./LayerStyles";

const CAPA_MAP: Record<string, string> = {
  bloques: "ganador_2026",
  partidos: "partido_2026",
  pacto_pct: "pct_pacto_2026",
  pacto_delta: "delta_pp",
  concentracion: "concentracion",
  izquierda: "izq_2026",
  participacion: "part_2026",
};

export function MapLegendOverlay() {
  const [collapsed, setCollapsed] = useState(false);
  const { activeMapLayer, mapYear, filterCategory, setFilterCategory } = useFilters();

  if (activeMapLayer === "concentracion") return null;

  const capa = activeMapLayer === "bloques"
    ? `ganador_${mapYear}`
    : activeMapLayer === "partidos"
    ? `partido_${mapYear}`
    : CAPA_MAP[activeMapLayer] || "ganador_2026";

  const layerType = getLegendType(capa);
  const title = getLegendTitle(capa);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-md cursor-pointer border-none text-[10px] font-mono text-slate hover:text-ink transition-colors flex items-center gap-1"
      >
        <span>Leyenda</span>
        <span className="text-slate/40">&#9656;</span>
      </button>
    );
  }

  return (
    <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-2.5 md:px-4 md:py-3 rounded-lg shadow-md max-w-[220px] md:max-w-[260px]">
      <div className="flex items-center justify-between mb-1.5">
        <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-slate/50">{title}</p>
        <button
          onClick={() => setCollapsed(true)}
          className="cursor-pointer border-none bg-transparent text-slate/30 hover:text-slate/60 transition-colors p-0.5 leading-none"
          aria-label="Contraer leyenda"
        >
          <span className="text-[10px] font-mono">&#9660;</span>
        </button>
      </div>

      {layerType === "continua" ? (
        <LegendContinuaContent capa={capa} />
      ) : (
        <LegendCategoricaContent
          capa={capa}
          filterCategory={filterCategory}
          onToggle={(v) => setFilterCategory(filterCategory === v ? null : v)}
          onClear={() => setFilterCategory(null)}
        />
      )}
    </div>
  );
}

function LegendCategoricaContent({
  capa,
  filterCategory,
  onToggle,
  onClear,
}: {
  capa: string;
  filterCategory: string | null;
  onToggle: (v: string) => void;
  onClear: () => void;
}) {
  const paleta = capa === "izq_2026" ? COLORES_IZQUIERDA : capa.startsWith("partido") ? COLORES_PARTIDO : COLORES_BLOQUE;
  const { features } = useMunicipiosData();

  const municipioCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    features.forEach((f: any) => {
      const val = f.properties[capa];
      if (val) counts[val] = (counts[val] || 0) + 1;
    });
    return counts;
  }, [features, capa]);

  return (
    <div className="flex flex-col gap-1">
      {Object.entries(paleta).map(([v, color]) => {
        const active = filterCategory === v;
        const count = municipioCounts[v] ?? 0;
        return (
          <button
            key={v}
            onClick={() => onToggle(v)}
            className={`flex items-center gap-1.5 text-[11px] text-left w-full cursor-pointer border-none bg-transparent transition-all duration-150 ${
              filterCategory && !active ? "opacity-30" : "opacity-100"
            } hover:opacity-100`}
          >
            <span
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="truncate">{v} ({count})</span>
            {active && <span className="ml-auto text-[9px] text-ph font-mono">&#10003;</span>}
          </button>
        );
      })}
      {filterCategory && (
        <button
          onClick={onClear}
          className="text-[9px] text-slate/50 mt-1 border-t border-border-default pt-1.5 w-full text-left cursor-pointer bg-transparent border-none hover:text-slate transition-colors"
        >
          Limpiar filtro
        </button>
      )}
    </div>
  );
}

function LegendContinuaContent({ capa }: { capa: string }) {
  const pal = capa === "pct_pacto_2026" ? PAL_PCT : capa === "part_2026" ? PAL_PART : PAL_DELTA;
  const grad = `linear-gradient(to right, ${pal.join(", ")})`;
  const ejes =
    capa === "pct_pacto_2026"
      ? ["0%", "30%", "60%"]
      : capa === "part_2026"
      ? ["20%", "50%", "75%"]
      : ["−25 (bajó)", "0", "+25 (subió)"];
  return (
    <div>
      <div className="h-3 rounded-sm w-full" style={{ background: grad }} />
      <div className="flex justify-between text-[9px] text-slate/60 mt-0.5">
        {ejes.map((e) => (
          <span key={e}>{e}</span>
        ))}
      </div>
    </div>
  );
}
