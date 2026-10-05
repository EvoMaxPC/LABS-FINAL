import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  Activity,
  FileText,
  Sliders,
  Layers
} from 'lucide-react';

export type DataProvenance =
  | 'MEASURED'
  | 'SYSTEM_REPORTED'
  | 'DERIVED'
  | 'ESTIMATED'
  | 'SIMULATED'
  | 'UNKNOWN';

export interface DiffItem {
  id: string;
  category: string;
  key: string;
  beforeValue: string;
  afterValue: string;
  status: 'added' | 'removed' | 'modified' | 'unchanged';
  provenance: DataProvenance;
  simulatedEffect?: string;
  riskLevel?: 'BAJO' | 'MEDIO' | 'ALTO' | 'CRÍTICO';
  reversibility?: string;
}

export const ProvenanceBadge: React.FC<{ provenance: DataProvenance }> = ({ provenance }) => {
  const styles: Record<DataProvenance, { bg: string; text: string; border: string }> = {
    MEASURED: { bg: 'bg-emerald-950/80', text: 'text-emerald-400', border: 'border-emerald-500/50' },
    SYSTEM_REPORTED: { bg: 'bg-cyan-950/80', text: 'text-cyan-400', border: 'border-cyan-500/50' },
    DERIVED: { bg: 'bg-blue-950/80', text: 'text-blue-400', border: 'border-blue-500/50' },
    ESTIMATED: { bg: 'bg-amber-950/80', text: 'text-amber-400', border: 'border-amber-500/50' },
    SIMULATED: { bg: 'bg-purple-950/80', text: 'text-purple-300', border: 'border-purple-500/50' },
    UNKNOWN: { bg: 'bg-zinc-900', text: 'text-zinc-400', border: 'border-zinc-700' },
  };

  const style = styles[provenance] || styles.SIMULATED;

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono-tech font-bold uppercase border ${style.bg} ${style.text} ${style.border}`}
    >
      [{provenance}]
    </span>
  );
};

export interface EvidenceRailProps {
  currentStage: 'OBSERVACIÓN' | 'PRUEBA' | 'RESULTADO' | 'CONCLUSIÓN';
  stagesCompleted?: {
    observation: boolean;
    test: boolean;
    result: boolean;
    conclusion: boolean;
  };
}

export const EvidenceRail: React.FC<EvidenceRailProps> = ({ currentStage, stagesCompleted }) => {
  const stages = [
    { key: 'OBSERVACIÓN', label: '1. OBSERVACIÓN' },
    { key: 'PRUEBA', label: '2. PRUEBA / MEDICIÓN' },
    { key: 'RESULTADO', label: '3. RESULTADO DELTA' },
    { key: 'CONCLUSIÓN', label: '4. CONCLUSIÓN' },
  ];

  return (
    <div className="w-full bg-black/60 border border-cyan-950 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px] font-mono-tech text-cyan-400 uppercase tracking-widest font-bold">
        <span>EVVIDENCE RAIL // PROTOCOLO DE INVESTIGACIÓN EVO</span>
        <span className="text-zinc-500">FASE: {currentStage}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono-tech text-xs">
        {stages.map((st, idx) => {
          const isActive = currentStage === st.key;
          const isDone =
            (st.key === 'OBSERVACIÓN' && stagesCompleted?.observation) ||
            (st.key === 'PRUEBA' && stagesCompleted?.test) ||
            (st.key === 'RESULTADO' && stagesCompleted?.result) ||
            (st.key === 'CONCLUSIÓN' && stagesCompleted?.conclusion);

          return (
            <div
              key={st.key}
              className={`p-2 rounded-lg border text-center transition-all ${
                isActive
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,210,255,0.2)]'
                  : isDone
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                  : 'bg-zinc-950/60 border-zinc-900 text-zinc-600'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-mono">{idx + 1}</span>
                )}
                <span className="text-[11px] uppercase tracking-tight">{st.key}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export interface NoBorresTodaviaModalProps {
  isOpen: boolean;
  actionTitle: string;
  actionType: 'BORRAR' | 'DESHABILITAR' | 'DESINSTALAR' | 'FORMATEAR' | 'EDITAR_REGISTRO';
  onConfirm: (evidenceLevel: 'NO_MEDI' | 'SINTOMA' | 'MEDICION' | 'CAUSA_CONFIRMADA') => void;
  onCancel: () => void;
}

export const NoBorresTodaviaModal: React.FC<NoBorresTodaviaModalProps> = ({
  isOpen,
  actionTitle,
  actionType,
  onConfirm,
  onCancel,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<
    'NO_MEDI' | 'SINTOMA' | 'MEDICION' | 'CAUSA_CONFIRMADA' | null
  >(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#080B12] border-2 border-amber-500/80 rounded-2xl p-5 sm:p-6 space-y-5 shadow-[0_0_50px_rgba(245,158,11,0.25)] font-mono-tech animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 border-b border-amber-500/30 pb-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
              DOCTRINA EVO // ¡NO TOUCH A CIEGAS!
            </span>
            <h3 className="text-white font-bold text-base uppercase tracking-tight">
              ¿QUÉ EVIDENCIA TENÉS PARA {actionType}?
            </h3>
          </div>
        </div>

        <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed">
          Estás por ejecutar la acción agresiva: <strong className="text-amber-300 font-mono">{actionTitle}</strong>.
          En la metodología EVO, actuar sin mediciones previas genera intervenciones a ciegas.
        </p>

        <div className="space-y-2">
          <span className="text-[11px] text-zinc-400 font-bold uppercase block">
            SELECCIONÁ TU NIVEL DE EVIDENCIA ACTUAL:
          </span>

          <button
            type="button"
            onClick={() => setSelectedLevel('NO_MEDI')}
            className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedLevel === 'NO_MEDI'
                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="font-bold text-xs uppercase text-rose-400 flex items-center justify-between">
              <span>1. NO MEDÍ NADA (SÓLO ADIVINANZA O MITO)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-900/60">ALTO RIESGO</span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans-editorial mt-1">
              "Leí en internet que deshabilitar esto aceleraba Windows." (Acción prematura).
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedLevel('SINTOMA')}
            className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedLevel === 'SINTOMA'
                ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="font-bold text-xs uppercase text-amber-400 flex items-center justify-between">
              <span>2. TENGO UN SÍNTOMA (EJ. PANTALLA TRABADA O FPS BAJOS)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-900/60">INCOMPLETO</span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans-editorial mt-1">
              "La PC está lenta, pero todavía no identifiqué el proceso ni el driver culpable."
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedLevel('MEDICION')}
            className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedLevel === 'MEDICION'
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="font-bold text-xs uppercase text-cyan-400 flex items-center justify-between">
              <span>3. TENGO UNA MEDICIÓN (REGISTRO METROLÓGICO CRUDO)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-900/60">BUENO</span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans-editorial mt-1">
              "Medí latencia DPC de 2800µs o tiempo de I/O de disco de 1800ms."
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedLevel('CAUSA_CONFIRMADA')}
            className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedLevel === 'CAUSA_CONFIRMADA'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="font-bold text-xs uppercase text-emerald-400 flex items-center justify-between">
              <span>4. CONFIRMÉ LA CAUSA DE RAÍZ Y TENGO BACKUP DE ROLLBACK</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/60">ÓPTIMO EVO</span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans-editorial mt-1">
              "Aislé el proceso/driver exacto, registré el estado A y puedo revertir si falla."
            </p>
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition-all cursor-pointer"
          >
            CANCELAR & MEDIR PRIMERO
          </button>
          <button
            type="button"
            disabled={!selectedLevel}
            onClick={() => selectedLevel && onConfirm(selectedLevel)}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            PROCEDER CON RESPONSABILIDAD →
          </button>
        </div>
      </div>
    </div>
  );
};

export interface EvoDiffViewerProps {
  items: DiffItem[];
  title?: string;
  onRestoreSnapshot?: () => void;
}

export const EvoDiffViewer: React.FC<EvoDiffViewerProps> = ({
  items,
  title = 'EVO DIFF // COMPARADOR ANTES vs DESPUÉS',
  onRestoreSnapshot,
}) => {
  return (
    <div className="w-full bg-black/90 border border-cyan-900/80 rounded-2xl p-4 sm:p-5 space-y-4 font-mono-tech text-xs shadow-[0_0_30px_rgba(0,210,255,0.1)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h4 className="text-white font-bold uppercase tracking-tight text-sm">{title}</h4>
        </div>
        {onRestoreSnapshot && (
          <button
            type="button"
            onClick={onRestoreSnapshot}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>RESTAURAR SNAPSHOT (ESTADO A)</span>
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-cyan-950 bg-zinc-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900 border-b border-cyan-950 text-cyan-400 text-[11px] uppercase">
            <tr>
              <th className="p-2.5">CLAVE / ITEM</th>
              <th className="p-2.5">ESTADO A (ANTES)</th>
              <th className="p-2.5">ESTADO B (DESPUÉS)</th>
              <th className="p-2.5">PROVENANCE</th>
              <th className="p-2.5">EFECTO SIMULADO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono text-[11.5px]">
            {items.map((item) => {
              const statusColor =
                item.status === 'added'
                  ? 'text-emerald-400 bg-emerald-950/20'
                  : item.status === 'removed'
                  ? 'text-rose-400 bg-rose-950/20'
                  : item.status === 'modified'
                  ? 'text-amber-400 bg-amber-950/20'
                  : 'text-zinc-500';

              return (
                <tr key={item.id} className="hover:bg-cyan-950/10">
                  <td className="p-2.5 font-bold text-white">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 text-[9px] rounded font-bold uppercase ${statusColor}`}>
                        {item.status}
                      </span>
                      <span>{item.key}</span>
                    </div>
                  </td>
                  <td className="p-2.5 text-zinc-400 truncate max-w-[150px]">{item.beforeValue || '—'}</td>
                  <td className="p-2.5 text-cyan-300 font-bold truncate max-w-[150px]">{item.afterValue || '—'}</td>
                  <td className="p-2.5">
                    <ProvenanceBadge provenance={item.provenance} />
                  </td>
                  <td className="p-2.5 text-zinc-400 font-sans-editorial text-[11px]">
                    {item.simulatedEffect || 'Sin cambio crítico registrado.'}
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-zinc-500 font-sans-editorial">
                  No hay diferencias registradas entre el Estado A y el Estado B.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
