import { useState, useEffect, useMemo, useCallback } from "react";

export interface GeoProps {
  cod_dane: string;
  municipio: string;
  departamento: string;
  lat: number;
  lon: number;
  votos_2022: number;
  votos_2026: number;
  ganador_2022: string;
  ganador_2026: string;
  pacto_2022: number;
  pacto_2026: number;
  pct_pacto_2022: number;
  pct_pacto_2026: number;
  delta_pp: number;
  izq_2026: string;
  izq_2026_pct: number;
  izq_det_2026: string;
  izq_tot_2026: number;
  concentracion?: number;
  partido_2022?: string;
  partido_2026?: string;
  pacto_rk_2022?: number;
  pacto_rk_2026?: number;
}

export interface DeptAgg {
  depto: string;
  ph: number;
  fa: number;
}

export interface LorenzPoint {
  pct: number;
  equidad: number;
  concentracion: number;
}

interface GeoJSONFeature {
  type: "Feature";
  properties: GeoProps;
  geometry: any;
}

interface GeoJSONData {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export function useMunicipios() {
  const [raw, setRaw] = useState<GeoJSONData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("./municipios.json")
      .then((mod) => {
        if (!cancelled) {
          setRaw((mod.default || mod) as GeoJSONData);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  const features = useMemo(() => {
    if (!raw) return [];
    return raw.features.filter((f) => f.properties.lat != null);
  }, [raw]);

  const totals = useMemo(() => {
    const t = { 2022: 0, 2026: 0 };
    features.forEach((f) => {
      t[2022] += f.properties.pacto_2022 || 0;
      t[2026] += f.properties.pacto_2026 || 0;
    });
    return t;
  }, [features]);

  const maxVotes = useMemo(() => {
    let max = 0;
    features.forEach((f) => {
      max = Math.max(max, f.properties.pacto_2022 || 0, f.properties.pacto_2026 || 0);
    });
    return max;
  }, [features]);

  const aggregateByDept = useMemo((): DeptAgg[] => {
    const depts: Record<string, DeptAgg> = {};
    features.forEach((f) => {
      const p = f.properties;
      if (!depts[p.departamento]) {
        depts[p.departamento] = { depto: p.departamento, ph: 0, fa: 0 };
      }
      depts[p.departamento].ph += p.pacto_2026 || 0;
      const totalLeft = ((p.izq_tot_2026 || 0) / 100) * (p.votos_2026 || 0);
      depts[p.departamento].fa += Math.round(Math.max(0, totalLeft - (p.pacto_2026 || 0)));
    });
    return Object.values(depts).sort((a, b) => b.ph - a.ph);
  }, [features]);

  const computeLorenz = useMemo((): LorenzPoint[] => {
    const vals = features
      .filter((f) => (f.properties.pct_pacto_2026 || 0) > 0)
      .map((f) => f.properties.pacto_2026 || 0)
      .sort((a, b) => a - b);

    const totalPH = vals.reduce((s, v) => s + v, 0);
    const n = vals.length;
    if (n === 0 || totalPH === 0) return [];

    const points: LorenzPoint[] = [];
    let cumPH = 0;
    for (let i = 0; i <= n; i++) {
      const popPct = i / n;
      if (i > 0) cumPH += vals[i - 1];
      points.push({
        pct: Math.round(popPct * 100),
        equidad: parseFloat(popPct.toFixed(4)),
        concentracion: totalPH > 0 ? parseFloat((cumPH / totalPH).toFixed(4)) : 0,
      });
    }
    return points;
  }, [features]);

  const actualGini = useMemo((): number => {
    const points = computeLorenz;
    if (points.length < 2) return 0;
    let area = 0;
    for (let i = 1; i < points.length; i++) {
      const x0 = points[i - 1].pct / 100;
      const x1 = points[i].pct / 100;
      const y0 = points[i - 1].concentracion;
      const y1 = points[i].concentracion;
      area += (x1 - x0) * (y0 + y1) / 2;
    }
    return parseFloat((1 - 2 * area).toFixed(4));
  }, [computeLorenz]);

  const getBoundsForDept = useCallback(
    (depto: string): [[number, number], [number, number]] | null => {
      const deptFeatures = features.filter((f) => f.properties.departamento === depto);
      if (deptFeatures.length === 0) return null;

      let minLat = 90, maxLat = -90, minLon = 180, maxLon = -180;
      deptFeatures.forEach((f) => {
        const p = f.properties;
        if (p.lat != null && p.lon != null) {
          minLat = Math.min(minLat, p.lat);
          maxLat = Math.max(maxLat, p.lat);
          minLon = Math.min(minLon, p.lon);
          maxLon = Math.max(maxLon, p.lon);
        }
      });
      return [
        [minLat, minLon],
        [maxLat, maxLon],
      ] as [[number, number], [number, number]];
    },
    [features]
  );

  return {
    data: raw,
    loading,
    error,
    features,
    totals,
    maxVotes,
    aggregateByDept,
    computeLorenz,
    actualGini,
    getBoundsForDept,
  };
}
