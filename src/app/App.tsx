import { ThemeProvider } from "next-themes";
import { FilterProvider } from "../context/FilterContext";
import { MunicipiosProvider } from "../context/MunicipiosContext";
import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { RigorSection } from "./components/sections/RigorSection";
import { ComposicionSection } from "./components/sections/ComposicionSection";
import { MapaInteractivoSection } from "./components/sections/MapaInteractivoSection";
import { ScatterPactoSection } from "./components/sections/ScatterPactoSection";
import { CorrelacionesSection } from "./components/sections/CorrelacionesSection";
import { MovilizacionSection } from "./components/sections/MovilizacionSection";
import { GobernabilidadSection } from "./components/sections/GobernabilidadSection";
import { ConclusionSection } from "./components/sections/ConclusionSection";
import { LimitacionesSection } from "./components/sections/LimitacionesSection";
import { Footer } from "./components/sections/Footer";
import { Divider } from "./components/ui/Divider";
import { Reveal } from "./components/ui/Reveal";
import { TransitionText } from "./components/ui/TransitionText";

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

          <Reveal delay={100}>
            <TransitionText>
              La composici&oacute;n del Congreso tiene una expresi&oacute;n territorial. El mapa siguiente permite explorar, capa por capa, c&oacute;mo se distribuy&oacute; el voto en los 1.121 municipios del pa&iacute;s y cu&aacute;les fueron los cambios entre 2022 y 2026.
            </TransitionText>
          </Reveal>
          <Divider />

          <Reveal delay={100}><MapaInteractivoSection /></Reveal>
          <Divider />

          <Reveal delay={100}>
            <TransitionText>
              El mapa anterior mostr&oacute; la expansi&oacute;n territorial del Pacto Hist&oacute;rico. El siguiente gr&aacute;fico cuantifica ese fen&oacute;meno: cada punto representa un municipio y permite ver la relaci&oacute;n entre el voto obtenido en 2022 y el de 2026.
            </TransitionText>
          </Reveal>
          <Divider />

          <Reveal delay={100}><ScatterPactoSection /></Reveal>
          <Divider />

          <Reveal delay={100}>
            <TransitionText>
              &iquest;Qu&eacute; factores explican este crecimiento? Las correlaciones municipales ofrecen pistas para distinguir entre movilizaci&oacute;n de nuevos votantes y realineamiento del voto existente.
            </TransitionText>
          </Reveal>
          <Divider />

          <Reveal delay={100}><CorrelacionesSection /></Reveal>
          <Divider />

          <Reveal delay={100}>
            <TransitionText>
              La participaci&oacute;n electoral revela contrastes territoriales que ayudan a entender qui&eacute;n vota y d&oacute;nde. La siguiente secci&oacute;n analiza la abstenci&oacute;n y sus implicaciones.
            </TransitionText>
          </Reveal>
          <Divider />

          <Reveal delay={100}><MovilizacionSection /></Reveal>
          <Divider />

          <Reveal delay={100}>
            <TransitionText>
              &iquest;C&oacute;mo se traduce esta fragmentaci&oacute;n del voto en la gobernabilidad del Congreso? El equilibrio de fuerzas define el margen de acci&oacute;n del pr&oacute;ximo gobierno.
            </TransitionText>
          </Reveal>
          <Divider />

          <Reveal delay={100}><GobernabilidadSection /></Reveal>
          <Divider />

          <Reveal delay={100}><ConclusionSection /></Reveal>
          <Divider />

          <Reveal delay={100}><LimitacionesSection /></Reveal>
          <Divider />

          <Reveal delay={150}><Footer /></Reveal>
        </main>
        </MunicipiosProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
