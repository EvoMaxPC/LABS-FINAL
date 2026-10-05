import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  BarChart3,
  Battery,
  Gauge
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

  const sceneDurations = [2800, 3000, 3200, 3000, 15000]; // ms per scene (approx 12-15s total auto-progression)

  // Auto progression
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentScene < 5) {
        setCurrentScene((prev) => prev + 1);
      }
    }, sceneDurations[currentScene - 1]);

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying]);

  const handleEnterCampusAction = () => {
    if (rememberPreference) {
      try {
        localStorage.setItem('evo_academia_intro_dismissed', 'true');
      } catch {}
    }
    if (onEnterCampus) onEnterCampus();
    else if (onComplete) onComplete();
  };

  const handleSkipAndRememberAction = () => {
    try {
      localStorage.setItem('evo_academia_intro_dismissed', 'true');
    } catch {}
    if (onSkipAndRemember) onSkipAndRemember();
    else if (onSkip) onSkip();
    else if (onEnterCampus) onEnterCampus();
    else if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06080d] text-[#f4f4f5] flex flex-col justify-between overflow-x-hidden overflow-y-auto select-none font-sans">
      
      {/* Silicon grid patterns in background */}
      <div className="fixed inset-0 bg-tech-grid opacity-[0.03] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(251,191,36,0.06),transparent_50%)] pointer-events-none" />

      {/* Top Header Navigation controls */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-zinc-900/90 bg-[#06080d]/80 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]" />
          <span className="font-display font-black text-xs sm:text-sm tracking-wider text-white uppercase flex items-center gap-1.5">
            EVO LABS <span className="text-zinc-500 font-normal">// INTRO</span>
          </span>
        </div>

        {/* Stepper Dots */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentScene(idx);
                setIsPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                currentScene === idx 
                  ? 'bg-amber-400 w-5 shadow-[0_0_8px_#fbbf24]' 
                  : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
              aria-label={`Escena ${idx}`}
            />
          ))}
        </div>

        {/* Skip controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pausar reproducción automática' : 'Reproducir automáticamente'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-zinc-500" />}
          </button>

          <button
            onClick={handleSkipAndRememberAction}
            className="px-3.5 py-1.5 rounded-lg border border-zinc-800 hover:border-amber-400/50 bg-zinc-900/80 hover:bg-zinc-800 text-[11px] font-mono font-bold text-zinc-400 hover:text-amber-300 transition-all cursor-pointer"
          >
            SALTAR INTRO
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-4 py-8 sm:p-8 lg:p-12 max-w-5xl mx-auto w-full my-auto space-y-6">
        <AnimatePresence mode="wait">
          
          {/* ========================================================
              SCENE 01: BIENVENIDO A EVO LABS
             ======================================================== */}
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center space-y-6 max-w-2xl mx-auto py-8"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-black tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 uppercase inline-block">
                  SISTEMA DE APRENDIZAJE TECNOLÓGICO
                </span>
                
                <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase leading-none">
                  BIENVENIDO A<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">EVO LABS</span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
                  Una plataforma para aprender, practicar, medir, diagnosticar y comprobar cómo funciona una PC.
                </p>
              </div>

              {/* LEMA: "NO LO CREAS. COMPROBALO." */}
              <div className="pt-4 border-t border-zinc-900 max-w-xs mx-auto">
                <blockquote className="text-xs font-mono font-black tracking-widest text-zinc-400 uppercase">
                  &gt; NO LO CREAS. COMPROBALO.
                </blockquote>
              </div>

              {/* Quick visual silicon copper trace */}
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-cyan-400 mx-auto rounded-full opacity-60 animate-pulse mt-4" />
            </motion.div>
          )}

          {/* ========================================================
              SCENE 02: ESTO NO ES SÓLO UN CURSO
             ======================================================== */}
          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-8 max-w-3xl mx-auto py-4"
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-black text-cyan-400 tracking-wider uppercase block">
                  MANIFIESTO EVO
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white uppercase">
                  ESTO NO ES SÓLO UN CURSO
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed font-sans">
                  EVO LABS combina aprendizaje, herramientas profesionales, laboratorios interactivos, simulación, diagnóstico y evidencia dentro de un mismo sistema.
                </p>
              </div>

              {/* Visual flow layout: APRENDER + PRACTICAR + MEDIR + DIAGNOSTICAR + COMPROBAR */}
              <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center font-mono text-[9px] sm:text-xs">
                
                {/* APRENDER */}
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mx-auto">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-white">APRENDER</div>
                </div>

                {/* PRACTICAR */}
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-white">PRACTICAR</div>
                </div>

                {/* MEDIR */}
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 mx-auto">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-white">MEDIR</div>
                </div>

                {/* DIAGNOSTICAR */}
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-400/10 border border-violet-400/40 flex items-center justify-center text-violet-400 mx-auto">
                    <Search className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-white">DIAGNOSTICAR</div>
                </div>

                {/* COMPROBAR */}
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-400/10 border border-teal-400/40 flex items-center justify-center text-teal-400 mx-auto">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-white">COMPROBAR</div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================
              SCENE 03: TODO EN UN MISMO SISTEMA
             ======================================================== */}
          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6 max-w-4xl mx-auto py-4 animate-in fade-in"
            >
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono font-black text-amber-400 tracking-wider uppercase block">
                  RECURSOS INTEGRADOS
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white uppercase">
                  TODO EN UN MISMO SISTEMA
                </h2>
              </div>

              {/* Magazines, Tomos, Labs, Herramientas, Tutor, Expedientes */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left font-sans text-xs">
                
                {/* Magazines */}
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-850 space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono font-black text-[11px] text-white">MAGAZINES</span>
                  </div>
                  <p className="text-zinc-400 text-xs">Contenido editorial visual, ameno y rigurosamente técnico.</p>
                </div>

                {/* Tomos */}
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-850 space-y-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono font-black text-[11px] text-white">TOMOS VIRTUALES</span>
                  </div>
                  <p className="text-zinc-400 text-xs">Aprendizaje interactivo y progresivo paso a paso.</p>
                </div>

                {/* Labs */}
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-850 space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono font-black text-[11px] text-white">LABORATORIOS</span>
                  </div>
                  <p className="text-zinc-400 text-xs">Prácticas simuladas, experimentos y análisis sin riesgos.</p>
                </div>

                {/* Herramientas */}
                <div className="p-4 rounded-xl bg-[#090b11] border border-zinc-850 space-y-2">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-amber-400" />
                    <span className="font-mono font-black text-[11px] text-white">HERRAMIENTAS</span>
                  </div>
                  <p className="text-zinc-400 text-xs">Hardware, Windows, rendimiento, diagnóstico y telemetría.</p>
                </div>

                {/* Tutor Evo */}
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-850 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span className="font-mono font-black text-[11px] text-white">TUTOR EVO</span>
                  </div>
                  <p className="text-zinc-400 text-xs">Ayuda contextual y sugerencias periciales durante el recorrido.</p>
                </div>

                {/* Expedientes */}
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-850 space-y-2">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-teal-400" />
                    <span className="font-mono font-black text-[11px] text-white">EXPEDIENTES</span>
                  </div>
                  <p className="text-zinc-400 text-xs">Auditoría, firmas criptográficas y resultados guardados.</p>
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================
              SCENE 04: APRENDÉ HACIENDO
             ======================================================== */}
          {currentScene === 4 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-8 max-w-3xl mx-auto py-4"
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-black text-emerald-400 tracking-wider uppercase block">
                  METODOLOGÍA DIDÁCTICA
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white uppercase">
                  APRENDÉ HACIENDO
                </h2>
              </div>

              {/* ENTENDER ➔ PRACTICAR ➔ MEDIR ➔ DIAGNOSTICAR ➔ COMPROBAR */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 max-w-2xl mx-auto font-mono text-[11px] sm:text-xs">
                
                <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center font-bold text-white shrink-0">
                  ENTENDER
                </div>
                <span className="text-zinc-600 sm:rotate-0 rotate-90">➔</span>

                <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center font-bold text-white shrink-0">
                  PRACTICAR
                </div>
                <span className="text-zinc-600 sm:rotate-0 rotate-90">➔</span>

                <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center font-bold text-white shrink-0">
                  MEDIR
                </div>
                <span className="text-zinc-600 sm:rotate-0 rotate-90">➔</span>

                <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center font-bold text-white shrink-0">
                  DIAGNOSTICAR
                </div>
                <span className="text-zinc-600 sm:rotate-0 rotate-90">➔</span>

                <div className="px-4 py-2 rounded-xl bg-amber-400 text-black text-center font-black shrink-0">
                  COMPROBAR
                </div>

              </div>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto text-center leading-relaxed font-sans">
                Podés empezar desde cero o profundizar hasta un nivel técnico avanzado. EVO LABS te acompaña durante todo el recorrido con herramientas seguras.
              </p>
            </motion.div>
          )}

          {/* ========================================================
              SCENE 05: MUNDO EVO (Cierre Principal / CTA)
             ======================================================== */}
          {currentScene === 5 && (
            <motion.div
              key="scene-5"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6 max-w-4xl mx-auto py-4 text-center flex flex-col items-center"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-black text-amber-400 tracking-wider uppercase block">
                  CENTRO DE OPERACIONES
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
                  MUNDO EVO
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Tu centro de operaciones dentro de EVO LABS.
                </p>
              </div>

              {/* Extremely simple explanation */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-4xl mx-auto text-left font-mono text-[11px] pt-4">
                
                {/* APRENDER */}
                <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-850 space-y-1 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>APRENDER</span>
                  </div>
                  <p className="text-zinc-500 text-[10px]">Tomos, Tutor y recorrido guiado.</p>
                </div>

                {/* PRACTICAR */}
                <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-850 space-y-1 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>PRACTICAR</span>
                  </div>
                  <p className="text-zinc-500 text-[10px]">Laboratorios y simuladores.</p>
                </div>

                {/* ANALIZAR */}
                <div className="p-3.5 rounded-xl bg-[#0a0d15] border border-zinc-850 space-y-1 hover:border-purple-500/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                    <Search className="w-3.5 h-3.5" />
                    <span>ANALIZAR MI PC</span>
                  </div>
                  <p className="text-zinc-500 text-[10px]">Pruebas y diagnóstico.</p>
                </div>

                {/* HERRAMIENTAS */}
                <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-850 space-y-1 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>HERRAMIENTAS</span>
                  </div>
                  <p className="text-zinc-500 text-[10px]">Utilidades independientes.</p>
                </div>

                {/* MI EVO */}
                <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-850 space-y-1 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-teal-400 font-bold">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>MI EVO</span>
                  </div>
                  <p className="text-zinc-500 text-[10px]">PCs, expedientes y progreso.</p>
                </div>

              </div>

              {/* MAIN CTA UNIQUE BUTTON */}
              <div className="pt-6 w-full max-w-sm">
                <button
                  type="button"
                  onClick={handleEnterCampusAction}
                  className="w-full py-4 px-8 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-display font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(251,191,36,0.35)] flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>ENTRAR A MUNDO EVO →</span>
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Technical Status Bar */}
      <footer className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 py-3.5 border-t border-zinc-900/90 bg-[#06080d]/90 backdrop-blur-xl text-xs font-mono text-zinc-500 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-bold">EVO LABS SYSTEM</span>
          <span className="text-zinc-700">//</span>
          <span className="text-amber-400/90 font-medium">TELEMETRÍA 100% NATIVA DE LABORATORIO</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSkipAndRememberAction}
            className="text-xs text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Recordar mi elección y no volver a mostrar</span>
          </button>

          {currentScene < 5 ? (
            <button
              onClick={() => setCurrentScene((prev) => prev + 1)}
              className="flex items-center gap-1 text-zinc-300 hover:text-amber-400 font-bold transition-colors cursor-pointer"
            >
              <span>SIGUIENTE</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          ) : (
            <button
              onClick={handleEnterCampusAction}
              className="flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>ENTRAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
