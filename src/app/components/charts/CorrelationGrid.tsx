import { C } from "../../constants";

const CORRELATIONS = [
  { label: "Participación 2026", r: "+0.04", desc: "Crecimiento del PH vs. participación", color: "#64748B", dir: "neutro" },
  { label: "Aumento del voto total", r: "−0.02", desc: "Crecimiento del PH vs. nuevos votantes", color: "#94A3B8", dir: "neutro" },
  { label: "Verde–Centro Esperanza 2022", r: "−0.33", desc: "El PH creció menos donde el centro era fuerte", color: "#D97706", dir: "negativo" },
  { label: "Fuerza Ciudadana 2022", r: "+0.17", desc: "Absorción moderada del electorado de FC", color: "#0F766E", dir: "positivo" },
  { label: "% Pacto Histórico 2022", r: "−0.17", desc: "Creció más donde era débil, no en bastiones", color: "#6D28D9", dir: "negativo" },
];

export function CorrelationGrid() {
  return (
    <div className="border border-border-default rounded-sm overflow-hidden">
      <div className="px-3 md:px-4 py-[10px] border-b border-border-default bg-soft">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate">
          Correlaciones municipales del crecimiento del Pacto Histórico
        </p>
      </div>
      <div className="divide-y divide-border-default">
        {CORRELATIONS.map((c) => (
          <div key={c.label} className="px-3 md:px-4 py-3 md:py-[14px] flex items-center gap-3 md:gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] md:text-[12px] text-ink font-medium truncate">{c.label}</p>
              <p className="text-[10px] text-slate mt-0.5">{c.desc}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`font-mono text-sm md:text-base font-bold ${
                  c.dir === "positivo" ? "text-emerald-700" : c.dir === "negativo" ? "text-red-700" : "text-slate"
                }`}
              >
                r&thinsp;=&thinsp;{c.r}
              </span>
              <span
                className={`w-[6px] h-[6px] rounded-full ${
                  c.dir === "positivo" ? "bg-emerald-500" : c.dir === "negativo" ? "bg-red-500" : "bg-slate/40"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 md:px-4 py-2 bg-soft text-[10px] text-slate leading-[1.5]">
        Coeficientes de correlación de Pearson (r). El valor absoluto indica la fuerza de la asociación; el signo, su dirección.
      </div>
    </div>
  );
}
