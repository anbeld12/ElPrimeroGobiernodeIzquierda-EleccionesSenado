export function Footer() {
  return (
    <footer className="section-container py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      <div className="text-center md:text-left">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate mb-1">Fuentes Primarias</p>
        <p className="text-[11px] text-slate">Registraduría Nacional del Estado Civil · Consejo Nacional Electoral</p>
      </div>
      <div className="text-center md:text-right">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate mb-1">Materia</p>
        <p className="text-[11px] text-slate">BOG-2029789-1-2026-01 · Elecciones Congreso · 08.03.2026</p>
      </div>
    </footer>
  );
}
