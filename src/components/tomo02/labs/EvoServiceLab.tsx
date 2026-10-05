import React, { useState } from 'react';
import {
  Sliders,
  Play,
  Square,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Activity,
  Layers,
  ShieldCheck,
  ShieldAlert,
  Info
} from 'lucide-react';
import { EvoDiffViewer, DiffItem, ProvenanceBadge } from './EvoDiffEngine';

export interface ServiceItem {
  id: string;
  name: string;
  displayName: string;
  category: 'CRÍTICO' | 'SISTEMA' | 'HARDWARE' | 'RED' | 'SEGURIDAD' | 'OPCIONAL';
  status: 'Running' | 'Stopped';
  startupType: 'Automatic' | 'Automatic (Delayed)' | 'Manual' | 'Disabled';
  dependencies: string[];
  description: string;
  impactOnStop: string;
}

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    name: 'Dnscache',
    displayName: 'Cliente DNS (DNS Cache)',
    category: 'RED',
    status: 'Running',
    startupType: 'Automatic',
    dependencies: ['tdx', 'afd'],
    description: 'Resuelve y almacena en caché nombres de dominio DNS (FQDN) para esta computadora.',
    impactOnStop: 'Navegadores web no podrán resolver URLs (ej. google.com) y perderán conectividad a Internet.',
  },
  {
    id: 's2',
    name: 'Spooler',
    displayName: 'Cola de Impresión (Print Spooler)',
    category: 'OPCIONAL',
    status: 'Running',
    startupType: 'Automatic',
    dependencies: ['http'],
    description: 'Administra todas las colas de impresión y comunicación con impresoras locales y de red.',
    impactOnStop: 'Impresoras no responderán y aplicaciones darán error al exportar documentos a papel o PDF.',
  },
  {
    id: 's3',
    name: 'SysMain',
    displayName: 'SysMain (antiguo SuperFetch)',
    category: 'SISTEMA',
    status: 'Running',
    startupType: 'Automatic',
    dependencies: [],
    description: 'Mantiene y optimiza el rendimiento del sistema precargando aplicaciones frecuentes en memoria RAM.',
    impactOnStop: 'En HDD mecánico reduce el uso de disco al 100% en el boot; en SSD NVMe no muestra diferencia perceptible.',
  },
  {
    id: 's4',
    name: 'WinDefend',
    displayName: 'Servicio Antivirus Microsoft Defender',
    category: 'SEGURIDAD',
    status: 'Running',
    startupType: 'Automatic',
    dependencies: ['RpcSs'],
    description: 'Protege contra malware y amenazas en tiempo real escaneando la actividad de I/O de disco.',
    impactOnStop: 'Desactiva la protección en tiempo real, dejando el sistema vulnerable a descargas maliciosas.',
  },
  {
    id: 's5',
    name: 'RpcSs',
    displayName: 'Llamada a Procedimiento Remoto (RPC)',
    category: 'CRÍTICO',
    status: 'Running',
    startupType: 'Automatic',
    dependencies: [],
    description: 'El núcleo de comunicación DCOM/RPC de Windows para que los procesos se envíen mensajes.',
    impactOnStop: '¡CRÍTICO! Deshabilitarlo colapsa Windows de inmediato provocando cuelgue total o BSOD.',
  },
  {
    id: 's6',
    name: 'wuauserv',
    displayName: 'Windows Update',
    category: 'SISTEMA',
    status: 'Running',
    startupType: 'Manual',
    dependencies: ['rpcss'],
    description: 'Habilita la detección, descarga e instalación de actualizaciones de Windows y controladores.',
    impactOnStop: 'Detiene descargas en segundo plano y previene la instalación automática de parches de seguridad.',
  },
];

export const EvoServiceLab: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [selectedService, setSelectedService] = useState<ServiceItem>(INITIAL_SERVICES[0]);
  const [changelog, setChangelog] = useState<
    {
      time: string;
      serviceName: string;
      action: string;
      effect: string;
      wasNecessary: string;
    }[]
  >([]);

  const [diffItems, setDiffItems] = useState<DiffItem[]>([]);

  const handleStartStop = (serv: ServiceItem) => {
    const newStatus = serv.status === 'Running' ? 'Stopped' : 'Running';
    const updated = services.map((s) => (s.id === serv.id ? { ...s, status: newStatus } : s));

    setServices(updated);
    setSelectedService({ ...selectedService, status: newStatus });

    const log = {
      time: new Date().toLocaleTimeString(),
      serviceName: serv.displayName,
      action: newStatus === 'Stopped' ? 'DETENER SERVICIO' : 'INICIAR SERVICIO',
      effect: newStatus === 'Stopped' ? serv.impactOnStop : 'Servicio restaurado a ejecución activa.',
      wasNecessary: 'En evaluación pericial',
    };

    setChangelog((prev) => [log, ...prev]);

    const newDiff: DiffItem = {
      id: `diff_${Date.now()}`,
      category: 'Services.msc',
      key: `${serv.name} (${serv.displayName})`,
      beforeValue: serv.status,
      afterValue: newStatus,
      status: 'modified',
      provenance: 'SIMULATED',
      simulatedEffect: log.effect,
    };

    setDiffItems((prev) => [newDiff, ...prev.filter((d) => d.key !== newDiff.key)]);
  };

  const handleChangeStartup = (serv: ServiceItem, newType: ServiceItem['startupType']) => {
    const updated = services.map((s) => (s.id === serv.id ? { ...s, startupType: newType } : s));

    setServices(updated);
    setSelectedService({ ...selectedService, startupType: newType });

    const newDiff: DiffItem = {
      id: `diff_${Date.now()}`,
      category: 'Services.msc',
      key: `${serv.name} StartupType`,
      beforeValue: serv.startupType,
      afterValue: newType,
      status: 'modified',
      provenance: 'SIMULATED',
      simulatedEffect: `Tipo de arranque modificado a ${newType}.`,
    };

    setDiffItems((prev) => [newDiff, ...prev.filter((d) => d.key !== newDiff.key)]);
  };

  const handleResetBaseline = () => {
    setServices(INITIAL_SERVICES);
    setSelectedService(INITIAL_SERVICES[0]);
    setDiffItems([]);
    setChangelog([]);
  };

  return (
    <div className="w-full bg-[#05080E] border border-cyan-900/80 rounded-2xl p-4 sm:p-5 space-y-5 shadow-[0_0_50px_rgba(0,210,255,0.1)] font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              EVO SERVICE LAB // SIMULADOR DE SERVICES.MSC
            </h3>
            <span className="text-[10px] text-zinc-500">
              AUDITORÍA DE DEPENDENCIAS Y EFECTOS SECUNDARIOS EN SERVICIOS DEL KERNEL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ProvenanceBadge provenance="SIMULATED" />
          <button
            type="button"
            onClick={handleResetBaseline}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>RESTAURAR SERVICIOS BASE</span>
          </button>
        </div>
      </div>

      {/* Services Table & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[380px]">
        {/* Left 2 Cols: Services Table */}
        <div className="lg:col-span-2 bg-[#020408] border border-cyan-950 rounded-xl p-3 overflow-x-auto space-y-2">
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">
            SERVICIOS REGISTRADOS EN EL SCM (SERVICE CONTROL MANAGER):
          </div>

          <div className="overflow-x-auto rounded-lg border border-cyan-950 bg-black">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-cyan-400 text-[10.5px] uppercase border-b border-cyan-950">
                <tr>
                  <th className="p-2.5">NOMBRE DE MOSTRAR</th>
                  <th className="p-2.5">CATEGORÍA</th>
                  <th className="p-2.5">ESTADO</th>
                  <th className="p-2.5">TIPO ARRANQUE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300 text-[11px]">
                {services.map((s) => {
                  const isSelected = selectedService.id === s.id;
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-950/60 font-bold text-white border-l-2 border-l-cyan-400'
                          : 'hover:bg-cyan-950/20'
                      }`}
                    >
                      <td className="p-2.5 font-bold text-white">
                        <div>{s.displayName}</div>
                        <span className="text-[9.5px] text-zinc-500">{s.name}</span>
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${
                            s.category === 'CRÍTICO'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : s.category === 'SEGURIDAD'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                          }`}
                        >
                          {s.category}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.status === 'Running'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {s.status === 'Running' ? '● En ejecución' : '○ Detenido'}
                        </span>
                      </td>
                      <td className="p-2.5 text-cyan-300">{s.startupType}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Selected Service Detail & Control Panel */}
        <div className="bg-[#020408] border border-cyan-950 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="border-b border-cyan-950 pb-2">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">SERVICIO SELECCIONADO</span>
              <h4 className="text-white font-bold text-sm">{selectedService.displayName}</h4>
              <code className="text-cyan-400 text-xs block">{selectedService.name}</code>
            </div>

            <div className="p-2.5 rounded-lg bg-black border border-cyan-950 space-y-1">
              <span className="text-[10px] text-cyan-400 block font-bold uppercase">DESCRIPCIÓN DEL KERNEL</span>
              <p className="text-zinc-300 text-[11px] font-sans-editorial leading-relaxed">
                {selectedService.description}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-950 border border-amber-900/60 space-y-1">
              <span className="text-[10px] text-amber-400 block font-bold uppercase">IMPACTO SIMULADO AL DETENER</span>
              <p className="text-zinc-300 text-[11px] font-sans-editorial leading-relaxed">
                {selectedService.impactOnStop}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-black border border-cyan-950 space-y-1 text-xs">
              <span className="text-[10px] text-zinc-500 block font-bold uppercase">DEPENDENCIAS DIRECTAS</span>
              {selectedService.dependencies.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedService.dependencies.map((dep) => (
                    <span key={dep} className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px]">
                      {dep}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-zinc-500 text-[10.5px]">Este servicio no depende de otros componentes.</span>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-cyan-950">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStartStop(selectedService)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedService.status === 'Running'
                      ? 'bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/50'
                      : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/50'
                  }`}
                >
                  {selectedService.status === 'Running' ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>DETENER SERVICIO</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>INICIAR SERVICIO</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1 uppercase font-bold">CAMBIAR TIPO DE ARRANQUE:</label>
                <select
                  value={selectedService.startupType}
                  onChange={(e: any) => handleChangeStartup(selectedService, e.target.value)}
                  className="w-full bg-black border border-cyan-900 rounded-lg px-2.5 py-1.5 text-cyan-300 font-mono text-xs focus:outline-none"
                >
                  <option value="Automatic">Automatic (Automático)</option>
                  <option value="Automatic (Delayed)">Automatic (Inicio retrasado)</option>
                  <option value="Manual">Manual (Bajo demanda)</option>
                  <option value="Disabled">Disabled (Deshabilitado)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Evo Diff Engine */}
      <EvoDiffViewer items={diffItems} onRestoreSnapshot={handleResetBaseline} />
    </div>
  );
};
