import { C } from "../../constants";
import { SectionNum } from "../ui/SectionNum";

const camps = [
  { label: "Bancada de Oposición", seats: 28, detail: "PH (25) + Indígenas (2) + Estatuto Oposición (1)", note: "Liderada por Iván Cepeda Castro", color: C.ph, bg: "rgba(109,40,217,0.04)" },
  { label: "Bloque Bisagra / Independiente", seats: 33, detail: "Conservador (10) + Liberal (13) + Alianza por Colombia (10) + Dignidad", note: "Árbitro de la gobernabilidad", color: C.alianza, bg: "rgba(2,132,199,0.04)" },
  { label: "Bancada Afín al Gobierno", seats: 42, detail: "CD (17) + La U (9) + CR-ALMA (7) + SN (4) + &iexcl;Ahora Colombia! (5)", note: "De la Espriella — sin mayoría absoluta (52 requeridas)", color: C.cd, bg: "rgba(153,27,27,0.04)" },
];

export function GobernabilidadSection() {
  return (
    <section id="gobernabilidad" className="bg-soft">
      <div className="section-container py-10 md:py-16">
        <div className="flex items-baseline mb-1.5">
          <SectionNum n="§ 07" />
          <h2 className="font-editorial text-xl md:text-[26px] font-medium text-ink">
            Equilibrio del Congreso frente al Ejecutivo 2026&ndash;2030
          </h2>
        </div>
        <p className="text-xs md:text-[13px] text-slate mb-10 pl-0 md:pl-12">
          Mapa de fuerzas en el Senado de la República · 103 curules · Periodo 2026&ndash;2030
        </p>

        <div className="pl-0 md:pl-12 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { role: "Presidente Electo", name: "Abelardo de la Espriella", party: "Defensores de la Patria", pct: "49.66%", votes: "12,959,542", color: C.cd },
            { role: "Oposición — Estatuto Constitucional", name: "Iván Cepeda Castro", party: "Pacto Histórico · Senado (Estatuto de la Oposición)", pct: "48.70%", votes: "12,708,312", color: C.ph },
          ].map((p) => (
            <div key={p.name} className="p-5 md:p-6 border border-border-default rounded-sm bg-white">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate mb-2">{p.role}</p>
              <p className="font-editorial text-lg md:text-xl font-medium text-ink mb-1">{p.name}</p>
              <p className="text-xs md:text-[12px] text-slate mb-4">{p.party}</p>
              <p className="font-mono text-2xl md:text-[28px] font-bold" style={{ color: p.color }}>{p.pct}</p>
              <p className="text-[11px] text-slate">{p.votes} votos (segunda vuelta)</p>
            </div>
          ))}
        </div>

        <div className="pl-0 md:pl-12 grid grid-cols-1 md:grid-cols-3 gap-0 border border-border-default rounded-sm overflow-hidden">
          {camps.map((camp, i) => (
            <div
              key={camp.label}
              className="p-5 md:p-7 flex flex-col gap-3 md:border-r md:last:border-r-0"
              style={{ backgroundColor: camp.bg }}
            >
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase" style={{ color: camp.color }}>{camp.label}</p>
              <p className="font-mono text-4xl md:text-[52px] font-bold leading-none" style={{ color: camp.color }}>{camp.seats}</p>
              <p className="text-[11px] text-slate">curules en el Senado</p>
              <p className="text-xs md:text-[13px] text-ink leading-[1.5]">{camp.detail}</p>
              <p className="text-[11px] text-slate italic border-t border-border-default pt-3">{camp.note}</p>
            </div>
          ))}
        </div>

        <div className="mx-4 md:mx-0 mt-6 p-5 md:p-6 border border-border-default rounded-sm bg-white grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 md:gap-8 items-center">
          <p className="text-sm md:text-[14px] leading-[1.7] text-slate">
            <strong className="text-ink">Balance de gobernabilidad:</strong> De la Espriella se impone en la Presidencia pero asume sin control sobre el Capitolio. El bloque bisagra de{" "}
            <strong className="text-ink">33 senadores</strong> retiene la balanza de gobernabilidad en Colombia, condicionando cualquier agenda legislativa a intensas negociaciones regionales. La bancada del Pacto Histórico —consolidada como primera fuerza individual con 25 curules— operará como oposición estructurada bajo el marco constitucional del Estatuto de la Oposición.
          </p>
          <div className="text-center">
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate mb-1.5">Margen de victoria</p>
            <p className="font-mono text-3xl md:text-[32px] font-bold text-cd">+0.96pp</p>
            <p className="text-[11px] text-slate mt-1">251,230 votos · resultado más ajustado en la historia reciente</p>
          </div>
        </div>
      </div>
    </section>
  );
}
