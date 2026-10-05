import React from 'react';
import { BookOpen, ArrowRight, Sparkles, Layers, FileText, ChevronRight } from 'lucide-react';

interface MagazineEdition {
  id: string;
  editionNumber: string;
  title: string;
  subtitle: string;
  valuePhrase: string;
  coverImage: string;
  pages: number;
  highlightTopic: string;
  status: 'DISPONIBLE' | 'PRÓXIMAMENTE';
  actionKey?: 'magazine-01' | 'magazine-02' | 'magazine-03';
}

const MAGAZINES_DATA: MagazineEdition[] = [
  {
    id: 'mag-01',
    editionNumber: 'EDICIÓN 01',
    title: 'SILICIO, BUSES & ARQUITECTURA X86/ARM',
    subtitle: 'Despieces fotográficos, buses PCIe 5.0 y topología interna de silicio',
    valuePhrase: 'La anatomía física de los procesadores modernos y sus cuellos de botella.',
    coverImage: '/src/assets/images/cap_01_silicon_1789531835511.jpg',
    pages: 46,
    highlightTopic: 'TOPOLOGÍA DE CHIPLETS & BUSES',
    status: 'DISPONIBLE',
    actionKey: 'magazine-01',
  },
  {
    id: 'mag-02',
    editionNumber: 'EDICIÓN 02',
    title: 'KERNEL FORENSE & DRIVERS NT',
    subtitle: 'DPC Latency, hilos svchost, interrupciones y análisis forense de memoria',
    valuePhrase: 'Qué ocurre detrás de los procesos cuando Windows parece congelado.',
    coverImage: '/src/assets/images/cover_tomo2_win_1789531499967.jpg',
    pages: 38,
    highlightTopic: 'MATRIZ DE INTERRUPCIONES DPC',
    status: 'DISPONIBLE',
    actionKey: 'magazine-02',
  },
  {
    id: 'mag-03',
    editionNumber: 'EDICIÓN 03',
    title: 'BANCO ATX, POWER RAILS & TERMOGRAFÍA',
    subtitle: 'Líneas de alimentación +12V/+5V, mosfets, caídas de tensión y osciloscopio',
    valuePhrase: 'El diagnóstico visual de placas madre y circuitos de potencia.',
    coverImage: '/src/assets/images/cover_tomo3_tools_1789531512512.jpg',
    pages: 42,
    highlightTopic: 'DESCARTE INSTRUMENTAL EN BANCO',
    status: 'DISPONIBLE',
    actionKey: 'magazine-03',
  },
];

interface EvoMagazineShowcaseProps {
  onOpenMagazine?: () => void;
  onOpenSpecificMagazine?: (editionId: string) => void;
}

export const EvoMagazineShowcase: React.FC<EvoMagazineShowcaseProps> = ({
  onOpenMagazine,
  onOpenSpecificMagazine,
}) => {
  const handleOpen = (editionId: string) => {
    if (onOpenSpecificMagazine) {
      onOpenSpecificMagazine(editionId);
    } else if (onOpenMagazine) {
      onOpenMagazine();
    }
  };

  return (
    <section className="space-y-6 sm:space-y-8 relative">
      {/* Cabecera de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono-tech tracking-widest text-cyan-400 uppercase font-black block">
            PUBLICACIÓN EDITORIAL // REVISTA TÉCNICA
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tight">
            EVO MAGAZINE
          </h2>
          <p className="text-xs text-zinc-400 font-sans-editorial max-w-xl">
            Ediciones periciales con diagramas de doble página, fotografía de microelectrónica y despieces explicados sin simplificaciones vacías.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenMagazine}
          className="px-4 py-2 rounded-xl bg-cyan-400/15 hover:bg-cyan-400/25 border border-cyan-400/40 text-cyan-200 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-sm hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>ABRIR REVISTA A4 →</span>
        </button>
      </div>

      {/* Grid de Ediciones Magazine con formato Mockup Editorial */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {MAGAZINES_DATA.map((mag) => (
          <div
            key={mag.id}
            className="group relative rounded-2xl bg-gradient-to-b from-[#0e121a] via-[#090b10] to-[#07090d] border border-zinc-800 hover:border-cyan-400/50 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden"
          >
            {/* Glow sutil */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-cyan-500/[0.04] blur-3xl pointer-events-none group-hover:bg-cyan-500/[0.1] transition-all" />

            <div className="space-y-4 relative z-10">
              {/* Mockup visual de revista técnica (Doble página / Portada con lomo y relieve) */}
              <div
                onClick={() => handleOpen(mag.id)}
                className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-zinc-800/90 group-hover:border-cyan-400/40 cursor-pointer shadow-lg transition-all"
              >
                <img
                  src={mag.coverImage}
                  alt={mag.title}
                  className="w-full h-full object-cover object-center opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                
                {/* Overlay de gradiente editorial */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

                {/* Pliegue central que simula revista abierta */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 shadow-[0_0_4px_rgba(255,255,255,0.2)] pointer-events-none hidden sm:block" />

                {/* Insignias editoriales */}
                <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono-tech">
                  <span className="px-2 py-0.5 rounded bg-black/80 border border-zinc-700 text-zinc-300 font-bold uppercase">
                    {mag.editionNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 font-bold uppercase">
                    {mag.pages} PÁGINAS A4
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3">
                  <span className="text-[9px] font-mono-tech text-cyan-300 font-bold tracking-widest block uppercase">
                    {mag.highlightTopic}
                  </span>
                </div>
              </div>

              {/* Título y frase de valor */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono-tech text-cyan-400 font-bold uppercase tracking-wider block">
                  {mag.editionNumber} // FORMATO EDITORIAL
                </span>
                <h3 className="font-display font-black text-base sm:text-lg text-white uppercase leading-snug group-hover:text-cyan-200 transition-colors">
                  {mag.title}
                </h3>
                <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed">
                  “{mag.valuePhrase}”
                </p>
              </div>
            </div>

            {/* CTA de Apertura */}
            <div className="pt-3 border-t border-zinc-800/80 relative z-10">
              <button
                type="button"
                onClick={() => handleOpen(mag.id)}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-cyan-400 hover:text-black text-cyan-300 border border-zinc-800 hover:border-cyan-400 font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>ABRIR EDICIÓN →</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
