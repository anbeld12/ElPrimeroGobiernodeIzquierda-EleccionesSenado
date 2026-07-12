import { C } from "../app/constants";

export interface ScatterPoint {
  dept: string;
  x: number;
  y: number;
  h: boolean;
}

export const SCATTER_DATA: ScatterPoint[] = [
  { dept: "Bogotá D.C.",      x: 18.4, y: 8.2,  h: false },
  { dept: "Antioquia",        x: 12.1, y: 3.1,  h: false },
  { dept: "Valle del Cauca",  x: 14.7, y: 7.4,  h: false },
  { dept: "Cundinamarca",     x: 16.2, y: 4.8,  h: false },
  { dept: "Atlántico",        x: 9.8,  y: 5.2,  h: false },
  { dept: "Bolívar",          x: 7.3,  y: 6.1,  h: false },
  { dept: "Cauca",            x: 8.1,  y: 12.7, h: true  },
  { dept: "Nariño",           x: 6.4,  y: 11.2, h: true  },
  { dept: "Meta",             x: 9.2,  y: 9.4,  h: true  },
  { dept: "Córdoba",          x: 5.6,  y: 4.3,  h: false },
  { dept: "Tolima",           x: 17.8, y: 3.9,  h: false },
  { dept: "Santander",        x: 19.4, y: 2.8,  h: false },
  { dept: "Nte. de Santander",x: 15.3, y: 5.6,  h: false },
  { dept: "Boyacá",           x: 20.1, y: 3.2,  h: false },
  { dept: "Huila",            x: 11.5, y: 6.8,  h: false },
  { dept: "Cesar",            x: 6.9,  y: 4.4,  h: false },
  { dept: "Chocó",            x: 3.2,  y: 15.3, h: true  },
  { dept: "Arauca",           x: 4.1,  y: 14.1, h: true  },
  { dept: "Putumayo",         x: 5.8,  y: 13.6, h: true  },
  { dept: "La Guajira",       x: 4.4,  y: 1.4,  h: false },
  { dept: "Sucre",            x: 8.7,  y: 5.7,  h: false },
  { dept: "Caldas",           x: 21.3, y: 2.1,  h: false },
  { dept: "Risaralda",        x: 22.6, y: 2.7,  h: false },
  { dept: "Caquetá",          x: 5.3,  y: 10.8, h: true  },
  { dept: "Guaviare",         x: 4.9,  y: 8.6,  h: true  },
  { dept: "Amazonas",         x: 7.1,  y: 3.1,  h: false },
  { dept: "San Andrés",       x: 13.8, y: 1.7,  h: false },
  { dept: "Vichada",          x: 2.8,  y: 0.8,  h: false },
];

export const CORRELATIONS = [
  { label: "Verde–Centro Esperanza 2022", r: "r = −0.33", color: C.conservador },
  { label: "Fuerza Ciudadana 2022",       r: "r = +0.17", color: C.cambio },
  { label: "% Pacto Histórico 2022",      r: "r = −0.17", color: C.ph },
  { label: "Crecimiento total de votos",  r: "r = −0.02", color: C.slate },
];
