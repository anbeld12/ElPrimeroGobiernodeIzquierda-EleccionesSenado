export function MapaSkeleton() {
  return (
    <section className="bg-ivory">
      <div className="section-container py-10 md:py-16">
        <div className="flex items-baseline mb-1.5">
          <span className="font-mono text-[10px] text-slate tracking-[0.12em] mr-3.5">
            § 04b
          </span>
          <span className="font-editorial text-xl md:text-[26px] font-medium text-border-default">
            Geografía Electoral del Cambio
          </span>
        </div>
        <div
          className="h-[400px] md:h-[500px] border border-border-default rounded-sm flex items-center justify-center bg-soft font-mono text-[11px] text-slate mt-6 animate-pulse"
        >
          Cargando mapa territorial…
        </div>
      </div>
    </section>
  );
}
