import React from 'react';

interface EvoMundoWordmarkProps {
  variant?: 'hero' | 'header' | 'compact' | 'card';
  showUniverseBadge?: boolean;
  className?: string;
}

export const EvoMundoWordmark: React.FC<EvoMundoWordmarkProps> = ({
  variant = 'hero',
  showUniverseBadge = true,
  className = '',
}) => {
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[9px] font-mono-tech tracking-[0.3em] text-zinc-400 font-bold uppercase">
            MUNDO
          </span>
          <div className="flex items-center gap-0.5">
            <span className="font-display font-black text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              EV
            </span>
            {/* Custom geometric cut O */}
            <span className="relative inline-block font-display font-black text-lg text-amber-400">
              Ø
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className="flex flex-col items-start leading-none">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-mono-tech tracking-[0.35em] text-amber-400/90 font-black uppercase">
              MUNDO
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <div className="flex items-center tracking-tighter">
            <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-300">
              EV
            </span>
            <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Ø
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Hero variant (Default)
  return (
    <div className={`relative flex flex-col items-start select-none ${className}`}>
      {/* Micro-structure framing & brand level identifier */}
      {showUniverseBadge && (
        <div className="flex items-center gap-2.5 mb-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono-tech text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>UNIVERSO // NIVEL B</span>
          </div>
          <span className="text-[10px] font-mono-tech text-zinc-500 tracking-wider uppercase font-medium">
            CENTRO DE OPERACIONES TÉCNICAS
          </span>
        </div>
      )}

      {/* Main Architectural Wordmark */}
      <div className="relative flex flex-col group">
        {/* Top Segment: MUNDO with precision optical tracking and tech brackets */}
        <div className="flex items-center gap-2 pl-1 mb-1">
          <span className="text-zinc-600 font-mono-tech text-xs select-none">[</span>
          <span className="font-mono-tech text-xs sm:text-sm md:text-base font-black tracking-[0.45em] text-zinc-300 uppercase">
            MUNDO
          </span>
          <span className="text-zinc-600 font-mono-tech text-xs select-none">]</span>
          <div className="h-[1px] flex-1 min-w-[24px] max-w-[60px] bg-gradient-to-r from-amber-400/40 to-transparent" />
        </div>

        {/* Core Dominant Glyph: EVO with custom architectural styling */}
        <div className="relative flex items-baseline">
          {/* Custom Stylized Monogram */}
          <div className="flex items-center tracking-tight leading-none">
            {/* E: Engineered letter with horizontal silicon cut */}
            <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              E
            </span>

            {/* V: Precision angled vertex */}
            <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-zinc-200 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              V
            </span>

            {/* O: Diagonal technical aperture cut with amber glow */}
            <div className="relative inline-flex items-center justify-center">
              <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 tracking-tight drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                Ø
              </span>
              {/* Subtle silicon pulse dot inside the O slash */}
              <span className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fef08a] pointer-events-none opacity-80" />
            </div>

            {/* Trailing technical precision terminal mark */}
            <span className="text-amber-400 font-mono-tech text-2xl sm:text-4xl md:text-5xl font-black ml-1 select-none animate-pulse">
              _
            </span>
          </div>
        </div>

        {/* Precision Sub-Baseline */}
        <div className="flex items-center gap-3 mt-2 pl-1">
          <div className="w-8 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          <span className="font-mono-tech text-[10px] sm:text-[11px] text-zinc-400 font-bold uppercase tracking-widest">
            SISTEMA DE APRENDIZAJE & DIAGNÓSTICO
          </span>
        </div>
      </div>
    </div>
  );
};
