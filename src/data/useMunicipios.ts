import { useState, useEffect, useMemo, useCallback } from "react";

export interface GeoProps {
  cod_dane: string;
  municipio: string;
  departamento: string;
  region: string;
  lat: number;
  lon: number;
  votos_2022: number;
  votos_2026: number;
  ganador_2022: string;
  ganador_2022_pct: number;
  ganador_2026: string;
  ganador_2026_pct: number;
  pacto_2022: number;
  pacto_2026: number;
  pct_pacto_2022: number;
  pct_pacto_2026: number;
  delta_pp: number;
  pct_vce_2022: number;
  pct_fc_2022: number;
  pct_fc_2026: number;
  crec_voto: number;
  izq_2026: string;
  izq_2026_pct: number;
  izq_det_2026: string;
  izq_tot_2026: number;
  concentracion?: number;
  partido_2022?: string;
  partido_2022_pct?: number;
  partido_2026?: string;
  partido_2026_pct?: number;
  pacto_rk_2022?: number;
  pacto_rk_2026?: number;
  censo_2026: number;
  votos_dep_2026: number;
  part_2026: number;
}

export interface DeptAgg {
  depto: string;
  ph: number;
  fa: number;
  fc: number;
  totalVotos: number;
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

  function parseIzqDet(det: string, votos: number): { fa: number; fc: number } {
    const faMatch = det.match(/Frente Amplio\s+([\d,]+)%/);
    const fcMatch = det.match(/Fuerza Ciudadana\s+([\d,]+)%/);
    const faPct = faMatch ? parseFloat(faMatch[1].replace(',', '.')) : 0;
    const fcPct = fcMatch ? parseFloat(fcMatch[1].replace(',', '.')) : 0;
    return {
      fa: Math.round((faPct / 100) * votos),
      fc: Math.round((fcPct / 100) * votos),
    };
  }

  const aggregateByDept = useMemo((): DeptAgg[] => {
    const depts: Record<string, DeptAgg> = {};
    features.forEach((f) => {
      const p = f.properties;
      if (!depts[p.departamento]) {
        depts[p.departamento] = { depto: p.departamento, ph: 0, fa: 0, fc: 0, totalVotos: 0 };
      }
      const d = depts[p.departamento];
      d.ph += p.pacto_2026 || 0;
      d.totalVotos += p.votos_2026 || 0;
      if (p.izq_det_2026) {
        const parsed = parseIzqDet(p.izq_det_2026, p.votos_2026 || 0);
        d.fa += parsed.fa;
        d.fc += parsed.fc;
      } else {
        const totalLeft = ((p.izq_tot_2026 || 0) / 100) * (p.votos_2026 || 0);
        d.fa += Math.round(Math.max(0, totalLeft - (p.pacto_2026 || 0)));
      }
    });
    return Object.values(depts).sort((a, b) => b.ph - a.ph);
  }, [features]);

  function buildLorenz(vals: number[]): LorenzPoint[] {
    const total = vals.reduce((s, v) => s + v, 0);
    const n = vals.length;
    if (n === 0 || total === 0) return [];
    const points: LorenzPoint[] = [];
    let cum = 0;
    for (let i = 0; i <= n; i++) {
      const popPct = i / n;
      if (i > 0) cum += vals[i - 1];
      points.push({
        pct: Math.round(popPct * 100),
        equidad: parseFloat(popPct.toFixed(4)),
        concentracion: total > 0 ? parseFloat((cum / total).toFixed(4)) : 0,
      });
    }
    return points;
  }

  function calcGini(points: LorenzPoint[]): number {
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
  }

  const computeLorenz = useMemo((): LorenzPoint[] => {
    const vals = features
      .filter((f) => (f.properties.pct_pacto_2026 || 0) > 0)
      .map((f) => f.properties.pacto_2026 || 0)
      .sort((a, b) => a - b);
    return buildLorenz(vals);
  }, [features]);

  const computeLorenz2022 = useMemo((): LorenzPoint[] => {
    const vals = features
      .filter((f) => (f.properties.pct_pacto_2022 || 0) > 0)
      .map((f) => f.properties.pacto_2022 || 0)
      .sort((a, b) => a - b);
    return buildLorenz(vals);
  }, [features]);

  const actualGini = useMemo(() => calcGini(computeLorenz), [computeLorenz]);
  const gini2022 = useMemo(() => calcGini(computeLorenz2022), [computeLorenz2022]);

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
    computeLorenz2022,
    actualGini,
    gini2022,
    getBoundsForDept,
  };
}
