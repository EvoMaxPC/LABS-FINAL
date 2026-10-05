import React from 'react';
import {
  BookOpen,
  Zap,
  Gauge,
  Monitor,
  FileText,
  Bot,
  Compass,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

export interface EvoHomeExperienceProps {
  onNavigateTomos: () => void;
  onNavigateMagazines: () => void;
  onNavigateLaboratorios: () => void;
  onNavigateHerramientas: () => void;
  onNavigateAnalizar: () => void;
  onNavigateComoUsar: () => void;
  onNavigatePrecios: () => void;
  onNavigateEntrar: () => void;
}

export const EvoHomeExperience: React.FC<EvoHomeExperienceProps> = ({
  onNavigateTomos,
  onNavigateMagazines,
  onNavigateLaboratorios,
  onNavigateHerramientas,
  onNavigateAnalizar,
  onNavigateComoUsar,
  onNavigatePrecios,
  onNavigateEntrar,
}) => {
  return (
    <div className="relative z-10 flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col space-y-16 sm:space-y-24 transition-all duration-300">
      
      {/* ========================================================================= */}
      {/* 01 // OPENING EVO & HERO                                                  */}
      {/* ========================================================================= */}
      <section className="relative min-h-[65vh] sm:min-h-[72vh] flex flex-col items-center justify-center text-center py-8 sm:py-12 overflow-hidden">
        {/* Fondo sutil animado: Silicio, PCB y nodos */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
          <div className="w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-amber-500/[0.035] blur-[120px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] stroke-amber-400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pcb-clean-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" strokeWidth="1" />
                <circle cx="30" cy="30" r="1.5" fill="#f59e0b" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pcb-clean-grid)" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <div>
            <span className="text-[11px] sm:text-xs font-mono-tech font-bold uppercase tracking-[0.3em] text-amber-400/90 block">
              EVO LABS
            </span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tight leading-[0.95]">
              NO LO CREAS.
              <br />
              <span className="text-amber-400">COMPROBALO.</span>
            </h1>
          </div>

          <p className="font-sans-editorial text-base sm:text-xl text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Aprendé tecnología investigando, experimentando, midiendo y comprobando resultados en hardware y software real.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <button
              type="button"
              onClick={onNavigateTomos}
              className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono-tech text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.3)]"
            >
              EXPLORAR EVO →
            </button>
            <button
              type="button"
              onClick={onNavigateComoUsar}
              className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono-tech text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              CÓMO FUNCIONA →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 // QUÉ ES EVO LABS                                                     */}
      {/* ========================================================================= */}
      <section className="max-w-3xl mx-auto w-full text-center space-y-4 py-6 sm:py-10">
        <span className="text-[10px] font-mono-tech tracking-[0.3em] text-cyan-400 uppercase font-black block">
          PROPÓSITO FORMATIVO
        </span>
        <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight leading-tight">
          APRENDER TECNOLOGÍA NO DEBERÍA SER MEMORIZAR RESPUESTAS.
        </h2>
        <p className="font-sans-editorial text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          EVO LABS combina aprendizaje estructurado, experimentación en bancos de prueba, diagnóstico pericial, herramientas metrológicas y generación de evidencia para entender cómo funcionan realmente los sistemas.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 03 // MANIFIESTO                                                          */}
      {/* ========================================================================= */}
      <section className="py-8 sm:py-12 px-6 sm:px-10 rounded-2xl bg-gradient-to-b from-zinc-950 via-[#0d1017] to-zinc-950 border border-zinc-800/80 text-center space-y-5 max-w-3xl mx-auto shadow-xl">
        <div className="space-y-2">
          <span className="text-[10px] font-mono-tech tracking-[0.3em] text-amber-400 uppercase font-black block">
            MANIFIESTO EVO
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tight leading-snug">
            NO QUEREMOS QUE MEMORICES RESPUESTAS.
            <br />
            <span className="text-amber-300">QUEREMOS QUE ENTIENDAS POR QUÉ OCURREN.</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono-tech text-xs sm:text-sm font-bold text-zinc-300 pt-2">
          <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300">OBSERVAR</span>
          <span className="text-zinc-600">•</span>
          <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-300">MEDIR</span>
          <span className="text-zinc-600">•</span>
          <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-purple-300">EXPERIMENTAR</span>
          <span className="text-zinc-600">•</span>
          <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-300">COMPARAR</span>
          <span className="text-zinc-600">•</span>
          <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300">COMPROBAR</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 // QUÉ VAS A ENCONTRAR (ACCESOS CONCEPTUALES LIMPIOS)                   */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[10px] font-mono-tech tracking-widest text-cyan-400 uppercase font-bold block">
            ARQUITECTURA DE CONTENIDOS
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            QUÉ VAS A ENCONTRAR
          </h2>
          <p className="text-xs text-zinc-400 font-sans-editorial">
            Un ecosistema integral organizado por áreas de especialización.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. TOMOS */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white uppercase">TOMOS</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Colección canónica de 10 tomos con aprendizaje estructurado, esquemáticos y casos técnicos.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateTomos}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-amber-400 hover:text-black text-amber-300 font-mono-tech text-xs font-bold transition-all text-center cursor-pointer"
            >
              VER 10 TOMOS →
            </button>
          </div>

          {/* 2. MAGAZINES */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white uppercase">MAGAZINES</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Publicaciones periciales interactivas con dossiers de silicio, kernel y guías de banco.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateMagazines}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-cyan-400 hover:text-black text-cyan-300 font-mono-tech text-xs font-bold transition-all text-center cursor-pointer"
            >
              VER MAGAZINES →
            </button>
          </div>

          {/* 3. LABORATORIOS */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white uppercase">LABORATORIOS</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Bancos interactivos de hardware, análisis de latencias en nanosegundos, Matrix NT y secuencia de arranque.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateLaboratorios}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-cyan-400 hover:text-black text-cyan-300 font-mono-tech text-xs font-bold transition-all text-center cursor-pointer"
            >
              CATÁLOGO DE LABS →
            </button>
          </div>

          {/* 4. HERRAMIENTAS */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-emerald-400/50 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white uppercase">HERRAMIENTAS</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Instrumental especializado para medir, diagnosticar fallas de hardware y generar informes periciales.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateHerramientas}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-emerald-400 hover:text-black text-emerald-300 font-mono-tech text-xs font-bold transition-all text-center cursor-pointer"
            >
              VER HERRAMIENTAS →
            </button>
          </div>

          {/* 5. ANALIZAR MI PC */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-purple-400/50 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white uppercase">ANALIZAR MI PC</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Auditoría técnica local de tu máquina con categorización estricta SYSTEM_REPORTED vs UNKNOWN.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateAnalizar}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-purple-500 hover:text-white text-purple-300 font-mono-tech text-xs font-bold transition-all text-center cursor-pointer"
            >
              ANALIZAR MI PC →
            </button>
          </div>

          {/* 6. TUTOR EVO */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white uppercase">TUTOR EVO</h3>
              <p className="text-xs text-zinc-400 font-sans-editorial leading-relaxed">
                Asistencia contextual en tiempo real para interpretar esquemáticos, mediciones y guiar tu progreso.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateComoUsar}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-amber-400 hover:text-black text-amber-300 font-mono-tech text-xs font-bold transition-all text-center cursor-pointer"
            >
              CÓMO FUNCIONA →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 // POR QUÉ EVO ES DISTINTO                                             */}
      {/* ========================================================================= */}
      <section className="py-8 sm:py-12 px-6 sm:px-10 rounded-2xl bg-gradient-to-r from-[#090d16] via-[#0e121d] to-[#090d16] border border-zinc-800/80 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-black block">
            DIFERENCIAL TÉCNICO
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            POR QUÉ EVO ES DISTINTO
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-tech text-xs">
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 space-y-2">
            <span className="text-amber-400 font-black text-sm block">01</span>
            <strong className="text-white text-xs block uppercase">NO SÓLO LEÉS.</strong>
            <p className="text-zinc-400 font-sans-editorial text-xs">LO PROBÁS en bancos de simulación e instrumental interactivo.</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 space-y-2">
            <span className="text-cyan-400 font-black text-sm block">02</span>
            <strong className="text-white text-xs block uppercase">NO SÓLO MIRÁS DATOS.</strong>
            <p className="text-zinc-400 font-sans-editorial text-xs">LOS INTERPRETÁS con telemetría pericial y modelos de referencia.</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 space-y-2">
            <span className="text-purple-400 font-black text-sm block">03</span>
            <strong className="text-white text-xs block uppercase">NO SÓLO CAMBIÁS COSAS.</strong>
            <p className="text-zinc-400 font-sans-editorial text-xs">COMPARÁS RESULTADOS mediante pruebas controladas A/B.</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 space-y-2">
            <span className="text-emerald-400 font-black text-sm block">04</span>
            <strong className="text-white text-xs block uppercase">NO SÓLO COMPLETÁS LECCIONES.</strong>
            <p className="text-zinc-400 font-sans-editorial text-xs">GENERÁS EVIDENCIA metrológica para tu expediente personal.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 // SISTEMA EVO (6 FASES METÓDICAS)                                     */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono-tech tracking-widest text-cyan-400 uppercase font-bold block">
            CADENA PEDAGÓGICA
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            EL SISTEMA EVO
          </h2>
          <p className="text-xs text-zinc-400 font-sans-editorial">
            6 fases continuas para transformar la intuición en peritaje técnico comprobable.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono-tech text-xs text-center">
          {[
            { step: '01', name: 'ENTENDER', desc: 'Buses y arquitectura', color: 'text-amber-400', border: 'border-amber-400/30' },
            { step: '02', name: 'PROFUNDIZAR', desc: 'Esquemáticos y física', color: 'text-cyan-400', border: 'border-cyan-400/30' },
            { step: '03', name: 'HACER', desc: 'Intervención en banco', color: 'text-emerald-400', border: 'border-emerald-400/30' },
            { step: '04', name: 'COMPROBAR', desc: 'Medición metrológica', color: 'text-purple-400', border: 'border-purple-400/30' },
            { step: '05', name: 'CONECTAR', desc: 'Diagnóstico cruzado', color: 'text-pink-400', border: 'border-pink-400/30' },
            { step: '06', name: 'DOMINAR', desc: 'Resolución pericial', color: 'text-blue-400', border: 'border-blue-400/30' },
          ].map((phase, idx) => (
            <div key={idx} className={`p-4 rounded-xl bg-zinc-950 border ${phase.border} space-y-1.5`}>
              <span className={`text-xs font-black ${phase.color}`}>{phase.step}</span>
              <strong className="text-white text-xs block">{phase.name}</strong>
              <p className="text-[11px] text-zinc-400 font-sans-editorial">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 // CÓMO EMPEZAR                                                        */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-6 max-w-3xl mx-auto">
        <div className="space-y-1">
          <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-black block">
            RUTA DE INICIO
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
            CÓMO EMPEZAR EN EVO LABS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-mono-tech text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <span className="text-amber-400 font-bold text-xs">PASO 1</span>
            <h4 className="text-white font-bold">Elegí tu Tomo</h4>
            <p className="text-zinc-400 font-sans-editorial text-xs">Explorá el catálogo y seleccioná el área tecnológica que querés dominar.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <span className="text-cyan-400 font-bold text-xs">PASO 2</span>
            <h4 className="text-white font-bold">Experimentá en Labs</h4>
            <p className="text-zinc-400 font-sans-editorial text-xs">Probá hipótesis en bancos interactivos antes de sacar conclusiones.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <span className="text-emerald-400 font-bold text-xs">PASO 3</span>
            <h4 className="text-white font-bold">Acreditá Evidencia</h4>
            <p className="text-zinc-400 font-sans-editorial text-xs">Rendí exámenes de acreditación y registrá tu avance en tu pasaporte.</p>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onNavigateComoUsar}
            className="text-xs font-mono-tech font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer transition-colors"
          >
            VER GUÍA COMPLETA DE USO Y METODOLOGÍA →
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08 // CTA FINAL                                                           */}
      {/* ========================================================================= */}
      <section className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-zinc-950 to-black border border-amber-400/40 text-center space-y-5 shadow-2xl">
        <div className="space-y-1.5 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black text-amber-400 uppercase tracking-tight">
            DEJÁ DE ADIVINAR.
            <br />
            <span className="text-white">EMPEZÁ A COMPROBAR.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial pt-1">
            Ingresá a la plataforma donde cada concepto de hardware y software se demuestra con mediciones reales.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onNavigateTomos}
            className="px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono-tech text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            EXPLORAR EVO →
          </button>
          
          <button
            type="button"
            onClick={onNavigateComoUsar}
            className="px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            VER CÓMO FUNCIONA
          </button>
        </div>
      </section>

      {/* FOOTER SOBRIO */}
      <footer className="border-t border-zinc-900 pt-8 pb-4 text-center font-mono-tech text-xs text-zinc-500 space-y-2">
        <p className="text-zinc-400">EVO LABS // NO LO CREAS. COMPROBALO.</p>
        <p className="text-[11px]">© 2026 EVO LABS. SISTEMA PERICIAL DE INGENIERÍA Y APRENDIZAJE.</p>
      </footer>

    </div>
  );
};
