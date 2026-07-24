import { fmtN, fmtP } from "../../constants";

const ord = (v: number | null | undefined): string =>
  v == null ? "—" : v + "ª";

const cab = (p: any): string =>
  `<b>${p.municipio}</b> (${p.departamento})<br>`;

export function tooltipBloques(p: any, anio: string): string {
  const b = p["ganador_" + anio];
  if (!b) return cab(p) + `Sin datos ${anio}`;
  return (
    cab(p) +
    `Bloque ganador ${anio}: <b>${b}</b> con ${fmtP(p["ganador_" + anio + "_pct"])} del voto<br>` +
    (p["lid_" + anio] ? `Lideran el bloque: ${p["lid_" + anio]}` : "")
  );
}

export function tooltipPartidos(p: any, anio: string): string {
  if (!p["partido_" + anio]) return cab(p) + `Sin datos ${anio}`;
  const fila = (suf: string, nom: string) =>
    p["partido_" + anio + suf]
      ? `${nom} ${p["partido_" + anio + suf]} — ${fmtP(p["partido_" + anio + suf + "_pct"])}<br>`
      : "";
  return (
    cab(p) +
    `<u>Listas más votadas ${anio}</u><br>` +
    fila("", "1º") +
    fila("_2do", "2º") +
    fila("_3ro", "3º")
  );
}

export function tooltipIzquierda(p: any): string {
  return (
    cab(p) +
    `Izquierda 2026: <b>${fmtP(p.izq_tot_2026 ?? 0)}</b> del voto del municipio<br>` +
    (p.izq_det_2026 ?? "Sin votos de izquierda")
  );
}

export function tooltipPacto(p: any): string {
  const dv = (p.pacto_2026 ?? 0) - (p.pacto_2022 ?? 0);
  const signo = dv >= 0 ? "+" : "−";
  return (
    cab(p) +
    `<u>Pacto Histórico (Senado)</u><br>` +
    `2022: ${fmtN(p.pacto_2022)} votos (${fmtP(p.pct_pacto_2022)}) — ${ord(p.pacto_rk_2022)} lista<br>` +
    `2026: ${fmtN(p.pacto_2026)} votos (${fmtP(p.pct_pacto_2026)}) — ${ord(p.pacto_rk_2026)} lista<br>` +
    `Variación: ${p.delta_pp == null ? "—" : (p.delta_pp > 0 ? "+" : "") + String(p.delta_pp).replace(".", ",")} pp · ` +
    `${signo}${fmtN(Math.abs(dv))} votos`
  );
}

export function tooltipParticipacion(p: any): string {
  const abst = 100 - (p.part_2026 ?? 0);
  return (
    cab(p) +
    `Participación 2026: <b>${fmtP(p.part_2026)}</b><br>` +
    `Abstención: ${fmtP(abst)}<br>` +
    `Votos depositados: ${fmtN(p.votos_dep_2026)} · Censo: ${fmtN(p.censo_2026)}`
  );
}

export function tooltipConcentracion(p: any, anio: string): string {
  const v22 = p.pacto_2022 ?? 0;
  const v26 = p.pacto_2026 ?? 0;
  const pct22 = p.pct_pacto_2022;
  const pct26 = p.pct_pacto_2026;
  const dv = v26 - v22;
  const signo = dv >= 0 ? "+" : "−";
  return (
    cab(p) +
    `<u>Pacto Hist&oacute;rico (Senado)</u><br>` +
    `2022: ${fmtN(v22)} votos ${pct22 != null ? "(" + fmtP(pct22) + ")" : ""}<br>` +
    `2026: ${fmtN(v26)} votos ${pct26 != null ? "(" + fmtP(pct26) + ")" : ""}<br>` +
    `Variaci&oacute;n: ${p.delta_pp == null ? "—" : (p.delta_pp > 0 ? "+" : "") + String(p.delta_pp).replace(".", ",")} pp · ${signo}${fmtN(Math.abs(dv))} votos`
  );
}
