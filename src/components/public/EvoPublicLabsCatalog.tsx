import React, { useState } from 'react';
import {
  Zap,
  Search,
  Power,
  Terminal,
  Cpu,
  FolderGit2,
  Boxes,
  Activity,
  Globe,
  Shield,
  Code,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface EvoPublicLabsCatalogProps {
  onOpenHotSwapLab: (subPanel?: 'sandbox' | 'hardware' | 'software' | 'telemetry' | 'all') => void;
  onOpenWindowsMatrixLab: (scenario?: string) => void;
  onOpenBootLab: () => void;
  onOpenLabCore?: (phase?: 'SELECT_PC' | 'BUILD_PC' | 'LAB_ACTIVE') => void;
  onOpenCampusLab?: (labId: string) => void;
  onOpenCaseResolver?: () => void;
  onOpenDigitalTwin?: () => void;
  onOpenTransferChallenge?: () => void;
}

export type LabStatus = 'Disponible' | 'En desarrollo' | 'Próximamente';

export interface CanonicalLabEntry {
  id: string;
  number: string;
  title: string;
  description: string;
  status: LabStatus;
  scenarios: string[];
  category: 'SISTEMAS' | 'HARDWARE' | 'PERITAJE' | 'ESPECIALIZADOS';
  icon: React.ElementType;
  accentColor: string;
  action: () => void;
  btnLabel: string;
}

export const EvoPublicLabsCatalog: React.FC<EvoPublicLabsCatalogProps> = ({
  onOpenHotSwapLab,
  onOpenWindowsMatrixLab,
  onOpenBootLab,
  onOpenCaseResolver,
  onOpenDigitalTwin,
  onOpenTransferChallenge,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'SISTEMAS' | 'HARDWARE' | 'PERITAJE' | 'ESPECIALIZADOS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const canonicalLabs: CanonicalLabEntry[] = [
    {
      id: 'lab-01-boot',
      number: 'LAB 01',
      title: 'Laboratorio de Arranque y POST',
      description: 'Diagnóstico con osciloscopio y multímetro virtual de los 35 estados cronológicos de encendido, POST y BCD.',
      status: 'Disponible',
      scenarios: ['diag-boot-seq'],
      category: 'SISTEMAS',
      icon: Power,
      accentColor: '#10B981',
      action: () => onOpenBootLab(),
      btnLabel: 'ABRIR LABORATORIO DE ARRANQUE →',
    },
    {
      id: 'lab-02-windows',
      number: 'LAB 02',
      title: 'Laboratorio de Windows Matrix & Kernel NT',
      description: 'Matriz de Kernel NT: descarte de BSOD, latencias DPC/ISR, servicios en reposo, scheduler e instalación GPT.',
      status: 'Disponible',
      scenarios: [
        'diag-bsod-decoder',
        'diag-incident-events',
        'med-dpc-latency',
        'inv-xray-kernel',
        'rep-windows-repair',
        'rep-windows-install',
        'opt-nt-services',
      ],
      category: 'SISTEMAS',
      icon: Terminal,
      accentColor: '#38BDF8',
      action: () => onOpenWindowsMatrixLab(),
      btnLabel: 'ABRIR LABORATORIO DE WINDOWS →',
    },
    {
      id: 'lab-03-hardware',
      number: 'LAB 03',
      title: 'Laboratorio de Hardware & Hot-Swap',
      description: 'Intercambio en caliente, PCB VRM, arquitectura de silicio, controladores de memoria y 8 sectores de taller.',
      status: 'Disponible',
      scenarios: [
        'diag-atx-power-bench',
        'inv-pcb-schematic',
        'inv-cache-imc-flow',
        'inv-workstations-sectors',
        'rep-hotswap-bench',
      ],
      category: 'HARDWARE',
      icon: Cpu,
      accentColor: '#F59E0B',
      action: () => onOpenHotSwapLab('hardware'),
      btnLabel: 'ABRIR LABORATORIO DE HARDWARE →',
    },
    {
      id: 'lab-04-cases',
      number: 'LAB 04',
      title: 'Taller de Casos & Central Forense',
      description: 'Recepción y triaje de computadoras con reporte de falla real, árbol de descarte pericial y dictamen técnico.',
      status: 'Disponible',
      scenarios: ['diag-case-resolver'],
      category: 'PERITAJE',
      icon: FolderGit2,
      accentColor: '#EC4899',
      action: () => {
        if (onOpenCaseResolver) onOpenCaseResolver();
        else onOpenWindowsMatrixLab('crash-repair');
      },
      btnLabel: 'ABRIR TALLER DE CASOS →',
    },
    {
      id: 'lab-05-digital-twin',
      number: 'LAB 05',
      title: 'Gemelo Digital Causal (12 Subsistemas)',
      description: 'Navegación causal de la PC desde gabinete hasta Ring 0 Kernel NT con inyección de fallas en cascada.',
      status: 'Disponible',
      scenarios: ['inv-digital-twin'],
      category: 'HARDWARE',
      icon: Boxes,
      accentColor: '#06B6D4',
      action: () => {
        if (onOpenDigitalTwin) onOpenDigitalTwin();
        else onOpenHotSwapLab('all');
      },
      btnLabel: 'ABRIR GEMELO DIGITAL →',
    },
    {
      id: 'lab-06-performance',
      number: 'LAB 06',
      title: 'Laboratorio de Rendimiento & Metrología',
      description: 'Análisis de frametimes, percentiles 1% low, monitoreo diodo a diodo, historial térmico y cámara A/B.',
      status: 'Disponible',
      scenarios: [
        'med-frametime-analyzer',
        'med-sensors-telemetry',
        'med-thermal-history',
        'opt-ab-comparison',
      ],
      category: 'HARDWARE',
      icon: Activity,
      accentColor: '#A855F7',
      action: () => onOpenHotSwapLab('telemetry'),
      btnLabel: 'ABRIR LAB DE RENDIMIENTO →',
    },
    {
      id: 'lab-07-network',
      number: 'LAB 07',
      title: 'Laboratorio Forense de Redes & Protocolos',
      description: 'Inspección de tramas Ethernet, pila TCP/IP, resolución DNS, socketing e ingeniería inversa de tráfico.',
      status: 'En desarrollo',
      scenarios: [],
      category: 'ESPECIALIZADOS',
      icon: Globe,
      accentColor: '#6366F1',
      action: () => {},
      btnLabel: 'EN DESARROLLO PERICIAL',
    },
    {
      id: 'lab-08-security',
      number: 'LAB 08',
      title: 'Laboratorio de Ciberseguridad Defensiva',
      description: 'Aislamiento de procesos sospechosos, análisis de Ring 0, firma de controladores y hardening de sistema.',
      status: 'En desarrollo',
      scenarios: [],
      category: 'ESPECIALIZADOS',
      icon: Shield,
      accentColor: '#EF4444',
      action: () => {},
      btnLabel: 'EN DESARROLLO PERICIAL',
    },
    {
      id: 'lab-09-code',
      number: 'LAB 09',
      title: 'Laboratorio de Ingeniería de Software & C/C++',
      description: 'Punteros, estructuras en memoria, desbordamientos de búfer, compilación y optimización de código de bajo nivel.',
      status: 'Próximamente',
      scenarios: [],
      category: 'ESPECIALIZADOS',
      icon: Code,
      accentColor: '#10B981',
      action: () => {},
      btnLabel: 'PRÓXIMAMENTE',
    },
    {
      id: 'lab-10-ai',
      number: 'LAB 10',
      title: 'Laboratorio de Sistemas de Inteligencia Artificial',
      description: 'Infraestructura de inferencia local, asignación de VRAM, cuantización de modelos y aceleración NPU/GPU.',
      status: 'Próximamente',
      scenarios: [],
      category: 'ESPECIALIZADOS',
      icon: Sparkles,
      accentColor: '#EAB308',
      action: () => {},
      btnLabel: 'PRÓXIMAMENTE',
    },
    {
      id: 'lab-eval-transfer',
      number: 'EVALUACIÓN',
      title: 'Desafío de Transferencia & Evaluación Práctica',
      description: 'Evaluación metrológica y práctica guiada de transferencia directa de conocimientos.',
      status: 'Disponible',
      scenarios: ['doc-transfer-challenge'],
      category: 'PERITAJE',
      icon: CheckCircle2,
      accentColor: '#10B981',
      action: () => {
        if (onOpenTransferChallenge) onOpenTransferChallenge();
        else onOpenWindowsMatrixLab('services');
      },
      btnLabel: 'INICIAR DESAFÍO DE TRANSFERENCIA →',
    },
  ];

  const filteredLabs = canonicalLabs.filter((lab) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lab.title.toLowerCase().includes(q) ||
      lab.description.toLowerCase().includes(q) ||
      lab.category.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (selectedCategory === 'ALL') return true;
    return lab.category === selectedCategory;
  });

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-mono-tech select-none">
      
      {/* HEADER DE LABORATORIOS */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-800 pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Zap className="w-5 h-5 text-emerald-400" />
          <span className="text-xs tracking-widest text-emerald-400 uppercase font-black">
            SUITE CANÓNICA DE PRACTICAR ({canonicalLabs.length} LABORATORIOS DEFINIDOS)
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
          PRACTICAR // LABORATORIOS DE EVO LABS
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 font-sans-editorial max-w-3xl leading-relaxed">
          Catálogo único y consolidado de laboratorios interactivos, simuladores y talleres periciales. Cada laboratorio concentra escenarios prácticos reales sin duplicaciones visuales.
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
            placeholder="Buscar laboratorio por título o categoría..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono-tech text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tech text-xs custom-scrollbar">
          {(['ALL', 'SISTEMAS', 'HARDWARE', 'PERITAJE', 'ESPECIALIZADOS'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-400 text-black shadow-md'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat === 'ALL' ? 'TODOS' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE LABORATORIOS CANÓNICOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLabs.map((lab) => {
          const IconComp = lab.icon;
          const isAvailable = lab.status === 'Disponible';

          return (
            <div
              key={lab.id}
              className={`p-5 rounded-2xl bg-zinc-950 border transition-all flex flex-col justify-between space-y-5 shadow-xl group ${
                isAvailable
                  ? 'border-zinc-800/90 hover:border-emerald-500/40'
                  : 'border-zinc-900/80 opacity-75'
              }`}
            >
              <div className="space-y-3.5">
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span
                    className="text-[10px] px-2.5 py-0.5 rounded font-bold uppercase font-mono-tech"
                    style={{
                      color: lab.accentColor,
                      backgroundColor: `${lab.accentColor}15`,
                      border: `1px solid ${lab.accentColor}40`,
                    }}
                  >
                    {lab.number} // {lab.category}
                  </span>

                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-mono-tech font-bold uppercase border ${
                      lab.status === 'Disponible'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : lab.status === 'En desarrollo'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                    }`}
                  >
                    ● {lab.status}
                  </span>
                </div>

                {/* Title and Icon */}
                <div className="flex items-start gap-3.5">
                  <div
                    className="p-3 rounded-xl border shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${lab.accentColor}15`,
                      borderColor: `${lab.accentColor}40`,
                      color: lab.accentColor,
                    }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight group-hover:text-emerald-300 transition-colors">
                      {lab.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans-editorial text-xs text-zinc-300 leading-relaxed">
                  {lab.description}
                </p>

                {/* Scenarios Tag List */}
                {lab.scenarios.length > 0 && (
                  <div className="pt-2 border-t border-zinc-900/80 space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold block">
                      ESCENARIOS INTERNOS INTEGRADOS ({lab.scenarios.length}):
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {lab.scenarios.map((sc) => (
                        <span
                          key={sc}
                          className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono"
                        >
                          {sc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-zinc-900">
                {isAvailable ? (
                  <button
                    type="button"
                    onClick={lab.action}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(52,211,153,0.2)] flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                  >
                    <span>{lab.btnLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-zinc-500 text-xs font-bold uppercase tracking-wider text-center border border-zinc-800">
                    {lab.btnLabel}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
