import { useMemo, useRef, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DOMPurify from "dompurify";
import { useMunicipiosData } from "../../../context/MunicipiosContext";
import { useFilters } from "../../../context/FilterContext";
import { C } from "../../constants";
import { getFillColor } from "./LayerStyles";
import { MapLegendOverlay } from "./MapLegendOverlay";
import {
  tooltipBloques,
  tooltipPartidos,
  tooltipIzquierda,
  tooltipPacto,
  tooltipConcentracion,
  tooltipParticipacion,
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
    participacion: "part_2026",
  };
  return map[layer] || "ganador_2026";
}

interface MapaProps {
  layer?: string;
  hideControls?: boolean;
  showLegend?: boolean;
}

export function MapaTerritorial({ layer, hideControls, showLegend }: MapaProps) {
  const { loading, data, features, maxVotes, getBoundsForDept } = useMunicipiosData();
  const { activeMapLayer, mapYear, filterCategory, setSelectedDepto, setSelectedMunicipio, selectedDepto } =
    useFilters();
  const effectiveLayer = layer || activeMapLayer;

  const capaField = useMemo(
    () => getCapaField(effectiveLayer, mapYear),
    [effectiveLayer, mapYear]
  );

  const geoJsonStyle = useMemo(
    () => (feature: any) => {
      const match = !filterCategory || feature.properties[capaField] === filterCategory;
      return {
        fillColor: getFillColor(capaField, feature.properties),
        fillOpacity: match ? 0.8 : 0.08,
        color: match ? "#fff" : "#e2e8f0",
        weight: match ? 0.4 : 0.1,
      };
    },
    [capaField, filterCategory]
  );

  const onEachFeature = useMemo(
    () => (feature: any, layer: any) => {
      const p = feature.properties;
      const html =
        effectiveLayer === "bloques"
          ? tooltipBloques(p, mapYear)
          : effectiveLayer === "partidos"
          ? tooltipPartidos(p, mapYear)
          : effectiveLayer === "izquierda"
          ? tooltipIzquierda(p)
          : effectiveLayer === "pacto_pct" || effectiveLayer === "pacto_delta"
          ? tooltipPacto(p)
          : effectiveLayer === "participacion"
          ? tooltipParticipacion(p)
          : `<b>${p.municipio}</b> (${p.departamento})`;

      layer.bindTooltip(DOMPurify.sanitize(html), { sticky: true });
      layer.on("mouseover", (e: any) => e.target.setStyle({ weight: 2, color: "#333" }));
      layer.on("mouseout", (e: any) => e.target.setStyle({ weight: 0.4, color: "#fff" }));
      layer.on("click", () => {
        setSelectedDepto(p.departamento);
        setSelectedMunicipio(p.municipio);
      });
    },
    [effectiveLayer, mapYear, setSelectedDepto, setSelectedMunicipio]
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
        zoom={5.5}
        zoomSnap={0.5}
        className="h-full w-full"
        scrollWheelZoom={true}
        maxBounds={[[-5.5, -84], [16, -64]] as [[number, number], [number, number]]}
        maxBoundsViscosity={1.0}
        minZoom={5}
        maxZoom={12}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO — datos: Registraduría, DANE'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapController getBoundsForDept={getBoundsForDept} />

        {showLegend && <MapLegendOverlay />}

        {effectiveLayer !== "concentracion" ? (
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
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tooltipConcentracion(p, mapYear)) }} />
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
