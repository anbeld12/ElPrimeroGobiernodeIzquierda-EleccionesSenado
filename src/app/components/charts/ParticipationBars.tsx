import { C } from "../../constants";
import { PARTICIPATION } from "../../../data/participation";

export function ParticipationBars() {
  const minVal = 40;
  const maxVal = 68;

  return (
    <div className="border border-border-default rounded-sm overflow-hidden">
      <div className="px-3 md:px-4 py-[10px] border-b border-border-default bg-soft">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate">
          Participación por etapa electoral
        </p>
      </div>
      <div className="p-4 md:p-[16px_16px_20px]">
        {PARTICIPATION.map((entry) => {
          const barWidth = ((entry.value - minVal) / (maxVal - minVal)) * 100;
          return (
            <div key={entry.stage} className="flex items-center gap-2 mb-2.5">
              <span className="w-24 md:w-32 text-[10px] text-slate shrink-0 text-right leading-tight">{entry.stage}</span>
              <div className="flex-1 h-3.5 bg-soft rounded-sm overflow-hidden">
                <div className="h-full rounded-sm" style={{ width: `${barWidth}%`, backgroundColor: entry.fill }} />
              </div>
              <span className="font-mono text-[10px] text-ink w-10 shrink-0 text-right">{entry.value}%</span>
            </div>
          );
        })}
        <div className="flex justify-between pl-[7.5rem] md:pl-[9rem] mt-1">
          {[40, 50, 60, 68].map((v) => (
            <span key={v} className="font-mono text-[8px] text-slate">{v}%</span>
          ))}
        </div>
      </div>
    </div>
  );
}
