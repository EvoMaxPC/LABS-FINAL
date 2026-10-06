import React, { useState } from 'react';
import { PublicNavbar, PublicSection } from './PublicNavbar';
import { PublicLanding } from './PublicLanding';
import { EvoPublicTomosCatalog } from './EvoPublicTomosCatalog';
import { EvoPublicLabsCatalog } from './EvoPublicLabsCatalog';
import { EvoPublicToolsCatalog } from './EvoPublicToolsCatalog';
import { EvoPublicPricing } from './EvoPublicPricing';
import { PublicFooter } from './PublicFooter';

export type PublicNavigationTarget =
  | { type: 'APP_HOME' }
  | { type: 'TOME'; tomeNumber: string }
  | { type: 'BOOT_LAB' }
  | { type: 'HOTSWAP'; subPanel?: string }
  | { type: 'WINDOWS_MATRIX'; scenario?: string }
  | { type: 'LAB_CORE'; phase?: string }
  | { type: 'TOOL'; toolId: string }
  | { type: 'APP_SECTION'; section: string };

interface PublicShellProps {
  onEnterPrivateApp?: () => void;
  onNavigateTarget?: (target: PublicNavigationTarget) => void;
}

export const PublicShell: React.FC<PublicShellProps> = ({ onEnterPrivateApp, onNavigateTarget }) => {
  const [activeSection, setActiveSection] = useState<PublicSection>('inicio');

  return (
    <div className="min-h-screen w-full bg-[#07090e] text-zinc-100 flex flex-col relative font-sans-editorial select-none">
      
      {/* 1. Public Navbar (6 items: INICIO, CATÁLOGO, LABORATORIOS, HERRAMIENTAS, PLANES, [ ENTRAR ]) */}
      <PublicNavbar
        activeSection={activeSection}
        onNavigateSection={(section) => {
          setActiveSection(section);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onEnterPrivateApp={onEnterPrivateApp}
      />

      {/* 2. Public Content Stage */}
      <main className="flex-1 w-full">
        {activeSection === 'inicio' && (
          <PublicLanding
            onExploreClick={() => setActiveSection('catalogo')}
            onMethodClick={() => setActiveSection('inicio')}
            onOpenAuthPlaceholder={onEnterPrivateApp}
            onOpenTomo={(tomeNum) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: tomeNum });
              }
            }}
          />
        )}
        {activeSection === 'catalogo' && (
          <EvoPublicTomosCatalog
            onOpenTomo={(tomeNum) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: tomeNum });
              }
            }}
          />
        )}
        {activeSection === 'laboratorios' && (
          <EvoPublicLabsCatalog
            onOpenHotSwapLab={(subPanel) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'HOTSWAP', subPanel: subPanel || 'hardware' });
              }
            }}
            onOpenWindowsMatrixLab={(scenario) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'WINDOWS_MATRIX', scenario });
              }
            }}
            onOpenBootLab={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'BOOT_LAB' });
              }
            }}
            onOpenLabCore={(phase) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'LAB_CORE', phase: phase || 'SELECT_PC' });
              }
            }}
            onOpenCampusLab={(_labId) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'HOTSWAP', subPanel: 'all' });
              }
            }}
          />
        )}
        {activeSection === 'herramientas' && (
          <EvoPublicToolsCatalog
            onExecuteToolAction={(tool) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOOL', toolId: tool.id });
              }
            }}
          />
        )}
        {activeSection === 'planes' && (
          <EvoPublicPricing
            onSelectPlan={(_planId) => {
              if (onEnterPrivateApp) onEnterPrivateApp();
            }}
            onSelectTomoOption={() => setActiveSection('catalogo')}
          />
        )}
      </main>

      {/* 3. Public Footer */}
      <PublicFooter />

    </div>
  );
};
