import { useFilters, MapLayer } from "../../../context/FilterContext";
import {
  COLORES_BLOQUE,
  COLORES_PARTIDO,
  PAL_PCT,
  PAL_DELTA,
  PAL_PART,
  getLegendTitle,
  getLegendType,
} from "./LayerStyles";

const LAYER_OPTIONS: { value: MapLayer; label: string }[] = [
  { value: "bloques", label: "Bloque ganador" },
  { value: "partidos", label: "Partido ganador" },
  { value: "pacto_pct", label: "% Pacto Histórico" },
  { value: "pacto_delta", label: "Variación PH" },
  { value: "concentracion", label: "Concentración PH" },
  { value: "izquierda", label: "1ª fuerza izquierda" },
  { value: "participacion", label: "Participación electoral" },
];

export function LayerControls() {
  const { activeMapLayer, setActiveMapLayer, mapYear, setMapYear } = useFilters();

  const capaMap: Record<MapLayer, string> = {
    bloques: `ganador_${mapYear}`,
    partidos: `partido_${mapYear}`,
    pacto_pct: "pct_pacto_2026",
    pacto_delta: "delta_pp",
    concentracion: "concentracion",
    izquierda: "izq_2026",
    participacion: "part_2026",
  };

  return (
    <div className="absolute top-2 right-2 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-2 md:px-[14px] md:py-[10px] rounded-lg shadow-md text-xs md:text-[13px] max-w-[260px] max-h-[calc(100%-40px)] overflow-y-auto">
      <b className="text-xs">Capa del mapa</b>
      {LAYER_OPTIONS.map((opt) => (
        <label key={opt.value} className="block mt-1.5 cursor-pointer text-slate hover:text-ink transition-colors">
          <input
            type="radio"
            name="layer"
            value={opt.value}
            checked={activeMapLayer === opt.value}
            onChange={() => setActiveMapLayer(opt.value)}
            className="mr-1.5 accent-ph"
          />{" "}
          {opt.label}
        </label>
      ))}

      {(activeMapLayer === "bloques" || activeMapLayer === "partidos") && (
        <div className="mt-2 pt-2 border-t border-border-default">
          <b className="text-xs">Año</b>
          <label className="block mt-1.5 cursor-pointer text-slate hover:text-ink transition-colors">
            <input
              type="radio"
              name="mapYear"
              value="2022"
              checked={mapYear === "2022"}
              onChange={() => setMapYear("2022")}
              className="mr-1.5 accent-ph"
            />{" "}
            2022
          </label>
          <label className="block mt-1 cursor-pointer text-slate hover:text-ink transition-colors">
            <input
              type="radio"
              name="mapYear"
              value="2026"
              checked={mapYear === "2026"}
              onChange={() => setMapYear("2026")}
              className="mr-1.5 accent-ph"
            />{" "}
            2026
          </label>
        </div>
      )}

      <div className="mt-2 pt-2 border-t border-border-default">
        <Legend
          capa={capaMap[activeMapLayer]}
          layerType={getLegendType(capaMap[activeMapLayer])}
          title={getLegendTitle(capaMap[activeMapLayer])}
        />
      </div>
    </div>
  );
}

function Legend({
  capa,
  layerType,
  title,
}: {
  capa: string;
  layerType: "categorica" | "continua";
  title: string;
}) {
  if (layerType === "continua") {
    const pal = capa === "pct_pacto_2026" ? PAL_PCT : capa === "part_2026" ? PAL_PART : PAL_DELTA;
    const grad = `linear-gradient(to right, ${pal.join(", ")})`;
    const ejes =
      capa === "pct_pacto_2026"
        ? ["0%", "30%", "60%"]
        : capa === "part_2026"
        ? ["20%", "50%", "75%"]
        : ["\u221225 (bajó)", "0", "+25 (subió)"];
    return (
      <div>
        <b className="text-xs">{title}</b>
        <div className="h-3 rounded-sm mt-1 mb-0.5" style={{ background: grad }} />
        <div className="flex justify-between text-[11px] text-slate/70">
          {ejes.map((e) => (
            <span key={e}>{e}</span>
          ))}
        </div>
      </div>
    );
  }

  const paleta = capa.startsWith("partido") || capa === "izq_2026" ? COLORES_PARTIDO : COLORES_BLOQUE;
  return (
    <div>
      <b className="text-xs">{title}</b>
      {Object.entries(paleta).map(([v, color]) => (
        <div key={v} className="flex items-center mt-0.5">
          <span className="w-[14px] h-[14px] rounded-sm mr-1.5 shrink-0" style={{ background: color }} />
          <span className="text-[11px]">{v}</span>
        </div>
      ))}
    </div>
  );
}
