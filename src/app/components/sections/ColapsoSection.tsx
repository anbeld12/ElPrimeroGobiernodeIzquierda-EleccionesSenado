import { SectionNum } from "../ui/SectionNum";
import { SankeyFlow } from "../charts/SankeyFlow";
import { ThresholdBars } from "../charts/ThresholdBars";
import { ComparisonBars } from "../charts/ComparisonBars";
import { BarrasIzquierda } from "../charts/BarrasIzquierda";

export function ColapsoSection() {
  return (
    <section id="colapso" className="section-container py-10 md:py-16">
      <div className="flex items-baseline mb-1.5">
        <SectionNum n="§ 05" />
        <h2 className="font-editorial text-xl md:text-[26px] font-medium text-ink">
          El Colapso del Progresismo Disidente y la Pérdida del Umbral
        </h2>
      </div>
      <p className="text-xs md:text-[13px] text-slate mb-10 pl-0 md:pl-12">
        Movimientos que no superaron el umbral legal del 3% de votos válidos (mínimo: 582,695 sufragios).
      </p>

      <div className="pl-0 md:pl-12 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-12">
        <div>
          <SankeyFlow />
        </div>
        <div>
          <ThresholdBars />
          <ComparisonBars />
          <div className="mt-4 p-4 bg-soft border border-border-default rounded-sm text-xs md:text-[12px] text-slate">
            <strong className="text-ink">Nota:</strong> Las 10 curules transitorias de paz de Comunes (2022) fueron suprimidas en 2026 al concluir las garantías del Acuerdo de La Habana. La organización no obtuvo escaños por voto popular.
          </div>
        </div>
      </div>

      <div className="pl-0 md:pl-12 mt-12">
        <div className="border border-border-default rounded-sm overflow-hidden p-4 md:p-6 bg-white">
          <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate mb-4">
            Voto de izquierda por departamento — Senado 2026
          </p>
          <BarrasIzquierda />
        </div>
      </div>
    </section>
  );
}
