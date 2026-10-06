import React, { useState, useMemo } from 'react';
import {
  Gauge,
  Search,
  ArrowRight,
  HelpCircle,
  Cpu,
  Terminal,
  Activity,
  Zap,
  HardDrive,
  Monitor,
  Shield,
  Layers,
  Wrench,
  FileText,
  Boxes,
  Compass,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import {
  EVO_MASTER_TOOLS_CATALOG,
  EvoToolDefinition,
  EvoToolCategory,
} from '../../data/evoToolsData';
import { EVO_TOOLS_BY_INTENT } from '../../data/evoLearningPaths';

interface EvoPublicToolsCatalogProps {
  onExecuteToolAction: (tool: EvoToolDefinition) => void;
}

// Map tool IDs to historic clean visible names from EVO_TOOLS_BY_INTENT
const HISTORIC_TOOL_NAMES: Record<string, string> = {
  'diag-boot-seq': 'CÓMO ARRANCA UNA PC',
  'diag-atx-power-bench': 'DIAGNOSTICAR UNA PC QUE NO INICIA',
  'diag-bsod-decoder': 'ANALIZAR UN PANTALLAZO AZUL',
  'diag-incident-events': 'ANALIZAR ERRORES',
  'diag-bottleneck-calc': 'ENCONTRÁ EL CUELLO DE BOTELLA',
  'diag-autodetect-pc': 'CONOCÉ LOS COMPONENTES DE TU PC',
  'diag-telemetry-integrity': 'VER QUÉ CONSUME MI PC',
  'diag-case-resolver': 'RESOLVER CASOS DIFÍCILES',
  'med-latency-calc': 'REVISÁ TU MEMORIA RAM',
  'med-frametime-analyzer': 'MEDIR FPS Y TIRONES',
  'med-sensors-telemetry': 'VER SENSORES EN TIEMPO REAL',
  'med-dpc-latency': 'ENCONTRAR LATENCIAS DE WINDOWS',
  'med-stress-stability': 'PROBAR UNA OPTIMIZACIÓN',
  'med-thermal-history': 'REVISAR TEMPERATURAS',
  'inv-pcb-schematic': 'EXPLORAR LA MOTHERBOARD',
  'inv-xray-kernel': 'CÓMO WINDOWS USA LA CPU',
  'inv-cache-imc-flow': 'CÓMO TRABAJA EL PROCESADOR',
  'inv-digital-twin': 'DIGITAL TWIN (GEMELO DIGITAL)',
  'inv-workstations-sectors': 'ELEGIR UN BANCO DE TRABAJO',
  'inv-coverage-matrix': 'REVISAR HARDWARE A FONDO',
  'rep-windows-repair': 'REPARAR WINDOWS',
  'rep-windows-install': 'INSTALAR WINDOWS',
  'rep-hotswap-bench': 'PROBAR COMPONENTES',
  'rep-core-repair-view': 'LAB CORE // REPARACIÓN DE BENCH',
  'opt-nt-services': 'SERVICIOS DE WINDOWS',
  'opt-core-optimization': 'OPTIMIZACIÓN CORE DE WINDOWS',
  'opt-ab-comparison': 'COMPARÁ ANTES Y DESPUÉS',
  'opt-upgrade-simulator': 'SIMULAR OTRO HARDWARE',
  'opt-build-architect': 'ARQUITECTO DE ARMADO DE PC',
  'doc-forensic-dossier': 'GENERADOR DE EXPEDIENTE PERICIAL',
  'doc-evidence-passport': 'PASAPORTE DE EVIDENCIA TÉCNICA',
  'doc-technical-dossier': 'INFORME TÉCNICO PERICIAL',
  'doc-content-factory': 'CONTENT FACTORY EDITORIAL',
  'doc-transfer-challenge': 'EVALUACIÓN DE TRANSFERENCIA',
};

// Clean Technical SVG Asset Illustrations specific to each tool (w-24 sm:w-28, h-36 sm:h-40)
const TOOL_VISUAL_MAP: Record<string, { icon: React.ElementType; accent: string; bgGradient: string; label: string }> = {
  'diag-boot-seq': { icon: Zap, accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: '35 POST STATES' },
  'diag-bsod-decoder': { icon: Terminal, accent: '#38BDF8', bgGradient: 'from-sky-950/80 via-zinc-950 to-black', label: 'BUGCHECK DUMP' },
  'diag-incident-events': { icon: Activity, accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: 'EVENT VIEWER' },
  'diag-bottleneck-calc': { icon: Cpu, accent: '#F59E0B', bgGradient: 'from-amber-950/80 via-zinc-950 to-black', label: 'CPU / GPU METERS' },
  'diag-autodetect-pc': { icon: Monitor, accent: '#EAB308', bgGradient: 'from-yellow-950/80 via-zinc-950 to-black', label: 'PASAPORTE HW' },
  'diag-telemetry-integrity': { icon: Shield, accent: '#06B6D4', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'INTEGRIDAD' },
  'diag-atx-power-bench': { icon: Zap, accent: '#EF4444', bgGradient: 'from-rose-950/80 via-zinc-950 to-black', label: 'RIELES ATX 12V' },
  'diag-case-resolver': { icon: FileText, accent: '#EC4899', bgGradient: 'from-pink-950/80 via-zinc-950 to-black', label: 'EXPEDIENTES' },
  'med-latency-calc': { icon: Cpu, accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'DDR TIMINGS ns' },
  'med-frametime-analyzer': { icon: Activity, accent: '#EC4899', bgGradient: 'from-pink-950/80 via-zinc-950 to-black', label: '1% LOW FPS' },
  'med-sensors-telemetry': { icon: Monitor, accent: '#06B6D4', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'DIODO °C / V' },
  'med-dpc-latency': { icon: Terminal, accent: '#38BDF8', bgGradient: 'from-sky-950/80 via-zinc-950 to-black', label: 'DPC / ISR Ring 0' },
  'med-stress-stability': { icon: Activity, accent: '#F59E0B', bgGradient: 'from-amber-950/80 via-zinc-950 to-black', label: 'STRESS TEST' },
  'med-thermal-history': { icon: Activity, accent: '#EF4444', bgGradient: 'from-rose-950/80 via-zinc-950 to-black', label: 'THROTTLING °C' },
  'inv-pcb-schematic': { icon: Layers, accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: 'PCB VRM LAYERS' },
  'inv-xray-kernel': { icon: Terminal, accent: '#00D2FF', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'SCHEDULER NT' },
  'inv-cache-imc-flow': { icon: Cpu, accent: '#EAB308', bgGradient: 'from-yellow-950/80 via-zinc-950 to-black', label: 'CACHÉ L1/L2/L3' },
  'inv-digital-twin': { icon: Boxes, accent: '#00D2FF', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'DIGITAL TWIN' },
  'inv-workstations-sectors': { icon: Compass, accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: '8 SECTORES' },
  'inv-coverage-matrix': { icon: Layers, accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'COVERAGE MATRIX' },
  'rep-windows-repair': { icon: Wrench, accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: 'SFC / DISM' },
  'rep-windows-install': { icon: HardDrive, accent: '#00D2FF', bgGradient: 'from-cyan-950/80 via-zinc-950 to-black', label: 'CLEAN ISO GPT' },
  'rep-hotswap-bench': { icon: Wrench, accent: '#F59E0B', bgGradient: 'from-amber-950/80 via-zinc-950 to-black', label: 'HOT-SWAP BENCH' },
  'rep-core-repair-view': { icon: Wrench, accent: '#EF4444', bgGradient: 'from-rose-950/80 via-zinc-950 to-black', label: 'LAB CORE BENCH' },
  'opt-nt-services': { icon: Sliders, accent: '#38BDF8', bgGradient: 'from-sky-950/80 via-zinc-950 to-black', label: 'SERVICES NT' },
  'opt-core-optimization': { icon: Sliders, accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'CORE TWEAKS' },
  'opt-ab-comparison': { icon: Activity, accent: '#38BDF8', bgGradient: 'from-sky-950/80 via-zinc-950 to-black', label: 'A/B BENCH DELTA' },
  'opt-upgrade-simulator': { icon: Cpu, accent: '#F59E0B', bgGradient: 'from-amber-950/80 via-zinc-950 to-black', label: 'UPGRADE ROI' },
  'opt-build-architect': { icon: Boxes, accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'BUILD ARCHITECT' },
  'doc-forensic-dossier': { icon: FileText, accent: '#EC4899', bgGradient: 'from-pink-950/80 via-zinc-950 to-black', label: 'INFORME PERICIAL' },
  'doc-evidence-passport': { icon: Shield, accent: '#EAB308', bgGradient: 'from-yellow-950/80 via-zinc-950 to-black', label: 'EVIDENCE BADGE' },
  'doc-technical-dossier': { icon: FileText, accent: '#38BDF8', bgGradient: 'from-sky-950/80 via-zinc-950 to-black', label: 'DOSSIER TÉCNICO' },
  'doc-content-factory': { icon: Layers, accent: '#A855F7', bgGradient: 'from-purple-950/80 via-zinc-950 to-black', label: 'EDITORIAL HUBS' },
  'doc-transfer-challenge': { icon: CheckCircle2, accent: '#10B981', bgGradient: 'from-emerald-950/80 via-zinc-950 to-black', label: 'EVALUACIÓN' },
};

export const EvoPublicToolsCatalog: React.FC<EvoPublicToolsCatalogProps> = ({
  onExecuteToolAction,
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | EvoToolCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return [
      { id: 'ALL', label: 'TODAS', count: EVO_MASTER_TOOLS_CATALOG.length },
      { id: 'DIAGNOSTICAR', label: 'DIAGNOSTICAR', count: EVO_MASTER_TOOLS_CATALOG.filter((t) => t.category === 'DIAGNOSTICAR').length },
      { id: 'MEDIR', label: 'MEDIR', count: EVO_MASTER_TOOLS_CATALOG.filter((t) => t.category === 'MEDIR').length },
      { id: 'INVESTIGAR', label: 'INVESTIGAR', count: EVO_MASTER_TOOLS_CATALOG.filter((t) => t.category === 'INVESTIGAR').length },
      { id: 'REPARAR', label: 'REPARAR', count: EVO_MASTER_TOOLS_CATALOG.filter((t) => t.category === 'REPARAR').length },
      { id: 'OPTIMIZAR', label: 'OPTIMIZAR', count: EVO_MASTER_TOOLS_CATALOG.filter((t) => t.category === 'OPTIMIZAR').length },
      { id: 'DOCUMENTAR', label: 'DOCUMENTAR', count: EVO_MASTER_TOOLS_CATALOG.filter((t) => t.category === 'DOCUMENTAR').length },
    ] as const;
  }, []);

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return EVO_MASTER_TOOLS_CATALOG.filter((t) => {
      const displayName = HISTORIC_TOOL_NAMES[t.id] || t.name;
      const matchesCategory = activeCategory === 'ALL' || t.category === activeCategory;
      if (!matchesCategory) return false;

      if (!q) return true;

      return (
        t.name.toLowerCase().includes(q) ||
        displayName.toLowerCase().includes(q) ||
        t.whatItDoes.toLowerCase().includes(q) ||
        t.whenToUse.toLowerCase().includes(q) ||
        t.inputRequired.toLowerCase().includes(q) ||
        t.outputDelivered.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.labAssoc && t.labAssoc.toLowerCase().includes(q)) ||
        t.concepts.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-mono-tech select-none">
      
      {/* HEADER DE HERRAMIENTAS */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-800 pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Gauge className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono-tech tracking-widest text-emerald-400 uppercase font-black">
            INSTRUMENTAL DE BANCO Y METROLOGÍA ({EVO_MASTER_TOOLS_CATALOG.length} HERRAMIENTAS ACTIVAS)
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
          HERRAMIENTAS EVO LABS
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 font-sans-editorial max-w-3xl leading-relaxed">
          Catálogo completo y unificado de instrumental pericial. Herramientas reales para diagnosticar fallas de hardware, medir latencias en nanosegundos, investigar arquitectura de silicio, reparar Windows y documentar evidencia científica.
        </p>
      </div>

      {/* FILTROS Y BUSCADOR */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Buscador Full Text */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué problema querés resolver? Buscar: BSOD, latencia, frametime, VRM, POST, SSD, RAM..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono-tech text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white font-mono cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Contador de Resultados */}
          <div className="text-xs font-mono-tech text-zinc-400 flex items-center gap-2">
            <span>MOSTRANDO:</span>
            <strong className="text-emerald-400">{filteredTools.length}</strong>
            <span className="text-zinc-600">/</span>
            <span>{EVO_MASTER_TOOLS_CATALOG.length} TOTAL</span>
          </div>
        </div>

        {/* Pestañas de Filtros Canónicos */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 font-mono-tech text-xs custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-emerald-400 text-black shadow-md'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeCategory === cat.id ? 'bg-black/20 text-black font-black' : 'bg-zinc-900 text-zinc-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* RESULTADO VACÍO SI NO COINCIDE LA BÚSQUEDA */}
      {filteredTools.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 font-mono-tech">
          <HelpCircle className="w-8 h-8 text-zinc-600 mx-auto" />
          <p className="text-sm text-zinc-300 font-bold uppercase">
            No se encontraron herramientas para "{searchQuery}"
          </p>
          <p className="text-xs text-zinc-500 font-sans-editorial">
            Intentá con términos más generales como "CPU", "latencia", "reparar", "voltaje" o "Windows".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('ALL');
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white text-xs font-bold uppercase border border-zinc-800 transition-colors mt-2 cursor-pointer"
          >
            VER TODAS LAS HERRAMIENTAS
          </button>
        </div>
      )}

      {/* GRID DE 34 HERRAMIENTAS (2 COLUMNAS EN DESKTOP, MISMO TAMAÑO DE TARJETA QUE TOMOS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTools.map((tool) => {
          const displayName = HISTORIC_TOOL_NAMES[tool.id] || tool.name;
          const visual = TOOL_VISUAL_MAP[tool.id] || {
            icon: Gauge,
            accent: tool.accentColor || '#10B981',
            bgGradient: 'from-emerald-950/80 via-zinc-950 to-black',
            label: tool.category,
          };
          const IconComp = visual.icon;

          return (
            <div
              key={tool.id}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-stretch gap-5 shadow-xl group"
            >
              {/* Imagen Técnica Vertical Izquierda (Strict 96x144 / 112x160 px: w-24 sm:w-28, h-36 sm:h-40) */}
              <div className={`w-24 sm:w-28 h-36 sm:h-40 rounded-xl overflow-hidden bg-gradient-to-b ${visual.bgGradient} border border-zinc-800 shrink-0 relative shadow-md flex flex-col justify-between p-3 self-center sm:self-auto`}>
                
                {/* Spine accent strip */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-1.5"
                  style={{ backgroundColor: visual.accent }}
                />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-end">
                  <span className="text-[8px] font-mono-tech font-bold uppercase px-1.5 py-0.5 rounded bg-black/80 text-zinc-300 border border-zinc-800">
                    {tool.tomoId ? `TOMO ${tool.tomoId}` : 'EVO CORE'}
                  </span>
                </div>

                {/* Center SVG Icon Art */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-1">
                  <div
                    className="p-2.5 rounded-xl border backdrop-blur-md shadow-lg"
                    style={{
                      backgroundColor: `${visual.accent}15`,
                      borderColor: `${visual.accent}40`,
                      color: visual.accent,
                    }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[8px] font-mono font-black tracking-wider text-zinc-400 uppercase text-center mt-1">
                    {visual.label}
                  </span>
                </div>

                {/* Bottom Tag */}
                <div className="relative z-10 text-[8px] font-mono font-bold text-zinc-400 uppercase text-center bg-black/60 px-1 py-0.5 rounded">
                  {tool.category}
                </div>
              </div>

              {/* Contenido Completo Original Exacto */}
              <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  {/* Header Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded font-bold uppercase font-mono-tech"
                      style={{
                        color: tool.accentColor || visual.accent,
                        backgroundColor: `${tool.accentColor || visual.accent}15`,
                        border: `1px solid ${tool.accentColor || visual.accent}40`,
                      }}
                    >
                      {tool.category} {tool.tomoId ? `// TOMO ${tool.tomoId}` : ''}
                    </span>

                    <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-bold truncate max-w-[130px]">
                      {tool.labAssoc || 'EVO CORE'}
                    </span>
                  </div>

                  {/* Nombre Visible de la Herramienta (Sustentado en EVO_TOOLS_BY_INTENT) */}
                  <h3 className="font-display font-black text-base text-white uppercase tracking-tight group-hover:text-emerald-300 transition-colors">
                    {displayName}
                  </h3>

                  {/* Badges de Estado y Procedencia */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      ● {tool.status}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono">
                      {tool.provenance}
                    </span>
                  </div>

                  {/* Ficha descriptiva limpia con todo el contenido original exacto */}
                  <div className="space-y-2 text-xs text-zinc-300 font-sans-editorial pt-1">
                    <div>
                      <span className="text-zinc-500 font-mono-tech text-[10px] uppercase font-bold block">
                        ¿QUÉ HACE?
                      </span>
                      <p className="text-zinc-300 leading-relaxed text-[12px]">{tool.whatItDoes}</p>
                    </div>

                    <div>
                      <span className="text-zinc-500 font-mono-tech text-[10px] uppercase font-bold block">
                        ¿CUÁNDO USARLA?
                      </span>
                      <p className="text-zinc-400 leading-relaxed text-[12px]">{tool.whenToUse}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono-tech text-[10px] text-zinc-400 border-t border-zinc-900">
                      <div>
                        <span className="text-zinc-500 block uppercase font-bold text-[9px]">Entrada:</span>
                        <span className="text-zinc-300 truncate block">{tool.inputRequired}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block uppercase font-bold text-[9px]">Salida:</span>
                        <span className="text-emerald-400 font-bold truncate block">{tool.outputDelivered}</span>
                      </div>
                    </div>

                    {/* Conceptos clave */}
                    <div className="flex items-center gap-1 flex-wrap pt-1 font-mono-tech text-[9px]">
                      {tool.concepts.map((c, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-zinc-900/90 text-zinc-400 border border-zinc-800/80">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Directo a la herramienta real */}
                <div className="pt-2 border-t border-zinc-900">
                  <button
                    type="button"
                    onClick={() => onExecuteToolAction(tool)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(52,211,153,0.2)] flex items-center justify-center gap-1.5 group-hover:scale-[1.01]"
                  >
                    <span>USAR HERRAMIENTA</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
