/**
 * EVO LABS — Canonical Catalog Source of Truth
 * Single source of truth for Tomos, Editorial Status, Runtime Status, Commercial Status,
 * Magazines, Labs, Tools, Prices, and Access Models.
 */

export type EditorialStatus = 'PUBLISHED' | 'IN_DEVELOPMENT' | 'PLANNED';
export type RuntimeStatus = 'FULL_READER' | 'DOSSIER_ONLY' | 'LOCKED';
export type CommercialStatus = 'AVAILABLE' | 'UNDECIDED' | 'IN_DEVELOPMENT' | 'LOCKED';
export type MagazineStatus = 'AVAILABLE' | 'NONE';
export type AccessType = 'FREE' | 'TOME' | 'COMPLETE' | 'LIFETIME' | 'UNDECIDED';

export interface CanonicalTomo {
  id: string; // e.g. '01'
  tomoNumber: string; // '01' - '10'
  title: string; // Immutable title
  subtitle: string;
  levelNumber: number;
  levelName: string;
  editorialStatus: EditorialStatus;
  runtimeStatus: RuntimeStatus;
  commercialStatus: CommercialStatus;
  magazineStatus: MagazineStatus;
  accessType: AccessType;
  associatedLabs: string[]; // Lab IDs
  associatedTools: string[]; // Tool IDs
  description: string;
}

export const CANONICAL_TOMES: CanonicalTomo[] = [
  {
    id: '01',
    tomoNumber: '01',
    title: 'Conocé tu PC',
    subtitle: 'Hardware, buses y arquitectura física del silicio.',
    levelNumber: 1,
    levelName: 'NIVEL 1: CONOCER LA PC',
    editorialStatus: 'PUBLISHED',
    runtimeStatus: 'FULL_READER',
    commercialStatus: 'AVAILABLE',
    magazineStatus: 'AVAILABLE',
    accessType: 'TOME',
    associatedLabs: ['tech-hardware', 'tech-silicon'],
    associatedTools: ['hw-01', 'hw-02', 'hw-03'],
    description: 'Entendé tu máquina desde adentro analizando la topología y transferencia de bytes entre CPU, RAM y GPU.',
  },
  {
    id: '02',
    tomoNumber: '02',
    title: 'La Biblia Negra de Windows',
    subtitle: 'Arquitectura NT, procesos, servicios y arranque del sistema.',
    levelNumber: 2,
    levelName: 'NIVEL 2: WINDOWS Y KERNEL',
    editorialStatus: 'PUBLISHED',
    runtimeStatus: 'FULL_READER',
    commercialStatus: 'AVAILABLE',
    magazineStatus: 'AVAILABLE',
    accessType: 'TOME',
    associatedLabs: ['windows-matrix', 'software-kernel'],
    associatedTools: ['win-01', 'win-02', 'win-03', 'win-04'],
    description: 'Inmersión profunda en el kernel de Windows, administración de memoria y resolución de fallas de inicio.',
  },
  {
    id: '03',
    tomoNumber: '03',
    title: 'Reparación de PC',
    subtitle: 'Metodología pericial deductiva y descarte de banco en escritorios.',
    levelNumber: 3,
    levelName: 'NIVEL 3: DIAGNÓSTICO Y REPARACIÓN',
    editorialStatus: 'PUBLISHED',
    runtimeStatus: 'FULL_READER',
    commercialStatus: 'AVAILABLE',
    magazineStatus: 'AVAILABLE',
    accessType: 'TOME',
    associatedLabs: ['operaciones-pcb', 'banco-reparacion'],
    associatedTools: ['diag-01', 'diag-02', 'diag-03'],
    description: 'Protocolos de diagnóstico físico, medición de voltajes en rieles y aislamiento de componentes defectuosos.',
  },
  {
    id: '04',
    tomoNumber: '04',
    title: 'Reparación de Notebooks',
    subtitle: 'Microelectrónica, esquemáticos y fuentes de portátiles.',
    levelNumber: 3,
    levelName: 'NIVEL 3: DIAGNÓSTICO Y REPARACIÓN',
    editorialStatus: 'PUBLISHED',
    runtimeStatus: 'FULL_READER',
    commercialStatus: 'AVAILABLE',
    magazineStatus: 'AVAILABLE',
    accessType: 'TOME',
    associatedLabs: ['operaciones-notebook', 'esquematicos'],
    associatedTools: ['diag-04', 'diag-05'],
    description: 'Análisis de placas madre compactas, circuitos de carga, conversores DC-DC y lectura de diagramas esquemáticos.',
  },
  {
    id: '05',
    tomoNumber: '05',
    title: 'Redes',
    subtitle: 'Comunicaciones TCP/IP, direccionamiento y tráfico en red local e Internet.',
    levelNumber: 4,
    levelName: 'NIVEL 4: REDES Y SEGURIDAD',
    editorialStatus: 'PUBLISHED',
    runtimeStatus: 'DOSSIER_ONLY',
    commercialStatus: 'UNDECIDED',
    magazineStatus: 'NONE',
    accessType: 'UNDECIDED',
    associatedLabs: ['redes-lab'],
    associatedTools: ['net-01', 'net-02'],
    description: 'Fundamentos de redes de datos, enrutamiento, DNS, DHCP y análisis de paquetes de red.',
  },
  {
    id: '06',
    tomoNumber: '06',
    title: 'Ciberseguridad',
    subtitle: 'Defensa perimetral, análisis de vulnerabilidades y mitigación de amenazas.',
    levelNumber: 4,
    levelName: 'NIVEL 4: REDES Y SEGURIDAD',
    editorialStatus: 'PUBLISHED',
    runtimeStatus: 'DOSSIER_ONLY',
    commercialStatus: 'UNDECIDED',
    magazineStatus: 'NONE',
    accessType: 'UNDECIDED',
    associatedLabs: ['sec-lab'],
    associatedTools: ['sec-01', 'sec-02'],
    description: 'Principios de hardening de sistemas operativos, análisis de malware y contramedidas defensivas.',
  },
  {
    id: '07',
    tomoNumber: '07',
    title: 'Gaming Pro / Rendimiento',
    subtitle: 'Metrología científica de frametimes, percentiles 1% low y latencias.',
    levelNumber: 5,
    levelName: 'NIVEL 5: RENDIMIENTO Y GAMING',
    editorialStatus: 'IN_DEVELOPMENT',
    runtimeStatus: 'DOSSIER_ONLY',
    commercialStatus: 'IN_DEVELOPMENT',
    magazineStatus: 'NONE',
    accessType: 'UNDECIDED',
    associatedLabs: ['tech-metrology', 'cs2-simulator'],
    associatedTools: ['perf-01', 'perf-02'],
    description: 'Medición objetiva y optimización de rendimiento gráfico en juegos y simuladores sin placebos.',
  },
  {
    id: '08',
    tomoNumber: '08',
    title: 'Arranque y Diagnóstico',
    subtitle: 'Secuencia POST, UEFI, tablas GPT/MBR y banco de 35 estados de fallo.',
    levelNumber: 2,
    levelName: 'NIVEL 2: WINDOWS Y KERNEL',
    editorialStatus: 'PUBLISHED',
    runtimeStatus: 'FULL_READER',
    commercialStatus: 'AVAILABLE',
    magazineStatus: 'AVAILABLE',
    accessType: 'TOME',
    associatedLabs: ['boot-lab'],
    associatedTools: ['boot-01', 'boot-02'],
    description: 'Diagnóstico avanzado de la secuencia de encendido y reparación de entornos de arranque dañados.',
  },
  {
    id: '09',
    tomoNumber: '09',
    title: 'Programación desde Cero',
    subtitle: 'Lógica computacional, estructuras de control y fundamentos de código.',
    levelNumber: 6,
    levelName: 'NIVEL 6: SISTEMAS Y KERNEL',
    editorialStatus: 'IN_DEVELOPMENT',
    runtimeStatus: 'LOCKED',
    commercialStatus: 'IN_DEVELOPMENT',
    magazineStatus: 'NONE',
    accessType: 'UNDECIDED',
    associatedLabs: ['code-lab'],
    associatedTools: [],
    description: 'Introducción rigurosa a la lógica de programación y lenguajes orientados a sistemas.',
  },
  {
    id: '10',
    tomoNumber: '10',
    title: 'Prompt e IA Avanzada',
    subtitle: 'Ingeniería de instrucciones, modelos de lenguaje y automatización.',
    levelNumber: 6,
    levelName: 'NIVEL 6: SISTEMAS Y KERNEL',
    editorialStatus: 'IN_DEVELOPMENT',
    runtimeStatus: 'LOCKED',
    commercialStatus: 'IN_DEVELOPMENT',
    magazineStatus: 'NONE',
    accessType: 'UNDECIDED',
    associatedLabs: ['ai-lab'],
    associatedTools: [],
    description: 'Optimización de prompts, interacción con LLMs y flujos de trabajo asistidos por inteligencia artificial.',
  },
];

// =========================================================================
// HELPERS CANÓNICOS
// =========================================================================

export function getTomeById(id: string): CanonicalTomo | undefined {
  return CANONICAL_TOMES.find((t) => t.id === id || t.tomoNumber === id);
}

export function getPublishedTomes(): CanonicalTomo[] {
  return CANONICAL_TOMES.filter((t) => t.editorialStatus === 'PUBLISHED');
}

export function getTomesInDevelopment(): CanonicalTomo[] {
  return CANONICAL_TOMES.filter((t) => t.editorialStatus === 'IN_DEVELOPMENT' || t.editorialStatus === 'PLANNED');
}

export function getCommerciallyAvailableTomes(): CanonicalTomo[] {
  return CANONICAL_TOMES.filter((t) => t.commercialStatus === 'AVAILABLE');
}

export function getPublishedMagazines(): CanonicalTomo[] {
  return CANONICAL_TOMES.filter((t) => t.magazineStatus === 'AVAILABLE');
}

export function getTomeLabs(tomoId: string): string[] {
  const tomo = getTomeById(tomoId);
  return tomo ? tomo.associatedLabs : [];
}

export function getTomeTools(tomoId: string): string[] {
  const tomo = getTomeById(tomoId);
  return tomo ? tomo.associatedTools : [];
}

export function getTomeRuntimeStatus(tomoId: string): RuntimeStatus {
  const tomo = getTomeById(tomoId);
  return tomo ? tomo.runtimeStatus : 'LOCKED';
}
