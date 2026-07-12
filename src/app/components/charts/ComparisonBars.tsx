import { C } from "../../constants";

const rows = [
  { name: "Frente Amplio Unitario", v22: 580000, v26: 396042 },
  { name: "Fuerza Ciudadana – Comunes", v22: 420000, v26: 114722 },
  { name: "Comunes (curules paz)", v22: 10, v26: 0 },
];

const max = 620000;

export function ComparisonBars() {
  return (
    <div className="border border-border-default rounded-sm overflow-hidden mt-6">
      <div className="px-3 md:px-4 py-[10px] border-b border-border-default bg-soft">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate">
          Comparativa: Izquierda Alternativa 2022 vs. 2026
        </p>
      </div>
      <div className="p-4 md:p-[16px_16px_20px]">
        <div className="flex gap-4 mb-3.5">
          {[{ label: "2022 (aprox.)", color: "#94A3B8" }, { label: "2026", color: "#DC2626" }].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-slate">
              <span className="w-[10px] h-[10px] rounded-sm shrink-0" style={{ backgroundColor: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.name} className="mb-3.5">
            <p className="text-[10px] text-slate mb-1.5">{row.name}</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <div className="flex-1 h-[10px] bg-soft rounded-sm overflow-hidden">
                  <div className="h-full rounded-sm bg-slate/60" style={{ width: `${(row.v22 / max) * 100}%` }} />
                </div>
                <span className="font-mono text-[9px] text-slate w-auto min-w-[3rem] text-right shrink-0">
                  {row.v22 > 100 ? `${(row.v22 / 1000).toFixed(0)}k` : "\u2014"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex-1 h-[10px] bg-soft rounded-sm overflow-hidden">
                  <div className="h-full rounded-sm bg-red-600" style={{ width: `${(row.v26 / max) * 100}%` }} />
                </div>
                <span className="font-mono text-[9px] text-red-700 w-auto min-w-[3rem] text-right shrink-0">
                  {row.v26 > 0 ? `${(row.v26 / 1000).toFixed(0)}k` : "0"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
