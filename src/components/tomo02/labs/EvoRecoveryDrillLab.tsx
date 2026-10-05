import React, { useState } from 'react';
import {
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Activity,
  Layers,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { ProvenanceBadge } from './EvoDiffEngine';

export interface RecoveryScenario {
  id: string;
  title: string;
  description: string;
  correctTools: string[];
  explanation: string;
}

export const RECOVERY_SCENARIOS: RecoveryScenario[] = [
  {
    id: 'rec1',
    title: 'CASO A // PANTALLA NEGRA TRAS INSTALAR DRIVER BETA',
    description: 'Windows inicia sesión pero la pantalla queda en negro tras instalar un controlador no firmado de GPU. El cursor del mouse se mueve.',
    correctTools: ['Modo Seguro', 'Rollback Driver'],
    explanation: 'Excelente orden: Iniciar en Modo Seguro (que carga VGA genérico) y ejecutar Rollback Driver o Desinstalar Dispositivo en devmgmt.msc.',
  },
  {
    id: 'rec2',
    title: 'CASO B // BUCLE 0XC000000F TRAS ACTUALIZACIÓN LCU',
    description: 'Windows no arranca y se detiene en la pantalla azul de recuperación WinRE indicando que BCD no encuentra winload.efi.',
    correctTools: ['WinRE', 'Startup Repair', 'SFC'],
    explanation: 'Excelente: Desde la consola WinRE se reconstruye el almacén BCD con bcdboot y se verifica la integridad con SFC /offbootdir.',
  },
  {
    id: 'rec3',
    title: 'CASO C // ARCHIVOS PROTEGIDOS DE SYSTEM32 DAÑADOS',
    description: 'Aplicaciones nativas cierran con error de excepción. Windows entra al escritorio pero varios servicios fallan al iniciar.',
    correctTools: ['DISM', 'SFC'],
    explanation: 'El orden inquebrantable EVO: Primero DISM /Online /Cleanup-Image /RestoreHealth para sanear la fuente WinSxS, y luego SFC /scannow.',
  },
  {
    id: 'rec4',
    title: 'CASO D // INCONSISTENCIAS DE CLÚSTERS EN NTFS',
    description: 'Al intentar guardar archivos aparece el error "El archivo o directorio está dañado o es ilegible".',
    correctTools: ['CHKDSK'],
    explanation: 'CHKDSK examina y repara la Master File Table (MFT) y verifica índices de NTFS.',
  },
];

export const AVAILABLE_RECOVERY_TOOLS = [
  'Modo Seguro',
  'WinRE',
  'Startup Repair',
  'System Restore',
  'Uninstall Update',
  'Rollback Driver',
  'SFC',
  'DISM',
  'CHKDSK',
];

export const EvoRecoveryDrillLab: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<RecoveryScenario>(RECOVERY_SCENARIOS[0]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);

  const toggleTool = (tool: string) => {
    if (isEvaluated) return;
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter((t) => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleEvaluate = () => {
    setIsEvaluated(true);
  };

  const handleReset = (scen: RecoveryScenario) => {
    setSelectedScenario(scen);
    setSelectedTools([]);
    setIsEvaluated(false);
  };

  const isCorrect =
    selectedScenario.correctTools.every((t) => selectedTools.includes(t)) &&
    selectedTools.length === selectedScenario.correctTools.length;

  return (
    <div className="w-full bg-[#05080E] border border-cyan-900/80 rounded-2xl p-4 sm:p-5 space-y-5 shadow-[0_0_50px_rgba(0,210,255,0.12)] font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950 pb-3">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              EVO RECOVERY DRILL // SIMULADOR DE HERRAMIENTAS DE RESCATE
            </h3>
            <span className="text-[10px] text-zinc-500">
              SELECCIÓN PRECISA DE HERRAMIENTAS Y SECUENCIA DE RECUPERACIÓN NO DESTRUCTIVA
            </span>
          </div>
        </div>

        <ProvenanceBadge provenance="SIMULATED" />
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
        {RECOVERY_SCENARIOS.map((scen) => (
          <button
            key={scen.id}
            type="button"
            onClick={() => handleReset(scen)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedScenario.id === scen.id
                ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                : 'bg-black border-cyan-950 text-zinc-400 hover:text-white'
            }`}
          >
            <div className="text-[11px] font-bold text-white">{scen.title}</div>
          </button>
        ))}
      </div>

      {/* Main Execution Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[340px]">
        <div className="lg:col-span-2 bg-[#020408] border border-cyan-950 rounded-xl p-4 space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-1">
            <span className="text-[10px] text-amber-400 font-bold uppercase block">DESCRIPCIÓN DE LA CRUNCH DE RECUPERACIÓN:</span>
            <p className="text-zinc-200 text-xs font-sans-editorial leading-relaxed">
              {selectedScenario.description}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase block">
              SELECCIONÁ LAS HERRAMIENTAS CORRECTAS PARA ESTE CASO (EN ORDEN):
            </span>

            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_RECOVERY_TOOLS.map((tool) => {
                const isSelected = selectedTools.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleTool(tool)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_10px_rgba(0,210,255,0.4)]'
                        : 'bg-black text-zinc-300 border-cyan-950 hover:border-cyan-800'
                    }`}
                  >
                    {tool}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-cyan-950">
            <button
              type="button"
              disabled={selectedTools.length === 0}
              onClick={handleEvaluate}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40"
            >
              EVALUAR ESTRATEGIA DE RECUPERACIÓN →
            </button>
          </div>

          {isEvaluated && (
            <div
              className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-150 ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/80 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                <span>{isCorrect ? '¡SELECCIÓN EXCELENTE!' : 'ESTRATEGIA INCOMPLETA O INCORRECTA'}</span>
              </div>
              <p className="text-xs font-sans-editorial leading-relaxed text-zinc-200">
                {selectedScenario.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="bg-[#020408] border border-cyan-950 rounded-xl p-4 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block border-b border-cyan-950 pb-2">
            HERRAMIENTAS SELECCIONADAS:
          </span>

          <div className="space-y-1.5 font-mono text-xs">
            {selectedTools.map((st, idx) => (
              <div key={st} className="p-2 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-200 flex items-center justify-between">
                <span>{idx + 1}. {st}</span>
                <span className="text-[10px] text-emerald-400">Seleccionado</span>
              </div>
            ))}
            {selectedTools.length === 0 && (
              <span className="text-zinc-500 text-xs font-sans-editorial">Aún no seleccionaste ninguna herramienta de rescate.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
