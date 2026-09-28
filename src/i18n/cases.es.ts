import { TerritoryId } from '../types';

// Spanish presentation overlay for TERRITORY_CASES. Only presentational
// fields are covered here — never code, center, zoom, bounds, dataStatus
// enum, referencePoints, stations, or features. Numbers/units embedded in
// keyIndicators.value stay untouched (they come from the canonical metrics
// constants and are merged in unchanged by localize.ts).

export interface TerritoryEsOverlay {
  title: string;
  subtitle: string;
  description: string;
  focusTheme: string;
  satelliteBands: string[];
  keyIndicators: { name: string; unit: string; change: string }[];
  sampleQuestions: string[];
  dataStatusNote: string;
}

export const TERRITORY_CASES_ES: Record<TerritoryId, TerritoryEsOverlay> = {
  'madrid-hati': {
    title: 'HATI Madrid: Inteligencia Turística Consciente del Calor',
    subtitle:
      'Sensibilidad del Método Térmico y Cribado de Oportunidades Turísticas Basado en Restricciones',
    description:
      'Instantánea de evidencia reproducida del piloto HATI-Madrid RELEASE_LOCKED: 27 activos turísticos curados en el área Prado–Retiro–Atocha, un día documentado de calor extremo, dos operacionalizaciones alternativas del método térmico, ocho escenarios de cribado y una lógica explícita de incertidumbre/abstención.',
    focusTheme: 'Elegibilidad Antes de la Clasificación · Representación Térmica · Suficiencia de la Evidencia',
    satelliteBands: [
      'Contexto meteorológico de bandas de riesgo de AEMET',
      'Activos turísticos de OpenStreetMap y proxy de exposición por recuento de árboles',
      'Configuración térmica derivada de modelo SOLWEIG → Tmrt → UTCI',
      'Geometría LiDAR de IGN/CNIG + sensibilidad de forzamiento solar de EUMETSAT'
    ],
    keyIndicators: [
      {
        name: 'Reclasificación por Método Térmico',
        unit: 'observaciones',
        change: '· reproducido'
      },
      {
        name: 'Conjunto de Candidatos Modificado',
        unit: 'escenarios',
        change: 'frente a la línea base de solo proximidad al más cercano abierto'
      },
      {
        name: 'Confianza en la Decisión',
        unit: 'R/B/I',
        change: 'solo dimensiones de incertidumbre probadas'
      },
      {
        name: 'Estado Sin Sobrevivientes',
        unit: 'escenario',
        change: '0 sobrevivientes a 500 m; condicionado por restricciones'
      }
    ],
    sampleQuestions: [
      '¿Qué demostró realmente el piloto HATI-Madrid?',
      '¿Cambió la modificación del método térmico las clasificaciones de viabilidad turística?',
      '¿Cambió el cribado basado en restricciones el conjunto de candidatos frente a la línea base del más cercano abierto?',
      '¿Qué tan robustas fueron las decisiones de HATI bajo la incertidumbre probada?',
      '¿Demostró HATI que los turistas cambiaron su comportamiento debido al calor?'
    ],
    dataStatusNote:
      'La cadena de cribado comprometida y las 10 tablas de resultados se reejecutaron de forma independiente y coincidieron con las referencias fijadas. SOLWEIG/Tmrt/UTCI siguen siendo derivados de modelo y no constituyen verdad térmica validada en campo.'
  },
  'guadarrama-snto': {
    title: 'SNTO: Observatorio de Turismo Natural Inteligente',
    subtitle:
      'Señales Ambientales Reales de Sentinel-2 y Planificación de Uso Público Proporcional a la Evidencia',
    description:
      'Observaciones ambientales reales de Sentinel-2 y tendencias NDVI/NDMI multianuales derivadas para 21 activos de campaña del PNSG, combinadas con el contexto oficial de gestión de senderos OAPN y PRUG. La evidencia de uso por visitantes y la validación de campo siguen faltando, por lo que la atribución de impacto turístico y la gestión restrictiva no están respaldadas.',
    focusTheme: 'Cambio Ambiental · Techo de Evidencia · Monitoreo / Inspección',
    satelliteBands: [
      'Sentinel-2 SR Harmonized · NDVI / NDMI / EVI',
      'Análisis de tendencia Mann–Kendall + Sen · 2021–2026',
      'Cartografía oficial de senderos OAPN · 218 senderos',
      'Zonificación de gestión PRUG'
    ],
    keyIndicators: [
      {
        name: 'Activos Reales de Serie Temporal',
        unit: 'activos',
        change: 'Sentinel-2 · 2021–2026'
      },
      {
        name: 'Distribución de Tendencia NDVI',
        unit: '↑ / estable / ↓',
        change: '6 en reverdecimiento · 14 sin tendencia · 1 en declive'
      },
      {
        name: 'Evidencia de Uso por Visitantes',
        unit: 'escala activo/sendero',
        change: 'atribución de presión bloqueada'
      },
      {
        name: 'Techo de Decisión Actual',
        unit: 'escalera de afirmación',
        change: 'monitorear / inspeccionar; sin cierre ni cupo'
      }
    ],
    sampleQuestions: [
      '¿Qué muestra actualmente la evidencia real de SNTO en todo el PNSG?',
      '¿Demuestra el descenso del NDVI en Maliciosa-Porrones un impacto causado por el turismo?',
      '¿Puede SNTO justificar el cierre de senderos o la restricción de cupos de visitantes?',
      '¿Qué respalda realmente la capa OAPN de 218 senderos?',
      '¿Qué evidencia falta antes de que sea posible la atribución de presión turística?'
    ],
    dataStatusNote:
      'Las observaciones reales de Sentinel-2 sustentan la capa ambiental; el NDVI/NDMI/EVI y las estadísticas de tendencia se derivan de esas observaciones. No se dispone de series de uso por visitantes a escala de activo/sendero ni de una campaña de validación de campo completada.'
  }
};
