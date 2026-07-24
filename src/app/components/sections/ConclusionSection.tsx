import { SectionNum } from "../ui/SectionNum";

export function ConclusionSection() {
  return (
    <section className="bg-ivory">
      <div className="section-container py-10 md:py-16">
        <div className="flex items-baseline mb-1.5">
          <SectionNum n="07" />
          <h2 className="font-editorial text-xl md:text-[26px] font-medium text-ink">
            La Victoria que No Alcanz&oacute;
          </h2>
        </div>

        <div className="pl-0 md:pl-12 mt-8 max-w-[900px]">
          <p className="text-sm md:text-[15px] leading-[1.8] text-slate mb-6">
            El 8 de marzo de 2026 la izquierda colombiana obtuvo, a la vez, su mejor resultado legislativo en la historia y la prueba m&aacute;s clara de sus l&iacute;mites. El Pacto Hist&oacute;rico se convirti&oacute; en la primera fuerza del Senado con 4,4 millones de votos y 25 curules: ning&uacute;n partido se le acerc&oacute;. Y, sin embargo, no gobierna el Congreso, no eligi&oacute; presidente y no re&uacute;ne mayor&iacute;a propia. Los datos de este recorrido explican por qu&eacute;: es el resultado de tres fuerzas que operaron al mismo tiempo.
          </p>

          <p className="text-sm md:text-[15px] leading-[1.8] text-slate mb-6">
            La primera es territorial. El Pacto creci&oacute; en 1.066 de los 1.121 municipios del pa&iacute;s, pero la derecha sigue siendo primera fuerza en 1.025 de ellos. La izquierda acumula votos donde ya es fuerte (el suroccidente, las grandes ciudades) mientras la derecha los reparte por toda la geograf&iacute;a. En un sistema que premia el territorio tanto como el voto, ganar en n&uacute;mero no basta.
          </p>

          <p className="text-sm md:text-[15px] leading-[1.8] text-slate mb-6">
            La segunda es autoinfligida. El bloque de izquierda creci&oacute; 1,5 millones de votos, pero lleg&oacute; dividido en tres listas que compitieron entre s&iacute;. El Frente Amplio Unitario y Fuerza Ciudadana sumaron medio mill&oacute;n de sufragios que no eligieron a nadie: se quedaron bajo el umbral del 3&percnt; y perdieron personer&iacute;a. Esos votos, en una lista unida, habr&iacute;an valido curules.
          </p>

          <p className="text-sm md:text-[15px] leading-[1.8] text-slate mb-6">
            La tercera es la m&aacute;s fr&aacute;gil. El crecimiento del Pacto no vino de una ola de nuevos votantes ni de la desmovilizaci&oacute;n de sus rivales: vino de gente que ya votaba y cambi&oacute; de opini&oacute;n, en municipios donde la izquierda apenas exist&iacute;a cuatro a&ntilde;os atr&aacute;s. Es una conquista real de territorio nuevo, pero es voto de conversi&oacute;n, no de base hist&oacute;rica&thinsp;&mdash;&thinsp;y lo que se gana convenciendo se puede perder de la misma manera.
          </p>

          <p className="text-sm md:text-[15px] leading-[1.8] text-slate mb-6">
            Queda una pregunta que el mapa no responde. El Congreso que naci&oacute; el 8 de marzo es ingobernable para todos: el presidente electo tampoco tiene mayor&iacute;a y depende de un bloque bisagra que no le debe lealtad. De cara a 2030, la izquierda enfrenta su propia lecci&oacute;n escrita en los datos&thinsp;&mdash;&thinsp;la unidad que le falt&oacute;, el umbral que la castig&oacute;, el territorio que a&uacute;n le es ajeno. Y por encima de todo, un dato que ninguna bancada puede reclamar como propio: casi la mitad del censo, m&aacute;s de veinte millones de colombianos, no vot&oacute;. El bloque m&aacute;s grande del pa&iacute;s sigue siendo el de los que se quedaron en casa.
          </p>
        </div>
      </div>
    </section>
  );
}
