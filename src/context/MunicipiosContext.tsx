import { createContext, useContext, ReactNode } from "react";
import { useMunicipios, DeptAgg, LorenzPoint, GeoProps } from "../data/useMunicipios";

interface MunicipiosContextValue {
  data: any;
  loading: boolean;
  error: string | null;
  features: any[];
  totals: { 2022: number; 2026: number };
  maxVotes: number;
  aggregateByDept: DeptAgg[];
  computeLorenz: LorenzPoint[];
  actualGini: number;
  getBoundsForDept: (depto: string) => [[number, number], [number, number]] | null;
}

const MunicipiosContext = createContext<MunicipiosContextValue | null>(null);

export function MunicipiosProvider({ children }: { children: ReactNode }) {
  const data = useMunicipios();

  return (
    <MunicipiosContext.Provider value={data}>
      {children}
    </MunicipiosContext.Provider>
  );
}

export function useMunicipiosData() {
  const ctx = useContext(MunicipiosContext);
  if (!ctx) throw new Error("useMunicipiosData must be used inside MunicipiosProvider");
  return ctx;
}
