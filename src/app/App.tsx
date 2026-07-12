import { lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { FilterProvider } from "../context/FilterContext";
import { MunicipiosProvider } from "../context/MunicipiosContext";
import { Divider } from "./components/ui/Divider";
import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { RigorSection } from "./components/sections/RigorSection";
import { ComposicionSection } from "./components/sections/ComposicionSection";
import { PactoSection } from "./components/sections/PactoSection";
import { ColapsoSection } from "./components/sections/ColapsoSection";
import { MovilizacionSection } from "./components/sections/MovilizacionSection";
import { GobernabilidadSection } from "./components/sections/GobernabilidadSection";
import { Footer } from "./components/sections/Footer";
import { MapaSkeleton } from "./components/ui/MapaSkeleton";
import { Reveal } from "./components/ui/Reveal";

const MapaSection = lazy(() =>
  import("./components/sections/MapaSection").then((m) => ({
    default: m.MapaSection,
  }))
);

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <FilterProvider>
        <MunicipiosProvider>
        <main id="main-content" className="min-h-dvh bg-ivory font-sans text-ink">
          <Header />

          <Reveal><HeroSection /></Reveal>
          <Divider />

          <Reveal delay={100}><RigorSection /></Reveal>
          <Divider />

          <Reveal delay={100}><ComposicionSection /></Reveal>
          <Divider />

          <Reveal delay={100}><PactoSection /></Reveal>
          <Divider />

          <Suspense fallback={<MapaSkeleton />}>
            <Reveal delay={100}><MapaSection /></Reveal>
          </Suspense>
          <Divider />

          <Reveal delay={100}><ColapsoSection /></Reveal>
          <Divider />

          <Reveal delay={100}><MovilizacionSection /></Reveal>
          <Divider />

          <Reveal delay={100}><GobernabilidadSection /></Reveal>
          <Divider />

          <Reveal delay={150}><Footer /></Reveal>
        </main>
        </MunicipiosProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
