import React, { useState, useMemo, useEffect } from 'react';
import {
  EvoLabZone,
  UserHardwarePassport,
  EvoNarrativeProfile,
} from '../../types';
import { ForensicBenchTarget } from '../common/EvoTomoDossierModal';
import { EVO_WORLD_ZONES } from '../../data/evoWorldData';
import { VOLUMES_COLLECTION } from '../../data/collections';
import {
  EVO_SCHOOL_LEVELS,
  EVO_TOMES_PEDAGOGY,
  EVO_LAB_GUIDES,
  EVO_NEXT_RECOMMENDATIONS,
  EVO_TOOLS_BY_INTENT,
  EvoSchoolLevel,
  EvoTomePedagogicalProfile,
  EvoLabPedagogicalGuide,
  EvoToolCardDefinition,
} from '../../data/evoLearningPaths';
import { EvoCaseRepository } from '../evoLabCore/services/caseRepository';
import { EvoWorldCore } from './EvoWorldCore';
import { EvoWorldZone } from './EvoWorldZone';
import { EvoWorldAmbientLayer } from './EvoWorldAmbientLayer';
import { EvoMotherboardCanvas } from './EvoMotherboardCanvas';
import { EvoSectorWorkstationModal } from './EvoSectorWorkstationModal';
import { EvoLiveBenchSuite } from './EvoLiveBenchSuite';
import { EvoTelemetryHUD } from './labs/EvoTelemetryHUD';
import { EvoLabConsole } from './labs/EvoLabConsole';
import { EvoOperatingModeSelector } from '../common/EvoOperatingModeSelector';
import { EvoLearningGuideModal } from '../common/EvoLearningGuideModal';
import {
  isChapter01Complete,
  isChapter02Complete,
  isChapter03Complete,
  isChapter04Complete,
  isChapter05Complete,
  isChapter06Complete,
  isChapter07Complete,
  areAllTomo01ChaptersComplete,
  isTomo01ExamPassed,
  isTomo01Complete,
} from '../../utils/tomo01Progress';
import {
  Power,
  Cpu,
  Wrench,
  Sparkles,
  Gauge,
  Activity,
  Terminal,
  Radio,
  Layers,
  Sliders,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  Zap,
  Laptop,
  Network,
  Shield,
  Gamepad2,
  Binary,
  Lock,
  RotateCcw,
  CornerDownRight,
  FolderGit2,
  HardDrive,
  Play,
  Compass,
  Trophy,
  Award,
  FileText,
  Boxes,
  Microchip,
  ChevronRight,
  X,
  Info,
  HelpCircle,
} from 'lucide-react';

export interface EvoWorldMapProps {
  passport: UserHardwarePassport | null;
  completedChaptersCount: number;
  onEnterZone: (zone: EvoLabZone) => void;
  onInspectCore?: () => void;
  activeProfile?: EvoNarrativeProfile;
  onChangeProfile?: (profile: EvoNarrativeProfile) => void;
  onOpenTomo?: (tomoId: '01' | '02' | '03' | '04' | '08') => void;
  onNavigateBootLab?: () => void;
  onNavigateHotSwapLab?: (panel?: 'sandbox' | 'hardware' | 'software' | 'telemetry' | 'all' | 'memory' | 'storage' | 'expansion' | 'silicon') => void;
  onNavigateWindowsMatrixLab?: (scenario?: string) => void;
  onNavigateLabCore?: () => void;
  onOpenForensicBench?: (target: ForensicBenchTarget) => void;
  onOpenDossier?: (tomoId: string) => void;
  onNavigateMagazine?: () => void;
  onNavigateTomo01?: () => void;
  onOpenCaseHistory?: () => void;
  initialIntention?: MainIntention;
  onOpenIntroPresentation?: () => void;
}

type MainIntention =
  | 'campus'
  | 'aprender'
  | 'practicar'
  | 'analizar'
  | 'herramientas'
  | 'mievo'
  | 'escuela'
  | 'biblioteca'
  | 'laboratorios'
  | 'diagnosticar'
  | 'progreso';

type LabSubTab = 'guiados' | 'tecnicos' | 'operaciones';
type DiagnoseSubTab = 'expedientes' | 'pcb' | 'sectores' | 'consola' | 'simuladores';

const ToolMicrovisual: React.FC<{ toolId: string; actionKey: string; simpleName: string; accentColor: string }> = ({
  toolId,
  actionKey,
  simpleName,
  accentColor,
}) => {
  const isFPS = actionKey === 'metrology' || toolId.includes('fps') || simpleName.toLowerCase().includes('fps');
  const isBSOD = actionKey === 'bsod' || simpleName.toLowerCase().includes('bsod') || simpleName.toLowerCase().includes('pantalla');
  const isDPC = actionKey === 'software-kernel' || simpleName.toLowerCase().includes('latencia');
  const isBottleneck = actionKey === 'bottleneck' || simpleName.toLowerCase().includes('cuello');
  const isPCB = actionKey === 'operaciones' || simpleName.toLowerCase().includes('motherboard');
  const isWinInstall = simpleName.toLowerCase().includes('instalar windows');
  const isWinRepair = simpleName.toLowerCase().includes('reparar windows') || actionKey === 'sfc-dism';
  const isThermal = simpleName.toLowerCase().includes('temperatura') || simpleName.toLowerCase().includes('térmic');
  const isSSD = simpleName.toLowerCase().includes('ssd') || simpleName.toLowerCase().includes('almacenamiento') || simpleName.toLowerCase().includes('disco');
  const isPower = simpleName.toLowerCase().includes('fuente') || simpleName.toLowerCase().includes('voltaje');
  const isNetwork = simpleName.toLowerCase().includes('red') || simpleName.toLowerCase().includes('ping');

  return (
    <div className="w-full h-16 rounded-xl bg-zinc-950/80 border border-zinc-800/90 p-2.5 flex items-center justify-between relative overflow-hidden font-mono-tech select-none">
      {/* Background glow */}
      <div
        className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full blur-xl opacity-15 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Simulated badge */}
      <div className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded bg-zinc-900/90 border border-zinc-700/60 text-[8px] font-bold text-zinc-400 tracking-wider">
        SIMULADO
      </div>

      {isFPS && (
        <div className="flex items-center gap-3 w-full pr-14">
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-[9px] text-zinc-400 font-bold">
              <span>FRAMETIME</span>
              <span className="text-emerald-400">1% LOW: 58.4 FPS</span>
            </div>
            <svg className="w-full h-5 text-emerald-400/90" viewBox="0 0 100 20" fill="none">
              <path
                d="M 0 14 Q 15 10, 30 13 T 60 6 T 75 17 T 100 8"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="75" cy="17" r="2" fill="#ef4444" />
            </svg>
          </div>
        </div>
      )}

      {isBSOD && (
        <div className="flex items-center gap-2.5 w-full pr-14">
          <div className="w-full bg-blue-950/80 border border-blue-500/30 rounded p-1.5 text-[9px] text-blue-200 space-y-0.5">
            <div className="font-bold text-blue-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>BSOD DUMP LOG</span>
            </div>
            <div className="text-[8px] text-zinc-400 truncate">CRITICAL_PROCESS_DIED (0x000000EF)</div>
          </div>
        </div>
      )}

      {isDPC && (
        <div className="flex flex-col justify-between h-full w-full pr-14 text-[9px]">
          <div className="flex justify-between text-zinc-400 font-bold">
            <span>DPC LATENCY</span>
            <span className="text-cyan-400">42.5 µs</span>
          </div>
          <div className="grid grid-cols-6 gap-1 items-end h-5">
            <div className="bg-cyan-500/40 h-2/3 rounded-sm" />
            <div className="bg-cyan-500/60 h-1/2 rounded-sm" />
            <div className="bg-cyan-400 h-full rounded-sm" />
            <div className="bg-cyan-500/50 h-3/4 rounded-sm" />
            <div className="bg-amber-400 h-5/6 rounded-sm" />
            <div className="bg-cyan-500/40 h-1/2 rounded-sm" />
          </div>
        </div>
      )}

      {isBottleneck && (
        <div className="w-full pr-14 space-y-1 text-[9px]">
          <div className="space-y-0.5">
            <div className="flex justify-between text-zinc-400">
              <span>CPU LOAD</span>
              <span className="text-amber-400 font-bold">72%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full w-[72%]" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex justify-between text-zinc-400">
              <span>GPU LOAD</span>
              <span className="text-emerald-400 font-bold">98%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[98%]" />
            </div>
          </div>
        </div>
      )}

      {isPCB && (
        <div className="w-full pr-14 flex items-center gap-3">
          <svg className="w-10 h-8 text-purple-400/80 shrink-0" viewBox="0 0 48 48" fill="none">
            <rect x="2" y="2" width="44" height="44" rx="4" stroke="currentColor" strokeWidth="1" fill="#0f091a" />
            <rect x="14" y="14" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <line x1="2" y1="24" x2="14" y2="24" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="34" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="1" />
            <circle cx="24" cy="24" r="4" fill="currentColor" fillOpacity="0.3" />
          </svg>
          <div className="text-[9px] text-purple-300 font-bold">ESQUEMÁTICO PCB VCORE</div>
        </div>
      )}

      {isWinInstall && (
        <div className="w-full pr-14 flex items-center gap-2.5">
          <div className="p-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <HardDrive className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="text-[9px] font-bold text-sky-300">NVMe SSD // GPT</div>
            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
              <div className="bg-sky-400 h-full w-full animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {isWinRepair && (
        <div className="w-full pr-14 bg-zinc-900/90 border border-zinc-800 rounded p-1 text-[9px] text-zinc-300 space-y-0.5">
          <div className="font-bold text-amber-400 flex items-center gap-1">
            <Terminal className="w-3 h-3" />
            <span>SFC / DISM REPAIR</span>
          </div>
          <div className="text-[8px] font-mono text-emerald-400">System Files: 100% OK</div>
        </div>
      )}

      {isThermal && (
        <div className="w-full pr-14 space-y-1 text-[9px]">
          <div className="flex justify-between font-bold text-zinc-300">
            <span>TEMP CPU DIODE</span>
            <span className="text-orange-400">62.8 °C</span>
          </div>
          <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 w-[65%]" />
          </div>
        </div>
      )}

      {isSSD && (
        <div className="w-full pr-14 flex items-center gap-2.5">
          <div className="p-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <HardDrive className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-0.5 text-[9px]">
            <div className="text-indigo-300 font-bold">SALUD S.M.A.R.T: 98%</div>
            <div className="text-zinc-400">3,400 MB/s Lectura</div>
          </div>
        </div>
      )}

      {isPower && (
        <div className="w-full pr-14 space-y-1 text-[9px]">
          <div className="flex justify-between font-bold text-zinc-300">
            <span>RIEL +12V</span>
            <span className="text-yellow-400">+12.04 V</span>
          </div>
          <svg className="w-full h-3 text-yellow-400/80" viewBox="0 0 100 12" fill="none">
            <path d="M 0 6 L 20 6 L 25 2 L 35 10 L 40 6 L 100 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {isNetwork && (
        <div className="w-full pr-14 space-y-0.5 text-[9px]">
          <div className="flex justify-between font-bold text-zinc-300">
            <span>PING</span>
            <span className="text-blue-400">14 ms (Jitter 0)</span>
          </div>
          <div className="text-[8px] text-zinc-400">0% Packet Loss</div>
        </div>
      )}

      {!isFPS && !isBSOD && !isDPC && !isBottleneck && !isPCB && !isWinInstall && !isWinRepair && !isThermal && !isSSD && !isPower && !isNetwork && (
        <div className="w-full pr-14 flex items-center gap-2 text-[9px] text-zinc-300 font-bold">
          <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>EVO LABS TELEMETRÍA Y CONTROL</span>
        </div>
      )}
    </div>
  );
};

export const EvoWorldMap: React.FC<EvoWorldMapProps> = ({
  passport,
  completedChaptersCount,
  onEnterZone,
  activeProfile = 'investigador',
  onChangeProfile = () => {},
  onOpenTomo = (_tomoId: '01' | '02' | '03' | '04' | '08') => {},
  onNavigateBootLab,
  onNavigateHotSwapLab,
  onNavigateWindowsMatrixLab,
  onNavigateLabCore,
  onOpenForensicBench,
  onOpenDossier,
  onNavigateMagazine,
  onNavigateTomo01,
  onOpenCaseHistory,
  initialIntention = 'campus',
  onOpenIntroPresentation,
}) => {
  // Navigation State
  const [activeIntention, setActiveIntention] = useState<MainIntention>(initialIntention);
  const [selectedLevelNumber, setSelectedLevelNumber] = useState<number | null>(null);
  const [selectedTomeProfile, setSelectedTomeProfile] = useState<EvoTomePedagogicalProfile | null>(null);
  const [selectedLabGuide, setSelectedLabGuide] = useState<EvoLabPedagogicalGuide | null>(null);
  const [isLevel0IntroOpen, setIsLevel0IntroOpen] = useState<boolean>(false);

  // Tools Search & Category Filter State
  const [toolSearchQuery, setToolSearchQuery] = useState<string>('');
  const [activeToolCategory, setActiveToolCategory] = useState<'all' | 'windows' | 'hardware' | 'rendimiento' | 'diagnostico' | 'experimentos'>('windows');

  const filteredTools = useMemo(() => {
    return EVO_TOOLS_BY_INTENT.filter((tool) => {
      const matchesCategory = activeToolCategory === 'all' || tool.intentCategory === activeToolCategory;
      const q = toolSearchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tool.simpleName.toLowerCase().includes(q) ||
        tool.whatItDoes.toLowerCase().includes(q) ||
        tool.whenToUse.toLowerCase().includes(q) ||
        tool.concepts.some((c) => c.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeToolCategory, toolSearchQuery]);

  // Sync initialIntention when changed externally
  useEffect(() => {
    if (initialIntention) {
      setActiveIntention(initialIntention);
      setSelectedLevelNumber(null);
      setSelectedTomeProfile(null);
    }
  }, [initialIntention]);

  // Sub-navigation tabs
  const [labSubTab, setLabSubTab] = useState<LabSubTab>('guiados');
  const [diagnoseTab, setDiagnoseTab] = useState<DiagnoseSubTab>('expedientes');

  // Diagnostic area sub-state
  const [activeConsoleZoneId, setActiveConsoleZoneId] = useState<string>('zona-1');
  const [activeOverlay, setActiveOverlay] = useState<'default' | 'thermal' | 'signals' | 'power'>('default');
  const [inspectedComponent, setInspectedComponent] = useState<{
    id: string;
    name: string;
    detail: string;
  } | null>(null);
  const [activeWorkstationZone, setActiveWorkstationZone] = useState<EvoLabZone | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'in_construction'>('all');

  // -------------------------------------------------------------
  // DETECCIÓN DE PROGRESO REAL GUARDADO
  // -------------------------------------------------------------
  const realProgress = useMemo(() => {
    try {
      const isC01Done = isChapter01Complete();
      const isC02Done = isChapter02Complete();
      const isC03Done = isChapter03Complete();
      const isC04Done = isChapter04Complete();
      const isC05Done = isChapter05Complete();
      const isC06Done = isChapter06Complete();
      const isC07Done = isChapter07Complete();
      const isExamPassed = isTomo01ExamPassed();
      const isTomo01FullyDone = isTomo01Complete();

      // Boot lab real progress
      const isBootLabDone = localStorage.getItem('evo_boot_lab_completed') === 'true';

      // Check cases
      const savedCases = EvoCaseRepository.getAllCases();
      const resolvedCasesCount = savedCases.filter((c) => c.isClosed).length;

      // Determine last active point
      let lastActivity: {
        levelNumber: number;
        levelTitle: string;
        tomoNumber: string;
        title: string;
        detail: string;
        tag: string;
        onContinue: () => void;
      } | null = null;

      if (isTomo01FullyDone) {
        lastActivity = {
          levelNumber: 1,
          levelTitle: 'NIVEL 1: CONOCER LA PC',
          tomoNumber: '01',
          title: 'Tomo 01 // Certificación y Examen Aprobado',
          detail: 'Certificación empírica de rendimiento y teoría comprobada (≥70%).',
          tag: 'TOMO 01 FINALIZADO',
          onContinue: () => {
            if (onOpenTomo) onOpenTomo('01');
            else if (onNavigateMagazine) onNavigateMagazine();
          },
        };
      } else if (isC07Done) {
        lastActivity = {
          levelNumber: 1,
          levelTitle: 'NIVEL 1: CONOCER LA PC',
          tomoNumber: '01',
          title: 'Tomo 01 // Laboratorio Final Completado',
          detail: 'Capítulos 01–07 completados. Listo para rendir la Prueba Final EVO.',
          tag: 'EXAMEN DISPONIBLE',
          onContinue: () => {
            if (onOpenTomo) onOpenTomo('01');
            else if (onNavigateMagazine) onNavigateMagazine();
          },
        };
      } else if (isC06Done) {
        lastActivity = {
          levelNumber: 1,
          levelTitle: 'NIVEL 1: CONOCER LA PC',
          tomoNumber: '01',
          title: 'Tomo 01 // Capítulo 07: Laboratorio Final',
          detail: 'Listo para iniciar el experimento final con método científico.',
          tag: 'EN CURSO',
          onContinue: () => {
            if (onOpenTomo) onOpenTomo('01');
            else if (onNavigateMagazine) onNavigateMagazine();
          },
        };
      } else if (isC05Done) {
        lastActivity = {
          levelNumber: 1,
          levelTitle: 'NIVEL 1: CONOCER LA PC',
          tomoNumber: '01',
          title: 'Tomo 01 // Capítulo 06: Taller de Diagnóstico EVO',
          detail: 'Hipótesis deductiva y resolución pericial de fallas.',
          tag: 'EN CURSO',
          onContinue: () => {
            if (onOpenTomo) onOpenTomo('01');
            else if (onNavigateMagazine) onNavigateMagazine();
          },
        };
      } else if (isC04Done) {
        lastActivity = {
          levelNumber: 1,
          levelTitle: 'NIVEL 1: CONOCER LA PC',
          tomoNumber: '01',
          title: 'Tomo 01 // Capítulo 05: Windows y Kernel',
          detail: 'Auditoría de servicios y subprocesos en segundo plano.',
          tag: 'EN CURSO',
          onContinue: () => {
            if (onOpenTomo) onOpenTomo('01');
            else if (onNavigateMagazine) onNavigateMagazine();
          },
        };
      } else if (isC03Done) {
        lastActivity = {
          levelNumber: 1,
          levelTitle: 'NIVEL 1: CONOCER LA PC',
          tomoNumber: '01',
          title: 'Tomo 01 // Capítulo 04: Encontrá el Límite',
          detail: 'Estrés térmico, throttling y consumo de energía en watts.',
          tag: 'EN CURSO',
          onContinue: () => {
            if (onOpenTomo) onOpenTomo('01');
            else if (onNavigateMagazine) onNavigateMagazine();
          },
        };
      } else if (isC02Done) {
        lastActivity = {
          levelNumber: 1,
          levelTitle: 'NIVEL 1: CONOCER LA PC',
          tomoNumber: '01',
          title: 'Tomo 01 // Capítulo 03: Telemetría & FPS',
          detail: 'Medición de frametimes y percentiles 1% low en tiempo real.',
          tag: 'EN CURSO',
          onContinue: () => {
            if (onOpenTomo) onOpenTomo('01');
            else if (onNavigateMagazine) onNavigateMagazine();
          },
        };
      } else if (isC01Done) {
        lastActivity = {
          levelNumber: 1,
          levelTitle: 'NIVEL 1: CONOCER LA PC',
          tomoNumber: '01',
          title: 'Tomo 01 // Capítulo 02: Buses & Silicio',
          detail: 'Mapeo de transferencias electrónicas y líneas PCIe.',
          tag: 'EN CURSO',
          onContinue: () => {
            if (onOpenTomo) onOpenTomo('01');
            else if (onNavigateMagazine) onNavigateMagazine();
          },
        };
      } else if (isBootLabDone) {
        lastActivity = {
          levelNumber: 2,
          levelTitle: 'NIVEL 2: WINDOWS Y ARRANQUE',
          tomoNumber: '08',
          title: 'Tomo 08 // Laboratorio de Arranque y Fallas Guiado',
          detail: 'Recorrido de 35 estados y diagnóstico de señales completado.',
          tag: 'PRÁCTICA COMPLETADA',
          onContinue: () => {
            if (onNavigateBootLab) onNavigateBootLab();
          },
        };
      } else if (savedCases.length > 0) {
        const lastCase = savedCases[0];
        lastActivity = {
          levelNumber: 3,
          levelTitle: 'TALLER DE PERITAJE',
          tomoNumber: '03',
          title: `Taller Forense // ${lastCase.title}`,
          detail: `Estado: ${lastCase.isClosed ? 'Cerrado' : 'En investigación'} — ${lastCase.conclusionNotes || `Expediente ${lastCase.caseType}`}`,
          tag: 'EXPEDIENTE ACTIVO',
          onContinue: () => {
            if (onOpenCaseHistory) onOpenCaseHistory();
            else setActiveIntention('diagnosticar');
          },
        };
      }

      return {
        hasProgress: Boolean(lastActivity),
        lastActivity,
        isC01Done,
        isC02Done,
        isC03Done,
        isC04Done,
        isC05Done,
        isC06Done,
        isC07Done,
        isExamPassed,
        isTomo01FullyDone,
        isBootLabDone,
        resolvedCasesCount,
        totalCasesCount: savedCases.length,
        savedCases,
      };
    } catch {
      return {
        hasProgress: false,
        lastActivity: null,
        isC01Done: false,
        isC02Done: false,
        isC03Done: false,
        isC04Done: false,
        isC05Done: false,
        isC06Done: false,
        isC07Done: false,
        isExamPassed: false,
        isTomo01FullyDone: false,
        isBootLabDone: false,
        resolvedCasesCount: 0,
        totalCasesCount: 0,
        savedCases: [],
      };
    }
  }, [passport, onOpenTomo, onNavigateMagazine, onNavigateBootLab, onOpenCaseHistory]);

  // Handler universal para abrir un tomo
  const handleOpenTomoDirectly = (tomoNumber: string) => {
    if (tomoNumber === '01' && onOpenTomo) onOpenTomo('01');
    else if (tomoNumber === '02' && onOpenTomo) onOpenTomo('02');
    else if (tomoNumber === '03' && onOpenTomo) onOpenTomo('03');
    else if (tomoNumber === '04' && onOpenTomo) onOpenTomo('04');
    else if (tomoNumber === '08' && onOpenTomo) onOpenTomo('08');
    else if (onOpenDossier) onOpenDossier(`tomo-${tomoNumber}`);
  };

  // Handler para ejecutar el laboratorio desde la ficha o modal
  const handleExecuteLabAction = (actionKey: string, subParam?: string) => {
    if (actionKey === 'boot-lab' && onNavigateBootLab) {
      onNavigateBootLab();
    } else if (actionKey === 'hardware' && onNavigateHotSwapLab) {
      onNavigateHotSwapLab((subParam as any) || 'hardware');
    } else if (actionKey === 'silicon' && onNavigateHotSwapLab) {
      onNavigateHotSwapLab('memory');
    } else if ((actionKey === 'software-kernel' || actionKey === 'windows-matrix') && onNavigateWindowsMatrixLab) {
      onNavigateWindowsMatrixLab(subParam || 'services');
    } else if (actionKey === 'operaciones') {
      if (subParam === 'pcb') {
        setActiveIntention('diagnosticar');
        setDiagnoseTab('pcb');
      } else if (subParam === 'sectores') {
        setActiveIntention('diagnosticar');
        setDiagnoseTab('sectores');
      } else if (onNavigateLabCore) {
        onNavigateLabCore();
      } else {
        setActiveIntention('diagnosticar');
        setDiagnoseTab('sectores');
      }
    } else if (actionKey === 'metrology') {
      setActiveIntention('diagnosticar');
      setDiagnoseTab('simuladores');
    } else if (actionKey === 'telemetry' || actionKey === 'consola') {
      setActiveIntention('diagnosticar');
      setDiagnoseTab('consola');
    } else if (actionKey === 'core' && onNavigateLabCore) {
      onNavigateLabCore();
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-65px)] evo-global-ambient-bg text-[#f4f4f5] overflow-x-hidden font-sans-editorial flex flex-col justify-between select-none">
      {/* Dynamic Background Ambient Layer */}
      <EvoWorldAmbientLayer />

      {/* ========================================================================= */}
      {/* ORIENTACIÓN PERMANENTE Y BARRA DE INTENCIONES (NAVEGACIÓN MAESTRA)        */}
      {/* ========================================================================= */}
      {activeIntention !== 'campus' && (
        <div className="relative z-30 px-4 sm:px-8 py-2.5 border-b border-zinc-900 bg-zinc-950/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 font-mono-tech text-xs">
          {/* Tabs de Intención Principal */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                setActiveIntention('campus');
                setSelectedLevelNumber(null);
                setSelectedTomeProfile(null);
              }}
              title="Volver a Inicio // Centro de Operaciones Mundo EVO"
              className="evo-btn-nav hover:bg-zinc-800 border border-zinc-700 text-amber-300 font-bold"
            >
              <span>INICIO</span>
            </button>

            <span className="text-zinc-700">|</span>

            {/* APRENDER */}
            <button
              onClick={() => {
                setActiveIntention('escuela');
                setSelectedLevelNumber(null);
                setSelectedTomeProfile(null);
              }}
              className={`evo-btn-nav font-bold ${
                activeIntention === 'escuela' || activeIntention === 'biblioteca' || activeIntention === 'aprender'
                  ? 'evo-btn-nav-active'
                  : ''
              }`}
            >
              APRENDER
            </button>

            {/* PRACTICAR */}
            <button
              onClick={() => {
                setActiveIntention('laboratorios');
                setSelectedLevelNumber(null);
                setSelectedTomeProfile(null);
              }}
              className={`evo-btn-nav font-bold ${
                activeIntention === 'laboratorios' || activeIntention === 'practicar'
                  ? 'evo-btn-nav-active'
                  : ''
              }`}
            >
              PRACTICAR
            </button>

            {/* ANALIZAR MI PC */}
            <button
              onClick={() => {
                setActiveIntention('diagnosticar');
                setSelectedLevelNumber(null);
                setSelectedTomeProfile(null);
              }}
              className={`evo-btn-nav font-bold ${
                activeIntention === 'diagnosticar' || activeIntention === 'analizar'
                  ? 'evo-btn-nav-active'
                  : ''
              }`}
            >
              ANALIZAR MI PC
            </button>

            {/* HERRAMIENTAS */}
            <button
              onClick={() => {
                setActiveIntention('herramientas');
                setSelectedLevelNumber(null);
                setSelectedTomeProfile(null);
              }}
              className={`evo-btn-nav font-bold ${
                activeIntention === 'herramientas'
                  ? 'evo-btn-nav-active'
                  : ''
              }`}
            >
              HERRAMIENTAS
            </button>

            {/* MI EVO */}
            <button
              onClick={() => {
                setActiveIntention('progreso');
                setSelectedLevelNumber(null);
                setSelectedTomeProfile(null);
              }}
              className={`evo-btn-nav font-bold ${
                activeIntention === 'progreso' || activeIntention === 'mievo'
                  ? 'evo-btn-nav-active'
                  : ''
              }`}
            >
              MI EVO
            </button>

            {/* Breadcrumb Secundario si aplica */}
            {selectedLevelNumber !== null && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300 font-bold">
                  NIVEL {selectedLevelNumber}
                </span>
              </>
            )}

            {selectedTomeProfile && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-black font-bold uppercase tracking-wider">
                  TOMO {selectedTomeProfile.tomoNumber}
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => {
              setActiveIntention('campus');
              setSelectedLevelNumber(null);
              setSelectedTomeProfile(null);
            }}
            className="text-[11px] text-zinc-400 hover:text-amber-400 font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>← Volver a Inicio</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONSOLE_OPERATIVE_HUD // SENSOR DE CONTEXTO                               */}
      {/* ========================================================================= */}
      {activeIntention !== 'campus' && (
        <div className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-8 pt-6">
          <div className="rounded-2xl bg-[#090b11]/90 border border-zinc-900/80 p-4 shadow-xl space-y-3.5 relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/[0.02] rounded-full blur-2xl pointer-events-none" />
            
            {/* HUD Header */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900/60 text-[10px] font-mono-tech tracking-widest text-zinc-500">
              <div className="flex items-center gap-1.5 font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                <span>SYS_OPERATIVE_HUD // SENSOR DE ENTORNO ACTIVO</span>
              </div>
              <div className="flex items-center gap-2">
                <span>ESTADO: MONITOREANDO</span>
                <span className="text-zinc-700">|</span>
                <span>SEC_EVO: FASE_ACTIVA</span>
              </div>
            </div>

            {/* Propósito details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono-tech">
              <div className="space-y-1">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">📍 UBICACIÓN</div>
                <div className="text-white font-bold uppercase">
                  {activeIntention === 'escuela' || activeIntention === 'biblioteca' ? 'APRENDER // RUTA PEDAGÓGICA' :
                   activeIntention === 'laboratorios' ? 'PRACTICAR // SUITE DE LABS' :
                   activeIntention === 'diagnosticar' ? 'DIAGNÓSTICO // TALLER DE CASOS' :
                   activeIntention === 'herramientas' ? 'HERRAMIENTAS // INSTRUMENTAL' :
                   'EXPEDIENTE // MI PROGRESO'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">🧠 ESTOY APRENDIENDO</div>
                <div className="text-zinc-300">
                  {activeIntention === 'escuela' || activeIntention === 'biblioteca' ? 'Arquitectura de hardware, peritaje y silicio' :
                   activeIntention === 'laboratorios' ? 'Comprobación de métricas, secuencia y fallas' :
                   activeIntention === 'diagnosticar' ? 'Hipótesis real, descarte forense y evidencias' :
                   activeIntention === 'herramientas' ? 'Ecosistema de diagnóstico e instrumental libre' :
                   'Mis habilidades periciales y expediente consolidado'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">⚡ QUÉ HACER AHORA</div>
                <div className="text-amber-300 font-bold">
                  {activeIntention === 'escuela' || activeIntention === 'biblioteca' ? 'Abrir Ficha Pedagógica o iniciar un tomo' :
                   activeIntention === 'laboratorios' ? 'Entrar a la guía interactiva del Tomo 08' :
                   activeIntention === 'diagnosticar' ? 'Revisar hipótesis en la consola o ver PCB' :
                   activeIntention === 'herramientas' ? 'Abrir esquemático o consola de incidentes' :
                   'Verificar el estado de tus niveles de aprendizaje'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">🚀 QUÉ VIENE DESPUÉS</div>
                <div className="text-zinc-400">
                  {activeIntention === 'escuela' || activeIntention === 'biblioteca' ? 'Práctica rigurosa en el laboratorio' :
                   activeIntention === 'laboratorios' ? 'Metodología forense real sobre fallas' :
                   activeIntention === 'diagnosticar' ? 'Cerrar el expediente y validar habilidades' :
                   activeIntention === 'herramientas' ? 'Aplicar mediciones sobre casos del Taller' :
                   'Completar el examen del Tomo 01 y avanzar'}
                </div>
              </div>
            </div>

            {/* Secuencia Experiencial EVO */}
            <div className="pt-2 border-t border-zinc-900/40 flex flex-wrap items-center justify-between gap-4">
              <span className="text-[10px] font-mono-tech tracking-widest text-zinc-500 uppercase font-black">
                FIRMA EXPERIENCIAL EVO // SECUENCIA DE ACCIÓN:
              </span>
              
              <div className="flex flex-wrap items-center gap-1.5 text-[9px] sm:text-[10px] font-mono-tech">
                {[
                  { name: 'ENTENDER', active: activeIntention === 'escuela' || activeIntention === 'biblioteca', color: 'bg-amber-400/10 text-amber-300 border-amber-400/40' },
                  { name: 'OBSERVAR', active: activeIntention === 'escuela' || activeIntention === 'biblioteca', color: 'bg-amber-400/10 text-amber-300 border-amber-400/40' },
                  { name: 'PRACTICAR', active: activeIntention === 'laboratorios', color: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/40' },
                  { name: 'MEDIR', active: activeIntention === 'laboratorios' || activeIntention === 'herramientas', color: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/40' },
                  { name: 'DIAGNOSTICAR', active: activeIntention === 'diagnosticar', color: 'bg-purple-400/10 text-purple-300 border-purple-400/40' },
                  { name: 'COMPROBAR', active: activeIntention === 'diagnosticar' || activeIntention === 'laboratorios' || activeIntention === 'herramientas', color: 'bg-purple-400/10 text-purple-300 border-purple-400/40' },
                  { name: 'GUARDAR EVIDENCIA', active: activeIntention === 'diagnosticar' || activeIntention === 'herramientas', color: 'bg-pink-400/10 text-pink-300 border-pink-400/40' },
                  { name: 'AVANZAR', active: activeIntention === 'progreso', color: 'bg-indigo-400/10 text-indigo-300 border-indigo-400/40' },
                ].map((act, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded font-bold border transition-all duration-300 ${
                      act.active 
                        ? `${act.color} shadow-[0_0_10px_rgba(251,191,36,0.08)]` 
                        : 'bg-zinc-950/40 text-zinc-600 border-zinc-900'
                    }`}>
                      {act.name}
                    </span>
                    {index < 7 && <span className="text-zinc-800">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. MUNDO EVO = CAMPUS PRINCIPAL (ESTÉTICA SAAS PREMIUM ESCRITORIO)       */}
      {/* ========================================================================= */}
      {activeIntention === 'campus' && (
        <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10 flex flex-col space-y-12">
          
          {/* BACKGROUND SYSTEM TRACE GRID (Visual anchor) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
            <div className="absolute top-1/4 left-1/2 w-[1px] h-[600px] bg-gradient-to-b from-amber-400/20 via-cyan-400/10 to-transparent" />
            <div className="absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <div className="absolute top-[420px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          </div>

          {/* ========================================================================= */}
          {/* 1. HERO / CABECERA DE SISTEMA (dense, sleek, asimétrica)                  */}
          {/* ========================================================================= */}
          <div className="relative rounded-2xl overflow-hidden bg-[#06080c]/90 border border-zinc-900 p-6 sm:p-8 shadow-2xl">
            {/* Fine ambient elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/[0.02] rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* IZQUIERDA: Identidad, Título y Descripción */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 text-[10px] sm:text-xs font-mono-tech tracking-wider uppercase font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>CENTRO DE OPERACIONES GENERALES // PLATAFORMA CENTRAL</span>
                  </div>
                  
                  <h1 className="evo-hero-title">
                    MUNDO EVO
                  </h1>
                  
                  <p className="evo-body-primary font-bold">
                    Sistema de aprendizaje técnico de EVO LABS
                  </p>
                  
                  <p className="evo-body-secondary max-w-xl">
                    Monitoreá, experimentá y diagnosticá arquitectura de silicio y software de bajo nivel. El campus unifica todas las herramientas en una única consola técnica.
                  </p>
                </div>

                {/* Acciones principales rápidas */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveIntention('escuela');
                      setSelectedLevelNumber(null);
                    }}
                    className="evo-btn-primary"
                  >
                    <Compass className="w-4 h-4 text-black" />
                    <span>COMENZAR RECORRIDO GUIADO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveIntention('biblioteca');
                      setSelectedLevelNumber(null);
                    }}
                    className="evo-btn-secondary group flex items-center gap-2"
                    title="Acceder a la colección canónica de 10 Tomos EVO"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>COLECCIÓN EVO · 10 TOMOS</span>
                    <span className="text-amber-300 font-bold ml-0.5">VER LOS 10 TOMOS →</span>
                  </button>
                </div>
              </div>

              {/* EVO TRACE VERTICAL INTERMEDIARIO */}
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                <div className="h-24 w-[1px] bg-gradient-to-b from-amber-400/20 via-cyan-400/20 to-transparent relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute left-[-2px] top-1/2 animate-ping" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute left-[-2px] top-1/2" />
                </div>
              </div>

              {/* DERECHA: TELEMETRÍA DE ESTADO DEL SISTEMA (Compacto, ultra denso) */}
              <div className="lg:col-span-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950/60 shadow-inner space-y-3">
                <div className="pb-1.5 border-b border-zinc-900 flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech tracking-widest text-zinc-500 font-bold uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    ESTADO DEL SISTEMA EVO
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono-tech font-bold">ONLINE</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-tech">
                  <div className="p-2 rounded bg-[#090b11] border border-zinc-900 flex flex-col justify-between">
                    <span className="text-zinc-500 uppercase">BIBLIOTECA</span>
                    <span className="text-white font-bold mt-1">10 MAGAZINES</span>
                  </div>
                  <div className="p-2 rounded bg-[#090b11] border border-zinc-900 flex flex-col justify-between">
                    <span className="text-zinc-500 uppercase">LABS DISPONIBLES</span>
                    <span className="text-emerald-400 font-bold mt-1">ACTIVE SUITE</span>
                  </div>
                  <div className="p-2 rounded bg-[#090b11] border border-zinc-900 flex flex-col justify-between">
                    <span className="text-zinc-500 uppercase">HERRAMIENTAS</span>
                    <span className="text-cyan-400 font-bold mt-1">12 CARGADAS</span>
                  </div>
                  <div className="p-2 rounded bg-[#090b11] border border-zinc-900 flex flex-col justify-between">
                    <span className="text-zinc-500 uppercase">EXPEDIENTES</span>
                    <span className="text-purple-400 font-bold mt-1">
                      {realProgress.resolvedCasesCount} / {realProgress.totalCasesCount} RESUELTOS
                    </span>
                  </div>
                </div>

                {/* Compact progress bar */}
                <div className="pt-1.5 space-y-1 font-mono-tech">
                  <div className="flex items-center justify-between text-[9px] text-zinc-500 uppercase">
                    <span>Avance Académico</span>
                    <span>{completedChaptersCount} de 7 completados</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-all duration-500" 
                      style={{ width: `${(completedChaptersCount / 7) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. TU SIGUIENTE PASO (Misión Activa con Cockpit Scope)                    */}
          {/* ========================================================================= */}
          <div className="relative rounded-2xl bg-[#090c12]/80 border border-zinc-900 p-5 sm:p-6 shadow-xl overflow-hidden">
            {/* Trace lines passing through the mission */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Cockpit active radar scope visual */}
              <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center border-r border-zinc-900/60 pr-6 shrink-0 h-full">
                <div className="relative w-20 h-20 rounded-full border border-cyan-500/20 bg-cyan-950/5 flex items-center justify-center overflow-hidden">
                  {/* Scope lines */}
                  <div className="absolute inset-0 border-b border-cyan-500/10" />
                  <div className="absolute inset-0 border-r border-cyan-500/10" />
                  <div className="w-12 h-12 rounded-full border border-cyan-500/10" />
                  <div className="w-6 h-6 rounded-full border border-cyan-500/10" />
                  {/* Blip */}
                  <div className="absolute top-6 right-6 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                  <div className="absolute top-6 right-6 w-2 h-2 bg-amber-400 rounded-full" />
                </div>
                <div className="text-[8px] text-zinc-500 font-mono-tech mt-2 text-center uppercase tracking-widest">
                  SYS_COORDINATES<br/>
                  [X:47.9 / Y:12.4]
                </div>
              </div>

              {/* Middle Section: Active Mission Info */}
              <div className="lg:col-span-7 space-y-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono-tech uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-black tracking-widest">
                    MISIÓN EN CURSO
                  </span>
                  <span className="text-zinc-600 font-mono-tech text-xs">•</span>
                  <span className="text-[10px] text-zinc-400 font-mono-tech uppercase">
                    {realProgress.hasProgress && realProgress.lastActivity ? 'ÚLTIMO REGISTRO DE AVANCE' : 'ESTACIÓN DE PARTIDA'}
                  </span>
                </div>

                {realProgress.hasProgress && realProgress.lastActivity ? (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono-tech text-amber-400 font-bold uppercase tracking-wider block">
                      {realProgress.lastActivity.levelTitle}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white">
                      {realProgress.lastActivity.title}
                    </h3>
                    <p className="evo-body-secondary text-xs sm:text-sm">
                      {realProgress.lastActivity.detail}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono-tech text-amber-400 font-bold uppercase tracking-wider block">
                      Nivel 1 // Hardware y Silicio
                    </span>
                    <h3 className="font-display font-bold text-lg text-white">
                      TOMO 01 // CONOCÉ TU PC
                    </h3>
                    <p className="evo-body-secondary text-xs sm:text-sm">
                      Iniciá tu viaje técnico. Desde la física de los semiconductores hasta el direccionamiento de memoria, completando desafíos periciales reales.
                    </p>
                  </div>
                )}
              </div>

              {/* Far Right: Compact Mission CTA button */}
              <div className="lg:col-span-3 flex justify-end">
                {realProgress.hasProgress && realProgress.lastActivity ? (
                  <button
                    type="button"
                    onClick={realProgress.lastActivity.onContinue}
                    className="evo-btn-primary w-full lg:w-auto bg-cyan-400 border-cyan-400/30 hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  >
                    <Play className="w-4 h-4 fill-current text-black" />
                    <span>REANUDAR MISIÓN</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenTomo) onOpenTomo('01');
                      else if (onNavigateTomo01) onNavigateTomo01();
                    }}
                    className="evo-btn-primary w-full lg:w-auto"
                  >
                    <Play className="w-4 h-4 fill-current text-black" />
                    <span>INICIAR TOMO 01</span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. THE 5 AREAS: CONTINUOUS INSTRUMENT RACK (No cards, cohesive track)    */}
          {/* ========================================================================= */}
          <div className="space-y-6 relative">
            
            {/* Header of the instrument rack */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <span className="text-[10px] font-mono-tech tracking-widest text-zinc-500 uppercase font-black flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                CANALES DE ACCESO AL CAMPUS // INSTRUMENTAL MODULAR
              </span>
              <span className="text-[10px] text-zinc-600 font-mono-tech">SELECT_OPERATIVE_MODULE</span>
            </div>

            {/* Continuous horizontal connection trace line */}
            <div className="absolute top-[75px] left-0 right-0 h-[1px] bg-gradient-to-r from-amber-400/15 via-cyan-400/20 to-transparent z-0 hidden lg:block">
              {/* Running tracing node across the line */}
              <div className="w-1 h-1 rounded-full bg-cyan-400 absolute animate-pulse" style={{ animationDuration: '2s', left: '10%' }} />
              <div className="w-1 h-1 rounded-full bg-amber-400 absolute animate-pulse" style={{ animationDuration: '3s', left: '50%' }} />
              <div className="w-1 h-1 rounded-full bg-purple-400 absolute animate-pulse" style={{ animationDuration: '4s', left: '80%' }} />
            </div>

            {/* Combined cohesive Instrument Track layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
              
              {/* AREA 1: APRENDER */}
              <div 
                onClick={() => {
                  setActiveIntention('escuela');
                  setSelectedLevelNumber(null);
                }}
                className="group relative rounded-xl bg-zinc-950/40 hover:bg-zinc-950/80 border border-zinc-900 hover:border-amber-400/40 p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between h-52 hover:shadow-[0_0_15px_rgba(245,158,11,0.05)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono-tech text-[9px]">
                    <span className="text-zinc-500 font-bold">MÓDULO 01</span>
                    <span className="text-amber-400 font-bold">SYS_LEARN</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-zinc-200 group-hover:text-white uppercase tracking-wider">
                      Aprender
                    </h4>
                  </div>
                  
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    La vía pedagógica estructurada. Tomos, Tutor EVO y recorrido didáctico interactivo por niveles.
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="text-zinc-500">ESTADO: ACTIVO</span>
                  <span className="evo-btn-tertiary text-amber-400 font-bold">INGRESAR →</span>
                </div>
              </div>

              {/* AREA 2: PRACTICAR */}
              <div 
                onClick={() => {
                  setActiveIntention('laboratorios');
                  setLabSubTab('guiados');
                }}
                className="group relative rounded-xl bg-zinc-950/40 hover:bg-zinc-950/80 border border-zinc-900 hover:border-emerald-400/40 p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between h-52 hover:shadow-[0_0_15px_rgba(16,185,129,0.05)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono-tech text-[9px]">
                    <span className="text-zinc-500 font-bold">MÓDULO 02</span>
                    <span className="text-emerald-400 font-bold">SYS_LABS</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-zinc-200 group-hover:text-white uppercase tracking-wider">
                      Practicar
                    </h4>
                  </div>
                  
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Suite de laboratorios interactivos guiados, bancos de medición y simuladores de hardware reales.
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="text-zinc-500">PRUEBA: DISPONIBLE</span>
                  <span className="evo-btn-tertiary text-emerald-400 font-bold">INGRESAR →</span>
                </div>
              </div>

              {/* AREA 3: ANALIZAR MI PC */}
              <div 
                onClick={() => {
                  setActiveIntention('diagnosticar');
                  setDiagnoseTab('consola');
                }}
                className="group relative rounded-xl bg-zinc-950/40 hover:bg-zinc-950/80 border border-zinc-900 hover:border-purple-400/40 p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between h-52 hover:shadow-[0_0_15px_rgba(167,139,250,0.05)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono-tech text-[9px]">
                    <span className="text-zinc-500 font-bold">MÓDULO 03</span>
                    <span className="text-purple-400 font-bold">SYS_DIAG</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-400/10 border border-purple-400/30 text-purple-300 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4 text-purple-400" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-zinc-200 group-hover:text-white uppercase tracking-wider">
                      Analizar mi PC
                    </h4>
                  </div>
                  
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Estación pericial de diagnóstico. Esquemáticos, consola de incidentes y banco de casos forenses.
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="text-zinc-500">MÓDULO: ABIERTO</span>
                  <span className="evo-btn-tertiary text-purple-400 font-bold">ANALIZAR →</span>
                </div>
              </div>

              {/* AREA 4: HERRAMIENTAS */}
              <div 
                onClick={() => setActiveIntention('herramientas')}
                className="group relative rounded-xl bg-zinc-950/40 hover:bg-zinc-950/80 border border-zinc-900 hover:border-cyan-400/40 p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between h-52 hover:shadow-[0_0_15px_rgba(34,211,238,0.05)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono-tech text-[9px]">
                    <span className="text-zinc-500 font-bold">MÓDULO 04</span>
                    <span className="text-cyan-400 font-bold">SYS_TOOLS</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-zinc-200 group-hover:text-white uppercase tracking-wider">
                      Herramientas
                    </h4>
                  </div>
                  
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Catálogo de instrumental de análisis de hardware libre para evaluar rendimiento, Kernel y memoria.
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="text-zinc-500">ESTADO: LISTO</span>
                  <span className="evo-btn-tertiary text-cyan-400 font-bold">ABRIR →</span>
                </div>
              </div>

              {/* AREA 5: MI EVO */}
              <div 
                onClick={() => setActiveIntention('progreso')}
                className="group relative rounded-xl bg-zinc-950/40 hover:bg-zinc-950/80 border border-zinc-900 hover:border-indigo-400/40 p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between h-52 hover:shadow-[0_0_15px_rgba(129,140,248,0.05)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono-tech text-[9px]">
                    <span className="text-zinc-500 font-bold">MÓDULO 05</span>
                    <span className="text-indigo-400 font-bold">SYS_PROGRESS</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-400/10 border border-indigo-400/30 text-indigo-300 flex items-center justify-center shrink-0">
                      <Trophy className="w-4 h-4 text-indigo-400" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-zinc-200 group-hover:text-white uppercase tracking-wider">
                      Mi EVO
                    </h4>
                  </div>
                  
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Pasaporte pericial personal, historial de casos forenses resueltos y certificaciones obtenidas.
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="text-zinc-500">NIVEL: DETECTADO</span>
                  <span className="evo-btn-tertiary text-indigo-400 font-bold">VER →</span>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. TALLER DE CASOS Y EXPEDIENTES (Sub-módulo transversal de peritaje)    */}
          {/* ========================================================================= */}
          <div className="p-4 rounded-xl bg-zinc-950/30 border border-zinc-900/80 hover:border-purple-500/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white uppercase tracking-wide">
                    TALLER DE CASOS Y EXPEDIENTES EVO
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono-tech text-purple-400 bg-purple-950/60 border border-purple-800">
                    PERITAJE FORENSE
                  </span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Recibí una máquina con falla real. Investigá la evidencia del silicio, descartá hipótesis erróneas y guardá tu informe.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveIntention('diagnosticar');
                setDiagnoseTab('expedientes');
              }}
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-purple-950/20 border border-zinc-800 hover:border-purple-500 text-zinc-300 hover:text-white font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>INGRESAR AL TALLER</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 5. CÓMO FUNCIONA / RECURSOS DE PRESENTACIÓN                                */}
          {/* ========================================================================= */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 border-t border-zinc-900/40">
            <button
              type="button"
              onClick={() => setIsLevel0IntroOpen(true)}
              className="px-4 py-2 rounded-xl bg-zinc-900/40 hover:bg-zinc-800 border border-zinc-900 hover:border-amber-400/40 text-amber-300 hover:text-amber-200 font-mono-tech text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>CÓMO FUNCIONA EVO LABS (NIVEL 0)</span>
            </button>

            {onOpenIntroPresentation && (
              <button
                type="button"
                onClick={onOpenIntroPresentation}
                className="px-4 py-2 rounded-xl bg-zinc-900/40 hover:bg-zinc-800 border border-zinc-900 hover:border-cyan-400/40 text-zinc-400 hover:text-cyan-300 font-mono-tech text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                title="Volver a ver la presentación animada de la Academia EVO Labs"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400" />
                <span>VER PRESENTACIÓN INSTITUCIONAL</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SECCIÓN: ESCUELA EVO (RUTA POR NIVELES 0 AL 6)                         */}
      {/* ========================================================================= */}
      {activeIntention === 'escuela' && (
        <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <h2 className="evo-page-title">
                  APRENDER // RUTA FORMATIVA GUIADA
                </h2>
              </div>
              <p className="evo-body-secondary">
                Orden pedagógico recomendado por niveles (0 al 6). EVO te indica qué aprender y qué hacer después.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono-tech text-xs">
                <button
                  type="button"
                  onClick={() => setActiveIntention('biblioteca')}
                  className="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer text-zinc-400 hover:text-white flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>COLECCIÓN EVO · 10 TOMOS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIntention('escuela')}
                  className="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer bg-amber-400 text-black shadow-md flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-black" />
                  <span>RUTA POR NIVELES</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsLevel0IntroOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-mono-tech text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>NIVEL 0</span>
              </button>
            </div>
          </div>

          {/* Banner de la Cadena Pedagógica Oficial EVO */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#14120a] via-[#0d1017] to-[#080b12] border border-amber-400/40 space-y-3 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
              <span className="font-mono-tech text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                CADENA PEDAGÓGICA PRINCIPAL // MÉTODO EVO
              </span>
              <span className="font-mono-tech text-[10px] text-zinc-400">
                “NO LO CREAS. COMPROBALO.”
              </span>
            </div>

            {/* Fases secuenciales - Diseñadas como una verdadera línea de recorrido técnico */}
            <div className="relative pt-2 pb-1">
              {/* Horizontal line connector */}
              <div className="absolute top-[26px] left-6 right-6 h-[1.5px] bg-zinc-900 z-0 hidden lg:block" />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center font-mono-tech text-[10px] text-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]">1</div>
                  <span className="text-[10px] font-mono-tech text-amber-400 font-bold block">ENTENDER</span>
                  <span className="text-[9px] text-zinc-400">¿Qué aprendo?</span>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center font-mono-tech text-[10px] text-cyan-300 font-bold shadow-[0_0_10px_rgba(34,211,238,0.2)]">2</div>
                  <span className="text-[10px] font-mono-tech text-cyan-400 font-bold block">OBSERVAR</span>
                  <span className="text-[9px] text-zinc-400">¿Por qué sirve?</span>
                </div>

                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center font-mono-tech text-[10px] text-emerald-300 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">3</div>
                  <span className="text-[10px] font-mono-tech text-emerald-400 font-bold block">PRACTICAR</span>
                  <span className="text-[9px] text-zinc-400">Manual del Lab</span>
                </div>

                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400 flex items-center justify-center font-mono-tech text-[10px] text-purple-300 font-bold shadow-[0_0_10px_rgba(168,85,247,0.2)]">4</div>
                  <span className="text-[10px] font-mono-tech text-purple-400 font-bold block">DIAGNOSTICAR</span>
                  <span className="text-[9px] text-zinc-400">Descarte real</span>
                </div>

                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-6 h-6 rounded-full bg-pink-400/20 border border-pink-400 flex items-center justify-center font-mono-tech text-[10px] text-pink-300 font-bold shadow-[0_0_10px_rgba(244,114,182,0.2)]">5</div>
                  <span className="text-[10px] font-mono-tech text-pink-400 font-bold block">COMPROBAR</span>
                  <span className="text-[9px] text-zinc-400">Validá métrica</span>
                </div>

                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-6 h-6 rounded-full bg-blue-400/20 border border-blue-400 flex items-center justify-center font-mono-tech text-[10px] text-blue-300 font-bold shadow-[0_0_10px_rgba(96,165,250,0.2)]">6</div>
                  <span className="text-[10px] font-mono-tech text-blue-400 font-bold block">AVANZAR</span>
                  <span className="text-[9px] text-zinc-400">¿Qué hago después?</span>
                </div>
              </div>
            </div>
          </div>

          {/* LISTA DE NIVELES PEDAGÓGICOS (0 A 6) */}
          <div className="space-y-4">
            {EVO_SCHOOL_LEVELS.filter((lvl) => lvl.levelNumber > 0).map((level) => {
              const isSelected = selectedLevelNumber === level.levelNumber;
              return (
                <div
                  key={level.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#0a0d16] border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                      : 'bg-[#090b12] border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="px-2.5 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase border"
                          style={{
                            color: level.accentColor,
                            backgroundColor: `${level.accentColor}15`,
                            borderColor: `${level.accentColor}40`,
                          }}
                        >
                          NIVEL {level.levelNumber}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono-tech uppercase">
                          {level.recommendedTag}
                        </span>
                      </div>

                      <h3 className="font-display font-black text-xl text-white">
                        {level.title}
                      </h3>

                      <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed">
                        {level.subtitle}
                      </p>

                      <div className="text-xs text-zinc-400 font-sans-editorial pt-1">
                        <strong className="text-zinc-300 font-mono-tech">Objetivo: </strong>
                        {level.objective}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-xs text-zinc-500 font-mono-tech mr-2">
                        {level.tomos.length} TOMO(S)
                      </span>
                    </div>
                  </div>

                  {/* Tomos del Nivel (Tarjetas interactivas que abren la Ficha) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 mt-4 border-t border-zinc-900">
                    {level.tomos.map((tomoNum) => {
                      const profile = EVO_TOMES_PEDAGOGY[tomoNum];
                      if (!profile) return null;
                      const hasActiveLab = profile.associatedLabStatus === 'ACTIVO';
                      return (
                        <div
                          key={tomoNum}
                          className="p-3.5 rounded-xl evo-surface-level2 border border-zinc-900 hover:border-amber-400/30 transition-all flex flex-col justify-between gap-3 group"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold font-mono-tech text-amber-400">
                                TOMO {profile.tomoNumber}
                              </span>
                              <span
                                className={`text-[9px] px-2 py-0.5 rounded font-bold font-mono-tech uppercase border ${
                                  hasActiveLab
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                    : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                                }`}
                              >
                                {hasActiveLab ? 'LAB ACTIVO' : 'LAB EN DESARROLLO'}
                              </span>
                            </div>

                            <h4 className="font-display font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                              {profile.title}
                            </h4>

                            <p className="text-xs text-zinc-400 font-sans-editorial line-clamp-2">
                              {profile.tagline}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-zinc-900/80 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedTomeProfile(profile)}
                              className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-300 font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                              <span>VER FICHA PEDAGÓGICA</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SECCIÓN: TOMOS EVO LABS (COLECCIÓN DE LOS 10 TOMOS MAESTROS)           */}
      {/* ========================================================================= */}
      {activeIntention === 'biblioteca' && (
        <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <h2 className="evo-page-title">
                  APRENDER // COLECCIÓN EVO (10 TOMOS)
                </h2>
              </div>
              <p className="evo-body-secondary italic">
                “Explorá los 10 tomos canónicos de la colección.” Manuales de silicio, experiencias interactivas y laboratorios asociados.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono-tech text-xs">
                <button
                  type="button"
                  onClick={() => setActiveIntention('biblioteca')}
                  className="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer bg-amber-400 text-black shadow-md flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-black" />
                  <span>COLECCIÓN EVO · 10 TOMOS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIntention('escuela')}
                  className="px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer text-zinc-400 hover:text-white flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>RUTA POR NIVELES</span>
                </button>
              </div>

              <div className="text-xs font-mono-tech text-zinc-500 hidden sm:block">
                10 VOLÚMENES // CANÓNICOS
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VOLUMES_COLLECTION.map((v) => {
              const pedagogicalData = EVO_TOMES_PEDAGOGY[v.number];
              const isTomo01 = v.number === '01';
              const isTomo02 = v.number === '02';
              const isTomo03 = v.number === '03';
              const isTomo04 = v.number === '04';
              const isTomo08 = v.number === '08';
              const isAvailable = isTomo01 || isTomo02 || isTomo03 || isTomo04 || isTomo08;

              return (
                <div
                  key={v.id}
                  className="p-5 rounded-2xl evo-surface-level2 border border-zinc-900 hover:border-amber-400/30 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-3">
                    {/* Header Card: Tomo Number + Real Availability Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono-tech font-black uppercase"
                        style={{
                          color: v.themeColor,
                          backgroundColor: `${v.themeColor}18`,
                          border: `1px solid ${v.themeColor}40`,
                        }}
                      >
                        TOMO {v.number}
                      </span>

                      <span
                        className={`text-[9px] px-2 py-0.5 rounded font-bold font-mono-tech uppercase border ${
                          isAvailable
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                            : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                        }`}
                      >
                        {isAvailable ? 'DISPONIBLE' : 'EN DESARROLLO'}
                      </span>
                    </div>

                    {/* Cover / Title / Tagline */}
                    <div className="space-y-1.5">
                      <h3 className="font-display font-black text-lg text-white group-hover:text-amber-300 transition-colors uppercase leading-tight">
                        {v.title}
                      </h3>

                      <p className="text-xs text-zinc-300 font-sans-editorial italic">
                        “{v.tagline}”
                      </p>

                      <p className="text-xs text-zinc-400 font-sans-editorial line-clamp-2 leading-relaxed pt-1">
                        {v.description}
                      </p>
                    </div>
                  </div>

                  {/* Real Action Buttons based on actual availability */}
                  <div className="pt-3 border-t border-zinc-900 flex flex-col gap-2 mt-auto font-mono-tech text-xs">
                    {/* TOMO 01 ACTIONS */}
                    {isTomo01 && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            if (onNavigateTomo01) onNavigateTomo01();
                            else if (onOpenTomo) onOpenTomo('01');
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-black" />
                          <span>ABRIR EXPERIENCIA INTERACTIVA</span>
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (onNavigateMagazine) onNavigateMagazine();
                            }}
                            className="py-2 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Layers className="w-3 h-3 text-amber-400" />
                            <span>REVISTA A4</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (onNavigateHotSwapLab) onNavigateHotSwapLab('hardware');
                            }}
                            className="py-2 px-2.5 rounded-lg bg-zinc-900 hover:bg-emerald-950/60 border border-zinc-800 hover:border-emerald-500/50 text-emerald-300 font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Zap className="w-3 h-3 text-emerald-400" />
                            <span>LABORATORIO</span>
                          </button>
                        </div>
                      </>
                    )}

                    {/* TOMO 02 ACTIONS */}
                    {isTomo02 && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenTomo) onOpenTomo('02');
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.25)]"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-black" />
                          <span>LEER MAGAZINE // BIBLIA NEGRA</span>
                        </button>

                        {onNavigateWindowsMatrixLab && (
                          <button
                            type="button"
                            onClick={() => onNavigateWindowsMatrixLab()}
                            className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-cyan-950/60 border border-zinc-800 hover:border-cyan-500/50 text-cyan-300 font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Zap className="w-3 h-3 text-cyan-400" />
                            <span>LABORATORIO: WINDOWS MATRIX</span>
                          </button>
                        )}
                      </>
                    )}

                    {/* TOMO 03 ACTIONS */}
                    {isTomo03 && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenTomo) onOpenTomo('03');
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-black" />
                          <span>LEER MAGAZINE // REPARACIÓN PC</span>
                        </button>

                        {onNavigateLabCore && (
                          <button
                            type="button"
                            onClick={() => onNavigateLabCore()}
                            className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-emerald-950/60 border border-zinc-800 hover:border-emerald-500/50 text-emerald-300 font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Wrench className="w-3 h-3 text-emerald-400" />
                            <span>BANCO DE REPARACIÓN</span>
                          </button>
                        )}
                      </>
                    )}

                    {/* TOMO 04 ACTIONS */}
                    {isTomo04 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (onOpenTomo) onOpenTomo('04');
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-purple-400 hover:bg-purple-300 text-black font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-black" />
                        <span>LEER MAGAZINE // NOTEBOOKS</span>
                      </button>
                    )}

                    {/* TOMO 08 ACTIONS */}
                    {isTomo08 && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenTomo) onOpenTomo('08');
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-black" />
                          <span>LEER MAGAZINE // ARRANQUE</span>
                        </button>

                        {onNavigateBootLab && (
                          <button
                            type="button"
                            onClick={() => onNavigateBootLab()}
                            className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-emerald-950/60 border border-zinc-800 hover:border-emerald-500/50 text-emerald-300 font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Power className="w-3 h-3 text-emerald-400" />
                            <span>LABORATORIO DE ARRANQUE</span>
                          </button>
                        )}
                      </>
                    )}

                    {/* TOMOS 05, 06, 07, 09, 10 ACTIONS */}
                    {!isAvailable && (
                      <button
                        type="button"
                        onClick={() => {
                          if (pedagogicalData) setSelectedTomeProfile(pedagogicalData);
                          else handleOpenTomoDirectly(v.number);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-zinc-400" />
                        <span>VER FICHA PEDAGÓGICA</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SECCIÓN: LABORATORIOS (GUIADOS + TÉCNICOS + OPERACIONES)                */}
      {/* ========================================================================= */}
      {activeIntention === 'laboratorios' && (
        <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="evo-page-title">
                  SUITE DE LABORATORIOS EVO
                </h2>
              </div>
              <p className="evo-body-secondary">
                Práctica rigurosa. Cada laboratorio cuenta con una ficha técnica previa que responde qué observar y comprobar.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800 font-mono-tech text-xs">
              <button
                type="button"
                onClick={() => setLabSubTab('guiados')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  labSubTab === 'guiados'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                LABORATORIOS GUIADOS
              </button>
              <button
                type="button"
                onClick={() => setLabSubTab('tecnicos')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  labSubTab === 'tecnicos'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                LABORATORIOS TÉCNICOS EVO
              </button>
              <button
                type="button"
                onClick={() => setLabSubTab('operaciones')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  labSubTab === 'operaciones'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                LABORATORIO DE OPERACIONES EVO
              </button>
            </div>
          </div>

          {/* SUB-TAB 1: LABORATORIOS GUIADOS (ASOCIADOS A TOMOS) */}
          {labSubTab === 'guiados' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <span className="font-mono-tech text-xs font-bold text-white uppercase flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  LABORATORIOS GUIADOS ASOCIADOS A LOS 10 TOMOS
                </span>
                <span className="text-[10px] text-zinc-500 font-mono-tech">
                  1 ACTIVO // 9 EN DESARROLLO
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* TOMO 08 (ACTIVO) */}
                <div className="p-4 rounded-xl evo-surface-level2 border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Power className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold font-mono-tech text-emerald-400">TOMO 08</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono-tech font-bold uppercase bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                          ACTIVO
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                        LABORATORIO DE ARRANQUE Y FALLAS GUIADO
                      </h4>
                      <p className="text-xs text-zinc-300 font-sans-editorial truncate">
                        Recorrido guiado de 35 estados desde la alimentación de espera hasta el escritorio de Windows.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedLabGuide(EVO_LAB_GUIDES['tech-boot'])}
                    className="px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase bg-emerald-400 text-black hover:bg-emerald-300 transition-all shrink-0 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-1.5"
                  >
                    <span>ENTRAR</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>

                {/* OTROS TOMOS GUIADOS (EN DESARROLLO) */}
                {[
                  { num: '01', title: 'Laboratorio de Silicio y Peritaje', tomo: 'Conocé tu PC' },
                  { num: '02', title: 'Laboratorio de Windows NT', tomo: 'La Biblia Negra de Windows' },
                  { num: '03', title: 'Banco de Reparación ATX', tomo: 'Reparación de PC' },
                  { num: '04', title: 'Banco de Micromecánica Portátil', tomo: 'Reparación de Notebooks' },
                  { num: '05', title: 'Laboratorio Forense de Redes', tomo: 'Sistema de Redes' },
                  { num: '06', title: 'Laboratorio de Ciberseguridad', tomo: 'Ciberseguridad' },
                  { num: '07', title: 'Banco Metrológico de Gaming', tomo: 'Gaming Pro' },
                  { num: '09', title: 'Laboratorio de Kernel y Sysfs', tomo: 'Sistemas y Kernel' },
                  { num: '10', title: 'Laboratorio Forense de Memoria', tomo: 'Forense e Ingeniería Inversa' },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-4 rounded-xl evo-surface-level1 border border-zinc-900 flex items-center justify-between gap-4 opacity-75"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold font-mono-tech text-zinc-500">TOMO {item.num}</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono-tech font-bold uppercase bg-zinc-900 text-zinc-500 border border-zinc-800">
                          EN DESARROLLO
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-zinc-300 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-500 font-sans-editorial truncate">
                        Laboratorio guiado asociado al Tomo {item.num}: {item.tomo}.
                      </p>
                    </div>

                    <span className="px-3 py-1.5 rounded-lg text-[10px] font-mono-tech font-bold uppercase text-zinc-600 bg-zinc-950 border border-zinc-800 shrink-0">
                      EN DESARROLLO
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 2: LABORATORIOS TÉCNICOS EVO (HERRAMIENTAS TRANSVERSALES) */}
          {labSubTab === 'tecnicos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <span className="font-mono-tech text-xs font-bold text-white uppercase flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  HERRAMIENTAS TRANSVERSALES DE APRENDIZAJE Y ANÁLISIS
                </span>
                <span className="text-[10px] text-zinc-500 font-mono-tech">
                  6 HERRAMIENTAS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  EVO_LAB_GUIDES['tech-hardware'],
                  EVO_LAB_GUIDES['tech-silicon'],
                  EVO_LAB_GUIDES['tech-metrology'],
                  EVO_LAB_GUIDES['tech-software-kernel'],
                  EVO_LAB_GUIDES['tech-telemetry'],
                  EVO_LAB_GUIDES['tech-windows-kernel'],
                ].filter(Boolean).map((guide) => (
                  <div
                    key={guide.id}
                    className="p-5 rounded-xl evo-surface-level2 border border-zinc-900 hover:border-cyan-400/30 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase border"
                          style={{
                            color: guide.accentColor,
                            backgroundColor: `${guide.accentColor}15`,
                            borderColor: `${guide.accentColor}40`,
                          }}
                        >
                          {guide.status}
                        </span>
                        {guide.relatedTomoTitle && (
                          <span className="text-[10px] text-zinc-500 font-mono-tech truncate max-w-[200px]">
                            {guide.relatedTomoTitle}
                          </span>
                        )}
                      </div>

                      <h4 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                        {guide.name}
                      </h4>

                      <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed">
                        {guide.whatIsThisLab}
                      </p>

                      <div className="space-y-1 pt-2 border-t border-zinc-900 text-xs font-sans-editorial">
                        <div>
                          <strong className="text-zinc-400 font-mono-tech text-[11px]">Para qué sirve: </strong>
                          <span className="text-zinc-300">{guide.whatYouWillPractice}</span>
                        </div>
                        <div>
                          <strong className="text-zinc-400 font-mono-tech text-[11px]">Resultado: </strong>
                          <span className="text-emerald-400">{guide.whatOutputDelivers}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedLabGuide(guide)}
                      className="w-full py-2.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>ABRIR GUÍA PEDAGÓGICA Y ENTRAR</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: LABORATORIO DE OPERACIONES EVO */}
          {labSubTab === 'operaciones' && (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#07131e] to-[#080b12] border border-cyan-500/40 hover:border-cyan-400/80 transition-all duration-200 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                    <Boxes className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-black text-xl text-white group-hover:text-cyan-300 transition-colors">
                        LABORATORIO DE OPERACIONES EVO
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase text-cyan-400 bg-cyan-500/15 border border-cyan-500/40">
                        BANCO TRANSVERSAL
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial leading-relaxed max-w-2xl">
                      “Este espacio permite explorar libremente las herramientas técnicas de EVO LABS fuera de una clase específica.”
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono-tech text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        Esquemático PCB Interactivo
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        8 Sectores de Taller
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        Workstations & Simuladores
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLabGuide(EVO_LAB_GUIDES['tech-operaciones'])}
                  className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.35)] shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>ENTRAR A OPERACIONES</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SECCIÓN: ANALIZAR MI PC // DIAGNÓSTICO REAL & EVO CORE                  */}
      {/* ========================================================================= */}
      {activeIntention === 'diagnosticar' && (
        <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <h2 className="evo-page-title">
                  ANALIZAR MI PC // DIAGNÓSTICO REAL & EVO CORE
                </h2>
              </div>
              <p className="evo-body-secondary italic">
                “No se adivina. Se mide. Si no puede comprobarse: UNKNOWN.” Diagnóstico forense de silicio, telemetría y resultados con procedencia.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onNavigateLabCore && (
                <button
                  type="button"
                  onClick={() => onNavigateLabCore()}
                  className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-mono-tech text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  <Cpu className="w-3.5 h-3.5 text-black" />
                  <span>ABRIR EVO CORE →</span>
                </button>
              )}

              <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 font-mono-tech text-xs">
                <button
                  type="button"
                  onClick={() => setDiagnoseTab('expedientes')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    diagnoseTab === 'expedientes'
                      ? 'bg-purple-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  EXPEDIENTES REALES
                </button>
                <button
                  type="button"
                  onClick={() => setDiagnoseTab('consola')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    diagnoseTab === 'consola'
                      ? 'bg-purple-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  CONSOLA TÉCNICA
                </button>
                <button
                  type="button"
                  onClick={() => setDiagnoseTab('pcb')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    diagnoseTab === 'pcb'
                      ? 'bg-purple-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  ESQUEMÁTICO PCB
                </button>
                <button
                  type="button"
                  onClick={() => setDiagnoseTab('sectores')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    diagnoseTab === 'sectores'
                      ? 'bg-purple-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  8 SECTORES LAB
                </button>
                <button
                  type="button"
                  onClick={() => setDiagnoseTab('simuladores')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    diagnoseTab === 'simuladores'
                      ? 'bg-purple-400 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  SIMULADORES
                </button>
              </div>
            </div>
          </div>

          {/* Banner de Diagnóstico Real & Procedencia Epistémica EVO */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#170e24] via-[#0e1017] to-[#080a11] border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono-tech">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-purple-300 font-bold uppercase tracking-wider">
                  EVO CORE // MOTOR DE DIAGNÓSTICO Y PERITAJE DE SILICIO
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                  PROCEDENCIA: SYSTEM_REPORTED
                </span>
              </div>
              <p className="text-xs text-zinc-300 max-w-2xl font-sans-editorial">
                Mediciones obtenidas por CIM/WMI a través del EVO Local Agent en <code className="text-purple-300 font-mono">127.0.0.1:43921</code>. Los campos no verificables se clasifican estrictamente como UNKNOWN.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-zinc-400 border-l border-zinc-800 pl-3 hidden lg:block">
                Las simulaciones educativas pertenecen a <strong className="text-emerald-400">PRACTICAR</strong>.
              </span>
            </div>
          </div>

          {/* Sub-herramienta 1: EXPEDIENTES Y CASOS */}
          {diagnoseTab === 'expedientes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech text-zinc-400 border-b border-zinc-800 pb-2">
                <span>HISTORIAL DE PERITAJES Y CASOS REGISTRADOS</span>
                <span>{realProgress.savedCases.length} EXPEDIENTES EN MEMORIA</span>
              </div>

              {realProgress.savedCases.length === 0 ? (
                <div className="p-8 rounded-2xl border border-zinc-800 bg-[#090c13] text-center space-y-4">
                  <FolderGit2 className="w-10 h-10 text-purple-400 mx-auto opacity-70" />
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-base">
                      NO HAY CASOS REGISTRADOS EN ESTA SESIÓN
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans-editorial max-w-md mx-auto">
                      Podés iniciar un nuevo peritaje en el Taller de Diagnóstico (Capítulo 06) o en el Laboratorio de Arranque y Fallas Guiado.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {onNavigateBootLab && (
                      <button
                        type="button"
                        onClick={onNavigateBootLab}
                        className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-mono-tech text-xs font-bold transition-all cursor-pointer"
                      >
                        SIMULAR FALLA EN LABORATORIO DE ARRANQUE
                      </button>
                    )}
                    {onNavigateLabCore && (
                      <button
                        type="button"
                        onClick={() => onNavigateLabCore()}
                        className="px-4 py-2 rounded-xl bg-purple-400 hover:bg-purple-300 text-black font-mono-tech text-xs font-bold transition-all cursor-pointer"
                      >
                        ABRIR TALLER DE REPARACIÓN EVO CORE
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {realProgress.savedCases.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl evo-surface-level2 border border-zinc-900 hover:border-purple-400/30 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm font-mono-tech">{c.title}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-sans-editorial">
                        {c.conclusionNotes || `Expediente de ${c.caseType} // Máquina: ${c.machine?.name || 'Estación de prueba'}`}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-[11px] font-mono-tech border-t border-zinc-900">
                        <span className="text-purple-400 font-bold">
                          ESTADO: {c.isClosed ? 'RESUELTO' : 'EN INVESTIGACIÓN'}
                        </span>
                        {onOpenCaseHistory && (
                          <button
                            type="button"
                            onClick={onOpenCaseHistory}
                            className="text-amber-400 hover:underline cursor-pointer"
                          >
                            Ver expediente completo →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sub-herramienta 2: ESQUEMÁTICO PCB INTERACTIVO */}
          {diagnoseTab === 'pcb' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
                <span className="text-zinc-400">
                  TOPOLOGÍA Y CAPAS TÉRMICAS / VOLTAJES DE MOTHERBOARD
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
                  {(['default', 'thermal', 'signals', 'power'] as const).map((overlay) => (
                    <button
                      key={overlay}
                      type="button"
                      onClick={() => setActiveOverlay(overlay)}
                      className={`px-2.5 py-1 rounded text-[11px] uppercase font-bold transition-all cursor-pointer ${
                        activeOverlay === overlay
                          ? 'bg-purple-400 text-black'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {overlay === 'default' && 'Normal'}
                      {overlay === 'thermal' && 'Térmico'}
                      {overlay === 'signals' && 'Señales'}
                      {overlay === 'power' && 'Voltajes'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#080b11] border border-zinc-800 shadow-2xl overflow-hidden">
                <EvoMotherboardCanvas
                  activeOverlay={activeOverlay}
                  onSelectComponent={(id, name, detail) => setInspectedComponent({ id, name, detail })}
                />
              </div>
            </div>
          )}

          {/* Sub-herramienta 3: 8 SECTORES DE INSTALACIÓN */}
          {diagnoseTab === 'sectores' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech text-zinc-400">
                <span>ESTACIONES DE TRABAJO // 8 SECTORES PERICIALES</span>
                <div className="flex items-center gap-2">
                  {(['all', 'active', 'in_construction'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActiveFilter(f)}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        activeFilter === f
                          ? 'bg-purple-400 text-black'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {f === 'all' && 'Todos'}
                      {f === 'active' && 'Activos'}
                      {f === 'in_construction' && 'En Obra'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {EVO_WORLD_ZONES.filter((z) => {
                  if (activeFilter === 'active') return z.statusCode === 'active';
                  if (activeFilter === 'in_construction') return z.statusCode !== 'active';
                  return true;
                }).map((zone) => (
                  <div
                    key={zone.id}
                    className="p-4 rounded-xl bg-[#090c13] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono-tech">
                        <span className="font-bold text-purple-400">SECTOR {zone.number}</span>
                        <span className="px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {zone.statusBadge}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                        {zone.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans-editorial line-clamp-2 leading-relaxed">
                        {zone.subtitle || zone.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveWorkstationZone(zone)}
                      className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-400 text-zinc-200 hover:text-white font-mono-tech text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
                    >
                      <Microchip className="w-3.5 h-3.5 text-purple-400" />
                      <span>PERITAR SECTOR</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-herramienta 4: CONSOLA DE 8 LABORATORIOS */}
          {diagnoseTab === 'consola' && (
            <div className="space-y-4">
              <EvoLabConsole
                initialZoneId={activeConsoleZoneId}
                passport={passport}
                onBackToMap={() => {}}
                onEnterTomo01={onNavigateTomo01 || (() => {})}
                onEnterMagazine={onNavigateMagazine || (() => {})}
                onEnterTomo02={() => onOpenTomo?.('02')}
                onEnterTomo03={() => onOpenTomo?.('03')}
                onEnterTomo04={() => onOpenTomo?.('04')}
              />
            </div>
          )}

          {/* Sub-herramienta 5: SIMULADORES FÍSICOS */}
          {diagnoseTab === 'simuladores' && (
            <div className="space-y-4">
              <EvoLiveBenchSuite passport={passport} />
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SECCIÓN: MI PROGRESO (EXPEDIENTE ACADÉMICO EVO)                        */}
      {/* ========================================================================= */}
      {activeIntention === 'progreso' && (
        <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 space-y-6">
          <div className="space-y-1 border-b border-zinc-800 pb-4">
            <h2 className="evo-page-title flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>EXPEDIENTE ACADÉMICO EVO // MI PROGRESO</span>
            </h2>
            <p className="evo-body-secondary">
              Registro pericial de niveles explorados, tomos leídos, laboratorios completados y casos resueltos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#090c13] border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 font-mono-tech uppercase">Ruta / Nivel Actual</div>
              <div className="text-sm font-bold text-amber-400 font-mono-tech truncate">
                {realProgress.hasProgress && realProgress.lastActivity
                  ? realProgress.lastActivity.levelTitle
                  : 'Nivel 0 (Inicial)'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#090c13] border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 font-mono-tech uppercase">Capítulos Tomo 01</div>
              <div className="text-sm font-bold text-white font-mono-tech">
                {completedChaptersCount} de 7 completados
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#090c13] border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 font-mono-tech uppercase">Laboratorios Reales</div>
              <div className="text-sm font-bold text-white font-mono-tech">
                {realProgress.isBootLabDone ? 'Tomo 08 (Activo)' : '0 Completados'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#090c13] border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 font-mono-tech uppercase">Casos Forenses</div>
              <div className="text-sm font-bold text-white font-mono-tech">
                {realProgress.resolvedCasesCount} de {realProgress.totalCasesCount} resueltos
              </div>
            </div>
          </div>

          {/* Estado de Niveles de la Escuela */}
          <div className="p-5 rounded-2xl bg-[#090c13] border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
              <span className="font-mono-tech font-bold text-white text-xs uppercase flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                ESTADO POR NIVELES (ESCUELA EVO)
              </span>
              <span className="text-[10px] text-zinc-500 font-mono-tech">
                DATOS REALES GUARDADOS
              </span>
            </div>

            <div className="space-y-2">
              {EVO_SCHOOL_LEVELS.map((lvl) => {
                let statusLabel: 'INICIADO' | 'EN CURSO' | 'COMPLETADO' | 'EN DESARROLLO' = 'EN CURSO';
                if (lvl.levelNumber === 0) statusLabel = 'INICIADO';
                else if (lvl.levelNumber === 1) statusLabel = realProgress.isTomo01FullyDone ? 'COMPLETADO' : realProgress.isC01Done ? 'EN CURSO' : 'INICIADO';
                else if (lvl.levelNumber === 2) statusLabel = realProgress.isBootLabDone ? 'COMPLETADO' : 'EN CURSO';
                else statusLabel = 'EN DESARROLLO';

                return (
                  <div
                    key={lvl.id}
                    className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between gap-3 text-xs font-mono-tech"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-bold text-white shrink-0">NIVEL {lvl.levelNumber}:</span>
                      <span className="text-zinc-300 font-sans-editorial truncate">{lvl.title}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 border ${
                        statusLabel === 'COMPLETADO'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : statusLabel === 'EN CURSO'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : statusLabel === 'INICIADO'
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                          : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                      }`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SECCIÓN: CATÁLOGO DE HERRAMIENTAS ORGANIZADAS POR INTENCIÓN            */}
      {/* ========================================================================= */}
      {activeIntention === 'herramientas' && (
        <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
          {/* Encabezado y Filtros */}
          <div className="space-y-4 border-b border-zinc-800 pb-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <h2 className="evo-page-title">
                    HERRAMIENTAS EVO
                  </h2>
                </div>
                <p className="evo-body-secondary mt-1">
                  <span className="evo-label-badge text-cyan-400">CATÁLOGO POR INTENCIÓN</span> — Elegí la herramienta según lo que querés resolver. Nombre simple afuera, profundidad técnica adentro.
                </p>
              </div>

              {/* Pestañas de categorías */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 font-mono-tech text-xs">
                {[
                  { id: 'all', label: 'TODAS' },
                  { id: 'windows', label: 'WINDOWS' },
                  { id: 'hardware', label: 'HARDWARE' },
                  { id: 'rendimiento', label: 'RENDIMIENTO' },
                  { id: 'diagnostico', label: 'DIAGNÓSTICO' },
                  { id: 'experimentos', label: 'EXPERIMENTOS' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveToolCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      activeToolCategory === cat.id
                        ? 'bg-amber-400 text-black shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Buscador de herramientas ¿QUÉ QUERÉS HACER? */}
            <div className="relative max-w-2xl">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={toolSearchQuery}
                onChange={(e) => setToolSearchQuery(e.target.value)}
                placeholder="¿Qué querés hacer? Buscar: PC lenta, FPS bajos, revisar SSD, Windows no inicia..."
                className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-xs font-mono-tech text-white placeholder-zinc-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Grilla de Herramientas (1 tarjeta = 1 unidad visual limpia) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="p-5 rounded-xl evo-surface-level2 border border-zinc-900 hover:border-cyan-400/30 transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase"
                      style={{
                        color: tool.accentColor,
                        backgroundColor: `${tool.accentColor}18`,
                        border: `1px solid ${tool.accentColor}40`,
                      }}
                    >
                      {tool.intentCategory.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono-tech">
                      HERRAMIENTA INDEPENDIENTE
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg text-white group-hover:text-amber-300 transition-colors uppercase leading-tight">
                    {tool.simpleName}
                  </h3>

                  <div className="space-y-2 text-xs text-zinc-300 font-sans-editorial">
                    <div>
                      <strong className="text-zinc-400 font-mono-tech text-[10px] uppercase block">Qué hace:</strong>
                      <span>{tool.whatItDoes}</span>
                    </div>
                    <div>
                      <strong className="text-zinc-400 font-mono-tech text-[10px] uppercase block">Cuándo usarla:</strong>
                      <span>{tool.whenToUse}</span>
                    </div>
                  </div>

                  {/* Microvisual con indicador SIMULADO */}
                  <div className="pt-1">
                    <ToolMicrovisual
                      toolId={tool.id}
                      actionKey={tool.actionKey}
                      simpleName={tool.simpleName}
                      accentColor={tool.accentColor}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleExecuteLabAction(tool.actionKey)}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)] mt-auto group-hover:scale-[1.01]"
                >
                  <span>ABRIR</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: FICHA PEDAGÓGICA UNIVERSAL DE CADA TOMO                           */}
      {/* ========================================================================= */}
      {selectedTomeProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 select-none font-mono-tech">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#090c14] border border-zinc-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Header Ficha */}
            <div className="p-4 sm:p-5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between gap-3 shrink-0">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {selectedTomeProfile.levelName}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white font-display uppercase tracking-tight">
                  TOMO {selectedTomeProfile.tomoNumber}: {selectedTomeProfile.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTomeProfile(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido Ficha */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 custom-scrollbar text-xs">
              
              {/* Recorrido Metodológico Universal (Visual) */}
              <div className="space-y-2 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  MÉTODO PEDAGÓGICO UNIVERSAL EVO LABS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5 pt-1 text-[10px]">
                  {selectedTomeProfile.methodSteps.map((step, idx) => (
                    <div
                      key={step.stage}
                      className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-1 text-center"
                    >
                      <span className="text-amber-400 font-bold">{idx + 1}. {step.stage}</span>
                      <span className="text-zinc-500 font-sans-editorial text-[9px] line-clamp-2">
                        {step.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qué vas a aprender */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  QUÉ VAS A APRENDER
                </h4>
                <ul className="space-y-1.5 pl-5 list-disc text-zinc-300 font-sans-editorial text-xs sm:text-sm">
                  {selectedTomeProfile.whatYouWillLearn.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Por qué importa */}
              <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/25 space-y-1">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  POR QUÉ IMPORTA
                </h4>
                <p className="text-zinc-300 font-sans-editorial text-xs leading-relaxed">
                  {selectedTomeProfile.whyItMatters}
                </p>
              </div>

              {/* Prerrequisitos recomendados */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  CONOCIMIENTOS PREVIOS RECOMENDADOS (GUÍA NO OBLIGATORIA)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTomeProfile.recommendedPrerequisites.map((req, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-sans-editorial"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Revista y Laboratorio Asociado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-900">
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                    REVISTA ASOCIADA
                  </span>
                  <div className="text-xs font-bold text-white font-sans-editorial">
                    {selectedTomeProfile.associatedMagazine}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold">
                      LABORATORIO ASOCIADO
                    </span>
                    <span
                      className={`text-[9px] px-2 py-0.2 rounded font-bold uppercase border ${
                        selectedTomeProfile.associatedLabStatus === 'ACTIVO'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                          : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                      }`}
                    >
                      {selectedTomeProfile.associatedLabStatus}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white font-sans-editorial">
                    {selectedTomeProfile.associatedLabTitle}
                  </div>
                </div>
              </div>

              {/* Resultado esperado */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">
                  RESULTADO ESPERADO DE APRENDIZAJE
                </span>
                <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed">
                  {selectedTomeProfile.expectedOutcome}
                </p>
              </div>
            </div>

            {/* Footer Ficha con Botones */}
            <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedTomeProfile(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-bold transition-colors cursor-pointer"
              >
                VOLVER AL NIVEL
              </button>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {selectedTomeProfile.tomoNumber === '01' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTomeProfile(null);
                        if (onNavigateTomo01) onNavigateTomo01();
                        else if (onOpenTomo) onOpenTomo('01');
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                      <BookOpen className="w-4 h-4 text-black" />
                      <span>EXPERIENCIA INTERACTIVA</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTomeProfile(null);
                        if (onNavigateMagazine) onNavigateMagazine();
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>REVISTA A4</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTomeProfile(null);
                        if (onNavigateHotSwapLab) onNavigateHotSwapLab('hardware');
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <Zap className="w-4 h-4 text-black" />
                      <span>LABORATORIO</span>
                    </button>
                  </>
                ) : selectedTomeProfile.tomoNumber === '02' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTomeProfile(null);
                        if (onOpenTomo) onOpenTomo('02');
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                    >
                      <BookOpen className="w-4 h-4 text-black" />
                      <span>LEER TOMO 02</span>
                    </button>

                    {onNavigateWindowsMatrixLab && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTomeProfile(null);
                          onNavigateWindowsMatrixLab();
                        }}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      >
                        <Zap className="w-4 h-4 text-black" />
                        <span>LAB: WINDOWS MATRIX</span>
                      </button>
                    )}
                  </>
                ) : selectedTomeProfile.tomoNumber === '08' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTomeProfile(null);
                        if (onOpenTomo) onOpenTomo('08');
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                      <BookOpen className="w-4 h-4 text-black" />
                      <span>LEER TOMO 08</span>
                    </button>

                    {onNavigateBootLab && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTomeProfile(null);
                          onNavigateBootLab();
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      >
                        <Power className="w-4 h-4 text-black" />
                        <span>LABORATORIO DE ARRANQUE</span>
                      </button>
                    )}
                  </>
                ) : selectedTomeProfile.tomoNumber === '03' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTomeProfile(null);
                        if (onOpenTomo) onOpenTomo('03');
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <BookOpen className="w-4 h-4 text-black" />
                      <span>LEER TOMO 03</span>
                    </button>

                    {onNavigateLabCore && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTomeProfile(null);
                          onNavigateLabCore();
                        }}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-emerald-500/50 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Wrench className="w-4 h-4 text-emerald-400" />
                        <span>BANCO DE REPARACIÓN</span>
                      </button>
                    )}
                  </>
                ) : selectedTomeProfile.tomoNumber === '04' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTomeProfile(null);
                      if (onOpenTomo) onOpenTomo('04');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-400 hover:bg-purple-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    <BookOpen className="w-4 h-4 text-black" />
                    <span>LEER TOMO 04</span>
                  </button>
                ) : (
                  <span className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-500 border border-zinc-800 text-center text-xs font-bold uppercase">
                    CONTENIDO EN DESARROLLO
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: INTRODUCCIÓN ANIMADA / CÓMO FUNCIONA EVO LABS (NIVEL 0)             */}
      {/* ========================================================================= */}
      {isLevel0IntroOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 select-none font-mono-tech">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#090c14] border border-amber-400/50 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_25px_rgba(245,158,11,0.2)] flex flex-col overflow-hidden">
            
            <div className="p-4 sm:p-5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    NIVEL 0 // INTRODUCCIÓN A LA ESCUELA
                  </span>
                  <h3 className="text-lg font-black text-white font-display uppercase tracking-tight">
                    CÓMO FUNCIONA EVO LABS
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsLevel0IntroOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs font-sans-editorial custom-scrollbar leading-relaxed">
              
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 space-y-1">
                <h4 className="font-display font-black text-sm text-amber-300 font-mono-tech uppercase">
                  MANIFIESTO TÉCNICO EVO LABS
                </h4>
                <p className="text-zinc-200 text-xs sm:text-sm">
                  “Hacemos milagros, pero los medimos. En EVO LABS no hay mitos, no hay placebos y no hay diagnósticos al azar. Todo conocimiento se comprueba empíricamente con mediciones y evidencia inmutable.”
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tech">
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-amber-400 font-bold uppercase block">1. QUÉ ES UN TOMO</span>
                  <p className="text-zinc-300 font-sans-editorial text-xs">
                    Una revista técnica en formato A4 con explicaciones de ingeniería, diagramas de silicio y fundamentos teóricos sin relleno comercial.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase block">2. QUÉ ES UN LABORATORIO GUIADO</span>
                  <p className="text-zinc-300 font-sans-editorial text-xs">
                    Una práctica interactiva paso a paso asociada a un tomo para comprobar en el banco lo que acabás de leer.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase block">3. QUÉ ES UN LABORATORIO TÉCNICO</span>
                  <p className="text-zinc-300 font-sans-editorial text-xs">
                    Herramientas transversales (Hardware, Silicio, Metrología, Kernel) que podés usar en cualquier momento para medir y analizar.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-purple-400 font-bold uppercase block">4. QUÉ ES UN CASO EVO</span>
                  <p className="text-zinc-300 font-sans-editorial text-xs">
                    Un expediente pericial donde recibís un problema real, investigás la evidencia, formulás hipótesis y emitís una conclusión técnica comprobable.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-xs font-bold text-white font-mono-tech uppercase block">
                  LOS 7 NIVELES RECOMENDADOS
                </span>
                <div className="space-y-1 text-xs text-zinc-300">
                  <div><strong>Nivel 0:</strong> Cómo usar EVO LABS (Metodología y herramientas)</div>
                  <div><strong>Nivel 1:</strong> Conocer la PC (Tomo 01 // Hardware & Silicio)</div>
                  <div><strong>Nivel 2:</strong> Windows y Arranque (Tomo 02 & Tomo 08 // 35 estados)</div>
                  <div><strong>Nivel 3:</strong> Diagnóstico y Reparación (Tomo 03 & Tomo 04)</div>
                  <div><strong>Nivel 4:</strong> Redes y Seguridad (Tomo 05 & Tomo 06)</div>
                  <div><strong>Nivel 5:</strong> Rendimiento y Gaming (Tomo 07 // Metrología)</div>
                  <div><strong>Nivel 6:</strong> Sistemas, Kernel y Forense (Tomo 09 & Tomo 10)</div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsLevel0IntroOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-bold transition-colors cursor-pointer"
              >
                ENTENDIDO
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLevel0IntroOpen(false);
                  setActiveIntention('escuela');
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.35)]"
              >
                <span>ENTRAR A MUNDO EVO // ESCUELA</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: GUÍA UNIVERSAL ANTES DE CADA LABORATORIO (EvoLearningGuideModal)   */}
      {/* ========================================================================= */}
      <EvoLearningGuideModal
        guide={selectedLabGuide}
        isOpen={Boolean(selectedLabGuide)}
        onClose={() => setSelectedLabGuide(null)}
        onEnterLab={() => {
          if (selectedLabGuide) {
            const key = selectedLabGuide.actionKey;
            handleExecuteLabAction(key);
          }
        }}
        onReadRelatedTomo={() => {
          if (selectedLabGuide?.relatedTomoId) {
            const num = selectedLabGuide.relatedTomoId.replace('tomo-', '');
            handleOpenTomoDirectly(num);
          }
        }}
      />

      {/* Component Inspector Modal / Drawer (PCB) */}
      {inspectedComponent && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-[#0c0f18]/95 border-t-2 border-amber-400 backdrop-blur-xl shadow-2xl p-6 transition-transform duration-300 animate-in slide-in-from-bottom-6 select-none font-mono-tech">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-400 uppercase">
                  COMPONENTE PCB AUDITADO
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  RECORRIDO FÍSICO
                </span>
              </div>
              <h3 className="font-display font-black text-xl text-white">
                {inspectedComponent.name}
              </h3>
              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed max-w-3xl">
                {inspectedComponent.detail}
              </p>
            </div>

            <button
              onClick={() => setInspectedComponent(null)}
              className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
            >
              CERRAR INSPECCIÓN
            </button>
          </div>
        </div>
      )}

      {/* Full-Feature Interactive Workstation Modal */}
      {activeWorkstationZone && (
        <EvoSectorWorkstationModal
          zone={activeWorkstationZone}
          passport={passport}
          onClose={() => setActiveWorkstationZone(null)}
          onOpenTomo={onOpenTomo}
          onOpenConsoleZone={(zoneId) => {
            setActiveWorkstationZone(null);
            setActiveIntention('diagnosticar');
            setDiagnoseTab('consola');
            setActiveConsoleZoneId(zoneId);
          }}
          activeProfile={activeProfile}
          onChangeProfile={onChangeProfile}
        />
      )}

      {/* Persistent Footer */}
      <footer className="relative z-10 px-6 py-4 border-t border-zinc-900 bg-zinc-950/70 flex items-center justify-between text-xs font-mono-tech text-zinc-500">
        <div>
          EVO LABS // <span className="text-zinc-300">"Hacemos milagros, pero los medimos."</span>
        </div>
        <div className="hidden sm:block text-zinc-600">
          CAMPUS CENTRAL MUNDO EVO // ESCUELA PEDAGÓGICA V3.5
        </div>
      </footer>
    </div>
  );
};
