import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Activity,
  Compass,
  BookOpen,
  Gauge,
  Clock,
  ExternalLink,
  Shield,
  Play,
  RotateCcw,
  Terminal,
  HelpCircle,
  FolderGit2,
} from 'lucide-react';
import { EvoMundoWordmark } from '../common/EvoMundoWordmark';
import { EvoHeroCore3D } from '../world/EvoHeroCore3D';
import { EvoPrimarySystemButton, EvoSecondaryInspectButton } from '../common/EvoSystemButtons';
import { EVO_SCHOOL_LEVELS } from '../../data/evoLearningPaths';
import { EVO_TOMES_EXPANDED_DATA } from '../../data/evoTomesExpandedData';
import { UserHardwarePassport } from '../../types';

export interface EvoHomeExperienceProps {
  onNavigateTomos: () => void;
  onNavigatePracticar: () => void;
  onNavigateAnalizar: () => void;
  onNavigateHerramientas: () => void;
  onNavigateMiEvo: () => void;
  onNavigateHotSwapLab?: (subPanel?: 'sandbox' | 'hardware' | 'software' | 'telemetry' | 'all') => void;
  onNavigateWindowsMatrixLab?: (scenario?: string) => void;
  onNavigateBootLab?: () => void;
  onOpenTomo?: (tomoNumber: string) => void;
  userPassport?: UserHardwarePassport | null;
  realProgress?: {
    hasProgress: boolean;
    isC07Done: boolean;
    isExamPassed: boolean;
    isTomo01FullyDone: boolean;
    lastActivity?: {
      title: string;
      onContinue?: () => void;
    };
  };
}

export const EvoHomeExperience: React.FC<EvoHomeExperienceProps> = ({
  onNavigateTomos,
  onNavigatePracticar,
  onNavigateAnalizar,
  onNavigateHerramientas,
  onNavigateMiEvo,
  onNavigateHotSwapLab,
  onNavigateWindowsMatrixLab,
  onNavigateBootLab,
  onOpenTomo,
  userPassport,
  realProgress,
}) => {
  // 3 Tomos canónicos destacados para la muestra
  const featuredTomos = EVO_TOMES_EXPANDED_DATA.slice(0, 3);

  // Niveles pedagógicos reales existentes (1 al 6)
  const realLevels = EVO_SCHOOL_LEVELS.filter((l) => l.levelNumber > 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 flex-1 max-w-[1500px] w-full mx-auto px-3.5 sm:px-6 lg:px-10 py-5 sm:py-8 lg:py-12 flex flex-col space-y-12 sm:space-y-16 lg:space-y-20 transition-all duration-300">
      
      {/* ========================================================================= */}
      {/* 1. HERO EVO LABS — JERARQUÍA LIMPIA SIN RUIDO MÓVIL                      */}
      {/* Orden estricto: Identidad → NO LO CREAS. COMPROBALO. → Subcopy → CTAs    */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center relative min-h-[auto] lg:min-h-[460px]">
        {/* Glow ambiental focal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none bg-amber-500/[0.04] -z-10" />

        {/* Columna Izquierda: Identidad, Lema Monumental y CTAs */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
          
          {/* Identidad EVO LABS limpia (sin etiquetas técnicas invasivas en mobile) */}
          <div className="space-y-2">
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/30">
              PLATAFORMA EDITORIAL & LABORATORIO DE SILICIO
            </span>

            <EvoMundoWordmark variant="hero" showUniverseBadge={false} />
          </div>

          {/* Lema canónico: NO LO CREAS. COMPROBALO. */}
          <div className="border-l-2 border-amber-400 pl-4 sm:pl-5 py-1.5 sm:py-2 space-y-0.5 sm:space-y-1 bg-gradient-to-r from-amber-400/[0.04] to-transparent">
            <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-amber-400 uppercase block tracking-wider leading-none">
              NO LO CREAS.
            </span>
            <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase block tracking-wider leading-none">
              COMPROBALO.
            </span>
          </div>

          {/* Subcopy breve */}
          <p className="font-sans-editorial text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed max-w-xl">
            Aprendé tecnología investigando, probando, midiendo y diagnosticando sistemas reales.
          </p>

          {/* Botones de acción principales (Jerarquía: Primario dominante + Secundario sutil) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <EvoPrimarySystemButton onClick={onNavigateTomos}>
              COMENZAR MI EVOLUCIÓN →
            </EvoPrimarySystemButton>

            <EvoSecondaryInspectButton onClick={() => scrollToSection('manifiesto-evo')}>
              VER CÓMO FUNCIONA
            </EvoSecondaryInspectButton>
          </div>
        </div>

        {/* Columna Derecha: Objeto 3D interactivo EVO Core (Centrado y contenido) */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[300px] sm:min-h-[380px] lg:min-h-[440px]">
          <EvoHeroCore3D
            userStateLabel="SISTEMA ACTIVO"
            userStateColor="text-amber-400 border-amber-400/20 bg-amber-400/5"
            onCoreClick={() => scrollToSection('manifiesto-evo')}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MANIFIESTO EVO — TEXTO BREVE, ALTO IMPACTO, ENVOLVENTE EN MÓVIL         */}
      {/* ========================================================================= */}
      <section
        id="manifiesto-evo"
        className="py-6 sm:py-10 px-4 sm:px-8 lg:px-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-zinc-950 via-[#0a0d14] to-zinc-950 border border-amber-400/25 text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        
        <span className="text-[10px] font-mono-tech tracking-[0.25em] text-amber-400 uppercase font-black block">
          MANIFIESTO EVO
        </span>

        <p className="text-zinc-400 text-xs sm:text-sm font-sans-editorial max-w-xl mx-auto">
          La mayoría aprende tecnología memorizando conceptos.
        </p>

        <div className="py-1">
          <span className="text-lg sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight block">
            EVO propone otra cosa:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1.5 pt-2.5 text-xs sm:text-sm font-mono-tech font-bold text-amber-300">
            <span>OBSERVAR</span>
            <span className="text-zinc-600 select-none">•</span>
            <span>MEDIR</span>
            <span className="text-zinc-600 select-none">•</span>
            <span>EXPERIMENTAR</span>
            <span className="text-zinc-600 select-none">•</span>
            <span>COMPARAR</span>
            <span className="text-zinc-600 select-none">•</span>
            <span>COMPROBAR</span>
            <span className="text-zinc-600 select-none">•</span>
            <span>CONCLUIR</span>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-amber-400/[0.04] border border-amber-400/20 max-w-lg mx-auto">
          <p className="text-xs sm:text-sm text-amber-200 font-sans-editorial font-medium leading-relaxed">
            No queremos que repitas respuestas. Queremos que entiendas por qué ocurren.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. QUÉ ES EVO LABS (4 PILARES) — CARDS COMPACTAS EN RESPONSIVE            */}
      {/* ========================================================================= */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono-tech tracking-widest text-cyan-400 uppercase font-bold block">
            LOS 4 PILARES DEL MÉTODO
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            QUÉ ES EVO LABS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial">
            Un ecosistema donde la teoría rigurosa se comprueba con instrumental y simulación física.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
          {/* Pilar 1: APRENDER */}
          <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-amber-400/40 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase">1. APRENDER</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Dominá los principios físicos del silicio y la lógica interna de los sistemas operativos sin dogmas.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateTomos}
              className="pt-1 text-xs font-mono-tech text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer text-left"
            >
              <span>VER TOMOS →</span>
            </button>
          </div>

          {/* Pilar 2: PRACTICAR (Copy preciso y honesto) */}
          <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-cyan-400/40 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase">2. PRACTICAR</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Intervení bancos interactivos de hardware, arranque y servicios para observar, comparar y comprobar resultados.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigatePracticar}
              className="pt-1 text-xs font-mono-tech text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer text-left"
            >
              <span>IR A PRACTICAR →</span>
            </button>
          </div>

          {/* Pilar 3: ANALIZAR (Copy honesto y clasificado) */}
          <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-purple-400/40 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase">3. ANALIZAR</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Investigá tu propia máquina con diagnósticos guiados y modelos de análisis clasificados por fuente (REAL, CALCULATED, ESTIMATED, SIMULATED).
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateAnalizar}
              className="pt-1 text-xs font-mono-tech text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 cursor-pointer text-left"
            >
              <span>ANALIZAR MI PC →</span>
            </button>
          </div>

          {/* Pilar 4: COMPROBAR (Copy objetivo y riguroso) */}
          <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 hover:border-emerald-400/40 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase">4. COMPROBAR</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Validá hipótesis comparando mediciones, resultados y evidencias antes de sacar una conclusión.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateMiEvo}
              className="pt-1 text-xs font-mono-tech text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer text-left"
            >
              <span>VER EVIDENCIAS →</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. QUÉ HACE DIFERENTE A EVO — BLOQUE DIFERENCIADOR                          */}
      {/* ========================================================================= */}
      <section className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0d1017] via-[#10141e] to-[#0d1017] border border-zinc-800 space-y-5 sm:space-y-6 relative overflow-hidden">
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-black block">
            DIFERENCIADOR FUNDAMENTAL
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            NO SÓLO LEÉS SOBRE UN CUELLO DE BOTELLA.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 font-mono-tech text-center">
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <span className="text-amber-400 text-xs font-bold block">1. LO SIMULÁS</span>
            <span className="text-[11px] text-zinc-400 font-sans-editorial">Cambiás hardware</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <span className="text-cyan-400 text-xs font-bold block">2. LO MEDÍS</span>
            <span className="text-[11px] text-zinc-400 font-sans-editorial">Variables calculadas</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <span className="text-purple-400 text-xs font-bold block">3. CAMBIÁS CONDICIONES</span>
            <span className="text-[11px] text-zinc-400 font-sans-editorial">Cargas y voltajes</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
            <span className="text-emerald-400 text-xs font-bold block">4. COMPARÁS</span>
            <span className="text-[11px] text-zinc-400 font-sans-editorial">Antes vs Después</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-rose-400 text-xs font-bold block">5. COMPROBÁS LA CAUSA</span>
            <span className="text-[11px] text-zinc-400 font-sans-editorial">Sin mitos</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-zinc-800/80">
          <p className="text-xs text-zinc-400 font-sans-editorial max-w-2xl leading-relaxed">
            Frente a cursos que enseñan a memorizar pasos o aplicar scripts destructivos de internet, EVO LABS te proporciona herramientas de taller, simuladores de arquitectura y expedientes periciales.
          </p>
          <button
            type="button"
            onClick={onNavigatePracticar}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-700 font-mono-tech text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            PROBAR EN EL BANCO →
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SISTEMA EVO (6 FASES) — COMPACTO EN RESPONSIVE (2 COLS EN MOBILE)       */}
      {/* ========================================================================= */}
      <section className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-black block">
            TRAYECTORIA DE DOMINIO TÉCNICO
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tight">
            EL SISTEMA EVO
          </h2>
        </div>

        {/* 2 columnas compactas en mobile, 6 en desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 font-mono-tech text-center">
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <span className="text-[8.5px] text-zinc-500 font-mono block">FASE 01</span>
            <strong className="text-amber-400 text-[11px] sm:text-xs block">ENTENDER</strong>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial block">Fundamentos de silicio</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <span className="text-[8.5px] text-zinc-500 font-mono block">FASE 02</span>
            <strong className="text-amber-300 text-[11px] sm:text-xs block">PROFUNDIZAR</strong>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial block">Esquemas y buses</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <span className="text-[8.5px] text-zinc-500 font-mono block">FASE 03</span>
            <strong className="text-cyan-400 text-[11px] sm:text-xs block">HACER</strong>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial block">Bancos interactivos</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <span className="text-[8.5px] text-zinc-500 font-mono block">FASE 04</span>
            <strong className="text-emerald-400 text-[11px] sm:text-xs block">COMPROBAR</strong>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial block">Medir variables</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <span className="text-[8.5px] text-zinc-500 font-mono block">FASE 05</span>
            <strong className="text-purple-400 text-[11px] sm:text-xs block">CONECTAR</strong>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial block">Hardware + Kernel</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
            <span className="text-[8.5px] text-zinc-500 font-mono block">FASE 06</span>
            <strong className="text-rose-400 text-[11px] sm:text-xs block">DOMINAR</strong>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial block">Dictamen pericial</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EVO METHOD (9 PASOS) — GRID 3x3 COMPACTO EN MOBILE (SIN SCROLL ETERNO)  */}
      {/* ========================================================================= */}
      <section className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-[10px] font-mono-tech tracking-widest text-cyan-400 uppercase font-black block">
            PROTOCOLO METROLÓGICO
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tight">
            EVO METHOD // 9 PASOS PERICIALES
          </h2>
          <p className="text-xs text-zinc-400 font-sans-editorial">
            La secuencia de investigación que separa la deducción técnica del ensayo y error.
          </p>
        </div>

        {/* Grid 3x3 en mobile / 9 cols en desktop para evitar longitud vertical excesiva */}
        <div className="grid grid-cols-3 lg:grid-cols-9 gap-1.5 sm:gap-2 font-mono-tech text-center text-[10px]">
          {[
            { step: '01', verb: 'OBSERVAR', desc: 'Síntoma y entorno' },
            { step: '02', verb: 'ENTENDER', desc: 'Ruta física y señal' },
            { step: '03', verb: 'HIPOTETIZAR', desc: 'Causas posibles' },
            { step: '04', verb: 'INTERVENIR', desc: 'Aislar variable' },
            { step: '05', verb: 'MEDIR', desc: 'Registro en ns/°C/V' },
            { step: '06', verb: 'COMPARAR', desc: 'Antes vs Después' },
            { step: '07', verb: 'COMPROBAR', desc: 'Validar hipótesis' },
            { step: '08', verb: 'DOCUMENTAR', desc: 'Expediente técnico' },
            { step: '09', verb: 'TRANSFERIR', desc: 'Nuevos casos' },
          ].map((item, idx) => (
            <div key={idx} className="p-2 sm:p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-0.5 hover:border-amber-400/40 transition-colors">
              <span className="text-zinc-500 font-mono text-[8px] sm:text-[8.5px] block">{item.step}</span>
              <strong className="text-amber-400 block text-[10px] sm:text-[11px] leading-tight">{item.verb}</strong>
              <span className="text-zinc-400 font-sans-editorial text-[8.5px] sm:text-[9px] block leading-tight truncate sm:whitespace-normal">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. NIVELES EDUCATIVOS REALES (MÁXIMO 3 LÍNEAS POR NIVEL)                  */}
      {/* ========================================================================= */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-black block">
              ESTRUCTURA PEDAGÓGICA
            </span>
            <h2 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tight">
              NIVELES DE FORMACIÓN
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigateTomos}
            className="text-xs font-mono-tech text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider cursor-pointer text-left sm:text-right"
          >
            VER PLAN COMPLETO →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {realLevels.map((lvl) => (
            <div key={lvl.id} className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-all space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-0.5 rounded text-[9px] font-mono-tech font-bold uppercase border"
                    style={{
                      color: lvl.accentColor,
                      backgroundColor: `${lvl.accentColor}12`,
                      borderColor: `${lvl.accentColor}35`,
                    }}
                  >
                    NIVEL {lvl.levelNumber}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono-tech">{lvl.tomos.length} Tomo(s)</span>
                </div>
                <h3 className="font-display font-bold text-sm text-white">{lvl.title}</h3>
                <p className="text-xs text-zinc-400 font-sans-editorial line-clamp-2 leading-relaxed">
                  {lvl.objective}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono-tech">
                <span className="text-zinc-500 text-[10px]">Aprende: {lvl.tomos.join(', ')}</span>
                <button
                  type="button"
                  onClick={onNavigateTomos}
                  className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                >
                  EXPLORAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. MUESTRA DE TOMOS (MÁXIMO 3 DESTACADOS)                                 */}
      {/* ========================================================================= */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-black block">
              COLECCIÓN EDITORIAL DE SILICIO
            </span>
            <h2 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tight">
              MUESTRA DE TOMOS DESTACADOS
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigateTomos}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.25)] self-start sm:self-auto"
          >
            <span>VER TOMOS →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {featuredTomos.map((tomo) => (
            <div
              key={tomo.id}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-3.5 group shadow-xl"
            >
              <div className="space-y-2.5">
                {/* Mini Portada Visual con Portada Canónica */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-zinc-800 group-hover:border-amber-400/40 transition-colors">
                  <img
                    src={tomo.coverImage}
                    alt={tomo.title}
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono-tech font-bold text-amber-400 border border-amber-400/30">
                      TOMO {tomo.number}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5">
                    <span className="text-[10px] text-zinc-400 font-mono-tech block">
                      {tomo.pagesCount} PÁGINAS A4 • LAB ASOCIADO
                    </span>
                  </div>
                </div>

                {/* Nombre exacto canónico */}
                <div className="space-y-1">
                  <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                    TOMO {tomo.number} // {tomo.title}
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans-editorial line-clamp-2 leading-relaxed">
                    {tomo.shortExplanation}
                  </p>
                </div>
              </div>

              {/* Botón hacia el catálogo general */}
              <button
                type="button"
                onClick={onNavigateTomos}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-800 hover:border-amber-400/40 font-mono-tech text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>VER DETALLE DEL TOMO →</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. MUESTRA DE LABORATORIOS (3 EXPERIENCIAS REALES)                        */}
      {/* ========================================================================= */}
      <section id="muestras-labs" className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech tracking-widest text-cyan-400 uppercase font-black block">
              BANCOS INTERACTIVOS REALES
            </span>
            <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
              NO SÓLO LO LEÉS. LO PROBÁS.
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigatePracticar}
            className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.25)] self-start sm:self-auto"
          >
            <span>EXPLORAR LABORATORIOS →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Lab 1: Hot-Swap / Hardware (Tomo 01) */}
          <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-3.5 shadow-xl">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[9px] font-mono-tech font-bold uppercase">
                  TOMO 01 • HARDWARE & SILICIO
                </span>
                <span className="text-[10px] text-emerald-400 font-mono-tech font-bold">ACTIVO</span>
              </div>

              <h3 className="font-display font-black text-base sm:text-lg text-white uppercase">
                HOT-SWAP // BANCO DE SILICIO
              </h3>

              <div className="space-y-2 text-xs font-sans-editorial text-zinc-300">
                <p>
                  <strong className="text-white font-mono-tech block text-[11px]">¿Qué problema resuelve?</strong>
                  Calculá si tu procesador o tu memoria están frenando tu rendimiento sin gastar en piezas a ciegas.
                </p>
                <p>
                  <strong className="text-white font-mono-tech block text-[11px]">¿Qué vas a hacer?</strong>
                  Intercambiá CPUs, GPUs y módulos RAM variando frecuencias y latencias CAS simuladas.
                </p>
                <p>
                  <strong className="text-white font-mono-tech block text-[11px]">¿Qué descubrís?</strong>
                  La fórmula física de latencia en nanosegundos (ns) y el balance real de componentes.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigateHotSwapLab) onNavigateHotSwapLab('hardware');
                else onNavigatePracticar();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-200 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
            >
              ABRIR HOT-SWAP LAB →
            </button>
          </div>

          {/* Lab 2: Windows Matrix (Tomo 02) */}
          <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-3.5 shadow-xl">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 text-[9px] font-mono-tech font-bold uppercase">
                  TOMO 02 • KERNEL NT
                </span>
                <span className="text-[10px] text-emerald-400 font-mono-tech font-bold">ACTIVO</span>
              </div>

              <h3 className="font-display font-black text-base sm:text-lg text-white uppercase">
                WINDOWS MATRIX // KERNEL Y SERVICIOS
              </h3>

              <div className="space-y-2 text-xs font-sans-editorial text-zinc-300">
                <p>
                  <strong className="text-white font-mono-tech block text-[11px]">¿Qué problema resuelve?</strong>
                  Aislá qué servicio o proceso oculto congela Windows o genera micro-stuttering en segundo plano.
                </p>
                <p>
                  <strong className="text-white font-mono-tech block text-[11px]">¿Qué vas a hacer?</strong>
                  Inspeccioná hilos svchost, latencias DPC en drivers y dependencias críticas del sistema.
                </p>
                <p>
                  <strong className="text-white font-mono-tech block text-[11px]">¿Qué descubrís?</strong>
                  Cómo depurar Windows con rigor técnico forense sin romper servicios con scripts milagrosos.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigateWindowsMatrixLab) onNavigateWindowsMatrixLab();
                else onNavigatePracticar();
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-400/15 hover:bg-cyan-400/25 border border-cyan-400/40 text-cyan-200 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
            >
              ABRIR WINDOWS MATRIX →
            </button>
          </div>

          {/* Lab 3: Boot Lab (Tomo 08) */}
          <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-emerald-400/50 transition-all flex flex-col justify-between space-y-3.5 shadow-xl">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 text-[9px] font-mono-tech font-bold uppercase">
                  TOMO 08 • SECUENCIA DE BOOT
                </span>
                <span className="text-[10px] text-emerald-400 font-mono-tech font-bold">ACTIVO</span>
              </div>

              <h3 className="font-display font-black text-base sm:text-lg text-white uppercase">
                BOOT LAB // SECUENCIA DE ARRANQUE
              </h3>

              <div className="space-y-2 text-xs font-sans-editorial text-zinc-300">
                <p>
                  <strong className="text-white font-mono-tech block text-[11px]">¿Qué problema resuelve?</strong>
                  Descubrí en qué segundo exacto muere una máquina que no da video o tira pantalla azul al encender.
                </p>
                <p>
                  <strong className="text-white font-mono-tech block text-[11px]">¿Qué vas a hacer?</strong>
                  Provocá fallas en cada una de las 35 etapas desde la señal de Power Good hasta el escritorio.
                </p>
                <p>
                  <strong className="text-white font-mono-tech block text-[11px]">¿Qué descubrís?</strong>
                  Aislar si la falla es de fuente, POST, memoria, partición EFI o controlador de arranque.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigateBootLab) onNavigateBootLab();
                else onNavigatePracticar();
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-400/15 hover:bg-emerald-400/25 border border-emerald-400/40 text-emerald-200 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
            >
              ABRIR BOOT LAB →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. MUESTRA ANALIZAR MI PC                                                */}
      {/* ========================================================================= */}
      <section className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#120e1e] via-[#161226] to-[#0e0a19] border border-purple-500/30 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono-tech tracking-widest text-purple-400 uppercase font-black block">
            CAPACIDAD EXCLUSIVA EVO LABS
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            TU PC TAMBIÉN PUEDE SER EL LABORATORIO.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial max-w-2xl leading-relaxed">
            Acá no estudiás una PC genérica. Investigás la tuya con el pasaporte técnico de silicio, evaluás cuellos de botella reales y registrás evidencias metrológicas.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono-tech text-xs">
          <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-purple-500/20 space-y-1">
            <span className="text-purple-300 font-bold block text-[11px] sm:text-xs">1. SILICIO REAL</span>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial">Lectura WMI y buses</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-purple-500/20 space-y-1">
            <span className="text-purple-300 font-bold block text-[11px] sm:text-xs">2. CUELLOS DE BOTELLA</span>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial">Balance CPU/GPU/RAM</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-purple-500/20 space-y-1">
            <span className="text-purple-300 font-bold block text-[11px] sm:text-xs">3. FLUIDEZ & FRAMETIME</span>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial">Percentiles 1% low</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-purple-500/20 space-y-1">
            <span className="text-purple-300 font-bold block text-[11px] sm:text-xs">4. EVIDENCIA LOCAL</span>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans-editorial">Pasaporte Técnico EVO</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <span className="text-[11px] sm:text-xs text-purple-300/80 font-mono-tech">
            Clasificación metrológica honesta: REAL • CALCULATED • ESTIMATED • SIMULATED
          </span>
          <button
            type="button"
            onClick={onNavigateAnalizar}
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.35)] shrink-0"
          >
            DESCUBRIR ANALIZAR MI PC →
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. MUESTRA DE HERRAMIENTAS                                               */}
      {/* ========================================================================= */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-black block">
              INSTRUMENTAL DE BANCO
            </span>
            <h2 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tight">
              HERRAMIENTAS POR PROBLEMA RESUELTO
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigateHerramientas}
            className="text-xs font-mono-tech text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider cursor-pointer text-left sm:text-right"
          >
            VER TODAS LAS HERRAMIENTAS →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="text-[9px] font-mono-tech text-amber-400 font-bold uppercase">¿ARREGLAR O DESCARTAR?</span>
            <h3 className="font-display font-bold text-sm text-white">Consola de Diagnóstico</h3>
            <p className="text-xs text-zinc-400 font-sans-editorial">Aislamiento de fallas con método deductivo paso a paso.</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="text-[9px] font-mono-tech text-cyan-400 font-bold uppercase">¿FLUIDEZ ENGAÑOSA?</span>
            <h3 className="font-display font-bold text-sm text-white">Calculador de Frametime</h3>
            <p className="text-xs text-zinc-400 font-sans-editorial">Medición de latencias y micro-stuttering en cuadros por segundo.</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="text-[9px] font-mono-tech text-emerald-400 font-bold uppercase">¿CORTOCIRCUITO O FUENTE?</span>
            <h3 className="font-display font-bold text-sm text-white">Simulador de Tensión ATX</h3>
            <p className="text-xs text-zinc-400 font-sans-editorial">Lectura de rieles de 12V, 5V y 3.3V antes de conectar componentes.</p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="text-[9px] font-mono-tech text-purple-400 font-bold uppercase">¿ACREDITAR COMPETENCIAS?</span>
            <h3 className="font-display font-bold text-sm text-white">Expedientes de Taller</h3>
            <p className="text-xs text-zinc-400 font-sans-editorial">Emisión de dictamen pericial con respaldo de evidencia técnica.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. DEMOS GRATUITAS & CTA FINAL DE CIERRE                                 */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-amber-400/30 text-center space-y-6 sm:space-y-8 shadow-2xl relative overflow-hidden">
        <div className="space-y-2.5 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-black block">
            ACCESO ABIERTO DE PRUEBA
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            PROBALO ANTES DE CREERLO.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial leading-relaxed">
            Podés comenzar con el Capítulo 01 completo del Tomo 01, interactuar con el laboratorio Hot-Swap de silicio y auditar el hardware de tu propia máquina sin costo.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
          <button
            type="button"
            onClick={onNavigateTomos}
            className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.35)]"
          >
            EXPLORAR LA COLECCIÓN DE TOMOS →
          </button>
          
          <button
            type="button"
            onClick={() => {
              if (onNavigateHotSwapLab) onNavigateHotSwapLab('hardware');
              else onNavigatePracticar();
            }}
            className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            PROBAR LABORATORIO HOT-SWAP →
          </button>
        </div>

        <div className="pt-4 sm:pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            <span className="text-zinc-300 font-bold uppercase">EVO LABS</span>
            <span>• Metrología Empírica y Diagnóstico de Silicio</span>
          </div>
          <span className="text-zinc-500 text-[10px] sm:text-[11px]">
            TODAS LAS EXPERIENCIAS ESTÁN DISPONIBLES EN MODO DE PRUEBA ABIERTA
          </span>
        </div>
      </section>

    </div>
  );
};
