import { C } from "../../constants";
import { COLLAPSE, THRESHOLD, SCALE_MAX, THRESHOLD_PCT } from "../../../data/collapse";

export function ThresholdBars() {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
        <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-slate">
          Umbral legal 3% = {THRESHOLD.toLocaleString("es-CO")} votos válidos
        </span>
      </div>

      {COLLAPSE.map((d) => {
        const barPct = Math.round((d.votes / SCALE_MAX) * 100);
        return (
          <div key={d.name} className="mb-5 md:mb-7">
            <div className="flex justify-between text-xs mb-4">
              <span className="font-medium">{d.name}</span>
              <span className="font-mono font-semibold text-red-700 flex items-center gap-2">
                {d.votes.toLocaleString("es-CO")} · {d.pct}
                <span className="inline-block font-mono text-[7px] tracking-[0.08em] px-[5px] py-[2px] bg-red-50 border border-red-200 text-red-600 rounded-sm">
                  BAJO UMBRAL 3%
                </span>
              </span>
            </div>
            <div className="relative h-8 bg-soft border border-border-default rounded-sm">
              <div className="absolute left-0 top-0 h-full rounded-sm bg-slate/40" style={{ width: `${barPct}%` }} />
              <div className="absolute top-[-7px] bottom-[-7px] w-[2px] bg-red-600" style={{ left: `${THRESHOLD_PCT}%` }}>
                <span className="absolute bottom-full left-1 mb-1 font-mono text-[9px] text-red-600">{"\u25B2"}</span>
              </div>
            </div>
            <div className="flex justify-between mt-[3px]">
              {[0, 200, 400, 582.695, 680].map((v) => (
                <span key={v} className={`font-mono text-[8px] ${v === 582.695 ? "text-red-600" : "text-slate"}`}>
                  {v === 0 ? "0" : v === 582.695 ? "582k" : `${v}k`}
                </span>
              ))}
            </div>
            <div className="mt-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-sm text-[11px] text-red-700">
              Pérdida de personería jurídica · Exclusión parlamentaria
            </div>
          </div>
        );
      })}
    </div>
  );
}
