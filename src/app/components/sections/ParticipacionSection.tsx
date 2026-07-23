import { SectionNarrative } from "../ui/SectionNarrative";
import { MapaTerritorial } from "../maps/MapaTerritorial";
import { ParticipationBars } from "../charts/ParticipationBars";

export function ParticipacionSection() {
  return (
    <SectionNarrative
      num="§ 08"
      title="Votó la mitad del país y la mitad que votó no está repartida al azar"
      entrada="Participación municipal en las legislativas de 2026: votos depositados sobre censo electoral."
      bg="bg-ivory"
      analisis={
        <>
          <p className="mb-4">
            La participación nacional fue del 50,6 %, por debajo del 54 % de 2022. Pero el promedio oculta una brecha enorme: en el Caribe se vota masivamente: Usiacurí (Atlántico) llegó al 80,6 %, Tubará al 77,6 %, Chinú (Córdoba) al 75,8 %; mientras en zonas del nordeste antioqueño golpeadas por el conflicto la participación se desploma: Ituango 20,9 %, Anorí 23,0 %, Remedios 23,1 %. El mínimo nacional está en Taraira (Vaupés), con 16,8 %.
          </p>
          <p>
            Ese contraste importa políticamente: los municipios de mayor participación del país son también los de mayor peso de las maquinarias tradicionales, y son mayoritariamente territorio de la derecha.
          </p>
        </>
      }
      pie="Numerador: todos los votos depositados para Senado (válidos, en blanco, nulos y no marcados). Denominador: censo electoral municipal (Divipole 2026)."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12">
        <div className="h-[400px] md:h-[520px] border border-border-default rounded-sm overflow-hidden">
          <MapaTerritorial layer="participacion" hideControls />
        </div>
        <div>
          <ParticipationBars />
        </div>
      </div>
    </SectionNarrative>
  );
}
