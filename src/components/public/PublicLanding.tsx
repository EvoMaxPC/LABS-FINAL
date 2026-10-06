import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Zap,
  CheckCircle2,
  Activity,
  ChevronRight,
} from 'lucide-react';

// Visual assets reales del proyecto
import hardwareSculpture from '../../assets/images/hardware_sculpture_hero_1789530888503.jpg';

interface PublicLandingProps {
  onExploreClick?: () => void;
  onMethodClick?: () => void;
  onOpenAuthPlaceholder?: (mode: 'login' | 'register') => void;
  onOpenTomo?: (tomoNumber: string) => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  onExploreClick,
  onOpenAuthPlaceholder,
  onOpenTomo,
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#07080c] text-zinc-100 font-sans-editorial selection:bg-amber-400 selection:text-black overflow-x-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-24 sm:space-y-32">
        
        {/* =========================================================================
            01 // HERO PRINCIPAL (EDITORIAL SPLIT // ALINEADO A LA IZQUIERDA)
           ========================================================================= */}
        <section id="inicio" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Columna Izquierda: Información Editorial */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Eyebrow sobrio y técnico */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-mono-tech text-xs tracking-[0.2em] uppercase font-bold text-zinc-400">
                EVO LABS // SISTEMA DE APRENDIZAJE TÉCNICO
              </span>
            </div>

            {/* Título Grande y Contundente */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase leading-[0.95]">
                NO LO CREAS.
                <br />
                <span className="text-amber-400">COMPROBALO.</span>
              </h1>
            </div>

            {/* Bajada Breve Canónica */}
            <p className="font-sans-editorial text-base sm:text-xl text-zinc-300 max-w-xl leading-relaxed">
              Aprendé cómo funciona una PC.
              <br />
              Experimentá. Medí. Diagnosticá con evidencia.
            </p>

            {/* Máximo 2 CTAs Limpios */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono-tech text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => {
                  if (onOpenAuthPlaceholder) onOpenAuthPlaceholder('register');
                  else onExploreClick?.();
                }}
                className="px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center gap-2"
              >
                <span>EXPLORAR EVO</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                type="button"
                onClick={() => onExploreClick?.()}
                className="px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <span>VER TOMOS</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Micro-especificación de rigor */}
            <div className="pt-2 flex items-center gap-4 text-xs font-mono-tech text-zinc-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Normas JEDEC & PCIe</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Metrología en nanosegundos</span>
              </span>
            </div>
          </div>

          {/* Columna Derecha: UNA sola pieza visual fuerte */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800/90 bg-[#0c0e14] shadow-2xl">
              <img
                src={hardwareSculpture}
                alt="EVO Labs Arquitectura de Computadoras"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover object-center filter saturate-110 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent opacity-80" />
              
              {/* Micro-badge técnico sobreimpreso */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-zinc-800/80 flex items-center justify-between font-mono-tech text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-zinc-200 font-bold uppercase text-[11px]">MOTOR PERICIAL</span>
                </div>
                <span className="text-[10px] text-zinc-400 uppercase">TELEMETRÍA VERIFICADA</span>
              </div>
            </div>
          </div>

        </section>

        {/* =========================================================================
            02 // QUÉ ES EVO LABS (DOS COLUMNAS LIMPIAS // 3 CONCEPTOS)
           ========================================================================= */}
        <section className="border-t border-zinc-800/70 pt-16 sm:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Columna Izquierda: Mensaje y Filosofía */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-amber-400 block">
                PROPUESTA TÉCNICA
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight leading-tight">
                EVOLUCIÓN EN SISTEMAS INFORMÁTICOS
              </h2>
              <p className="font-sans-editorial text-zinc-300 text-sm sm:text-base leading-relaxed">
                EVO LABS combina contenido editorial, laboratorios interactivos y herramientas técnicas para aprender comprobando.
              </p>
            </div>

            {/* Columna Derecha: 3 Conceptos Concisos */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Concepto 1: APRENDER */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950/40 border border-zinc-850 hover:border-zinc-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                    APRENDER
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial leading-relaxed">
                    Fundamentos de ingeniería sin relleno comercial: arquitectura de silicio, buses PCIe y sistemas operativos desde la física y la lógica de componentes.
                  </p>
                </div>
              </div>

              {/* Concepto 2: PRACTICAR */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950/40 border border-zinc-850 hover:border-zinc-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                    PRACTICAR
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial leading-relaxed">
                    Bancos interactivos de prueba y simuladores de hardware donde podés aislar fallas de arranque y procesos de kernel sin riesgo de romper equipamiento real.
                  </p>
                </div>
              </div>

              {/* Concepto 3: COMPROBAR */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950/40 border border-zinc-850 hover:border-zinc-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                    COMPROBAR
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial leading-relaxed">
                    Medición metrológica en nanosegundos, telemetría determinística y expedientes técnicos auditables para respaldar cada diagnóstico con evidencia real.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            03 // TRES FORMAS DE USAR EVO (TRES PUERTAS DE ENTRADA // MÁXIMO 3 CARDS)
           ========================================================================= */}
        <section className="space-y-8 text-left">
          
          <div className="space-y-2">
            <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-cyan-400 block">
              TRES PUERTAS DE ENTRADA
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              TRES FORMAS DE USAR EVO LABS
            </h2>
          </div>

          {/* 3 Nodos compactos técnicos unidos por línea fina */}
          <div className="relative py-2 sm:py-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-0 relative">
              
              {/* Nodo 01: APRENDER */}
              <div
                onMouseEnter={() => setHoveredNode(0)}
                onMouseLeave={() => setHoveredNode(null)}
                className="flex-1 p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 transition-all duration-200 ease-out cursor-default select-none text-left hover:border-amber-400/60 hover:bg-zinc-900/90 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] relative z-10"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-mono-tech text-[10px] font-bold tracking-widest text-amber-400">
                    01
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700/60" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-wider">
                  APRENDER
                </h3>
                <p className="font-sans-editorial text-xs text-zinc-400 mt-1 leading-snug">
                  Tomos y contenido técnico.
                </p>
              </div>

              {/* Conector 1: Desktop (Horizontal) */}
              <div className="hidden md:flex items-center w-8 lg:w-16 shrink-0 px-1">
                <div
                  className={`h-[1px] w-full transition-all duration-200 ease-out ${
                    hoveredNode === 0
                      ? 'bg-amber-400/70 shadow-[0_0_8px_rgba(245,158,11,0.35)]'
                      : hoveredNode === 1
                      ? 'bg-cyan-400/70 shadow-[0_0_8px_rgba(6,182,212,0.35)]'
                      : 'bg-zinc-800/80'
                  }`}
                />
              </div>

              {/* Conector 1: Mobile (Vertical) */}
              <div className="md:hidden flex justify-center py-1.5">
                <div
                  className={`w-[1px] h-5 transition-all duration-200 ease-out ${
                    hoveredNode === 0
                      ? 'bg-amber-400/70 shadow-[0_0_8px_rgba(245,158,11,0.35)]'
                      : hoveredNode === 1
                      ? 'bg-cyan-400/70 shadow-[0_0_8px_rgba(6,182,212,0.35)]'
                      : 'bg-zinc-800/80'
                  }`}
                />
              </div>

              {/* Nodo 02: PRACTICAR */}
              <div
                onMouseEnter={() => setHoveredNode(1)}
                onMouseLeave={() => setHoveredNode(null)}
                className="flex-1 p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 transition-all duration-200 ease-out cursor-default select-none text-left hover:border-cyan-400/60 hover:bg-zinc-900/90 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] relative z-10"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-mono-tech text-[10px] font-bold tracking-widest text-cyan-400">
                    02
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700/60" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-wider">
                  PRACTICAR
                </h3>
                <p className="font-sans-editorial text-xs text-zinc-400 mt-1 leading-snug">
                  Laboratorios y simuladores.
                </p>
              </div>

              {/* Conector 2: Desktop (Horizontal) */}
              <div className="hidden md:flex items-center w-8 lg:w-16 shrink-0 px-1">
                <div
                  className={`h-[1px] w-full transition-all duration-200 ease-out ${
                    hoveredNode === 1
                      ? 'bg-cyan-400/70 shadow-[0_0_8px_rgba(6,182,212,0.35)]'
                      : hoveredNode === 2
                      ? 'bg-purple-400/70 shadow-[0_0_8px_rgba(168,85,247,0.35)]'
                      : 'bg-zinc-800/80'
                  }`}
                />
              </div>

              {/* Conector 2: Mobile (Vertical) */}
              <div className="md:hidden flex justify-center py-1.5">
                <div
                  className={`w-[1px] h-5 transition-all duration-200 ease-out ${
                    hoveredNode === 1
                      ? 'bg-cyan-400/70 shadow-[0_0_8px_rgba(6,182,212,0.35)]'
                      : hoveredNode === 2
                      ? 'bg-purple-400/70 shadow-[0_0_8px_rgba(168,85,247,0.35)]'
                      : 'bg-zinc-800/80'
                  }`}
                />
              </div>

              {/* Nodo 03: ANALIZAR */}
              <div
                onMouseEnter={() => setHoveredNode(2)}
                onMouseLeave={() => setHoveredNode(null)}
                className="flex-1 p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 transition-all duration-200 ease-out cursor-default select-none text-left hover:border-purple-400/60 hover:bg-zinc-900/90 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(168,85,247,0.12)] relative z-10"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-mono-tech text-[10px] font-bold tracking-widest text-purple-400">
                    03
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700/60" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-wider">
                  ANALIZAR
                </h3>
                <p className="font-sans-editorial text-xs text-zinc-400 mt-1 leading-snug">
                  Herramientas y diagnóstico.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            04 // MÉTODO EVO (LÍNEA VISUAL CONCISA // NO SECCIÓN GIGANTE)
           ========================================================================= */}
        <section className="space-y-6 text-left border-t border-zinc-800/70 pt-16 sm:pt-20">
          
          <div className="space-y-1">
            <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-cyan-400 block">
              MÉTODO CIENTÍFICO APLICADO
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              EL MÉTODO EVO
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans-editorial max-w-xl">
              El aprendizaje técnico se consolida cuando cada hipótesis se somete a medición física y comprobación empírica.
            </p>
          </div>

          {/* Una sola línea visual de pasos conectados */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 font-mono-tech text-xs">
            
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 block">01</span>
              <span className="font-bold text-white block">OBSERVAR</span>
              <p className="text-[11px] text-zinc-400 font-sans-editorial">Síntoma sin prejuicio.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 block">02</span>
              <span className="font-bold text-cyan-400 block">MEDIR</span>
              <p className="text-[11px] text-zinc-400 font-sans-editorial">Instrumental real.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 block">03</span>
              <span className="font-bold text-amber-400 block">EXPERIMENTAR</span>
              <p className="text-[11px] text-zinc-400 font-sans-editorial">Cambio controlado.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 block">04</span>
              <span className="font-bold text-purple-400 block">COMPARAR</span>
              <p className="text-[11px] text-zinc-400 font-sans-editorial">Contra línea de base.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-zinc-500 block">05</span>
              <span className="font-bold text-emerald-400 block">CONCLUIR</span>
              <p className="text-[11px] text-zinc-400 font-sans-editorial">Evidencia inmutable.</p>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
};
