export function LimitacionesSection() {
  return (
    <section className="bg-dark">
      <div className="section-container py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-[6px] border border-white/25 text-white/60 shrink-0">
            LIMITACIONES
          </span>
          <div className="text-xs md:text-[13px] leading-[1.7] text-white/65 space-y-4 max-w-[800px]">
            <p>
              El análisis presentado opera con datos agregados por municipio. Las correlaciones y los flujos que se muestran son territoriales, no individuales: que el Pacto creciera donde Fuerza Ciudadana era fuerte no prueba que sus votantes se pasaran al Pacto.
            </p>
            <p>
              No fue posible obtener el censo por municipio de 2022 comparable con el DIVIPOLE 2026, por lo que la participación se analiza solo a nivel nacional. La comparación interanual del voto se hace bloque contra bloque, no lista contra lista: en 2022 el Pacto fue una coalición de perímetro amplio; en 2026, un partido unificado con socios distintos. La clasificación por bloques es una decisión editorial documentada, pero clasificaciones alternativas producirían magnitudes distintas.
            </p>
            <p>
              El análisis cubre dos elecciones (2022 y 2026), insuficientes para afirmar tendencias de largo plazo. No se evaluó la dimensión de género &mdash;participación diferencial de mujeres y hombres, representación femenina electa ni efecto de la paridad&mdash; ni las redes de poder local organizadas en torno a clanes y maquinarias familiares, cuya identificación exige un análisis de otra naturaleza. Quedan fuera de los mapas el voto exterior (sin representación geométrica) y el municipio de Nuevo Belén de Bajirá, creado después de 2022.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
