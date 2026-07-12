import { SectionNum } from "../ui/SectionNum";
import { MapaTerritorial } from "../maps/MapaTerritorial";
import { LayerControls } from "../maps/LayerControls";
import { useFilters } from "../../../context/FilterContext";

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
        <p className="text-xs md:text-[13px] text-slate mb-2 pl-0 md:pl-12">
          Distribución territorial del voto a nivel municipal. Seleccione una capa para explorar los patrones geográficos del Senado 2022&ndash;2026.
        </p>

        {selectedDepto && (
          <p className="text-[11px] text-ph mb-4 pl-0 md:pl-12 font-mono">
            Departamento seleccionado: <strong>{selectedDepto}</strong> — Los gráficos de las secciones siguientes están filtrados por esta región.
          </p>
        )}

        <div className="pl-0 md:pl-12 grid grid-cols-1 gap-6">
          <div className="h-[400px] md:h-[600px] relative border border-border-default rounded-sm overflow-hidden">
            <MapaTerritorial />
            <LayerControls />
          </div>
        </div>

        <div className="pl-0 md:pl-12 mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="p-4 border border-border-default rounded-sm bg-white text-xs md:text-[12px] text-slate leading-[1.6]">
            <strong className="text-ink">Interpretación:</strong> El mapa de bloques muestra cómo la mayoría de municipios colombianos votaron mayoritariamente por la derecha (azul) y el centro (naranja), mientras que la izquierda (rojo) se concentra en el Pacífico, la Amazonía y algunos focos urbanos. El Pacto Histórico, pese a ganar en pocos municipios, concentra votos en las grandes ciudades.
          </div>
          <div className="p-4 border border-border-default rounded-sm bg-white text-xs md:text-[12px] text-slate leading-[1.6]">
            <strong className="text-ink">Interactividad:</strong> Haga clic en cualquier municipio para seleccionar su departamento. Esto actualizará los gráficos de dispersión (§06) y de barras (§05) para resaltar los datos de esa región. Use el panel superior derecho para cambiar entre las 6 capas de información disponibles.
          </div>
        </div>
      </div>
    </section>
  );
}
