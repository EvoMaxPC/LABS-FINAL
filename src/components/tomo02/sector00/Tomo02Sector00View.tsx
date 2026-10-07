import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  Award,
  ArrowLeft,
  Search,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  FileText,
  Sliders,
  Terminal,
  Activity,
  Copy,
  Check,
  RotateCcw,
  Fingerprint,
  ShieldAlert,
  Cpu,
  ShieldCheck,
  Lock,
  Unlock,
} from 'lucide-react';
import {
  SECTOR_00_INVESTIGATIONS,
  Sector00Investigation,
  Sector00Passport,
  SECTOR_00_TUTOR_ADVICE,
} from '../../../data/tomo02Sector00Data';
import { TOMO_02_MASTER_SECTORS } from '../../../data/tomo02MasterSectors';
import { Tomo02Sector00PassportModal } from './Tomo02Sector00PassportModal';
import { Tomo02Sector00MiniCasesModal } from './Tomo02Sector00MiniCasesModal';
import { Tomo02Sector00TestView } from './Tomo02Sector00TestView';
import { Tomo02Sector00MissionView } from './Tomo02Sector00MissionView';

interface Tomo02Sector00ViewProps {
  onBackToMagazine?: () => void;
}

export const Tomo02Sector00View: React.FC<Tomo02Sector00ViewProps> = ({
  onBackToMagazine,
}) => {
  // Navigation & Subviews
  const [activeTab, setActiveTab] = useState<'reader' | 'mission' | 'test'>('reader');
  const [selectedInvIndex, setSelectedInvIndex] = useState(0);
  const [showPassportModal, setShowPassportModal] = useState(false);
  const [showCasesModal, setShowCasesModal] = useState(false);

  // Progress state
  const [completedInvestigations, setCompletedInvestigations] = useState<Record<string, boolean>>({});
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, any>>({});
  const [challengeSuccess, setChallengeSuccess] = useState<Record<string, boolean>>({});
  
  // Mission & Passport state
  const [passportData, setPassportData] = useState<Sector00Passport>({
    passportId: 'EVO-WIN-PASSPORT-001-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    edition: {
      fieldKey: 'edition',
      label: 'Edición del SO',
      value: 'Windows 11 Pro',
      source: 'winver / registry',
      provenance: 'SYSTEM_REPORTED',
      confidence: 'HIGH',
      timestamp: new Date().toISOString(),
    },
    version: {
      fieldKey: 'version',
      label: 'Versión del Sistema',
      value: '24H2',
      source: 'winver',
      provenance: 'SYSTEM_REPORTED',
      confidence: 'HIGH',
      timestamp: new Date().toISOString(),
    },
    build: {
      fieldKey: 'build',
      label: 'Compilación del SO (Build)',
      value: '26100.2033',
      source: 'winver (OS Build)',
      provenance: 'SYSTEM_REPORTED',
      confidence: 'HIGH',
      timestamp: new Date().toISOString(),
    },
    architecture: {
      fieldKey: 'architecture',
      label: 'Arquitectura',
      value: 'x64 (64-bit)',
      source: 'msinfo32',
      provenance: 'SYSTEM_REPORTED',
      confidence: 'HIGH',
      timestamp: new Date().toISOString(),
    },
    accountType: {
      fieldKey: 'accountType',
      label: 'Tipo de Cuenta',
      value: 'Cuenta Local',
      source: 'Configuración > Cuentas',
      provenance: 'OBSERVED',
      confidence: 'HIGH',
      timestamp: new Date().toISOString(),
    },
    privilege: {
      fieldKey: 'privilege',
      label: 'Contexto de Privilegio',
      value: 'Administrador (Split Token / Medium Integrity)',
      source: 'whoami /priv',
      provenance: 'OBSERVED',
      confidence: 'HIGH',
      timestamp: new Date().toISOString(),
    },
    systemDrive: {
      fieldKey: 'systemDrive',
      label: 'Unidad del Sistema',
      value: 'C:',
      source: '%SYSTEMDRIVE%',
      provenance: 'SYSTEM_REPORTED',
      confidence: 'HIGH',
      timestamp: new Date().toISOString(),
    },
    windowsPath: {
      fieldKey: 'windowsPath',
      label: 'Ruta de Windows',
      value: 'C:\\Windows',
      source: '%WINDIR%',
      provenance: 'SYSTEM_REPORTED',
      confidence: 'HIGH',
      timestamp: new Date().toISOString(),
    },
    userProfile: {
      fieldKey: 'userProfile',
      label: 'Ruta de Perfil de Usuario',
      value: 'C:\\Users\\TecnicoEVO',
      source: '%USERPROFILE%',
      provenance: 'SYSTEM_REPORTED',
      confidence: 'HIGH',
      timestamp: new Date().toISOString(),
    },
    baseline: {
      captured: true,
      timestamp: new Date().toISOString(),
      ramTotalGB: 16,
      diskFreeGB: 128,
      processCount: 142,
      startupAppsCount: 6,
      bootTimeSec: 13.8,
    },
  });

  const [isMissionPassed, setIsMissionPassed] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);
  const [solvedCasesCount, setSolvedCasesCount] = useState(0);

  const currentInv = SECTOR_00_INVESTIGATIONS[selectedInvIndex];
  const isCurrentCompleted = completedInvestigations[currentInv.id];

  // Drag & Sort local state for order challenges
  const [sortOrder, setSortOrder] = useState<string[]>([]);

  useEffect(() => {
    if (currentInv.microdesafio.sortableItems) {
      // Shuffle initial items
      const initial = [...currentInv.microdesafio.sortableItems]
        .sort(() => 0.5 - Math.random())
        .map((i) => i.id);
      setSortOrder(initial);
    }
  }, [selectedInvIndex]);

  // Challenge evaluation logic
  const handleAnswerOption = (optId: string) => {
    setChallengeAnswers((prev) => ({ ...prev, [currentInv.id]: optId }));
    const opt = currentInv.microdesafio.options?.find((o) => o.id === optId);
    if (opt && opt.isCorrect) {
      setChallengeSuccess((prev) => ({ ...prev, [currentInv.id]: true }));
      setCompletedInvestigations((prev) => ({ ...prev, [currentInv.id]: true }));
    }
  };

  const handleVerifyOrder = () => {
    const items = currentInv.microdesafio.sortableItems;
    if (!items) return;
    const isCorrect = sortOrder.every((id, idx) => {
      const item = items.find((it) => it.id === id);
      return item?.correctIndex === idx;
    });

    if (isCorrect) {
      setChallengeSuccess((prev) => ({ ...prev, [currentInv.id]: true }));
      setCompletedInvestigations((prev) => ({ ...prev, [currentInv.id]: true }));
    } else {
      alert('El orden no es correcto aún. Revisá la jerarquía conceptual y volvé a intentar.');
    }
  };

  const moveSortItem = (fromIdx: number, toIdx: number) => {
    const updated = [...sortOrder];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setSortOrder(updated);
  };

  // Sector 01 Unlock status
  const totalCompletedInvs = Object.values(completedInvestigations).filter(Boolean).length;
  const isTestPassed = testScore !== null && testScore >= 70;
  const isSector01Unlocked = totalCompletedInvs >= 10 && isMissionPassed && isTestPassed;

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col font-sans-editorial">
      
      {/* Top Banner Header */}
      <header className="sticky top-0 z-40 bg-[#07090f]/95 backdrop-blur-md border-b border-cyan-500/30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3 sm:gap-4">
          {onBackToMagazine && (
            <button
              onClick={onBackToMagazine}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
              title="Volver a la vista general del Tomo 02"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00D2FF]" />
            <span className="text-xs font-mono-tech font-black tracking-widest text-cyan-400 uppercase">
              TOMO 02 // SECTOR 00
            </span>
          </div>

          <div className="hidden md:block h-4 w-px bg-zinc-800" />

          <h1 className="hidden md:block text-xs font-mono-tech font-bold text-zinc-300 uppercase tracking-wider">
            DÍA CERO: ¿QUÉ WINDOWS TENÉS REALMENTE?
          </h1>
        </div>

        {/* Action badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPassportModal(true)}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-xs font-mono-tech text-cyan-300 font-bold flex items-center gap-1.5 transition-colors"
          >
            <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">PASAPORTE 001</span>
          </button>

          <button
            onClick={() => setShowCasesModal(true)}
            className="px-3 py-1.5 rounded-lg bg-yellow-950/60 hover:bg-yellow-900 border border-yellow-500/40 text-xs font-mono-tech text-yellow-300 font-bold flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-yellow-400" />
            <span className="hidden sm:inline">MINICASOS (5)</span>
          </button>

          <button
            onClick={() => setActiveTab('test')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech font-bold flex items-center gap-1.5 transition-colors ${
              isTestPassed
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">TEST PERICIAL</span>
          </button>
        </div>
      </header>

      {/* Main View Router */}
      {activeTab === 'test' ? (
        <Tomo02Sector00TestView
          onBack={() => setActiveTab('reader')}
          onPassTest={(score) => {
            setTestScore(score);
            setActiveTab('reader');
          }}
        />
      ) : activeTab === 'mission' ? (
        <Tomo02Sector00MissionView
          initialPassport={passportData}
          onSavePassport={(updated) => {
            setPassportData(updated);
            setIsMissionPassed(true);
          }}
          onBack={() => setActiveTab('reader')}
        />
      ) : (
        /* Standard Reader Hub */
        <div className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: 15 Investigations Navigation Index */}
          <aside className="lg:col-span-4 space-y-4">
            
            {/* Sector Hero Card */}
            <div className="p-5 rounded-2xl bg-[#090c12] border border-cyan-500/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-yellow-400 font-bold uppercase tracking-widest">
                  FASE 01 // SECTOR 00
                </span>
                <span className="text-cyan-400 font-bold">
                  {totalCompletedInvs}/15 INVESTIGACIONES
                </span>
              </div>

              <h2 className="text-lg font-display font-black text-white uppercase tracking-tight">
                ¿QUÉ WINDOWS TENÉS REALMENTE?
              </h2>

              <p className="text-xs text-zinc-300 font-sans-editorial leading-relaxed">
                “Pensás que tenés Windows 11. Eso no alcanza. Antes de modificar nada, identificá exactamente qué sistema tenés delante.”
              </p>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('mission')}
                  className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono-tech font-black text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isMissionPassed ? 'MISIÓN COMPLETADA ✓' : 'INICIAR MISIÓN DE IDENTIDAD'}</span>
                </button>
              </div>
            </div>

            {/* List of 15 investigations */}
            <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1 custom-scrollbar">
              {SECTOR_00_INVESTIGATIONS.map((inv, idx) => {
                const isSelected = idx === selectedInvIndex;
                const isDone = completedInvestigations[inv.id];

                return (
                  <button
                    key={inv.id}
                    onClick={() => setSelectedInvIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-md text-white'
                        : isDone
                        ? 'bg-[#0a1017] border-emerald-500/30 text-zinc-300 hover:border-emerald-500/60'
                        : 'bg-[#090c12] border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`text-xs font-mono-tech font-black px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-cyan-400 text-black'
                            : isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-zinc-900 text-zinc-400'
                        }`}
                      >
                        {inv.code}
                      </span>
                      <span className="text-xs font-display font-bold truncate">
                        {inv.title}
                      </span>
                    </div>

                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tutor EVO Floating Advice Drawer */}
            <div className="p-4 rounded-xl bg-[#09111c] border border-cyan-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400 font-bold uppercase">
                <Lightbulb className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span>TUTOR EVO // CONSEJO EN VIVO</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans-editorial italic leading-relaxed">
                {selectedInvIndex === 0
                  ? SECTOR_00_TUTOR_ADVICE[0].tip
                  : selectedInvIndex === 6
                  ? SECTOR_00_TUTOR_ADVICE[1].tip
                  : selectedInvIndex === 11
                  ? SECTOR_00_TUTOR_ADVICE[2].tip
                  : selectedInvIndex === 13
                  ? SECTOR_00_TUTOR_ADVICE[3].tip
                  : SECTOR_00_TUTOR_ADVICE[4].tip}
              </p>
            </div>

          </aside>

          {/* Right Column: Active Investigation Reader & Cycle */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Header of the Investigation */}
            <div className="p-6 rounded-2xl bg-[#090c12] border border-cyan-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-xs font-mono-tech font-black text-cyan-300">
                    INVESTIGACIÓN {currentInv.code}
                  </span>
                  <span className="text-xs font-mono-tech text-zinc-400">
                    EVO PEDAGOGICAL CYCLE
                  </span>
                </div>

                {isCurrentCompleted && (
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono-tech font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> COMPROBADO
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  {currentInv.title}
                </h2>
                <p className="text-sm font-mono-tech text-cyan-400 font-bold mt-1">
                  “{currentInv.subtitle}”
                </p>
              </div>

              {/* 1. DESCUBRÍ (Gancho & Mentira vs Verdad) */}
              <div className="p-4 rounded-xl bg-[#0c121d] border border-cyan-500/20 space-y-3">
                <div className="text-xs font-mono-tech text-yellow-400 font-black uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  1. DESCUBRÍ // GANCHO INICIAL
                </div>
                <p className="text-sm text-zinc-200 font-sans-editorial leading-relaxed">
                  {currentInv.descubri.hook}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 text-xs font-sans-editorial space-y-1">
                    <div className="font-mono-tech font-bold text-red-400 uppercase">MENTIRA COMÚN</div>
                    <div className="text-zinc-300">{currentInv.descubri.mythVsTruth.mentira}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs font-sans-editorial space-y-1">
                    <div className="font-mono-tech font-bold text-emerald-400 uppercase">VERDAD TÉCNICA</div>
                    <div className="text-zinc-200">{currentInv.descubri.mythVsTruth.verdad}</div>
                  </div>
                </div>
              </div>

              {/* 2. ENTENDÉ (Explicación desde cero) */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono-tech text-cyan-400 font-black uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  2. ENTENDÉ // {currentInv.entende.title}
                </div>

                <div className="space-y-2 text-sm text-zinc-300 font-sans-editorial leading-relaxed">
                  {currentInv.entende.explanation.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {currentInv.entende.diagramItems && (
                  <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                    <div className="text-[10px] font-mono-tech text-zinc-400 uppercase">
                      {currentInv.entende.diagramLabel}
                    </div>
                    <div className="space-y-1.5">
                      {currentInv.entende.diagramItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs font-mono-tech"
                        >
                          <span className="font-bold text-cyan-300">{item.label}</span>
                          <span className="text-zinc-400 text-[11px]">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. PROFUNDIZÁ (Qué ocurre a bajo nivel) */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono-tech text-purple-400 font-black uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  3. PROFUNDIZÁ // {currentInv.profundiza.title}
                </div>

                <div className="space-y-2 text-sm text-zinc-300 font-sans-editorial leading-relaxed">
                  {currentInv.profundiza.technicalDetails.map((det, i) => (
                    <p key={i}>• {det}</p>
                  ))}
                </div>

                {currentInv.profundiza.lowLevelNote && (
                  <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 text-xs font-mono-tech text-purple-300">
                    {currentInv.profundiza.lowLevelNote}
                  </div>
                )}
              </div>

              {/* 4. MÍRALO EN TU PC (Comando real) */}
              <div className="p-4 rounded-xl bg-[#09111c] border border-cyan-500/30 space-y-3">
                <div className="text-xs font-mono-tech text-cyan-300 font-black uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  4. MÍRALO EN TU PC // {currentInv.miraloEnTuPc.actionName}
                </div>

                <div className="space-y-1 text-xs sm:text-sm text-zinc-300 font-sans-editorial">
                  {currentInv.miraloEnTuPc.steps.map((st, i) => (
                    <div key={i}>{st}</div>
                  ))}
                </div>

                {currentInv.miraloEnTuPc.commandOrPath && (
                  <div className="p-2.5 rounded-lg bg-black border border-zinc-800 font-mono-tech text-xs text-yellow-300 flex items-center justify-between">
                    <span>{currentInv.miraloEnTuPc.commandOrPath}</span>
                    <span className="text-[10px] text-zinc-400">CMD / Win+R</span>
                  </div>
                )}
              </div>

              {/* 5. MICRODESAFÍO (Acción interactiva) */}
              <div className="p-5 rounded-xl bg-[#0f1523] border border-yellow-500/40 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono-tech text-yellow-400 font-black uppercase tracking-wider flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    5. MICRODESAFÍO EVO // ACCIÓN CONCRETA
                  </div>
                  <span className="text-[10px] font-mono-tech text-zinc-400">
                    TIPO: {currentInv.microdesafio.type}
                  </span>
                </div>

                <p className="text-sm font-display font-bold text-white">
                  {currentInv.microdesafio.question}
                </p>

                {/* Option selection challenge */}
                {currentInv.microdesafio.options && (
                  <div className="space-y-2">
                    {currentInv.microdesafio.options.map((opt) => {
                      const isSelected = challengeAnswers[currentInv.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleAnswerOption(opt.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-sans-editorial transition-all flex items-start gap-3 ${
                            isSelected
                              ? opt.isCorrect
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                                : 'bg-red-950/40 border-red-500 text-red-200'
                              : 'bg-black/40 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center text-[10px] font-mono-tech font-bold mt-0.5 ${
                              isSelected
                                ? opt.isCorrect
                                  ? 'border-emerald-400 bg-emerald-500 text-black'
                                  : 'border-red-400 bg-red-500 text-white'
                                : 'border-zinc-700'
                            }`}
                          >
                            {isSelected ? (opt.isCorrect ? '✓' : '✕') : ''}
                          </div>

                          <div className="flex-1">
                            <div>{opt.text}</div>
                            {isSelected && (
                              <div
                                className={`mt-2 p-2 rounded text-xs font-mono-tech ${
                                  opt.isCorrect ? 'bg-emerald-900/30 text-emerald-300' : 'bg-red-900/30 text-red-300'
                                }`}
                              >
                                {opt.feedback}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Sortable order challenge */}
                {currentInv.microdesafio.sortableItems && (
                  <div className="space-y-3">
                    <p className="text-xs text-zinc-400 font-mono-tech">
                      {currentInv.microdesafio.instruction}
                    </p>

                    <div className="space-y-2">
                      {sortOrder.map((itemId, idx) => {
                        const it = currentInv.microdesafio.sortableItems?.find((i) => i.id === itemId);
                        if (!it) return null;
                        return (
                          <div
                            key={itemId}
                            className="p-3 rounded-xl bg-black/60 border border-zinc-800 flex items-center justify-between gap-3 text-xs font-mono-tech"
                          >
                            <span className="text-zinc-200">{it.text}</span>
                            <div className="flex items-center gap-1">
                              <button
                                disabled={idx === 0}
                                onClick={() => moveSortItem(idx, idx - 1)}
                                className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 disabled:opacity-30"
                              >
                                ↑
                              </button>
                              <button
                                disabled={idx === sortOrder.length - 1}
                                onClick={() => moveSortItem(idx, idx + 1)}
                                className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 disabled:opacity-30"
                              >
                                ↓
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleVerifyOrder}
                      className="w-full py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-mono-tech font-black text-xs uppercase tracking-wider transition-colors shadow-md"
                    >
                      COMPROBAR ORDEN JERÁRQUICO
                    </button>
                  </div>
                )}
              </div>

              {/* 6. EVIDENCIA REGISTRADA */}
              <div className="p-4 rounded-xl bg-[#080d14] border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-wider font-bold">
                    6. EVIDENCIA PARA EL EXPEDIENTE 001
                  </div>
                  <div className="text-xs font-mono-tech text-zinc-300">
                    Campo: <span className="text-white font-bold">{currentInv.evidencia.fieldName}</span> ({currentInv.evidencia.targetDescription})
                  </div>
                  <div className="text-[10px] font-mono-tech text-zinc-400">
                    Procedencia por defecto: <span className="text-yellow-400">{currentInv.evidencia.defaultProvenance}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    disabled={selectedInvIndex === SECTOR_00_INVESTIGATIONS.length - 1}
                    onClick={() => setSelectedInvIndex((prev) => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono-tech font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-30 flex items-center gap-1.5"
                  >
                    <span>SIGUIENTE</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Sector Unlock Status Card */}
            <div className={`p-6 rounded-2xl border transition-all ${
              isSector01Unlocked
                ? 'bg-[#091a14] border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                : 'bg-[#090c12] border-zinc-800'
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    {isSector01Unlocked ? (
                      <Unlock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-zinc-500" />
                    )}
                    <span className="text-xs font-mono-tech font-bold uppercase tracking-widest text-cyan-400">
                      DESBLOQUEO DE SECTOR 01: ANTES DEL LOGO
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 font-sans-editorial">
                    “Windows todavía no apareció. Pero la PC ya tomó decisiones que determinarán todo lo que ocurra después.”
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-mono-tech text-zinc-400 pt-1">
                    <span>Investigaciones: {totalCompletedInvs}/10 mín.</span>
                    <span>Misión: {isMissionPassed ? 'COMPLETA ✓' : 'PENDIENTE'}</span>
                    <span>Test: {testScore !== null ? `${testScore}%` : 'PENDIENTE'}</span>
                  </div>
                </div>

                <button
                  disabled={!isSector01Unlocked}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono-tech font-black uppercase tracking-wider disabled:opacity-40 transition-all shrink-0 bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
                >
                  {isSector01Unlocked ? 'SECTOR 01 DESBLOQUEADO' : 'SECTOR 01 BLOQUEADO'}
                </button>
              </div>
            </div>

          </main>

        </div>
      )}

      {/* Passport Modal */}
      {showPassportModal && (
        <Tomo02Sector00PassportModal
          passport={passportData}
          onClose={() => setShowPassportModal(false)}
        />
      )}

      {/* Mini Cases Modal */}
      {showCasesModal && (
        <Tomo02Sector00MiniCasesModal
          onClose={() => setShowCasesModal(false)}
          onCaseSolved={() => setSolvedCasesCount((prev) => prev + 1)}
        />
      )}

    </div>
  );
};
