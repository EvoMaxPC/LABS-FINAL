import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Monitor,
  Shield,
  Activity,
  Layers,
  Zap,
  HelpCircle,
  ChevronDown,
  Terminal,
  ExternalLink,
  BookOpen,
  Search,
} from 'lucide-react';
import { EvoMundoWordmark } from '../common/EvoMundoWordmark';
import { EvoPrimarySystemButton, EvoSecondaryInspectButton } from '../common/EvoSystemButtons';

interface PublicLandingProps {
  onExploreClick?: () => void;
  onMethodClick?: () => void;
  onOpenAuthPlaceholder?: (mode: 'login' | 'register') => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  onExploreClick,
  onMethodClick,
  onOpenAuthPlaceholder,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full text-zinc-100 font-sans-editorial selection:bg-amber-400 selection:text-black">
      
      {/* =========================================================================
          1. HERO PÚBLICO
         ========================================================================= */}
      <section id="inicio" className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono-tech text-amber-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>PLATAFORMA DE METROLOGÍA & ARQUITECTURA DE COMPUTADORAS</span>
          </div>

          {/* Main Wordmark & Manifest */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <EvoMundoWordmark variant="hero" showUniverseBadge={true} />
            </div>

            <div className="py-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-none">
                NO LO CREAS. <span className="text-amber-400">COMPROBALO.</span>
              </h1>
            </div>

            <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Aprendé arquitectura de hardware, reparación de PC y optimización profunda de Windows mediante <strong className="text-white">simuladores interactivos</strong> y <strong className="text-amber-400">evidencia pericial verificable</strong>.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono-tech">
            <EvoPrimarySystemButton onClick={() => handleScrollTo('tomos')}>
              EXPLORAR CATÁLOGO DE TOMOS →
            </EvoPrimarySystemButton>

            <EvoSecondaryInspectButton onClick={() => handleScrollTo('como-funciona')}>
              CÓMO FUNCIONA EL MÉTODO
            </EvoSecondaryInspectButton>
          </div>

          {/* Value Props Micro-Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono-tech text-zinc-400 max-w-3xl mx-auto">
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>0 Mitos / 0 Placebos</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Normas JEDEC / PCIe</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bancos de Hot-Swap</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Expediente Técnico</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. QUÉ ES EVO // 3 PILARES FUNDAMENTALES
         ========================================================================= */}
      <section id="que-es-evo" className="py-20 bg-[#06080d] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest font-bold block">
              EPISTEMOLOGÍA TÉCNICA
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Una nueva forma de dominar las computadoras
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-sans-editorial">
              Dejá atrás los tutoriales superficiales de internet. En EVO LABS cada afirmación técnica se demuestra con mediciones físicas y esquemáticos de ingeniería.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pilar 1 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white uppercase">
                1. Arquitectura de Silicio
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Entendé cómo interactúan realmente los núcleos de CPU, controladores de memoria (IMC), carriles PCIe, búferes L1/L2/L3 y conmutadores VRM bajo cargas extremas.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-4 hover:border-cyan-400/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white uppercase">
                2. Diagnóstico de Windows
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Aislá fallas reales en servicios, latencias DPC en Ring 0, compresión de memoria, paginación y cuellos de botella con la suite pericial de Sysinternals.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-4 hover:border-emerald-400/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white uppercase">
                3. Metrología Empírica
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Calculá latencias reales en nanosegundos (ns), evaluá degradación térmica con límites TjMax y obtené un expediente técnico demostrable de tus capacidades.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. TOMOS DESTACADOS
         ========================================================================= */}
      <section id="tomos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest font-bold block">
              COLECCIÓN DE TOMOS PERICIALES
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Tratados técnicos de ingeniería aplicada
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-zinc-500">
            NIVEL B // METROLOGÍA PERICIAL
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Tomo 01 */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-amber-500/30 space-y-4 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono-tech">
                <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">TOMO 01</span>
                <span className="text-emerald-400 font-bold">PUBLICADO // ACCESO INMEDIATO</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white uppercase">
                Conocé tu PC
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans-editorial">
                Arquitectura del procesador, microcódigo, límites térmicos TjMax, topología de memoria RAM e interconexión PCIe Gen 4/5.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono-tech text-zinc-400">
              <span>7 Capítulos + Lab Hot-Swap</span>
              <span className="text-amber-400 font-bold">INCLUIDO →</span>
            </div>
          </div>

          {/* Tomo 02 */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono-tech">
                <span className="px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-bold border border-cyan-400/40">TOMO 02</span>
                <span className="text-emerald-400 font-bold">PUBLICADO // ACCESO INMEDIATO</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white uppercase">
                La Biblia Negra de Windows
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans-editorial">
                Despliegue limpio, arquitectura de servicios svchost, aislamiento de telemetría SysMain, memoria comprimida y Sysinternals.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono-tech text-zinc-400">
              <span>12 Módulos + Lab Servicios</span>
              <span className="text-cyan-400 font-bold">DISPONIBLE →</span>
            </div>
          </div>

          {/* Tomo 03 */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono-tech">
                <span className="px-2 py-0.5 rounded bg-purple-400/20 text-purple-300 font-bold border border-purple-400/40">TOMO 03</span>
                <span className="text-zinc-500 font-bold">ROADMAP // PLANIFICADO</span>
              </div>
              <h3 className="text-xl font-display font-bold text-zinc-300 uppercase">
                Reparación & Descarte
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans-editorial">
                Matrices de diagnóstico diferencial, aislamiento de causa raíz, descarte de hardware fallido y validación por reemplazo seguro.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono-tech text-zinc-500">
              <span>Fase Curricular 2026</span>
              <span>VER FICHA →</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. LABORATORIOS INTERACTIVOS (DEMOS & SIMULACIÓN)
         ========================================================================= */}
      <section id="laboratorios" className="py-20 bg-[#06080d] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono-tech text-cyan-400 uppercase tracking-widest font-bold block">
              BANCOS DE PRUEBA PERICIALES // MODELO CONCEPTUAL
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Aprender practicando, no memorizando
            </h2>
            <p className="text-sm text-zinc-400 font-sans-editorial">
              Los laboratorios de EVO simulan las leyes físicas y lógicas del hardware para que puedas experimentar sin riesgo de dañar componentes reales.
            </p>
            <div className="pt-1">
              <span className="text-[10px] font-mono-tech text-zinc-400 border border-zinc-800 bg-zinc-950 px-3 py-1 rounded-full inline-block">
                NOTA: Los esquemáticos y cálculos en esta sección son simulaciones demostrativas con fines pedagógicos.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-amber-400 font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  HOT-SWAP DE SILICIO
                </span>
                <span className="text-[10px] text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded">SIMULACIÓN DE BANCO</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white uppercase">
                Cálculo de Latencia Real en Nanosegundos (ns)
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans-editorial">
                Modificá frecuencias y latencias CAS (CL) de memoria RAM para visualizar la fórmula exacta de acceso `(CL * 2000) / MT/s`, detectar bifurcaciones de carril PCIe y predecir thermal throttling. Cada Tomo incluye sus laboratorios correspondientes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-cyan-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  MATRIZ FORENSE DE WINDOWS
                </span>
                <span className="text-[10px] text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded">SIMULACIÓN DE BANCO</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white uppercase">
                Telemetría y Diagnóstico de Servicios
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans-editorial">
                Inspeccioná procesos en tiempo real, evaluá el impacto de SysMain, descubrí por qué los optimizadores placebo rompen dependencias y aprendé a auditar mediante PowerShell pericial.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. CÓMO FUNCIONA // EL MÉTODO PERICIAL
         ========================================================================= */}
      <section id="como-funciona" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest font-bold block">
            EVO METHOD
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            El método pericial de 5 pilares
          </h2>
          <p className="text-xs font-mono-tech text-zinc-400">
            Resumen operativo de las 9 etapas oficiales de investigación técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center font-mono-tech text-xs">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="font-bold text-amber-400">1. ENTENDER</div>
            <p className="text-[11px] text-zinc-400 font-sans-editorial">Fundamentos de arquitectura y señales.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="font-bold text-cyan-400">2. OBSERVAR</div>
            <p className="text-[11px] text-zinc-400 font-sans-editorial">Esquemáticos de silicio y flujo de buses.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="font-bold text-emerald-400">3. PRACTICAR</div>
            <p className="text-[11px] text-zinc-400 font-sans-editorial">Laboratorios guiados sin dañar hardware.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="font-bold text-purple-400">4. DIAGNOSTICAR</div>
            <p className="text-[11px] text-zinc-400 font-sans-editorial">Descarte pericial de hipótesis erróneas.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="font-bold text-teal-400">5. COMPROBAR</div>
            <p className="text-[11px] text-zinc-400 font-sans-editorial">Evidencia técnica con procedencia real.</p>
          </div>
        </div>

        {/* Trazabilidad de Descargas Concept Box */}
        <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 max-w-3xl mx-auto font-mono-tech text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Shield className="w-4 h-4" />
            <span>TRAZABILIDAD DE LICENCIA & MARCA DE AGUA PERSONALIZADA</span>
          </div>
          <p className="text-zinc-400 font-sans-editorial text-xs leading-relaxed">
            Las futuras descargas técnicas en formato PDF contarán con marca de agua pericial personalizada que incluye identificador de licencia, nombre de usuario y fecha de emisión para uso personal e individual.
          </p>
        </div>
      </section>

      {/* =========================================================================
          6. MODELO COMERCIAL OFICIAL (COMPRA PERMANENTE + EVO COMPLETE)
         ========================================================================= */}
      <section id="planes" className="py-20 bg-[#06080d] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest font-bold block">
              MODELOS DE VENTA OFICIALES
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Elegí cómo acceder a EVO LABS
            </h2>
            <p className="text-xs font-mono-tech text-zinc-400">
              COMPRA PERMANENTE POR TOMO/PACKS O ACCESO TEMPORAL COMPLETO
            </p>
          </div>

          {/* Grilla de 4 Opciones Comerciales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. TOMO INDIVIDUAL */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-5 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-wider block">COMPRA PERMANENTE</span>
                  <h3 className="text-xl font-display font-bold text-white uppercase">Tomo Individual</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans-editorial">
                  Comprá un Tomo específico y queda en tu cuenta para siempre.
                </p>
                <ul className="space-y-2 text-xs text-zinc-300 font-mono-tech">
                  <li className="flex items-center gap-2">✓ 1 Tomo Completo</li>
                  <li className="flex items-center gap-2">✓ Labs Asociados al Tomo</li>
                  <li className="flex items-center gap-2">✓ Examen y Certificación</li>
                  <li className="flex items-center gap-2">✓ Actualizaciones Menores</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-zinc-900">
                <span className="text-[10px] font-mono-tech text-zinc-400 block text-center font-bold">ACCESO VITALICIO</span>
              </div>
            </div>

            {/* 2. PACK x3 TOMOS */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-5 flex flex-col justify-between hover:border-amber-400/40 transition-colors">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech text-amber-400 font-bold uppercase tracking-wider block">PACK TEMÁTICO</span>
                  <h3 className="text-xl font-display font-bold text-white uppercase">Pack x3 Tomos</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans-editorial">
                  3 Tomos relacionados temáticamente + todos sus laboratorios incluidos con descuento.
                </p>
                <ul className="space-y-2 text-xs text-zinc-300 font-mono-tech">
                  <li className="flex items-center gap-2">✓ 3 Tomos Seleccionados</li>
                  <li className="flex items-center gap-2">✓ Todos sus Labs Asociados</li>
                  <li className="flex items-center gap-2">✓ Exámenes y Acreditación</li>
                  <li className="flex items-center gap-2">✓ Ahorro por Volumen</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-zinc-900">
                <span className="text-[10px] font-mono-tech text-amber-400 block text-center font-bold">ACCESO VITALICIO</span>
              </div>
            </div>

            {/* 3. PACK x5 TOMOS */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-5 flex flex-col justify-between hover:border-purple-400/40 transition-colors">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech text-purple-400 font-bold uppercase tracking-wider block">PACK INTEGRAL</span>
                  <h3 className="text-xl font-display font-bold text-white uppercase">Pack x5 Tomos</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans-editorial">
                  5 Tomos estructurados + todos sus laboratorios periciales permanentes.
                </p>
                <ul className="space-y-2 text-xs text-zinc-300 font-mono-tech">
                  <li className="flex items-center gap-2">✓ 5 Tomos Estructurados</li>
                  <li className="flex items-center gap-2">✓ Suite de Labs Incluida</li>
                  <li className="flex items-center gap-2">✓ Casos Forenses Guiados</li>
                  <li className="flex items-center gap-2">✓ Máximo Ahorro en Pack</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-zinc-900">
                <span className="text-[10px] font-mono-tech text-purple-400 block text-center font-bold">ACCESO VITALICIO</span>
              </div>
            </div>

            {/* 4. EVO COMPLETE (ACCESO TEMPORAL) */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-cyan-500/40 space-y-5 flex flex-col justify-between relative shadow-[0_0_25px_rgba(6,182,212,0.08)]">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono-tech text-cyan-400 font-bold uppercase tracking-wider">ALL ACCESS TEMPORAL</span>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 text-[8.5px] font-bold border border-cyan-400/40">COMPLETO</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white uppercase">EVO Complete</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans-editorial">
                  Accedé a todo el catálogo publicado por tiempo determinado (1, 3, 6 o 12 meses).
                </p>
                <ul className="space-y-2 text-xs text-zinc-300 font-mono-tech">
                  <li className="flex items-center gap-2">✓ Todos los Tomos Publicados</li>
                  <li className="flex items-center gap-2">✓ Suite Completa de Labs</li>
                  <li className="flex items-center gap-2">✓ Duración: 1 / 3 / 6 / 12 Meses</li>
                  <li className="flex items-center gap-2 text-emerald-400 text-[11px]">✓ Nunca borra tu progreso</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-zinc-900">
                <span className="text-[10px] font-mono-tech text-cyan-400 block text-center font-bold">1 / 3 / 6 / 12 MESES</span>
              </div>
            </div>

          </div>

          {/* Banner de Integridad Educativa */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-center font-mono-tech text-xs text-zinc-400 max-w-3xl mx-auto">
            <span className="text-white font-bold">GARANTÍA DE INTEGRIDAD DE PROGRESO:</span> Al finalizar un período temporal de EVO Complete, tu progreso educativo, evidencias periciales y exámenes superados permanecen intactos, conservando el acceso a cualquier tomo comprado individualmente.
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. FAQ // PREGUNTAS FRECUENTES
         ========================================================================= */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest font-bold block">
            PREGUNTAS FRECUENTES
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            Claridad técnica y comercial
          </h2>
        </div>

        <div className="space-y-3 font-sans-editorial">
          {[
            {
              q: '¿Qué diferencia a EVO LABS de cursos tradicionales de reparación o informática?',
              a: 'EVO LABS no enseña recetas fijas ni "trucos mágicos". Se fundamenta en arquitectura de silicio, estándares JEDEC/PCI-SIG, herramientas de diagnóstico pericial (Sysinternals) y simuladores donde podés medir latencias y fallas en tiempo real.',
            },
            {
              q: '¿Los laboratorios interactivos vienen incluidos al comprar un Tomo?',
              a: 'Sí. Cada Tomo comprado de forma individual o en Pack incluye automáticamente todos sus laboratorios y simuladores asociados de forma permanente. No hay microcompras separadas por laboratorio.',
            },
            {
              q: '¿Qué ocurre con mi progreso si vence mi acceso temporal de EVO Complete?',
              a: 'Tu progreso de aprendizaje, capítulos completados, evidencias técnicas y exámenes nunca se borran. Además, conservás el acceso a cualquier Tomo adquirido previamente de forma permanente.',
            },
            {
              q: '¿Los laboratorios interactivos dañan mi computadora?',
              a: 'No. Los laboratorios operan dentro de modelos de simulación técnica de alta fidelidad que se ejecutan en el entorno seguro de tu navegador web.',
            },
            {
              q: '¿Cómo funciona la acreditación pericial?',
              a: 'A medida que completás capítulos, superás exámenes prácticos y resolvés casos forenses, el Evidence Engine genera un expediente técnico local con trazabilidad completa de tus competencias demostradas.',
            },
          ].map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-hidden transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-900 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          8. CTA FINAL
         ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-zinc-950 to-[#05070a] border-t border-zinc-900 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Comenzá tu evolución técnica hoy
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans-editorial">
            Sumate al estándar pericial de EVO LABS. Diagnósticos con evidencia, sin mitos ni placebos.
          </p>
          <div className="pt-2 flex justify-center">
            <EvoPrimarySystemButton onClick={() => handleScrollTo('tomos')}>
              EXPLORAR EL CATÁLOGO COMPLETO →
            </EvoPrimarySystemButton>
          </div>
        </div>
      </section>

    </div>
  );
};
