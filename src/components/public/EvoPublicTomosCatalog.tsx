import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Search,
  CheckCircle2,
  Lock,
  Clock,
} from 'lucide-react';
import { EVO_TOMES_EXPANDED_DATA, EvoTomeExpandedItem } from '../../data/evoTomesExpandedData';
import { CANONICAL_TOMES, getTomeById } from '../../data/evoCatalog';

interface EvoPublicTomosCatalogProps {
  onOpenTomo: (tomoNumber: string) => void;
  onOpenMagazine?: () => void;
  onOpenLab?: (labType: string) => void;
}

const TOMO_ACCENTS: Record<
  string,
  { borderColor: string; spineColor: string; textColor: string; badgeColor: string }
> = {
  '01': { borderColor: 'hover:border-amber-400/60', spineColor: '#F59E0B', textColor: 'text-amber-400', badgeColor: 'bg-amber-400/10 text-amber-300 border-amber-400/30' },
  '02': { borderColor: 'hover:border-cyan-400/60', spineColor: '#00D2FF', textColor: 'text-cyan-400', badgeColor: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30' },
  '03': { borderColor: 'hover:border-emerald-400/60', spineColor: '#10B981', textColor: 'text-emerald-400', badgeColor: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30' },
  '04': { borderColor: 'hover:border-purple-400/60', spineColor: '#A855F7', textColor: 'text-purple-400', badgeColor: 'bg-purple-400/10 text-purple-300 border-purple-400/30' },
  '05': { borderColor: 'hover:border-sky-400/60', spineColor: '#06B6D4', textColor: 'text-sky-400', badgeColor: 'bg-sky-400/10 text-sky-300 border-sky-400/30' },
  '06': { borderColor: 'hover:border-rose-400/60', spineColor: '#EF4444', textColor: 'text-rose-400', badgeColor: 'bg-rose-400/10 text-rose-300 border-rose-400/30' },
  '07': { borderColor: 'hover:border-amber-400/60', spineColor: '#F59E0B', textColor: 'text-amber-400', badgeColor: 'bg-amber-400/10 text-amber-300 border-amber-400/30' },
  '08': { borderColor: 'hover:border-emerald-400/60', spineColor: '#10B981', textColor: 'text-emerald-400', badgeColor: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30' },
  '09': { borderColor: 'hover:border-green-400/60', spineColor: '#22C55E', textColor: 'text-green-400', badgeColor: 'bg-green-400/10 text-green-300 border-green-400/30' },
  '10': { borderColor: 'hover:border-violet-400/60', spineColor: '#8B5CF6', textColor: 'text-violet-400', badgeColor: 'bg-violet-400/10 text-violet-300 border-violet-400/30' },
  '11': { borderColor: 'hover:border-amber-400/60', spineColor: '#EAB308', textColor: 'text-amber-400', badgeColor: 'bg-amber-400/10 text-amber-300 border-amber-400/30' },
  '12': { borderColor: 'hover:border-pink-400/60', spineColor: '#EC4899', textColor: 'text-pink-400', badgeColor: 'bg-pink-400/10 text-pink-300 border-pink-400/30' },
};

export const EvoPublicTomosCatalog: React.FC<EvoPublicTomosCatalogProps> = ({
  onOpenTomo,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'HARDWARE' | 'WINDOWS' | 'REPARACION' | 'REDES' | 'SEGURIDAD' | 'RENDIMIENTO' | 'PROGRAMACION' | 'IA' | 'ELECTRONICA' | 'GAMEDEV'>('ALL');
  const [selectedTomeDetail, setSelectedTomeDetail] = useState<EvoTomeExpandedItem | null>(null);

  const filterCategoryMap: Record<string, string[]> = {
    HARDWARE: ['01', '03', '04', '11'],
    WINDOWS: ['02', '08'],
    REPARACION: ['03', '04', '08', '11'],
    REDES: ['05'],
    SEGURIDAD: ['06'],
    RENDIMIENTO: ['07'],
    PROGRAMACION: ['09', '12'],
    IA: ['10'],
    ELECTRONICA: ['11'],
    GAMEDEV: ['12'],
  };

  const filteredTomos = EVO_TOMES_EXPANDED_DATA.filter((tome) => {
    const matchesSearch =
      tome.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tome.number.includes(searchQuery) ||
      tome.valuePhrase.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedFilter === 'ALL') return true;

    const allowedNumbers = filterCategoryMap[selectedFilter] || [];
    return allowedNumbers.includes(tome.number);
  });

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-mono-tech select-none">
      
      {/* HEADER EDITORIAL DEL CATÁLOGO */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-800 pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-mono-tech tracking-widest text-amber-400 uppercase font-black">
            CATÁLOGO OFICIAL EVO LABS (10 TOMOS)
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
          LOS 10 TOMOS DE EVO LABS
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 font-sans-editorial max-w-2xl">
          Elegí el área que querés dominar. Cada tomo combina rigor científico, esquemáticos de silicio, bancos de simulación interactivos y exámenes periciales de acreditación.
        </p>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Buscador */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por número, título o concepto..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono-tech text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Filtros por Categoría */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tech text-xs custom-scrollbar">
          {(['ALL', 'HARDWARE', 'WINDOWS', 'REPARACION', 'REDES', 'SEGURIDAD', 'RENDIMIENTO', 'PROGRAMACION', 'IA'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat === 'ALL' ? 'TODOS (10)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE LOS 10 TOMOS VERTICALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredTomos.map((tome) => {
          const acc = TOMO_ACCENTS[tome.number] || TOMO_ACCENTS['01'];
          const canonical = getTomeById(tome.number);
          const isFullReader = canonical?.runtimeStatus === 'FULL_READER';
          const isDossierOnly = canonical?.runtimeStatus === 'DOSSIER_ONLY';
          const isInDev = canonical?.editorialStatus === 'IN_DEVELOPMENT' || canonical?.runtimeStatus === 'LOCKED';

          return (
            <div
              key={tome.id}
              className={`p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 ${acc.borderColor} transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg group`}
            >
              {/* Portada Vertical (Ancho 96-112px, Alto 144-160px) */}
              <div
                onClick={() => setSelectedTomeDetail(tome)}
                className="w-24 sm:w-28 h-36 sm:h-40 rounded-xl overflow-hidden bg-black border border-zinc-800 shrink-0 relative cursor-pointer shadow-md"
              >
                <img
                  src={tome.coverImage}
                  alt={tome.title}
                  className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div
                  className="absolute top-0 bottom-0 left-0 w-1.5"
                  style={{ backgroundColor: acc.spineColor }}
                />
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono-tech font-black text-white">
                  TOMO {tome.number}
                </span>
              </div>

              {/* Contenido del Tomo */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono-tech font-bold uppercase border ${acc.badgeColor}`}>
                    TOMO {tome.number}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono-tech font-bold uppercase">
                    {isFullReader ? 'DISPONIBLE' : isDossierOnly ? 'NO DISPONIBLE' : 'EN PROCESO'}
                  </span>
                </div>

                <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight">
                  {tome.title}
                </h3>

                <p className="font-sans-editorial text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  “{tome.valuePhrase}”
                </p>

                <div className="flex items-center gap-3 text-[11px] font-mono-tech text-zinc-400 pt-1">
                  <span className="text-zinc-400 font-medium uppercase">COMPRA PERMANENTE</span>
                  <span>•</span>
                  <span className="text-white font-bold">PRECIO A DEFINIR</span>
                </div>

                {/* CTAs estrictos según canonicalStatus */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {isFullReader ? (
                    <button
                      type="button"
                      onClick={() => onOpenTomo(tome.number)}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono-tech text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    >
                      ENTRAR AL TOMO →
                    </button>
                  ) : isInDev ? (
                    <button
                      type="button"
                      disabled
                      className="px-4 py-2 rounded-xl bg-zinc-900/80 text-zinc-500 font-mono-tech text-xs font-bold uppercase border border-zinc-800/80 cursor-not-allowed flex items-center gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>EN PROCESO</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedTomeDetail(tome)}
                      className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono-tech text-xs font-bold uppercase border border-zinc-800 cursor-pointer"
                    >
                      VER DETALLE
                    </button>
                  )}

                  {isFullReader && (
                    <button
                      type="button"
                      onClick={() => setSelectedTomeDetail(tome)}
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono-tech text-xs font-bold uppercase transition-all cursor-pointer border border-zinc-800"
                    >
                      VER DETALLE
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DETALLE DE TOMO ESTRICTO */}
      {selectedTomeDetail && (() => {
        const canonical = getTomeById(selectedTomeDetail.number);
        const isFullReader = canonical?.runtimeStatus === 'FULL_READER';
        const isDossierOnly = canonical?.runtimeStatus === 'DOSSIER_ONLY';
        const isInDev = canonical?.editorialStatus === 'IN_DEVELOPMENT' || canonical?.runtimeStatus === 'LOCKED';

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="max-w-2xl w-full rounded-2xl bg-[#0a0d14] border border-amber-400/40 p-6 shadow-2xl space-y-5 font-mono-tech max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-400 font-black">TOMO {selectedTomeDetail.number}</span>
                  <span className="text-zinc-600">/</span>
                  <h3 className="font-display font-black text-lg text-white uppercase">{selectedTomeDetail.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTomeDetail(null)}
                  className="p-1 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-28 sm:w-32 h-44 rounded-xl overflow-hidden bg-black border border-zinc-800 shrink-0">
                  <img src={selectedTomeDetail.coverImage} alt={selectedTomeDetail.title} className="w-full h-full object-cover object-top" />
                </div>
                <div className="space-y-3 flex-1 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block">FRASE DE VALOR</span>
                    <p className="text-amber-300 font-sans-editorial text-sm italic">“{selectedTomeDetail.valuePhrase}”</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block">TIPO DE ACCESO</span>
                    <p className="text-zinc-300 font-sans-editorial">Compra Permanente de por vida o incluido en suscripción EVO Complete.</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block">ESTADO CANÓNICO</span>
                    <p className={`font-bold uppercase ${isFullReader ? 'text-emerald-400' : isInDev ? 'text-amber-400' : 'text-zinc-400'}`}>
                      {isFullReader ? 'DISPONIBLE // LECTOR COMPLETO' : isInDev ? 'EN PROCESO DE DESARROLLO' : 'NO DISPONIBLE // SÓLO DOSSIER'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex justify-end gap-2">
                {isFullReader ? (
                  <button
                    type="button"
                    onClick={() => {
                      const num = selectedTomeDetail.number;
                      setSelectedTomeDetail(null);
                      onOpenTomo(num);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                  >
                    ENTRAR AL TOMO →
                  </button>
                ) : isDossierOnly ? (
                  <button
                    type="button"
                    onClick={() => {
                      const num = selectedTomeDetail.number;
                      setSelectedTomeDetail(null);
                      onOpenTomo(num);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-black uppercase tracking-wider transition-all cursor-pointer border border-zinc-700"
                  >
                    VER DOSSIER CURRICULAR →
                  </button>
                ) : isInDev ? (
                  <span className="px-4 py-2 rounded-xl bg-zinc-900 text-amber-400 text-xs font-bold uppercase border border-amber-500/30">
                    EN PROCESO DE DESARROLLO
                  </span>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-bold uppercase border border-zinc-800">
                    NO DISPONIBLE
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
