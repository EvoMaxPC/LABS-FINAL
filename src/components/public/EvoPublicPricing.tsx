import React from 'react';
import {
  CreditCard,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface EvoPublicPricingProps {
  onSelectPlan: (planId: string) => void;
  onSelectTomoOption: () => void;
}

export const EvoPublicPricing: React.FC<EvoPublicPricingProps> = ({
  onSelectPlan,
  onSelectTomoOption,
}) => {
  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* HEADER DE PRECIOS */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-800 pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <CreditCard className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-mono-tech tracking-widest text-amber-400 uppercase font-black">
            PLANES Y ACCESO TRANSPARENTE
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
          ¿CÓMO QUERÉS ENTRAR A EVO?
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 font-sans-editorial max-w-2xl">
          Elegí compra permanente por tomo o suscripción completa para acceder a los 10 tomos, laboratorios de silicio y kernel, e instrumental pericial.
        </p>
      </div>

      {/* BLOQUE A: COMPRA PERMANENTE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-mono-tech text-xs font-black flex items-center justify-center">A</span>
          <h2 className="text-lg sm:text-xl font-display font-black text-amber-300 uppercase tracking-tight">
            QUIERO UN CONTENIDO ESPECÍFICO // COMPRA PERMANENTE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-tech text-xs">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-4 text-center">
            <div className="space-y-2">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">TOMO INDIVIDUAL</span>
              <span className="text-xl font-black text-white block">PRECIO A DEFINIR</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 inline-block font-bold">
                COMPRA PERMANENTE
              </span>
              <p className="text-xs text-zinc-400 font-sans-editorial pt-2">
                1 Tomo digital completo a tu elección con sus laboratorios y banco interactivo de por vida.
              </p>
            </div>
            <button
              type="button"
              onClick={onSelectTomoOption}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase transition-all cursor-pointer border border-zinc-800"
            >
              EXPLORAR TOMOS →
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-400/50 flex flex-col justify-between space-y-4 text-center shadow-lg">
            <div className="space-y-2">
              <span className="text-[10px] text-amber-400 font-bold uppercase block">PACK x3 TOMOS</span>
              <span className="text-xl font-black text-white block">PRECIO A DEFINIR</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 inline-block font-bold">
                COMPRA PERMANENTE
              </span>
              <p className="text-xs text-zinc-400 font-sans-editorial pt-2">
                Elegí 3 tomos canónicos para armar tu propia ruta formativa personalizada.
              </p>
            </div>
            <button
              type="button"
              onClick={onSelectTomoOption}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black uppercase transition-all cursor-pointer shadow-md"
            >
              ELEGIR PACK x3 →
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-4 text-center">
            <div className="space-y-2">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">PACK x5 TOMOS</span>
              <span className="text-xl font-black text-white block">PRECIO A DEFINIR</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 inline-block font-bold">
                COMPRA PERMANENTE
              </span>
              <p className="text-xs text-zinc-400 font-sans-editorial pt-2">
                Media colección canónica con acceso de por vida ideal para técnicos y talleres.
              </p>
            </div>
            <button
              type="button"
              onClick={onSelectTomoOption}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase transition-all cursor-pointer border border-zinc-800"
            >
              ELEGIR PACK x5 →
            </button>
          </div>
        </div>
      </div>

      {/* BLOQUE B: SUSCRIPCIÓN EVO COMPLETE */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-400 font-mono-tech text-xs font-black flex items-center justify-center">B</span>
          <h2 className="text-lg sm:text-xl font-display font-black text-cyan-300 uppercase tracking-tight">
            QUIERO TODO EVO // SUSCRIPCIÓN EVO COMPLETE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-tech text-xs">
          {/* 1 Mes */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">1 MES</span>
              <span className="text-2xl font-black text-white block pt-1">USD 9.90</span>
              <p className="text-xs text-zinc-400 font-sans-editorial pt-1">Acceso irrestricto mensual</p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPlan('complete-1m')}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold transition-all cursor-pointer"
            >
              ELEGIR 1 MES
            </button>
          </div>

          {/* 3 Meses */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">3 MESES</span>
              <span className="text-2xl font-black text-white block pt-1">USD 24.90</span>
              <p className="text-xs text-zinc-400 font-sans-editorial pt-1">USD 8.30 / mes equivalente</p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPlan('complete-3m')}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold transition-all cursor-pointer"
            >
              ELEGIR 3 MESES
            </button>
          </div>

          {/* 6 Meses */}
          <div className="p-5 rounded-2xl bg-[#0d121f] border-2 border-amber-400/80 shadow-xl flex flex-col justify-between space-y-3 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-amber-400 text-black text-[9px] font-black uppercase tracking-wider">
              RECOMENDADO
            </span>
            <div className="pt-1">
              <span className="text-[10px] text-amber-300 uppercase font-bold block">6 MESES</span>
              <span className="text-2xl font-black text-white block pt-1">USD 44.90</span>
              <p className="text-xs text-amber-200/70 font-sans-editorial pt-1">USD 7.48 / mes equivalente</p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPlan('complete-6m')}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black uppercase transition-all cursor-pointer shadow-md"
            >
              ELEGIR 6 MESES
            </button>
          </div>

          {/* 12 Meses */}
          <div className="p-5 rounded-2xl bg-zinc-950 border-2 border-cyan-500/60 flex flex-col justify-between space-y-3 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-cyan-400 text-black text-[9px] font-black uppercase tracking-wider">
              MEJOR VALOR TEMPORAL
            </span>
            <div className="pt-1">
              <span className="text-[10px] text-cyan-300 uppercase font-bold block">12 MESES</span>
              <span className="text-2xl font-black text-white block pt-1">USD 79.90</span>
              <p className="text-xs text-cyan-300/70 font-sans-editorial pt-1">USD 6.66 / mes equivalente</p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPlan('complete-12m')}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-400/30 font-bold transition-all cursor-pointer"
            >
              ELEGIR 12 MESES
            </button>
          </div>
        </div>
      </div>

      {/* BLOQUE C: LIFETIME DESTACADO */}
      <div className="pt-2">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-zinc-950 via-[#150e26] to-zinc-950 border-2 border-purple-500/80 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono-tech text-purple-300 uppercase font-black tracking-wider">
                EVO COMPLETE // LIFETIME
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 font-bold border border-purple-500/40 font-mono-tech">
                PAGO ÚNICO • ACCESO PERMANENTE
              </span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              USD 179.90
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial leading-relaxed max-w-md">
              Acceso irrestricto de por vida a los 10 tomos, todos los laboratorios, instrumental pericial completo y futuras actualizaciones sin renovaciones periódicas.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectPlan('lifetime')}
            className="px-7 py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-mono-tech text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(168,85,247,0.4)] shrink-0"
          >
            ELEGIR LIFETIME →
          </button>
        </div>
      </div>

      {/* BLOQUE D: COMPARADOR "¿QUÉ ME CONVIENE?" */}
      <div className="space-y-4 pt-4 font-mono-tech text-xs max-w-4xl mx-auto">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 text-center">
          ¿QUÉ ME CONVIENE? // COMPARATIVA TRANSPARENTE
        </h3>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-400 uppercase">
                <th className="p-3">CRITERIO</th>
                <th className="p-3">TOMO</th>
                <th className="p-3">PACK x3 / x5</th>
                <th className="p-3">EVO COMPLETE</th>
                <th className="p-3 text-purple-300">LIFETIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300">
              <tr>
                <td className="p-3 font-bold text-white">Acceso permanente</td>
                <td className="p-3 text-emerald-400 font-bold">SÍ</td>
                <td className="p-3 text-emerald-400 font-bold">SÍ</td>
                <td className="p-3 text-zinc-400">Mientras dure suscripción</td>
                <td className="p-3 text-purple-400 font-bold">DE POR VIDA</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Cantidad de tomos</td>
                <td className="p-3">1 Tomo</td>
                <td className="p-3">3 o 5 Tomos</td>
                <td className="p-3">10 Tomos</td>
                <td className="p-3 text-purple-400 font-bold">10 Tomos + Futuros</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Laboratorios</td>
                <td className="p-3">Lab asociado</td>
                <td className="p-3">Labs asociados</td>
                <td className="p-3">Todos los Labs</td>
                <td className="p-3 text-purple-400 font-bold">Todos los Labs</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Herramientas</td>
                <td className="p-3">Básicas</td>
                <td className="p-3">Básicas</td>
                <td className="p-3">Suite Completa</td>
                <td className="p-3 text-purple-400 font-bold">Suite Completa</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Tipo de pago</td>
                <td className="p-3">Pago único</td>
                <td className="p-3">Pago único</td>
                <td className="p-3">Suscripción</td>
                <td className="p-3 text-purple-400 font-bold">Pago único</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
