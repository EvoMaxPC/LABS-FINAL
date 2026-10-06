import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { EvoMundoWordmark } from '../common/EvoMundoWordmark';

export type PublicSection = 'inicio' | 'catalogo' | 'laboratorios' | 'herramientas' | 'planes';

interface PublicNavbarProps {
  activeSection: PublicSection;
  onNavigateSection: (section: PublicSection) => void;
  onEnterPrivateApp?: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  activeSection,
  onNavigateSection,
  onEnterPrivateApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PublicSection; label: string }[] = [
    { id: 'inicio', label: 'INICIO' },
    { id: 'catalogo', label: 'CATÁLOGO' },
    { id: 'laboratorios', label: 'LABORATORIOS' },
    { id: 'herramientas', label: 'HERRAMIENTAS' },
    { id: 'planes', label: 'PLANES' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07090e]/95 backdrop-blur-md border-b border-zinc-800/80 font-mono-tech select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateSection('inicio')}
            className="flex items-center gap-2 text-left focus:outline-none focus:ring-1 focus:ring-amber-400 rounded-lg p-1 transition-transform active:scale-95 cursor-pointer"
            aria-label="EVO LABS Inicio"
          >
            <EvoMundoWordmark variant="compact" showUniverseBadge={false} />
          </button>
        </div>

        {/* Desktop Navigation Links (Exactly 5 public items) */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-bold tracking-wider" aria-label="Navegación pública">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigateSection(item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={`transition-colors cursor-pointer py-1 ${
                activeSection === item.id
                  ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5'
                  : 'hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Action Button: [ ENTRAR ] */}
        <div className="hidden sm:flex items-center gap-3">
          {onEnterPrivateApp && (
            <button
              type="button"
              onClick={onEnterPrivateApp}
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_22px_rgba(251,191,36,0.5)] cursor-pointer flex items-center gap-1.5"
            >
              <span>ENTRAR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090e] border-b border-zinc-800 px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 text-xs font-bold text-zinc-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateSection(item.id);
                }}
                className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                  activeSection === item.id ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' : 'hover:bg-zinc-900 text-zinc-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800/80">
            {onEnterPrivateApp && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnterPrivateApp();
                }}
                className="w-full py-2.5 rounded-xl bg-amber-400 text-black text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>ENTRAR A MUNDO EVO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
