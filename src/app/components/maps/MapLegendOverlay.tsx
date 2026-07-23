import { useMemo } from "react";
import { useFilters } from "../../../context/FilterContext";
import {
  COLORES_BLOQUE,
  COLORES_PARTIDO,
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

function isCategorica(capa: string): boolean {
  return getLegendType(capa) === "categorica";
}

export function MapLegendOverlay() {
  const { activeMapLayer, mapYear, filterCategory, setFilterCategory } = useFilters();

  const capa = activeMapLayer === "bloques"
    ? `ganador_${mapYear}`
    : activeMapLayer === "partidos"
    ? `partido_${mapYear}`
    : CAPA_MAP[activeMapLayer] || "ganador_2026";

  const layerType = getLegendType(capa);
  const title = getLegendTitle(capa);

  if (layerType === "continua") {
    return <LegendContinua capa={capa} title={title} />;
  }

  const paleta = capa.startsWith("partido") || capa === "izq_2026" ? COLORES_PARTIDO : COLORES_BLOQUE;

  return (
    <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-2.5 md:px-4 md:py-3 rounded-lg shadow-md max-w-[220px] md:max-w-[260px]">
      <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-slate/50 mb-2">{title}</p>
      <div className="flex flex-col gap-1">
        {Object.entries(paleta).map(([v, color]) => {
          const active = filterCategory === v;
          return (
            <button
              key={v}
              onClick={() => setFilterCategory(active ? null : v)}
              className={`flex items-center gap-1.5 text-[11px] text-left w-full cursor-pointer border-none bg-transparent transition-all duration-150 ${
                filterCategory && !active ? "opacity-30" : "opacity-100"
              } hover:opacity-100`}
            >
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="truncate">{v}</span>
              {active && <span className="ml-auto text-[9px] text-ph font-mono">&#10003;</span>}
            </button>
          );
        })}
        {filterCategory && (
          <button
            onClick={() => setFilterCategory(null)}
            className="text-[9px] text-slate/50 mt-1 border-t border-border-default pt-1.5 w-full text-left cursor-pointer bg-transparent border-none hover:text-slate transition-colors"
          >
            Limpiar filtro
          </button>
        )}
      </div>
    </div>
  );
}

function LegendContinua({ capa, title }: { capa: string; title: string }) {
  const pal = capa === "pct_pacto_2026" ? PAL_PCT : capa === "part_2026" ? PAL_PART : PAL_DELTA;
  const grad = `linear-gradient(to right, ${pal.join(", ")})`;
  const ejes =
    capa === "pct_pacto_2026"
      ? ["0%", "30%", "60%"]
      : capa === "part_2026"
      ? ["20%", "50%", "75%"]
      : ["−25 (bajó)", "0", "+25 (subió)"];
  return (
    <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-2.5 md:px-4 md:py-3 rounded-lg shadow-md">
      <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-slate/50 mb-1.5">{title}</p>
      <div className="h-3 rounded-sm w-full min-w-[180px]" style={{ background: grad }} />
      <div className="flex justify-between text-[9px] text-slate/60 mt-0.5">
        {ejes.map((e) => (
          <span key={e}>{e}</span>
        ))}
      </div>
    </div>
  );
}
