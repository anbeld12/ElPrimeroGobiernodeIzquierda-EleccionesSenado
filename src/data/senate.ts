import { C } from "../app/constants";

export const SENATE = [
  { party: "Pacto Histórico", votes: 4413636, pct: "22.72%", seats: 25, color: C.ph },
  { party: "Centro Democrático", votes: 3035715, pct: "15.62%", seats: 17, color: C.cd },
  { party: "Partido Liberal", votes: 2275182, pct: "11.71%", seats: 13, color: C.liberal },
  { party: "Alianza por Colombia", votes: 1904154, pct: "9.80%", seats: 10, color: C.alianza },
  { party: "Partido Conservador", votes: 1863663, pct: "9.59%", seats: 10, color: C.conservador },
  { party: "Partido de la U", votes: 1565786, pct: "8.06%", seats: 9, color: C.laU },
  { party: "Cambio Radical – ALMA", votes: 1248021, pct: "6.42%", seats: 7, color: C.cambio },
  { party: "¡Ahora Colombia!", votes: 900606, pct: "4.63%", seats: 5, color: C.ahora },
  { party: "Salvación Nacional", votes: 705924, pct: "3.63%", seats: 4, color: C.salvacion },
  { party: "Circunscripción Indígena", votes: 0, pct: "—", seats: 2, color: C.indigenas },
  { party: "Estatuto de la Oposición", votes: 0, pct: "—", seats: 1, color: C.oposicion },
];

export const CAMARA = [
  { party: "Pacto Histórico", votes: 4255774, pct: "22.43%", seats: 37, color: C.ph, areas: "Bogotá (8), Valle del Cauca (6), Cundinamarca (3)" },
  { party: "Centro Democrático", votes: 3089213, pct: "16.28%", seats: 25, color: C.cd, areas: "Antioquia (7), Bogotá (7), Cundinamarca (1)" },
  { party: "Partido Liberal", votes: 2258940, pct: "11.91%", seats: 25, color: C.liberal, areas: "Antioquia (2), Atlántico (2), Amazonas (1)" },
  { party: "Partido Conservador", votes: 2038767, pct: "10.74%", seats: 19, color: C.conservador, areas: "Bolívar (3), Tolima (3), Caldas (1)" },
  { party: "Partido de la U", votes: 1319140, pct: "6.95%", seats: 12, color: C.laU, areas: "Valle del Cauca (2), Guainía (1), Vichada (1)" },
  { party: "Cambio Radical – ALMA", votes: 1183694, pct: "6.24%", seats: 12, color: C.cambio, areas: "Atlántico (3), Arauca (1), Magdalena (1)" },
  { party: "CITREP (Paz)", votes: 0, pct: "—", seats: 16, color: C.citrep, areas: "Zonas rurales y priorizadas" },
  { party: "Otros / Minorías", votes: 0, pct: "—", seats: 37, color: C.minorias, areas: "Afrodescendientes, raizales, indígenas, internacional" },
];

export const CAMARA_SPECTRUM = [
  { color: C.citrep, seats: 16 },
  { color: C.minorias, seats: 37 },
  { color: C.ph, seats: 37 },
  { color: C.liberal, seats: 25 },
  { color: C.laU, seats: 12 },
  { color: C.cambio, seats: 12 },
  { color: C.conservador, seats: 19 },
  { color: C.cd, seats: 25 },
];

export const SPECTRUM = [
  { color: C.oposicion, seats: 1 },
  { color: C.indigenas, seats: 2 },
  { color: C.ph, seats: 25 },
  { color: C.ahora, seats: 5 },
  { color: C.salvacion, seats: 4 },
  { color: C.liberal, seats: 13 },
  { color: C.laU, seats: 9 },
  { color: C.cambio, seats: 7 },
  { color: C.alianza, seats: 10 },
  { color: C.conservador, seats: 10 },
  { color: C.cd, seats: 17 },
];
