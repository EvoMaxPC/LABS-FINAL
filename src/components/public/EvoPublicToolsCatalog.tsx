import React, { useState } from 'react';
import {
  Gauge,
  Activity,
  Cpu,
  Monitor,
  Wrench,
  Search,
  CheckCircle2,
  FileSearch,
  HardDrive,
  Zap,
} from 'lucide-react';

interface EvoPublicToolsCatalogProps {
  onOpenTool: (toolId: string) => void;
  onOpenForensicReportModal?: () => void;
  onOpenAutoDetectModal?: () => void;
}

export const EvoPublicToolsCatalog: React.FC<EvoPublicToolsCatalogProps> = ({
  onOpenTool,
  onOpenForensicReportModal,
  onOpenAutoDetectModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'DIAGNOSTICAR' | 'MEDIR' | 'INVESTIGAR' | 'REPARAR' | 'OPTIMIZAR' | 'DOCUMENTAR'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const tools = [
    {
      id: 'tool-lat-calc',
      category: 'MEDIR',
      name: 'CALCULADOR DE LATENCIAS DE SILICIO',
      whatIs: 'Instrumento matemático para calcular nanosegundos reales: (CL / MHz) * 2000.',
      solves: 'Determina si una memoria RAM con mayor frecuencia pero peores latencias rinde menos.',
      inputNeeded: 'Frecuencia efectiva (MT/s) y latencia CAS (CL).',
      resultDelivered: 'Latencia absoluta en nanosegundos y tasa de transferencia real.',
      tomoNum: '01',
      labAssoc: 'Hot-Swap Lab',
      status: 'ACTIVO',
      action: () => onOpenTool('hotswap'),
    },
    {
      id: 'tool-nt-services',
      category: 'DIAGNOSTICAR',
      name: 'AUDITOR DE SERVICIOS NT & PROCESOS OCULTOS',
      whatIs: 'Herramienta de análisis de telemetría de Windows y servicios en background.',
      solves: 'Identifica procesos invasivos que generan stuttering en juegos y saturación de disco.',
      inputNeeded: 'Registro de procesos activos y servicios del sistema operativo.',
      resultDelivered: 'Clasificación de criticidad de servicios y sugerencias de optimización.',
      tomoNum: '02',
      labAssoc: 'Windows Matrix Lab',
      status: 'ACTIVO',
      action: () => onOpenTool('matrix'),
    },
    {
      id: 'tool-atx-bench',
      category: 'REPARAR',
      name: 'BANCO DE DESCARTE DE LÍNEAS DE PODER ATX',
      whatIs: 'Simulador metrológico de derivaciones y caídas de tensión en rieles de poder.',
      solves: 'Aísla cortocircuitos en líneas de 12V, 5V, 3.3V y 5VSB sin quemar componentes.',
      inputNeeded: 'Lecturas de multímetro en escala de diodo/resistencia.',
      resultDelivered: 'Diagnóstico de sector en cortocircuito y componentes sospechosos.',
      tomoNum: '03',
      labAssoc: 'Lab Core',
      status: 'ACTIVO',
      action: () => onOpenTool('core'),
    },
    {
      id: 'tool-vrm-map',
      category: 'INVESTIGAR',
      name: 'MAPA DE ALIMENTACIÓN & EFICIENCIA VRM',
      whatIs: 'Visualizador de fases de poder, controladores PWM y etapa de filtrado.',
      solves: 'Permite comprender el sobrecalentamiento de VRMs y throttling térmico.',
      inputNeeded: 'Consumo en watts del CPU y temperatura en sensores de MOSFETs.',
      resultDelivered: 'Curva de eficiencia y temperatura estimada por fase.',
      tomoNum: '04',
      labAssoc: 'Notebook Repair Lab',
      status: 'ACTIVO',
      action: () => onOpenTool('hotswap'),
    },
    {
      id: 'tool-frametime-meter',
      category: 'OPTIMIZAR',
      name: 'ANALIZADOR DE FRAME-TIME (1% & 0.1% LOWS)',
      whatIs: 'Medidor de consistencia de tiempos de renderizado de cuadros 3D.',
      solves: 'Explica por qué un juego con 120 FPS puede sentirse entrecortado.',
      inputNeeded: 'Historial de tiempos de cuadro (ms).',
      resultDelivered: 'Gráfico de variabilidad, 1% low, 0.1% low y diagnóstico de cuello de botella.',
      tomoNum: '07',
      labAssoc: 'Performance Lab',
      status: 'ACTIVO',
      action: () => onOpenTool('hotswap'),
    },
    {
      id: 'tool-forensic-report',
      category: 'DOCUMENTAR',
      name: 'GENERADOR DE EXPEDIENTE PERICIAL FORENSE',
      whatIs: 'Motor de consolidación de hallazgos, mediciones y procedencia de datos.',
      solves: 'Genera informes técnicos profesionales con trazabilidad estricta.',
      inputNeeded: 'Mediciones registradas en bancos de prueba y datos locales.',
      resultDelivered: 'Informe forense estructurado descargable en formato pericial.',
      tomoNum: '01',
      labAssoc: 'Analizar mi PC',
      status: 'ACTIVO',
      action: () => {
        if (onOpenForensicReportModal) onOpenForensicReportModal();
        else onOpenTool('diagnose');
      },
    },
  ];

  const filteredTools = tools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.solves.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'ALL') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* HEADER DE HERRAMIENTAS */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-800 pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Gauge className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono-tech tracking-widest text-emerald-400 uppercase font-black">
            INSTRUMENTAL DE BANCO Y METROLOGÍA
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
          HERRAMIENTAS EVO LABS
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 font-sans-editorial max-w-2xl">
          Catálogo completo de instrumental pericial para diagnosticar, medir variables físicas, investigar arquitectura, reparar fuentes y documentar evidencia.
        </p>
      </div>

      {/* FILTROS Y BUSCADOR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar herramienta por nombre o problema..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono-tech text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tech text-xs">
          {(['ALL', 'DIAGNOSTICAR', 'MEDIR', 'INVESTIGAR', 'REPARAR', 'OPTIMIZAR', 'DOCUMENTAR'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-400 text-black shadow-md'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat === 'ALL' ? 'TODAS (6)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE HERRAMIENTAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono-tech">
        {filteredTools.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                  {t.category} // TOMO {t.tomoNum}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-bold">
                  {t.labAssoc}
                </span>
              </div>

              <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight">
                {t.name}
              </h3>

              <div className="space-y-1.5 text-xs text-zinc-300 font-sans-editorial">
                <p><strong className="text-zinc-400 font-mono text-[11px] uppercase">¿Qué es? </strong>{t.whatIs}</p>
                <p><strong className="text-zinc-400 font-mono text-[11px] uppercase">¿Qué problema resuelve? </strong>{t.solves}</p>
                <p><strong className="text-zinc-400 font-mono text-[11px] uppercase">Entrada / Salida: </strong>{t.inputNeeded} → {t.resultDelivered}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-900">
              <button
                type="button"
                onClick={t.action}
                className="w-full py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md text-center"
              >
                ABRIR INSTRUMENTAL →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
