import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Cpu,
  Database,
  Terminal,
  Clock,
  ShieldCheck,
  Activity,
  Search,
  CheckCircle2,
  Info
} from 'lucide-react';
import { ProvenanceBadge } from './EvoDiffEngine';

export interface StartupDnaVector {
  id: string;
  name: string;
  sourceType:
    | 'Startup Apps'
    | 'Services'
    | 'Scheduled Tasks'
    | 'Drivers'
    | 'Registry'
    | 'Updaters';
  registryPathOrLocation: string;
  executableName: string;
  pidSimulated: number;
  cpuImpact: string;
  ramUsageMB: number;
  whyItStarts: string;
  isEssential: boolean;
}

const STARTUP_DNA_ITEMS: StartupDnaVector[] = [
  {
    id: 'dna1',
    name: 'OneDrive Sync Client',
    sourceType: 'Startup Apps',
    registryPathOrLocation: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
    executableName: 'OneDrive.exe',
    pidSimulated: 4820,
    cpuImpact: '3.2% en boot',
    ramUsageMB: 185,
    whyItStarts: 'Sincronización de carpetas Documentos y Escritorio en la nube.',
    isEssential: false,
  },
  {
    id: 'dna2',
    name: 'Realtek HD Audio Universal Service',
    sourceType: 'Services',
    registryPathOrLocation: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\RtkAudioService',
    executableName: 'RtkAudioService.exe',
    pidSimulated: 1840,
    cpuImpact: '0.1% constante',
    ramUsageMB: 28,
    whyItStarts: 'Conmutación automática de conectores Jack de audio de la placa madre.',
    isEssential: true,
  },
  {
    id: 'dna3',
    name: 'Google Update Auto-Maintenance',
    sourceType: 'Scheduled Tasks',
    registryPathOrLocation: 'Task Scheduler: \\Microsoft\\Chrome\\GoogleUpdateTaskUser',
    executableName: 'GoogleUpdate.exe',
    pidSimulated: 6112,
    cpuImpact: '12% durante 4s',
    ramUsageMB: 45,
    whyItStarts: 'Comprobación de parches de seguridad para el navegador Chrome/Edge.',
    isEssential: false,
  },
  {
    id: 'dna4',
    name: 'NVIDIA Display Driver Service',
    sourceType: 'Drivers',
    registryPathOrLocation: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\nvlddmkm',
    executableName: 'nvlddmkm.sys',
    pidSimulated: 4,
    cpuImpact: '0.5%',
    ramUsageMB: 410,
    whyItStarts: 'Carga del subsistema WDDM y planificador VRAM de la GPU dedicada.',
    isEssential: true,
  },
  {
    id: 'dna5',
    name: 'Windows Defender Health Service',
    sourceType: 'Registry',
    registryPathOrLocation: 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
    executableName: 'MSASCuiL.exe',
    pidSimulated: 2940,
    cpuImpact: '0.8%',
    ramUsageMB: 65,
    whyItStarts: 'Muestra el icono de estado de seguridad en la barra de tareas.',
    isEssential: true,
  },
  {
    id: 'dna6',
    name: 'Adobe Acrobat Update Service',
    sourceType: 'Updaters',
    registryPathOrLocation: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\AdobeARMservice',
    executableName: 'armsvc.exe',
    pidSimulated: 5310,
    cpuImpact: '1.5%',
    ramUsageMB: 32,
    whyItStarts: 'Verificación en segundo plano de parches para lectura de PDF.',
    isEssential: false,
  },
];

export const EvoStartupDnaLab: React.FC = () => {
  const [selectedVector, setSelectedVector] = useState<StartupDnaVector>(STARTUP_DNA_ITEMS[0]);
  const [filterSource, setFilterSource] = useState<string>('TODOS');

  const filteredItems =
    filterSource === 'TODOS'
      ? STARTUP_DNA_ITEMS
      : STARTUP_DNA_ITEMS.filter((i) => i.sourceType === filterSource);

  return (
    <div className="w-full bg-[#05080E] border border-cyan-900/80 rounded-2xl p-4 sm:p-5 space-y-5 shadow-[0_0_50px_rgba(0,210,255,0.1)] font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              WINDOWS STARTUP DNA // TRAZABILIDAD DE AUTOARRANQUE
            </h3>
            <span className="text-[10px] text-zinc-500">
              SEGUIMIENTO DE LA CADENA FÍSICA: REGISTRO/SERVICIO ➔ EJECUTABLE ➔ PROCESO ➔ RECURSOS
            </span>
          </div>
        </div>

        <ProvenanceBadge provenance="SIMULATED" />
      </div>

      {/* Vector Category Filter */}
      <div className="flex items-center gap-2 flex-wrap border-b border-cyan-950 pb-3 text-xs">
        <span className="text-zinc-500 text-[10px] font-bold uppercase">FILTRAR VECTOR:</span>
        {['TODOS', 'Startup Apps', 'Services', 'Scheduled Tasks', 'Drivers', 'Registry', 'Updaters'].map(
          (src) => (
            <button
              key={src}
              type="button"
              onClick={() => setFilterSource(src)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterSource === src
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,210,255,0.3)]'
                  : 'bg-black text-zinc-400 hover:text-white border border-cyan-950'
              }`}
            >
              {src}
            </button>
          )
        )}
      </div>

      {/* Main Grid: Item Selector & Chain Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[360px]">
        {/* Left Col: Vector List */}
        <div className="bg-[#020408] border border-cyan-950 rounded-xl p-3 overflow-y-auto max-h-[380px] space-y-2">
          {filteredItems.map((item) => {
            const isSelected = selectedVector.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedVector(item)}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,210,255,0.15)]'
                    : 'bg-black hover:bg-cyan-950/20 border-cyan-950 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-bold text-white">{item.name}</strong>
                  <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                    {item.sourceType}
                  </span>
                </div>
                <div className="text-[10.5px] text-zinc-400 font-mono mt-1">{item.executableName}</div>
              </button>
            );
          })}
        </div>

        {/* Right 2 Cols: Interactive Execution Chain Visualizer */}
        <div className="lg:col-span-2 bg-[#020408] border border-cyan-950 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-cyan-950 pb-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">ELEMENTO SELECCIONADO</span>
                <h4 className="text-white font-bold text-sm">{selectedVector.name}</h4>
              </div>
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                  selectedVector.isEssential
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}
              >
                {selectedVector.isEssential ? '● Componente Esencial' : '▲ Software Opcional'}
              </span>
            </div>

            {/* Visual DNA Chain Pipeline */}
            <div className="space-y-2">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                CADENA DE EJECUCIÓN PASO A PASO EN EL BOOT:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-xs">
                {/* Step 1 */}
                <div className="p-3 rounded-xl bg-black border border-cyan-900/80 space-y-1">
                  <span className="text-[9.5px] text-zinc-500 block uppercase font-bold">1. ORIGEN</span>
                  <strong className="text-cyan-300 text-xs block">{selectedVector.sourceType}</strong>
                  <span className="text-[9.5px] text-zinc-400 block truncate">{selectedVector.registryPathOrLocation}</span>
                </div>

                {/* Step 2 */}
                <div className="p-3 rounded-xl bg-black border border-cyan-900/80 space-y-1">
                  <span className="text-[9.5px] text-zinc-500 block uppercase font-bold">2. EJECUTABLE</span>
                  <strong className="text-white text-xs block">{selectedVector.executableName}</strong>
                  <span className="text-[9.5px] text-zinc-400 block">Binario en disco</span>
                </div>

                {/* Step 3 */}
                <div className="p-3 rounded-xl bg-black border border-cyan-900/80 space-y-1">
                  <span className="text-[9.5px] text-zinc-500 block uppercase font-bold">3. PROCESO ACTIVO</span>
                  <strong className="text-emerald-400 text-xs block">PID {selectedVector.pidSimulated}</strong>
                  <span className="text-[9.5px] text-zinc-400 block">Kernel User Mode</span>
                </div>

                {/* Step 4 */}
                <div className="p-3 rounded-xl bg-black border border-cyan-900/80 space-y-1">
                  <span className="text-[9.5px] text-zinc-500 block uppercase font-bold">4. CONSUMO SIMULADO</span>
                  <strong className="text-amber-400 text-xs block">{selectedVector.ramUsageMB} MB RAM</strong>
                  <span className="text-[9.5px] text-zinc-400 block">{selectedVector.cpuImpact}</span>
                </div>
              </div>
            </div>

            {/* Why It Starts */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-cyan-950 space-y-1">
              <span className="text-[10px] text-cyan-400 font-bold uppercase block">PROPÓSITO TÉCNICO EN EL SISTEMA:</span>
              <p className="text-zinc-300 text-xs font-sans-editorial leading-relaxed">
                {selectedVector.whyItStarts}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
