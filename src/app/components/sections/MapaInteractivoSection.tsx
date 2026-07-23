import { useState, ReactNode } from "react";
import { SectionNum } from "../ui/SectionNum";
import { MapaTerritorial } from "../maps/MapaTerritorial";
import { useFilters, MapLayer } from "../../../context/FilterContext";
import { LorenzCurve } from "../charts/LorenzCurve";
import { GiniTable } from "../charts/GiniTable";
import { BarrasIzquierda } from "../charts/BarrasIzquierda";

type TabId = "bloques" | "partidos" | "pacto" | "concentracion" | "izquierda" | "participacion";

interface TabContent {
  label: string;
  title: string;
  entrada: string;
  analisis: ReactNode;
  pie: string;
  hasYearToggle: boolean;
  defaultLayer: MapLayer;
}

const TABS: Record<TabId, TabContent> = {
  bloques: {
    label: "Bloques",
    title: "La izquierda pasó de ganar 16 municipios a ganar 73, casi todos en el suroccidente.",
    entrada: "Mueva el control entre 2022 y 2026. El cambio se concentra en una esquina del mapa: Cauca, Nariño, Putumayo y el norte del Valle.",
    hasYearToggle: true,
    defaultLayer: "bloques",
    analisis: (
      <>
        <p className="mb-4">
          En 2022 la izquierda era primera fuerza en apenas 16 municipios, en 2026 lo es en 73. Ciudades intermedias que nunca habían sido suyas cambiaron de bando: Pasto (54,7 % del voto para el bloque), Popayán (49,3 %), Santander de Quilichao (53,5 %), Mocoa (53,1 %) y Soacha (46,2 %), la periferia obrera de Bogotá. Cali también viró: en 2022 el bloque ganador era la derecha, en 2026, la izquierda.
        </p>
        <p>
          Pero el mapa sigue siendo mayoritariamente azul: la derecha es primera fuerza en 1.025 municipios. Esa desproporción entre votos y territorio explica por qué un r&eacute;cord en votos no se convierte en control del Congreso.
        </p>
      </>
    ),
    pie: "Senado, circunscripción nacional. &ldquo;Ganar&rdquo; significa ser la fuerza más votada (pluralidad, no mayoría absoluta).",
  },
  partidos: {
    label: "Partidos",
    title: "Volatilidad del sistema de partidos: cambios de marca entre 2022 y 2026",
    entrada: "El desglose por partido revela la volatilidad del sistema colombiano.",
    hasYearToggle: true,
    defaultLayer: "partidos",
    analisis: (
      <p>
        Solo cinco listas compiten en ambos años con la misma marca: Liberal, Conservador, Centro Democrático, La U y Cambio Radical. Todo lo demás se reconfiguró. La coalición Verde&ndash;Centro Esperanza, que en 2022 era primera fuerza en 146 municipios, sencillamente ya no existe: sus herederos se repartieron entre Alianza por Colombia y &iexcl;Ahora Colombia!, dos etiquetas que no existían hace cuatro años. El Pacto pasó de ser la lista más votada en 72 municipios a serlo en 202.
      </p>
    ),
    pie: "Importante: cada mapa es la foto de su año. Los cambios de color entre 2022 y 2026 no son transferencias de votantes: reflejan también que las listas mismas cambiaron de nombre, de socios y de perímetro. En 2022 el Pacto era una coalición más amplia; parte de sus integrantes de entonces compite en 2026 como Frente Amplio Unitario.",
  },
  pacto: {
    label: "Pacto",
    title: "Distribución y evolución del voto del Pacto: concentración territorial y variación 2022–2026",
    entrada: "La primera capa muestra el porcentaje de votación del Pacto en 2026; la segunda, el cambio frente a 2022. Casi todo el país está en morado: creció en casi todas partes.",
    hasYearToggle: false,
    defaultLayer: "pacto_pct",
    analisis: (
      <>
        <p className="mb-4">
          El norte del Cauca es el epicentro absoluto del fen&oacute;meno. En Sucre (Cauca) el Pacto alcanz&oacute; el 75,5 % de los votos tras subir 45 puntos porcentuales en un solo ciclo; en Villa Rica subi&oacute; 41 puntos; en Puerto Tejada, 34; en Guachen&eacute;, 36. Torib&iacute;o, Jambal&oacute;, Totor&oacute; e Inz&aacute; (municipios de fuerte poblaci&oacute;n ind&iacute;gena y Afro) superan todos el 60 %. Fuera del Cauca, los saltos m&aacute;s grandes est&aacute;n en la periferia amaz&oacute;nica: La Victoria (Amazonas) creci&oacute; 45 puntos y San Francisco (Putumayo), 32.
        </p>
        <p>
          Los retrocesos son pocos, pero significativos: apenas 53 municipios, con L&oacute;pez de Micay (Cauca) a la cabeza (&minus;41,6 puntos) y bolsones en el Catatumbo (Hacar&iacute;, Teorama) y el sur de Nari&ntilde;o. El Cauca concentra a la vez el mayor avance y la mayor ca&iacute;da del pa&iacute;s.
        </p>
      </>
    ),
    pie: "Morado = creció, naranja = retrocedió. Puntos porcentuales sobre el total de votos por listas del municipio.",
  },
  concentracion: {
    label: "Concentración",
    title: "El Pacto no solo aumentó su votación: también la distribuyó en más municipios",
    entrada: "El mapa de burbujas muestra dónde están los votos en términos absolutos. La curva de Lorenz mide qué tan concentrados están.",
    hasYearToggle: false,
    defaultLayer: "concentracion",
    analisis: (
      <p>
        La combinación del mapa de burbujas y la curva de Lorenz revela un doble movimiento: el Pacto creció y, al mismo tiempo, distribuyó su votación en un número mayor de municipios. En 2022, la mitad de toda la votación del Pacto salía de apenas 7 municipios, y Bogotá sola aportaba el 28,7 % del total nacional. En 2026, esa mitad se reparte entre 14 municipios y el índice de Gini baja de 0,88 a 0,85. Aun así, el Pacto sigue siendo una fuerza más concentrada que el electorado general (Gini 0,75): su voto vive en menos municipios que el promedio del país.
      </p>
    ),
    pie: "El área del círculo es proporcional a los votos absolutos, no al porcentaje. Coeficiente de Gini como proxy de concentración geográfica del voto (0 = dispersión total · 1 = concentración absoluta).",
  },
  izquierda: {
    label: "Izquierda",
    title: "Distribución territorial de la izquierda: Frente Amplio en Nariño, Fuerza Ciudadana en el Magdalena",
    entrada: "En cada municipio, cuál de las tres fuerzas de izquierda obtuvo más votos.",
    hasYearToggle: false,
    defaultLayer: "izquierda",
    analisis: (
      <>
        <p className="mb-4">
          El Pacto es la fuerza dominante de la izquierda en 1.078 de los 1.121 municipios: su hegemonía dentro del bloque es casi total. Los reductos de las otras dos son pequeños y muy localizados. El Frente Amplio Unitario es primera fuerza de izquierda en 33 municipios, doce de ellos en Nariño, con presencia dispersa en Córdoba, Bolívar y Norte de Santander. Fuerza Ciudadana quedó reducida a 11 municipios, nueve en el Magdalena, el bastión histórico del caicedismo, y poco más.
        </p>
        <p className="mb-4">
          Las barras por departamento confirman el patrón: en casi todo el país el voto de izquierda es, esencialmente, voto del Pacto. La fragmentación no es un empate a tres bandas, sino un partido dominante con dos satélites regionales, demasiado pequeños para pasar el umbral.
        </p>
        <p>
          El Frente Amplio Unitario obtuvo 396 mil votos y Fuerza Ciudadana&ndash;Comunes 115 mil. Ninguno alcanzó el umbral del 3 % de los votos válidos (582.695), de modo que perdieron personería jurídica y quedaron fuera del Senado. Medio millón de sufragios de izquierda (suficientes para dos o tres curules si hubieran ido en una lista conjunta) se evaporaron en la conversión de votos a escaños. Esa es, en una cifra, la fragmentación del mandato.
        </p>
      </>
    ),
    pie: "",
  },
  participacion: {
    label: "Participación",
    title: "Participación del 50,6 %: los contrastes territoriales del voto en las legislativas de 2026",
    entrada: "Participación municipal en las legislativas de 2026: votos depositados sobre censo electoral.",
    hasYearToggle: false,
    defaultLayer: "participacion",
    analisis: (
      <>
        <p className="mb-4">
          La participación nacional fue del 50,6 %, por debajo del 54 % de 2022. Pero el promedio oculta una brecha enorme: en el Caribe se vota masivamente: Usiacurí (Atlántico) llegó al 80,6 %, Tubará al 77,6 %, Chinú (Córdoba) al 75,8 %; mientras en zonas del nordeste antioqueño golpeadas por el conflicto la participación se desploma: Ituango 20,9 %, Anorí 23,0 %, Remedios 23,1 %. El mínimo nacional está en Taraira (Vaupés), con 16,8 %.
        </p>
        <p>
          Ese contraste importa políticamente: los municipios de mayor participación del país son también los de mayor peso de las maquinarias tradicionales, y son mayoritariamente territorio de la derecha.
        </p>
      </>
    ),
    pie: "Numerador: todos los votos depositados para Senado (válidos, en blanco, nulos y no marcados). Denominador: censo electoral municipal (Divipole 2026).",
  },
};

const TAB_ORDER: TabId[] = ["bloques", "partidos", "pacto", "concentracion", "izquierda", "participacion"];

export function MapaInteractivoSection() {
  const [tab, setTab] = useState<TabId>("bloques");
  const [pactoSub, setPactoSub] = useState<"pct" | "delta">("pct");
  const { mapYear, setMapYear } = useFilters();

  const current = TABS[tab];

  const effectiveLayer: MapLayer =
    tab === "pacto" ? (pactoSub === "pct" ? "pacto_pct" : "pacto_delta") : current.defaultLayer;

  return (
    <section className="bg-ivory">
      <div className="section-container py-10 md:py-16">
        <div className="flex items-baseline mb-1.5">
          <SectionNum n="§ 02–08" />
          <h2 className="font-editorial text-xl md:text-[26px] font-medium text-ink">
            {current.title}
          </h2>
        </div>

        <div className="pl-0 md:pl-12 mb-1">
          <p className="text-xs md:text-[13px] text-slate leading-[1.7] max-w-[680px]">
            {current.entrada}
          </p>
        </div>

        <div className="pl-0 md:pl-12 mt-5 mb-4 overflow-x-auto scroll-x -mx-1 px-1">
          <div className="inline-flex border border-border-default overflow-hidden rounded-sm" role="tablist" aria-label="Capa del mapa">
            {TAB_ORDER.map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`font-mono text-[10px] tracking-[0.12em] uppercase px-3 md:px-4 py-2 cursor-pointer border-none outline-none transition-all duration-150 whitespace-nowrap ${
                  tab === id
                    ? "bg-ink text-ivory"
                    : "bg-transparent text-slate hover:text-ink"
                } ${id !== TAB_ORDER[TAB_ORDER.length - 1] ? "border-r border-border-default" : ""}`}
              >
                {TABS[id].label}
              </button>
            ))}
          </div>
        </div>

        {(tab === "bloques" || tab === "partidos") && (
          <div className="pl-0 md:pl-12 mb-4">
            <div className="inline-flex border border-border-default overflow-hidden rounded-sm" role="tablist" aria-label="Año electoral">
              {(["2022", "2026"] as const).map((y) => (
                <button
                  key={y}
                  role="tab"
                  aria-selected={mapYear === y}
                  onClick={() => setMapYear(y)}
                  className={`font-mono text-[10px] tracking-[0.12em] uppercase px-4 md:px-5 py-2 cursor-pointer border-none outline-none transition-all duration-150 ${
                    mapYear === y
                      ? "bg-ink text-ivory"
                      : "bg-transparent text-slate hover:text-ink"
                  } ${y === "2022" ? "border-r border-border-default" : ""}`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "pacto" && (
          <div className="pl-0 md:pl-12 mb-4">
            <div className="inline-flex border border-border-default overflow-hidden rounded-sm" role="tablist" aria-label="Capa del Pacto">
              {([{ id: "pct" as const, label: "% Pacto 2026" }, { id: "delta" as const, label: "Variación 2022→2026" }]).map((l) => (
                <button
                  key={l.id}
                  role="tab"
                  aria-selected={pactoSub === l.id}
                  onClick={() => setPactoSub(l.id)}
                  className={`font-mono text-[10px] tracking-[0.12em] uppercase px-4 md:px-5 py-2 cursor-pointer border-none outline-none transition-all duration-150 ${
                    pactoSub === l.id
                      ? "bg-ink text-ivory"
                      : "bg-transparent text-slate hover:text-ink"
                  } ${l.id === "pct" ? "border-r border-border-default" : ""}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "concentracion" ? (
          <div className="pl-0 md:pl-12 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12">
            <div className="h-[400px] md:h-[520px] border border-border-default rounded-sm overflow-hidden">
              <MapaTerritorial layer="concentracion" hideControls />
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-4 border border-border-default rounded-sm bg-white">
                <LorenzCurve />
              </div>
              <GiniTable />
            </div>
          </div>
        ) : tab === "izquierda" ? (
          <div className="pl-0 md:pl-12 grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-8 lg:gap-12">
            <div className="h-[400px] md:h-[520px] border border-border-default rounded-sm overflow-hidden">
              <MapaTerritorial layer="izquierda" hideControls />
            </div>
            <div className="border border-border-default rounded-sm overflow-hidden p-4 md:p-6 bg-white">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate mb-4">
                Voto de izquierda por departamento &mdash; Senado 2026
              </p>
              <BarrasIzquierda />
            </div>
          </div>
        ) : (
          <div className="pl-0 md:pl-12">
            <div className="h-[400px] md:h-[520px] border border-border-default rounded-sm overflow-hidden">
              <MapaTerritorial layer={effectiveLayer} hideControls />
            </div>
          </div>
        )}

        <div className="pl-0 md:pl-12 mt-8">
          <div className="text-xs md:text-[13px] text-slate leading-[1.8] max-w-[680px]">
            {current.analisis}
          </div>
          {current.pie && (
            <p className="font-mono text-[10px] text-slate/60 mt-6 border-t border-border-default pt-4 leading-[1.6]">
              {current.pie}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
