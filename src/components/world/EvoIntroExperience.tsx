import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  EvoFanSvg,
  EvoOpenPcWorkstationSvg,
  CircuitDiagnosticSvg,
  PerformanceBenchSvg,
  MachineWorkshopSvg,
  ExperimentsBenchSvg,
} from '../../assets/evo-world/LabIllustrations';
import {
  Cpu,
  Layers,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Zap,
  FolderGit2,
  Compass,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Sparkles,
  Shield,
  Activity,
  BookmarkCheck,
  Check,
  Flame,
  Search,
  Wrench,
  FileText,
  Monitor,
  CheckCircle,
} from 'lucide-react';

export interface EvoIntroExperienceProps {
  onEnterCampus: () => void;
  onStartTomo01: () => void;
  onSkipAndRemember?: () => void;
  onComplete?: () => void;
  onSkip?: () => void;
}

export const EvoIntroExperience: React.FC<EvoIntroExperienceProps> = ({
  onEnterCampus,
  onStartTomo01,
  onSkipAndRemember,
  onComplete,
  onSkip,
}) => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [rememberPreference, setRememberPreference] = useState<boolean>(false);

  // Interactive Carousel States
  const [tomoCarouselIdx, setTomoCarouselIdx] = useState<number>(0);
  const [labCarouselIdx, setLabCarouselIdx] = useState<number>(0);
  const [caseCarouselIdx, setCaseCarouselIdx] = useState<number>(0);
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(0);

  const sceneDurations = [18000, 18000, 18000]; // ms per scene

  // Auto progression
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentScene < 3) {
        setCurrentScene((prev) => prev + 1);
      }
    }, sceneDurations[currentScene - 1]);

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying]);

  const handleEnterCampusAction = () => {
    if (rememberPreference) {
      try {
        localStorage.setItem('evo_academia_intro_dismissed', 'true');
      } catch {
        // ignore
      }
    }
    if (onEnterCampus) onEnterCampus();
    else if (onComplete) onComplete();
  };

  const handleStartTomo01Action = () => {
    if (rememberPreference) {
      try {
        localStorage.setItem('evo_academia_intro_dismissed', 'true');
      } catch {
        // ignore
      }
    }
    if (onStartTomo01) onStartTomo01();
    else if (onComplete) onComplete();
  };

  const handleSkipAndRememberAction = () => {
    try {
      localStorage.setItem('evo_academia_intro_dismissed', 'true');
    } catch {
      // ignore
    }
    if (onSkipAndRemember) onSkipAndRemember();
    else if (onSkip) onSkip();
    else if (onEnterCampus) onEnterCampus();
    else if (onComplete) onComplete();
  };

  // Sample data for Tomos
  const tomosData = [
    { id: 'tomo-01', num: 'TOMO 01', title: 'HARDWARE Y COMPONENTES', tag: 'ARQUITECTURA' },
    { id: 'tomo-02', num: 'TOMO 02', title: 'WINDOWS Y SISTEMA', tag: 'KERNEL & OS' },
    { id: 'tomo-03', num: 'TOMO 03', title: 'REDES Y SEGURIDAD', tag: 'CIBERSEGURIDAD' },
  ];

  // Sample data for Labs
  const labsData = [
    { id: 'lab-08', title: 'Lab 08: Arranque y Fallas', steps: ['BIOS / UEFI', 'POST', 'Boot Manager', 'Sistema Operativo'] },
    { id: 'lab-09', title: 'Lab 09: Windows & Kernel', steps: ['Servicios NT', 'DPC & ISR', 'Scheduler', 'Análisis BSOD'] },
    { id: 'lab-10', title: 'Lab 10: Redes & Paquetes', steps: ['OSI Model', 'Sockets', 'Captura PCAP', 'Firewall Rules'] },
  ];

  // Sample data for Cases
  const casesData = [
    { id: 'case-17', num: 'Caso #17', title: 'Notebook sin imagen', detail: 'Posible falla en VRM de GPU' },
    { id: 'case-23', num: 'Caso #23', title: 'Reinicio aleatorio', detail: 'Inestabilidad de RAM / VRM' },
    { id: 'case-31', num: 'Caso #31', title: 'No inicia Windows', detail: 'Corrupción de BCD / Disco' },
  ];

  // Levels for step 4
  const levelsData = [
    { level: 1, name: 'Fundamentos' },
    { level: 2, name: 'Sistemas' },
    { level: 3, name: 'Hardware' },
    { level: 4, name: 'Redes' },
    { level: 5, name: 'Diagnóstico' },
    { level: 6, name: 'Seguridad' },
    { level: 7, name: 'Profesional' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#07090f] text-[#f4f4f5] flex flex-col justify-between overflow-x-hidden overflow-y-auto select-none font-sans-editorial">
      {/* Background Grid & Ambient Glow */}
      <div className="fixed inset-0 bg-tech-grid opacity-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />

      {/* Top Header Controls */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-zinc-900/90 bg-[#07090f]/90 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]" />
          <div className="flex flex-col">
            <span className="font-display font-black text-sm tracking-wider text-white uppercase flex items-center gap-1.5">
              ACADEMIA <span className="text-amber-400">EVO LABS</span>
            </span>
            <span className="font-mono-tech text-[10px] text-zinc-400 tracking-wider hidden sm:inline-block">
              SISTEMA DE APRENDIZAJE TECNOLÓGICO
            </span>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="hidden lg:flex items-center gap-6 font-mono-tech text-xs tracking-wider text-zinc-400 uppercase">
          <span className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setCurrentScene(2)}>CONTENIDOS</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setCurrentScene(2)}>LABORATORIOS</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setCurrentScene(2)}>CASOS REALES</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setCurrentScene(2)}>METODOLOGÍA</span>
        </div>

        {/* Scene stepper & Skip controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pausar auto-reproducción' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={handleSkipAndRememberAction}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-amber-400/60 bg-zinc-900/80 hover:bg-zinc-800 text-[11px] font-mono-tech text-zinc-300 hover:text-amber-300 transition-all cursor-pointer shadow-sm"
            title="Saltar intro y comenzar"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Saltar intro y comenzar</span>
          </button>
        </div>
      </header>

      {/* Main Presentation Stage */}
      <main className="relative z-10 flex-1 flex flex-col justify-center p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full my-auto space-y-6">
        <AnimatePresence mode="wait">
          {/* ========================================================
              PORTADA PRINCIPAL: QUÉ ENCONTRÁS EN EVO LABS
             ======================================================== */}
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="w-full space-y-6"
            >
              {/* HEADLINE SECTION */}
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-[11px] font-mono-tech font-bold tracking-widest text-amber-400 uppercase">
                  CONTENIDOS & CAPACIDADES
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
                  QUÉ ENCONTRÁS EN <span className="text-amber-400">EVO LABS</span>
                </h1>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial max-w-2xl mx-auto leading-relaxed">
                  Contenido real, laboratorios visuales, herramientas técnicas y un sistema paso a paso para entender, practicar y diagnosticar.
                </p>
              </div>

              {/* 4-STEP METHODOLOGY FLOW */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto font-mono-tech text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2 text-zinc-300 hover:border-cyan-500/50 transition-colors">
                  <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">1. ENTENDER</div>
                    <div className="text-[9px] text-zinc-400">Conceptos claros</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2 text-zinc-300 hover:border-emerald-500/50 transition-colors">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">2. PRACTICAR</div>
                    <div className="text-[9px] text-zinc-400">Laboratorios reales</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2 text-zinc-300 hover:border-purple-500/50 transition-colors">
                  <Search className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">3. DIAGNOSTICAR</div>
                    <div className="text-[9px] text-zinc-400">Casos del mundo real</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-2 text-zinc-300 hover:border-amber-400/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">4. COMPROBAR</div>
                    <div className="text-[9px] text-zinc-400">Con evidencia técnica</div>
                  </div>
                </div>
              </div>

              {/* 4 MAIN INTERACTIVE CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                
                {/* PANEL 1: 10 TOMOS EVO LABS (CYAN THEME) */}
                <div className="p-5 rounded-2xl bg-zinc-950/90 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono-tech bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider">
                        BIBLIOTECA EDITORIAL
                      </span>
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                    </div>

                    <div>
                      <h3 className="font-display font-black text-xl text-white">10 TOMOS EVO LABS</h3>
                      <p className="text-xs text-zinc-300 font-sans-editorial mt-1 leading-relaxed">
                        Revistas técnicas en formato Magazine con explicaciones claras, diagramas y ejemplos prácticos.
                      </p>
                    </div>

                    <ul className="grid grid-cols-2 gap-1.5 text-[11px] font-mono-tech text-zinc-300">
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Hardware y componentes</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Reparación de PC y notebooks</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Redes y conectividad</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Gaming & Optimización</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Diagnóstico avanzado</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Windows, ciberseguridad y más</li>
                    </ul>

                    {/* Interactive 3D Tomo Carousel Preview */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between gap-3 font-mono-tech text-xs relative">
                      <button
                        onClick={() => setTomoCarouselIdx((prev) => (prev > 0 ? prev - 1 : tomosData.length - 1))}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white cursor-pointer transition-colors"
                        title="Tomo anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex-1 text-center space-y-0.5">
                        <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase block">
                          {tomosData[tomoCarouselIdx].num} // {tomosData[tomoCarouselIdx].tag}
                        </span>
                        <div className="font-bold text-white text-xs sm:text-sm uppercase">
                          {tomosData[tomoCarouselIdx].title}
                        </div>
                      </div>

                      <button
                        onClick={() => setTomoCarouselIdx((prev) => (prev < tomosData.length - 1 ? prev + 1 : 0))}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white cursor-pointer transition-colors"
                        title="Tomo siguiente"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleStartTomo01Action}
                    className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer pt-1"
                  >
                    <span>Ver contenido</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* PANEL 2: LABORATORIOS GUIADOS Y TÉCNICOS (EMERALD THEME) */}
                <div className="p-5 rounded-2xl bg-zinc-950/90 border border-emerald-500/30 hover:border-emerald-400 transition-all shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono-tech bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
                        EXPERIMENTACIÓN SEGURA
                      </span>
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>

                    <div>
                      <h3 className="font-display font-black text-xl text-white">LABORATORIOS GUIADOS Y TÉCNICOS</h3>
                      <p className="text-xs text-zinc-300 font-sans-editorial mt-1 leading-relaxed">
                        Entornos reales y simulaciones paso a paso para experimentar sin miedo a romper nada.
                      </p>
                    </div>

                    <ul className="grid grid-cols-2 gap-1.5 text-[11px] font-mono-tech text-zinc-300">
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Laboratorios de arranque y fallas</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Diagnóstico de hardware en vivo</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Windows, drivers y Kernel</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Redes, virtualización y ciberseguridad</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Pruebas, medición y herramientas</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Simulaciones interactivas</li>
                    </ul>

                    {/* Interactive Lab Preview Mockup */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 font-mono-tech text-xs">
                      <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-1.5">
                        <span className="text-emerald-400 font-bold uppercase">{labsData[labCarouselIdx].title}</span>
                        <div className="flex items-center gap-1">
                          {labsData.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setLabCarouselIdx(idx)}
                              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${labCarouselIdx === idx ? 'bg-emerald-400' : 'bg-zinc-700'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 text-[10px] text-center pt-0.5">
                        {labsData[labCarouselIdx].steps.map((step, idx) => (
                          <div key={idx} className="p-1.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 font-semibold truncate">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleEnterCampusAction}
                    className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer pt-1"
                  >
                    <span>Ver laboratorios</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* PANEL 3: TALLER DE CASOS Y EXPEDIENTES (PURPLE THEME) */}
                <div className="p-5 rounded-2xl bg-zinc-950/90 border border-purple-500/30 hover:border-purple-400 transition-all shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono-tech bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-wider">
                        PERITAJE PROFESIONAL
                      </span>
                      <FolderGit2 className="w-5 h-5 text-purple-400" />
                    </div>

                    <div>
                      <h3 className="font-display font-black text-xl text-white">TALLER DE CASOS Y EXPEDIENTES</h3>
                      <p className="text-xs text-zinc-300 font-sans-editorial mt-1 leading-relaxed">
                        Resolvé fallas y situaciones reales como un técnico profesional. Analizá evidencias, aplicá herramientas y documentá tus conclusiones.
                      </p>
                    </div>

                    <ul className="grid grid-cols-2 gap-1.5 text-[11px] font-mono-tech text-zinc-300">
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" />Casos reales paso a paso</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" />Análisis de síntomas y evidencias</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" />Uso de herramientas profesionales</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" />Dictamen técnico y conclusiones</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" />Expedientes descargables</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" />Distintos niveles de dificultad</li>
                    </ul>

                    {/* Interactive Case File Mockup */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 font-mono-tech text-xs">
                      <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-1.5">
                        <span className="text-purple-400 font-bold uppercase">
                          {casesData[caseCarouselIdx].num}: {casesData[caseCarouselIdx].title}
                        </span>
                        <div className="flex items-center gap-1">
                          {casesData.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCaseCarouselIdx(idx)}
                              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${caseCarouselIdx === idx ? 'bg-purple-400' : 'bg-zinc-700'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-zinc-300 p-2 rounded bg-zinc-950 border border-zinc-800">
                        <span>Diagnóstico pericial:</span>
                        <span className="text-amber-400 font-bold">{casesData[caseCarouselIdx].detail}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleEnterCampusAction}
                    className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer pt-1"
                  >
                    <span>Explorar casos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* PANEL 4: UN SISTEMA PASO A PASO (AMBER THEME) */}
                <div className="p-5 rounded-2xl bg-zinc-950/90 border border-amber-400/30 hover:border-amber-400 transition-all shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono-tech bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
                        METODOLOGÍA DIDÁCTICA
                      </span>
                      <Compass className="w-5 h-5 text-amber-400" />
                    </div>

                    <div>
                      <h3 className="font-display font-black text-xl text-white">UN SISTEMA PASO A PASO</h3>
                      <p className="text-xs text-zinc-300 font-sans-editorial mt-1 leading-relaxed">
                        Diseñado pedagógicamente para que avances a tu propio ritmo, desde cero hasta nivel profesional.
                      </p>
                    </div>

                    <ul className="grid grid-cols-2 gap-1.5 text-[11px] font-mono-tech text-zinc-300">
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Ruta de aprendizaje en 7 niveles</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Teoría + práctica + casos reales</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Actividades y checkpoints</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Validación con evidencias técnicas</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Seguimiento de progreso</li>
                      <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Diseñado por técnicos, para técnicos</li>
                    </ul>

                    {/* Interactive 7 Level Timeline */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 font-mono-tech text-xs">
                      <div className="text-[10px] text-amber-400 font-bold uppercase border-b border-zinc-800 pb-1 flex justify-between">
                        <span>7 NIVELES FORMATIVOS (DEL 0 AL 6)</span>
                        <span>NIVEL SELECCIONADO: #{levelsData[selectedLevelIdx].level}</span>
                      </div>

                      <div className="flex items-center justify-between gap-1 pt-1">
                        {levelsData.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedLevelIdx(idx)}
                            className={`flex-1 py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${
                              selectedLevelIdx === idx
                                ? 'bg-amber-400 text-zinc-950 shadow-md'
                                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                            }`}
                          >
                            {item.level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleEnterCampusAction}
                    className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer pt-1"
                  >
                    <span>Ver metodología</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* BOTTOM ACTION BAR */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-[11px] font-mono-tech text-zinc-400 hidden lg:block uppercase tracking-wider">
                  FORMACIÓN TÉCNICA REAL // HERRAMIENTAS PROFESIONALES // CASOS REALES
                </div>

                <div className="flex items-center gap-3.5 w-full md:w-auto justify-center">
                  <button
                    type="button"
                    onClick={handleEnterCampusAction}
                    className="py-3.5 px-8 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-display font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-amber-400/20 hover:shadow-amber-400/35 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <span>COMENZAR</span>
                    <ArrowRight className="w-4 h-4 text-zinc-950" />
                  </button>

                  <button
                    type="button"
                    onClick={handleStartTomo01Action}
                    className="py-3.5 px-6 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  >
                    <span>CONOCER MÁS</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono-tech text-zinc-400 hidden lg:block uppercase tracking-wider">
                  APRENDÉ // PRACTICÁ // DIAGNOSTICÁ // COMPROBÁ
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              ESCENA 02 // DETALLE EXPANDIDO DE CONTENIDOS
             ======================================================== */}
          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center text-center space-y-6"
            >
              <div className="space-y-1">
                <div className="font-mono-tech text-xs tracking-widest text-amber-400 font-bold uppercase">
                  SISTEMA DE APRENDIZAJE INTEGRAL
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
                  EXPERIENCIA PRÁCTICA EVO LABS
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial">
                  Ruta formativa estructurada para avanzar desde los fundamentos hasta el peritaje profesional.
                </p>
              </div>

              {/* Detail Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl text-left">
                <div className="p-5 rounded-2xl bg-zinc-950/80 border border-cyan-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                      RECURSOS DIDÁCTICOS
                    </span>
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">MAGAZINES TÉCNICAS (TOMOS)</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans-editorial">
                    10 publicaciones editoriales en alta fidelidad con explicaciones desde el silicio hasta la optimización del sistema operativo.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950/80 border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                      SIMULACIÓN INTERACTIVA
                    </span>
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">LABORATORIOS EN TIEMPO REAL</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans-editorial">
                    Entornos de medición, diagramas de flujo de arranque, peritaje de fallas de memoria, almacenamiento y Kernel NT.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleEnterCampusAction}
                  className="py-3 px-8 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-display font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-400/20 cursor-pointer flex items-center gap-2"
                >
                  <span>ENTRAR A LA ACADEMIA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              ESCENA 03 // EL VIAJE DE APRENDIZAJE EVO & INGRESO
             ======================================================== */}
          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center text-center space-y-6"
            >
              <div className="w-full max-w-lg mx-auto relative p-6 rounded-2xl bg-zinc-950/80 border border-amber-400/40 shadow-2xl backdrop-blur-md overflow-hidden">
                <div className="absolute top-2 right-3 font-mono-tech text-[10px] text-amber-400 font-bold">
                  SISTEMA_PEDAGÓGICO: ACTIVO
                </div>
                <EvoOpenPcWorkstationSvg className="max-w-xs mx-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white uppercase">
                  TU VIAJE COMIENZA AHORA
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial leading-relaxed">
                  Podés explorar el Campus principal según tu propia curiosidad o iniciar la lectura interactiva del primer tomo formativo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto pt-2">
                <button
                  type="button"
                  onClick={handleEnterCampusAction}
                  className="w-full sm:w-auto flex-1 py-4 px-8 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-display font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>ENTRAR A LA ACADEMIA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleStartTomo01Action}
                  className="w-full sm:w-auto flex-1 py-4 px-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-cyan-300 hover:text-white border border-cyan-500/40 font-display font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>COMENZAR POR EL TOMO 01</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Technical Status Bar */}
      <footer className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 py-3 border-t border-zinc-900/90 bg-[#07090f]/90 backdrop-blur-xl text-xs font-mono-tech text-zinc-500 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-bold">ACADEMIA EVO LABS // V1.0</span>
          <span className="text-zinc-700">//</span>
          <span className="text-amber-400/90 font-medium">TELEMETRÍA LOCAL 100% PRIVADA</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSkipAndRememberAction}
            className="text-[11px] text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Saltar intro y recordar mi elección</span>
          </button>

          {currentScene < 3 ? (
            <button
              onClick={() => setCurrentScene((prev) => prev + 1)}
              className="flex items-center gap-1 text-zinc-300 hover:text-amber-400 font-bold transition-colors cursor-pointer"
            >
              <span>SIGUIENTE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleEnterCampusAction}
              className="flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>IR AL CAMPUS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
