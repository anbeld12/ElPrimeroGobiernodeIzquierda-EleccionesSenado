import { KpiCard } from "../ui/KpiCard";

export function HeroSection() {
  return (
    <section id="hero" className="section-container py-10 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 md:gap-16 items-start">
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Periodismo de Datos", "Colombia Legislativa"].map((badge) => (
              <span
                key={badge}
                className="font-mono text-[10px] tracking-[0.12em] uppercase px-[10px] py-[4px] border border-border-default text-slate"
              >
                {badge}
              </span>
            ))}
          </div>
          <h1 className="font-editorial text-[28px] md:text-[34px] lg:text-[42px] font-medium leading-[1.2] tracking-[-0.01em] text-ink mb-5">
            La Fragmentación del Mandato: El Ascenso del Pacto Histórico y la Resistencia Conservadora en el Congreso 2026
          </h1>
          <p className="text-sm md:text-[15px] leading-[1.7] text-slate max-w-[540px] mb-7">
            Análisis territorial de los comicios del 8 de marzo de 2026 frente al balance histórico de 2022: un Congreso fragmentado ante la victoria de la derecha en el Ejecutivo. Datos validados por la Registraduría Nacional del Estado Civil y el Consejo Nacional Electoral.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-slate font-mono">
            <span>08 MAR 2026</span>
            <span className="hidden sm:inline text-border-default">|</span>
            <span>Escrutinio Definitivo · 99.997% de coincidencia matemática</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <KpiCard label="Censo Electoral Nacional" value="41,287,084" sub="Ciudadanos habilitados para votar" delta="+6.34% vs. censo 2022 (38,819,901)" up={true} />
          <KpiCard label="Votación Total — Senado" value="20,900,614" sub="Sufragantes · 50.62% de Participación" delta="−4.38 pp vs. 2022 (54.02%)" up={false} />
          <KpiCard label="Abstención General" value="20,386,470" sub="Ciudadanos no votaron · 49.38%" delta="+4.38 pp vs. 2022" up={false} />
          <KpiCard label="Votos Válidos" value="19,423,187" sub="93.08% de la votación total" delta="−1.15 pp vs. 2022 (95.93%)" up={false} />
        </div>
      </div>
    </section>
  );
}
