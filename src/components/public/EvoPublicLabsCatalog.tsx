import React, { useState } from 'react';
import {
  Zap,
  Search,
  Power,
  Terminal,
  Cpu,
  Wrench,
  Boxes,
  Activity,
  Globe,
  Shield,
  Code,
  Sparkles,
  Gamepad2,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Layers,
  FileCheck,
  Target,
  FlaskConical,
  Monitor,
  Server,
  HardDrive,
  Sliders,
  Compass,
  Flame,
} from 'lucide-react';
import { EVO_MASTER_TOOLS_CATALOG } from '../../data/evoToolsData';

export interface EvoPublicLabsCatalogProps {
  onOpenHotSwapLab: (subPanel?: 'sandbox' | 'hardware' | 'software' | 'telemetry' | 'all') => void;
  onOpenWindowsMatrixLab: (scenario?: string) => void;
  onOpenWindowsXRayLab?: (scenario?: string) => void;
  onOpenBootLab: () => void;
  onOpenLabCore?: (phase?: 'SELECT_PC' | 'BUILD_PC' | 'LAB_ACTIVE') => void;
  onOpenCampusLab?: (labId: string) => void;
  onOpenCaseResolver?: () => void;
  onOpenDigitalTwin?: () => void;
  onOpenTransferChallenge?: () => void;
  onOpenTomo?: (tomoNumber: string) => void;
  onOpenPerfMetrology?: () => void;
  onOpenNetForensics?: () => void;
  onOpenDefensiveSec?: () => void;
  onOpenCodeEng?: () => void;
  onOpenAiSystems?: () => void;
  onOpenGameForge?: () => void;
}

export type LabStatus = 'DISPONIBLE' | 'EN DESARROLLO';

export interface CanonicalPublicLabItem {
  id: string;
  number: string;
  title: string;
  problemQuestion: string;
  tomoRelated: string;
  labType: string;
  level: string;
  skillPracticed: string;
  status: LabStatus;
  problema: string;
  accion: string;
  resultado: string;
  evidencia: string;
  associatedToolId?: string;
  associatedToolName: string;
  icon: React.ElementType;
  action: () => void;
}

export interface CanonicalSimulatorItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tomoRelated: string;
  category: string;
  description: string;
  capabilities: string[];
  status: LabStatus;
  icon: React.ElementType;
  action: () => void;
}

export interface CanonicalCampusZoneCard {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  specialty: string;
  status: LabStatus;
  icon: React.ElementType;
  action: () => void;
}

export interface LabVisualConfig {
  accent: string;
  bgGradient: string;
  label: string;
}

export const LAB_VISUAL_MAP: Record<string, LabVisualConfig> = {
  'lab-boot-seq': { accent: '#F59E0B', bgGradient: 'from-amber-950/80 via-zinc-950 to-black', label: 'BOOT & POST' },
  'lab-windows-matrix': { accent: '#00D2FF', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'NT MATRIX' },
  'lab-hardware-hotswap': { accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'HW HOT-SWAP' },
  'lab-core-workbench': { accent: '#EF4444', bgGradient: 'from-rose-950/80 via-zinc-950 to-black', label: 'CORE WORKBENCH' },
  'lab-perf-metrology': { accent: '#EC4899', bgGradient: 'from-pink-950/80 via-zinc-950 to-black', label: 'METROLOGY' },
  'lab-cases-resolver': { accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: 'CASE RESOLVER' },
  'lab-digital-twin': { accent: '#00D2FF', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'DIGITAL TWIN' },
  'lab-net-forensics': { accent: '#38BDF8', bgGradient: 'from-sky-950/80 via-zinc-950 to-black', label: 'NET FORENSICS' },
  'lab-defensive-sec': { accent: '#EF4444', bgGradient: 'from-rose-950/80 via-zinc-950 to-black', label: 'DEFENSIVE SEC' },
  'lab-code-eng': { accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'CODE ENG' },
  'lab-ai-systems': { accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: 'AI SYSTEMS' },
  'lab-game-forge': { accent: '#F59E0B', bgGradient: 'from-amber-950/80 via-zinc-950 to-black', label: 'GAME FORGE' },
  'lab-eval-transfer': { accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'EVALUATION' },
  'lab-notebook-power': { accent: '#EAB308', bgGradient: 'from-yellow-950/80 via-zinc-950 to-black', label: 'POWER RAILS' },
};

export const SIMULATOR_VISUAL_MAP: Record<string, LabVisualConfig> = {
  'sim-boot-seq': { accent: '#F59E0B', bgGradient: 'from-amber-950/80 via-zinc-950 to-black', label: '35 POST STATES' },
  'sim-windows-xray': { accent: '#00D2FF', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'X-RAY KERNEL' },
  'sim-uefi-boot': { accent: '#38BDF8', bgGradient: 'from-sky-950/80 via-zinc-950 to-black', label: 'UEFI & BCD' },
  'sim-hw-hotswap': { accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'HW NANOSECONDS' },
  'sim-sw-hotswap': { accent: '#38BDF8', bgGradient: 'from-sky-950/80 via-zinc-950 to-black', label: 'DPC & DRIVERS' },
  'sim-ultimate-sandbox': { accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: 'ULTIMATE SANDBOX' },
  'sim-thermal-telemetry': { accent: '#EF4444', bgGradient: 'from-rose-950/80 via-zinc-950 to-black', label: 'THERMAL TJMAX' },
  'sim-pc-builder': { accent: '#EAB308', bgGradient: 'from-yellow-950/80 via-zinc-950 to-black', label: 'PC BUILDER' },
  'sim-clean-install': { accent: '#00D2FF', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'CLEAN INSTALL GPT' },
  'sim-windows-repair': { accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: 'REPAIR SFC/DISM' },
};

export const CAMPUS_ZONE_VISUAL_MAP: Record<string, LabVisualConfig> = {
  'campus-zone-01': { accent: '#EF4444', bgGradient: 'from-rose-950/80 via-zinc-950 to-black', label: 'ZONA 01 // TRIAGE' },
  'campus-zone-02': { accent: '#F59E0B', bgGradient: 'from-amber-950/80 via-zinc-950 to-black', label: 'ZONA 02 // TALLER' },
  'campus-zone-03': { accent: '#38BDF8', bgGradient: 'from-sky-950/80 via-zinc-950 to-black', label: 'ZONA 03 // ARCHIVO' },
  'campus-zone-04': { accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'ZONA 04 // CÁMARA' },
  'campus-zone-05': { accent: '#00D2FF', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'ZONA 05 // MÁQUINAS' },
  'campus-zone-06': { accent: '#EF4444', bgGradient: 'from-rose-950/80 via-zinc-950 to-black', label: 'ZONA 06 // RESTRICTED' },
  'campus-zone-07': { accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: 'ZONA 07 // MI LAB' },
  'campus-zone-08': { accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'ZONA 08 // COMUNIDAD' },
};

export const EvoPublicLabsCatalog: React.FC<EvoPublicLabsCatalogProps> = ({
  onOpenHotSwapLab,
  onOpenWindowsMatrixLab,
  onOpenWindowsXRayLab,
  onOpenBootLab,
  onOpenLabCore,
  onOpenCampusLab,
  onOpenCaseResolver,
  onOpenDigitalTwin,
  onOpenTransferChallenge,
  onOpenTomo,
  onOpenPerfMetrology,
  onOpenNetForensics,
  onOpenDefensiveSec,
  onOpenCodeEng,
  onOpenAiSystems,
  onOpenGameForge,
}) => {
  const [experienceType, setExperienceType] = useState<'ALL' | 'LABS' | 'SIMS' | 'ZONES'>('ALL');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'SISTEMAS' | 'HARDWARE' | 'TALLER' | 'METROLOGIA' | 'REDES_SEGURIDAD'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 14 Canonical Laboratories strictly grounded in EVO_MASTER_MANIFEST.md and runtime components
  const canonicalLabs: CanonicalPublicLabItem[] = [
    {
      id: 'lab-boot-seq',
      number: 'LAB 01',
      title: 'Simulador de Secuencia de Boot y POST',
      problemQuestion: '¿Tu PC no enciende?',
      tomoRelated: 'TOMO 08 — ARRANQUE Y DIAGNÓSTICO',
      labType: 'Simulador de Arranque',
      level: 'NIVEL 2: WINDOWS Y KERNEL',
      skillPracticed: 'Diagnóstico cronológico del POST, inyección de 35 fallas y reconstrucción BCD',
      status: 'DISPONIBLE',
      problema: 'La PC no da video, se apaga a los 2 segundos o arroja pantallas azules de arranque (0xc000000e, INACCESSIBLE_BOOT_DEVICE) sin saber si la causa es eléctrica, firmware UEFI o partición dañada.',
      accion: 'Recorrer cronológicamente los 9 hitos de inicio desde el botón POWER hasta winload.efi, midiendo con instrumental virtual e inyectando fallas deliberadas.',
      resultado: 'Localización exacta del microsegundo y componente donde se interrumpe la secuencia sin adivinar ni desarmar a ciegas.',
      evidencia: 'Código de estado POST verificado, registro de señal POWER_GOOD y validación del árbol de configuración BCD.',
      associatedToolId: 'diag-boot-seq',
      associatedToolName: 'DIAGNÓSTICO DE ARRANQUE Y 35 ESTADOS POST',
      icon: Power,
      action: () => onOpenBootLab(),
    },
    {
      id: 'lab-windows-matrix',
      number: 'LAB 02',
      title: 'Matriz Forense de Servicios Windows & X-Ray Kernel',
      problemQuestion: '¿Windows tiene microtirones y servicios parásitos?',
      tomoRelated: 'TOMO 02 — LA BIBLIA NEGRA DE WINDOWS',
      labType: 'Diagnóstico & Kernel',
      level: 'NIVEL 2: WINDOWS Y KERNEL',
      skillPracticed: 'Aislamiento pericial de hilos, auditoría de Ring 0/Ring 3 y descarte de latencias DPC/ISR',
      status: 'DISPONIBLE',
      problema: 'Degradación repentina de respuesta, 100% de uso en disco/CPU por servicios parásitos (SysMain, telemetría) y scripts de optimización que rompieron el sistema.',
      accion: 'Inspeccionar las estructuras del kernel NT, mapear dependencias de svchost, decodificar volcados BSOD y auditar colas de interrupción diferida (DPC).',
      resultado: 'Erradicación de procesos parásitos y estabilización del planificador de hilos sin corromper la integridad de Windows.',
      evidencia: 'Curva de latencia DPC en microsegundos (µs), árbol de procesos verificado y registro de eventos sin errores críticos.',
      associatedToolId: 'opt-nt-services',
      associatedToolName: 'AUDITOR DE SERVICIOS NT & PROCESOS DE FONDO',
      icon: Terminal,
      action: () => onOpenWindowsMatrixLab(),
    },
    {
      id: 'lab-hardware-hotswap',
      number: 'LAB 03',
      title: 'Lab Hot-Swap de Hardware (Latencia ns & Silicio)',
      problemQuestion: '¿No sabés dónde está el cuello de botella?',
      tomoRelated: 'TOMO 01 — CONOCÉ TU PC',
      labType: 'Simulación de Hardware',
      level: 'NIVEL 1: HARDWARE Y SILICIO',
      skillPracticed: 'Cálculo de latencia absoluta en nanosegundos y topología de interconexión CPU-RAM-PCIe',
      status: 'DISPONIBLE',
      problema: 'Microtirones en aplicaciones pesadas causados por desequilibrio de componentes, especificaciones confusas de folleto y memorias con latencias desfasadas.',
      accion: 'Intercambiar en caliente microprocesadores, placas madre y módulos DDR4/DDR5 en banco para observar la recodificación física de buses y tiempos de acceso.',
      resultado: 'Determinación matemática del punto exacto donde la memoria o el canal PCIe estrangulan el flujo de trabajo del procesador.',
      evidencia: 'Latencia absoluta calculada en nanosegundos (tCL / Frecuencia), ancho de banda efectivo en GB/s y saturación de carril PCIe.',
      associatedToolId: 'med-latency-calc',
      associatedToolName: 'CALCULADOR DE LATENCIAS DE SILICIO EN NANOSEGUNDOS',
      icon: Cpu,
      action: () => onOpenHotSwapLab('hardware'),
    },
    {
      id: 'lab-core-workbench',
      number: 'LAB 04',
      title: 'EVO Lab Core (Universal PC & Banco de Taller ATX)',
      problemQuestion: '¿Cómo protocolizar el descarte de fallas en banco?',
      tomoRelated: 'TOMO 03 — REPARACIÓN DE PC',
      labType: 'Banco de Taller',
      level: 'NIVEL 3: DIAGNÓSTICO Y REPARACIÓN',
      skillPracticed: 'Medición en los 24 pines ATX, descarte diferencial de fuentes y diagnóstico de chasis',
      status: 'DISPONIBLE',
      problema: 'Equipos de clientes que ingresan con síntomas inespecíficos ("se apaga sola", "olor a quemado", "no da POST") donde se cambian piezas sin diagnóstico previo.',
      accion: 'Montar la PC en banco de pruebas universal, medir voltajes en rieles ATX (+12V, +5V, +3.3V, -12V, +5VSB) y aplicar árbol de descarte escalonado.',
      resultado: 'Identificación inequívoca del módulo fallado (fuente, riel en corto o placa madre) con protocolo de reparación verificable.',
      evidencia: 'Voltajes instrumentales registrados bajo tolerancia ATX (±5%), prueba de cortocircuito en frío y dictamen de cierre.',
      associatedToolId: 'diag-atx-power-bench',
      associatedToolName: 'BANCO DE DESCARTE DE LÍNEAS DE PODER ATX',
      icon: Wrench,
      action: () => {
        if (onOpenLabCore) onOpenLabCore('SELECT_PC');
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'lab-perf-metrology',
      number: 'LAB 05',
      title: 'Laboratorio de Rendimiento & Metrología de Frametimes',
      problemQuestion: '¿Una configuración mejora realmente el rendimiento?',
      tomoRelated: 'TOMO 07 — GAMING PRO / RENDIMIENTO',
      labType: 'Metrología de Rendimiento',
      level: 'NIVEL 5: RENDIMIENTO Y GAMING',
      skillPracticed: 'Captura de frametimes cuadro a cuadro, percentiles 1% low y cámara de contraste A/B',
      status: 'DISPONIBLE',
      problema: 'Fluctuaciones de FPS y micro-stuttering en cargas pesadas donde las supuestas guías de optimización prometen mejoras mágicas sin pruebas científicas.',
      accion: 'Capturar la cadencia de renderizado fotograma a fotograma, calcular percentiles críticos (1% y 0.1% low) y someter el sistema a cámara de ensayo A/B.',
      resultado: 'Comprobación cuantitativa de si un cambio de hardware o configuración redujo realmente la dispersión de cuadros o si es un efecto placebo.',
      evidencia: 'Histograma de frametimes en milisegundos (ms), percentiles de caída 1% low y coeficiente de consistencia métrica.',
      associatedToolId: 'med-frametime-analyzer',
      associatedToolName: 'ANALIZADOR METROLÓGICO DE FRAMETIMES (1% & 0.1% LOWS)',
      icon: Activity,
      action: () => {
        if (onOpenPerfMetrology) onOpenPerfMetrology();
        else onOpenHotSwapLab('telemetry');
      },
    },
    {
      id: 'lab-cases-resolver',
      number: 'LAB 06',
      title: 'Taller de Casos & Central Forense de Taller',
      problemQuestion: '¿Cómo resolver fallas complejas con método científico?',
      tomoRelated: 'TOMO 03 — REPARACIÓN DE PC',
      labType: 'Banco de Taller',
      level: 'NIVEL 3: DIAGNÓSTICO Y REPARACIÓN',
      skillPracticed: 'Triaje deductivo, formulación de hipótesis técnicas y emisión de expedientes periciales',
      status: 'DISPONIBLE',
      problema: 'Fallas intermitentes y equipos con múltiples síntomas superpuestos que confunden al técnico novato y provocan pérdidas de tiempo.',
      accion: 'Recibir expedientes periciales con síntomas reales, seleccionar instrumental de diagnóstico, contrastar hipótesis y emitir dictamen.',
      resultado: 'Resolución metódica del caso aislando la causa raíz sin depender de ensayos destructivos al azar.',
      evidencia: 'Expediente forense emitido con hash de integridad, árbol de decisiones validado y hallazgos respaldados.',
      associatedToolId: 'diag-case-resolver',
      associatedToolName: 'RESOLUTOR DE CASOS PERICIALES CON ÁRBOL DE DECISIÓN',
      icon: FileCheck,
      action: () => {
        if (onOpenCaseResolver) onOpenCaseResolver();
        else onOpenWindowsMatrixLab('crash-repair');
      },
    },
    {
      id: 'lab-digital-twin',
      number: 'LAB 07',
      title: 'Gemelo Digital Interactivo (12 Subsistemas de Silicio)',
      problemQuestion: '¿Cómo interactúan todos los componentes entre sí?',
      tomoRelated: 'TOMO 01 — CONOCÉ TU PC',
      labType: 'Simulación de Hardware',
      level: 'NIVEL 1: HARDWARE Y SILICIO',
      skillPracticed: 'Modelado determinista de hardware local y simulación de fallas en cascada',
      status: 'DISPONIBLE',
      problema: 'Incapacidad de visualizar cómo una caída en un carril o subsistema (VRM, PCIe, IMC) repercute en el resto de la arquitectura del equipo.',
      accion: 'Explorar la réplica digital determinista de la computadora, aislando cada uno de los 12 subsistemas con inyección de eventos en tiempo real.',
      resultado: 'Comprensión espacial y eléctrica del flujo de datos en toda la placa madre sin riesgo físico para el hardware.',
      evidencia: 'Matriz de telemetría de subsistemas sincronizada y registro de impacto causal interconectado.',
      associatedToolId: 'inv-digital-twin',
      associatedToolName: 'DIGITAL TWIN (GEMELO DIGITAL INTERACTIVO)',
      icon: Boxes,
      action: () => {
        if (onOpenDigitalTwin) onOpenDigitalTwin();
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'lab-net-forensics',
      number: 'LAB 08',
      title: 'Evo Network Forensics Lab (Inspección de Tráfico)',
      problemQuestion: '¿Tenés pérdida de paquetes o latencia inestable?',
      tomoRelated: 'TOMO 05 — REDES',
      labType: 'Forense de Redes',
      level: 'NIVEL 4: REDES Y SEGURIDAD',
      skillPracticed: 'Captura de paquetes, diagnóstico de bufferbloat y análisis de propagación DNS',
      status: 'DISPONIBLE',
      problema: 'Microcortes en videollamadas y juegos competitivos sin poder determinar si el origen es el cableado físico, saturación del router o ruteo externo del ISP.',
      accion: 'Inyectar tráfico simulado, capturar cabeceras Ethernet/IP/TCP, calcular colas de bufferbloat y auditar tiempos de respuesta DNS.',
      resultado: 'Diagnóstico concluyente del tramo con pérdida de paquetes y configuración de colas de baja latencia.',
      evidencia: 'Registro de pérdida de paquetes (loss %), dispersión de jitter en ms y árbol de resolución de nombres.',
      associatedToolName: 'Sin herramienta específica asociada',
      icon: Globe,
      action: () => {
        if (onOpenNetForensics) onOpenNetForensics();
        else if (onOpenTomo) onOpenTomo('05');
        else onOpenHotSwapLab('telemetry');
      },
    },
    {
      id: 'lab-defensive-sec',
      number: 'LAB 09',
      title: 'Evo Defensive Security Lab (Hardening & Kernel)',
      problemQuestion: '¿Tu sistema está protegido contra exploits de bajo nivel?',
      tomoRelated: 'TOMO 06 — CIBERSEGURIDAD',
      labType: 'Seguridad Defensiva',
      level: 'NIVEL 4: REDES Y SEGURIDAD',
      skillPracticed: 'Bastionado de Windows, mitigación de vulnerabilidades y contención de binarios',
      status: 'DISPONIBLE',
      problema: 'Sistemas expuestos a malware con privilegios elevados, persistencias en el registro y explotación de servicios no auditados.',
      accion: 'Configurar políticas defensivas de grupo (GPO), verificar integridad de controladores en Ring 0 y aislar procesos sospechosos.',
      resultado: 'Endurecimiento perimetral comprobable bajo las directrices del marco MITRE ATT&CK.',
      evidencia: 'Puntuación de hardening de seguridad, auditoría de tokens de privilegios y log de contención.',
      associatedToolName: 'Sin herramienta específica asociada',
      icon: Shield,
      action: () => {
        if (onOpenDefensiveSec) onOpenDefensiveSec();
        else if (onOpenTomo) onOpenTomo('06');
        else onOpenWindowsMatrixLab('services');
      },
    },
    {
      id: 'lab-code-eng',
      number: 'LAB 10',
      title: 'Evo Code Engineering Lab (Compilador en Vivo)',
      problemQuestion: '¿Cómo crear tus propios scripts periciales?',
      tomoRelated: 'TOMO 09 — PROGRAMACIÓN DESDE CERO',
      labType: 'Ingeniería de Software',
      level: 'NIVEL 6: SISTEMAS Y KERNEL',
      skillPracticed: 'Desarrollo de scripts técnicos en TypeScript/Python y depuración de código de diagnóstico',
      status: 'DISPONIBLE',
      problema: 'El técnico necesita recolectar telemetría o automatizar descarte pero depende de programas cerrados sin saber qué ejecutan en segundo plano.',
      accion: 'Escribir algoritmos de diagnóstico, compilar en tiempo real en el navegador y ejecutar pruebas unitarias sobre datos simulados.',
      resultado: 'Desarrollo de herramientas periciales propias, transparentes y adaptadas al entorno de trabajo.',
      evidencia: 'Salida de compilación limpia, validación de estructuras de datos y cobertura de pruebas periciales.',
      associatedToolName: 'Sin herramienta específica asociada',
      icon: Code,
      action: () => {
        if (onOpenCodeEng) onOpenCodeEng();
        else if (onOpenTomo) onOpenTomo('09');
        else onOpenWindowsMatrixLab('services');
      },
    },
    {
      id: 'lab-ai-systems',
      number: 'LAB 11',
      title: 'Evo AI Systems Lab (Banco de Agentes Deterministas)',
      problemQuestion: '¿Cómo evitar que una IA alucine en soporte técnico?',
      tomoRelated: 'TOMO 10 — PROMPT E IA AVANZADA',
      labType: 'Sistemas de IA',
      level: 'NIVEL 6: SISTEMAS Y KERNEL',
      skillPracticed: 'Diseño de prompts estructurados, pipelines RAG deterministas y evaluación empírica',
      status: 'DISPONIBLE',
      problema: 'Uso amateur de chats de IA que devuelven respuestas inventadas, comandos destructivos o diagnósticos falsos para soporte.',
      accion: 'Diseñar arquitecturas de contexto controlado, ejecutar function calling determinista y medir consistencia frente a un set de pruebas técnicas.',
      resultado: 'Copiloto técnico calibrado que solo responde respaldado por hechos y mediciones instrumentales.',
      evidencia: 'Matriz de calibración de respuestas, trazabilidad de llamadas a APIs y tasa de fidelidad empírica.',
      associatedToolName: 'Sin herramienta específica asociada',
      icon: Sparkles,
      action: () => {
        if (onOpenAiSystems) onOpenAiSystems();
        else if (onOpenTomo) onOpenTomo('10');
        else onOpenWindowsMatrixLab('services');
      },
    },
    {
      id: 'lab-game-forge',
      number: 'LAB 12',
      title: 'Game Forge Studio & Proyecto Mundo Max',
      problemQuestion: '¿Cómo opera un motor gráfico sin sobrecargar la CPU/GPU?',
      tomoRelated: 'TOMO 12 — INGENIERÍA Y CREACIÓN DE VIDEOJUEGOS',
      labType: 'Game Forge & Físicas',
      level: 'NIVEL 8: GAME FORGE Y SIMULACIÓN',
      skillPracticed: 'Arquitectura de Game Loop, física con delta time ($dt$) y compilación de shaders',
      status: 'DISPONIBLE',
      problema: 'Tirones y físicas desincronizadas en videojuegos cuando la tasa de cuadros fluctúa o los shaders están mal optimizados.',
      accion: 'Experimentar con el game loop desacoplado, variar el fixed timestep y compilar shaders GLSL observando el uso de pipelines.',
      resultado: 'Simulador interactivo con cálculo determinista de físicas y estabilidad de cuadros por segundo.',
      evidencia: 'Curva de consistencia de delta time ($dt$), tasa de despacho geométrico y precisión de colisiones vectoriales.',
      associatedToolName: 'Sin herramienta específica asociada',
      icon: Gamepad2,
      action: () => {
        if (onOpenGameForge) onOpenGameForge();
        else if (onOpenTomo) onOpenTomo('12');
        else onOpenHotSwapLab('telemetry');
      },
    },
    {
      id: 'lab-eval-transfer',
      number: 'LAB 13',
      title: 'Desafío de Transferencia & Evaluación Práctica',
      problemQuestion: '¿Podés resolver un caso real sin ayuda?',
      tomoRelated: 'GLOBAL // INTEGRACIÓN PERICIAL',
      labType: 'Banco de Taller',
      level: 'NIVEL MULTIDISCIPLINARIO',
      skillPracticed: 'Resolución integral de fallas en condiciones controladas de examen',
      status: 'DISPONIBLE',
      problema: 'Separar el conocimiento teórico memorizado de la capacidad operativa real de resolver un problema en banco de trabajo.',
      accion: 'Enfrentar escenarios cronometrados con inyección de múltiples fallas superpuestas y documentar el dictamen pericial.',
      resultado: 'Certificación fehaciente de competencia técnica basada en resultados empíricos y no en memoria.',
      evidencia: 'Dossier pericial sellado con calificación metrológica y registro de decisiones de banco.',
      associatedToolId: 'doc-transfer-challenge',
      associatedToolName: 'BANCO DE DESAFÍOS DE TRANSFERENCIA Y EVALUACIÓN',
      icon: CheckCircle2,
      action: () => {
        if (onOpenTransferChallenge) onOpenTransferChallenge();
        else onOpenWindowsMatrixLab('services');
      },
    },
    {
      id: 'lab-notebook-power',
      number: 'LAB 14',
      title: 'Banco de Portátiles & Power Rails',
      problemQuestion: '¿Tu notebook no da imagen ni carga la batería?',
      tomoRelated: 'TOMO 04 — REPARACIÓN DE NOTEBOOKS',
      labType: 'Microelectrónica',
      level: 'NIVEL 3: DIAGNÓSTICO Y REPARACIÓN',
      skillPracticed: 'Seguimiento de esquemáticos móviles, líneas eDP y convertidores DC-DC',
      status: 'EN DESARROLLO',
      problema: 'Fallas de encendido en placas compactas por fusibles abiertos o cortocircuitos en rieles de alimentación primarios.',
      accion: 'Trazar líneas de alimentación esquemáticas, medir impedancias en rieles clave e identificar puntos de corte.',
      resultado: 'Aislamiento del circuito de carga o riel secundario defectuoso sin recalentar componentes innecesariamente.',
      evidencia: 'Mapeo esquemático de voltajes primarios y verificación de señal de habilitación (ENABLE).',
      associatedToolId: 'inv-pcb-schematic',
      associatedToolName: 'ESQUEMÁTICO INTERACTIVO DE PLACA MADRE & PISTAS VRM',
      icon: FlaskConical,
      action: () => {
        if (onOpenTomo) onOpenTomo('04');
        else onOpenHotSwapLab('hardware');
      },
    },
  ];

  // 10 Simuladores Interactivos Autónomos de Silicio, Kernel y Hardware
  const canonicalSimulators: CanonicalSimulatorItem[] = [
    {
      id: 'sim-boot-seq',
      number: 'SIM 01',
      title: 'Simulador de Secuencia de Boot y 35 Estados POST',
      subtitle: 'Cronología eléctrica de inicio, firmware UEFI y multímetro virtual',
      tomoRelated: 'TOMO 08 — ARRANQUE Y DIAGNÓSTICO',
      category: 'HARDWARE & FIRMWARE',
      description: 'Recorrido paso a paso de los 9 hitos de inicio desde el botón de encendido hasta winload.efi, con inyección de 35 fallas reales.',
      capabilities: ['35 Estados POST', 'Medición Rieles ATX', 'Reconstrucción BCD', 'UEFI NVRAM'],
      status: 'DISPONIBLE',
      icon: Power,
      action: () => onOpenBootLab(),
    },
    {
      id: 'sim-windows-xray',
      number: 'SIM 02',
      title: 'Simulador Windows X-Ray Kernel & NT Internals',
      subtitle: 'Inspección radiológica del núcleo de Windows, Ring 0 y despacho de hilos',
      tomoRelated: 'TOMO 02 — LA BIBLIA NEGRA DE WINDOWS',
      category: 'KERNEL & SISTEMAS',
      description: 'Diagnóstico de colisiones de kernel, análisis de volcados BSOD en vivo, auditoría de llamadas de sistema e inspección de drivers.',
      capabilities: ['Kernel X-Ray', 'Decodificador BSOD', 'Auditoría DPC/ISR', 'Agente Live Telemetría'],
      status: 'DISPONIBLE',
      icon: Terminal,
      action: () => {
        if (onOpenWindowsXRayLab) onOpenWindowsXRayLab('xray');
        else onOpenWindowsMatrixLab('xray');
      },
    },
    {
      id: 'sim-uefi-boot',
      number: 'SIM 03',
      title: 'Simulador de Arranque Windows Boot Manager & BCD',
      subtitle: 'Cadena de ejecución de bootmgfw.efi a ntoskrnl.exe',
      tomoRelated: 'TOMO 02 / TOMO 08',
      category: 'SISTEMAS OPERATIVOS',
      description: 'Simulación profunda de la partición ESP, Secure Boot, lectura del BCD e inicialización del núcleo NT de 64 bits.',
      capabilities: ['Cadena EFI', 'Firma Criptográfica', 'Validación TPM 2.0', 'Modo Largo 64-bit'],
      status: 'DISPONIBLE',
      icon: HardDrive,
      action: () => onOpenWindowsMatrixLab('boot'),
    },
    {
      id: 'sim-hw-hotswap',
      number: 'SIM 04',
      title: 'Simulador Hot-Swap de Hardware (Nanosegundos & Silicio)',
      subtitle: 'Intercambio en caliente de procesadores, RAM y topología PCIe',
      tomoRelated: 'TOMO 01 — CONOCÉ TU PC',
      category: 'HARDWARE & SILICIO',
      description: 'Banco dinámico para intercambiar piezas y medir el impacto directo en latencia absoluta, frecuencia y saturación de carriles.',
      capabilities: ['Intercambio en Caliente', 'Latencia ns (tCL/Freq)', 'Topología PCIe 4.0/5.0', 'Descarte de Cuello de Botella'],
      status: 'DISPONIBLE',
      icon: Cpu,
      action: () => onOpenHotSwapLab('hardware'),
    },
    {
      id: 'sim-sw-hotswap',
      number: 'SIM 05',
      title: 'Simulador Hot-Swap de Software & Drivers NT',
      subtitle: 'Aislamiento de microtirones, servicios parásitos y colas DPC',
      tomoRelated: 'TOMO 03 — REPARACIÓN DE PC',
      category: 'SISTEMAS & DRIVERS',
      description: 'Inyección de fallas de controladores gráficos y de red para medir la latencia del sistema sin arriesgar la PC física.',
      capabilities: ['Aislamiento DPC/ISR', 'Pruebas sin Modificar PC', 'Curva de Latencia µs', 'Descarte de Servicios'],
      status: 'DISPONIBLE',
      icon: Sliders,
      action: () => onOpenHotSwapLab('software'),
    },
    {
      id: 'sim-ultimate-sandbox',
      number: 'SIM 06',
      title: 'EVO Ultimate Sandbox (Microarquitectura & Buses)',
      subtitle: 'Explorador interactivo de jerarquía de caché, IMC y VRM',
      tomoRelated: 'TOMO 01 / TOMO 07',
      category: 'ARQUITECTURA DE SILICIO',
      description: 'Entorno de simulación de bajo nivel para visualizar el flujo de instrucciones por los registros, el IMC y la distribución de energía.',
      capabilities: ['Registros CPU', 'Caché L1/L2/L3', 'VRM & Power Delivery', 'Buses de Datos'],
      status: 'DISPONIBLE',
      icon: Layers,
      action: () => onOpenHotSwapLab('sandbox'),
    },
    {
      id: 'sim-thermal-telemetry',
      number: 'SIM 07',
      title: 'Simulador de Telemetría Térmica & Throttling',
      subtitle: 'Curvas de temperatura de juntura TjMax, disipación y perfiles de carga',
      tomoRelated: 'TOMO 01 / TOMO 05',
      category: 'METROLOGÍA & ENERGÍA',
      description: 'Simulación de pruebas de tortura y estrés térmico para analizar throttling por temperatura y degradación por voltaje.',
      capabilities: ['Historial Térmico', 'Curvas TjMax', 'Simulación de Tortura', 'Delta Ambiente/Die'],
      status: 'DISPONIBLE',
      icon: Flame,
      action: () => onOpenHotSwapLab('telemetry'),
    },
    {
      id: 'sim-pc-builder',
      number: 'SIM 08',
      title: 'Universal PC Builder & Simulador de Armado',
      subtitle: 'Matriz de compatibilidad física, presupuestos y validación de componentes',
      tomoRelated: 'TOMO 03 — REPARACIÓN DE PC',
      category: 'BANCO DE TALLER',
      description: 'Construcción de equipos en banco virtual comprobando compatibilidad de sockets, consumo energético de fuente y clearance de chasis.',
      capabilities: ['Grafo de Compatibilidad', 'Cálculo de Consumo W', 'Balance Presupuestario', 'Armado Guiado'],
      status: 'DISPONIBLE',
      icon: Wrench,
      action: () => {
        if (onOpenLabCore) onOpenLabCore('BUILD_PC');
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'sim-clean-install',
      number: 'SIM 09',
      title: 'Simulador de Instalación Limpia de Windows',
      subtitle: 'Particionado GPT, particiones de recuperación y optimización base',
      tomoRelated: 'TOMO 02 — LA BIBLIA NEGRA DE WINDOWS',
      category: 'SISTEMAS OPERATIVOS',
      description: 'Entorno paso a paso para dominar el particionado limpio, descarte de bloatware de fabricante y configuración sin telemetría.',
      capabilities: ['Particionado diskpart GPT', 'Descarte de Bloatware', 'Aislamiento de Cuentas', 'Plantillas ISO'],
      status: 'DISPONIBLE',
      icon: HardDrive,
      action: () => onOpenWindowsMatrixLab('install'),
    },
    {
      id: 'sim-windows-repair',
      number: 'SIM 10',
      title: 'Simulador de Reparación de Fallas de Windows',
      subtitle: 'Resolución de corrupción en System32, WinRE y almacén WinSxS',
      tomoRelated: 'TOMO 02 — LA BIBLIA NEGRA DE WINDOWS',
      category: 'REPARACIÓN & KERNEL',
      description: 'Protocolos de rescate con SFC /scannow, DISM RestoreHealth y reconstrucción de perfiles de usuario dañados.',
      capabilities: ['Integridad SFC/DISM', 'Entorno WinRE', 'Reparación de BCD', 'Análisis de Volcados'],
      status: 'DISPONIBLE',
      icon: Shield,
      action: () => onOpenWindowsMatrixLab('repair'),
    },
  ];

  // 8 Estaciones Oficiales del Campus EVO
  const campusZonesList: CanonicalCampusZoneCard[] = [
    {
      id: 'campus-zone-01',
      number: 'ZONA 01',
      title: 'Lab 01: Central de Incidentes',
      subtitle: 'Mesa pericial de triage, recepción de casos y fallas críticas',
      category: 'DIAGNÓSTICO & INCIDENTES',
      description: 'Estación central donde ingresan los incidentes técnicos de alta complejidad para su clasificación y asignación a bancos.',
      specialty: 'Triage, registro forense y priorización de emergencias.',
      status: 'DISPONIBLE',
      icon: Activity,
      action: () => {
        if (onOpenCampusLab) onOpenCampusLab('zona-1');
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'campus-zone-02',
      number: 'ZONA 02',
      title: 'Lab 02: Taller de Rendimiento',
      subtitle: 'Metrología avanzada, latencias DPC y análisis de frametimes',
      category: 'METROLOGÍA DE RENDIMIENTO',
      description: 'Puesto especializado en instrumental de telemetría de alta resolución, osciloscopios virtuales y descarte de microtirones.',
      specialty: 'Percentiles 1% low, latencia en nanosegundos y optimización de render.',
      status: 'DISPONIBLE',
      icon: Zap,
      action: () => {
        if (onOpenCampusLab) onOpenCampusLab('zona-2');
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'campus-zone-03',
      number: 'ZONA 03',
      title: 'Lab 03: Archivo EVO',
      subtitle: 'Bóveda de expedientes técnicos, esquemas y manuales de arquitectura',
      category: 'DOCUMENTACIÓN & INVESTIGACIÓN',
      description: 'Repositorio canónico de diagramas de placa, manuales de servicio pericial y biblioteca técnica de los 12 Tomos.',
      specialty: 'Esquemas de PCB, pinouts ATX y base de conocimiento.',
      status: 'DISPONIBLE',
      icon: Layers,
      action: () => {
        if (onOpenCampusLab) onOpenCampusLab('zona-3');
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'campus-zone-04',
      number: 'ZONA 04',
      title: 'Lab 04: Cámara de Experimentos',
      subtitle: 'Cámara de tortura, pruebas de estrés y estabilidad extrema',
      category: 'ESTRÉS & ESTABILIDAD',
      description: 'Espacio de validación técnica donde se someten componentes a cargas de estrés térmico y eléctrico prolongadas.',
      specialty: 'Validación de overclock/undervolt, curvas de temperatura y peritaje de estabilidad.',
      status: 'DISPONIBLE',
      icon: Flame,
      action: () => {
        if (onOpenCampusLab) onOpenCampusLab('zona-4');
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'campus-zone-05',
      number: 'ZONA 05',
      title: 'Lab 05: Sala de Máquinas',
      subtitle: 'Infraestructura de energía, distribución ATX y rieles de poder',
      category: 'ENERGÍA & BANCO DE TALLER',
      description: 'Taller de diagnóstico eléctrico enfocado en fuentes de poder, etapas VRM y comportamiento de rieles de alimentación.',
      specialty: 'Rieles +12V/+5V/+3.3V, transitorios de carga y protección OCP/OVP.',
      status: 'DISPONIBLE',
      icon: Server,
      action: () => {
        if (onOpenCampusLab) onOpenCampusLab('zona-5');
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'campus-zone-06',
      number: 'ZONA 06',
      title: 'Lab 06: Zona Restringida',
      subtitle: 'Arquitectura de Kernel NT, Ring 0 y desensamblado de código',
      category: 'BAJO NIVEL & KERNEL',
      description: 'Laboratorio de acceso restringido para ingeniería inversa, aislamiento de llamadas de sistema e investigación de seguridad.',
      specialty: 'Sysinternals, arquitectura de Ring 0 y análisis de microcódigo.',
      status: 'DISPONIBLE',
      icon: Shield,
      action: () => {
        if (onOpenCampusLab) onOpenCampusLab('zona-6');
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'campus-zone-07',
      number: 'ZONA 07',
      title: 'Lab 07: Mi Laboratorio',
      subtitle: 'Puesto personalizado del técnico, gemelo digital y herramientas activas',
      category: 'PASAPORTE TÉCNICO & IDENTIDAD',
      description: 'Entorno individual donde cada usuario gestiona su pasaporte de hardware, expedientes resueltos y gemelo digital activo.',
      specialty: 'Perfil pericial, gemelo digital y progreso de certificación.',
      status: 'DISPONIBLE',
      icon: Compass,
      action: () => {
        if (onOpenCampusLab) onOpenCampusLab('zona-7');
        else onOpenHotSwapLab('all');
      },
    },
    {
      id: 'campus-zone-08',
      number: 'ZONA 08',
      title: 'Lab 08: Comunidad EVO',
      subtitle: 'Mesa redonda pericial, intercambio de casos reales y debates de taller',
      category: 'COMUNIDAD & TRANSFERENCIA',
      description: 'Espacio colegiado donde la comunidad de técnicos y especialistas somete diagnósticos a revisión y debate metodológico.',
      specialty: 'Resolución colectiva de casos raros y transferencia de habilidades.',
      status: 'DISPONIBLE',
      icon: Globe,
      action: () => {
        if (onOpenCampusLab) onOpenCampusLab('zona-8');
        else onOpenHotSwapLab('all');
      },
    },
  ];

  const categoryFilterMap: Record<string, string[]> = {
    SISTEMAS: ['lab-boot-seq', 'lab-windows-matrix', 'lab-code-eng', 'lab-ai-systems'],
    HARDWARE: ['lab-hardware-hotswap', 'lab-digital-twin', 'lab-notebook-power'],
    TALLER: ['lab-core-workbench', 'lab-cases-resolver', 'lab-eval-transfer'],
    METROLOGIA: ['lab-perf-metrology', 'lab-hardware-hotswap', 'lab-game-forge'],
    REDES_SEGURIDAD: ['lab-net-forensics', 'lab-defensive-sec'],
  };

  const filteredLabs = canonicalLabs.filter((lab) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lab.title.toLowerCase().includes(q) ||
      lab.problemQuestion.toLowerCase().includes(q) ||
      lab.problema.toLowerCase().includes(q) ||
      lab.tomoRelated.toLowerCase().includes(q) ||
      lab.associatedToolName.toLowerCase().includes(q) ||
      lab.skillPracticed.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (selectedFilter === 'ALL') return true;
    const allowed = categoryFilterMap[selectedFilter] || [];
    return allowed.includes(lab.id);
  });

  const filteredSimulators = canonicalSimulators.filter((sim) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      sim.title.toLowerCase().includes(q) ||
      sim.subtitle.toLowerCase().includes(q) ||
      sim.description.toLowerCase().includes(q) ||
      sim.tomoRelated.toLowerCase().includes(q) ||
      sim.category.toLowerCase().includes(q) ||
      sim.capabilities.some((c) => c.toLowerCase().includes(q))
    );
  });

  const filteredCampusZones = campusZonesList.filter((zone) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      zone.title.toLowerCase().includes(q) ||
      zone.subtitle.toLowerCase().includes(q) ||
      zone.description.toLowerCase().includes(q) ||
      zone.category.toLowerCase().includes(q) ||
      zone.specialty.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-mono-tech select-none">
      
      {/* 1. HEADER DE IDENTIDAD PEDAGÓGICA EVO */}
      <div className="space-y-4 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span className="text-xs tracking-widest text-amber-400 uppercase font-black">
            PRACTICAR // SUITE DE LABORATORIOS EXPERIMENTALES ({canonicalLabs.length} LABORATORIOS)
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
              PRACTICAR EN EVO LABS
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 font-sans-editorial max-w-2xl leading-relaxed">
              El laboratorio debe sentirse como una investigación, no como una demo decorativa. Cada práctica parte de una falla real y culmina en evidencia contrastada.
            </p>
          </div>

          {/* LEMA & MANIFIESTO METODOLÓGICO */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850 space-y-2 self-start lg:self-auto min-w-[280px]">
            <div className="text-[11px] font-black tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>NO ADIVINES. COMPROBALO.</span>
            </div>
            {/* FLUJO DE INVESTIGACIÓN: OBSERVÁ → INTERVENÍ → MEDÍ → COMPARÁ → COMPROBÁ */}
            <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-zinc-400 tracking-wider overflow-x-auto py-0.5">
              <span className="text-zinc-200">OBSERVÁ</span>
              <span className="text-zinc-600">→</span>
              <span className="text-amber-400">INTERVENÍ</span>
              <span className="text-zinc-600">→</span>
              <span className="text-zinc-200">MEDÍ</span>
              <span className="text-zinc-600">→</span>
              <span className="text-zinc-200">COMPARÁ</span>
              <span className="text-zinc-600">→</span>
              <span className="text-emerald-400">COMPROBÁ</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SELECTOR PRINCIPAL DE TIPO DE EXPERIENCIA */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-850">
        {[
          { id: 'ALL', label: 'TODAS LAS EXPERIENCIAS', count: canonicalLabs.length + canonicalSimulators.length + campusZonesList.length },
          { id: 'LABS', label: 'LABORATORIOS PERICIALES', count: canonicalLabs.length },
          { id: 'SIMS', label: 'SIMULADORES INTERACTIVOS', count: canonicalSimulators.length },
          { id: 'ZONES', label: 'ZONAS DEL CAMPUS', count: campusZonesList.length },
        ].map((tab) => {
          const isSelected = experienceType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setExperienceType(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase transition-all whitespace-nowrap cursor-pointer border flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-400 text-black border-amber-400 shadow-md font-black'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-850 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${isSelected ? 'bg-black/20 text-black font-black' : 'bg-zinc-900 text-zinc-500'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. BARRA DE FILTROS Y BÚSQUEDA ORIENTADA POR PROBLEMAS */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por pregunta, problema, falla o herramienta..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-850 text-xs font-mono-tech text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {(experienceType === 'ALL' || experienceType === 'LABS') && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tech text-xs custom-scrollbar">
            {([
              { id: 'ALL', label: 'TODOS (14)' },
              { id: 'SISTEMAS', label: 'SISTEMAS & KERNEL' },
              { id: 'HARDWARE', label: 'HARDWARE & SILICIO' },
              { id: 'TALLER', label: 'TALLER & BANCO' },
              { id: 'METROLOGIA', label: 'METROLOGÍA' },
              { id: 'REDES_SEGURIDAD', label: 'REDES & SEGURIDAD' },
            ] as const).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  selectedFilter === cat.id
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-850'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. SECCIÓN DE LABORATORIOS CANÓNICOS CON ESTRUCTURA OBLIGATORIA */}
      {(experienceType === 'ALL' || experienceType === 'LABS') && (
        <div className="space-y-4">
          {experienceType === 'ALL' && (
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  LABORATORIOS GUIADOS DE INVESTIGACIÓN ({filteredLabs.length})
                </h2>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono-tech uppercase">
                ESTRUCTURA METROLÓGICA COMPLETA
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredLabs.map((lab) => {
              const IconComp = lab.icon;
              const isAvailable = lab.status === 'DISPONIBLE';

              return (
                <div
                  key={lab.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#090b10] border border-zinc-850 transition-all flex flex-col justify-between space-y-5 shadow-xl hover:border-zinc-700/80 group"
                >
                  <div className="space-y-4">
                    {/* Meta Header */}
                    <div className="flex items-center justify-between gap-2 flex-wrap border-b border-zinc-900 pb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 rounded font-black uppercase font-mono-tech bg-amber-400/10 text-amber-400 border border-amber-400/30">
                          {lab.number}
                        </span>
                        <span className="text-zinc-600">/</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">
                          {lab.labType}
                        </span>
                      </div>

                      <span
                        className={`text-[9px] px-2 py-0.5 rounded font-mono-tech font-black uppercase border ${
                          isAvailable
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        ● {lab.status}
                      </span>
                    </div>

                    {/* Pregunta orientada a problemas */}
                    <div>
                      <span className="text-xs font-sans-editorial italic font-bold text-amber-300 block">
                        “{lab.problemQuestion}”
                      </span>
                      <div className="flex items-start gap-3 mt-1.5">
                        <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-amber-400 shrink-0 mt-0.5">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-display font-black text-lg text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                            {lab.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono-tech mt-0.5">
                            <span className="text-zinc-300 font-semibold">{lab.tomoRelated}</span>
                            <span>•</span>
                            <span>{lab.level}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Habilidad que se practica */}
                    <div className="text-[11px] font-sans-editorial text-zinc-300 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900">
                      <span className="text-[9px] text-zinc-500 uppercase font-bold block font-mono-tech mb-0.5">
                        HABILIDAD QUE SE PRACTICA
                      </span>
                      <span>{lab.skillPracticed}</span>
                    </div>

                    {/* FLUJO VISUAL OBLIGATORIO: PROBLEMA ↓ ACCIÓN ↓ RESULTADO ↓ EVIDENCIA */}
                    <div className="space-y-2 pt-1 font-mono-tech text-xs">
                      {/* [ PROBLEMA ] */}
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-900 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                          <span>PROBLEMA</span>
                        </div>
                        <p className="font-sans-editorial text-xs text-zinc-300 leading-relaxed">
                          {lab.problema}
                        </p>
                      </div>

                      {/* Flecha hacia abajo */}
                      <div className="flex justify-center text-zinc-700 -my-1">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>

                      {/* [ ACCIÓN ] */}
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-amber-500/20 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          <span>ACCIÓN</span>
                        </div>
                        <p className="font-sans-editorial text-xs text-zinc-300 leading-relaxed">
                          {lab.accion}
                        </p>
                      </div>

                      {/* Flecha hacia abajo */}
                      <div className="flex justify-center text-zinc-700 -my-1">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>

                      {/* [ RESULTADO ] */}
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-900 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                          <span>RESULTADO</span>
                        </div>
                        <p className="font-sans-editorial text-xs text-zinc-300 leading-relaxed">
                          {lab.resultado}
                        </p>
                      </div>

                      {/* Flecha hacia abajo */}
                      <div className="flex justify-center text-zinc-700 -my-1">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>

                      {/* [ EVIDENCIA ] */}
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-emerald-500/30 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>EVIDENCIA GENERADA</span>
                        </div>
                        <p className="font-sans-editorial text-xs text-emerald-200/90 leading-relaxed">
                          {lab.evidencia}
                        </p>
                      </div>
                    </div>

                    {/* Herramienta EVO Relacionada */}
                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono-tech text-zinc-500 uppercase font-bold">
                        HERRAMIENTA EVO:
                      </span>
                      {lab.associatedToolName !== 'Sin herramienta específica asociada' ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-amber-400/25 font-bold uppercase truncate max-w-[260px]">
                          {lab.associatedToolName}
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500 italic">
                          Sin herramienta específica asociada
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button: CTA Principal [ ABRIR LABORATORIO ] */}
                  <div className="pt-3 border-t border-zinc-900">
                    {isAvailable ? (
                      <button
                        type="button"
                        onClick={lab.action}
                        className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                      >
                        <span>[ ABRIR {lab.number} ]</span>
                        <ArrowRight className="w-3.5 h-3.5 text-black" />
                      </button>
                    ) : (
                      <div className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-zinc-500 text-xs font-bold uppercase tracking-wider text-center border border-zinc-800">
                        [ EN DESARROLLO ]
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. SECCIÓN DE SIMULADORES INTERACTIVOS */}
      {(experienceType === 'ALL' || experienceType === 'SIMS') && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                SIMULADORES INTERACTIVOS DE HARDWARE & KERNEL ({filteredSimulators.length})
              </h2>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono-tech uppercase">
              MODELOS INTERACTIVOS AUTÓNOMOS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredSimulators.map((sim) => {
              const SimIcon = sim.icon;
              return (
                <div
                  key={sim.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#090b10] border border-cyan-900/30 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-900 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded font-black uppercase font-mono-tech bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          {sim.number}
                        </span>
                        <span className="text-zinc-600">/</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">
                          {sim.category}
                        </span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded font-mono-tech font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        ● {sim.status}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 shrink-0 mt-0.5">
                        <SimIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-lg text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                          {sim.title}
                        </h3>
                        <p className="text-xs text-zinc-400 font-sans-editorial mt-0.5">
                          {sim.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed bg-zinc-950/80 p-3 rounded-xl border border-zinc-900">
                      {sim.description}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap pt-1 font-mono-tech text-[10px]">
                      {sim.capabilities.map((cap, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-cyan-900/40">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-mono-tech text-zinc-500 truncate">
                      {sim.tomoRelated}
                    </span>
                    <button
                      type="button"
                      onClick={sim.action}
                      className="py-2 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center gap-2 group-hover:scale-[1.01] shrink-0"
                    >
                      <span>INICIAR SIMULADOR</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. SECCIÓN DE ZONAS DEL CAMPUS EVO */}
      {(experienceType === 'ALL' || experienceType === 'ZONES') && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                ESTACIONES DEL CAMPUS EVO ({filteredCampusZones.length})
              </h2>
            </div>
            <span className="text-[10px] text-purple-400 font-mono-tech uppercase">
              8 ZONAS OFICIALES DE TRABAJO
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredCampusZones.map((zone) => {
              const ZoneIcon = zone.icon;
              return (
                <div
                  key={zone.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#090b10] border border-purple-900/30 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-900 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded font-black uppercase font-mono-tech bg-purple-500/10 text-purple-300 border border-purple-500/30">
                          {zone.number}
                        </span>
                        <span className="text-zinc-600">/</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">
                          {zone.category}
                        </span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded font-mono-tech font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        ● {zone.status}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-400 shrink-0 mt-0.5">
                        <ZoneIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-lg text-white uppercase tracking-tight group-hover:text-purple-300 transition-colors">
                          {zone.title}
                        </h3>
                        <p className="text-xs text-zinc-400 font-sans-editorial mt-0.5">
                          {zone.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed bg-zinc-950/80 p-3 rounded-xl border border-zinc-900">
                      {zone.description}
                    </p>

                    <div className="text-[11px] font-sans-editorial text-purple-200/90 bg-purple-950/20 p-2.5 rounded-lg border border-purple-900/30">
                      <span className="text-[9px] text-purple-400 uppercase font-bold block font-mono-tech mb-0.5">
                        ESPECIALIDAD DEL PUESTO
                      </span>
                      <span>{zone.specialty}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={zone.action}
                      className="py-2 px-4 rounded-xl bg-purple-500 hover:bg-purple-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-2 group-hover:scale-[1.01]"
                    >
                      <span>EXPLORAR ZONA</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
