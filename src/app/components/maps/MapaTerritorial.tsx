import { useMemo, useRef, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DOMPurify from "dompurify";
import { useMunicipiosData } from "../../../context/MunicipiosContext";
import { useFilters } from "../../../context/FilterContext";
import { C } from "../../constants";
import { getFillColor } from "./LayerStyles";
import {
  tooltipBloques,
  tooltipPartidos,
  tooltipIzquierda,
  tooltipPacto,
  tooltipConcentracion,
} from "./LayerTooltips";

const center: [number, number] = [4.6, -73.1];
const RMAX = 32;

function getCapaField(layer: string, year: "2022" | "2026"): string {
  const map: Record<string, string> = {
    bloques: `ganador_${year}`,
    partidos: `partido_${year}`,
    pacto_pct: "pct_pacto_2026",
    pacto_delta: "delta_pp",
    concentracion: "concentracion",
    izquierda: "izq_2026",
  };
  return map[layer] || "ganador_2026";
}

export function MapaTerritorial() {
  const { loading, data, features, maxVotes, getBoundsForDept } = useMunicipiosData();
  const { activeMapLayer, mapYear, setSelectedDepto, setSelectedMunicipio, selectedDepto } =
    useFilters();

  const capaField = useMemo(
    () => getCapaField(activeMapLayer, mapYear),
    [activeMapLayer, mapYear]
  );

  const geoJsonStyle = useMemo(
    () => (feature: any) => ({
      fillColor: getFillColor(capaField, feature.properties),
      fillOpacity: 0.8,
      color: "#fff",
      weight: 0.4,
    }),
    [capaField]
  );

  const onEachFeature = useMemo(
    () => (feature: any, layer: any) => {
      const p = feature.properties;
      const html =
        activeMapLayer === "bloques"
          ? tooltipBloques(p, mapYear)
          : activeMapLayer === "partidos"
          ? tooltipPartidos(p, mapYear)
          : activeMapLayer === "izquierda"
          ? tooltipIzquierda(p)
          : activeMapLayer === "pacto_pct" || activeMapLayer === "pacto_delta"
          ? tooltipPacto(p)
          : `<b>${p.municipio}</b> (${p.departamento})`;

      layer.bindTooltip(DOMPurify.sanitize(html), { sticky: true });
      layer.on("mouseover", (e: any) => e.target.setStyle({ weight: 2, color: "#333" }));
      layer.on("mouseout", (e: any) => e.target.setStyle({ weight: 0.4, color: "#fff" }));
      layer.on("click", () => {
        setSelectedDepto(p.departamento);
        setSelectedMunicipio(p.municipio);
      });
    },
    [activeMapLayer, mapYear, setSelectedDepto, setSelectedMunicipio]
  );

  const concFeatures = useMemo(
    () =>
      features
        .filter((f: any) => f.properties.lat != null && f.properties["pacto_" + mapYear])
        .sort(
          (a: any, b: any) =>
            (b.properties["pacto_" + mapYear] || 0) -
            (a.properties["pacto_" + mapYear] || 0)
        ),
    [features, mapYear]
  );

  const radio = useMemo(
    () => (v: number) => (v > 0 ? Math.max(1.5, RMAX * Math.sqrt(v / maxVotes)) : 0),
    [maxVotes]
  );

  if (loading) {
    return (
      <div className="h-full min-h-[500px] flex items-center justify-center bg-soft border border-border-default font-mono text-[11px] text-slate">
        Cargando mapa territorial…
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="h-full min-h-[500px] relative">
      <MapContainer
        center={center}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO — datos: Registraduría, DANE'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapController getBoundsForDept={getBoundsForDept} />

        {activeMapLayer !== "concentracion" ? (
          <GeoJSON
            key={capaField}
            data={data as any}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
          />
        ) : (
          <>
            {concFeatures.map((f: any, i: number) => {
              const p = f.properties;
              const v = p["pacto_" + mapYear] || 0;
              return (
                <CircleMarker
                  key={p.cod_dane || i}
                  center={[p.lat, p.lon]}
                  radius={radio(v)}
                  pathOptions={{
                    color: "#fff",
                    weight: 0.6,
                    fillColor: C.ph,
                    fillOpacity: 0.55,
                  }}
                >
                  <Tooltip sticky>
                    {tooltipConcentracion(p, mapYear)}
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </>
        )}
      </MapContainer>
    </div>
  );
}

function MapController({
  getBoundsForDept,
}: {
  getBoundsForDept: (depto: string) => [[number, number], [number, number]] | null;
}) {
  const map = useMap();
  const { selectedDepto } = useFilters();
  const prevDepto = useRef<string | null>(null);

  useEffect(() => {
    if (!selectedDepto || selectedDepto === prevDepto.current) return;
    prevDepto.current = selectedDepto;
    const bounds = getBoundsForDept(selectedDepto);
    if (bounds) {
      map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 9 });
    }
  }, [selectedDepto, map, getBoundsForDept]);

  return null;
}
