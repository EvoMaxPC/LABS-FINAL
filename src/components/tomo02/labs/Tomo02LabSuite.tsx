import React, { useState } from 'react';
import {
  Terminal,
  Sliders,
  FileCode,
  Layers,
  Activity,
  Wrench,
  HelpCircle,
  Cpu,
  ArrowRight,
  ShieldAlert,
  Award,
  BookOpen
} from 'lucide-react';

import { EvoCommandLab } from './EvoCommandLab';
import { EvoRegistrySandbox } from './EvoRegistrySandbox';
import { EvoServiceLab } from './EvoServiceLab';
import { EvoStartupDnaLab } from './EvoStartupDnaLab';
import { EvoFailureInjectionLab } from './EvoFailureInjectionLab';
import { EvoRecoveryDrillLab } from './EvoRecoveryDrillLab';
import { EvoMitoLab } from './EvoMitoLab';
import { EvoFormatDiagnosisLab } from './EvoFormatDiagnosisLab';
import { ProvenanceBadge } from './EvoDiffEngine';

export type Tomo02LabTab =
  | 'command_lab'
  | 'registry_sandbox'
  | 'service_lab'
  | 'startup_dna'
  | 'failure_injection'
  | 'recovery_drill'
  | 'mito_lab'
  | 'format_diagnosis'
  | 'matrix_lab';

export interface Tomo02LabSuiteProps {
  initialTab?: Tomo02LabTab;
  onOpenWindowsMatrixLab?: (scenario?: string) => void;
  onBackToTomo?: () => void;
}

export const Tomo02LabSuite: React.FC<Tomo02LabSuiteProps> = ({
  initialTab = 'command_lab',
  onOpenWindowsMatrixLab,
  onBackToTomo,
}) => {
  const [activeTab, setActiveTab] = useState<Tomo02LabTab>(initialTab);

  const tabs: { id: Tomo02LabTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'command_lab', label: '1. COMMAND LAB', icon: <Terminal className="w-4 h-4" />, badge: 'CMD/PS' },
    { id: 'registry_sandbox', label: '2. REGISTRY SANDBOX', icon: <FileCode className="w-4 h-4" />, badge: 'REGEDIT' },
    { id: 'service_lab', label: '3. SERVICE LAB', icon: <Sliders className="w-4 h-4" />, badge: 'SERVICES' },
    { id: 'startup_dna', label: '4. STARTUP DNA', icon: <Layers className="w-4 h-4" />, badge: 'BOOT' },
    { id: 'failure_injection', label: '5. FAILURE INJECTION', icon: <Activity className="w-4 h-4" />, badge: '10 FALLAS' },
    { id: 'recovery_drill', label: '6. RECOVERY DRILL', icon: <Wrench className="w-4 h-4" />, badge: 'RESCATE' },
    { id: 'mito_lab', label: '7. MITO LAB', icon: <HelpCircle className="w-4 h-4" />, badge: '6 EXPERIMENTOS' },
    { id: 'format_diagnosis', label: '8. FORMATEO RACIONAL', icon: <ShieldAlert className="w-4 h-4" />, badge: 'AUDITORÍA' },
    { id: 'matrix_lab', label: '9. WINDOWS MATRIX', icon: <Cpu className="w-4 h-4" />, badge: 'SCHEDULER/DPC' },
  ];

  return (
    <div className="w-full space-y-6 font-mono-tech">
      {/* Top Suite Navigation Banner */}
      <div className="bg-[#05080E] border border-cyan-900/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-[0_0_50px_rgba(0,210,255,0.12)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                SUITE DE LABORATORIOS // TOMO 02
              </span>
              <ProvenanceBadge provenance="SIMULATED" />
            </div>
            <h2 className="text-white font-black text-lg sm:text-xl uppercase tracking-tight mt-1">
              LA BIBLIA NEGRA DE WINDOWS // ENTORNO PRÁCTICO SIMULADO
            </h2>
          </div>

          {onBackToTomo && (
            <button
              type="button"
              onClick={onBackToTomo}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-300 text-xs font-bold border border-cyan-900 transition-all cursor-pointer"
            >
              ← VOLVER AL TOMO VIRTUAL
            </button>
          )}
        </div>

        {/* Tab Buttons Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan-950">
          {tabs.map((tb) => {
            const isActive = activeTab === tb.id;
            return (
              <button
                key={tb.id}
                type="button"
                onClick={() => {
                  if (tb.id === 'matrix_lab' && onOpenWindowsMatrixLab) {
                    onOpenWindowsMatrixLab();
                  } else {
                    setActiveTab(tb.id);
                  }
                }}
                className={`shrink-0 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'bg-black/80 text-zinc-400 border-cyan-950 hover:border-cyan-800 hover:text-white'
                }`}
              >
                {tb.icon}
                <span>{tb.label}</span>
                {tb.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isActive ? 'bg-black text-cyan-300' : 'bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {tb.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Lab */}
      <div className="w-full">
        {activeTab === 'command_lab' && <EvoCommandLab />}
        {activeTab === 'registry_sandbox' && <EvoRegistrySandbox />}
        {activeTab === 'service_lab' && <EvoServiceLab />}
        {activeTab === 'startup_dna' && <EvoStartupDnaLab />}
        {activeTab === 'failure_injection' && <EvoFailureInjectionLab />}
        {activeTab === 'recovery_drill' && <EvoRecoveryDrillLab />}
        {activeTab === 'mito_lab' && <EvoMitoLab />}
        {activeTab === 'format_diagnosis' && <EvoFormatDiagnosisLab />}
      </div>
    </div>
  );
};
