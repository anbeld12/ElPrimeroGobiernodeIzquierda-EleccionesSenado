export const C = {
  ph: "#6D28D9",
  cd: "#991B1B",
  liberal: "#1E3A8A",
  alianza: "#D97706",
  conservador: "#15803D",
  laU: "#64748B",
  cambio: "#0F766E",
  ahora: "#7C3AED",
  salvacion: "#C2410C",
  indigenas: "#065F46",
  oposicion: "#374151",
  ink: "#0F172A",
  slate: "#334155",
  ivory: "#FAF9F6",
  border: "#E2E8F0",
  dark: "#1E293B",
  soft: "#F1F5F9",
  white: "#FFFFFF",
};

export const fmtN = (v: number | null | undefined): string =>
  v == null ? "—" : Math.round(v).toLocaleString("es-CO");

export const fmtP = (v: number | null | undefined): string =>
  v == null ? "—" : v.toFixed(1).replace(".", ",") + "%";
