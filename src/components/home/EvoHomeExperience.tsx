import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  BookOpen,
  Zap,
  Cpu,
  Gauge,
  Bot,
  FileCheck2,
  X,
  Sparkles,
  Compass,
  FolderGit2,
  Layers,
  Wrench,
  CheckCircle2,
  Clock,
  Play,
  HelpCircle,
} from 'lucide-react';
import { EvoHeroReactiveBackground } from './EvoHeroReactiveBackground';
import {
  getTomo01CompletedCount,
  isTomo01ExamPassed,
  isTomo01Complete,
} from '../../utils/tomo01Progress';
import { EvoCaseRepository } from '../evoLabCore/services/caseRepository';

export interface EvoHomeExperienceProps {
  onNavigateAprender: () => void;
  onNavigatePracticar: () => void;
  onNavigateAnalizar: () => void;
  onNavigateHerramientas: () => void;
  onNavigateComoUsar: () => void;
  onNavigatePlanes: () => void;
  onNavigateEntrar: () => void;
  onOpenIntroPresentation?: () => void;
  onOpenLevel0Intro?: () => void;
  onOpenCaseResolver?: () => void;
}

export const EvoHomeExperience: React.FC<EvoHomeExperienceProps> = ({
  onNavigateAprender,
  onNavigatePracticar,
  onNavigateAnalizar,
  onNavigateHerramientas,
  onNavigateComoUsar,
  onNavigatePlanes,
  onNavigateEntrar,
  onOpenIntroPresentation,
  onOpenLevel0Intro,
  onOpenCaseResolver,
}) => {
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // DETECCIÓN DE ESTADO REAL (SIN INVENTAR MÉTRICAS)
  // ---------------------------------------------------------------------------
  const realProgress = useMemo(() => {
    try {
      const completedChapters = getTomo01CompletedCount();
      const examPassed = isTomo01ExamPassed();
      const tomo01Done = isTomo01Complete();
      const bootLabDone = typeof window !== 'undefined' && localStorage.getItem('evo_boot_lab_completed') === 'true';
      const passportRaw = typeof window !== 'undefined' ? localStorage.getItem('evo_user_hardware_passport') : null;
      const hasPassport = Boolean(passportRaw && passportRaw !== 'null');

      const savedCases = EvoCaseRepository.getAllCases();
      const resolvedCases = savedCases.filter((c) => c.isClosed).length;
      const totalCases = savedCases.length;

      const hasProgress = completedChapters > 0 || examPassed || bootLabDone || hasPassport;

      return {
        completedChapters,
        examPassed,
        tomo01Done,
        bootLabDone,
        hasPassport,
        resolvedCases,
        totalCases,
        hasProgress,
      };
    } catch {
      return {
        completedChapters: 0,
        examPassed: false,
        tomo01Done: false,
        bootLabDone: false,
        hasPassport: false,
        resolvedCases: 0,
        totalCases: 0,
        hasProgress: false,
      };
    }
  }, []);

  const progressPercentage = Math.round((realProgress.completedChapters / 7) * 100);

  return (
    <div className="relative z-10 flex-1 max-w-[1180px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col space-y-16 sm:space-y-24 transition-all duration-300">
      
      {/* ========================================================================= */}
      {/* 01 // HERO PRINCIPAL MUNDO EVO                                            */}
      {/* ========================================================================= */}
      <section className="relative min-h-[58vh] sm:min-h-[64vh] flex flex-col items-center justify-center text-center py-8 sm:py-12 px-4 sm:px-6 rounded-3xl overflow-hidden border border-zinc-800/40 bg-black/40">
        {/* Fondo interactivo reactivo al cursor */}
        <EvoHeroReactiveBackground />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8 pointer-events-auto">
          {/* Identificador de marca */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono-tech font-bold uppercase tracking-[0.25em] text-amber-300">
              EVO LABS
            </span>
          </div>

          {/* Headline de Alto Impacto */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tight leading-[0.95]">
              NO LO CREAS.
              <br />
              <span className="text-amber-400">COMPROBALO.</span>
            </h1>
          </div>

          {/* Supporting Copy */}
          <p className="font-sans-editorial text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Aprendé tecnología entendiendo qué ocurre, probándolo y comprobando resultados con mediciones y evidencia inmutable.
          </p>

          {/* Bloque de Acciones: 1 CTA Dominante Ámbar + 1 Acción Secundaria */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            {/* CTA Dominante Único en Ámbar */}
            <button
              type="button"
              onClick={onNavigateAprender}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono-tech text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2"
            >
              <span>{realProgress.hasProgress ? 'CONTINUAR DONDE QUEDÉ' : 'COMENZAR TOMO 01'}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            {/* Acción Secundaria en Outline */}
            <button
              type="button"
              onClick={onNavigateComoUsar}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 font-mono-tech text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>CÓMO FUNCIONA EVO</span>
            </button>
          </div>

          {/* Indicador de Avance Real Integrado (Sin números inventados) */}
          {realProgress.hasProgress && (
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 text-xs font-mono-tech text-zinc-400">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white">Avance:</span>
                  <span className="text-amber-400 font-bold">{realProgress.completedChapters} de 7 capítulos</span>
                  <span>({progressPercentage}%)</span>
                </div>
                <span className="text-zinc-700">|</span>
                <div className="text-zinc-400">
                  Examen: {realProgress.examPassed ? <span className="text-emerald-400 font-bold">Aprobado</span> : <span className="text-zinc-500">Pendiente</span>}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 // PANEL: ESTADO ACTUAL & RECURSOS TÉCNICOS                            */}
      {/* ========================================================================= */}
      <section className="space-y-4 max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-zinc-300">
              ESTADO ACTUAL // RECURSOS DISPONIBLES
            </h2>
          </div>
          <span className="text-[11px] font-mono-tech text-zinc-500">
            SISTEMA OPERATIVO Y DISPONIBILIDAD
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Tarjeta 1: Tomos */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-tech font-bold text-zinc-400 uppercase">BIBLIOTECA</span>
              <BookOpen className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-display font-black text-white">
              10 <span className="text-xs sm:text-sm font-sans font-normal text-zinc-400">Tomos</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans-editorial">
              Colección técnica completa con arquitectura y silicio.
            </p>
          </div>

          {/* Tarjeta 2: Labs */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-tech font-bold text-zinc-400 uppercase">LABORATORIOS</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-display font-black text-white">
              8 <span className="text-xs sm:text-sm font-sans font-normal text-zinc-400">Bancos</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans-editorial">
              Simuladores guiados, sandboxes y arranque de 35 estados.
            </p>
          </div>

          {/* Tarjeta 3: Herramientas */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-tech font-bold text-zinc-400 uppercase">INSTRUMENTAL</span>
              <Wrench className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-display font-black text-white">
              34 <span className="text-xs sm:text-sm font-sans font-normal text-zinc-400">Herramientas</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans-editorial">
              Metrología de FPS, kernel, latencia DPC y diagnóstico.
            </p>
          </div>

          {/* Tarjeta 4: Expedientes Reales */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-tech font-bold text-zinc-400 uppercase">EXPEDIENTES</span>
              <FileCheck2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-display font-black text-white">
              {realProgress.resolvedCases} <span className="text-xs sm:text-sm font-sans font-normal text-zinc-400">/ {realProgress.totalCases || 6} resueltos</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans-editorial">
              Casos periciales con evidencia y conclusión técnica.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 // LAS 5 ÁREAS PRINCIPALES DE EVO LABS                                 */}
      {/* ========================================================================= */}
      <section className="space-y-6 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-bold block">
            ARQUITECTURA DE CONTENIDO
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            EXPLORÁ EL SISTEMA EVO
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto font-sans-editorial">
            Accedé directamente a cada dimensión del ecosistema con un solo clic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {/* 1. APRENDER */}
          <button
            type="button"
            onClick={onNavigateAprender}
            className="group text-left p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-amber-400/50 hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white uppercase group-hover:text-amber-300 transition-colors">
                  APRENDER
                </h3>
                <span className="text-[11px] font-mono-tech text-amber-400/80 font-bold block">
                  TOMOS 01–10 & MAGAZINES
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial leading-relaxed">
                Fundamentos teóricos sin relleno comercial: silicio, buses PCIe, arquitectura de Windows y metrología.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-tech font-bold text-amber-400 pt-2 border-t border-zinc-900">
              <span>EXPLORAR TOMOS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 2. PRACTICAR */}
          <button
            type="button"
            onClick={onNavigatePracticar}
            className="group text-left p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-cyan-400/50 hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white uppercase group-hover:text-cyan-300 transition-colors">
                  PRACTICAR
                </h3>
                <span className="text-[11px] font-mono-tech text-cyan-400/80 font-bold block">
                  LABORATORIOS & BANCOS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial leading-relaxed">
                Bancos de prueba interactivos, secuencia de boot de 35 estados y experimentación controlada.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-tech font-bold text-cyan-400 pt-2 border-t border-zinc-900">
              <span>ABRIR LABORATORIOS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 3. ANALIZAR MI PC */}
          <button
            type="button"
            onClick={onNavigateAnalizar}
            className="group text-left p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-purple-400/50 hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400/40"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white uppercase group-hover:text-purple-300 transition-colors">
                  ANALIZAR MI PC
                </h3>
                <span className="text-[11px] font-mono-tech text-purple-400/80 font-bold block">
                  DIAGNÓSTICO & AUDITORÍA
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial leading-relaxed">
                Conectá el motor con tu hardware real para generar un pasaporte técnico y detectar cuellos de botella.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-tech font-bold text-purple-400 pt-2 border-t border-zinc-900">
              <span>AUDITAR SILICIO</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 4. HERRAMIENTAS */}
          <button
            type="button"
            onClick={onNavigateHerramientas}
            className="group text-left p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-emerald-400/50 hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white uppercase group-hover:text-emerald-300 transition-colors">
                  HERRAMIENTAS
                </h3>
                <span className="text-[11px] font-mono-tech text-emerald-400/80 font-bold block">
                  34 INSTRUMENTOS TÉCNICOS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial leading-relaxed">
                Utilidades especializadas: capturador de frametimes, auditor de latencia DPC, visor de esquemáticos PCB.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-tech font-bold text-emerald-400 pt-2 border-t border-zinc-900">
              <span>VER INSTRUMENTAL</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 5. MI EVO */}
          <button
            type="button"
            onClick={onNavigateEntrar}
            className="group text-left p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-amber-400/50 hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg sm:col-span-2 lg:col-span-2 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white uppercase group-hover:text-amber-300 transition-colors">
                  MI EVO // EXPEDIENTE & PROGRESO
                </h3>
                <span className="text-[11px] font-mono-tech text-amber-400/80 font-bold block">
                  HISTORIAL TÉCNICO INMUTABLE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial leading-relaxed">
                Consultá tu expediente de peritajes resueltos, capítulos completados, pasaporte de hardware y certificaciones técnicas oficiales emitidas por EVO LABS.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono-tech font-bold text-amber-400 pt-2 border-t border-zinc-900">
              <span>ABRIR MI EXPEDIENTE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 // BLOQUE SECUNDARIO: TALLER DE CASOS & METODOLOGÍA                    */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto w-full">
        {/* Taller de Casos */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-[#120e06] to-zinc-950 border border-amber-400/30 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-mono-tech text-amber-400 font-bold uppercase tracking-widest block">
              RESOLUCIÓN DE INCIDENTES
            </span>
            <h3 className="font-display font-black text-xl text-white uppercase">
              TALLER DE CASOS PERICIALES
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial leading-relaxed">
              Enfrentá escenarios reales de micro-tartamudeos, pantallazos azules (BSOD) y estrangulamiento térmico. Investigá, emití hipótesis y registrá tu conclusión.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                if (onOpenCaseResolver) onOpenCaseResolver();
                else onNavigatePracticar();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono-tech text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>INGRESAR AL TALLER</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* Método EVO de 9 Pasos */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-mono-tech text-cyan-400 font-bold uppercase tracking-widest block">
              MÉTODO CIENTÍFICO APLICADO
            </span>
            <h3 className="font-display font-black text-xl text-white uppercase">
              EL MÉTODO EVO // 9 PASOS
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial leading-relaxed">
              Observar → Entender → Hipotetizar → Intervenir → Medir → Comparar → Comprobar → Documentar → Transferir.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsMethodModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              CONOCER EL MÉTODO →
            </button>

            {onOpenIntroPresentation && (
              <button
                type="button"
                onClick={onOpenIntroPresentation}
                className="px-4 py-3 rounded-xl text-zinc-400 hover:text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                VER PRESENTACIÓN INSTITUCIONAL
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 // MANIFIESTO EVO & DIFERENCIAL                                        */}
      {/* ========================================================================= */}
      <section className="py-8 sm:py-12 px-6 sm:px-10 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 text-center space-y-6 max-w-4xl mx-auto shadow-2xl">
        <div className="space-y-2">
          <span className="text-[10px] font-mono-tech tracking-[0.25em] text-amber-400 uppercase font-bold block">
            PRINCIPIO CENTRAL
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            NO QUEREMOS QUE MEMORICES RESPUESTAS.
            <br />
            <span className="text-amber-300">QUEREMOS QUE ENTIENDAS POR QUÉ OCURREN.</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono-tech text-xs sm:text-sm font-bold text-zinc-400 pt-1">
          <span className="text-amber-300">OBSERVAR</span>
          <span className="text-zinc-700">•</span>
          <span className="text-cyan-300">MEDIR</span>
          <span className="text-zinc-700">•</span>
          <span className="text-purple-300">EXPERIMENTAR</span>
          <span className="text-zinc-700">•</span>
          <span className="text-emerald-300">COMPARAR</span>
          <span className="text-zinc-700">•</span>
          <span className="text-amber-300">COMPROBAR</span>
        </div>
      </section>

      {/* FOOTER SOBRIO Y LIMPIO */}
      <footer className="border-t border-zinc-900/90 pt-8 pb-4 text-center font-mono-tech text-xs text-zinc-500 space-y-1">
        <p className="text-zinc-400">EVO LABS // NO LO CREAS. COMPROBALO.</p>
        <p className="text-[11px] text-zinc-600">© 2026 EVO LABS. SISTEMA PERICIAL DE INGENIERÍA Y APRENDIZAJE.</p>
      </footer>

      {/* MODAL EVO METHOD (9 PASOS) */}
      {isMethodModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-2xl w-full rounded-2xl bg-[#090c13] border border-amber-400/40 p-6 shadow-2xl space-y-4 font-mono-tech max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-black tracking-widest block">METODOLOGÍA CIENTÍFICA</span>
                <h3 className="font-display font-black text-lg text-white uppercase">EL MÉTODO EVO // 9 PASOS PERICIALES</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMethodModalOpen(false)}
                className="p-1 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Cerrar modal de método"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {[
                { s: '01', v: 'OBSERVAR', d: 'Identificá el síntoma en el sistema o hardware sin prejuicios.' },
                { s: '02', v: 'ENTENDER', d: 'Comprendé los buses y dependencias que interactúan.' },
                { s: '03', v: 'HIPOTETIZAR', d: 'Formulá una causa probable basada en la física del silicio.' },
                { s: '04', v: 'INTERVENIR', d: 'Realizá una sola modificación controlada en el banco.' },
                { s: '05', v: 'MEDIR', d: 'Registrá la variable con instrumental metrológico real.' },
                { s: '06', v: 'COMPARAR', d: 'Contrastá la medición contra la línea de base original.' },
                { s: '07', v: 'COMPROBAR', d: 'Validá si la hipótesis se demostró o fue refutada.' },
                { s: '08', v: 'DOCUMENTAR', d: 'Registrá el hallazgo en el expediente pericial.' },
                { s: '09', v: 'TRANSFERIR', d: 'Aplicá el principio a nuevos escenarios y arquitecturas.' },
              ].map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/90 space-y-1">
                  <span className="text-[9px] text-zinc-500 font-mono block">{step.s}</span>
                  <strong className="text-amber-400 text-xs block">{step.v}</strong>
                  <p className="text-[11px] text-zinc-400 font-sans-editorial leading-tight">{step.d}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-zinc-900 flex justify-end">
              <button
                type="button"
                onClick={() => setIsMethodModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-amber-400 text-black text-xs font-bold uppercase transition-all cursor-pointer"
              >
                ENTENDIDO
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
