import { SectionNarrative } from "../ui/SectionNarrative";
import { PactoScatter } from "../charts/PactoScatter";

export function ScatterPactoSection() {
  return (
    <SectionNarrative
      num="03"
      title="El Pacto creció en 1.066 de los 1.121 municipios del país"
      entrada="Cada burbuja es un municipio; su tamaño, los votos que aporta. La línea diagonal marca el empate entre 2022 y 2026: todo lo que está por encima creció."
      bg="bg-ivory"
      analisis={
        <>
          <p className="mb-4">
            Casi la nube entera quedó del lado del crecimiento. No fue un avance concentrado en unas cuantas plazas fuertes, sino una expansión generalizada: solo 53 municipios registraron retroceso.             Un dato significativo es que Bogotá, el mayor reservorio de votos del Pacto, apenas se movió (32,2 % → 32,4 %). El crecimiento provino de otros municipios.
          </p>
        </>
      }
      pie="En 2022 el Pacto era una coalición de perímetro distinto al partido unificado de 2026; la comparación lista contra lista debe leerse con esa salvedad."
    >
      <div className="border border-border-default rounded-sm overflow-hidden p-4 md:p-6 bg-white">
        <PactoScatter />
      </div>
    </SectionNarrative>
  );
}
