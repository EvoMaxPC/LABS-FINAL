import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Info,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Sliders,
  Copy,
  Check
} from 'lucide-react';
import { ProvenanceBadge } from './EvoDiffEngine';

export type CommandShellMode = 'CMD' | 'POWERSHELL';
export type LabDifficultyMode = 'APRENDER' | 'TÉCNICO' | 'DESAFÍO';

export interface CommandExplainerData {
  command: string;
  shell: CommandShellMode;
  description: string;
  windowsSubsystem: string;
  requiresAdmin: boolean;
  riskLevel: 'BAJO' | 'MEDIO' | 'ALTO';
  modifiesSystem: boolean;
  isReversible: string;
  expectedOutput: string;
  commonError: string;
  exampleUsage: string;
  interpretationQuestion?: {
    prompt: string;
    options: {
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
}

export const COMMAND_DATABASE: Record<string, CommandExplainerData> = {
  // CMD Commands
  dir: {
    command: 'dir',
    shell: 'CMD',
    description: 'Muestra la lista de archivos y subdirectorios contenidos en el directorio actual de la consola.',
    windowsSubsystem: 'Sistema de Archivos NTFS / FAT32 (MFT Metadata)',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA (Sólo lectura)',
    expectedOutput: 'Tabla con fechas de modificación, marcas <DIR>, tamaño en bytes y nombres de archivo.',
    commonError: 'No encontrar un archivo por no estar en el directorio de trabajo correcto.',
    exampleUsage: 'dir C:\\Windows\\System32',
  },
  cd: {
    command: 'cd',
    shell: 'CMD',
    description: 'Cambia el directorio de trabajo actual de la consola CMD o muestra la ruta actual.',
    windowsSubsystem: 'Consola CMD (Environment Path State)',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Imprime la nueva ruta de acceso de la carpeta seleccionada.',
    commonError: 'Intentar cambiar de letra de unidad (ej. D:) sin escribir la letra directamente.',
    exampleUsage: 'cd C:\\Windows\\System32',
  },
  whoami: {
    command: 'whoami',
    shell: 'CMD',
    description: 'Muestra el nombre del dominio/equipo y del usuario de la sesión actual de Windows.',
    windowsSubsystem: 'LSA (Local Security Authority) & Tokens de Seguridad',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'DESKTOP-EVO\\UsuarioLab',
    commonError: 'Confundir el usuario de inicio de sesión con los privilegios de token elevado.',
    exampleUsage: 'whoami /groups',
  },
  hostname: {
    command: 'hostname',
    shell: 'CMD',
    description: 'Imprime el nombre de red NetBIOS asignado a esta computadora en Windows.',
    windowsSubsystem: 'Registro HKLM\\SYSTEM\\CurrentControlSet\\Control\\ComputerName',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'EVO-BENCH-PC01',
    commonError: 'Ninguno.',
    exampleUsage: 'hostname',
  },
  systeminfo: {
    command: 'systeminfo',
    shell: 'CMD',
    description: 'Muestra la configuración detallada de hardware, versión del Kernel NT, parches KB instalados y tiempo de arranque.',
    windowsSubsystem: 'WMI / CIM Repository & Windows Servicing',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Resumen con Fabricante de BIOS, RAM física total, Hotfixes KB y adaptadores de red.',
    commonError: 'Demora de unos segundos mientras consulta el repositorio WMI.',
    exampleUsage: 'systeminfo',
  },
  tasklist: {
    command: 'tasklist',
    shell: 'CMD',
    description: 'Muestra todos los procesos ejecutándose actualmente en User Mode y Kernel Mode con su PID y uso de memoria.',
    windowsSubsystem: 'Kernel Process Manager (ntoskrnl.exe)',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Lista con Nombre de imagen, PID, Nombre de sesión, Número de sesión y Uso de memoria (K).',
    commonError: 'Pensar que un proceso consumiendo RAM está corrupto cuando es Working Set activo legítimo.',
    exampleUsage: 'tasklist /fi "MEMUSAGE gt 100000"',
    interpretationQuestion: {
      prompt: 'Al ejecutar tasklist, observás un proceso llamado "svchost.exe" consumiendo 450 MB de RAM bajo la sesión de Usuario. ¿Qué concluís?',
      options: [
        {
          text: 'Es sospechoso: svchost.exe legítimo del sistema corre bajo servicios de Windows (LocalSystem/NetworkService), no iniciado manualmente en sesión de usuario.',
          isCorrect: true,
          explanation: '¡Excelente! svchost.exe en sesión de usuario o fuera de C:\\Windows\\System32 es un indicio pericial claro de malware enmascarado.'
        },
        {
          text: 'Es totalmente normal: svchost.exe siempre consume 500 MB en la cuenta del usuario.',
          isCorrect: false,
          explanation: 'Incorrecto: svchost.exe es el host de servicios que inicia services.exe en sesión 0.'
        },
        {
          text: 'Se debe formatear la PC inmediatamente sin revisar el PID.',
          isCorrect: false,
          explanation: 'Incorrecto: El técnico EVO investiga primero la ruta exacta del proceso antes de tomar decisiones agresivas.'
        }
      ]
    }
  },
  taskkill: {
    command: 'taskkill',
    shell: 'CMD',
    description: 'Finaliza uno o más procesos activos especificando su PID o nombre de ejecutable.',
    windowsSubsystem: 'Kernel Process Scheduler & TerminateProcess Syscall',
    requiresAdmin: true,
    riskLevel: 'MEDIO',
    modifiesSystem: true,
    isReversible: 'SÍ (Reiniciando el programa o servicio)',
    expectedOutput: 'CORRECTO: Se terminó el proceso "badapp.exe" con PID 4012.',
    commonError: 'Intentar matar csrss.exe o lsass.exe provoca BSOD inmediato (CRITICAL_PROCESS_DIED).',
    exampleUsage: 'taskkill /F /PID 4012',
  },
  driverquery: {
    command: 'driverquery',
    shell: 'CMD',
    description: 'Genera una lista de todos los controladores (.sys) cargados en el Kernel Mode de Windows.',
    windowsSubsystem: 'PnP Manager & Object Manager (C:\\Windows\\System32\\drivers)',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Nombre de módulo, Nombre para mostrar, Tipo de controlador y Fecha de vínculo.',
    commonError: 'Confundir la fecha de compilación del binario .sys con la fecha de instalación en Windows.',
    exampleUsage: 'driverquery /v',
  },
  ipconfig: {
    command: 'ipconfig',
    shell: 'CMD',
    description: 'Muestra las direcciones IP, Máscaras de Subred y Puerta de Enlace Predeterminada de los adaptadores de red.',
    windowsSubsystem: 'TCP/IP Stack (tcpip.sys) & DHCP Client',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Dirección IPv4 local (192.168.x.x), Gateway y estado del adaptador de red.',
    commonError: 'Ver la IP 169.254.x.x (APIPA) y no darse cuenta de que el router DHCP no asignó IP.',
    exampleUsage: 'ipconfig /all',
    interpretationQuestion: {
      prompt: 'Al ejecutar ipconfig /all, la dirección IPv4 del adaptador Ethernet muestra "169.254.42.10". ¿Qué significa?',
      options: [
        {
          text: 'APIPA: La PC no recibió respuesta del servidor DHCP del router y se autoasignó una dirección privada no enrutable a Internet.',
          isCorrect: true,
          explanation: '¡Exacto! El rango 169.254.0.0/16 indica falla de DHCP o cable de red desconectado de la LAN.'
        },
        {
          text: 'Que la computadora fue hackeada desde el exterior.',
          isCorrect: false,
          explanation: 'Incorrecto: APIPA es un protocolo estándar de reserva local cuando falla el DHCP.'
        },
        {
          text: 'Que la velocidad de fibra óptica aumentó al doble.',
          isCorrect: false,
          explanation: 'Incorrecto: APIPA no tiene relación con el ancho de banda.'
        }
      ]
    }
  },
  ping: {
    command: 'ping',
    shell: 'CMD',
    description: 'Envía paquetes ICMP Echo Request a un host remoto para probar conectividad y medir la latencia en milisegundos.',
    windowsSubsystem: 'Winsock Kernel & ICMP Protocol',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Respuesta desde 8.8.8.8: bytes=32 tiempo=14ms TTL=117',
    commonError: 'Asumir que si el ping falla, no hay internet; algunos firewalls bloquean paquetes ICMP por diseño.',
    exampleUsage: 'ping 1.1.1.1',
  },
  tracert: {
    command: 'tracert',
    shell: 'CMD',
    description: 'Rastrea la ruta que sigue un paquete de datos hacia un destino incrementando el campo TTL en cada salto.',
    windowsSubsystem: 'TCP/IP Routing Table & ICMP Time Exceeded',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Lista de routers IP intermedios hasta llegar al servidor de destino.',
    commonError: 'Ver "*" en un salto e interpretar que la conexión cayó (muchos routers ocultan su IP).',
    exampleUsage: 'tracert google.com',
  },
  nslookup: {
    command: 'nslookup',
    shell: 'CMD',
    description: 'Consulta los servidores DNS configurados para resolver un nombre de dominio en su dirección IP.',
    windowsSubsystem: 'DNS Client Service (dnscache)',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Nombre del servidor DNS primario e IP asociada al dominio consultado.',
    commonError: 'Tener un archivo C:\\Windows\\System32\\drivers\\etc\\hosts alterado que desvíe el tráfico.',
    exampleUsage: 'nslookup evolabs.com',
  },
  netstat: {
    command: 'netstat',
    shell: 'CMD',
    description: 'Muestra las conexiones TCP activas, puertos en escucha (LISTENING) y el PID del proceso propietario.',
    windowsSubsystem: 'NetIO & TCP/IP Socket Table',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Proto, Dirección local, Dirección remota, Estado (ESTABLISHED/LISTENING), PID.',
    commonError: 'Confundir conexiones en estado TIME_WAIT con infecciones activas.',
    exampleUsage: 'netstat -ano',
    interpretationQuestion: {
      prompt: 'En la salida de netstat -ano ves la línea: "TCP 0.0.0.0:4444 0.0.0.0:0 LISTENING PID 3108". ¿Qué significa?',
      options: [
        {
          text: 'Hay un proceso (PID 3108) escuchando en el puerto 4444 a la espera de conexiones entrantes. Es vital identificar qué programa corresponde a dicho PID.',
          isCorrect: true,
          explanation: '¡Excelente! Puertos desconocidos en LISTENING deben correlacionarse de inmediato con tasklist o Process Explorer.'
        },
        {
          text: 'Es el servicio de hora oficial de Windows.',
          isCorrect: false,
          explanation: 'Incorrecto: El servicio de hora usa UDP 123.'
        },
        {
          text: 'Significa que el disco rígido está lleno.',
          isCorrect: false,
          explanation: 'Incorrecto: netstat audita sockets de red, no almacenamiento.'
        }
      ]
    }
  },
  'sfc /scannow': {
    command: 'sfc /scannow',
    shell: 'CMD',
    description: 'Examina la integridad de todos los archivos protegidos del sistema y reemplaza las versiones corruptas con la copia de respaldo en WinSxS.',
    windowsSubsystem: 'System File Checker (sfc.exe) & Component-Based Servicing (CBS)',
    requiresAdmin: true,
    riskLevel: 'MEDIO',
    modifiesSystem: true,
    isReversible: 'NUNCA NECESARIO (Restaura archivos sanos originales)',
    expectedOutput: 'Protección de recursos de Windows no encontró ninguna infracción de integridad (o reparó archivos dañados).',
    commonError: 'Ejecutar SFC cuando el almacén de componentes WinSxS está dañado. La regla EVO exige ejecutar DISM primero.',
    exampleUsage: 'sfc /scannow',
  },
  DISM: {
    command: 'DISM',
    shell: 'CMD',
    description: 'Servicio de imágenes de Windows (Deployment Image Servicing and Management). Repara la imagen base y el almacén de componentes de Windows.',
    windowsSubsystem: 'CBS Engine & Windows Update Repositories',
    requiresAdmin: true,
    riskLevel: 'MEDIO',
    modifiesSystem: true,
    isReversible: 'SÍ',
    expectedOutput: 'La operación de restauración se completó correctamente. El almacén de componentes quedó reparado.',
    commonError: 'No tener conexión a Internet o no especificar la fuente ISO cuando la imagen local está irrecuperable.',
    exampleUsage: 'DISM /Online /Cleanup-Image /RestoreHealth',
  },
  chkdsk: {
    command: 'chkdsk',
    shell: 'CMD',
    description: 'Comprueba el sistema de archivos NTFS/FAT32 y los metadatos de un volumen en busca de errores lógicos o sectores físicos dañados.',
    windowsSubsystem: 'NTFS Filesystem Driver (ntfs.sys) & Disk Class Driver',
    requiresAdmin: true,
    riskLevel: 'ALTO',
    modifiesSystem: true,
    isReversible: 'NO (Los cambios en estructuras MFT son irreversibles)',
    expectedOutput: 'Examen de estructuras NTFS sin errores de clúster ni índices huérfanos.',
    commonError: '¡CRÍTICO EVO! Ejecutar chkdsk /r de forma repetitiva en un disco mecánico moribundo con sectores físicamente degradados destruirá los datos antes de poder clonarlos.',
    exampleUsage: 'chkdsk C: /f',
  },

  // PowerShell Commands
  'Get-Process': {
    command: 'Get-Process',
    shell: 'POWERSHELL',
    description: 'Obtiene una lista de todos los procesos activos en el sistema como objetos fuertemente tipados .NET.',
    windowsSubsystem: 'System.Diagnostics.Process (.NET Framework & Kernel NT)',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Objetos con propiedades: NPM(K), PM(K), WS(K), CPU(s), Id, ProcessName.',
    commonError: 'Pensar que la salida es solo texto en lugar de objetos estructurados procesables por pipeline (|).',
    exampleUsage: 'Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 5',
    interpretationQuestion: {
      prompt: 'Al ejecutar "Get-Process | Sort-Object WorkingSet64 -Descending | Select -First 3", el primer resultado es "msedge" con WorkingSet de 1,200,000,000 bytes. ¿Cuánta RAM consume?',
      options: [
        {
          text: 'Aproximadamente 1.2 GB de memoria física Working Set.',
          isCorrect: true,
          explanation: '¡Correcto! 1,200,000,000 bytes divididos por 1024^2 equivalen a ~1.14 GB de RAM.'
        },
        {
          text: '12 GB de VRAM gráfica.',
          isCorrect: false,
          explanation: 'Incorrecto: WorkingSet64 mide memoria RAM física privada y compartida alojada.'
        },
        {
          text: '1.2 MB de caché de disco.',
          isCorrect: false,
          explanation: 'Incorrecto: 1,200,000,000 de bytes son Gigabytes, no Megabytes.'
        }
      ]
    }
  },
  'Get-Service': {
    command: 'Get-Service',
    shell: 'POWERSHELL',
    description: 'Obtiene el estado de los servicios registrados en el Service Control Manager (services.msc).',
    windowsSubsystem: 'Service Control Manager (services.exe)',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Status (Running/Stopped), Name, DisplayName.',
    commonError: 'Confundir el Name (nombre corto interno) con el DisplayName (nombre para mostrar en la UI).',
    exampleUsage: 'Get-Service | Where-Object Status -eq "Running"',
  },
  'Get-CimInstance': {
    command: 'Get-CimInstance',
    shell: 'POWERSHELL',
    description: 'Consulta clases CIM/WMI de la infraestructura de administración de Windows para obtener telemetría profunda de hardware y sistema.',
    windowsSubsystem: 'CIM Server (wbemkw.dll) & WMI Repository',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Instancias con atributos detallados de BIOS, Procesador, Placa Madre o Sistema Operativo.',
    commonError: 'Usar el comando obsoleto Get-WmiObject en lugar de Get-CimInstance (recomendado en PS 7+).',
    exampleUsage: 'Get-CimInstance Win32_OperatingSystem | Select-Object LastBootUpTime, FreePhysicalMemory',
  },
  'Get-NetAdapter': {
    command: 'Get-NetAdapter',
    shell: 'POWERSHELL',
    description: 'Obtiene las propiedades físicas y lógicas de los adaptadores de red (Ethernet, Wi-Fi, VPN).',
    windowsSubsystem: 'NDIS Core & Network Stack Interface (NSI)',
    requiresAdmin: false,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'Name, InterfaceDescription, Status (Up/Disconnected), LinkSpeed (1 Gbps).',
    commonError: 'Deshabilitar un adaptador virtual creyendo que es un dispositivo físico de la placa madre.',
    exampleUsage: 'Get-NetAdapter | Where-Object Status -eq "Up"',
  },
  'Get-WinEvent': {
    command: 'Get-WinEvent',
    shell: 'POWERSHELL',
    description: 'Consulta de forma ultra veloz los registros de eventos de Windows (.evtx) y registros de Event Tracing for Windows (ETW).',
    windowsSubsystem: 'Windows Event Log API (wevtapi.dll)',
    requiresAdmin: true,
    riskLevel: 'BAJO',
    modifiesSystem: false,
    isReversible: 'NO APLICA',
    expectedOutput: 'TimeCreated, ProviderName, Id, Message de logs System, Application o Security.',
    commonError: 'No filtrar por MaxEvents o Hashtable de filtro y congelar la consola al leer logs de varios Gigabytes.',
    exampleUsage: 'Get-WinEvent -LogName System -MaxEvents 10 | Select-Object TimeCreated, Id, Message',
  }
};

export interface EvoCommandLabProps {
  initialShell?: CommandShellMode;
  initialMode?: LabDifficultyMode;
  onOpenExplainer?: (cmd: string) => void;
  onQuestionAnswered?: (isCorrect: boolean) => void;
}

export const EvoCommandLab: React.FC<EvoCommandLabProps> = ({
  initialShell = 'CMD',
  initialMode = 'APRENDER',
  onQuestionAnswered,
}) => {
  const [shell, setShell] = useState<CommandShellMode>(initialShell);
  const [labMode, setLabMode] = useState<LabDifficultyMode>(initialMode);
  const [inputCommand, setCommandLine] = useState<string>('');
  const [history, setHistory] = useState<
    {
      id: string;
      shell: CommandShellMode;
      command: string;
      output: string;
      timestamp: string;
      explainerKey?: string;
    }[]
  >([
    {
      id: 'h0',
      shell: 'CMD',
      command: 'ver',
      output: 'Microsoft Windows [Versión 10.0.22631.3880] (c) Microsoft Corporation. [SIMULATED]',
      timestamp: '10:00:00',
    },
  ]);

  const [activeExplainer, setActiveExplainer] = useState<CommandExplainerData | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<{
    cmdKey: string;
    prompt: string;
    options: { text: string; isCorrect: boolean; explanation: string }[];
    answered?: boolean;
    selectedIdx?: number;
  } | null>(null);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, activeQuestion]);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputCommand.trim();
    if (!trimmed) return;

    const baseCmd = trimmed.split(' ')[0].toLowerCase();
    let explainerMatch: CommandExplainerData | undefined = undefined;

    // Look up in database
    Object.keys(COMMAND_DATABASE).forEach((key) => {
      if (key.toLowerCase() === trimmed.toLowerCase() || key.toLowerCase() === baseCmd) {
        explainerMatch = COMMAND_DATABASE[key];
      }
    });

    let simulatedOutput = '';
    if (explainerMatch) {
      simulatedOutput = `[SIMULATED OUTPUT] ${explainerMatch.expectedOutput}\n\nNota EVO: Consulta ejecutada en el subsistema: ${explainerMatch.windowsSubsystem}. Status: 200 OK.`;
    } else {
      simulatedOutput =
        shell === 'CMD'
          ? `'${trimmed}' no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable. [SIMULATED]`
          : `Get-Command : El término '${trimmed}' no se reconoce como nombre de un cmdlet, función, archivo de script o programa ejecutable. [SIMULATED]`;
    }

    const newRecord = {
      id: `cmd_${Date.now()}`,
      shell,
      command: trimmed,
      output: simulatedOutput,
      timestamp: new Date().toLocaleTimeString(),
      explainerKey: explainerMatch ? explainerMatch.command : undefined,
    };

    setHistory((prev) => [...prev, newRecord]);
    setCommandLine('');

    if (explainerMatch && explainerMatch.interpretationQuestion && labMode !== 'DESAFÍO') {
      const q = explainerMatch.interpretationQuestion;
      setActiveQuestion({
        cmdKey: explainerMatch.command,
        prompt: q.prompt,
        options: q.options,
      });
    }
  };

  return (
    <div className="w-full bg-[#05080E] border border-cyan-900/80 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,210,255,0.12)] font-mono-tech flex flex-col min-h-[580px]">
      {/* Top Controls Bar */}
      <div className="p-3 sm:p-4 bg-zinc-950 border-b border-cyan-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-white text-sm tracking-wider uppercase">
            EVO COMMAND LAB // SIMULADOR DE CONSOLA
          </span>
          <ProvenanceBadge provenance="SIMULATED" />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Shell Toggle */}
          <div className="flex items-center bg-black p-1 rounded-xl border border-cyan-950">
            <button
              type="button"
              onClick={() => setShell('CMD')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                shell === 'CMD'
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,210,255,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              CMD (Símbolo del sistema)
            </button>
            <button
              type="button"
              onClick={() => setShell('POWERSHELL')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                shell === 'POWERSHELL'
                  ? 'bg-blue-500 text-black shadow-[0_0_10px_rgba(59,130,246,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              PowerShell (x64)
            </button>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-cyan-950 text-xs">
            <span className="text-zinc-500 px-2 text-[10px] uppercase font-bold">MODO:</span>
            {(['APRENDER', 'TÉCNICO', 'DESAFÍO'] as LabDifficultyMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setLabMode(m)}
                className={`px-2.5 py-0.5 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
                  labMode === m
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 min-h-0">
        {/* Left 2 Cols: Terminal Screen */}
        <div className="lg:col-span-2 bg-[#020408] p-4 flex flex-col justify-between overflow-y-auto max-h-[500px] border-r border-cyan-950">
          <div className="space-y-4">
            <div className="text-[11px] text-zinc-500 border-b border-zinc-900 pb-2">
              Entorno seguro de ejecución educativa EVO. Todos los comandos retornan respuestas técnicas simuladas sin alterar tu sistema real.
            </div>

            {history.map((h) => (
              <div key={h.id} className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-zinc-400">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <span className="text-emerald-400 font-bold">
                      {h.shell === 'CMD' ? 'C:\\Windows\\System32>' : 'PS C:\\EVO\\Lab>'}
                    </span>
                    <span className="text-white font-bold">{h.command}</span>
                  </div>
                  <span className="text-[10px] text-zinc-600">{h.timestamp}</span>
                </div>

                <pre className="p-2.5 rounded-lg bg-black/80 border border-cyan-950/60 text-zinc-300 text-[11px] whitespace-pre-wrap font-mono leading-relaxed">
                  {h.output}
                </pre>

                {h.explainerKey && COMMAND_DATABASE[h.explainerKey] && (
                  <button
                    type="button"
                    onClick={() => setActiveExplainer(COMMAND_DATABASE[h.explainerKey!])}
                    className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 underline font-bold cursor-pointer"
                  >
                    <Info className="w-3 h-3 text-cyan-400" />
                    <span>Ver Ficha Técnica Command Explainer ({h.explainerKey})</span>
                  </button>
                )}
              </div>
            ))}

            {/* Interactive Interpretation Question Prompt */}
            {activeQuestion && (
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/60 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <span>PREGUNTA DE INTERPRETACIONAL EVO ({activeQuestion.cmdKey}):</span>
                </div>
                <p className="text-xs text-zinc-200 font-sans-editorial leading-relaxed">
                  {activeQuestion.prompt}
                </p>

                <div className="space-y-1.5">
                  {activeQuestion.options.map((opt, idx) => {
                    const isSelected = activeQuestion.selectedIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActiveQuestion({
                            ...activeQuestion,
                            answered: true,
                            selectedIdx: idx,
                          });
                          if (onQuestionAnswered) onQuestionAnswered(opt.isCorrect);
                        }}
                        className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          activeQuestion.answered
                            ? opt.isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                              : isSelected
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-black/50 border-zinc-800 text-zinc-500'
                            : 'bg-black hover:bg-cyan-950/40 border-cyan-950 text-zinc-300'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-bold font-mono">{String.fromCharCode(65 + idx)})</span>
                          <span>{opt.text}</span>
                        </div>
                        {activeQuestion.answered && isSelected && (
                          <div className="mt-1 text-[10.5px] font-sans-editorial text-zinc-300 border-t border-cyan-900/50 pt-1">
                            {opt.explanation}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleRunCommand} className="mt-4 flex items-center gap-2 border-t border-cyan-950 pt-3">
            <span className="text-emerald-400 font-bold text-xs shrink-0">
              {shell === 'CMD' ? 'C:\\Windows\\System32>' : 'PS C:\\EVO\\Lab>'}
            </span>
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setCommandLine(e.target.value)}
              placeholder={
                shell === 'CMD'
                  ? 'Escribí un comando (ej: ipconfig, tasklist, systeminfo, sfc /scannow)...'
                  : 'Escribí un cmdlet (ej: Get-Process, Get-Service, Get-NetAdapter)...'
              }
              className="flex-1 bg-black border border-cyan-900 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(0,210,255,0.3)]"
            >
              EJECUTAR
            </button>
          </form>
        </div>

        {/* Right Col: Helper Suggestions & Command Explainer Side Panel */}
        <div className="bg-[#070A10] p-4 space-y-4 border-l border-cyan-950 overflow-y-auto max-h-[500px]">
          {activeExplainer ? (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  FICHA TÉCNICA // COMMAND EXPLAINER
                </span>
                <button
                  type="button"
                  onClick={() => setActiveExplainer(null)}
                  className="text-zinc-500 hover:text-white text-xs underline font-bold cursor-pointer"
                >
                  Cerrar
                </button>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-black border border-cyan-900/80">
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold">COMANDO Y SHELL</span>
                  <code className="text-cyan-300 font-bold text-sm">{activeExplainer.command}</code>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">Shell: {activeExplainer.shell}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-950 border border-cyan-950 space-y-1">
                  <span className="text-[10px] text-cyan-400 block uppercase font-bold">QUÉ HACE</span>
                  <p className="text-zinc-300 text-[11px] font-sans-editorial leading-relaxed">
                    {activeExplainer.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2 rounded bg-zinc-950 border border-cyan-950">
                    <span className="text-zinc-500 block text-[9.5px]">SUBSISTEMA:</span>
                    <span className="text-zinc-200 font-bold">{activeExplainer.windowsSubsystem}</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-cyan-950">
                    <span className="text-zinc-500 block text-[9.5px]">REQUIERE ADMIN:</span>
                    <span className={activeExplainer.requiresAdmin ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {activeExplainer.requiresAdmin ? 'SÍ (Elevado)' : 'NO (Estándar)'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2 rounded bg-zinc-950 border border-cyan-950">
                    <span className="text-zinc-500 block text-[9.5px]">NIVEL DE RIESGO:</span>
                    <span className="text-cyan-300 font-bold">{activeExplainer.riskLevel}</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-cyan-950">
                    <span className="text-zinc-500 block text-[9.5px]">MODIFICA SISTEMA:</span>
                    <span className={activeExplainer.modifiesSystem ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {activeExplainer.modifiesSystem ? 'SÍ' : 'NO (Lectura)'}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-950 border border-cyan-950 space-y-1">
                  <span className="text-[10px] text-amber-400 block uppercase font-bold">ERROR COMÚN HABITUAL</span>
                  <p className="text-zinc-300 text-[11px] font-sans-editorial">
                    {activeExplainer.commonError}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-black border border-cyan-900/60 space-y-1">
                  <span className="text-[10px] text-emerald-400 block uppercase font-bold">EJEMPLO PRÁCTICO EVO</span>
                  <code className="text-cyan-200 text-[11px] block">{activeExplainer.exampleUsage}</code>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  COMANDOS SUGERIDOS ({shell})
                </span>
                <span className="text-[10px] text-zinc-500">MODO {labMode}</span>
              </div>

              <div className="space-y-2">
                {Object.values(COMMAND_DATABASE)
                  .filter((cmd) => cmd.shell === shell)
                  .map((cmd) => (
                    <button
                      key={cmd.command}
                      type="button"
                      onClick={() => {
                        setCommandLine(cmd.command);
                        setActiveExplainer(cmd);
                      }}
                      className="w-full p-2.5 rounded-xl bg-black hover:bg-cyan-950/40 border border-cyan-950 text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <code className="text-cyan-300 font-bold text-xs group-hover:text-cyan-200">
                          {cmd.command}
                        </code>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 font-bold border border-zinc-800">
                          {cmd.riskLevel}
                        </span>
                      </div>
                      <p className="text-[10.5px] text-zinc-400 font-sans-editorial mt-1 line-clamp-2">
                        {cmd.description}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
