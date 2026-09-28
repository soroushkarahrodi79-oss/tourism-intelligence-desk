import { EvidenceAssessment, TerritoryCase } from '../types';

// Spanish translations of the 4 fixed guardrail templates that
// src/services/analysisEngine.ts builds at runtime for custom questions
// (policy-change, out-of-scope, causality-trap, and the generic no-match
// fallback). Each template is identified by its exact English
// `statusHeadline` literal, which analysisEngine.ts never changes at
// runtime, so it is a stable lookup key. Interpolated fragments use the
// ALREADY-LOCALISED territory (title/shortName/dataStatusNote/focusTheme/
// satelliteBands come from localizeTerritory), so Spanish text and Spanish
// territory fields compose correctly. Numbers, coordinates, enum values and
// dataStatus strings are left as the canonical engine produced them.

type Builder = (territory: TerritoryCase, original: EvidenceAssessment) => Partial<EvidenceAssessment>;

const POLICY_CHANGE_HEADLINE =
  'Operational Decision Threshold Not Met: Current Evidence Does Not Justify Immediate Policy Alteration';

const OUT_OF_SCOPE_HEADLINE = 'INSUFFICIENT EVIDENCE: Question Outside the Variables Represented by This Case';

const CAUSALITY_TRAP_HEADLINE = 'INSUFFICIENT EVIDENCE: Custom Tourism-Causality Claim Is Not Established';

const GENERIC_FALLBACK_HEADLINE = 'INSUFFICIENT EVIDENCE: No Curated Assessment Matches This Custom Question';

const policyChange: Builder = (territory, original) => ({
  statusHeadline:
    'Umbral de Decisión Operativa No Alcanzado: la Evidencia Actual No Justifica una Modificación Inmediata de la Política',
  signal: {
    observation: `La consulta solicita una acción de política inmediata a partir de la evidencia actualmente cargada para ${territory.shortName}.`,
    spatialScope: `Alcance del caso ${territory.shortName}.`,
    temporalWindow: 'Instantánea de evidencia actual del prototipo.',
    summary:
      'El sistema separa la existencia de evidencia de la autorización operativa. La evidencia de investigación puede respaldar el diagnóstico o el seguimiento mientras sigue siendo insuficiente para una intervención de política específica.'
  },
  evidence: {
    supportingDatasets: [
      territory.dataStatusNote,
      'No hay un paquete de validación operativa específico de la consulta ni un umbral de intervención aprobado cargado para esta solicitud de política personalizada.',
      'Una acción de política debe justificarse con evidencia adecuada a la decisión, no simplemente con la evidencia más sólida disponible en algún lugar del caso.'
    ],
    metrics: [
      { label: 'Estado del Dato del Caso', value: territory.dataStatus.toUpperCase(), unit: 'estado de evidencia', baseline: 'Umbral específico de la afirmación', delta: 'No suficiente por sí solo', trend: 'alert' },
      { label: 'Recomendación de Política', value: 'DIFERIR', unit: 'acción', baseline: 'Autorización específica de la decisión', delta: 'Umbral no alcanzado', trend: 'stable' },
      { label: 'Atribución Causal', value: 'NO ESTABLECIDA', unit: 'estado', baseline: 'Requerida cuando la política depende de la causa', delta: 'Salvaguarda activa', trend: 'alert' }
    ],
    sampleSize: 'No se define ninguna muestra de decisión operativa específica de la consulta.',
    spatialCoordinates: original.evidence.spatialCoordinates,
    dataIntegrityNotes:
      'Salvaguarda consciente del estado de la evidencia: la evidencia de investigación reproducida, observada o derivada no se valida automáticamente para la política operativa actual.'
  },
  interpretation: {
    inferences: [
      'La evidencia actual puede respaldar el seguimiento, la delimitación o la investigación dentro de su techo documentado.',
      'La modificación inmediata de la política no está justificada a menos que la acción solicitada tenga una cadena específica de evidencia y autorización.'
    ],
    plausibleMechanisms:
      'La calibración de la decisión requiere hacer coincidir la unidad espacial, la ventana temporal, la variable objetivo, el estado de validación y la consecuencia de la acción propuesta.'
  },
  evidenceLimit: {
    strictlyForbiddenInferences: [
      'NO equiparar la evidencia reproducida, observada o derivada con la validación operativa.',
      'NO usar una señal ambiental por sí sola para justificar una restricción turística.',
      'NO inventar un umbral de política que no esté definido por el contrato de evidencia o la autoridad relevante.'
    ],
    unobservedVariables: [
      'Evidencia y umbral operativos específicos de la decisión.',
      'Consecuencias sociales, ambientales, legales y distributivas relevantes de la acción propuesta.'
    ],
    spatialTemporalGaps: 'La evidencia del caso actual no se recopiló como un paquete de autorización genérico para cambios de política arbitrarios.'
  },
  competingExplanations: [
    {
      category: 'Desajuste de Alcance de la Decisión',
      explanation: 'La evidencia disponible puede describir un fenómeno sin respaldar la intervención específica solicitada.',
      evaluation: 'Contextually supported hypothesis',
      reasoning: 'La fortaleza de la evidencia es específica de la afirmación y no puede transferirse automáticamente entre tipos de decisión.',
      investigationNeeded: 'Definir la afirmación de intervención y la evidencia mínima necesaria para autorizarla.'
    }
  ],
  confidence: {
    level: 'High',
    justification: [
      'La confianza es Alta en la negativa a autorizar una acción de política inmediata no correspondida; la confianza en cualquier explicación causal sustantiva sigue dependiendo de la afirmación.'
    ],
    marginOrInterval: 'Límite de autorización, no una estimación de efecto.'
  },
  decisionImplication: {
    managerialConsiderations: [
      'Definir la decisión de política exacta y su umbral de evidencia antes de actuar.',
      'Usar el caso actual solo dentro de su techo de decisión documentado.',
      'Adquirir la evidencia faltante en lugar de llenar el vacío con certeza generada por modelo.'
    ],
    cautionsAndGuardrails: [
      'No presentar la evidencia de investigación como validación operativa actual.',
      'Mantener el estado ambiental, la presión de visitantes, la atribución causal y la autorización de gestión como capas separadas.'
    ],
    policyPerspective: [
      'Las decisiones proporcionales requieren evidencia específica de la afirmación y autorización explícita.'
    ]
  },
  dataNeededNext: [
    'Un umbral de evidencia específico de la decisión y un responsable de la decisión.',
    'Observaciones emparejadas con la variable objetivo y la unidad espacial/temporal.',
    'Evidencia de validación y atribución cuando la intervención dependa de una afirmación causal.'
  ],
  provenance: [
    {
      sensorOrPlatform: 'Salvaguarda de Estado de Evidencia de Tourism Intelligence Desk',
      spatialResolution: 'Límite de decisión a nivel de caso',
      temporalCoverage: 'Consulta en tiempo de ejecución contra la instantánea de evidencia actual',
      processingLevel: 'Verificación determinista de autorización de decisión',
      sourceAuthority: 'Contrato epistémico de Tourism Intelligence Desk',
      isCalibratedProxy: false,
      dataStatus: territory.dataStatus
    }
  ]
});

const outOfScope: Builder = (territory, original) => ({
  statusHeadline: 'EVIDENCIA INSUFICIENTE: la Pregunta Está Fuera de las Variables Representadas por Este Caso',
  signal: {
    observation:
      'El caso activo no contiene evidencia correspondida con la variable económica, demográfica, de aviación, fiscal o de pronóstico a largo plazo consultada.',
    spatialScope: `Alcance del caso ${territory.shortName}.`,
    temporalWindow: 'Instantánea de evidencia actual.',
    summary: 'El sistema se niega a reutilizar evidencia ambiental o geoespacial como sustituto de una variable no medida.'
  },
  evidence: {
    supportingDatasets: [
      territory.dataStatusNote,
      'Ninguna evaluación curada ni registro de procedencia asocia la variable solicitada con la evidencia del caso activo.',
      'No se calcula ninguna estimación de efecto para una variable fuera de alcance.'
    ],
    metrics: [
      { label: 'Fuentes de Evidencia Correspondidas', value: '0', unit: 'fuentes', baseline: 'Se requiere al menos una', delta: 'Sin coincidencia', trend: 'alert' },
      { label: 'Estado de Evaluación', value: 'EVIDENCIA INSUFICIENTE', unit: 'estado', baseline: 'Salvaguarda epistémica', delta: 'Detenido', trend: 'alert' }
    ],
    sampleSize: 'N = 0 observaciones correspondidas para la variable consultada.',
    spatialCoordinates: original.evidence.spatialCoordinates,
    dataIntegrityNotes: 'La variable está fuera del esquema de evidencia del caso activo.'
  },
  interpretation: {
    inferences: [
      'No se puede hacer ninguna inferencia válida a partir del caso activo sobre la variable solicitada.',
      'Debe adquirirse evidencia específica del dominio en lugar de inferirla a partir de indicadores ambientales no relacionados.'
    ],
    plausibleMechanisms: 'No evaluado: la variable consultada está fuera del límite de evidencia del caso.'
  },
  evidenceLimit: {
    strictlyForbiddenInferences: [
      'NO inventar una conclusión.',
      'NO extrapolar indicadores ambientales a resultados económicos o demográficos no relacionados.',
      'NO sustituir la plausibilidad del modelo por una medición faltante.'
    ],
    unobservedVariables: ['Las variables explícitamente solicitadas por la consulta.'],
    spatialTemporalGaps: 'No existe evidencia correspondida para el tema solicitado.'
  },
  competingExplanations: [
    {
      category: 'Desajuste de Alcance de la Evidencia',
      explanation: 'El fenómeno consultado no está representado por la evidencia del caso activo.',
      evaluation: 'Confounded / indeterminate',
      reasoning: 'Una afirmación no puede respaldarse con un conjunto de datos que no mide su variable objetivo.',
      investigationNeeded: 'Adquirir datos del dominio y la autoridad apropiados.'
    }
  ],
  confidence: {
    level: 'High',
    justification: ['La confianza es Alta en que la variable solicitada está fuera del límite de evidencia activo.'],
    marginOrInterval: 'Sin estimación de efecto.'
  },
  decisionImplication: {
    managerialConsiderations: ['Adquirir evidencia relevante específica del dominio antes de tomar una decisión.'],
    cautionsAndGuardrails: ['No citar el caso ambiental activo como evidencia de un resultado no medido.'],
    policyPerspective: ['Usar el dominio de evidencia correcto para la decisión que se está tomando.']
  },
  dataNeededNext: ['Un conjunto de datos trazable que mida directamente la variable consultada a la escala relevante.'],
  provenance: [
    {
      sensorOrPlatform: 'Filtro de Alcance de Evidencia de Tourism Intelligence Desk',
      spatialResolution: 'N/D',
      temporalCoverage: 'Consulta en tiempo de ejecución',
      processingLevel: 'Verificación determinista de límite',
      sourceAuthority: 'Tourism Intelligence Desk',
      isCalibratedProxy: false,
      dataStatus: territory.dataStatus
    }
  ]
});

const causalityTrap: Builder = (territory, original) => ({
  statusHeadline: 'EVIDENCIA INSUFICIENTE: la Afirmación Causal Turística Personalizada No Está Establecida',
  signal: {
    observation: `La consulta pregunta si el turismo o la actividad de los visitantes causa un resultado en ${territory.shortName}, pero no hay cargada ninguna evaluación causal curada que corresponda a esta afirmación exacta.`,
    spatialScope: `Alcance del caso ${territory.shortName}.`,
    temporalWindow: 'Instantánea de evidencia actual.',
    summary: 'El prototipo preserva el estado de evidencia disponible mientras se niega a fabricar un efecto causal.'
  },
  evidence: {
    supportingDatasets: [
      territory.dataStatusNote,
      'Una afirmación causal requiere evidencia correspondida con la exposición, el resultado, la comparación, la unidad espacial, la ventana temporal y los factores de confusión plausibles.',
      'El enrutador de preguntas personalizadas no genera ninguna fracción atribuible, estimación de efecto causal ni prueba de significancia específica de la consulta.'
    ],
    metrics: [
      { label: 'Estado del Dato del Caso', value: territory.dataStatus.toUpperCase(), unit: 'estado de evidencia', baseline: 'Se necesita evidencia específica de la afirmación', delta: 'Contexto disponible', trend: 'stable' },
      { label: 'Atribución Causal', value: 'NO ESTABLECIDA', unit: 'estado', baseline: 'Diseño causal defendible', delta: 'EVIDENCIA INSUFICIENTE', trend: 'alert' },
      { label: 'Recomendación Operativa', value: 'DIFERIR', unit: 'estado', baseline: 'Umbral de decisión validado', delta: 'Sin base causal', trend: 'stable' }
    ],
    sampleSize: 'No se define ninguna muestra causal específica de esta pregunta personalizada.',
    spatialCoordinates: original.evidence.spatialCoordinates,
    dataIntegrityNotes: 'El sistema deliberadamente no fabrica tamaños de efecto, fracciones atribuibles, valores p, intervalos de confianza ni clasificaciones causales.'
  },
  interpretation: {
    inferences: [
      'La afirmación causal exacta no puede resolverse solo a partir de la pregunta personalizada.',
      'La evidencia ambiental o de cribado disponible puede aportar contexto sin identificar al turismo como la causa.'
    ],
    plausibleMechanisms:
      'Los mecanismos candidatos deben especificarse y probarse con un diseño que separe la exposición de los visitantes de la variación ambiental de fondo.'
  },
  evidenceLimit: {
    strictlyForbiddenInferences: [
      'NUNCA CONVERTIR LA CORRELACIÓN O LA COINCIDENCIA EN CAUSALIDAD.',
      'NO inventar tamaños de efecto, fracciones atribuibles, significancia estadística ni factores dominantes para una consulta personalizada.',
      'NO recomendar una política restrictiva sobre la base de una afirmación causal no validada.'
    ],
    unobservedVariables: [
      'Una exposición específica de la consulta y una condición de control/comparación.',
      'Factores de confusión ambientales, espaciales, temporales y de gestión relevantes.',
      'Mediciones de resultado alineadas con la exposición en espacio y tiempo.'
    ],
    spatialTemporalGaps: 'No se ha proporcionado ni correspondido ningún diseño de atribución específico de la consulta para esta pregunta personalizada.'
  },
  competingExplanations: [
    {
      category: 'Variación Ambiental / Contextual de Fondo',
      explanation: 'La meteorología, la fenología, la topografía, la gestión, la infraestructura u otros factores no turísticos pueden explicar parte o la totalidad del patrón observado.',
      evaluation: 'Plausible competing explanation',
      reasoning: 'La consulta personalizada no contiene evidencia que separe la exposición de los visitantes de la variación de fondo.',
      investigationNeeded: 'Definir controles emparejados y medir los principales factores de confusión plausibles para la afirmación específica.'
    },
    {
      category: 'Mecanismo Relacionado con los Visitantes',
      explanation: 'La actividad de los visitantes sigue siendo un factor candidato solo cuando se puede medir una vía de exposición plausible y un resultado espacialmente correspondido.',
      evaluation: 'Requires field validation',
      reasoning: 'Un mecanismo candidato no es una estimación causal.',
      investigationNeeded: 'Recopilar observaciones adecuadas de exposición, resultado y control a escalas compatibles.'
    }
  ],
  confidence: {
    level: 'Low',
    justification: ['La confianza en la atribución causal es Baja porque no se dispone de ningún diseño causal específico de la consulta ni de una estimación de efecto validada.'],
    marginOrInterval: 'Efecto causal no estimado'
  },
  decisionImplication: {
    managerialConsiderations: [
      'No tratar la afirmación causal personalizada como establecida.',
      'Convertir la pregunta en una hipótesis comprobable antes de considerar una respuesta de gestión focalizada.'
    ],
    cautionsAndGuardrails: [
      'No comunicar porcentajes, fracciones causales o niveles de significancia inventados.',
      'Respetar el techo de evidencia del caso de origen.'
    ],
    policyPerspective: ['La revisión de política debe seguir a la evidencia de atribución validada, no precederla.']
  },
  dataNeededNext: [
    'Una hipótesis causal claramente especificada y un diseño de comparación.',
    'Mediciones de exposición de visitantes apropiadas al mecanismo propuesto.',
    'Observaciones de resultado emparejadas y mediciones de los principales factores de confusión plausibles.'
  ],
  provenance: [
    {
      sensorOrPlatform: 'Motor de Salvaguarda Epistémica de Tourism Intelligence Desk',
      spatialResolution: 'Sin resolución causal específica de la consulta definida',
      temporalCoverage: 'Consulta en tiempo de ejecución',
      processingLevel: 'Verificación determinista de límite',
      sourceAuthority: 'Tourism Intelligence Desk',
      isCalibratedProxy: false,
      dataStatus: territory.dataStatus
    }
  ]
});

const genericFallback: Builder = (territory, original) => ({
  statusHeadline: 'EVIDENCIA INSUFICIENTE: Ninguna Evaluación Curada Corresponde a Esta Pregunta Personalizada',
  signal: {
    observation: `La pregunta está dentro del alcance general de ${territory.shortName}, pero ninguna evaluación curada responde directamente a esta afirmación específica.`,
    spatialScope: `Alcance del caso ${territory.shortName} (${territory.focusTheme}).`,
    temporalWindow: 'Instantánea de evidencia actual.',
    summary: 'La evidencia del caso existente se conserva como contexto; no se reinterpreta como prueba de una afirmación no correspondida.'
  },
  evidence: {
    supportingDatasets: [
      territory.dataStatusNote,
      `La evidencia de referencia representada por este caso incluye: ${territory.satelliteBands.join(', ')}.`,
      'No se calcula ninguna prueba estadística ni estimación de efecto específica de la consulta para preguntas personalizadas no correspondidas.'
    ],
    metrics: [
      { label: 'Coincidencia de Evaluación', value: 'NINGUNA', unit: 'casos curados', baseline: 'Coincidencia directa de evidencia', delta: 'Consulta personalizada sin coincidencia', trend: 'alert' },
      { label: 'Estado del Dato del Caso', value: territory.dataStatus.toUpperCase(), unit: 'estado de evidencia', baseline: 'Se necesita evidencia específica de la afirmación', delta: 'Solo contexto', trend: 'stable' },
      { label: 'Estado de la Decisión', value: 'DIFERIR', unit: 'acción', baseline: 'Umbral de evidencia', delta: 'Se necesita evidencia específica de la consulta', trend: 'stable' }
    ],
    sampleSize:
      territory.referencePoints?.length
        ? `${territory.referencePoints.length} activos de referencia mapeados; no se define ninguna muestra específica de la consulta.`
        : 'No se define ninguna muestra específica de la consulta.',
    spatialCoordinates: original.evidence.spatialCoordinates,
    dataIntegrityNotes: 'El contexto se muestra sin afirmar que la pregunta personalizada se ha respondido empíricamente.'
  },
  interpretation: {
    inferences: [
      'La pregunta puede ser relevante, pero el prototipo determinista no contiene una evaluación curada que la resuelva.',
      'Una respuesta defendible requiere evidencia explícitamente correspondida con las variables y la afirmación de la pregunta personalizada.'
    ],
    plausibleMechanisms: 'No evaluado para esta consulta personalizada sin coincidencia.'
  },
  evidenceLimit: {
    strictlyForbiddenInferences: [
      'NO tratar los indicadores genéricos del caso como evidencia de una afirmación no correspondida.',
      'NO inventar significancia estadística, tamaños de efecto, fracciones causales ni persistencia de tendencia.',
      'NO convertir la evidencia contextual en una recomendación operativa.'
    ],
    unobservedVariables: [
      'Las variables explícitamente requeridas para responder la pregunta personalizada.',
      'Una comparación o línea base específica de la consulta cuando sea relevante.'
    ],
    spatialTemporalGaps: 'No se ha cargado ningún diseño de evidencia específico de la consulta para esta pregunta personalizada.'
  },
  competingExplanations: [
    {
      category: 'Explicaciones Alternativas No Especificadas',
      explanation: 'Los mecanismos y factores de confusión potenciales dependen de la afirmación exacta y no pueden clasificarse a partir del contexto genérico del caso.',
      evaluation: 'Confounded / indeterminate',
      reasoning: 'El prototipo no tiene ninguna evaluación correspondida para esta consulta.',
      investigationNeeded: 'Definir el resultado, la exposición, la comparación, la unidad espacial y la ventana temporal antes de evaluar alternativas.'
    }
  ],
  confidence: {
    level: 'Low',
    justification: ['La confianza es Baja porque la consulta no corresponde a una evaluación curada y no se realiza ningún análisis específico de la consulta.'],
    marginOrInterval: 'No se calculó ninguna estimación de efecto'
  },
  decisionImplication: {
    managerialConsiderations: [
      'Tratar la salida como una respuesta de delimitación, no como un hallazgo de evidencia.',
      'Traducir la pregunta en una afirmación medible antes de considerar una respuesta de gestión.'
    ],
    cautionsAndGuardrails: [
      'No modificar la política únicamente sobre la base de contexto no correspondido.',
      'No citar el prototipo como si hubiera medido una variable ausente en la evidencia curada.'
    ],
    policyPerspective: ['Usar umbrales de evidencia explícitos y procedencia documentada antes de pasar de la exploración a la decisión.']
  },
  dataNeededNext: [
    'Una definición específica de la consulta de las variables objetivo.',
    'Observaciones o conjuntos de datos apropiados con procedencia documentada.',
    'Una estrategia de comparación y un análisis de incertidumbre adecuados al contexto de la decisión.'
  ],
  provenance: [
    {
      sensorOrPlatform: 'Enrutador Determinista de Consultas de Tourism Intelligence Desk',
      spatialResolution: 'Sin resolución analítica específica de la consulta definida',
      temporalCoverage: 'Consulta en tiempo de ejecución',
      processingLevel: 'Correspondencia de evaluación curada y salvaguarda de límite',
      sourceAuthority: 'Tourism Intelligence Desk',
      isCalibratedProxy: false,
      dataStatus: territory.dataStatus
    }
  ]
});

export const GUARDRAIL_TEMPLATES_ES: Record<string, Builder> = {
  [POLICY_CHANGE_HEADLINE]: policyChange,
  [OUT_OF_SCOPE_HEADLINE]: outOfScope,
  [CAUSALITY_TRAP_HEADLINE]: causalityTrap,
  [GENERIC_FALLBACK_HEADLINE]: genericFallback
};
