import React from 'react';
import {
  Compass,
  CheckCircle2,
  BookOpen,
  Zap,
  Gauge,
  Monitor,
  Bot,
  Trophy,
  FileCheck,
  Activity,
  Layers,
  Cpu,
} from 'lucide-react';

interface EvoPublicHowToUseProps {
  onNavigateTomos: () => void;
  onNavigateLabs: () => void;
  onNavigateTools: () => void;
  onNavigateAnalyze: () => void;
  onNavigateMiEvo: () => void;
}

export const EvoPublicHowToUse: React.FC<EvoPublicHowToUseProps> = ({
  onNavigateTomos,
  onNavigateLabs,
  onNavigateTools,
  onNavigateAnalyze,
  onNavigateMiEvo,
}) => {
  const methodSteps = [
    { step: '01', verb: 'OBSERVAR', desc: 'Identificá el síntoma en el sistema o hardware sin prejuicios ni suposiciones.' },
    { step: '02', verb: 'ENTENDER', desc: 'Comprendé los buses, dependencias y protocolos que interactúan en la falla.' },
    { step: '03', verb: 'HIPOTETIZAR', desc: 'Formulá una causa probable basada en la física del silicio y el Kernel NT.' },
    { step: '04', verb: 'INTERVENIR', desc: 'Realizá una sola modificación controlada en el banco o software.' },
    { step: '05', verb: 'MEDIR', desc: 'Registrá la variable con instrumental metrológico real en tiempo exacto.' },
    { step: '06', verb: 'COMPARAR', desc: 'Contrastá la medición contra la línea de base original o valores estándar.' },
    { step: '07', verb: 'COMPROBAR', desc: 'Validá si la hipótesis se demostró con rigor o fue totalmente refutada.' },
    { step: '08', verb: 'DOCUMENTAR', desc: 'Registrá el hallazgo en el expediente pericial con procedencia de datos.' },
    { step: '09', verb: 'TRANSFERIR', desc: 'Aplicá el principio a nuevos escenarios, arquitecturas y diagnósticos reales.' },
  ];

  const ecosystemEngines = [
    { name: 'EVO CORE', role: 'Motor pericial de simulación y diagnóstico de circuitos y buses.', status: 'ACTIVO', where: 'Analizar mi PC / Labs' },
    { name: 'EVO AGENT & TUTOR', role: 'Asistente técnico transversal para interpretación de esquemáticos.', status: 'ACTIVO', where: 'Toda la plataforma' },
    { name: 'INTERACTIVE DIGITAL TWIN', role: 'Modelo gemelo digital de hardware con pasaporte técnico.', status: 'ACTIVO', where: 'Mi EVO / Pasaporte' },
    { name: 'SKILL GRAPH & ADAPTIVE PATH', role: 'Grafo de habilidades y rutas formativas dinámicas.', status: 'ACTIVO', where: 'Campus / Escuela' },
    { name: 'CASE & FORENSIC ENGINE', role: 'Repositorio de casos periciales reales y generador forense.', status: 'ACTIVO', where: 'Consola técnica' },
    { name: 'EVIDENCE & TELEMETRY INTEGRITY', role: 'Validación estricta de telemetría SYSTEM_REPORTED vs UNKNOWN.', status: 'ACTIVO', where: 'Analizar mi PC / Exámenes' },
  ];

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* HEADER */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-800 pb-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-mono-tech tracking-widest text-amber-400 uppercase font-black">
            METODOLOGÍA Y GUÍA OPERATIVA
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
          CÓMO FUNCIONA EVO LABS
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 font-sans-editorial max-w-2xl">
          Conocé el método pericial de 9 pasos, la cadena pedagógica del Sistema EVO y la arquitectura del ecosistema técnico.
        </p>
      </div>

      {/* GUÍA RÁPIDA DE USO: 6 PILARES OPERATIVOS */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-black text-white uppercase tracking-tight">
          GUÍA OPERATIVA // PASO A PASO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono-tech text-xs">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-amber-400 font-black text-sm block">1. ELEGIR UN TOMO</span>
            <p className="text-zinc-300 font-sans-editorial leading-relaxed">
              Ingresá a la sección Tomos, seleccioná el área tecnológica de tu interés (Hardware, Kernel, Redes, etc.) y recorré sus módulos editoriales.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-cyan-400 font-black text-sm block">2. EXPERIMENTAR EN LABS</span>
            <p className="text-zinc-300 font-sans-editorial leading-relaxed">
              Cada tomo cuenta con bancos interactivos de pruebas donde podés variar parámetros y verificar mediciones en tiempo real.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-emerald-400 font-black text-sm block">3. USAR HERRAMIENTAS</span>
            <p className="text-zinc-300 font-sans-editorial leading-relaxed">
              Utilizá el instrumental especializado para medir latencias, analizar servicios de Windows o aislar fallas en rieles de poder ATX.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-purple-400 font-black text-sm block">4. ANALIZAR TU PROPIA PC</span>
            <p className="text-zinc-300 font-sans-editorial leading-relaxed">
              Ejecutá el diagnóstico local seguro para categorizar tu hardware real con procedencia metrológica estricta.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-pink-400 font-black text-sm block">5. CONSULTAR AL TUTOR EVO</span>
            <p className="text-zinc-300 font-sans-editorial leading-relaxed">
              El Tutor EVO analiza tu contexto de lectura o simulación y responde dudas de esquemáticos o procedimientos periciales.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-blue-400 font-black text-sm block">6. GUARDAR EVIDENCIA EN MI EVO</span>
            <p className="text-zinc-300 font-sans-editorial leading-relaxed">
              Cada examen aprobado y reporte forense se asocia a tu pasaporte técnico personal para acreditar tu dominio.
            </p>
          </div>
        </div>
      </div>

      {/* EL MÉTODO EVO: 9 PASOS CIENTÍFICOS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-tech text-amber-400 font-black uppercase tracking-widest">
            METODOLOGÍA DE INGENIERÍA
          </span>
        </div>
        <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
          EL MÉTODO EVO // 9 PASOS PERICIALES
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 font-mono-tech text-xs">
          {methodSteps.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90 space-y-1.5 shadow-md">
              <span className="text-[10px] text-zinc-500 font-mono block font-black">FASE {m.step}</span>
              <strong className="text-amber-400 text-sm block font-display uppercase">{m.verb}</strong>
              <p className="text-zinc-300 font-sans-editorial text-xs leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ECOSISTEMA EVO: MATRIZ DE MOTORES Y SERVICIOS */}
      <div className="space-y-4 pt-2">
        <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
          ECOSISTEMA EVO // MOTORES Y CAPACIDADES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-tech text-xs">
          {ecosystemEngines.map((eng, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm uppercase">{eng.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                  {eng.status}
                </span>
              </div>
              <p className="text-zinc-300 font-sans-editorial text-xs">{eng.role}</p>
              <div className="text-[10px] text-zinc-500 border-t border-zinc-900 pt-1.5">
                Ubicación: <strong className="text-zinc-400">{eng.where}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
