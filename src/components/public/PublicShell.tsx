import React, { useState } from 'react';
import { PublicNavbar } from './PublicNavbar';
import { PublicLanding } from './PublicLanding';
import { PublicFooter } from './PublicFooter';
import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PublicShellProps {
  onEnterPrivateApp?: () => void;
}

export const PublicShell: React.FC<PublicShellProps> = ({ onEnterPrivateApp }) => {
  const [authPlaceholderModal, setAuthPlaceholderModal] = useState<'login' | 'register' | null>(null);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthPlaceholderModal(mode);
  };

  const handleCloseAuth = () => {
    setAuthPlaceholderModal(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#07090e] text-zinc-100 flex flex-col relative font-sans-editorial select-none">
      
      {/* 1. Public Navbar */}
      <PublicNavbar
        onOpenAuthPlaceholder={handleOpenAuth}
        onNavigateSection={(sectionId) => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Public Content Stage */}
      <main className="flex-1 w-full">
        <PublicLanding
          onExploreClick={() => {
            const el = document.getElementById('tomos');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onMethodClick={() => {
            const el = document.getElementById('como-funciona');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAuthPlaceholder={handleOpenAuth}
        />
      </main>

      {/* 3. Public Footer */}
      <PublicFooter />

      {/* 4. Non-Destructive Auth Placeholder Modal */}
      {authPlaceholderModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={authPlaceholderModal === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 font-mono-tech"
        >
          <div className="relative w-full max-w-md bg-[#0c0f17] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase">
                  {authPlaceholderModal === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA // FASE A'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseAuth}
                className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-sans-editorial text-xs text-zinc-300">
              <p>
                El sistema de autenticación central y cuentas de usuario se integrará en la <strong className="text-amber-400">Fase D</strong> de la arquitectura comercial.
              </p>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 font-mono-tech text-[11px] text-zinc-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>MODO ACCESO DIRECTO DISPONIBLE</span>
                </div>
                <p>
                  Podés ingresar directamente a la consola operativa de <strong>MUNDO EVO</strong> sin credenciales en esta etapa de desarrollo.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {onEnterPrivateApp && (
                <button
                  type="button"
                  onClick={() => {
                    handleCloseAuth();
                    onEnterPrivateApp();
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                >
                  <span>INGRESAR A MUNDO EVO →</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleCloseAuth}
                className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                CERRAR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
