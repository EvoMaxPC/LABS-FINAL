import React, { useState } from 'react';
import { PublicNavbar, PublicSection } from './PublicNavbar';
import { PublicLanding } from './PublicLanding';
import { EvoPublicTomosCatalog } from './EvoPublicTomosCatalog';
import { EvoPublicLabsCatalog } from './EvoPublicLabsCatalog';
import { EvoPublicToolsCatalog } from './EvoPublicToolsCatalog';
import { EvoPublicPricing } from './EvoPublicPricing';
import { PublicFooter } from './PublicFooter';

interface PublicShellProps {
  onEnterPrivateApp?: () => void;
}

export const PublicShell: React.FC<PublicShellProps> = ({ onEnterPrivateApp }) => {
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
          />
        )}
        {activeSection === 'catalogo' && <EvoPublicTomosCatalog />}
        {activeSection === 'laboratorios' && <EvoPublicLabsCatalog />}
        {activeSection === 'herramientas' && <EvoPublicToolsCatalog />}
        {activeSection === 'planes' && <EvoPublicPricing />}
      </main>

      {/* 3. Public Footer */}
      <PublicFooter />

    </div>
  );
};
