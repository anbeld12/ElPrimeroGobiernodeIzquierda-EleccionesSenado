export function KpiCard({
  label,
  value,
  sub,
  delta,
  up,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
  up?: boolean;
}) {
  return (
    <div className="p-4 md:p-5 border border-border-default rounded-sm bg-white transition-shadow hover:shadow-sm">
      <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-slate mb-2">
        {label}
      </p>
      <p className="font-mono text-2xl md:text-[32px] font-semibold text-ink leading-none mb-1">
        {value}
      </p>
      {sub && (
        <p className="font-sans text-xs md:text-[13px] text-slate mb-1">
          {sub}
        </p>
      )}
      {delta && (
        <p className={`font-mono text-[11px] ${up ? "text-green-700" : "text-red-700"}`}>
          {delta}
        </p>
      )}
    </div>
  );
}
