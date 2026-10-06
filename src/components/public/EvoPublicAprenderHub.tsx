import React, { useState } from 'react';
import { BookOpen, FileText } from 'lucide-react';
import { EvoPublicTomosCatalog } from './EvoPublicTomosCatalog';
import { EvoPublicMagazinesCatalog } from './EvoPublicMagazinesCatalog';

interface EvoPublicAprenderHubProps {
  initialTab?: 'tomos' | 'magazines';
  onOpenTomo: (tomoNumber: string) => void;
  onOpenMagazineTomo01: () => void;
  onOpenMagazineTomo02: () => void;
  onOpenMagazineTomo03: () => void;
  onOpenMagazineTomo04: () => void;
  onOpenMagazineTomo08: () => void;
}

export const EvoPublicAprenderHub: React.FC<EvoPublicAprenderHubProps> = ({
  initialTab = 'tomos',
  onOpenTomo,
  onOpenMagazineTomo01,
  onOpenMagazineTomo02,
  onOpenMagazineTomo03,
  onOpenMagazineTomo04,
  onOpenMagazineTomo08,
}) => {
  const [activeTab, setActiveTab] = useState<'tomos' | 'magazines'>(initialTab);

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* HUB HEADER & SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="space-y-1">
          <span className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase font-black block">
            APRENDER EN EVO LABS
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            BIBLIOTECA & PUBLICACIONES TÉCNICAS
          </h1>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 font-mono-tech text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('tomos')}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'tomos'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>10 TOMOS</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('magazines')}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'magazines'
                ? 'bg-cyan-400 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>MAGAZINES</span>
          </button>
        </div>
      </div>

      {/* VIEW RENDER */}
      {activeTab === 'tomos' ? (
        <EvoPublicTomosCatalog onOpenTomo={onOpenTomo} />
      ) : (
        <EvoPublicMagazinesCatalog
          onOpenMagazineTomo01={onOpenMagazineTomo01}
          onOpenMagazineTomo02={onOpenMagazineTomo02}
          onOpenMagazineTomo03={onOpenMagazineTomo03}
          onOpenMagazineTomo04={onOpenMagazineTomo04}
          onOpenMagazineTomo08={onOpenMagazineTomo08}
        />
      )}
    </div>
  );
};
