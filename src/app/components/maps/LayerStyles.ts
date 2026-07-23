import { C } from "../../constants";

export const COLORES_BLOQUE: Record<string, string> = {
  izquierda: "#c0392b",
  centro: "#e67e22",
  derecha: "#2e5aac",
  cristianos: "#7d3c98",
  etnicos: "#1e8449",
  sin_clasificar: "#95a5a6",
};

export const COLORES_PARTIDO: Record<string, string> = {
  "Pacto Histórico": "#6c3483",
  "Frente Amplio": "#e91e63",
  "Fuerza Ciudadana": "#f1c40f",
  Comunes: "#b03a2e",
  "Estamos Listas": "#f1948a",
  Liberal: "#c0392b",
  Conservador: "#5dade2",
  "Centro Democrático": "#1a5276",
  "La U": "#e67e22",
  "Cambio Radical": "#148f77",
  "Verde–Centro Esperanza": "#52be80",
  "Alianza por Colombia": "#5c6bc0",
  "Ahora Colombia": "#935116",
  Otros: "#d5d8dc",
};

const SIN_DATO = "#eeeeee";

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.match(/\w\w/g);
  if (!m) return [0, 0, 0];
  return m.map((h) => parseInt(h, 16)) as [number, number, number];
}

function escala(colores: string[], v0: number, v1: number) {
  const rgb = colores.map(hexToRgb);
  return (v: number | null | undefined): string => {
    if (v == null || isNaN(v)) return SIN_DATO;
    const t = Math.max(0, Math.min(1, (v - v0) / (v1 - v0)));
    const i = Math.min(Math.floor(t * (rgb.length - 1)), rgb.length - 2);
    const f = t * (rgb.length - 1) - i;
    const c = rgb[i].map((a, k) => Math.round(a + f * (rgb[i + 1][k] - a))) as [number, number, number];
    return "#" + c.map((x) => x.toString(16).padStart(2, "0")).join("");
  };
}

export const PAL_PCT = ["#fcfbfd", "#807dba", "#3f007d"];
export const PAL_DELTA = ["#e66101", "#f7f7f7", "#5e3c99"];
export const PAL_PART = ["#e0f2f1", "#00695c"];

export const escPct = escala(PAL_PCT, 0, 60);
export const escDelta = escala(PAL_DELTA, -25, 25);
export const escPart = escala(PAL_PART, 20, 75);

export function getFillColor(capa: string, props: any): string {
  switch (capa) {
    case "ganador_2022":
    case "ganador_2026": {
      const key = capa as "ganador_2022" | "ganador_2026";
      return COLORES_BLOQUE[props[key]] || SIN_DATO;
    }
    case "partido_2022":
    case "partido_2026": {
      const key = capa as "partido_2022" | "partido_2026";
      return COLORES_PARTIDO[props[key]] || SIN_DATO;
    }
    case "izq_2026":
      return COLORES_PARTIDO[props.izq_2026] || SIN_DATO;
    case "pct_pacto_2026":
      return escPct(props.pct_pacto_2026);
    case "delta_pp":
      return escDelta(props.delta_pp);
    case "part_2026":
      return escPart(props.part_2026);
    default:
      return SIN_DATO;
  }
}

export function getLegendTitle(capa: string): string {
  const titles: Record<string, string> = {
    ganador_2022: "Bloque más votado 2022",
    ganador_2026: "Bloque más votado 2026",
    partido_2022: "Lista más votada 2022",
    partido_2026: "Lista más votada 2026",
    izq_2026: "1ª fuerza de la izquierda 2026",
    pct_pacto_2026: "% votos Pacto (Senado 2026)",
    delta_pp: "Cambio 2022→2026 (pp)",
    part_2026: "Participación electoral 2026",
  };
  return titles[capa] || capa;
}

export function getLegendType(capa: string): "categorica" | "continua" {
  const continuas = ["pct_pacto_2026", "delta_pp", "part_2026"];
  return continuas.includes(capa) ? "continua" : "categorica";
}
