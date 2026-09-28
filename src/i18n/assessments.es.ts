// Spanish presentation overlay for the curated EVIDENCE_ASSESSMENTS entries in
// src/data/cases.ts. Only presentational / narrative fields are translated.
// Numbers, IDs, dates, coordinates, status/dataStatus/evaluation enum VALUES,
// confidence.level, citationUrl and DOI/SHA strings are never included here —
// they are merged straight through from the canonical English object by
// localize.ts. HATI, SNTO, UTCI, SOLWEIG, Sentinel-2, NDVI, NDMI, EVI, OAPN,
// PNSG, PRUG and L5a are kept untranslated per the product glossary.

export interface MetricTextOverlay {
  label: string;
  baseline: string;
  delta: string;
}

export interface CompetingExplanationTextOverlay {
  category: string;
  explanation: string;
  reasoning: string;
  investigationNeeded: string;
}

export interface ProvenanceTextOverlay {
  sensorOrPlatform: string;
  spatialResolution: string;
  processingLevel: string;
  sourceAuthority: string;
}

export interface AssessmentEsOverlay {
  question: string;
  statusHeadline: string;
  signal: {
    observation: string;
    spatialScope: string;
    temporalWindow: string;
    summary: string;
  };
  evidence: {
    supportingDatasets: string[];
    metrics: MetricTextOverlay[];
    dataIntegrityNotes: string;
  };
  interpretation: {
    inferences: string[];
    plausibleMechanisms: string;
  };
  evidenceLimit: {
    strictlyForbiddenInferences: string[];
    unobservedVariables: string[];
    spatialTemporalGaps: string;
  };
  competingExplanations: CompetingExplanationTextOverlay[];
  confidence: {
    justification: string[];
    marginOrInterval?: string;
  };
  decisionImplication: {
    managerialConsiderations: string[];
    cautionsAndGuardrails: string[];
    policyPerspective: string[];
  };
  dataNeededNext: string[];
  provenance: ProvenanceTextOverlay[];
}

export const EVIDENCE_ASSESSMENTS_ES: Record<string, AssessmentEsOverlay> = {
  'madrid-hati-q1': {
    question: '¿Qué demostró realmente el piloto HATI-Madrid?',
    statusHeadline:
      'Resultado Reproducido: HATI Muestra Sensibilidad al Método Térmico y Consecuencias del Cribado Basado en Restricciones',
    signal: {
      observation:
        'La cadena de cribado fijada de HATI-Madrid se reejecutó de forma independiente a partir de las salidas de modelo comprometidas y los insumos de datos abiertos. Las 10 tablas regeneradas coincidieron estructural y numéricamente con sus referencias fijadas.',
      spatialScope: '',
      temporalWindow: 'Día de estudio único documentado: 21 de agosto de 2023 · 12:00 / 15:00 / 18:00.',
      summary:
        'El piloto reproducido demuestra que la definición operativa de calor puede cambiar las clasificaciones de viabilidad turística y que el cribado basado en restricciones puede alterar materialmente el conjunto de candidatos frente a un comparador de solo proximidad.'
    },
    evidence: {
      supportingDatasets: [
        '27 activos turísticos curados en el área piloto Prado–Retiro–Atocha.',
        '42 observaciones de activo al aire libre × marca temporal comparadas entre un proxy operativo y una configuración SOLWEIG → Tmrt → UTCI.',
        'Ocho escenarios de cribado preregistrados más una línea base de solo proximidad al más cercano abierto.',
        'Informe de reproducción independiente: cada paso finalizó con éxito y las 10 tablas regeneradas coincidieron con las referencias fijadas.'
      ],
      metrics: [
        { label: 'Reclasificación por Método Térmico', baseline: 'Dos operacionalizaciones comparadas', delta: '' },
        { label: 'Conjunto de Candidatos Modificado', baseline: 'Comparador del más cercano abierto', delta: 'Consecuencia del cribado basado en restricciones' },
        { label: 'Selección del Más Cercano Abierto Excluida', baseline: 'Selección del más cercano abierto', delta: 'Todas EXPOSICIÓN_EXTERIOR_DEMASIADO_ALTA' },
        { label: 'Sin Alternativa Defendible', baseline: 'Alcance de 500 m', delta: '0 sobrevivientes' }
      ],
      dataIntegrityNotes:
        'INSTANTÁNEA DE INVESTIGACIÓN REPRODUCIDA: las salidas computacionales reproducen las tablas fijadas. Esto no valida en campo el campo térmico modelado.'
    },
    interpretation: {
      inferences: [
        'La representación térmica es una variable de decisión en este piloto acotado: las operacionalizaciones alternativas cambiaron 14 de 42 clasificaciones al aire libre.',
        'La elegibilidad antes de la clasificación puede cambiar qué oportunidades siguen siendo admisibles y puede preservar un estado explícito sin sobrevivientes.',
        'El resultado es una demostración de sensibilidad y trazabilidad de la decisión, no una prueba de que un método térmico sea más preciso.'
      ],
      plausibleMechanisms:
        'Las distintas operacionalizaciones térmicas codifican la exposición al calor de forma diferente; las restricciones estrictas ordenadas luego propagan esas diferencias hacia la elegibilidad de los candidatos.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO afirmar que SOLWEIG/UTCI es la verdad de campo ni que el método físico corrigió errores del proxy.',
        'NO generalizar el piloto de un solo día y ~3,5 km² a Madrid en su conjunto ni a otras estaciones del año.',
        'NO inferir comportamiento turístico, redistribución de visitantes, resultados de seguridad o de salud: ninguno fue medido.'
      ],
      unobservedVariables: [
        'Mediciones de campo de Tmrt / UTCI para la validación física.',
        'Datos observados de comportamiento de visitantes o elección de ruta.',
        'Días de estudio, estaciones y contextos de destino adicionales.'
      ],
      spatialTemporalGaps:
        'La publicación fijada es un piloto acotado en el centro de Madrid en un día de calor extremo; no es un sistema operativo en tiempo real.'
    },
    competingExplanations: [
      {
        category: 'Operacionalización del Método Térmico',
        explanation: 'Las diferencias de clasificación pueden surgir de cómo se representa el calor y se mapea en categorías de decisión.',
        reasoning: 'La comparación reproducida cambia únicamente la operacionalización del método térmico, manteniendo la arquitectura de cribado acotada.',
        investigationNeeded: 'Se necesitaría validación de campo para evaluar la precisión física, algo que este piloto no establece.'
      },
      {
        category: 'Conjunto de Restricciones del Escenario',
        explanation: 'Los resultados del conjunto de candidatos dependen de las restricciones de alcance, apertura, térmicas, de evidencia y de mejora.',
        reasoning: 'El estado sin sobrevivientes de S8 desaparece cuando se relaja la restricción de alcance, mostrando que el resultado depende de las restricciones.',
        investigationNeeded: 'Evaluar conjuntos de restricciones alternativos solo en un nuevo estudio explícitamente autorizado, sin reescribir el piloto fijado.'
      }
    ],
    confidence: {
      justification: [
        'La confianza es Alta en la reproducción computacional de los recuentos principales publicados porque la cadena comprometida regeneró las tablas y afirmaciones de figuras fijadas.',
        'Esta confianza no se extiende a la validación física del UTCI/Tmrt modelado.'
      ],
      marginOrInterval:
        'La reproducción coincidió con las salidas numéricas fijadas; la incertidumbre de validación física permanece fuera de esta afirmación.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Usar HATI como caso metodológico de apoyo a la decisión basado en elegibilidad primero, no como motor de recomendación en vivo para Madrid.',
        'Mantener separados el estado térmico, la suficiencia de la evidencia y la incertidumbre al diseñar el cribado operativo.',
        'Preservar la abstención / ausencia de alternativa defendible como una salida legítima en lugar de forzar una recomendación.'
      ],
      cautionsAndGuardrails: [
        'No desplegar el piloto fijado como recomendador operativo de cara al público sin nueva validación y datos actuales.',
        'No tratar las salidas de modelo reproducidas como confort peatonal observado.'
      ],
      policyPerspective: [
        'La contribución transferible es la arquitectura de decisión auditable, no la lista literal de candidatos de 2023.'
      ]
    },
    dataNeededNext: [
      'Validación de campo de la exposición térmica modelada si se quiere afirmar precisión física.',
      'Insumos operativos actuales si el método se adapta alguna vez a la gestión de destino en vivo.',
      'Comportamiento observado de visitantes solo si se introducen afirmaciones conductuales en un estudio separado.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Tablas de cribado fijadas de HATI-Madrid + cadena de reproducción independiente',
        spatialResolution: '27 activos; decisiones al aire libre al nivel de activo × marca temporal',
        processingLevel: 'Reproducido a partir de salidas de modelo comprometidas e insumos de datos abiertos',
        sourceAuthority: 'Repositorio RELEASE_LOCKED de HATI-Madrid / informe de reproducción'
      },
      {
        sensorOrPlatform: 'Configuración térmica SOLWEIG → Tmrt → UTCI',
        spatialResolution: 'Campo de modelo muestreado a las zonas de amortiguación de los activos',
        processingLevel: 'Derivado de modelo; no validado en campo',
        sourceAuthority: 'Capa de publicación fijada de HATI-Madrid'
      }
    ]
  },

  'madrid-hati-q2': {
    question: '¿Cambió la modificación del método térmico las clasificaciones de viabilidad turística?',
    statusHeadline:
      'Resultado Reproducido: 14 de 42 Clasificaciones al Aire Libre Cambiaron Entre Operacionalizaciones Térmicas',
    signal: {
      observation:
        'Alternar entre el proxy operativo y la configuración SOLWEIG/UTCI reclasificó 14 de 42 observaciones de activo al aire libre × marca temporal: 9 más restrictivas con la configuración física y 5 menos restrictivas.',
      spatialScope: '',
      temporalWindow: '21 de agosto de 2023 · 12:00 / 15:00 / 18:00.',
      summary: 'La divergencia entre métodos térmicos se concentró en el tiempo en lugar de ser uniforme a lo largo del día de estudio.'
    },
    evidence: {
      supportingDatasets: [
        'Tasa de reclasificación al aire libre: 33,3% (14/42).',
        'Dirección: 9 más restrictivas con el método físico; 5 menos restrictivas.',
        'Patrón por marca temporal: 12:00 = 64,3%, 15:00 = 0,0%, 18:00 = 35,7%.',
        'Las 42 observaciones al aire libre de la configuración física cayeron en VIABLE CON CONDICIONES en la configuración categórica fijada.'
      ],
      metrics: [
        { label: 'Reclasificadas', baseline: 'Proxy vs. física', delta: '' },
        { label: 'Divergencia 12:00', baseline: '14 activos al aire libre', delta: 'específica del horario' },
        { label: 'Divergencia 15:00', baseline: '14 activos al aire libre', delta: 'acuerdo categórico total' },
        { label: 'Divergencia 18:00', baseline: '14 activos al aire libre', delta: 'específica del horario' }
      ],
      dataIntegrityNotes:
        'Los valores principales se recalcularon a partir de las tablas reproducidas y coincidieron con los valores de la publicación fijada.'
    },
    interpretation: {
      inferences: [
        'La definición operativa de calor cambió las salidas categóricas de viabilidad turística en este piloto.',
        'La dirección del cambio fue mixta, por lo que el resultado no respalda una afirmación simple de que el método físico sea sistemáticamente más estricto o mejor.'
      ],
      plausibleMechanisms:
        'El proxy combina bandas de riesgo ambiental con exposición cercana por recuento de árboles, mientras que la vía física usa Tmrt y UTCI derivados de SOLWEIG; por ello, sus mapeos de categoría responden de forma diferente según el momento y el lugar.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO calificar la configuración física como más precisa o como verdad de campo sin validación en campo.',
        'NO describir la reclasificación como corrección de errores del proxy.',
        'NO afirmar mayor discriminación categórica del método físico en esta configuración fijada.'
      ],
      unobservedVariables: [
        'Mediciones térmicas in situ para la validación del modelo.',
        'Mapeos o umbrales de categoría alternativos fuera del diseño fijado.'
      ],
      spatialTemporalGaps: 'Un único día de piloto y un área de estudio acotada en el centro de Madrid.'
    },
    competingExplanations: [
      {
        category: 'Mapeo de Categorías',
        explanation: 'Parte de la divergencia refleja operacionalizaciones de extremo a extremo distintas, incluida la forma en que los valores térmicos continuos se mapean a estados de viabilidad.',
        reasoning: 'Todas las observaciones físicas al aire libre ocuparon una categoría de viabilidad, mientras que el proxy usó una banda de tres estados.',
        investigationNeeded: 'Cualquier mapeo alternativo constituiría un nuevo estudio y no debería incorporarse retroactivamente a la publicación fijada.'
      }
    ],
    confidence: {
      justification: [
        'El recuento de 14/42, la división por dirección y las tasas por marca temporal se recalcularon de forma independiente a partir de las tablas reproducidas.'
      ],
      marginOrInterval: 'Resultado descriptivo del piloto; sin inferencia poblacional.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Tratar la representación térmica como una elección de diseño explícita en los sistemas de apoyo a la decisión.',
        'Auditar si los mapeos de categoría generan cambios de decisión antes de presentar una clasificación o recomendación.'
      ],
      cautionsAndGuardrails: [
        'La sensibilidad del método no es superioridad del método.',
        'No generalizar el patrón por marca temporal más allá de este día de estudio.'
      ],
      policyPerspective: [
        'Los sistemas de decisión deben documentar cómo los indicadores ambientales se convierten en estados de elegibilidad operativa.'
      ]
    },
    dataNeededNext: [
      'Validación de campo si se compara precisión física en lugar de sensibilidad de decisión.',
      'Replicación en días / destinos adicionales antes de discutir la generalización.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'phase2_asset_thermal_exposure.csv reproducido',
        spatialResolution: '14 activos al aire libre × 3 marcas temporales',
        processingLevel: 'Comparación descriptiva reproducida',
        sourceAuthority: 'HATI-Madrid RELEASE_LOCKED'
      }
    ]
  },

  'madrid-hati-q3': {
    question:
      '¿Cambió el cribado basado en restricciones el conjunto de candidatos frente a la línea base del más cercano abierto?',
    statusHeadline: 'Resultado Reproducido: el Conjunto de Candidatos Cambió en 7 de 8 Escenarios',
    signal: {
      observation:
        'Frente a un comparador de solo proximidad al más cercano abierto, el conjunto de candidatos basado en restricciones cambió en 7 de 8 escenarios preregistrados.',
      spatialScope: '',
      temporalWindow: 'Ocho escenarios fijados el 21 de agosto de 2023.',
      summary:
        'La arquitectura de cribado excluyó la selección de la línea base del más cercano abierto en 3 de 8 escenarios, eliminó 23 opciones abiertas dentro del radio por motivos térmicos/de evidencia, y preservó un estado explícito sin sobrevivientes en S8.'
    },
    evidence: {
      supportingDatasets: [
        '7/8 escenarios cambiaron el conjunto de candidatos frente al más cercano abierto.',
        '3/8 selecciones del más cercano abierto fueron excluidas; las tres exclusiones fueron EXPOSICIÓN_EXTERIOR_DEMASIADO_ALTA bajo la cadena de reglas fijada.',
        '23 candidatos abiertos dentro del radio fueron eliminados por las restricciones térmicas/de evidencia a lo largo de los escenarios.',
        'S8 devolvió SIN_ALTERNATIVA_DEFENDIBLE a un alcance de 500 m; a 800 m existían dos alternativas y a 1200 m existían siete.'
      ],
      metrics: [
        { label: 'Conjunto de Candidatos Modificado', baseline: 'Más cercano abierto', delta: 'Basado en restricciones' },
        { label: 'Selección de Línea Base Excluida', baseline: 'Selección del más cercano abierto', delta: 'Restricción térmica' },
        { label: 'Candidatos Eliminados', baseline: 'Antes de las restricciones térmicas/de evidencia', delta: 'Eliminados' },
        { label: 'Sobrevivientes de S8 a 500 m', baseline: 'Alcance de 500 m', delta: 'SIN_ALTERNATIVA_DEFENDIBLE' }
      ],
      dataIntegrityNotes:
        'El resultado se compara contra una línea base mínima de solo proximidad al más cercano abierto; no es evidencia de superioridad sobre todos los sistemas de decisión conscientes del calor.'
    },
    interpretation: {
      inferences: [
        'Las restricciones de elegibilidad ordenadas pueden alterar materialmente el conjunto de candidatos frente a una heurística del más cercano abierto.',
        'La arquitectura puede abstenerse cuando ningún candidato satisface las restricciones activas.',
        'El resultado sin sobrevivientes está explícitamente condicionado por las restricciones, no es una afirmación de que no existiera ninguna alternativa en general.'
      ],
      plausibleMechanisms:
        'Las restricciones de apertura, alcance, viabilidad térmica, suficiencia de evidencia y mejora se evalúan antes de cualquier clasificación entre los sobrevivientes.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO afirmar superioridad algorítmica sobre otros sistemas conscientes del calor a partir del resultado 7/8.',
        'NO describir S8 como prueba de que no existía alternativa en Madrid; está condicionado a la restricción de 500 m.',
        'NO tratar el comparador del más cercano abierto como un sistema competidor de última generación.'
      ],
      unobservedVariables: [
        'Preferencias del usuario y respuesta conductual.',
        'Arquitecturas de decisión operativa alternativas no probadas en el estudio fijado.'
      ],
      spatialTemporalGaps: 'Ocho escenarios diseñados en un día de estudio.'
    },
    competingExplanations: [
      {
        category: 'Definición de Restricciones',
        explanation: 'Las diferencias del conjunto de candidatos se producen por la secuencia y los umbrales fijados particulares.',
        reasoning: 'La arquitectura está intencionalmente basada en restricciones primero; cambiar los umbrales o el alcance cambia la admisibilidad.',
        investigationNeeded: 'La sensibilidad a restricciones operativas alternativas requeriría un nuevo análisis autorizado.'
      }
    ],
    confidence: {
      justification: [
        'Las salidas de escenario, la comparación con la línea base, los recuentos de exclusión y la sensibilidad de accesibilidad se reprodujeron a partir de insumos comprometidos.'
      ],
      marginOrInterval: 'Resultado descriptivo del escenario; el alcance del comparador es deliberadamente estrecho.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Separar la elegibilidad de los candidatos de la clasificación en cualquier futura implementación operativa.',
        'Registrar un motivo de fallo inicial legible por máquina para cada exclusión.',
        'Permitir un estado explícito de sin alternativa defendible cuando las restricciones eliminen todos los candidatos.'
      ],
      cautionsAndGuardrails: [
        'No forzar una recomendación de menor mal simplemente porque una interfaz de clasificación espera una.',
        'Indicar el comparador y el conjunto de restricciones siempre que se reporten consecuencias del cribado.'
      ],
      policyPerspective: [
        'La abstención transparente es una característica de gobernanza, no un fallo del sistema.'
      ]
    },
    dataNeededNext: [
      'Requisitos operativos de las partes interesadas antes de traducir la arquitectura de investigación en un sistema en vivo.',
      'Insumos actuales de apertura, acceso y térmicos para cualquier despliegue real.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'phase3_scenarios.csv + phase3_hati_vs_baseline.csv + sensibilidad de accesibilidad, reproducidos',
        spatialResolution: 'Nivel de escenario-candidato',
        processingLevel: 'Cribado basado en restricciones reproducido',
        sourceAuthority: 'HATI-Madrid RELEASE_LOCKED'
      }
    ]
  },

  'madrid-hati-q4': {
    question: '¿Qué tan robustas fueron las decisiones de HATI bajo la incertidumbre probada?',
    statusHeadline:
      'Resultado Reproducido: 35 ROBUSTAS, 6 LIMÍTROFES, 1 INESTABLE Bajo las Dimensiones de Incertidumbre Probadas',
    signal: {
      observation:
        'La confianza de decisión en las 42 filas de activo al aire libre × marca temporal fue de 35 ROBUSTAS, 6 LIMÍTROFES y 1 INESTABLE bajo las dimensiones de incertidumbre específicas probadas en el piloto fijado.',
      spatialScope: '',
      temporalWindow: '21 de agosto de 2023 · tres marcas temporales.',
      summary:
        'Una realización de irradiancia derivada de satélite cambió 1 de 42 decisiones; las perturbaciones de irradiancia de ±10% y ±20% no cambiaron ninguna.'
    },
    evidence: {
      supportingDatasets: [
        'La tabla de confianza de decisión se reprodujo exactamente a nivel estructural/numérico.',
        'ROBUSTA / LIMÍTROFE / INESTABLE = 35 / 6 / 1.',
        '1/42 decisión cambió bajo la realización de irradiancia derivada de satélite.',
        'Ninguna decisión cambió bajo las perturbaciones de irradiancia de ±10% y ±20% probadas.'
      ],
      metrics: [
        { label: 'ROBUSTAS', baseline: '42 filas al aire libre', delta: 'solo dimensiones probadas' },
        { label: 'LIMÍTROFES', baseline: '42 filas al aire libre', delta: 'cerca del límite de decisión' },
        { label: 'INESTABLE', baseline: '42 filas al aire libre', delta: 'A24 · 18:00' },
        { label: 'Cambios por Realización Satelital', baseline: 'realización de referencia', delta: '' }
      ],
      dataIntegrityNotes:
        'ROBUSTA significa estable bajo las dimensiones de incertidumbre probadas; no significa precisa, validada o certera.'
    },
    interpretation: {
      inferences: [
        'La mayoría de las decisiones categóricas fueron estables bajo las dimensiones de incertidumbre realmente probadas.',
        'Al menos una decisión cruzó el límite de seguridad crítico, demostrando que las etiquetas de incertidumbre tienen relevancia para la decisión.'
      ],
      plausibleMechanisms:
        'El forzamiento solar y las perturbaciones específicas de geometría de dosel desplazan los valores de UTCI derivados de modelo respecto a los umbrales de decisión fijados.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO traducir ROBUSTA como validada o físicamente precisa.',
        'NO dar a entender que se probaron todas las fuentes de incertidumbre relevantes.',
        'NO usar la distribución de estabilidad como probabilidad de corrección.'
      ],
      unobservedVariables: [
        'Error de medición de campo, porque no existe validación de campo de Tmrt/UTCI.',
        'Fuentes de incertidumbre no modeladas fuera de las perturbaciones solares y de geometría específica probadas.'
      ],
      spatialTemporalGaps: 'El análisis de incertidumbre está acotado a las realizaciones fijadas y al piloto de un solo día.'
    },
    competingExplanations: [
      {
        category: 'Error de Modelo No Probado',
        explanation: 'Una decisión puede permanecer estable bajo las perturbaciones probadas y aun así estar sesgada por errores de modelo o de insumo no probados.',
        reasoning: 'La estabilidad no equivale a validez externa.',
        investigationNeeded: 'Comparar los campos térmicos modelados con mediciones in situ calibradas.'
      }
    ],
    confidence: {
      justification: [
        'Las etiquetas de estabilidad y los recuentos de sensibilidad se reprodujeron a partir de tablas comprometidas y afirmaciones de figuras.'
      ],
      marginOrInterval: 'Alta confianza en la clasificación de estabilidad reproducida; sin afirmación de validación física.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Exponer el estado de incertidumbre junto al estado térmico en lugar de ocultarlo dentro de una puntuación.',
        'Tratar los casos LIMÍTROFES e INESTABLES como candidatos para evidencia adicional o abstención.'
      ],
      cautionsAndGuardrails: [
        'No presentar ROBUSTA como precisión certificada.',
        'Mantener la frase "dimensiones de incertidumbre probadas" junto al resultado.'
      ],
      policyPerspective: [
        'Las interfaces de apoyo a la decisión deben distinguir la estabilidad bajo perturbación de la validación empírica.'
      ]
    },
    dataNeededNext: [
      'Mediciones de campo calibradas para la validación externa.',
      'Dimensiones de incertidumbre adicionales si el método se opera más allá del piloto fijado.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'phase2_2_decision_confidence.csv reproducido',
        spatialResolution: 'Activo × marca temporal',
        processingLevel: 'Envolvente de incertidumbre y estabilidad de decisión reproducidas',
        sourceAuthority: 'HATI-Madrid RELEASE_LOCKED'
      }
    ]
  },

  'madrid-hati-q5': {
    question: '¿Demostró HATI que los turistas cambiaron su comportamiento debido al calor?',
    statusHeadline:
      'Techo de Evidencia: HATI No Midió el Comportamiento, la Redistribución ni los Resultados de los Turistas',
    signal: {
      observation:
        'El piloto reproducido de HATI contiene salidas de método térmico, activos, cribado, escenarios e incertidumbre. No contiene comportamiento turístico observado ni resultados de elección de ruta.',
      spatialScope: '',
      temporalWindow: 'Piloto fijado del 21 de agosto de 2023.',
      summary: 'La causalidad conductual está fuera de la evidencia recopilada por el estudio.'
    },
    evidence: {
      supportingDatasets: [
        'El registro canónico de estado de HATI declara explícitamente que no se mide ni se afirma ningún comportamiento, sustitución o resultado turístico.',
        'La cadena de reproducción regenera tablas térmicas y de cribado, no datos de seguimiento peatonal ni de respuesta de visitantes.',
        'La posterior extensión de ruta peatonal también terminó en ABSTENCIÓN / SIN DIFERENCIA ROBUSTA y no estableció un cambio conductual observado.'
      ],
      metrics: [
        { label: 'Datos de Comportamiento Observado', baseline: 'Requerido para afirmación conductual', delta: 'No medido' },
        { label: 'Causalidad Conductual', baseline: 'Diseño de resultado observado', delta: 'Fuera del techo de la afirmación' },
        { label: 'Reproducción Térmica / de Cribado', baseline: 'Tablas fijadas', delta: 'Dominio de evidencia separado' }
      ],
      dataIntegrityNotes:
        'Esta es una declaración verificada de ausencia de evidencia / techo de la afirmación, no una afirmación de que el calor nunca afecte el comportamiento turístico.'
    },
    interpretation: {
      inferences: [
        'HATI puede respaldar afirmaciones sobre sensibilidad de decisión y salidas de cribado.',
        'HATI no puede respaldar afirmaciones de que los turistas evitaron, seleccionaron o cambiaron rutas debido al calor.'
      ],
      plausibleMechanisms:
        'El calor puede influir en el comportamiento en la realidad, pero este proyecto no recopiló la evidencia conductual observada necesaria para probar ese mecanismo.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO afirmar que HATI observó a turistas evitando calles calurosas.',
        'NO afirmar que los flujos de visitantes fueron redistribuidos por el sistema de cribado.',
        'NO inferir resultados de seguridad, salud, gasto o satisfacción a partir de la exposición térmica modelada.'
      ],
      unobservedVariables: [
        'Elección de ruta observada.',
        'Clasificación turista/residente.',
        'Motivación declarada y percepción térmica.',
        'Comportamiento contrafactual bajo condiciones comparables sin calor.'
      ],
      spatialTemporalGaps: 'Los resultados conductuales estaban fuera del diseño del piloto fijado.'
    },
    competingExplanations: [
      {
        category: 'Respuesta Conductual',
        explanation: 'La evitación relacionada con el calor es un mecanismo plausible en el mundo real, pero no fue probado por HATI.',
        reasoning: 'La exposición térmica modelada y la elegibilidad de candidatos cribados no son observaciones conductuales.',
        investigationNeeded: 'Recopilar datos de movilidad consentida / encuesta de intercepción bajo un diseño de estudio conductual dedicado.'
      }
    ],
    confidence: {
      justification: [
        'La confianza es Alta en la declaración del techo de evidencia porque el estado canónico del proyecto y el diseño de investigación fijado excluyen explícitamente las afirmaciones conductuales.'
      ],
      marginOrInterval: 'No existe una estimación de efecto conductual.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Usar HATI para demostrar una arquitectura de cribado consciente de la evidencia, no la predicción de respuesta de visitantes.',
        'Encargar un estudio conductual separado antes de hacer afirmaciones sobre la adaptación de los turistas al calor.'
      ],
      cautionsAndGuardrails: [
        'La ausencia de evidencia conductual no es evidencia de ausencia de efecto conductual.',
        'Mantener la exposición derivada de modelo, las salidas de decisión y el comportamiento humano observado como capas de evidencia separadas.'
      ],
      policyPerspective: [
        'La adaptación turística operativa debe distinguir el cribado de riesgo basado en modelo del comportamiento verificado de los visitantes.'
      ]
    },
    dataNeededNext: [
      'Datos observados de elección de ruta o destino peatonal recopilados con las salvaguardas de privacidad adecuadas.',
      'Datos de exposición meteorológica / térmica emparejados.',
      'Un diseño causal o cuasiexperimental capaz de separar los efectos del calor de los factores de confusión de hora del día, horario de apertura y propósito del viaje.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Techo de la afirmación de PROJECT_STATUS.md de HATI-Madrid + cadena de cribado reproducida',
        spatialResolution: 'Auditoría de evidencia a nivel de proyecto',
        processingLevel: 'Verificación del techo de evidencia',
        sourceAuthority: 'Registro de estado canónico de HATI-Madrid'
      }
    ]
  },

  'guadarrama-snto-q1': {
    question: '¿Qué muestra actualmente la evidencia real de SNTO en todo el PNSG?',
    statusHeadline:
      'Evidencia Real de Sentinel-2: las Tendencias de los Activos del PNSG Están Dominadas por la Estabilidad o el Reverdecimiento',
    signal: {
      observation:
        'En 21 activos reales de campaña del PNSG con series temporales de Sentinel-2 de 2021-01 a 2026-06, 6 muestran reverdecimiento NDVI significativo, 14 no muestran tendencia NDVI significativa y 1 muestra un declive significativo.',
      spatialScope: '21 activos de campaña en todo el Parque Nacional de la Sierra de Guadarrama.',
      temporalWindow: '',
      summary:
        'La señal real de teledetección dominante es la estabilidad o el reverdecimiento, no un declive generalizado. La única señal NDVI en declive significativo ocurre en Maliciosa-Porrones y va acompañada de un NDMI en aumento significativo.'
    },
    evidence: {
      supportingDatasets: [
        'Observaciones mensuales reales de Sentinel-2 SR Harmonized para 21 activos del PNSG.',
        'Series derivadas de NDVI / NDMI / EVI con 60–66 observaciones mensuales por activo.',
        'Análisis de tendencia Mann–Kendall desestacionalizado y pendiente de Sen comprometidos en el repositorio de SNTO.',
        'El informe de evidencia de decisión para uso público registra el techo actual de la afirmación L5a y la ausencia de evidencia de uso por visitantes y de validación de campo.'
      ],
      metrics: [
        { label: 'Reverdecimiento NDVI Significativo', baseline: '21 activos de serie temporal', delta: 'tendencia real derivada' },
        { label: 'Sin Tendencia NDVI Significativa', baseline: '21 activos de serie temporal', delta: 'resultado dominante' },
        { label: 'Declive NDVI Significativo', baseline: '21 activos de serie temporal', delta: 'Maliciosa-Porrones' },
        { label: 'Serie de Uso por Visitantes', baseline: 'Requerido para la atribución de presión', delta: 'EVIDENCIA INSUFICIENTE' }
      ],
      dataIntegrityNotes:
        'OBSERVACIONES REALES + INDICADORES DERIVADOS: el cambio ambiental se observa a distancia; la presión turística, la condición ecológica y el impacto causal no están establecidos.'
    },
    interpretation: {
      inferences: [
        'La señal ambiental real no respalda una narrativa de deterioro de la vegetación en todo el parque a través de los activos monitoreados.',
        'Maliciosa-Porrones merece monitoreo porque es el único activo con una tendencia NDVI en declive significativo en esta serie de 21 activos.',
        'La evidencia puede priorizar la investigación, pero no puede identificar al turismo como la causa de ningún cambio.'
      ],
      plausibleMechanisms:
        'Las tendencias observadas de índices de vegetación pueden reflejar clima, fenología, sucesión, incendios, gestión, efectos de geometría / píxel mixto o mecanismos relacionados con los visitantes; la evidencia actual no resuelve la atribución.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO etiquetar la señal de Sentinel-2 como presión turística o impacto turístico.',
        'NO afirmar validación de campo ecológica o del estado del sendero; el Issue #26 no se ha ejecutado.',
        'NO inferir el volumen de visitantes en ningún activo o sendero: no se ingiere ninguna serie real de uso por visitantes a escala de activo/sendero.',
        'NO generalizar los 21 activos heterogéneos de campaña como una muestra representativa de todos los senderos del PNSG.'
      ],
      unobservedVariables: [
        'Recuentos reales de visitantes o registros de acceso a escala de activo/sendero.',
        'Observaciones de campo calificadas del estado del sendero y ecológico.',
        'Controles causales capaces de separar la actividad de los visitantes del clima y otros factores ambientales.'
      ],
      spatialTemporalGaps:
        'Los 21 activos incluyen puntos, polígonos, líneas y reservas de conservación con distinta calidad de ajuste espacial; 2026 es un año parcial en la serie temporal.'
    },
    competingExplanations: [
      {
        category: 'Factores Ambientales / Fenológicos',
        explanation: 'La variabilidad climática, la sequía, la fenología, la sucesión, las perturbaciones y la gestión del territorio pueden alterar el NDVI y el NDMI.',
        reasoning: 'Sentinel-2 observa el estado de la superficie, no la causa de ese estado.',
        investigationNeeded: 'Añadir contexto climático / de perturbaciones emparejado y continuar la serie temporal antes de hacer afirmaciones de atribución.'
      },
      {
        category: 'Efectos de Ajuste Espacial',
        explanation: 'Las huellas de puntos, líneas y escalada rocosa pueden mezclar la superficie utilizada con la vegetación circundante.',
        reasoning: 'El informe de decisión de SNTO identifica explícitamente el ajuste heterogéneo de la huella como un techo de la afirmación.',
        investigationNeeded: 'Usar validación de campo y observaciones de mayor resolución donde importe la interpretación a escala de activo.'
      }
    ],
    confidence: {
      justification: [
        'La confianza es Alta en la afirmación descriptiva acotada de que 6 activos reverdecieron significativamente, 14 no mostraron tendencia NDVI significativa y 1 declinó significativamente, porque estos valores se derivan de la serie real comprometida de Sentinel-2.',
        'La confianza en la atribución causal sigue siendo Baja porque falta la evidencia de uso por visitantes y de validación de campo.'
      ],
      marginOrInterval: 'Confianza específica de la afirmación: alta para la distribución de tendencias; sin estimación de efecto causal.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Usar la señal ambiental para enfocar la atención de monitoreo, no para prescribir una intervención restrictiva.',
        'Mantener Maliciosa-Porrones en una lista corta de monitoreo / inspección de campo.',
        'Tratar la estabilidad / reverdecimiento como evidencia en contra de fabricar una prioridad de degradación donde no existe una señal adversa.'
      ],
      cautionsAndGuardrails: [
        'Ningún cierre, cupo, restauración o compromiso presupuestario se deriva de la evidencia actual de Sentinel-2 por sí sola.',
        'El cambio ambiental debe mantenerse separado de la atribución de presión de visitantes.'
      ],
      policyPerspective: [
        'El techo actual del producto es L5a: recomendación de monitoreo / inspección con incertidumbre explícita.'
      ]
    },
    dataNeededNext: [
      'Evidencia real de uso por visitantes a una unidad espacial adecuada a la decisión.',
      'Ejecución del protocolo de validación de campo (#26) por personal calificado.',
      'Observaciones continuas de Sentinel-2 para probar la persistencia de la señal de Maliciosa-Porrones.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Serie de campaña Sentinel-2 SR Harmonized',
        spatialResolution: 'Huella por activo; geometría mixta',
        processingLevel: 'Fuente de reflectancia de superficie observada',
        sourceAuthority: 'Repositorio público de SNTO / exportación de campaña de Google Earth Engine'
      },
      {
        sensorOrPlatform: 'NDVI / NDMI + Mann–Kendall desestacionalizado / pendiente de Sen',
        spatialResolution: 'Por activo de campaña',
        processingLevel: 'Tendencia ambiental derivada',
        sourceAuthority: 'Artefacto de análisis de tendencia comprometido de SNTO'
      }
    ]
  },

  'guadarrama-snto-q2': {
    question: '¿Demuestra el descenso del NDVI en Maliciosa-Porrones un impacto causado por el turismo?',
    statusHeadline:
      'EVIDENCIA INSUFICIENTE: una Tendencia NDVI Real en Declive No Establece un Impacto Turístico',
    signal: {
      observation:
        'Maliciosa-Porrones es el único de los 21 activos de campaña con una tendencia NDVI en declive significativo (τ = -0,369, p ≈ 0; n = 65), con un punto de cambio significativo alrededor de marzo de 2025.',
      spatialScope: 'Huella del activo de la Escuela de escalada Maliciosa-Porrones.',
      temporalWindow: 'Serie mensual de Sentinel-2, 2021-01 a 2026-06.',
      summary:
        'La señal de cambio ambiental es real y estadísticamente significativa dentro del análisis comprometido, pero la atribución a la escalada, el turismo o el pisoteo de visitantes no está respaldada.'
    },
    evidence: {
      supportingDatasets: [
        'NDVI: tendencia decreciente significativa, τ = -0,369, p ≈ 0, n = 65.',
        'NDMI: tendencia creciente significativa, τ = +0,215, p = 0,0114, lo que crea una historia internamente contradictoria de desecación / pisoteo simple.',
        'El NDVI medio anual en el artefacto de tendencia comprometido disminuye de aproximadamente 0,234 en 2021 a 0,213 en el año parcial 2026.',
        'No existe una serie real de uso por visitantes ni una campaña de estado de campo completada para este activo.'
      ],
      metrics: [
        { label: 'Tendencia NDVI', baseline: 'Sin tendencia monótona', delta: 'descenso significativo' },
        { label: 'Valor p del NDVI', baseline: '0,05', delta: 'significativo' },
        { label: 'Tendencia NDMI', baseline: 'Sin tendencia monótona', delta: 'aumento significativo' },
        { label: 'Evidencia de Uso por Visitantes', baseline: 'Necesaria para la atribución turística', delta: 'faltante' }
      ],
      dataIntegrityNotes:
        'SEÑAL SATELITAL REAL; TENDENCIA DERIVADA. El polígono cubre terreno rocoso, la línea base de NDVI es baja y ninguna observación de campo verifica la degradación o el impacto de los visitantes.'
    },
    interpretation: {
      inferences: [
        'Existe una señal persistente de cambio de vegetación por teledetección que merece monitoreo / una revisión de campo focalizada.',
        'La combinación de NDVI en declive y NDMI en aumento va en contra de una historia simplista de un solo mecanismo.',
        'Ninguna evidencia identifica actualmente al turismo como el factor causal.'
      ],
      plausibleMechanisms:
        'Las posibles explicaciones incluyen composición de la vegetación / fenología, variabilidad climática, geometría de la superficie / efectos de píxel mixto, gestión del territorio, perturbaciones o efectos localizados de visitantes; ninguna está establecida como la causa.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO afirmar que los escaladores o turistas causaron el descenso del NDVI.',
        'NO calificar el área como ecológicamente degradada sin evidencia de campo calificada.',
        'NO inferir un cierre, cupo, proyecto de restauración o presupuesto a partir de esta señal.',
        'NO tratar la significancia estadística de una tendencia como significancia causal.'
      ],
      unobservedVariables: [
        'Recuentos de visitantes a escala de activo y patrón temporal de uso.',
        'Observaciones de campo de cobertura vegetal, erosión, ensanchamiento del sendero o compactación.',
        'Controles ambientales emparejados e historial de perturbaciones.'
      ],
      spatialTemporalGaps:
        'El polígono de escalada es un proxy vegetal tosco sobre terreno rocoso; 2026 es parcial y no se ha completado ninguna validación de satélite a campo.'
    },
    competingExplanations: [
      {
        category: 'Sensibilidad de Píxel Mixto / Superficie Rocosa',
        explanation: 'La baja cobertura vegetal de línea base puede hacer que la huella sea sensible a pequeños cambios composicionales o de escena.',
        reasoning: 'El informe de evidencia de SNTO señala explícitamente el bajo NDVI de línea base y el ajuste espacial tosco en este polígono de escalada.',
        investigationNeeded: 'Comparar imágenes de mayor resolución y observaciones repetidas sobre la misma huella.'
      },
      {
        category: 'Cambio Ambiental No Relacionado con el Turismo',
        explanation: 'El clima, la fenología, la sucesión, la gestión o las perturbaciones pueden generar la tendencia NDVI observada.',
        reasoning: 'No existe un denominador de uso por visitantes ni un diseño de atribución.',
        investigationNeeded: 'Añadir covariables ambientales y controles emparejados antes de probar cualquier hipótesis de impacto de visitantes.'
      },
      {
        category: 'Efecto Localizado de Visitantes',
        explanation: 'La escalada o la actividad de acceso es un mecanismo candidato solo si se puede demostrar exposición espacial y temporalmente emparejada.',
        reasoning: 'El repositorio actual no contiene serie de visitantes a escala de activo ni validación de estado de campo.',
        investigationNeeded: 'Ejecutar el protocolo de campo #26 y obtener una serie de uso por visitantes trazable adecuada al activo.'
      }
    ],
    confidence: {
      justification: [
        'La confianza es Alta en que existe una tendencia NDVI en declive en la serie comprometida.',
        'La confianza es Baja para cualquier atribución de impacto turístico porque no existen la exposición ni la evidencia de campo relevantes.'
      ],
      marginOrInterval: 'Existe una estimación de tendencia; no existe una estimación de efecto causal.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Mantener Maliciosa-Porrones como MONITOREAR / VACÍO DE DATOS en lugar de una prioridad de intervención.',
        'Continuar la serie de Sentinel-2 e incluir el activo en una campaña de validación de campo calificada.',
        'Adquirir evidencia de uso por visitantes solo si realmente se requiere una decisión de presión turística.'
      ],
      cautionsAndGuardrails: [
        'Ninguna acción restrictiva está justificada a partir de esta señal por sí sola.',
        'No colapsar "tendencia significativa" en "impacto turístico significativo".'
      ],
      policyPerspective: [
        'Una alerta de monitoreo defendible es la acción máxima actualmente respaldada para este activo.'
      ]
    },
    dataNeededNext: [
      'Observaciones de estado de campo calificadas bajo el protocolo #26.',
      'Datos de uso por visitantes trazables a escala de activo o un proxy adecuadamente delimitado.',
      'Observaciones de teledetección repetidas y covariables ambientales para probar la atribución.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Artefacto de tendencia Sentinel-2 SR Harmonized → NDVI / NDMI',
        spatialResolution: 'Huella del polígono de Maliciosa-Porrones',
        processingLevel: 'Tendencia derivada de observaciones reales',
        sourceAuthority: 'mk_trends_pnsg.json comprometido de SNTO'
      }
    ]
  },

  'guadarrama-snto-q3': {
    question: '¿Puede SNTO justificar el cierre de senderos o la restricción de cupos de visitantes?',
    statusHeadline:
      'Techo de Decisión L5a: la Evidencia Actual No Autoriza Cierre, Cupo, Restauración ni Compromiso Presupuestario',
    signal: {
      observation:
        'SNTO cuenta actualmente con observaciones ambientales reales y contexto de gestión, pero prácticamente sin evidencia de uso por visitantes a escala de activo o sendero y sin una campaña de validación de campo completada.',
      spatialScope: 'Planificación de uso público del PNSG.',
      temporalWindow: 'Estado actual de la evidencia en el repositorio.',
      summary:
        'El contrato del producto científico autoriza recomendaciones de monitoreo / inspección en el techo de evidencia actual, no una acción restrictiva o que compromete recursos.'
    },
    evidence: {
      supportingDatasets: [
        'La evidencia real del estado del ecosistema de Sentinel-2 alcanza la capa de monitoreo / investigación.',
        'La zonificación de protección PRUG está disponible como contexto de gestión real.',
        'La variable objetivo de presión de visitantes sigue siendo EVIDENCIA_INSUFICIENTE: no se ingiere ninguna serie real de recuento a escala de activo/sendero.',
        'La validación de campo #26 no se ha ejecutado.'
      ],
      metrics: [
        { label: 'Techo de Evidencia', baseline: 'Se requiere L5b/L6 para una acción más fuerte', delta: 'solo monitorear / inspeccionar' },
        { label: 'Recuentos de Visitantes a Nivel de Sendero', baseline: 'Requerido para la variable objetivo de presión', delta: 'faltante' },
        { label: 'Validación de Campo', baseline: 'Requerida para afirmaciones de condición validadas', delta: 'no ejecutada' },
        { label: 'Prioridades de Intervención de Uso Público', baseline: 'Revisión proporcional a la evidencia', delta: 'ninguna respaldada' }
      ],
      dataIntegrityNotes:
        'La ausencia de autorización es un límite científico, no una recomendación de que la gestión nunca deba actuar usando otra evidencia institucional.'
    },
    interpretation: {
      inferences: [
        'SNTO puede señalar señales ambientales para monitoreo / inspección.',
        'SNTO no puede justificar actualmente cierres, cupos, presupuestos de restauración o afirmaciones de eficacia de la intervención.',
        'Una señal ambiental real no llena los vínculos faltantes de presión de visitantes y validación de campo.'
      ],
      plausibleMechanisms:
        'Las decisiones restrictivas de uso público requieren una cadena de evidencia más fuerte que la sola observación del estado del ecosistema.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO recomendar cierre o cupo a partir de la evidencia de Sentinel-2 por sí sola.',
        'NO convertir el contexto de movilidad municipal en afluencia a nivel de sendero.',
        'NO presentar los campos heredados de presupuesto/prioridad por sendero como recomendaciones de decisión.',
        'NO afirmar eficacia o resultado regenerativo.'
      ],
      unobservedVariables: [
        'Serie real de la variable objetivo de presión de visitantes.',
        'Registros completos de respuesta de gestión.',
        'Validación de campo y evidencia comparativa requerida para niveles de afirmación más altos.'
      ],
      spatialTemporalGaps:
        'La evidencia ambiental local más sólida y la evidencia faltante de uso por visitantes existen en escalas de decisión diferentes.'
    },
    competingExplanations: [
      {
        category: 'Evidencia de Gestión Fuera de SNTO',
        explanation: 'Las autoridades del parque pueden poseer otra evidencia operativa no representada en este repositorio.',
        reasoning: 'El prototipo solo puede autorizar afirmaciones a partir de la evidencia que realmente contiene.',
        investigationNeeded: 'Integrar explícitamente la evidencia de gestión oficial antes de cambiar el techo de decisión.'
      }
    ],
    confidence: {
      justification: [
        'La confianza es Alta en el techo de afirmación actual porque está explícitamente codificado en el contrato de producto científico y la matriz de evidencia-decisión de SNTO.'
      ],
      marginOrInterval: 'Límite de autorización, no una estimación probabilística.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Usar SNTO para priorizar el monitoreo / inspección donde la evidencia ambiental justifique atención.',
        'Requerir evidencia adicional antes de cualquier recomendación restrictiva o que comprometa recursos.',
        'Preservar "evidencia insuficiente para priorizar" como un resultado de decisión legítimo.'
      ],
      cautionsAndGuardrails: [
        'No usar la presión de la interfaz del producto para forzar una lista de intervención clasificada.',
        'No elevar silenciosamente la evidencia satelital REAL a impacto ecológico validado.'
      ],
      policyPerspective: [
        'La acción restrictiva permanece fuera del techo de evidencia actual de SNTO.'
      ]
    },
    dataNeededNext: [
      'Evidencia de uso público trazable a la escala espacial relevante.',
      'Validación de campo #26.',
      'Si se desean afirmaciones de eficacia: registros completos de intervención, evidencia antes/después y un comparador / contrafactual.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Contrato de Producto Científico de SNTO + Matriz Evidencia→Decisión',
        spatialResolution: 'Gobernanza de la afirmación a nivel de producto',
        processingLevel: 'Autorización de uso para la decisión',
        sourceAuthority: 'Contrato científico canónico de SNTO'
      }
    ]
  },

  'guadarrama-snto-q4': {
    question: '¿Qué respalda realmente la capa OAPN de 218 senderos?',
    statusHeadline:
      'Cartografía Real × Sentinel-2 Real: Alerta Temprana Estacional Útil, No una Clasificación de Presión Turística',
    signal: {
      observation:
        'La capa Pipeline-A del PNSG combina la geometría oficial de OAPN para 218 senderos con una señal ambiental de dos escenas de Sentinel-2 y la zonificación PRUG.',
      spatialScope: '218 geometrías oficiales de senderos del PNSG.',
      temporalWindow: 'Comparación estacional de dos escenas, no una serie temporal multianual por sendero.',
      summary:
        'A nivel agregado, 165 senderos se clasifican como en mejora y 46 como en empeoramiento en la señal ambiental estacional. La capa no contiene evidencia de uso por visitantes a nivel de sendero.'
    },
    evidence: {
      supportingDatasets: [
        'Cartografía oficial de senderos OAPN para 218 senderos.',
        'Señal ambiental estacional real de Sentinel-2 (EHS / ΔEHS).',
        'Zonificación de gestión PRUG oficial por sendero.',
        'El informe de evidencia de decisión separa explícitamente esta capa de la serie temporal multianual de 21 activos.'
      ],
      metrics: [
        { label: 'Senderos OAPN Oficiales', baseline: 'Capa completa mapeada', delta: 'geometría oficial' },
        { label: 'Señal Estacional en Mejora', baseline: 'ΔEHS de dos escenas', delta: 'señal ambiental' },
        { label: 'Señal Estacional en Empeoramiento', baseline: 'ΔEHS de dos escenas', delta: 'señal ambiental' },
        { label: 'Presión de Visitantes a Nivel de Sendero', baseline: 'Requerida para la clasificación de presión', delta: 'no respaldada' }
      ],
      dataIntegrityNotes:
        'CARTOGRAFÍA REAL × SEÑAL SATELITAL REAL. Solo alerta temprana estacional; los campos heredados derivados de presupuesto/prioridad no están autorizados como recomendaciones de gestión.'
    },
    interpretation: {
      inferences: [
        'La capa de senderos puede respaldar el monitoreo ambiental y la planificación de inspección consciente del PRUG.',
        'No puede respaldar una clasificación de presión turística sendero por sendero porque el uso por visitantes no se mide a escala de sendero.',
        'Un cambio estacional de dos escenas no equivale a una tendencia multianual.'
      ],
      plausibleMechanisms:
        'Los cambios en la señal ambiental pueden reflejar dinámicas estacionales de la vegetación y otros factores no turísticos.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO llamar al ΔEHS en empeoramiento "degradación turística".',
        'NO presentar la capa como un mapa de afluencia de visitantes.',
        'NO mostrar el presupuesto_eur ni el índice_prioridad heredados por sendero como recomendaciones.',
        'NO tratar la señal de dos escenas como una tendencia a largo plazo.'
      ],
      unobservedVariables: [
        'Recuentos de visitantes a nivel de sendero.',
        'Mediciones de campo del estado del sendero.',
        'Series de tendencia multianual por sendero para los 218 senderos.'
      ],
      spatialTemporalGaps: 'El estado ambiental está localizado por sendero, pero la exposición de uso público no lo está.'
    },
    competingExplanations: [
      {
        category: 'Variabilidad Ambiental Estacional',
        explanation: 'Las diferencias de dos escenas pueden reflejar condiciones ambientales estacionales o específicas de la escena.',
        reasoning: 'La capa de 218 senderos es explícitamente una capa de alerta temprana estacional en lugar de una serie temporal larga.',
        investigationNeeded: 'Ampliar la cobertura temporal antes de interpretar la persistencia.'
      }
    ],
    confidence: {
      justification: [
        'La confianza es Alta en la existencia y el alcance de la capa ambiental de 218 senderos y sus recuentos agregados; la confianza no se transfiere a la atribución de presión turística.'
      ],
      marginOrInterval: 'Resumen descriptivo de la capa; sin estimación de efecto de presión de visitantes.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Usar la capa para organizar el seguimiento ambiental por sendero y zona PRUG.',
        'Combinarla con evidencia real de uso público solo cuando dicha evidencia exista a una escala compatible.'
      ],
      cautionsAndGuardrails: [
        'No clasificar senderos por impacto turístico a partir de la señal ambiental por sí sola.',
        'Mantener separadas las superficies de evidencia estacional y multianual.'
      ],
      policyPerspective: [
        'La capa es una ayuda de alerta temprana y monitoreo, no un asignador automático de intervenciones.'
      ]
    },
    dataNeededNext: [
      'Evidencia de visitantes a nivel de sendero/acceso donde sea operativamente viable.',
      'Observaciones ambientales repetidas para establecer persistencia.',
      'Evidencia de estado de campo para cualquier afirmación de impacto sobre el terreno.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Cartografía de senderos OAPN × Pipeline A de Sentinel-2',
        spatialResolution: 'Por geometría oficial de sendero',
        processingLevel: 'Capa de alerta temprana ambiental derivada',
        sourceAuthority: 'Pipeline A del PNSG de SNTO'
      }
    ]
  },

  'guadarrama-snto-q5': {
    question: '¿Qué evidencia falta antes de que sea posible la atribución de presión turística?',
    statusHeadline:
      'Vacío de Evidencia: Existe el Estado Ambiental Real, pero Sigue Faltando el Objetivo de Presión Turística',
    signal: {
      observation:
        'SNTO tiene observaciones ambientales reales pero ninguna serie objetivo de presión de visitantes trazable a escala de activo/sendero y ninguna campaña de validación de campo completada.',
      spatialScope: 'Arquitectura de evidencia del PNSG.',
      temporalWindow: 'Inventario de evidencia actual.',
      summary:
        'El vínculo faltante no es más imágenes satelitales por sí solas; es evidencia que mida el uso público a la escala de decisión y valide la condición física sobre el terreno.'
    },
    evidence: {
      supportingDatasets: [
        'No existen contadores, registros de control de acceso, series de ocupación de aparcamiento, encuestas ni movilidad ingerida a escala de activo/sendero.',
        'El cruce de datos de MITMA existe solo como contexto municipal y su instantánea no se genera; incluso si se ingiriera, no se convertiría en afluencia de sendero.',
        'La validación de campo #26 no se ha ejecutado.',
        'La evidencia de respuesta de gestión está incompleta para el razonamiento de eficacia.'
      ],
      metrics: [
        { label: 'Objetivo de Presión de Visitantes', baseline: 'Serie real de activo/parque', delta: 'EVIDENCIA INSUFICIENTE' },
        { label: 'Validación de Campo', baseline: 'Requerida para condición confirmada en campo', delta: 'compuerta estricta' },
        { label: 'Registro de Respuesta de Gestión', baseline: 'Necesario para la eficacia', delta: 'L6 bloqueado' },
        { label: 'Techo Actual', baseline: 'monitorear / inspeccionar', delta: 'causalidad bloqueada' }
      ],
      dataIntegrityNotes:
        'FALTANTE ≠ CERO y FALTANTE ≠ SEGURO. El producto representa explícitamente la evidencia ausente en lugar de sustituir un proxy como si fuera el objetivo.'
    },
    interpretation: {
      inferences: [
        'El vacío prioritario es un problema de medición, no un problema de generación por IA.',
        'La movilidad municipal puede aportar contexto macro, pero no puede satisfacer el objetivo de presión de visitantes a nivel de sendero.',
        'La validación de satélite a campo es necesaria antes de afirmaciones de condición confirmada en campo o de impacto causal.'
      ],
      plausibleMechanisms:
        'Un futuro diseño de atribución necesitaría exposición de visitantes, estado ambiental, condición de campo y tratamiento de factores de confusión alineados temporalmente.'
    },
    evidenceLimit: {
      strictlyForbiddenInferences: [
        'NO usar trazas de rutas digitales como recuentos directos de visitantes sin una relación de calibración validada.',
        'NO sustituir la movilidad municipal por la afluencia del sendero.',
        'NO tratar los datos de presión faltantes como presión baja.',
        'NO eludir la compuerta de campo #26 usando la confianza del modelo.'
      ],
      unobservedVariables: [
        'Recuentos de uso público directos o instrumentados en una unidad de decisión adecuada.',
        'Observaciones de condición del terreno calificadas.',
        'Evidencia completa de respuesta de gestión si más adelante se estudia la eficacia.'
      ],
      spatialTemporalGaps: 'Las capas de evidencia actualmente resuelven unidades espaciales diferentes y no pueden fusionarse en una afirmación causal a nivel de sendero.'
    },
    competingExplanations: [
      {
        category: 'Riesgo de Sustitución por Proxy',
        explanation: 'Los proxies convenientes de movilidad o actividad digital pueden confundirse con la variable objetivo de uso por visitantes.',
        reasoning: 'El contrato científico de SNTO clasifica explícitamente los proxies de presión y bloquea las fuentes inadecuadas para mejorar la preparación.',
        investigationNeeded: 'Predefinir la variable objetivo y el instrumento de medición aceptable antes de la adquisición.'
      }
    ],
    confidence: {
      justification: [
        'La confianza es Alta en la declaración del vacío de evidencia porque la ausencia del objetivo de presión de visitantes y de la campaña de campo está explícitamente documentada y exigida por el contrato del producto.'
      ],
      marginOrInterval: 'Declaración de inventario de evidencia; sin estimación de efecto.'
    },
    decisionImplication: {
      managerialConsiderations: [
        'Priorizar la adquisición de datos solo donde responda a una pregunta de gestión concreta.',
        'Preferir recuentos directos o proxies instrumentados para un objetivo de presión de visitantes.',
        'Ejecutar la validación de campo antes de escalar las señales ambientales a afirmaciones de impacto físico.'
      ],
      cautionsAndGuardrails: [
        'No crear precisión sintética para llenar un pilar de evidencia faltante.',
        'No convertir la disponibilidad de datos en idoneidad científica.'
      ],
      policyPerspective: [
        'El siguiente paso de madurez es un mejor alineamiento de la evidencia, no un modelo más fuerte.'
      ]
    },
    dataNeededNext: [
      'Recuentos directos, registros de acceso o un proxy instrumentado documentado en la unidad de uso público relevante.',
      'Observaciones de validación de campo de personal calificado bajo el #26.',
      'Un diseño de atribución preespecificado si eventualmente se buscan afirmaciones causales de impacto turístico.'
    ],
    provenance: [
      {
        sensorOrPlatform: 'Informe de Evidencia de Decisión del PNSG de SNTO + Contrato de Producto Científico',
        spatialResolution: 'Arquitectura de evidencia',
        processingLevel: 'Auditoría del vacío de evidencia',
        sourceAuthority: 'Documentación canónica de SNTO'
      }
    ]
  }
};
