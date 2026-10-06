import React, { useState, useRef, useEffect } from 'react';
import { EvoNarrativeProfile, UserHardwarePassport } from '../types';
import {
  Menu,
  Zap,
  Map,
  BookOpen,
  Cpu,
  Layers,
  ChevronDown,
  X,
  Terminal,
  Shield,
  Network,
  Gauge,
  Power,
  FileSearch,
  Compass,
  FolderGit2,
  Trophy,
  Activity,
  Wrench,
  CreditCard,
} from 'lucide-react';
import { EvoOperatingModeSelector } from './common/EvoOperatingModeSelector';
import { EvoAutoDetectPcModal } from './common/EvoAutoDetectPcModal';
import { EvoTomoDossierModal, ForensicBenchTarget } from './common/EvoTomoDossierModal';

export interface HeaderProps {
  currentView?: string;
  activeLabPanel?: string;
  activeLabMission?: string;
  campusSection?: 'campus' | 'escuela' | 'biblioteca' | 'laboratorios' | 'diagnosticar' | 'progreso' | 'herramientas' | 'como-usar' | 'planes';
  onNavigateHome?: () => void;
  onNavigateCampusSection?: (section: 'campus' | 'escuela' | 'biblioteca' | 'laboratorios' | 'diagnosticar' | 'progreso' | 'herramientas' | 'como-usar' | 'planes') => void;
  onNavigateArchive?: () => void;
  onNavigateTomo01?: () => void;
  onNavigateTomo02?: () => void;
  onNavigateTomo03?: () => void;
  onNavigateTomo04?: () => void;
  onNavigateTomo05?: () => void;
  onNavigateTomo06?: () => void;
  onNavigateTomo08?: () => void;
  onNavigateBootLab?: () => void;
  onNavigateMagazine?: () => void;
  onNavigateHotSwapLab?: (subPanel?: 'sandbox' | 'hardware' | 'software' | 'telemetry' | 'all') => void;
  onNavigateWindowsMatrixLab?: () => void;
  onNavigateLabCore?: (phase?: 'SELECT_PC' | 'BUILD_PC' | 'LAB_ACTIVE') => void;
  onOpenDiscoveryModal?: () => void;
  onOpenCoverageDashboard?: () => void;
  onOpenCaseHistory?: () => void;
  onOpenLiveScanAudit?: () => void;
  onOpenForensicBench?: (target: ForensicBenchTarget) => void;
  activeProfile?: EvoNarrativeProfile;
  onReplayIntro?: () => void;
  onHardwareDetected?: (hardware: UserHardwarePassport) => void;
  dossierModalTomoId?: string | null;
  onCloseDossierModal?: () => void;
  onReturnToPublic?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView = 'world-map',
  campusSection = 'campus',
  onNavigateHome,
  onNavigateCampusSection,
  onNavigateTomo01,
  onNavigateTomo02,
  onNavigateTomo03,
  onNavigateTomo04,
  onNavigateTomo05,
  onNavigateTomo06,
  onNavigateTomo08,
  onNavigateBootLab,
  onNavigateMagazine,
  onNavigateHotSwapLab,
  onNavigateWindowsMatrixLab,
  onNavigateLabCore,
  onOpenForensicBench,
  onHardwareDetected,
  dossierModalTomoId = null,
  onCloseDossierModal,
  onReturnToPublic,
}) => {
  const [isAutoDetectOpen, setIsAutoDetectOpen] = useState(false);
  const [internalDossierTomoId, setInternalDossierTomoId] = useState<string | null>(null);

  // Dropdown states for header navigation
  const [openDropdown, setOpenDropdown] = useState<'tomos' | 'labs' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeDossierId = dossierModalTomoId || internalDossierTomoId;

  const handleProceedToTomoView = (id: string) => {
    setInternalDossierTomoId(null);
    if (onCloseDossierModal) onCloseDossierModal();

    const cleanId = id.replace('tomo-', '').padStart(2, '0');
    if (cleanId === '01') {
      if (onNavigateTomo01) onNavigateTomo01();
      else if (onNavigateMagazine) onNavigateMagazine();
    } else if (cleanId === '02' && onNavigateTomo02) {
      onNavigateTomo02();
    } else if (cleanId === '03' && onNavigateTomo03) {
      onNavigateTomo03();
    } else if (cleanId === '04' && onNavigateTomo04) {
      onNavigateTomo04();
    } else if (cleanId === '08' && onNavigateTomo08) {
      onNavigateTomo08();
    } else {
      // Tomos 05, 06, 07, 09, 10 in active roadmap: open technical dossier with 0 dead clicks
      setInternalDossierTomoId(`tomo-${cleanId}`);
    }
  };

  const isTomosActive =
    currentView === 'magazine' ||
    currentView === 'cover' ||
    currentView === 'index' ||
    currentView.startsWith('chapter-') ||
    currentView.startsWith('tomo-');

  const isLabsActive =
    currentView === 'lab-core' ||
    currentView === 'hotswap-lab' ||
    currentView === 'windows-matrix-lab' ||
    currentView === 'boot-lab';

  const isMundoEvoActive = currentView === 'world-map' && campusSection === 'campus';
  const isEscuelaActive =
    (currentView === 'world-map' && (campusSection === 'escuela' || campusSection === 'biblioteca')) || isTomosActive;
  const isPracticarActive =
    (currentView === 'world-map' && campusSection === 'laboratorios') || (isLabsActive && currentView !== 'lab-core');
  const isAnalizarActive =
    (currentView === 'world-map' && campusSection === 'diagnosticar') || currentView === 'lab-core';
  const isHerramientasActive = currentView === 'world-map' && campusSection === 'herramientas';
  const isComoUsarActive = currentView === 'world-map' && campusSection === 'como-usar';
  const isPlanesActive = currentView === 'world-map' && campusSection === 'planes';
  const isMiEvoActive = currentView === 'world-map' && campusSection === 'progreso';
  const isProgresoActive = isMiEvoActive;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-900/90 bg-[#080a0f]/95 backdrop-blur-2xl shadow-xl transition-all print:hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* ========================================================================= */}
          {/* ZONA IZQUIERDA: LOGOTIPO EVO LABS (VUELVE A MUNDO EVO)                   */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                else if (onNavigateCampusSection) onNavigateCampusSection('campus');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (onNavigateHome) onNavigateHome();
                  else if (onNavigateCampusSection) onNavigateCampusSection('campus');
                }
              }}
              className="group flex items-center gap-2.5 sm:gap-3 py-1 cursor-pointer select-none focus:outline-none"
              title="Volver a Mundo EVO // Campus Central"
            >
              {/* Emblema EVO */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1px] shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_22px_rgba(245,158,11,0.55)] transition-all duration-300">
                <div className="w-full h-full bg-[#080a11] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-amber-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6L7.5 8.5V13.5L12 16L16.5 13.5V8.5L12 6Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="12" cy="11" r="1.5" fill="#fef08a" />
                  </svg>
                </div>
              </div>

              {/* Logotipo Tipográfico EVO LABS */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-display font-black text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]">
                    EVO
                  </span>
                  <span className="font-display font-extrabold text-lg tracking-wider text-white">
                    LABS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1 h-1 rounded-full bg-amber-400/80 animate-pulse" />
                  <span className="text-[9px] text-zinc-400 font-mono-tech tracking-widest uppercase font-medium">
                    SISTEMA DE INGENIERÍA Y APRENDIZAJE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ZONA CENTRAL: NAVEGACIÓN SUPERIOR PRINCIPAL (DESKTOP)                      */}
          {/* REGLA: [ INICIO ] [ APRENDER ] [ PRACTICAR ] [ ANALIZAR MI PC ] [ HERRAMIENTAS ] [ CÓMO USAR EVO ] [ PLANES ] */}
          {/* ========================================================================= */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-[#0b0e17]/85 border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.4)] font-mono-tech text-[11px] uppercase tracking-wider font-bold">
            {onReturnToPublic ? (
              <>
                {/* 1. APRENDER */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('escuela');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Aprender // 10 Tomos Maestros y Magazines"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isEscuelaActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>APRENDER</span>
                </button>

                {/* 2. PRACTICAR */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('laboratorios');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Practicar // Suite de Laboratorios e Instrumental"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isPracticarActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>PRACTICAR</span>
                </button>

                {/* 3. ANALIZAR MI PC */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('diagnosticar');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Analizar mi PC // Taller de Diagnóstico y Casos"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isAnalizarActive
                      ? 'bg-gradient-to-b from-purple-500/20 via-purple-500/12 to-purple-500/5 text-purple-200 border border-purple-400/40 font-bold shadow-[0_0_16px_rgba(168,85,247,0.2)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>ANALIZAR MI PC</span>
                </button>

                {/* 4. HERRAMIENTAS */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('herramientas');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Herramientas // Catálogo técnico independiente"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isHerramientasActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>HERRAMIENTAS</span>
                </button>

                {/* 5. MI EVO */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('progreso');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Mi EVO // Expediente e Identidad Técnica"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isMiEvoActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>MI EVO</span>
                </button>
              </>
            ) : (
              <>
                {/* 1. INICIO */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('campus');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Campus Principal EVO LABS"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isMundoEvoActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>INICIO</span>
                </button>

                {/* 2. APRENDER */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('escuela');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Aprender // 10 Tomos Maestros y Magazines"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isEscuelaActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>APRENDER</span>
                </button>

                {/* 3. PRACTICAR */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('laboratorios');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Practicar // Suite de Laboratorios e Instrumental"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isPracticarActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>PRACTICAR</span>
                </button>

                {/* 4. ANALIZAR MI PC */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('diagnosticar');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Analizar mi PC // Taller de Diagnóstico y Casos"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isAnalizarActive
                      ? 'bg-gradient-to-b from-purple-500/20 via-purple-500/12 to-purple-500/5 text-purple-200 border border-purple-400/40 font-bold shadow-[0_0_16px_rgba(168,85,247,0.2)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>ANALIZAR MI PC</span>
                </button>

                {/* 5. HERRAMIENTAS */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('herramientas');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Herramientas // Catálogo técnico independiente"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isHerramientasActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>HERRAMIENTAS</span>
                </button>

                {/* 6. CÓMO USAR EVO */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('como-usar');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Cómo Usar EVO // Metodología y Ecosistema"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isComoUsarActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>CÓMO USAR EVO</span>
                </button>

                {/* 7. PLANES */}
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    if (onNavigateCampusSection) onNavigateCampusSection('planes');
                    else if (onNavigateHome) onNavigateHome();
                  }}
                  title="Planes de Acceso y Precios"
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none group relative ${
                    isPlanesActive
                      ? 'bg-gradient-to-b from-amber-400/20 via-amber-500/12 to-amber-500/5 text-amber-200 border border-amber-400/40 font-bold shadow-[0_0_16px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]'
                  }`}
                >
                  <span>PLANES</span>
                </button>
              </>
            )}
          </nav>

          {/* ========================================================================= */}
          {/* ZONA DERECHA: [ INICIAR SESIÓN ] [ ENTRAR A EVO ] + MENÚ MÓVIL             */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Indicador de Identidad Técnica / Pasaporte */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateCampusSection) onNavigateCampusSection('progreso');
                else if (onNavigateHome) onNavigateHome();
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-amber-400/30 text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer text-xs font-mono-tech select-none"
              title="Mi Identidad Técnica // Expediente y Progreso"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">PASAPORTE</span>
              <span className="text-[11px] font-bold text-amber-300">ACTIVO</span>
            </button>

            {/* Botón de retorno al sitio público EVO LABS */}
            {onReturnToPublic && (
              <button
                type="button"
                onClick={onReturnToPublic}
                className="px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all text-xs font-mono-tech cursor-pointer"
                title="Volver al Sitio Público EVO LABS"
              >
                VOLVER A EVO LABS
              </button>
            )}

            {/* CTA Dominante Directo: ENTRAR A EVO */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateCampusSection) onNavigateCampusSection('escuela');
                else if (onNavigateHome) onNavigateHome();
              }}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono-tech text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            >
              <span>ENTRAR A EVO</span>
            </button>

            {/* Selector de Modo Operativo (Esencial / Pericial) - Quitado visualmente como se requería */}
            <div className="hidden shrink-0">
              <EvoOperatingModeSelector compact />
            </div>

            {/* Mobile Navigation Drawer Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NAVEGACIÓN MÓVIL (MENÚ DESPLEGABLE COMPLETO CON ARQUITECTURA OFICIAL)      */}
        {/* ========================================================================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#07090e]/98 border-b border-white/10 px-4 py-4 space-y-3 font-mono-tech animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-2 pb-1 border-b border-white/[0.06] flex items-center justify-between">
              <span>EVO LABS // NAVEGACIÓN</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 text-xs">
              {/* 1. INICIO */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onNavigateCampusSection) onNavigateCampusSection('campus');
                  else if (onNavigateHome) onNavigateHome();
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  isMundoEvoActive
                    ? 'bg-amber-400/15 text-amber-200 border border-amber-400/40 font-bold'
                    : 'hover:bg-white/[0.06] text-zinc-200 border border-transparent'
                }`}
              >
                <Map className="w-4 h-4 text-amber-400 shrink-0" />
                <span>INICIO</span>
              </button>

              {/* 2. APRENDER */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onNavigateCampusSection) onNavigateCampusSection('escuela');
                  else if (onNavigateHome) onNavigateHome();
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  isEscuelaActive
                    ? 'bg-amber-400/15 text-amber-200 border border-amber-400/40 font-bold'
                    : 'hover:bg-white/[0.06] text-zinc-200 border border-transparent'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span>APRENDER</span>
              </button>

              {/* 3. PRACTICAR */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onNavigateCampusSection) onNavigateCampusSection('laboratorios');
                  else if (onNavigateHome) onNavigateHome();
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  isPracticarActive
                    ? 'bg-amber-400/15 text-amber-200 border border-amber-400/40 font-bold'
                    : 'hover:bg-white/[0.06] text-zinc-200 border border-transparent'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>PRACTICAR</span>
              </button>

              {/* 4. ANALIZAR MI PC */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onNavigateCampusSection) onNavigateCampusSection('diagnosticar');
                  else if (onNavigateHome) onNavigateHome();
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  isAnalizarActive
                    ? 'bg-purple-500/15 text-purple-200 border border-purple-400/40 font-bold'
                    : 'hover:bg-white/[0.06] text-zinc-200 border border-transparent'
                }`}
              >
                <Activity className="w-4 h-4 text-purple-400 shrink-0" />
                <span>ANALIZAR MI PC</span>
              </button>

              {/* 5. HERRAMIENTAS */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onNavigateCampusSection) onNavigateCampusSection('herramientas');
                  else if (onNavigateHome) onNavigateHome();
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  isHerramientasActive
                    ? 'bg-amber-400/15 text-amber-200 border border-amber-400/40 font-bold'
                    : 'hover:bg-white/[0.06] text-zinc-200 border border-transparent'
                }`}
              >
                <Gauge className="w-4 h-4 text-amber-400 shrink-0" />
                <span>HERRAMIENTAS</span>
              </button>

              {/* 6. CÓMO USAR EVO */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onNavigateCampusSection) onNavigateCampusSection('como-usar');
                  else if (onNavigateHome) onNavigateHome();
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  isComoUsarActive
                    ? 'bg-amber-400/15 text-amber-200 border border-amber-400/40 font-bold'
                    : 'hover:bg-white/[0.06] text-zinc-200 border border-transparent'
                }`}
              >
                <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                <span>CÓMO USAR EVO</span>
              </button>

              {/* 7. PLANES */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onNavigateCampusSection) onNavigateCampusSection('planes');
                  else if (onNavigateHome) onNavigateHome();
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  isPlanesActive
                    ? 'bg-amber-400/15 text-amber-200 border border-amber-400/40 font-bold'
                    : 'hover:bg-white/[0.06] text-zinc-200 border border-transparent'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
                <span>PLANES</span>
              </button>

              {/* 8. MI EVO */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onNavigateCampusSection) onNavigateCampusSection('progreso');
                  else if (onNavigateHome) onNavigateHome();
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  isMiEvoActive
                    ? 'bg-amber-400/15 text-amber-200 border border-amber-400/40 font-bold'
                    : 'hover:bg-white/[0.06] text-zinc-200 border border-transparent'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <span>MI EVO (EXPEDIENTE)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Auto-Detect PC Modal (Conservado para funcionalidad interna / diagnóstico) */}
      <EvoAutoDetectPcModal
        isOpen={isAutoDetectOpen}
        onClose={() => setIsAutoDetectOpen(false)}
        onHardwareDetected={(hw) => {
          if (onHardwareDetected) onHardwareDetected(hw);
        }}
      />

      {/* Tomo Dossier Modal for T01 to T10 */}
      <EvoTomoDossierModal
        isOpen={!!activeDossierId}
        tomoId={activeDossierId}
        onClose={() => {
          setInternalDossierTomoId(null);
          if (onCloseDossierModal) onCloseDossierModal();
        }}
        onOpenTomoView={handleProceedToTomoView}
        onOpenForensicBench={(target) => {
          setInternalDossierTomoId(null);
          if (onCloseDossierModal) onCloseDossierModal();
          if (onOpenForensicBench) onOpenForensicBench(target);
        }}
      />
    </>
  );
};
