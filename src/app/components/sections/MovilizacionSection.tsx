import { useState } from "react";
import { SectionNum } from "../ui/SectionNum";
import { SvgScatter } from "../charts/ScatterChart";
import { ParticipationScatter } from "../charts/ParticipationScatter";
import { ParticipationBars } from "../charts/ParticipationBars";
import { GiniTable } from "../charts/GiniTable";
import { LorenzCurve } from "../charts/LorenzCurve";

export function MovilizacionSection() {
  const [scatterMode, setScatterMode] = useState<"pacto" | "participacion">("participacion");

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
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate">
              {scatterMode === "pacto"
                ? "Dispersión municipal: % Pacto Histórico 2022 vs. Variación PH"
                : "Participación electoral por municipio — Senado 2026"}
            </p>
            <div className="flex gap-1 ml-auto" role="tablist">
              {(["participacion", "pacto"] as const).map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={scatterMode === m}
                  onClick={() => setScatterMode(m)}
                  className={`font-mono tracking-[0.1em] uppercase border cursor-pointer transition-all duration-150 text-[8px] px-2 py-1 ${
                    scatterMode === m
                      ? "bg-ink text-ivory border-ink"
                      : "bg-transparent text-slate border-border-default hover:border-slate"
                  }`}
                >
                  {m === "pacto" ? "PH" : "Participación"}
                </button>
              ))}
            </div>
          </div>
          {scatterMode === "pacto" ? <SvgScatter /> : <ParticipationScatter />}
        </div>

        <div className="flex flex-col gap-4">
          <ParticipationBars />

          <div className="p-4 border border-border-default rounded-sm text-xs md:text-[13px] leading-[1.7] text-slate">
            La participación nacional descendió al <strong className="text-ink">50.62%</strong> en marzo de 2026 (frente al <strong className="text-ink">54.02%</strong> en 2022), aunque zonas con dinámicas de orden público complejo como <strong className="text-ink">Cauca y Meta</strong> registraron picos significativos de movilización ciudadana.
          </div>

          <GiniTable />

          <div className="p-4 border border-border-default rounded-sm bg-white">
            <LorenzCurve />
          </div>
        </div>
      </div>
    </section>
  );
}
