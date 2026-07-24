import { useState } from "react";
import { SectionNum } from "../ui/SectionNum";
import { SenateSemicircle } from "../charts/SenateSemicircle";
import { SENATE, CAMARA, SPECTRUM, CAMARA_SPECTRUM } from "../../../data/senate";
import { useFilters } from "../../../context/FilterContext";

const CAMARA_TOTAL_VOTES = 18970700;

export function ComposicionSection() {
  const [tab, setTab] = useState<"senado" | "camara">("senado");
  const { highlightedParty, setHighlightedParty } = useFilters();

  return (
    <section id="composicion" className="bg-ivory">
      <div className="section-container py-10 md:py-16">
        <div className="flex items-baseline mb-1.5">
          <SectionNum n="§ 01" />
          <h2 className="font-editorial text-xl md:text-[26px] font-medium text-ink">
            Primera fuerza, pero sin mayorías
          </h2>
        </div>
        <p className="text-xs md:text-[13px] text-slate mb-8 pl-0 md:pl-12 leading-[1.7] max-w-[900px]">
          El Pacto Histórico encabeza el Senado con 25 de las 103 curules. Ningún partido se acerca. Y sin embargo, no ostenta mayoría propia.
        </p>

        <div className="pl-0 md:pl-12 mb-10">
          <div className="inline-flex border border-border-default overflow-hidden rounded-sm" role="tablist" aria-label="Cámara legislativa">
            {(["senado", "camara"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`font-mono text-[10px] tracking-[0.12em] uppercase px-4 md:px-5 py-2 cursor-pointer border-none outline-none transition-all duration-150 ${
                  tab === t
                    ? "bg-ink text-ivory"
                    : "bg-transparent text-slate"
                } ${t === "senado" ? "border-r border-border-default" : ""}`}
              >
                {t === "senado" ? "Senado (103 curules)" : "Cámara (183 curules)"}
              </button>
            ))}
          </div>
        </div>

        {tab === "senado" && (
          <div role="tabpanel" className="pl-0 md:pl-12 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12">
            <div>
              <SenateSemicircle data={SENATE} spectrum={SPECTRUM} totalSeats={103} label="SENADO" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[6px] gap-x-8 mt-5">
                {SENATE.map((p) => (
                  <div key={p.party} className="flex items-center gap-2 text-[11px]">
                    <span className="w-[10px] h-[10px] rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                    <span className="font-mono font-semibold text-ink mr-1">{p.seats}</span>
                    <span className="text-slate truncate">{p.party}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="table-responsive">
              <div className="border border-border-default rounded-sm overflow-hidden min-w-[400px]">
                <table className="w-full border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-soft">
                      {["Partido", "Votos", "%", "Curules"].map((h, i) => (
                        <th
                          key={h}
                          scope="col"
                          className={`px-3 md:px-[14px] py-[10px] ${i === 0 ? "text-left" : "text-right"} font-mono text-[9px] tracking-[0.1em] uppercase text-slate font-medium border-b border-border-default`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SENATE.map((p, i) => (
                      <tr
                        key={p.party}
                        onClick={() => setHighlightedParty(highlightedParty === p.party ? null : p.party)}
                        className={`cursor-pointer transition-all duration-150 hover:opacity-80 ${
                          highlightedParty === p.party
                            ? "opacity-100"
                            : i % 2 === 0
                            ? "bg-transparent"
                            : "bg-black/[0.02]"
                        } border-b border-border-default`}
                        style={highlightedParty === p.party ? { backgroundColor: `${p.color}15` } : undefined}
                      >
                        <td className="px-3 md:px-[14px] py-[10px]">
                          <div className="flex items-center gap-[7px]">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                            <span>{p.party}</span>
                          </div>
                        </td>
                        <td className="px-3 md:px-[14px] py-[10px] text-right font-mono text-slate">
                          {p.votes > 0 ? p.votes.toLocaleString("es-CO") : "\u2014"}
                        </td>
                        <td className="px-3 md:px-[14px] py-[10px] text-right font-mono">{p.pct}</td>
                        <td className="px-3 md:px-[14px] py-[10px] text-right font-mono font-bold" style={{ color: p.color }}>{p.seats}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-ink">
                      <td className="px-3 md:px-[14px] py-[10px] font-semibold">Total General</td>
                      <td className="px-3 md:px-[14px] py-[10px] text-right font-mono font-semibold">19,423,187</td>
                      <td className="px-3 md:px-[14px] py-[10px] text-right font-mono font-semibold">100%</td>
                      <td className="px-3 md:px-[14px] py-[10px] text-right font-mono font-bold text-ink">103</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-mono text-[10px] text-slate mt-2.5">
                Votos en blanco: 616,998 (3.17% de los votos válidos)
              </p>
            </div>
          </div>
        )}

        {tab === "camara" && (
          <div role="tabpanel" className="pl-0 md:pl-12">
            <div className="p-4 border border-border-default rounded-sm bg-soft text-xs md:text-[13px] text-slate mb-5">
              La Cámara disminuyó de 188 (2022) a <strong className="text-ink">183 curules</strong> para el periodo 2026&ndash;2030 por la supresión de las 5 curules transitorias de paz del partido Comunes al expirar las garantías del Acuerdo de La Habana.
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12">
              <div>
                <SenateSemicircle data={CAMARA} spectrum={CAMARA_SPECTRUM} totalSeats={183} label="CÁMARA" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[6px] gap-x-8 mt-5">
                  {CAMARA.map((p) => (
                    <div key={p.party} className="flex items-center gap-2 text-[11px]">
                      <span className="w-[10px] h-[10px] rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      <span className="font-mono font-semibold text-ink mr-1">{p.seats}</span>
                      <span className="text-slate truncate">{p.party}</span>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-[10px] text-slate mt-3">
                  * Datos de votación basados en el preconteo — no son definitivos.
                </p>
              </div>
              <div className="table-responsive">
                <div className="border border-border-default rounded-sm overflow-hidden min-w-[400px]">
                  <table className="w-full border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-soft">
                        {["Partido / Coalición", "Votos", "%", "Curules"].map((h, i) => (
                          <th
                            key={h}
                            scope="col"
                            className={`px-3 md:px-[14px] py-[10px] ${i === 0 ? "text-left" : "text-right"} font-mono text-[9px] tracking-[0.1em] uppercase text-slate font-medium border-b border-border-default`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CAMARA.map((p, i) => (
                        <tr
                          key={p.party}
                          onClick={() => setHighlightedParty(highlightedParty === p.party ? null : p.party)}
                          className={`cursor-pointer transition-all duration-150 hover:opacity-80 ${
                            highlightedParty === p.party
                              ? "opacity-100"
                              : i % 2 === 0
                              ? "bg-transparent"
                              : "bg-black/[0.02]"
                          } border-b border-border-default`}
                          style={highlightedParty === p.party ? { backgroundColor: `${p.color}15` } : undefined}
                        >
                          <td className="px-3 md:px-[14px] py-[10px]">
                            <div className="flex items-center gap-[7px]">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                              <span>{p.party}</span>
                            </div>
                          </td>
                          <td className="px-3 md:px-[14px] py-[10px] text-right font-mono text-slate">
                            {p.votes > 0 ? p.votes.toLocaleString("es-CO") : "\u2014"}
                          </td>
                          <td className="px-3 md:px-[14px] py-[10px] text-right font-mono">{p.pct}</td>
                          <td className="px-3 md:px-[14px] py-[10px] text-right font-mono font-bold" style={{ color: p.color }}>{p.seats}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-ink">
                        <td className="px-3 md:px-[14px] py-[10px] font-semibold">Total Cámara</td>
                        <td className="px-3 md:px-[14px] py-[10px] text-right font-mono font-semibold">{CAMARA_TOTAL_VOTES.toLocaleString("es-CO")}</td>
                        <td className="px-3 md:px-[14px] py-[10px] text-right font-mono font-semibold">100%</td>
                        <td className="px-3 md:px-[14px] py-[10px] text-right font-mono font-bold text-ink">183</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="font-mono text-[10px] text-slate mt-2.5">
                  Votos de listas nacionales y departamentales. CITREP y minorías corresponden a circunscripciones especiales.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pl-0 md:pl-12 mt-10">
          <div className="text-xs md:text-[13px] text-slate leading-[1.8] max-w-[900px]">
            La foto institucional esconde la verdadera correlación de fuerzas. Sumadas, las bancadas de derecha y centroderecha (Centro Democrático, Conservador, Cambio Radical, Salvación Nacional) superan ampliamente a la oposición, mientras el bloque bisagra (Liberal, La U, &iexcl;Ahora Colombia!) queda como árbitro de cada votación. Ser la primera minoría en un Congreso fragmentado significa tener la vocería.
          </div>
        </div>
      </div>
    </section>
  );
}
