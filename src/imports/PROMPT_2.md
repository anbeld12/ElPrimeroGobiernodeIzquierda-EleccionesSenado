# **PROMPT 2: REFINAMIENTO DE MOCKUP CON DATOS CONSOLIDADOS — EL CONGRESO 2026 A TRAVÉS DE LOS DATOS**

Este documento constituye el segundo prompt técnico para la actualización del mockup de alta fidelidad en Figma. Su propósito es sustituir todos los datos de muestra (placeholders) y estimaciones iniciales por las cifras oficiales definitivas y los análisis cuantitativos derivados de los escrutinios de la Registraduría Nacional, junto con las métricas procesadas en el repositorio del proyecto.  
La arquitectura visual general permanece inalterable: cuadrícula de 12 columnas, márgenes laterales de 80px, separación (gutter) de 24px, paleta de color editorial (\#FAF9F6), tipografías (Playfair Display, Inter, Roboto Mono) y jerarquía visual del Prompt 1\. Solo se modifica el contenido informativo, estadístico y geoespacial.

## **1\. TOKENS DE DISEÑO Y CONFIGURACIÓN DE CUADRÍCULA**

* **Diseño de columnas**: Cuadrícula de 12 columnas. Ancho máximo de 1440px. Márgenes izquierdo/derecho de 80px. Gutter de 24px.  
* **Escala de espaciado**: Sistema basado en 8px (incrementos estrictos: 8, 16, 24, 32, 48, 64 px para rellenos y márgenes verticales).  
* **Paleta de colores**:  
  * Fondo principal: \#FAF9F6 (Crema editorial)  
  * Texto principal y encabezados: \#0F172A (Carbón intenso)  
  * Texto de cuerpo: \#475569 (Pizarra suave)  
  * Líneas divisorias: \#E2E8F0 (Grosor: 1px)  
  * Variable Izquierda / Pacto Histórico: \#6D28D9 (Violeta profundo)  
  * Variable Derecha / Centro Democrático: \#991B1B (Rojo carmesí)  
  * Variable Independiente / Centro: \#0F766E (Verde azulado)  
* **Tipografía y jerarquía**:  
  * H1 Titular principal: 40px / Interlineado: 48px / Playfair Display / Color: \#0F172A  
  * H2 Encabezado de sección: 24px / Interlineado: 32px / Playfair Display  
  * Texto de cuerpo: 15px / Interlineado: 24px / Inter / Regular  
  * Métricas clave (KPI): 56px / Roboto Mono / Semi-Bold / Color: \#0F172A  
  * Tablas y visualización de datos crudos: Roboto Mono o JetBrains Mono (13px o 14px)

## **2\. ESPECIFICACIONES DE CONTENIDO POR SECCIÓN**

### **Encabezado (Identidad Institucional)**

* **Alineación izquierda**: Asignatura: EL PRIMER GOBIERNO DE IZQUIERDA EN COLOMBIA: ELEMENTOS PARA UN BALANCE (bog-2029789-1-2026-01)  
* **Alineación derecha**: Elecciones de Congreso 2026 – Análisis Territorial de Datos

### **Sección 1: Portada (The Critical Balance Hero)**

* **Dimensiones**: Altura fija de 600px. Distribución: columna izquierda de 7 columnas (bloque de texto) y columna derecha de 5 columnas (tarjeta de métricas clave).  
* **Bloque de texto (Izquierda)**:  
  * Etiqueta superior (Badge): Periodismo de Datos / Colombia Legislativa  
  * Título principal (H1): La Fragmentación del Mandato: El Ascenso del Pacto Histórico y la Resistencia Conservadora en el Congreso 2026  
  * Subtítulo: Análisis territorial de los comicios del 8 de marzo de 2026 frente al balance histórico de 2022: un Congreso fragmentado ante la victoria de la derecha en el Ejecutivo.  
* **Tarjeta de métricas clave (Derecha)**:  
  * Métrica 1: 41,287,084 (Texto secundario: Censo Electoral Nacional \- Ciudadanos habilitados)  
  * Métrica 2: 20,900,614 (Texto secundario: Votación Total Senado / 50.62% de Participación)  
  * Métrica 3: 20,386,470 (Texto secundario: Abstención General / 49.38%)  
  * Métrica 4: 19,423,187 (Texto secundario: Votos Válidos / 93.08%)

### **Sección 2: Contexto y Rigor Metodológico**

* **Componente visual**: Banner horizontal con fondo oscuro (\#1E293B) y texto en color blanco.  
* **Texto técnico**: RIGOR DE DATOS: Procesamiento de actas definitivas E-26 validadas con un 99.997% de coincidencia matemática entre preconteo y escrutinios definitivos. Análisis a nivel municipal y departamental. Fuentes: Registraduría Nacional del Estado Civil, Consejo Nacional Electoral y DANE.  
* **Nota metodológica**: El análisis evalúa al partido unificado Pacto Histórico (fusión de Polo, UP y PCC en septiembre de 2025), frente a las fuerzas tradicionales y a los movimientos alternativos (Frente Amplio Unitario y Fuerza Ciudadana-Comunes).

### **Sección 3: Panorama del Congreso (Senado y Cámara)**

* **Encabezado (H2)**: La Nueva Composición Parlamentaria 2026-2030

#### **A. Senado de la República (103 curules)**

* **Distribución visual**: Bloque izquierdo de 8 columnas para el gráfico del hemiciclo; bloque derecho de 4 columnas para la tabla de datos.  
* **Gráfico del hemiciclo (Izquierda)**: Diagrama vectorial semicircular codificado con las siguientes variables de color:  
  * \#6D28D9 (Violeta): 25 curules (Pacto Histórico)  
  * \#991B1B (Rojo): 17 curules (Centro Democrático)  
  * \#1E3A8A (Azul oscuro): 13 curules (Partido Liberal)  
  * \#D97706 (Dorado): 10 curules (Alianza por Colombia)  
  * \#15803D (Verde): 10 curules (Partido Conservador)  
  * \#64748B (Gris): 28 curules (Distribuidas en: de la U: 9, Cambio Radical-ALMA: 7, Ahora Colombia: 5, Salvación Nacional: 4, Circunscripción Indígena: 2, Estatuto de la Oposición: 1\)  
* **Tabla de datos (Derecha)**: Listado ordenado de mayor a menor de los partidos con sus respectivos valores absolutos de curules y equivalencias porcentuales.

#### **B. Cámara de Representantes (183 curules)**

* **Componente**: Tabla de datos con la siguiente distribución:  
  * Pacto Histórico: 37 curules (Nodos principales de concentración: Bogotá con 8 curules, Valle con 6 curules)  
  * Partido Liberal: 25 curules  
  * Centro Democrático: 25 curules  
  * Partido Conservador: 19 curules  
  * Partido de la U: 12 curules  
  * Cambio Radical-ALMA: 12 curules  
  * CITREP (Curules de Paz): 16 curules  
  * Minorías y otras colectividades: 27 curules

### **Sección 4: Desempeño del Pacto Histórico (2022 vs. 2026\)**

* **Encabezado (H2)**: Desempeño y Consolidación del Pacto Histórico: 2022 vs. 2026  
* **Estructura**: Dos tarjetas simétricas de datos comparativos conectadas por un indicador de variación central.  
  * **Tarjeta A (Línea base 2022\)**:  
    * Votos consolidados: 2,880,254  
    * Porcentaje electoral: 16.95%  
    * Curules alcanzadas: 20  
    * Tipo de lista: Lista cerrada (Coalición)  
  * **Tarjeta B (Resultado 2026\)**:  
    * Votos consolidados: 4,413,636  
    * Porcentaje electoral: 22.72%  
    * Curules alcanzadas: 25  
    * Tipo de lista: Lista cerrada con cremallera y paridad de género  
* **Indicador de cambio central**: Variación absoluta: \+1,533,382 sufragios (Crecimiento del 53.24%)

### **Sección 5: Fragmentación de la Izquierda y Colapso Disidente**

* **Encabezado (H2)**: El Colapso del Progresismo Disidente y la Pérdida del Umbral  
* **Distribución**: Columna izquierda (5 columnas) destinada al flujo conceptual de votos; columna derecha (7 columnas) destinada a los datos de las fuerzas disidentes.  
* **Componente de flujo (Izquierda)**: Diagrama explicativo de tipo Sankey que ilustra cómo los votos de los sectores alternativos de 2022 (Frente Amplio y Fuerza Ciudadana) quedaron dispersos y no lograron superar el umbral legal del 3% de los votos válidos en 2026, equivalente a 582,695 sufragios.  
* **Bloque de datos (Derecha)**:  
  * Frente Amplio Unitario: 396,042 votos (2.03%). Consecuencia: Pérdida de personería jurídica.  
  * Fuerza Ciudadana \- Comunes: 114,722 votos (0.59%). Consecuencia: Pérdida de personería jurídica y eliminación de las 10 curules de paz asignadas a Comunes.

### **Sección 6: Paradoja de la Movilización (Participación y Abstención)**

* **Encabezado (H2)**: La Paradoja de la Movilización: Abstención y Concentración Local  
* **Componente 1 (Gráfico de dispersión)**: Gráfico cartesiano detallando las correlaciones estadísticas reales:  
  * Eje X: Votación de listas alternativas 2022 (Coalición Centro Esperanza, Fuerza Ciudadana, etc.)  
  * Eje Y: Variación del Pacto Histórico en puntos porcentuales (pp)  
  * Etiquetas de datos obligatorias integradas en el gráfico:  
    * Correlación con Verde–Centro Esperanza 2022: r \= \-0.33  
    * Correlación con Fuerza Ciudadana 2022: r \= \+0.17  
    * Correlación con % Pacto Histórico 2022: r \= \-0.17  
    * Correlación con Crecimiento total de votos: r \= \-0.02  
* **Componente 2 (Texto de apoyo)**: La participación nacional descendió al 50.62% en marzo de 2026 (frente al 54.02% en 2022), aunque zonas con dinámicas de orden público complejo como Cauca y Meta registraron picos significativos de movilización ciudadana.  
* **Componente 3 (Métrica de concentración territorial)**: Cuadro de datos con los coeficientes del Índice de Gini para el análisis de distribución:  
  * Pacto Histórico 2022 (Coalición): Gini de 0.88  
  * Pacto Histórico 2026 (Partido Unificado): Gini de 0.85  
  * Electorado general (Total listas 2026): Gini de 0.75

### **Sección 7: Cierre y Balance de Gobernabilidad**

* **Componente visual**: Fondo en tono gris atenuado (\#F1F5F9) para delimitar visualmente la conclusión del sitio.  
* **Encabezado (H2)**: Equilibrio del Congreso frente al Ejecutivo 2026-2030  
* **Diseño**: Matriz de tres tarjetas (4 columnas de ancho cada una):  
  * **Tarjeta Izquierda (Bloque de Oposición)**: 28 Curules totales. Integrado por: Pacto Histórico (25) \+ Minorías Étnicas (2) \+ Curul del Estatuto de la Oposición (1).  
  * **Tarjeta Central (Bloque Bisagra / Independientes)**: 27 Curules totales. Integrado por: Partido Liberal (13) \+ Partido de la U (9) \+ Ahora Colombia (5).  
  * **Tarjeta Derecha (Bloque de Gobierno / Afines)**: 48 Curules totales. Integrado por: Centro Democrático (17) \+ Partido Conservador (10) \+ Cambio Radical-ALMA (7) \+ Salvación Nacional (4).  
* **Bloque de contexto presidencial**:  
  * Abelardo de la Espriella (Defensores de la Patria): 49.66% (Presidente electo)  
  * Iván Cepeda Castro (Pacto Histórico): 48.70% (Líder de la oposición)  
* **Texto analítico final**: De la Espriella se impone en la Presidencia pero asume sin control sobre el Capitolio. El bloque bisagra de 27 senadores retiene la balanza de gobernabilidad en Colombia.

## **3\. INSTRUCCIONES FORMALES PARA LA MAQUETACIÓN EN FIGMA**

1. **Sustitución estricta de variables**: Eliminar todas las etiquetas temporales (placeholders) o estimaciones e incorporar los valores absolutos, porcentajes y coeficientes estadísticos definidos en este documento.  
2. **Coherencia escalar en las visualizaciones**: Configurar la escala gráfica del hemiciclo, las proporciones de los flujos del diagrama de Sankey y la dispersión de los puntos en los planos cartesianos basándose estrictamente en los valores numéricos suministrados.  
3. **Rigidez estética**: Mantener el uso de líneas divisorias delgadas (1px con color \#E2E8F0) y dar prioridad a la jerarquía tipográfica sobre el uso de bloques cromáticos densos. Los colores asignados a las variables políticas (violeta, rojo, verde azulado) se aplicarán exclusivamente a los datos, convenciones y líneas de las gráficas.

