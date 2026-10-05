import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Activity,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { ProvenanceBadge } from './EvoDiffEngine';

export interface AuditCheckItem {
  id: string;
  category: string;
  tool: string;
  resultText: string;
  isHardwareIssue: boolean;
  checked: boolean;
}

export const EvoFormatDiagnosisLab: React.FC = () => {
  const [auditChecks, setAuditChecks] = useState<AuditCheckItem[]>([
    {
      id: 'chk1',
      category: 'HARDWARE & SMART',
      tool: 'CrystalDiskInfo / SMART Attributes',
      resultText: 'SMART Attribute 05 (Reallocated Sectors Count): 1,420 sectores reasignados. Salud SSD: BAD 10%.',
      isHardwareIssue: true,
      checked: false,
    },
    {
      id: 'chk2',
      category: 'TEMPERATURAS Y VOLTAJE',
      tool: 'HWMonitor / Sensor de Placa',
      resultText: 'Temperatura CPU en reposo: 98°C. Thermal Throttling activo. La bomba de AIO está quemada.',
      isHardwareIssue: true,
      checked: false,
    },
    {
      id: 'chk3',
      category: 'MEMORIA RAM',
      tool: 'mdsched.exe / Windows Memory Diagnostic',
      resultText: 'Errores de paridad detectados en el módulo RAM #2.',
      isHardwareIssue: true,
      checked: false,
    },
    {
      id: 'chk4',
      category: 'SISTEMA DE ARCHIVOS',
      tool: 'sfc /scannow',
      resultText: 'Protección de recursos encontró archivos dañados y los reparó correctamente.',
      isHardwareIssue: false,
      checked: false,
    },
  ]);

  const [decisionMade, setDecisionMade] = useState<'FORMATEAR' | 'DIAGNOSTICAR' | null>(null);

  const handleToggleCheck = (id: string) => {
    setAuditChecks(auditChecks.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)));
  };

  const checkedCount = auditChecks.filter((c) => c.checked).length;
  const hardwareIssuesFound = auditChecks.filter((c) => c.checked && c.isHardwareIssue);

  return (
    <div className="w-full bg-[#05080E] border border-cyan-900/80 rounded-2xl p-4 sm:p-5 space-y-5 shadow-[0_0_50px_rgba(0,210,255,0.12)] font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              FORMATEAR NO ES DIAGNOSTICAR // EVALUACIÓN DE JUSTIFICACIÓN TÉCNICA
            </h3>
            <span className="text-[10px] text-zinc-500">
              DOCTRINA EVO: DESCARTE DE FALLAS DE HARDWARE Y DRIVERS ANTES DE REINSTALAR WINDOWS
            </span>
          </div>
        </div>

        <ProvenanceBadge provenance="SIMULATED" />
      </div>

      {/* Scenario Brief */}
      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-1">
        <span className="text-[10px] text-amber-400 font-bold uppercase block">CASO DE TALLER:</span>
        <p className="text-zinc-200 text-xs font-sans-editorial leading-relaxed">
          El cliente entrega una PC indicando: "Windows anda mal, se traba todo el tiempo y anda lento. Formateámela."
          Como técnico EVO, tenés la opción tentadora de formatear inmediatamente, o auditar los 4 pilares de hardware primero.
        </p>
      </div>

      {/* Pre-Format Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
          <span>CHECKLIST OBLIGATORIO DE AUDITORÍA PRE-FORMATEO:</span>
          <span className="text-emerald-400">{checkedCount} / 4 PUNTOS REVISADOS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {auditChecks.map((chk) => (
            <div
              key={chk.id}
              onClick={() => handleToggleCheck(chk.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                chk.checked
                  ? 'bg-zinc-950 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,210,255,0.15)]'
                  : 'bg-black border-cyan-950 text-zinc-500 hover:border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 uppercase">{chk.category}</span>
                <span className="text-[10px] text-zinc-500">{chk.tool}</span>
              </div>
              <div className="font-bold text-xs text-zinc-200">{chk.category}</div>
              {chk.checked && (
                <div className="p-2 rounded bg-black border border-cyan-900/80 text-[11px] font-mono text-amber-300">
                  {chk.resultText}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decision Prompt */}
      <div className="p-4 rounded-xl bg-black border border-cyan-950 space-y-3">
        <span className="text-xs font-bold text-cyan-300 uppercase block">¿QUÉ DECISIÓN TOMÁS COMO OPERADOR EVO?</span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDecisionMade('FORMATEAR')}
            className="flex-1 py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-500 text-rose-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            FORMATEAR DIRECTAMENTE →
          </button>
          <button
            type="button"
            onClick={() => setDecisionMade('DIAGNOSTICAR')}
            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            REPARAR RAÍZ / CAMBIAR HARDWARE →
          </button>
        </div>

        {decisionMade === 'FORMATEAR' && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-sans-editorial leading-relaxed animate-in fade-in duration-150">
            <strong className="text-rose-400 font-mono font-bold block mb-1">¡INTERVENCIÓN FALLIDA EVO!</strong>
            Formateaste la máquina pero el SSD está muriendo a nivel físico con sectores reasignados (SMART BAD) y la CPU está a 98°C. El cliente se llevará la PC recién formateada y a las 2 horas volverá a colgarse exactamente igual. Formatear no repara discos rígidos ni pastas térmicas secas.
          </div>
        )}

        {decisionMade === 'DIAGNOSTICAR' && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-sans-editorial leading-relaxed animate-in fade-in duration-150">
            <strong className="text-emerald-400 font-mono font-bold block mb-1">¡EXCELENTE CRITERIO PERICIAL!</strong>
            Identificaste que el SSD estaba fallando físicamente y que la CPU sufría throttling por refrigeración. Reemplazaste el SSD, cambiaste el cooler y aplicaste mantenimiento térmico. La máquina recuperó la fluidez sin destruir los datos del cliente innecesariamente.
          </div>
        )}
      </div>
    </div>
  );
};
