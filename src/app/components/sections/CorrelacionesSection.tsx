import { SectionNarrative } from "../ui/SectionNarrative";
import { ParticipationScatter } from "../charts/ParticipationScatter";
import { CorrelationGrid } from "../charts/CorrelationGrid";
import { SvgScatter } from "../charts/ScatterChart";

export function CorrelacionesSection() {
  return (
    <SectionNarrative
      num="§ 09"
      title="El crecimiento del Pacto se explica por un realineamiento del voto, no por una expansión del electorado"
      entrada="Cuatro preguntas, cuatro correlaciones municipales. Ninguna confirma las hipótesis más extendidas."
      bg="bg-soft"
      analisis={
        <>
          <p className="mb-4">
            Si el ascenso de la izquierda se explicara por movilización, deberíamos ver al Pacto creciendo más donde más gente votó. No ocurre: la correlación entre participación y crecimiento del Pacto es prácticamente nula (r = +0,04), igual que con el aumento del voto total (r = −0,02). Tampoco funciona la hipótesis del trasvase desde el centro. El Pacto creció menos donde la coalición Verde&ndash;Centro Esperanza había sido fuerte en 2022 (r = −0,33): la geografía de su crecimiento es casi la inversa de la del centro, cuyos votantes parecen haber migrado a las nuevas coaliciones de Alianza por Colombia y &iexcl;Ahora Colombia! Lo que sí aparece es una absorción moderada del electorado de Fuerza Ciudadana (r = +0,17) y, sobre todo, un crecimiento en territorio donde el Pacto era débil, no en sus bastiones (r = −0,17).
          </p>
          <p>
            La lectura más consistente con los datos: no hubo una ola de nuevos votantes de izquierda ni una desmovilización de la derecha. Hubo realineamiento: gente que ya votaba, votando distinto en municipios donde la izquierda apenas existía cuatro años atrás.
          </p>
        </>
      }
      pie="Advertencia: son correlaciones ecológicas, calculadas sobre agregados municipales. Sugieren patrones de flujo, no los demuestran: atribuir comportamientos individuales a partir de datos agregados es una falacia conocida. Además, al no existir censo electoral municipal de 2022 comparable, se usa el nivel de participación de 2026 y no su variación."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12">
        <div>
          <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate mb-2">
            Dispersión municipal: participación por departamento
          </p>
          <div className="border border-border-default rounded-sm overflow-hidden p-3 md:p-4 bg-white">
            <ParticipationScatter />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="border border-border-default rounded-sm overflow-hidden p-3 md:p-4 bg-white">
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-slate mb-2">
              Crecimiento del PH vs. % PH 2022
            </p>
            <SvgScatter />
          </div>
          <CorrelationGrid />
        </div>
      </div>
    </SectionNarrative>
  );
}
