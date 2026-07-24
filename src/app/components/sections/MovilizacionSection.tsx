import { SectionNum } from "../ui/SectionNum";
import { ParticipationScatter } from "../charts/ParticipationScatter";
import { ParticipationBars } from "../charts/ParticipationBars";
import { GiniTable } from "../charts/GiniTable";

export function MovilizacionSection() {
  return (
    <section id="movilizacion" className="section-container py-10 md:py-16">
      <div className="flex items-baseline mb-1.5">
        <SectionNum n="§ 06" />
        <h2 className="font-editorial text-xl md:text-[26px] font-medium text-ink">
          La Paradoja de la Movilización: Abstención y Concentración Local
        </h2>
      </div>
      <p className="text-xs md:text-[13px] text-slate mb-10 pl-0 md:pl-12">
        Divergencia entre la participación en legislativas y presidenciales, y el comportamiento diferencial de zonas de conflicto.
      </p>

      <div className="pl-0 md:pl-12 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12">
        <div>
          <ParticipationScatter />
        </div>

        <div className="flex flex-col gap-4">
          <ParticipationBars />

          <div className="p-4 border border-border-default rounded-sm text-xs md:text-[13px] leading-[1.7] text-slate">
            La participación nacional descendió al <strong className="text-ink">50.62%</strong> en marzo de 2026 (frente al <strong className="text-ink">54.02%</strong> en 2022), aunque zonas con dinámicas de orden público complejo como <strong className="text-ink">Cauca y Meta</strong> registraron picos significativos de movilización ciudadana.
          </div>

          <GiniTable />
        </div>
      </div>
    </section>
  );
}
