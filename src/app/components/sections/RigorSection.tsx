export function RigorSection() {
  return (
    <section className="bg-dark">
      <div className="section-container py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-5">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-[6px] border border-white/25 text-white/60 shrink-0">
            RIGOR DE DATOS
          </span>
          <p className="text-xs md:text-[13px] leading-[1.7] text-white/70">
            Procesamiento de actas definitivas E-26 validadas con un{" "}
            <strong className="text-white">99.997% de coincidencia matemática</strong> entre preconteo y escrutinios definitivos. Análisis a nivel municipal y departamental. Fuentes:{" "}
            <strong className="text-white">Registraduría Nacional del Estado Civil</strong>,{" "}
            <strong className="text-white">Consejo Nacional Electoral</strong> y{" "}
            <strong className="text-white">DANE</strong>.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-[6px] border border-white/25 text-white/60 shrink-0">
            NOTA METODOLÓGICA
          </span>
          <p className="text-xs md:text-[13px] leading-[1.7] text-white/55">
            El análisis evalúa al{" "}
            <strong className="text-white/80">Pacto Histórico como partido unificado</strong> (fusión de Polo Democrático, Unión Patriótica y Partido Comunista Colombiano aprobada en septiembre de 2025), frente a las fuerzas tradicionales de centro y centroderecha y a los movimientos alternativos (Frente Amplio Unitario y Fuerza Ciudadana&ndash;Comunes).
          </p>
        </div>
      </div>
    </section>
  );
}
