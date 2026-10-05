import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sliders,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { ProvenanceBadge } from './EvoDiffEngine';

export interface MythExperiment {
  id: string;
  mythTitle: string;
  claim: string;
  baselineMetric: string;
  simulatedChange: string;
  resultingMetric: string;
  verdict: 'FALSO' | 'EN PARTE / DEPENDE' | 'VERDADERO';
  scientificExplanation: string;
}

export const MYTH_EXPERIMENTS: MythExperiment[] = [
  {
    id: 'm1',
    mythTitle: 'MITO 01 // "MÁS RAM LIBRE = PC MÁS RÁPIDA"',
    claim: 'Vaciar la RAM constantemente con limpiadores hace que Windows responda con más fluidez.',
    baselineMetric: '12 GB en uso (Standby / Caché precargada). Aplicaciones abren en 0.2s.',
    simulatedChange: 'Forzar vaciado de Working Set y Standby list con memoria en cero.',
    resultingMetric: 'RAM Libre: 12 GB. Aplicaciones tardan 1.8s en abrir (I/O de disco forzado).',
    verdict: 'FALSO',
    scientificExplanation: 'RAM libre es RAM desperdiciada. Windows utiliza la memoria que no usás para precargar librerías. Vaciarla obliga a leer del SSD/HDD de nuevo.',
  },
  {
    id: 'm2',
    mythTitle: 'MITO 02 // "DESHABILITAR TODOS LOS SERVICIOS DA MÁS FPS"',
    claim: 'Deshabilitar 50 servicios de Windows aumenta sustancialmente la tasa de cuadros en juegos.',
    baselineMetric: 'Framerate: 142 FPS. Servicios en reposo consumen <0.2% de CPU.',
    simulatedChange: 'Deshabilitar 40 servicios aleatorios en services.msc.',
    resultingMetric: 'Framerate: 142 FPS. Se rompe el audio (AudioSrv) y el matchmaking de red (Dnscache).',
    verdict: 'FALSO',
    scientificExplanation: 'Los servicios inactivos de Windows permanecen suspendidos en RAM y consumen 0 ciclos de CPU. Deshabilitarlos no da más FPS y destruye dependencias.',
  },
  {
    id: 'm3',
    mythTitle: 'MITO 03 // "PRIORIDAD ALTA MEJORAR CUALQUIER JUEGO"',
    claim: 'Poner la prioridad de un proceso en "Alta" o "Tiempo Real" elimina el lag en juegos.',
    baselineMetric: 'Scheduler asigna tiempo en prioridad Normal (8). Rendimiento suave.',
    simulatedChange: 'Poner el juego en prioridad "Tiempo Real" (24).',
    resultingMetric: 'El juego asfixia el hilo de entrada del mouse/teclado y DWM.exe, causando congelamientos de pantalla.',
    verdict: 'FALSO',
    scientificExplanation: 'Tiempo Real priva de CPU al driver del mouse y teclado. El juego rinde igual o peor por bloqueo de hilos de la interfaz.',
  },
  {
    id: 'm4',
    mythTitle: 'MITO 04 // "LIMPIAR EL REGISTRO ACELERA WINDOWS"',
    claim: 'Eliminar claves huérfanas con limpiadores automáticos acelera la velocidad del procesador.',
    baselineMetric: 'Registro mapeado en RAM en bloques HBIN de 4096 bytes.',
    simulatedChange: 'Borrar 500 claves huérfanas de licencias desinstaladas.',
    resultingMetric: 'Diferencia de velocidad: 0.00ms. Riesgo de eliminar una clave de activación o driver.',
    verdict: 'FALSO',
    scientificExplanation: 'Windows busca claves por hash indexado en memoria. La presencia de entradas huérfanas no tiene impacto en la velocidad de búsqueda.',
  },
  {
    id: 'm5',
    mythTitle: 'MITO 05 // "MÁXIMO RENDIMIENTO SIEMPRE ES MEJOR"',
    claim: 'El plan de energía "Máximo Rendimiento" da más potencia que el plan "Equilibrado".',
    baselineMetric: 'Plan Equilibrado: CPU baja a C-States en reposo, manteniéndose fría para alcanzar máximo Turbo Boost en carga.',
    simulatedChange: 'Forzar Plan Máximo Rendimiento continuo al 100%.',
    resultingMetric: 'CPU al 100% de frecuencia en reposo. Temperatura sube 12°C. Mismos FPS máximos en juegos.',
    verdict: 'FALSO',
    scientificExplanation: 'Trabar la CPU en C0 impide enfriar los núcleos en reposo, reduciendo el margen térmico necesario para sostener frecuencias Boost más altas.',
  },
  {
    id: 'm6',
    mythTitle: 'MITO 06 // "TODO ERROR DEL EVENT VIEWER ES GRAVE"',
    claim: 'Un registro con advertencias o errores en el Visor de Eventos indica que la PC está rota.',
    baselineMetric: 'Funcionamiento fluido normal. Event Viewer acumula advertencias de DistributedCOM.',
    simulatedChange: 'Intentar eliminar todos los eventos de advertencia DCOM.',
    resultingMetric: 'Las advertencias DCOM reaparecen normalmente. Son eventos informativos de permisos de comunicación entre procesos.',
    verdict: 'FALSO',
    scientificExplanation: 'Event Viewer registra la actividad interna. Muchos errores (ej. DCOM 10016) son comportamiento previsto de Windows y no representan fallas.',
  },
];

export const EvoMitoLab: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<MythExperiment>(MYTH_EXPERIMENTS[0]);
  const [experimentExecuted, setExperimentExecuted] = useState<boolean>(false);

  const handleRunExperiment = () => {
    setExperimentExecuted(true);
  };

  const handleSelectMyth = (exp: MythExperiment) => {
    setSelectedExperiment(exp);
    setExperimentExecuted(false);
  };

  return (
    <div className="w-full bg-[#05080E] border border-cyan-900/80 rounded-2xl p-4 sm:p-5 space-y-5 shadow-[0_0_50px_rgba(0,210,255,0.12)] font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              EVO MITO LAB // EXPERIMENTACIÓN CIENTÍFICA DE MITOS DE WINDOWS
            </h3>
            <span className="text-[10px] text-zinc-500">
              HIPÓTESIS ➔ ESTADO BASE ➔ CAMBIO SIMULADO ➔ DELTA MEDIDO ➔ EVIDENCIA
            </span>
          </div>
        </div>

        <ProvenanceBadge provenance="SIMULATED" />
      </div>

      {/* Myth Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
        {MYTH_EXPERIMENTS.map((exp) => (
          <button
            key={exp.id}
            type="button"
            onClick={() => handleSelectMyth(exp)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedExperiment.id === exp.id
                ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                : 'bg-black border-cyan-950 text-zinc-400 hover:text-white'
            }`}
          >
            <div className="text-[11px] font-bold text-white">{exp.mythTitle}</div>
          </button>
        ))}
      </div>

      {/* Main Experimentation Stage */}
      <div className="bg-[#020408] border border-cyan-950 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="border-b border-cyan-950 pb-2">
          <span className="text-[10px] text-zinc-500 uppercase font-bold block">AFIRMACIÓN POPULAR POPULARIZADA:</span>
          <p className="text-amber-400 font-bold text-sm font-sans-editorial">{selectedExperiment.claim}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black border border-cyan-950 space-y-1">
            <span className="text-[10px] text-zinc-500 font-bold uppercase block">1. ESTADO BASE (SIN TOCAR)</span>
            <p className="text-zinc-300 font-mono text-[11px]">{selectedExperiment.baselineMetric}</p>
          </div>

          <div className="p-3 rounded-xl bg-black border border-cyan-950 space-y-1">
            <span className="text-[10px] text-amber-400 font-bold uppercase block">2. CAMBIO SIMULADO APLICADO</span>
            <p className="text-zinc-300 font-mono text-[11px]">{selectedExperiment.simulatedChange}</p>
          </div>
        </div>

        {!experimentExecuted ? (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleRunExperiment}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(0,210,255,0.4)]"
            >
              EJECUTAR EXPERIMENTO CIENTÍFICO SIMULADO →
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-zinc-950 border border-cyan-800/80 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase">3. RESULTADO MEDIDO Y VEREDICTO PERICIAL:</span>
              <span className="px-3 py-1 rounded-lg bg-rose-950 text-rose-300 font-black text-xs border border-rose-800">
                VEREDICTO: {selectedExperiment.verdict}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-black border border-rose-950 text-rose-200 text-xs font-mono">
              {selectedExperiment.resultingMetric}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-cyan-400 font-bold uppercase block">DEMOSTRACIÓN DE ARQUITECTURA KERNEL NT:</span>
              <p className="text-zinc-200 text-xs font-sans-editorial leading-relaxed">
                {selectedExperiment.scientificExplanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
