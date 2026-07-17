import { SectionNum } from "../ui/SectionNum";
import { MapaTerritorial } from "../maps/MapaTerritorial";
import { useFilters } from "../../../context/FilterContext";

const MAP_LAYERS = [
  { id: "bloques", label: "Bloque ganador", desc: "Distribución del bloque ganador por municipio en las elecciones al Senado." },
  { id: "partidos", label: "Partido ganador", desc: "Partido político más votado por municipio." },
  { id: "pacto_pct", label: "% Pacto Histórico", desc: "Porcentaje de votación del Pacto Histórico por municipio." },
  { id: "pacto_delta", label: "Variación PH", desc: "Variación en puntos porcentuales del PH entre 2022 y 2026." },
  { id: "concentracion", label: "Concentración PH", desc: "Volumen de votos absolutos del PH. Círculos más grandes = más votos." },
  { id: "izquierda", label: "1.ª fuerza izquierda", desc: "Primera fuerza de izquierda por municipio." },
];

export function MapaSection() {
  const { selectedDepto } = useFilters();

  return (
    <section id="mapa" className="bg-ivory">
      <div className="section-container py-10 md:py-16">
        <div className="flex items-baseline mb-1.5">
          <SectionNum n="§ 04b" />
          <h2 className="font-editorial text-xl md:text-[26px] font-medium text-ink">
            Geografía Electoral del Cambio
          </h2>
        </div>
        <p className="text-xs md:text-[13px] text-slate mb-6 pl-0 md:pl-12">
          Distribución territorial del voto a nivel municipal.
        </p>

        {selectedDepto && (
          <p className="text-[11px] text-ph mb-6 pl-0 md:pl-12 font-mono">
            Departamento seleccionado: <strong>{selectedDepto}</strong>
          </p>
        )}

        <div className="pl-0 md:pl-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {MAP_LAYERS.map((ml) => (
            <div key={ml.id} className="border border-border-default rounded-sm overflow-hidden">
              <div className="px-3 py-2 bg-soft border-b border-border-default">
                <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate">
                  {ml.label}
                </p>
              </div>
              <div className="h-[260px] md:h-[320px]">
                <MapaTerritorial layer={ml.id} hideControls />
              </div>
              <div className="px-3 py-1.5 text-[10px] text-slate bg-white">
                {ml.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
