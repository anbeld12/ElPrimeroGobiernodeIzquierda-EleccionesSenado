import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type MapLayer =
  | "bloques"
  | "partidos"
  | "pacto_pct"
  | "pacto_delta"
  | "concentracion"
  | "izquierda"
  | "participacion";

interface FilterState {
  selectedDepto: string | null;
  selectedMunicipio: string | null;
  highlightedParty: string | null;
  activeMapLayer: MapLayer;
  mapYear: "2022" | "2026";
  filterCategory: string | null;
}

interface FilterContextValue extends FilterState {
  setSelectedDepto: (d: string | null) => void;
  setSelectedMunicipio: (m: string | null) => void;
  setHighlightedParty: (p: string | null) => void;
  setActiveMapLayer: (l: MapLayer) => void;
  setMapYear: (y: "2022" | "2026") => void;
  setFilterCategory: (c: string | null) => void;
  resetFilters: () => void;
}

const defaults: FilterState = {
  selectedDepto: null,
  selectedMunicipio: null,
  highlightedParty: null,
  activeMapLayer: "bloques",
  mapYear: "2026",
  filterCategory: null,
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedDepto, setSelectedDepto] = useState<string | null>(null);
  const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(null);
  const [highlightedParty, setHighlightedParty] = useState<string | null>(null);
  const [activeMapLayer, setActiveMapLayer] = useState<MapLayer>("bloques");
  const [mapYear, setMapYear] = useState<"2022" | "2026">("2026");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  useEffect(() => {
    setSelectedMunicipio(null);
  }, [selectedDepto]);

  useEffect(() => {
    setFilterCategory(null);
  }, [activeMapLayer, mapYear]);

  const resetFilters = () => {
    setSelectedDepto(null);
    setSelectedMunicipio(null);
    setHighlightedParty(null);
    setActiveMapLayer("bloques");
    setMapYear("2026");
    setFilterCategory(null);
  };

  return (
    <FilterContext.Provider
      value={{
        selectedDepto,
        selectedMunicipio,
        highlightedParty,
        activeMapLayer,
        mapYear,
        filterCategory,
        setSelectedDepto,
        setSelectedMunicipio,
        setHighlightedParty,
        setActiveMapLayer,
        setMapYear,
        setFilterCategory,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used inside FilterProvider");
  return ctx;
}
