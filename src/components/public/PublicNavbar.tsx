import React, { useState } from 'react';
import { Sparkles, Menu, X, Shield, ArrowRight, ExternalLink } from 'lucide-react';
import { EvoMundoWordmark } from '../common/EvoMundoWordmark';

interface PublicNavbarProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenAuthPlaceholder?: (mode: 'login' | 'register') => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  onNavigateSection,
  onOpenAuthPlaceholder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07090e]/90 backdrop-blur-md border-b border-zinc-800/80 font-mono-tech select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2 text-left focus:outline-none focus:ring-1 focus:ring-amber-400 rounded-lg p-1 transition-transform active:scale-95 cursor-pointer"
            aria-label="EVO LABS Inicio"
          >
            <EvoMundoWordmark variant="compact" showUniverseBadge={false} />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-medium" aria-label="Navegación principal">
          <button
            type="button"
            onClick={() => handleNavClick('que-es-evo')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            QUÉ ES EVO
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('tomos')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            TOMOS
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('laboratorios')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            LABORATORIOS
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('como-funciona')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            CÓMO FUNCIONA
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('planes')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            PLANES
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            FAQ
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenAuthPlaceholder && onOpenAuthPlaceholder('login')}
            className="px-3.5 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-950/80 text-zinc-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            INICIAR SESIÓN
          </button>
          <button
            type="button"
            onClick={() => onOpenAuthPlaceholder && onOpenAuthPlaceholder('register')}
            className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-black transition-all shadow-[0_0_12px_rgba(251,191,36,0.25)] hover:shadow-[0_0_18px_rgba(251,191,36,0.4)] cursor-pointer flex items-center gap-1.5"
          >
            <span>CREAR CUENTA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
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
          <div className="flex flex-col space-y-2 text-xs font-bold text-zinc-300">
            <button
              type="button"
              onClick={() => handleNavClick('que-es-evo')}
              className="text-left px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              QUÉ ES EVO
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('tomos')}
              className="text-left px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              TOMOS
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('laboratorios')}
              className="text-left px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              LABORATORIOS
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('como-funciona')}
              className="text-left px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              CÓMO FUNCIONA
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('planes')}
              className="text-left px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              PLANES
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="text-left px-3 py-2 rounded-lg hover:bg-zinc-900"
            >
              FAQ
            </button>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAuthPlaceholder) onOpenAuthPlaceholder('login');
              }}
              className="w-full py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 text-xs font-bold text-center"
            >
              INICIAR SESIÓN
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAuthPlaceholder) onOpenAuthPlaceholder('register');
              }}
              className="w-full py-2 rounded-lg bg-amber-400 text-black text-xs font-black text-center"
            >
              CREAR CUENTA →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
