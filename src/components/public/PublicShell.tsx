import React, { useState, useEffect } from 'react';
import { PublicNavbar, PublicSection } from './PublicNavbar';
import { PublicLanding } from './PublicLanding';
import { EvoPublicAprenderHub } from './EvoPublicAprenderHub';
import { EvoPublicLabsCatalog } from './EvoPublicLabsCatalog';
import { EvoPublicToolsCatalog } from './EvoPublicToolsCatalog';
import { EvoPublicPricing } from './EvoPublicPricing';
import { PublicFooter } from './PublicFooter';
import { EVO_PRICING, EvoPriceItem } from '../../data/evoPricing';
import { EvoPlanConfiguratorModal } from '../commerce/EvoPlanConfiguratorModal';
import { EvoOrderSummaryModal } from '../commerce/EvoOrderSummaryModal';

export type PublicNavigationTarget =
  | { type: 'APP_HOME' }
  | { type: 'TOME'; tomeNumber: string }
  | { type: 'BOOT_LAB' }
  | { type: 'HOTSWAP'; subPanel?: string }
  | { type: 'WINDOWS_MATRIX'; scenario?: string }
  | { type: 'WINDOWS_XRAY'; scenario?: string }
  | { type: 'LAB_CORE'; phase?: string }
  | { type: 'CAMPUS_ZONE'; zoneId: string }
  | { type: 'TOOL'; toolId: string }
  | { type: 'APP_SECTION'; section: string };

interface PublicShellProps {
  initialSection?: PublicSection;
  onEnterPrivateApp?: (authContext?: string) => void;
  onNavigateTarget?: (target: PublicNavigationTarget) => void;
}

export const PublicShell: React.FC<PublicShellProps> = ({
  initialSection = 'inicio',
  onEnterPrivateApp,
  onNavigateTarget,
}) => {
  const [activeSection, setActiveSection] = useState<PublicSection>(initialSection);

  // Commerce Modals State
  const [configuratorProduct, setConfiguratorProduct] = useState<EvoPriceItem | null>(null);
  const [summaryProduct, setSummaryProduct] = useState<EvoPriceItem | null>(null);
  const [summaryTomeIds, setSummaryTomeIds] = useState<string[]>([]);

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  const handleSelectPlan = (planId: string) => {
    const product = Object.values(EVO_PRICING).find((p) => p.id === planId);
    if (!product) return;

    if (product.selectionRule) {
      setConfiguratorProduct(product);
    } else {
      setSummaryProduct(product);
      setSummaryTomeIds([]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07090e] text-zinc-100 flex flex-col relative font-sans-editorial select-none">
      
      {/* 1. Public Navbar */}
      <PublicNavbar
        activeSection={activeSection}
        onNavigateSection={(section) => {
          setActiveSection(section);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onEnterPrivateApp={() => onEnterPrivateApp?.()}
      />

      {/* 2. Public Content Stage */}
      <main className="flex-1 w-full">
        {activeSection === 'inicio' && (
          <PublicLanding
            onExploreClick={() => setActiveSection('catalogo')}
            onMethodClick={() => setActiveSection('inicio')}
            onOpenAuthPlaceholder={() => onEnterPrivateApp?.()}
            onOpenTomo={(tomeNum) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: tomeNum });
              }
            }}
          />
        )}
        {activeSection === 'catalogo' && (
          <EvoPublicAprenderHub
            onOpenTomo={(tomeNum) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: tomeNum });
              }
            }}
            onOpenMagazineTomo01={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '01' });
              }
            }}
            onOpenMagazineTomo02={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '02' });
              }
            }}
            onOpenMagazineTomo03={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '03' });
              }
            }}
            onOpenMagazineTomo04={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '04' });
              }
            }}
            onOpenMagazineTomo08={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '08' });
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
            onOpenWindowsXRayLab={(scenario) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'WINDOWS_XRAY', scenario });
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
            onOpenCampusLab={(labId) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'CAMPUS_ZONE', zoneId: labId });
              }
            }}
            onOpenTomo={(tomeNum) => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: tomeNum });
              }
            }}
            onOpenCaseResolver={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOOL', toolId: 'diag-case-resolver' });
              }
            }}
            onOpenDigitalTwin={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOOL', toolId: 'inv-digital-twin' });
              }
            }}
            onOpenTransferChallenge={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOOL', toolId: 'doc-transfer-challenge' });
              }
            }}
            onOpenPerfMetrology={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOOL', toolId: 'med-frametime-analyzer' });
              }
            }}
            onOpenNetForensics={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '05' });
              }
            }}
            onOpenDefensiveSec={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '06' });
              }
            }}
            onOpenCodeEng={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '09' });
              }
            }}
            onOpenAiSystems={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '10' });
              }
            }}
            onOpenGameForge={() => {
              if (onNavigateTarget) {
                onNavigateTarget({ type: 'TOME', tomeNumber: '12' });
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
            onSelectPlan={handleSelectPlan}
            onSelectTomoOption={() => setActiveSection('catalogo')}
          />
        )}
      </main>

      {/* 3. Public Footer */}
      <PublicFooter />

      {/* 4. Plan Configurator Modal (e.g. Pack 3 Tomos) */}
      {configuratorProduct && (
        <EvoPlanConfiguratorModal
          product={configuratorProduct}
          isOpen={true}
          onClose={() => setConfiguratorProduct(null)}
          onProceedToSummary={(tomeIds) => {
            const prod = configuratorProduct;
            setConfiguratorProduct(null);
            setSummaryProduct(prod);
            setSummaryTomeIds(tomeIds);
          }}
        />
      )}

      {/* 5. Order Summary Modal */}
      {summaryProduct && (
        <EvoOrderSummaryModal
          product={summaryProduct}
          selectedTomeIds={summaryTomeIds}
          isOpen={true}
          onClose={() => setSummaryProduct(null)}
          onChangeSelection={() => {
            const prod = summaryProduct;
            setSummaryProduct(null);
            if (prod.selectionRule) {
              setConfiguratorProduct(prod);
            } else {
              setActiveSection('planes');
            }
          }}
          onRequireAuthToCheckout={(_productId, _tomeIds) => {
            setSummaryProduct(null);
            onEnterPrivateApp?.("Creá tu cuenta o iniciá sesión para continuar con la compra.");
          }}
        />
      )}

    </div>
  );
};
