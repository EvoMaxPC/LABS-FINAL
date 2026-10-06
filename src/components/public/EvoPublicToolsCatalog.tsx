import React, { useState, useMemo } from 'react';
import {
  Gauge,
  Activity,
  Cpu,
  Monitor,
  Wrench,
  Search,
  CheckCircle2,
  FileSearch,
  HardDrive,
  Zap,
  ArrowRight,
  ShieldCheck,
  Layers,
  Terminal,
  Sparkles,
  SlidersHorizontal,
  FileText,
  HelpCircle,
} from 'lucide-react';
import {
  EVO_MASTER_TOOLS_CATALOG,
  EvoToolDefinition,
  EvoToolCategory,
} from '../../data/evoToolsData';

interface EvoPublicToolsCatalogProps {
  onExecuteToolAction: (tool: EvoToolDefinition) => void;
}

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
      const matchesCategory = activeCategory === 'ALL' || t.category === activeCategory;
      if (!matchesCategory) return false;

      if (!q) return true;

      return (
        t.name.toLowerCase().includes(q) ||
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
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white font-mono"
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
            className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white text-xs font-bold uppercase border border-zinc-800 transition-colors mt-2"
          >
            VER TODAS LAS HERRAMIENTAS
          </button>
        </div>
      )}

      {/* GRID DE HERRAMIENTAS (34 HERRAMIENTAS REALES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-mono-tech">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
          >
            <div className="space-y-3">
              {/* Header de la tarjeta */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span
                  className="text-[10px] px-2 py-0.5 rounded font-bold uppercase"
                  style={{
                    color: tool.accentColor,
                    backgroundColor: `${tool.accentColor}15`,
                    border: `1px solid ${tool.accentColor}40`,
                  }}
                >
                  {tool.category} {tool.tomoId ? `// TOMO ${tool.tomoId}` : ''}
                </span>

                <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-bold truncate max-w-[130px]">
                  {tool.labAssoc || 'EVO CORE'}
                </span>
              </div>

              {/* Nombre de la herramienta */}
              <h3 className="font-display font-black text-base text-white uppercase tracking-tight group-hover:text-emerald-300 transition-colors">
                {tool.name}
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

              {/* Ficha descriptiva limpia */}
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
        ))}
      </div>

    </div>
  );
};
