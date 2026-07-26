import { SectionNum } from "../ui/SectionNum";
import { PactoScatter } from "../charts/PactoScatter";

export function PactoSection() {
  return (
    <section id="pacto" className="bg-soft">
      <div className="section-container py-10 md:py-16">
        <div className="flex items-baseline mb-1.5">
          <SectionNum n="03" />
          <h2 className="font-editorial text-xl md:text-[26px] font-medium text-ink">
            Desempeño y consolidación del Pacto Histórico: 2022 vs. 2026
          </h2>
        </div>
        <p className="text-xs md:text-[13px] text-slate mb-10 pl-0 md:pl-12">
          Transición de coalición con listas cerradas a partido unificado con lista cremallera y paridad de género.
        </p>

        <div className="pl-0 md:pl-12 grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="p-5 md:p-7 border border-border-default md:border-r-0 rounded-none md:rounded-l-sm bg-white">
            <div className="flex justify-between items-center mb-5">
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-slate">Legislativas 2022</span>
              <span className="font-mono text-[10px] px-2 py-[3px] border border-border-default text-slate">Coalición</span>
            </div>
            <p className="font-mono text-2xl md:text-[34px] font-semibold text-ink mb-4">2,880,254</p>
            <div className="flex gap-4 md:gap-6 mb-4">
              <div>
                <p className="text-[10px] text-slate mb-0.5">% Electoral</p>
                <p className="font-mono text-lg md:text-xl font-semibold text-ph">16.95%</p>
              </div>
              <div>
                <p className="text-[10px] text-slate mb-0.5">Curules Senado</p>
                <p className="font-mono text-lg md:text-xl font-semibold text-ph">20</p>
              </div>
            </div>
            <p className="text-[11px] text-slate border-t border-border-default pt-3">Lista cerrada (bloqueada) · Listas separadas</p>
          </div>

          <div className="p-5 md:p-7 border border-dashed border-ph flex flex-col items-center justify-center text-center bg-ph/3">
            <p className="font-mono text-3xl md:text-[40px] font-bold text-ph leading-none">+53.24%</p>
            <p className="font-editorial text-sm md:text-[14px] font-medium text-ink mt-2 mb-1">Crecimiento relativo en votos</p>
            <p className="text-[11px] text-slate mb-5">+1,533,382 sufragios absolutos adicionales</p>
            {[
              { label: "Porcentaje electoral", val: "+5.77 pp" },
              { label: "Curules de Senado", val: "+25% (+5 escaños)" },
              { label: "Representación femenina", val: "52% (cremallera)" },
            ].map((r) => (
              <div key={r.label} className="w-full flex justify-between text-[11px] border-b border-border-default py-1.5 mb-1.5">
                <span className="text-slate">{r.label}</span>
                <span className="font-mono font-semibold text-ph">{r.val}</span>
              </div>
            ))}
          </div>

          <div className="p-5 md:p-7 border border-ph md:border-l-0 rounded-none md:rounded-r-sm bg-white">
            <div className="flex justify-between items-center mb-5">
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-slate">Legislativas 2026</span>
              <span className="font-mono text-[10px] px-2 py-[3px] border border-ph text-ph">Partido Unificado</span>
            </div>
            <p className="font-mono text-2xl md:text-[34px] font-semibold text-ink mb-4">4,413,636</p>
            <div className="flex gap-4 md:gap-6 mb-4">
              <div>
                <p className="text-[10px] text-slate mb-0.5">% Electoral</p>
                <p className="font-mono text-lg md:text-xl font-semibold text-ph">22.72%</p>
              </div>
              <div>
                <p className="text-[10px] text-slate mb-0.5">Curules Senado</p>
                <p className="font-mono text-lg md:text-xl font-semibold text-ph">25</p>
              </div>
            </div>
            <p className="text-[11px] text-slate border-t border-border-default pt-3">Lista cerrada cremallera · Fusión Polo + UP + PCC (sep. 2025)</p>
          </div>
        </div>

        <div className="pl-0 md:pl-12 mt-8 border border-border-default rounded-sm overflow-hidden p-4 md:p-6 bg-white">
          <PactoScatter />
        </div>
      </div>
    </section>
  );
}
