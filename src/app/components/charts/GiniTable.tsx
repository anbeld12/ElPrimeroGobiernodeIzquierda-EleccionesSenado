import { C } from "../../constants";
import { GINI } from "../../../data/gini";

export function GiniTable() {
  return (
    <div className="border border-border-default rounded-sm overflow-hidden">
      <div className="px-3 md:px-4 py-[10px] border-b border-border-default bg-soft">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate">
          Índice de Gini — Concentración territorial del voto
        </p>
      </div>
      <div className="table-responsive">
        <table className="w-full border-collapse text-xs min-w-[350px]">
          <thead>
            <tr className="bg-soft/50">
              {["Colectividad", "Gini", "Concentración"].map((h) => (
                <th key={h} scope="col" className={`px-3 md:px-[14px] py-2 ${h === "Gini" ? "text-center" : "text-left"} font-mono text-[8px] tracking-[0.1em] uppercase text-slate font-medium border-b border-border-default`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GINI.map((g) => (
              <tr key={g.label} className="border-b border-border-default">
                <td className="px-3 md:px-[14px] py-[10px] text-[11px] text-ink">{g.label}</td>
                <td className="px-3 md:px-[14px] py-[10px] text-center">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-[40px] h-[6px] bg-soft rounded-sm overflow-hidden shrink-0">
                      <div className="h-full rounded-sm" style={{ width: `${parseFloat(g.gini) * 100}%`, backgroundColor: g.color }} />
                    </div>
                    <span className="font-mono font-bold text-xs md:text-[13px] text-ink">{g.gini}</span>
                  </div>
                </td>
                <td className="px-3 md:px-[14px] py-[10px] text-[10px] text-slate">
                  {parseFloat(g.gini) >= 0.85 ? "Alta" : "Moderada-alta"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-3 md:px-[14px] py-2 bg-soft text-[10px] text-slate">
        Coeficiente de Gini como proxy de concentración geográfica del voto (0 = dispersión total · 1 = concentración absoluta)
      </div>
    </div>
  );
}
