import { useRef, useEffect } from "react";

interface Props {
  traces: any[];
  layout: any;
  config?: any;
  onClick?: (data: any) => void;
}

export function PactoScatterPlot({ traces, layout, config = {}, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const plotRef = useRef<any>(null);
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    let cancelled = false;
    import("plotly.js-dist-min").then((mod) => {
      if (cancelled || !ref.current) return;
      const Plotly = mod.default || mod;
      plotRef.current = Plotly;

      Plotly.newPlot(ref.current, traces, layout, {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false,
        ...config,
      });

      function handleClick(data: any) {
        onClickRef.current?.(data);
      }
      ref.current!.on("plotly_click", handleClick);

      return () => {
        if (ref.current) {
          ref.current.removeListener("plotly_click", handleClick);
        }
      };
    });
    return () => {
      cancelled = true;
      if (plotRef.current && ref.current) {
        plotRef.current.purge(ref.current);
        plotRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!plotRef.current || !ref.current) return;
    plotRef.current.react(ref.current, traces, layout);
  }, [traces, layout]);

  useEffect(() => {
    if (!plotRef.current || !ref.current) return;
    const el = ref.current;
    const observer = new ResizeObserver(() => {
      plotRef.current?.Plots?.resize(el);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="h-full w-full min-h-[340px]" />;
}
