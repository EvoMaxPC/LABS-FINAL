import React, { useState } from 'react';
import {
  Zap,
  Cpu,
  Monitor,
  HardDrive,
  Compass,
  Boxes,
  Layers,
  Activity,
  Search,
  Filter,
} from 'lucide-react';

interface EvoPublicLabsCatalogProps {
  onOpenHotSwapLab: (subPanel?: 'sandbox' | 'hardware' | 'software' | 'telemetry' | 'all') => void;
  onOpenWindowsMatrixLab: (scenario?: string) => void;
  onOpenBootLab: () => void;
  onOpenLabCore: (phase?: 'SELECT_PC' | 'BUILD_PC' | 'LAB_ACTIVE') => void;
  onOpenCampusLab?: (labId: string) => void;
}

export const EvoPublicLabsCatalog: React.FC<EvoPublicLabsCatalogProps> = ({
  onOpenHotSwapLab,
  onOpenWindowsMatrixLab,
  onOpenBootLab,
  onOpenLabCore,
  onOpenCampusLab,
}) => {
  const [selectedFamily, setSelectedFamily] = useState<'ALL' | 'HARDWARE' | 'WINDOWS' | 'ARRANQUE' | 'TALLER' | 'CAMPUS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const labsList = [
    {
      id: 'lab-hotswap-lat',
      family: 'HARDWARE',
      name: 'CÁLCULO DE LATENCIA DE SILICIO (ns)',
      desc: 'Medición en tiempo real del impacto de frecuencia y latencia CAS (CL) entre controlador de memoria y chipsets.',
      tomoNum: '01',
      status: 'DISPONIBLE',
      action: () => onOpenHotSwapLab('hardware'),
      btnLabel: 'ABRIR BANCO HOT-SWAP →',
      color: 'border-amber-400/40 hover:border-amber-400',
      tagColor: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
      btnColor: 'bg-amber-400 text-black hover:bg-amber-300',
    },
    {
      id: 'lab-matrix-nt',
      family: 'WINDOWS',
      name: 'AUDITORÍA DE KERNEL NT & TELEMETRÍA',
      desc: 'Simulación y descarte pericial de servicios de segundo plano, latencias DPC/ISR y aislamiento de procesos.',
      tomoNum: '02',
      status: 'DISPONIBLE',
      action: () => onOpenWindowsMatrixLab('services'),
      btnLabel: 'ABRIR WINDOWS MATRIX →',
      color: 'border-cyan-400/40 hover:border-cyan-400',
      tagColor: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',
      btnColor: 'bg-cyan-400 text-black hover:bg-cyan-300',
    },
    {
      id: 'lab-boot-seq',
      family: 'ARRANQUE',
      name: 'BANCO DE SECUENCIA DE ARRANQUE & POST',
      desc: 'Inspección de las etapas de encendido: Power Good, inicialización de VRMs, BIOS/UEFI y carga del bootloader.',
      tomoNum: '08',
      status: 'DISPONIBLE',
      action: () => onOpenBootLab(),
      btnLabel: 'ABRIR BOOT LAB →',
      color: 'border-emerald-400/40 hover:border-emerald-400',
      tagColor: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
      btnColor: 'bg-emerald-400 text-black hover:bg-emerald-300',
    },
    {
      id: 'lab-core-atx',
      family: 'TALLER',
      name: 'LAB CORE // DESCARTE DE BANCO & ATX',
      desc: 'Aislamiento metódico de fallas en líneas de 12V, 5V y 3.3V con mediciones de caída de tensión y derivaciones a masa.',
      tomoNum: '03',
      status: 'DISPONIBLE',
      action: () => onOpenLabCore('SELECT_PC'),
      btnLabel: 'ABRIR LAB CORE →',
      color: 'border-purple-400/40 hover:border-purple-400',
      tagColor: 'bg-purple-400/10 text-purple-300 border-purple-400/30',
      btnColor: 'bg-purple-500 text-white hover:bg-purple-400',
    },
    {
      id: 'lab-sandbox-full',
      family: 'HARDWARE',
      name: 'EVO ULTIMATE SANDBOX',
      desc: 'Laboratorio de arquitectura abierta para modificar procesadores, bus widths y analizar cuellos de botella.',
      tomoNum: '01',
      status: 'DISPONIBLE',
      action: () => onOpenHotSwapLab('sandbox'),
      btnLabel: 'ABRIR SANDBOX →',
      color: 'border-amber-400/40 hover:border-amber-400',
      tagColor: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
      btnColor: 'bg-amber-400 text-black hover:bg-amber-300',
    },
    {
      id: 'lab-matrix-crash',
      family: 'WINDOWS',
      name: 'REPARADOR DE FALLAS & BSOD',
      desc: 'Análisis de volcados de memoria (minidump), excepciones de kernel y conflicto de controladores.',
      tomoNum: '02',
      status: 'DISPONIBLE',
      action: () => onOpenWindowsMatrixLab('crash-repair'),
      btnLabel: 'ABRIR LAB BSOD →',
      color: 'border-cyan-400/40 hover:border-cyan-400',
      tagColor: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',
      btnColor: 'bg-cyan-400 text-black hover:bg-cyan-300',
    },
    {
      id: 'lab-campus-01',
      family: 'CAMPUS',
      name: 'LAB 01 // CENTRAL DE INCIDENTES',
      desc: 'Módulo de recepción y triaje de casos de laboratorio pericial de la academia EVO.',
      tomoNum: '01',
      status: 'DISPONIBLE',
      action: () => onOpenHotSwapLab('all'),
      btnLabel: 'INGRESAR A SALA →',
      color: 'border-zinc-700 hover:border-zinc-500',
      tagColor: 'bg-zinc-900 text-zinc-400 border-zinc-800',
      btnColor: 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800',
    },
    {
      id: 'lab-campus-02',
      family: 'CAMPUS',
      name: 'LAB 02 // TALLER DE RENDIMIENTO',
      desc: 'Banco de pruebas de frecuencias, temperaturas y estabilidad térmica bajo carga.',
      tomoNum: '07',
      status: 'DISPONIBLE',
      action: () => onOpenHotSwapLab('telemetry'),
      btnLabel: 'INGRESAR A SALA →',
      color: 'border-zinc-700 hover:border-zinc-500',
      tagColor: 'bg-zinc-900 text-zinc-400 border-zinc-800',
      btnColor: 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800',
    },
  ];

  const filteredLabs = labsList.filter((lab) => {
    const matchesSearch =
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.family.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedFamily === 'ALL') return true;
    return lab.family === selectedFamily;
  });

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* HEADER DE LABORATORIOS */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-800 pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-mono-tech tracking-widest text-amber-400 uppercase font-black">
            SUITE DE EXPERIMENTACIÓN TÉCNICA
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
          LABORATORIOS EVO // NO SÓLO LO LEÉS. LO PROBÁS.
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 font-sans-editorial max-w-2xl">
          Todos los bancos de hardware, simuladores de arquitectura, entornos de Kernel NT, secuencia de encendido y salas periciales.
        </p>
      </div>

      {/* FILTROS Y BÚSQUEDA */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar laboratorio por nombre o familia..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono-tech text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tech text-xs">
          {(['ALL', 'HARDWARE', 'WINDOWS', 'ARRANQUE', 'TALLER', 'CAMPUS'] as const).map((fam) => (
            <button
              key={fam}
              type="button"
              onClick={() => setSelectedFamily(fam)}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedFamily === fam
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {fam === 'ALL' ? 'TODOS' : fam}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE LABORATORIOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLabs.map((lab) => (
          <div
            key={lab.id}
            className={`p-5 rounded-2xl bg-zinc-950 border ${lab.color} transition-all flex flex-col justify-between space-y-4 shadow-lg`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono-tech font-bold uppercase border ${lab.tagColor}`}>
                  {lab.family} // TOMO {lab.tomoNum}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono-tech font-bold">
                  {lab.status}
                </span>
              </div>

              <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight">
                {lab.name}
              </h3>

              <p className="font-sans-editorial text-xs text-zinc-300 leading-relaxed">
                {lab.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-900">
              <button
                type="button"
                onClick={lab.action}
                className={`w-full py-2.5 rounded-xl ${lab.btnColor} font-mono-tech text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center shadow-md`}
              >
                {lab.btnLabel}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
