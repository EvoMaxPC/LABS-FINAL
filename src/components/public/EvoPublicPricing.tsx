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
import { EVO_PRICING } from '../../data/evoPricing';

interface EvoPublicPricingProps {
  onSelectPlan: (planId: string) => void;
  onSelectTomoOption: () => void;
}

export const EvoPublicPricing: React.FC<EvoPublicPricingProps> = ({
  onSelectPlan,
  onSelectTomoOption,
}) => {
  const {
    complete1Month,
    complete3Months,
    complete6Months,
    complete12Months,
    lifetime,
    singleTomo,
    tomoPack,
  } = EVO_PRICING;

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-mono-tech select-none">
      
      {/* HEADER DE PRECIOS */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-800 pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <CreditCard className="w-5 h-5 text-amber-400" />
          <span className="text-xs tracking-widest text-amber-400 uppercase font-black">
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
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-400 text-xs font-black flex items-center justify-center border border-amber-400/30">
            A
          </span>
          <h2 className="text-lg sm:text-xl font-display font-black text-amber-300 uppercase tracking-tight">
            QUIERO UN CONTENIDO ESPECÍFICO // COMPRA PERMANENTE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
          {/* 1. Tomo Individual */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  {singleTomo.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium uppercase">
                  VITALICIO
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight block">
                  PRECIO A DEFINIR
                </span>
                <span className="text-[11px] text-zinc-400 font-sans-editorial block pt-1">
                  {singleTomo.billingTerm}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed pt-1">
                {singleTomo.description}
              </p>
              <div className="pt-2 text-[11px] text-zinc-400 space-y-1.5 border-t border-zinc-900">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>1 Tomo digital completo</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Laboratorios y bancos incluidos</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onSelectTomoOption}
              className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase tracking-wider transition-all cursor-pointer border border-zinc-800 hover:border-zinc-700"
            >
              EXPLORAR TOMOS →
            </button>
          </div>

          {/* 2. Pack x3 Tomos */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-amber-400/40 hover:border-amber-400/70 transition-all flex flex-col justify-between space-y-5 shadow-xl relative group">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  PACK x3 TOMOS
                </span>
                <span className="text-[10px] text-amber-400/90 font-medium uppercase">
                  {tomoPack.billingTerm}
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight block">
                  PRECIO A DEFINIR
                </span>
                <span className="text-[11px] text-zinc-400 font-sans-editorial block pt-1">
                  Acceso permanente a 3 Tomos
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed pt-1">
                Elegí 3 tomos canónicos para armar tu propia ruta formativa personalizada.
              </p>
              <div className="pt-2 text-[11px] text-zinc-400 space-y-1.5 border-t border-zinc-900">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>3 Tomos seleccionados a elección</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Todos sus simuladores asociados</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onSelectTomoOption}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              ELEGIR PACK x3 →
            </button>
          </div>

          {/* 3. Pack x5 Tomos */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-5 shadow-lg group">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  PACK x5 TOMOS
                </span>
                <span className="text-[10px] text-zinc-400 font-medium uppercase">
                  {tomoPack.billingTerm}
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight block">
                  PRECIO A DEFINIR
                </span>
                <span className="text-[11px] text-zinc-400 font-sans-editorial block pt-1">
                  Acceso permanente a 5 Tomos
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed pt-1">
                Media colección canónica con acceso de por vida ideal para técnicos y talleres.
              </p>
              <div className="pt-2 text-[11px] text-zinc-400 space-y-1.5 border-t border-zinc-900">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>5 Tomos estructurados completos</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Suite completa de laboratorios</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onSelectTomoOption}
              className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase tracking-wider transition-all cursor-pointer border border-zinc-800 hover:border-zinc-700"
            >
              ELEGIR PACK x5 →
            </button>
          </div>
        </div>
      </div>

      {/* BLOQUE B: SUSCRIPCIÓN EVO COMPLETE */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-cyan-400/20 text-cyan-400 text-xs font-black flex items-center justify-center border border-cyan-400/30">
            B
          </span>
          <h2 className="text-lg sm:text-xl font-display font-black text-cyan-300 uppercase tracking-tight">
            QUIERO TODO EVO // SUSCRIPCIÓN EVO COMPLETE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* 1. Complete 1 Mes */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                  {complete1Month.name}
                </span>
                <span className="text-[10px] text-zinc-500 font-medium uppercase">
                  1 MES
                </span>
              </div>
              <div>
                <span className="text-3xl font-display font-black text-white tracking-tight block">
                  USD {typeof complete1Month.priceUsd === 'number' ? complete1Month.priceUsd.toFixed(2) : complete1Month.priceUsd}
                </span>
                <span className="text-[11px] text-zinc-400 font-sans-editorial block pt-0.5">
                  {complete1Month.billingTerm}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed pt-1">
                {complete1Month.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPlan(complete1Month.id)}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase tracking-wider transition-all cursor-pointer border border-zinc-800 hover:border-zinc-700"
            >
              ELEGIR 1 MES
            </button>
          </div>

          {/* 2. Complete 3 Meses */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                  {complete3Months.name}
                </span>
                <span className="text-[10px] text-zinc-500 font-medium uppercase">
                  3 MESES
                </span>
              </div>
              <div>
                <span className="text-3xl font-display font-black text-white tracking-tight block">
                  USD {typeof complete3Months.priceUsd === 'number' ? complete3Months.priceUsd.toFixed(2) : complete3Months.priceUsd}
                </span>
                <span className="text-[11px] text-zinc-400 font-sans-editorial block pt-0.5">
                  {complete3Months.billingTerm}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed pt-1">
                {complete3Months.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPlan(complete3Months.id)}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase tracking-wider transition-all cursor-pointer border border-zinc-800 hover:border-zinc-700"
            >
              ELEGIR 3 MESES
            </button>
          </div>

          {/* 3. Complete 6 Meses */}
          <div className="p-5 rounded-2xl bg-[#090d16] border border-amber-400/60 hover:border-amber-400 transition-all flex flex-col justify-between space-y-4 shadow-xl relative group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-amber-300 uppercase font-black tracking-wider">
                  {complete6Months.name}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 font-bold uppercase">
                  RECOMENDADO
                </span>
              </div>
              <div>
                <span className="text-3xl font-display font-black text-white tracking-tight block">
                  USD {typeof complete6Months.priceUsd === 'number' ? complete6Months.priceUsd.toFixed(2) : complete6Months.priceUsd}
                </span>
                <span className="text-[11px] text-zinc-400 font-sans-editorial block pt-0.5">
                  {complete6Months.billingTerm}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed pt-1">
                {complete6Months.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPlan(complete6Months.id)}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              ELEGIR 6 MESES
            </button>
          </div>

          {/* 4. Complete 12 Meses */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-cyan-500/50 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-4 shadow-xl relative group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-cyan-300 uppercase font-bold tracking-wider">
                  {complete12Months.name}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 font-bold uppercase">
                  MEJOR VALOR
                </span>
              </div>
              <div>
                <span className="text-3xl font-display font-black text-white tracking-tight block">
                  USD {typeof complete12Months.priceUsd === 'number' ? complete12Months.priceUsd.toFixed(2) : complete12Months.priceUsd}
                </span>
                <span className="text-[11px] text-zinc-400 font-sans-editorial block pt-0.5">
                  {complete12Months.billingTerm}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed pt-1">
                {complete12Months.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectPlan(complete12Months.id)}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              ELEGIR 12 MESES
            </button>
          </div>
        </div>
      </div>

      {/* BLOQUE C: LIFETIME DESTACADO */}
      <div className="pt-2">
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-purple-500/50 hover:border-purple-400/80 transition-all shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-purple-300 uppercase font-black tracking-wider">
                {lifetime.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-bold border border-purple-500/30 uppercase">
                {lifetime.billingTerm}
              </span>
            </div>
            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                USD {typeof lifetime.priceUsd === 'number' ? lifetime.priceUsd.toFixed(2) : lifetime.priceUsd}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans-editorial leading-relaxed max-w-xl">
              {lifetime.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] text-zinc-400">
              <span className="text-zinc-300">✓ 10 Tomos actuales + futuros</span>
              <span className="text-zinc-300">✓ Laboratorios y simuladores</span>
              <span className="text-zinc-300">✓ Exámenes y acreditaciones</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectPlan(lifetime.id)}
            className="px-7 py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0"
          >
            ELEGIR LIFETIME →
          </button>
        </div>
      </div>

      {/* BLOQUE D: COMPARADOR "¿QUÉ ME CONVIENE?" */}
      <div className="space-y-4 pt-4 text-xs max-w-4xl mx-auto">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 text-center">
          ¿QUÉ ME CONVIENE? // COMPARATIVA TRANSPARENTE
        </h3>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-400 uppercase tracking-wider">
                <th className="p-3.5">CRITERIO</th>
                <th className="p-3.5">TOMO INDIVIDUAL</th>
                <th className="p-3.5">PACK x3 / x5</th>
                <th className="p-3.5">EVO COMPLETE</th>
                <th className="p-3.5 text-purple-300">LIFETIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300 font-sans-editorial text-xs">
              <tr>
                <td className="p-3.5 font-bold font-mono-tech text-white">Acceso permanente</td>
                <td className="p-3.5 text-emerald-400 font-bold font-mono-tech">SÍ</td>
                <td className="p-3.5 text-emerald-400 font-bold font-mono-tech">SÍ</td>
                <td className="p-3.5 text-zinc-400">Mientras dure suscripción</td>
                <td className="p-3.5 text-purple-400 font-bold font-mono-tech">DE POR VIDA</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold font-mono-tech text-white">Cantidad de tomos</td>
                <td className="p-3.5">1 Tomo</td>
                <td className="p-3.5">3 o 5 Tomos</td>
                <td className="p-3.5">10 Tomos</td>
                <td className="p-3.5 text-purple-400 font-bold font-mono-tech">10 Tomos + Futuros</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold font-mono-tech text-white">Laboratorios</td>
                <td className="p-3.5">Lab asociado</td>
                <td className="p-3.5">Labs asociados</td>
                <td className="p-3.5">Todos los Labs</td>
                <td className="p-3.5 text-purple-400 font-bold font-mono-tech">Todos los Labs</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold font-mono-tech text-white">Herramientas</td>
                <td className="p-3.5">Básicas</td>
                <td className="p-3.5">Básicas</td>
                <td className="p-3.5">Suite Completa</td>
                <td className="p-3.5 text-purple-400 font-bold font-mono-tech">Suite Completa</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold font-mono-tech text-white">Tipo de pago</td>
                <td className="p-3.5 font-mono-tech">Pago único</td>
                <td className="p-3.5 font-mono-tech">Pago único</td>
                <td className="p-3.5 font-mono-tech">Suscripción</td>
                <td className="p-3.5 text-purple-400 font-bold font-mono-tech">Pago único</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
