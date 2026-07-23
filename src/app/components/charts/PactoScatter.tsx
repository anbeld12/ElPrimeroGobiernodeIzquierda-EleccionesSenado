import { useMemo, useState, useCallback, lazy, Suspense } from "react";
import { useIsMobile } from "../ui/use-mobile";
import { C } from "../../constants";
import { useMunicipiosData } from "../../../context/MunicipiosContext";
import { useFilters } from "../../../context/FilterContext";
import { REGION_COLORS, REGION_ORDER } from "../../../data/regions";

const ScatterPlot = lazy(() =>
  import("./PactoScatterPlot").then((m) => ({ default: m.PactoScatterPlot }))
);

function linReg(points: { x: number; y: number }[]) {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: 0 };
  const sx = points.reduce((s, p) => s + p.x, 0);
  const sy = points.reduce((s, p) => s + p.y, 0);
  const sxy = points.reduce((s, p) => s + p.x * p.y, 0);
  const sx2 = points.reduce((s, p) => s + p.x * p.x, 0);
  const denom = n * sx2 - sx * sx;
  if (Math.abs(denom) < 1e-10) return { slope: 0, intercept: 0 };
  const slope = (n * sxy - sx * sy) / denom;
  const intercept = (sy - slope * sx) / n;
  return { slope, intercept };
}

function calcR2(points: { x: number; y: number }[], slope: number, intercept: number) {
  const my = points.reduce((s, p) => s + p.y, 0) / points.length;
  const ssRes = points.reduce((s, p) => s + (p.y - (slope * p.x + intercept)) ** 2, 0);
  const ssTot = points.reduce((s, p) => s + (p.y - my) ** 2, 0);
  return ssTot === 0 ? 0 : 1 - ssRes / ssTot;
}

interface Point {
  x: number;
  y: number;
  municipio: string;
  depto: string;
  region: string;
}

interface RegionStats {
  count: number;
  meanY: number;
  medianY: number;
}

function fmtPct(v: number | null | undefined) {
  return v == null ? "—" : v.toFixed(1) + "%";
}

const THRESHOLD_PRESETS = [0, 5, 10, 20, 30];
const HOVER_TMPL = `<b>%{customdata[0]}</b><br>%{customdata[1]}<br>PH 2022: %{x:.1f}%<br>PH 2026: %{y:.1f}%<extra></extra>`;

export function PactoScatter() {
  const [mode, setMode] = useState<"region" | "correlacion">("region");
  const [hiddenRegions, setHiddenRegions] = useState<Set<string>>(new Set());
  const [legendTooltipRegion, setLegendTooltipRegion] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(0);
  const [comparison, setComparison] = useState(false);
  const [compRegions, setCompRegions] = useState<string[]>([]);

  const { features } = useMunicipiosData();
  const { selectedDepto, setSelectedDepto } = useFilters();
  const isMobile = useIsMobile();

  const allPoints: Point[] = useMemo(() => {
    const raw: Point[] = features
      .filter((f: any) => {
        const p = f.properties;
        return p.pct_pacto_2022 > 0 || p.pct_pacto_2026 > 0;
      })
      .map((f: any) => {
        const p = f.properties;
        return {
          x: p.pct_pacto_2022 ?? 0,
          y: p.pct_pacto_2026 ?? 0,
          municipio: p.municipio,
          depto: p.departamento,
          region: p.region || "Otra",
        };
      });
    return raw;
  }, [features]);

  const visiblePoints = useMemo(
    () => allPoints.filter((p) => !hiddenRegions.has(p.region) && p.y >= threshold),
    [allPoints, hiddenRegions, threshold]
  );

  const trend = useMemo(() => linReg(visiblePoints), [visiblePoints]);
  const r2 = useMemo(
    () => calcR2(visiblePoints, trend.slope, trend.intercept),
    [visiblePoints, trend]
  );

  const regionStats = useMemo(() => {
    const map: Record<string, RegionStats> = {};
    REGION_ORDER.forEach((r) => {
      const pts = allPoints.filter((p) => p.region === r);
      if (!pts.length) return;
      const meanY = pts.reduce((s, p) => s + p.y, 0) / pts.length;
      const sY = [...pts].sort((a, b) => a.y - b.y);
      map[r] = {
        count: pts.length,
        meanY,
        medianY: sY[Math.floor(sY.length / 2)].y,
      };
    });
    return map;
  }, [allPoints]);

  const toggleRegion = useCallback((r: string) => {
    setHiddenRegions((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  }, []);

  const toggleCompRegion = useCallback((r: string) => {
    setCompRegions((prev) => {
      if (prev.includes(r)) return prev.filter((x) => x !== r);
      if (prev.length >= 2) return [prev[1], r];
      return [...prev, r];
    });
  }, []);

  const compLines = useMemo(() => {
    if (compRegions.length < 2) return null;
    const [r1, r2] = compRegions;
    const pts1 = visiblePoints.filter((p) => p.region === r1);
    const pts2 = visiblePoints.filter((p) => p.region === r2);
    const t1 = linReg(pts1);
    const t2 = linReg(pts2);
    const r2_1 = pts1.length >= 2 ? calcR2(pts1, t1.slope, t1.intercept) : 0;
    const r2_2 = pts2.length >= 2 ? calcR2(pts2, t2.slope, t2.intercept) : 0;
    return {
      [r1]: {
        slope: t1.slope,
        intercept: t1.intercept,
        r2: r2_1,
        count: pts1.length,
        meanY: pts1.reduce((s, p) => s + p.y, 0) / pts1.length,
      },
      [r2]: {
        slope: t2.slope,
        intercept: t2.intercept,
        r2: r2_2,
        count: pts2.length,
        meanY: pts2.reduce((s, p) => s + p.y, 0) / pts2.length,
      },
    };
  }, [compRegions, visiblePoints]);

  const traces = useMemo(() => {
    const result: any[] = [];
    const trendX = [0, 80];
    const trendY = [
      trend.slope * trendX[0] + trend.intercept,
      trend.slope * trendX[1] + trend.intercept,
    ];

    if (comparison && compRegions.length >= 2) {
      const otherPts = visiblePoints.filter(
        (p) => !compRegions.includes(p.region)
      );
      if (otherPts.length > 0) {
        result.push({
          type: "scattergl",
          mode: "markers",
          name: "Otras regiones",
          x: otherPts.map((p) => p.x),
          y: otherPts.map((p) => p.y),
          marker: { color: "#D1D5DB", size: 3, opacity: 0.25 },
          hoverinfo: "none",
        });
      }
      compRegions.forEach((r) => {
        const pts = visiblePoints.filter((p) => p.region === r);
        const t = compLines?.[r];
        result.push({
          type: "scattergl",
          mode: "markers",
          name: r,
          x: pts.map((p) => p.x),
          y: pts.map((p) => p.y),
          marker: { color: REGION_COLORS[r], size: 5, opacity: 0.7 },
          customdata: pts.map((p) => [p.municipio, p.depto]),
          hovertemplate: HOVER_TMPL,
        });
        if (t) {
          result.push({
            type: "scattergl",
            mode: "lines",
            x: trendX,
            y: [t.slope * 0 + t.intercept, t.slope * 80 + t.intercept],
            line: { color: REGION_COLORS[r], width: 2 },
            hoverinfo: "none",
            showlegend: false,
          });
        }
      });
      return result;
    }

    if (mode === "region") {
      REGION_ORDER.filter((r) => !hiddenRegions.has(r)).forEach((r) => {
        const pts = visiblePoints.filter((p) => p.region === r);
        if (pts.length === 0) return;
        result.push({
          type: "scattergl",
          mode: "markers",
          name: r,
          x: pts.map((p) => p.x),
          y: pts.map((p) => p.y),
          marker: { color: REGION_COLORS[r], size: 4, opacity: 0.5 },
          customdata: pts.map((p) => [p.municipio, p.depto]),
          hovertemplate: HOVER_TMPL,
        });
      });
      result.push({
        type: "scattergl",
        mode: "lines",
        name: "Tendencia",
        x: trendX,
        y: trendY,
        line: { color: "#e67e22", width: 2 },
        hoverinfo: "none",
        showlegend: false,
      });
    } else {
      result.push({
        type: "scattergl",
        mode: "markers",
        name: "Municipios",
        x: visiblePoints.map((p) => p.x),
        y: visiblePoints.map((p) => p.y),
        marker: { color: C.ph, size: 4, opacity: 0.45 },
        customdata: visiblePoints.map((p) => [p.municipio, p.depto]),
        hovertemplate: HOVER_TMPL,
      });
      result.push({
        type: "scattergl",
        mode: "lines",
        x: trendX,
        y: trendY,
        line: { color: C.ph, width: 2, dash: "dash" },
        hoverinfo: "none",
        showlegend: false,
      });
    }

    return result;
  }, [visiblePoints, mode, hiddenRegions, comparison, compRegions, compLines, trend]);

  const layout = useMemo(
    () => ({
      xaxis: {
        title: {
          text: "% Pacto Histórico 2022",
          font: { size: isMobile ? 8 : 9, family: "Inter, sans-serif", color: "#334155" },
        },
        range: [0, 80] as [number, number],
        tickvals: [0, 20, 40, 60, 80],
        ticktext: ["0%", "20%", "40%", "60%", "80%"],
        gridcolor: "#E2E8F0",
        linecolor: "#E2E8F0",
        zeroline: false,
        tickfont: {
          size: isMobile ? 7 : 9,
          family: "Roboto Mono, monospace",
          color: "#334155",
        },
        automargin: true,
      },
      yaxis: {
        title: {
          text: "% Pacto Histórico 2026",
          font: { size: isMobile ? 8 : 9, family: "Inter, sans-serif", color: "#334155" },
        },
        range: [0, 80] as [number, number],
        tickvals: [0, 20, 40, 60, 80],
        ticktext: ["0%", "20%", "40%", "60%", "80%"],
        gridcolor: "#E2E8F0",
        linecolor: "#E2E8F0",
        zeroline: false,
        tickfont: {
          size: isMobile ? 7 : 9,
          family: "Roboto Mono, monospace",
          color: "#334155",
        },
        automargin: true,
      },
      autosize: true,
      margin: isMobile
        ? { t: 8, r: 8, b: 40, l: 40 }
        : { t: 8, r: 12, b: 36, l: 48 },
      paper_bgcolor: "#FAF9F6",
      plot_bgcolor: "#FAF9F6",
      hovermode: "closest",
      hoverlabel: {
        bgcolor: "#FFF",
        bordercolor: "#E2E8F0",
        font: { family: "Roboto Mono, monospace", size: 10, color: "#0F172A" },
      },
      dragmode: false as const,
      shapes: [{
        type: 'line',
        x0: 0, y0: 0,
        x1: 80, y1: 80,
        line: { color: '#94A3B8', width: 1, dash: 'dot' },
        label: {
          text: '2022 = 2026',
          font: { size: isMobile ? 7 : 9, family: 'Roboto Mono, monospace', color: '#94A3B8' },
          textposition: 'end',
        },
      }],
    }),
    [isMobile]
  );

  function handleClick(data: any) {
    const point = data.points?.[0];
    if (!point?.customdata) return;
    const depto = point.customdata[1];
    setSelectedDepto(depto === selectedDepto ? null : depto);
  }

  return (
    <div className="select-none">
      <div className={`flex items-center justify-between mb-3 flex-wrap ${isMobile ? "gap-1" : "gap-2"}`}>
        <p className={`font-mono tracking-[0.12em] uppercase text-slate ${isMobile ? "text-[8px]" : "text-[9px]"}`}>
          Correlación municipal del voto PH &mdash; 2022 vs 2026
        </p>
        <div className="flex gap-1" role="tablist">
          {(["region", "correlacion"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`font-mono tracking-[0.1em] uppercase border cursor-pointer transition-all duration-150 ${
                isMobile
                  ? "text-[8px] px-2 py-1"
                  : "text-[9px] px-3 py-1.5"
              } ${
                mode === m
                  ? "bg-ink text-ivory border-ink"
                  : "bg-transparent text-slate border-border-default hover:border-slate"
              }`}
            >
              {m === "region" ? "Por región" : "Correlación"}
            </button>
          ))}
        </div>
      </div>

      <div className={`flex items-center mb-3 flex-wrap ${isMobile ? "gap-1" : "gap-2"}`}>
        <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-slate/60">
          PH 2026 ≥
        </span>
        {THRESHOLD_PRESETS.map((v) => (
          <button
            key={v}
            onClick={() => setThreshold(v)}
            className={`font-mono border cursor-pointer transition-all duration-150 ${
              isMobile ? "text-[8px] px-1.5 py-0.5" : "text-[9px] px-2 py-1"
            } ${
              threshold === v
                ? "bg-ink text-ivory border-ink"
                : "bg-transparent text-slate border-border-default hover:border-slate"
            }`}
          >
            {v === 0 ? "Todo" : `>${v}%`}
          </button>
        ))}
        <span className={`font-mono text-slate/50 ml-auto ${isMobile ? "text-[8px]" : "text-[9px]"}`}>
          {visiblePoints.length} / {allPoints.length} municipios
        </span>
      </div>

      <div className="flex items-start justify-between gap-2 mb-3">
        <div className={`${isMobile ? "overflow-x-auto -mx-1 px-1 max-w-full scroll-x" : ""}`}>
          <div className={`flex items-center ${isMobile ? "gap-x-2 gap-y-0.5" : "flex-wrap gap-x-4 gap-y-1.5"}`}>
            {REGION_ORDER.map((r) => {
              const isHidden = hiddenRegions.has(r);
              const isCompSelected = compRegions.includes(r);
              const stats = regionStats[r];
              if (!stats) return null;
              return (
                <span
                  key={r}
                  className={`relative flex items-center cursor-pointer select-none ${isMobile ? "gap-1 text-[9px] whitespace-nowrap" : "gap-1.5 text-[10px]"}`}
                  onClick={() =>
                    comparison ? toggleCompRegion(r) : toggleRegion(r)
                  }
                  onMouseEnter={() => setLegendTooltipRegion(r)}
                  onMouseLeave={() => setLegendTooltipRegion(null)}
                  style={{
                    opacity: isHidden ? 0.35 : 1,
                    textDecoration: isHidden ? "line-through" : "none",
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{
                      backgroundColor: REGION_COLORS[r],
                      outline:
                        comparison && isCompSelected
                          ? `2px solid ${C.ink}`
                          : "none",
                      outlineOffset: 1,
                    }}
                  />
                  {r}
                  <span className={`font-mono text-slate/40 ${isMobile ? "text-[7px]" : "text-[8px]"}`}>
                    {stats.count}
                  </span>
                  {!isMobile && legendTooltipRegion === r && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: 4,
                        background: C.white,
                        border: `1px solid ${C.border}`,
                        padding: "6px 10px",
                        fontFamily: "Roboto Mono, monospace",
                        fontSize: 9,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        pointerEvents: "none",
                        zIndex: 10,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <p style={{ color: C.slate }}>
                        Media: {fmtPct(stats.meanY)} · Mediana:{" "}
                        {fmtPct(stats.medianY)}
                      </p>
                    </div>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => {
            setComparison(!comparison);
            if (!comparison) setCompRegions([]);
          }}
          className={`font-mono tracking-[0.1em] uppercase border cursor-pointer shrink-0 transition-all duration-150 ${
            isMobile ? "text-[7px] px-1.5 py-0.5" : "text-[8px] px-2 py-1"
          } ${
            comparison
              ? "bg-ph text-white border-ph"
              : "bg-transparent text-slate border-border-default hover:border-slate"
          }`}
        >
          Comparar
        </button>
      </div>

      {comparison && compRegions.length === 2 && compLines && (
        <div className={`mb-3 p-2.5 border border-border-default rounded-sm bg-soft/50 font-mono ${isMobile ? "flex-col gap-2 text-[9px]" : "flex gap-4 text-[10px]"}`}>
          {compRegions.map((r) => {
            const d = compLines[r];
            if (!d) return null;
            return (
              <div key={r} className="flex-1">
                <p style={{ fontWeight: 700, color: REGION_COLORS[r] }}>
                  {r}
                </p>
                <p className="text-slate">
                  n={d.count} · media {fmtPct(d.meanY)} · pendiente{" "}
                  {d.slope.toFixed(3)} · R² {(d.r2 * 100).toFixed(1)}%
                </p>
              </div>
            );
          })}
        </div>
      )}

      {mode === "correlacion" && !comparison && (
        <div className={`flex items-center mb-3 text-slate font-mono ${isMobile ? "gap-3 text-[9px] flex-wrap" : "gap-5 text-[10px]"}`}>
          <span>
            Pendiente:{" "}
            <strong className="text-ink">{trend.slope.toFixed(3)}</strong>
          </span>
          <span>
            R²:{" "}
            <strong className="text-ph">{(r2 * 100).toFixed(1)}%</strong>
          </span>
          <span>
            n = <strong className="text-ink">{visiblePoints.length}</strong>
          </span>
        </div>
      )}

      <div className={`w-full ${isMobile ? "h-[260px]" : "h-[340px]"}`}>
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center text-[11px] text-slate font-mono">
              Cargando gráfico…
            </div>
          }
        >
          <ScatterPlot
            traces={traces}
            layout={layout}
            onClick={handleClick}
          />
        </Suspense>
      </div>
    </div>
  );
}
