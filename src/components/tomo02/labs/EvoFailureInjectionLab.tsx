import React, { useState } from 'react';
import {
  AlertCircle,
  Activity,
  Clock,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ShieldAlert,
  Award,
  Sliders,
  Terminal,
  FileText
} from 'lucide-react';
import { EvidenceRail, NoBorresTodaviaModal, ProvenanceBadge } from './EvoDiffEngine';
import { EvoCaseRepository } from '../../evoLabCore/services/caseRepository';


export interface FailureScenario {
  id: string;
  title: string;
  symptom: string;
  initialObservation: string;
  timelineEvents: {
    time: string;
    event: string;
    source: string;
    eventID?: number;
    isCause: boolean;
  }[];
  correctHypothesis: string;
  wrongHypotheses: string[];
  recommendedTool: string;
  evidenceDetails: string;
  correctAction: string;
  rollbackAction: string;
  preventativeNote: string;
}

export const FAILURE_SCENARIOS: FailureScenario[] = [
  {
    id: 'fail1',
    title: 'CASO 01 // SERVICIO CRÍTICO DETENIDO',
    symptom: 'Sin conexión a páginas web en navegadores. El adaptador Ethernet indica "Conectado", pero ninguna URL carga.',
    initialObservation: 'Ejecutar ping 8.8.8.8 funciona correctamente, pero ping google.com indica "No se pudo encontrar el host".',
    timelineEvents: [
      { time: '10:00:02', event: 'Inicio de sistema completado en 14 segundos.', source: 'Kernel Boot', isCause: false },
      { time: '10:00:15', event: 'Servicio Cliente DNS (Dnscache) cambió estado a DETENIDO.', source: 'Service Control Manager', eventID: 7036, isCause: true },
      { time: '10:00:20', event: 'Navegador Edge reporta ERR_NAME_NOT_RESOLVED.', source: 'msedge.exe', isCause: false },
    ],
    correctHypothesis: 'El servicio Dnscache está detenido, impidiendo la resolución de nombres FQDN a direcciones IP.',
    wrongHypotheses: [
      'El cable de red de la placa madre está roto físicamente.',
      'El router de la compañía telefónica fue destruido.',
      'Hay que formatear Windows 11 de inmediato.'
    ],
    recommendedTool: 'Services.msc / Get-Service Dnscache',
    evidenceDetails: 'En Services.msc el servicio "Cliente DNS" figura en estado Detenido. Al iniciarlo, la navegación web se restaura instantáneamente.',
    correctAction: 'Iniciar el servicio Dnscache y asegurar que su tipo de arranque esté en Automático.',
    rollbackAction: 'Detener nuevamente el servicio Dnscache.',
    preventativeNote: 'Nunca deshabilites el servicio Dnscache buscando "ahorrar RAM".',
  },
  {
    id: 'fail2',
    title: 'CASO 02 // PROGRAMA DE INICIO EXCESIVO',
    symptom: 'Windows tarda 3 minutos en mostrar el escritorio fluido. El Administrador de Tareas reporta CPU al 95% durante los primeros 180 segundos.',
    initialObservation: 'Un programa de sincronización de terceros intenta indexar archivos simultáneamente con el arranque de Windows.',
    timelineEvents: [
      { time: '10:00:00', event: 'Logon de usuario completado.', source: 'Winlogon', isCause: false },
      { time: '10:00:05', event: 'Proceso HeavySyncApp.exe iniciado desde HKCU\\Run.', source: 'Explorer.exe', isCause: true },
      { time: '10:00:10', event: 'Uso de CPU alcanza el 98% en 4 núcleos.', source: 'Taskmgr', isCause: false },
    ],
    correctHypothesis: 'Un programa no esencial registrado en la clave Run del Registro satura la CPU durante la sesión interactiva.',
    wrongHypotheses: [
      'El procesador se sobrecalentó por falta de pasta térmica.',
      'Hay que comprar un procesador de 16 núcleos.'
    ],
    recommendedTool: 'Task Manager -> Inicio / Autoruns',
    evidenceDetails: 'En la pestaña Inicio del Administrador de Tareas, HeavySyncApp figura con Impacto Alto. Deshabilitar su autoarranque reduce el boot a 12 segundos.',
    correctAction: 'Deshabilitar el inicio automático de HeavySyncApp desde el Administrador de Tareas o Autoruns.',
    rollbackAction: 'Habilitar nuevamente HeavySyncApp en Inicio.',
    preventativeNote: 'Auditar periódicamente las aplicaciones de inicio.',
  },
  {
    id: 'fail3',
    title: 'CASO 03 // DRIVER CON LATENCIA DPC ELEVADA',
    symptom: 'Microcortes de audio y chasquidos al escuchar música o jugar, acompañados de tartamudeo (stuttering) cada 15 segundos.',
    initialObservation: 'LatencyMon registra picos de DPC execution time superiores a 3,200 µs.',
    timelineEvents: [
      { time: '10:12:00', event: 'Reproducción de audio iniciada en puerto WASAPI.', source: 'AudioSrv', isCause: false },
      { time: '10:12:15', event: 'Driver ndis.sys retiene IRQL 2 durante 3200 microsegundos.', source: 'LatencyMon', isCause: true },
      { time: '10:12:16', event: 'Buffer underrun en tarjeta de sonido Realtek (Chasquido).', source: 'AudioSrv', eventID: 102, isCause: false },
    ],
    correctHypothesis: 'El controlador Wi-Fi (ndis.sys) tiene el ahorro de energía en modo agresivo, causando retrasos DPC en el kernel.',
    wrongHypotheses: [
      'Los parlantes o auriculares están rotos físicamente.',
      'La memoria RAM está fallando.'
    ],
    recommendedTool: 'LatencyMon.exe & Administrador de Dispositivos',
    evidenceDetails: 'LatencyMon identifica ndis.sys con picos de 3200µs. Al desactivar "Permitir que el equipo apague este dispositivo para ahorrar energía" en las propiedades de la placa Wi-Fi, la latencia cae a 45µs.',
    correctAction: 'Desactivar el ahorro de energía agresivo en las propiedades del adaptador de red en devmgmt.msc.',
    rollbackAction: 'Reactivar el ahorro de energía del adaptador.',
    preventativeNote: 'No uses modos de ahorro de energía ultragresivos en adaptadores Wi-Fi en PCs de escritorio.',
  },
  {
    id: 'fail4',
    title: 'CASO 04 // DISCO MECÁNICO SATURADO AL 100%',
    symptom: 'El Administrador de Tareas muestra uso de Disco C: al 100% permanente. Las aplicaciones tardan 10 segundos en responder a un clic.',
    initialObservation: 'Un índice de búsqueda corrompido fuerza a SearchIndexer.exe a re-indexar archivos continuamente en un HDD mecánico de 5400 RPM.',
    timelineEvents: [
      { time: '10:00:00', event: 'Servicio Windows Search iniciado.', source: 'services.exe', isCause: false },
      { time: '10:02:00', event: 'SearchIndexer.exe detecta base de datos corrupta y reinicia recorrido de disco.', source: 'SearchIndexer', isCause: true },
      { time: '10:02:05', event: 'Tiempo de respuesta de disco alcanza 2,400 ms.', source: 'Resource Monitor', isCause: false },
    ],
    correctHypothesis: 'El servicio de indexación Windows Search está en un bucle infinito en un HDD con baja tasa de IOPS 4K.',
    wrongHypotheses: [
      'El disco rígido está destruido físicamente.',
      'Un virus formateó el disco.'
    ],
    recommendedTool: 'Resource Monitor -> Disco -> SearchIndexer.exe / Indexing Options',
    evidenceDetails: 'En el Monitor de Recursos, SearchIndexer.exe genera una cola de disco de 8.2. Reconstruir el índice desde Opciones de Indización resuelve la saturación.',
    correctAction: 'Reconstruir el índice de búsqueda o pausar Windows Search.',
    rollbackAction: 'Re-indexar normalmente.',
    preventativeNote: 'En HDDs mecánicos, limitar la indización a la carpeta de usuario únicamente.',
  },
  {
    id: 'fail5',
    title: 'CASO 05 // RAM BAJO PRESIÓN Y LEAK DE NON-PAGED POOL',
    symptom: 'Uso de memoria RAM alcanza el 95% en reposo con solo el escritorio abierto. Los procesos visibles en Taskmgr no suman más de 2 GB.',
    initialObservation: 'Fuga de memoria en el Non-Paged Pool del kernel causada por un driver de red antiguo.',
    timelineEvents: [
      { time: '09:00:00', event: 'PC encendida. Memoria Non-Paged Pool: 200 MB.', source: 'ntoskrnl', isCause: false },
      { time: '11:00:00', event: 'Tag Wfpn en Non-Paged Pool acumula 12 GB de asignaciones no liberadas.', source: 'Poolmon.exe', isCause: true },
      { time: '11:05:00', event: 'Windows reporta aviso de memoria insuficiente.', source: 'Resource-Option', eventID: 2004, isCause: false },
    ],
    correctHypothesis: 'Un controlador de red con fuga de memoria llena el Non-Paged Pool (memoria de Kernel que jamás se pagina a disco).',
    wrongHypotheses: [
      'Windows 11 utiliza 14 GB de RAM por culpa de la interfaz gráfica.',
      'Los módulos de memoria RAM están físicamente quemados.'
    ],
    recommendedTool: 'Poolmon.exe / RAMMap -> Non-Paged Pool',
    evidenceDetails: 'Poolmon revela el tag "Wfpn" asociado al driver Network Control. Actualizar el driver elimina el consumo anómalo.',
    correctAction: 'Actualizar el controlador de red a la versión WHQL del fabricante.',
    rollbackAction: 'Revertir al controlador anterior.',
    preventativeNote: 'Monitorear la columna Non-Paged Pool ante consumos invisibles de RAM.',
  },
  {
    id: 'fail6',
    title: 'CASO 06 // WINDOWS UPDATE STAGING EN SEGUNDO PLANO',
    symptom: 'El ventilador del procesador gira a máxima velocidad y el proceso TiWorker.exe consume 50% de CPU constante.',
    initialObservation: 'Windows Update está ensamblando una actualización acumulativa LCU en segundo plano.',
    timelineEvents: [
      { time: '10:30:00', event: 'Servicio TrustedInstaller iniciado.', source: 'TrustedInstaller', isCause: false },
      { time: '10:30:10', event: 'TiWorker.exe compila componentes WinSxS.', source: 'CBS', isCause: true },
    ],
    correctHypothesis: 'TiWorker.exe está realizando la fase de compilación e integración del almacén WinSxS. Es un proceso legítimo de mantenimiento.',
    wrongHypotheses: [
      'TiWorker.exe es un troyano minador de criptomonedas.',
      'Hay que matar forzadamente el proceso TrustedInstaller.'
    ],
    recommendedTool: 'Windows Update -> Ver historial / Configuración de Horas Activas',
    evidenceDetails: 'TiWorker.exe finaliza su trabajo de forma transparente en unos minutos. Matar el proceso corrompe la instalación del parche.',
    correctAction: 'Permitir que la instalación de parches finalice y configurar Horas Activas.',
    rollbackAction: 'Pausar actualizaciones por 7 días si es necesario.',
    preventativeNote: 'Nunca finalices forzadamente TiWorker.exe o TrustedInstaller.',
  },
  {
    id: 'fail7',
    title: 'CASO 07 // DNS INCORRECTO EN ADAPTADOR',
    symptom: 'La PC no navega por Internet tras cambiar la configuración de red. El router responde a pings pero ninguna web carga.',
    initialObservation: 'El servidor DNS primario del adaptador Ethernet fue cambiado por error a 127.0.0.1.',
    timelineEvents: [
      { time: '12:00:00', event: 'Cambio de configuración TCP/IPv4 en adaptador.', source: 'ncpa.cpl', isCause: true },
      { time: '12:01:00', event: 'Resolución de nombres falla.', source: 'DNS Client', isCause: false },
    ],
    correctHypothesis: 'El adaptador de red tiene configurada una dirección DNS de bucle local (127.0.0.1) que no resuelve dominios.',
    wrongHypotheses: [
      'La tarjeta de red de la PC se quemó por un rayo.',
      'El proveedor de Internet cortó el servicio.'
    ],
    recommendedTool: 'ncpa.cpl / Get-NetIPConfiguration',
    evidenceDetails: 'En las propiedades del adaptador Ethernet, el DNS figura como 127.0.0.1. Cambiarlo a "Obtener DNS automáticamente" o 1.1.1.1 restaura la navegación.',
    correctAction: 'Restablecer la configuración DNS a automático (DHCP) o usar DNS públicos legítimos (1.1.1.1 / 8.8.8.8).',
    rollbackAction: 'Volver a la configuración previa.',
    preventativeNote: 'Verificar siempre ncpa.cpl ante fallas de resolución de nombres.',
  },
  {
    id: 'fail8',
    title: 'CASO 08 // ARCHIVO DE SISTEMA CORRUPTO',
    symptom: 'Aplicaciones nativas de Windows cierran inesperadamente con código de excepción 0xc0000005 al iniciar.',
    initialObservation: 'Una librería DLL protegida del sistema en System32 sufrió corrupción de bloques.',
    timelineEvents: [
      { time: '14:00:00', event: 'Apagado repentino de energía durante escritura.', source: 'Kernel-Power', eventID: 41, isCause: true },
      { time: '14:05:00', event: 'Apertura de app falla por DLL corrupta.', source: 'Application Error', eventID: 1000, isCause: false },
    ],
    correctHypothesis: 'Una DLL de sistema se dañó por un corte de energía y requiere verificación de integridad.',
    wrongHypotheses: [
      'La placa de video está defectuosa.',
      'Hay que reinstalar todo el software de la computadora.'
    ],
    recommendedTool: 'DISM + SFC (DISM /Online /Cleanup-Image /RestoreHealth ; sfc /scannow)',
    evidenceDetails: 'DISM repara la fuente en WinSxS y SFC reemplaza la DLL dañada. Las aplicaciones vuelven a abrir normalmente.',
    correctAction: 'Ejecutar el comando en orden EVO: primero DISM RestoreHealth y luego sfc /scannow.',
    rollbackAction: 'No requiere reversión (mantiene binarios limpios firmados).',
    preventativeNote: 'Respetar el orden estricto: primero DISM, después SFC.',
  },
  {
    id: 'fail9',
    title: 'CASO 09 // REGRESIÓN DE DRIVER GRÁFICO (TDR)',
    symptom: 'La pantalla parpadea en negro durante 2 segundos mientras se ejecutan juegos y aparece una notificación: "El controlador de pantalla dejó de responder".',
    initialObservation: 'Un controlador Beta no certificado provoca cuelgues leves de GPU detectados por el Watchdog TDR de Windows.',
    timelineEvents: [
      { time: '15:00:00', event: 'Instalación de controlador GPU Beta v555.00.', source: 'Setup', isCause: true },
      { time: '15:20:00', event: 'Evento TDR 4101 registrado en Visor de Eventos.', source: 'Display', eventID: 4101, isCause: false },
    ],
    correctHypothesis: 'El nuevo controlador de video sufre TDR (Timeout Detection and Recovery) por inestabilidad de código.',
    wrongHypotheses: [
      'La placa madre o el monitor están físicamente destruidos.',
      'El procesador se rompió.'
    ],
    recommendedTool: 'devmgmt.msc -> Revertir al controlador anterior / Eventvwr Event ID 4101',
    evidenceDetails: 'En el Administrador de Dispositivos, seleccionar "Revertir al controlador anterior" restaura la versión estable WHQL previa.',
    correctAction: 'Utilizar la opción "Revertir al controlador anterior" en devmgmt.msc.',
    rollbackAction: 'Reinstalar el driver previo.',
    preventativeNote: 'Usar siempre controladores gráficos con certificación WHQL en equipos de trabajo.',
  },
  {
    id: 'fail10',
    title: 'CASO 10 // TAREA PROGRAMADA CON BUCLE DE REINTENTO',
    symptom: 'Cada hora exacta la computadora sufre un micro-congelamiento de 3 segundos y el ventilador acelera.',
    initialObservation: 'Una tarea programada intenta ejecutar un script en una ruta inexistente y reintenta indefinidamente.',
    timelineEvents: [
      { time: '11:00:00', event: 'Desencadenador de Tarea Programada ejecutable.', source: 'TaskScheduler', isCause: false },
      { time: '11:00:01', event: 'Script fallido reintenta 50 veces por segundo.', source: 'taskhostw.exe', eventID: 103, isCause: true },
    ],
    correctHypothesis: 'Una tarea huérfana en el Programador de Tareas ejecuta un comando fallido en bucle de reintento.',
    wrongHypotheses: [
      'El disco SSD expiró su vida útil.',
      'La fuente de alimentación no entrega suficiente voltaje.'
    ],
    recommendedTool: 'taskschd.msc (Programador de Tareas)',
    evidenceDetails: 'En el Programador de Tareas, la tarea "LegacyUpdater" figura en estado de error. Deshabilitar la tarea resuelve el micro-congelamiento horario.',
    correctAction: 'Deshabilitar la tarea programada problemática en taskschd.msc.',
    rollbackAction: 'Habilitar nuevamente la tarea si se requiere.',
    preventativeNote: 'Auditar la biblioteca del Programador de Tareas tras desinstalar software antiguo.',
  },
];

export const EvoFailureInjectionLab: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<FailureScenario>(FAILURE_SCENARIOS[0]);
  const [currentStage, setCurrentStage] = useState<'OBSERVACIÓN' | 'PRUEBA' | 'RESULTADO' | 'CONCLUSIÓN'>('OBSERVACIÓN');
  const [userHypothesis, setUserHypothesis] = useState<string | null>(null);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [noBorresOpen, setNoBorresOpen] = useState<boolean>(false);

  // Scoring Metrology State
  const [hasMeasuredFirst, setHasMeasuredFirst] = useState<boolean>(false);
  const [unnecessaryChangesCount, setUnnecessaryChangesCount] = useState<number>(0);

  const handleSelectHypothesis = (hyp: string) => {
    setUserHypothesis(hyp);
    if (hyp === selectedScenario.correctHypothesis) {
      setCurrentStage('PRUEBA');
    } else {
      setUnnecessaryChangesCount((prev) => prev + 1);
    }
  };

  const handleRunTest = () => {
    setHasMeasuredFirst(true);
    setCurrentStage('RESULTADO');
  };

  const handleExecuteFix = () => {
    setIsResolved(true);
    setCurrentStage('CONCLUSIÓN');

    // Persist as EvoCase
    EvoCaseRepository.saveCase({
      id: `case_${selectedScenario.id}_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      caseType: 'REPAIR',
      title: selectedScenario.title,
      summary: `Resolución del caso: ${selectedScenario.title}`,
      machine: EvoCaseRepository.getActiveMachine() || {
        id: 'simulated-machine',
        alias: 'Simulated Lab Machine',
        isDetected: false,
        overallProvenance: 'SIMULATED',
        motherboard: { model: 'Generic Lab Board', specsSummary: 'Simulated' } as any,
        cpu: { model: 'Generic Lab CPU', specsSummary: 'Simulated' } as any,
        ram: { model: 'Generic Lab RAM', specsSummary: 'Simulated' } as any,
        gpu: { model: 'Generic Lab GPU', specsSummary: 'Simulated' } as any,
        storage: { model: 'Generic Lab Storage', specsSummary: 'Simulated' } as any,
        psu: { model: 'Generic Lab PSU', specsSummary: 'Simulated' } as any,
        cooling: { model: 'Generic Lab Cooling', specsSummary: 'Simulated' } as any,
      },
      isClosed: true,
      conclusionNotes: `Score: ${calculateScore()} - ${selectedScenario.correctAction}`,
    });
  };

  const handleResetScenario = (scen: FailureScenario) => {
    setSelectedScenario(scen);
    setCurrentStage('OBSERVACIÓN');
    setUserHypothesis(null);
    setIsResolved(false);
    setHasMeasuredFirst(false);
    setUnnecessaryChangesCount(0);
  };

  // Calculate Diagnostic Score
  const calculateScore = () => {
    let score = 100;
    if (!hasMeasuredFirst) score -= 25;
    score -= unnecessaryChangesCount * 10;
    if (!isResolved) score -= 40;
    return Math.max(0, score);
  };

  return (
    <div className="w-full bg-[#05080E] border border-cyan-900/80 rounded-2xl p-4 sm:p-5 space-y-5 shadow-[0_0_50px_rgba(0,210,255,0.12)] font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              FAILURE INJECTION ENGINE // BANCO DE DIAGNÓSTICO DE FALLAS
            </h3>
            <span className="text-[10px] text-zinc-500">
              PRÁCTICA PERICIAL: SÍNTOMA ➔ EVIDENCIA ➔ HIPÓTESIS ➔ INTERVENCIÓN MÍNIMA
            </span>
          </div>
        </div>

        <ProvenanceBadge provenance="SIMULATED" />
      </div>

      {/* Scenario Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
        {FAILURE_SCENARIOS.map((scen, idx) => {
          const isSelected = selectedScenario.id === scen.id;
          return (
            <button
              key={scen.id}
              type="button"
              onClick={() => handleResetScenario(scen)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_12px_rgba(0,210,255,0.2)]'
                  : 'bg-black hover:bg-zinc-900 border-cyan-950 text-zinc-400'
              }`}
            >
              <div className="text-[9.5px] text-zinc-500 font-mono">CASO #{String(idx + 1).padStart(2, '0')}</div>
              <div className="text-[11px] font-bold text-white truncate">{scen.title.split('//')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Evidence Rail Tracker Component */}
      <EvidenceRail currentStage={currentStage} />

      {/* Main Investigation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[380px]">
        {/* Left 2 Cols: Incident Timeline & Evidence */}
        <div className="lg:col-span-2 bg-[#020408] border border-cyan-950 rounded-xl p-4 space-y-4">
          <div className="border-b border-cyan-950 pb-2 flex items-center justify-between">
            <h4 className="text-white font-bold text-sm">{selectedScenario.title}</h4>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
              ESTADO: {isResolved ? '● RESUELTO' : '▲ EN INVESTIGACIÓN'}
            </span>
          </div>

          {/* Symptom Card */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase">
              <AlertCircle className="w-4 h-4" />
              <span>SÍNTOMA REPORTADO POR EL USUARIO:</span>
            </div>
            <p className="text-zinc-200 text-xs font-sans-editorial leading-relaxed">
              {selectedScenario.symptom}
            </p>
          </div>

          {/* Incident Timeline & Event Correlator Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>LÍNEA TEMPORAL DE EVENTOS (INCIDENT TIMELINE):</span>
              <span className="text-[10px] text-zinc-500">CORRELACIÓN VS CAUSALIDAD</span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-cyan-950 bg-black">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-zinc-950 text-cyan-400 text-[10.5px] uppercase border-b border-cyan-950">
                  <tr>
                    <th className="p-2">HORA</th>
                    <th className="p-2">ORIGEN / FUENTE</th>
                    <th className="p-2">EVENTO / MENSAJE</th>
                    <th className="p-2 text-right">CAUSA REAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300 text-[11px]">
                  {selectedScenario.timelineEvents.map((ev, idx) => (
                    <tr key={idx} className={ev.isCause ? 'bg-amber-950/30 font-bold text-amber-200' : ''}>
                      <td className="p-2 text-zinc-400">{ev.time}</td>
                      <td className="p-2 text-cyan-300">{ev.source}</td>
                      <td className="p-2">{ev.event}</td>
                      <td className="p-2 text-right">
                        {ev.isCause ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black font-bold text-[9.5px]">
                            ▲ CAUSA RAÍZ
                          </span>
                        ) : (
                          <span className="text-zinc-500 text-[10px]">Efecto / Secundario</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Investigation Actions Stage by Stage */}
          {currentStage === 'OBSERVACIÓN' && (
            <div className="p-4 rounded-xl bg-black border border-cyan-900 space-y-3 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-cyan-300 uppercase">
                FORMULÁ TU HIPÓTESIS TÉCNICA BASADA EN LA OBSERVACIÓN:
              </div>

              <div className="space-y-2">
                {[selectedScenario.correctHypothesis, ...selectedScenario.wrongHypotheses].map((hyp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectHypothesis(hyp)}
                    className="w-full p-3 rounded-xl bg-zinc-950 hover:bg-cyan-950/40 border border-cyan-950 text-left text-xs font-sans-editorial text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    {hyp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStage === 'PRUEBA' && (
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/60 space-y-3 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-cyan-300 uppercase">
                HERRAMIENTA RECOMENDADA DE MEDICIÓN: {selectedScenario.recommendedTool}
              </div>
              <p className="text-xs text-zinc-300 font-sans-editorial">
                Ejecutá la medición para confirmar si la evidencia coincide con tu hipótesis antes de aplicar cualquier cambio.
              </p>
              <button
                type="button"
                onClick={handleRunTest}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.3)]"
              >
                OBTENER EVIDENCIA Y MEDIR →
              </button>
            </div>
          )}

          {currentStage === 'RESULTADO' && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/60 space-y-3 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-emerald-400 uppercase">
                EVIDENCIA OBTENIDA EN MEDICIÓN:
              </div>
              <p className="text-xs text-zinc-200 font-sans-editorial leading-relaxed">
                {selectedScenario.evidenceDetails}
              </p>
              <button
                type="button"
                onClick={() => setNoBorresOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                APLICAR INTERVENCIÓN MÍNIMA →
              </button>
            </div>
          )}

          {currentStage === 'CONCLUSIÓN' && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/80 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CASO RESUELTO // EVALUACIÓN DE PUNTUACIÓN DIAGNÓSTICA EVO:</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-emerald-500 text-black font-black text-sm font-mono">
                  {calculateScore()} / 100 PTS
                </span>
              </div>

              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed">
                {selectedScenario.preventativeNote}
              </p>
            </div>
          )}
        </div>

        {/* Right Col: Tutor Guidance & Score Summary */}
        <div className="bg-[#020408] border border-cyan-950 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="border-b border-cyan-950 pb-2 flex items-center gap-2 text-cyan-400">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider">ORIENTADOR TUTOR EVO</span>
            </div>

            <div className="p-3 rounded-xl bg-black border border-cyan-950 space-y-1">
              <span className="text-[10px] text-zinc-500 font-bold block uppercase">REGLA DE DIAGNÓSTICO</span>
              <p className="text-zinc-300 text-xs font-sans-editorial leading-relaxed">
                El Tutor EVO no entrega la respuesta servida. En cada paso debes validar la correlación temporal entre eventos y la causa física.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-cyan-950 space-y-2 text-xs">
              <span className="text-[10px] text-cyan-400 font-bold uppercase block">MÉTRICAS DE CALIDAD EN EVALUACIÓN:</span>
              <div className="space-y-1 text-[11px] text-zinc-300">
                <div className="flex justify-between">
                  <span>Causa Raíz Identificada:</span>
                  <strong className={userHypothesis === selectedScenario.correctHypothesis ? 'text-emerald-400' : 'text-zinc-500'}>
                    {userHypothesis === selectedScenario.correctHypothesis ? 'SÍ' : 'NO'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Medición Previa realizada:</span>
                  <strong className={hasMeasuredFirst ? 'text-emerald-400' : 'text-amber-400'}>
                    {hasMeasuredFirst ? 'SÍ' : 'NO'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Cambios Innecesarios:</span>
                  <strong className={unnecessaryChangesCount === 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {unnecessaryChangesCount}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <NoBorresTodaviaModal
        isOpen={noBorresOpen}
        actionTitle={selectedScenario.correctAction}
        actionType="DESHABILITAR"
        onConfirm={() => {
          setNoBorresOpen(false);
          handleExecuteFix();
        }}
        onCancel={() => setNoBorresOpen(false)}
      />
    </div>
  );
};
