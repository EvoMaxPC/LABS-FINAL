import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Sliders,
  Download,
  ShieldAlert,
  Info,
  CheckCircle2
} from 'lucide-react';
import { EvoDiffViewer, DiffItem, ProvenanceBadge } from './EvoDiffEngine';

export interface RegistryValue {
  name: string;
  type: 'REG_SZ' | 'REG_DWORD' | 'REG_QWORD' | 'REG_BINARY';
  data: string;
  description?: string;
  simulatedEffect?: string;
}

export interface RegistryKeyNode {
  name: string;
  path: string;
  subkeys?: RegistryKeyNode[];
  values?: RegistryValue[];
}

const INITIAL_REGISTRY_TREE: RegistryKeyNode = {
  name: 'Computer',
  path: 'Computer',
  subkeys: [
    {
      name: 'HKEY_LOCAL_MACHINE',
      path: 'HKEY_LOCAL_MACHINE',
      subkeys: [
        {
          name: 'SOFTWARE',
          path: 'HKEY_LOCAL_MACHINE\\SOFTWARE',
          subkeys: [
            {
              name: 'Microsoft',
              path: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft',
              subkeys: [
                {
                  name: 'Windows',
                  path: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows',
                  subkeys: [
                    {
                      name: 'CurrentVersion',
                      path: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion',
                      subkeys: [
                        {
                          name: 'Run',
                          path: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run',
                          values: [
                            {
                              name: 'SecurityHealth',
                              type: 'REG_SZ',
                              data: '%ProgramFiles%\\Windows Defender\\MSASCuiL.exe',
                              description: 'Icono del Centro de Seguridad de Windows Defender.',
                              simulatedEffect: 'Proceso de interfaz de seguridad al iniciar sesión.',
                            },
                            {
                              name: 'RealtekAudioService',
                              type: 'REG_SZ',
                              data: 'C:\\Program Files\\Realtek\\Audio\\RtkAudioService.exe',
                              description: 'Panel de control de audio HD Realtek.',
                              simulatedEffect: 'Gestión de conectores de audio de la placa madre.',
                            },
                          ],
                        },
                        {
                          name: 'Policies',
                          path: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies',
                          subkeys: [
                            {
                              name: 'System',
                              path: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System',
                              values: [
                                {
                                  name: 'EnableLUA',
                                  type: 'REG_DWORD',
                                  data: '0x00000001 (1)',
                                  description: 'Habilita el Control de Cuentas de Usuario (UAC).',
                                  simulatedEffect: 'Si es 0, UAC se desactiva por completo (Riesgo Alto).',
                                },
                                {
                                  name: 'ConsentPromptBehaviorAdmin',
                                  type: 'REG_DWORD',
                                  data: '0x00000005 (5)',
                                  description: 'Comportamiento de la pantalla UAC para Administradores.',
                                  simulatedEffect: 'Solicitud de confirmación en Secure Desktop.',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'SYSTEM',
          path: 'HKEY_LOCAL_MACHINE\\SYSTEM',
          subkeys: [
            {
              name: 'CurrentControlSet',
              path: 'HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet',
              subkeys: [
                {
                  name: 'Services',
                  path: 'HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services',
                  subkeys: [
                    {
                      name: 'SysMain',
                      path: 'HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\SysMain',
                      values: [
                        {
                          name: 'Start',
                          type: 'REG_DWORD',
                          data: '0x00000002 (2)',
                          description: 'Tipo de inicio del servicio SysMain (SuperFetch).',
                          simulatedEffect: '2 = Automático, 4 = Deshabilitado.',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'HKEY_CURRENT_USER',
      path: 'HKEY_CURRENT_USER',
      subkeys: [
        {
          name: 'Control Panel',
          path: 'HKEY_CURRENT_USER\\Control Panel',
          subkeys: [
            {
              name: 'Desktop',
              path: 'HKEY_CURRENT_USER\\Control Panel\\Desktop',
              values: [
                {
                  name: 'MenuShowDelay',
                  type: 'REG_SZ',
                  data: '400',
                  description: 'Retardo de despliegue de submenús en milisegundos.',
                  simulatedEffect: 'Reducir a 0ms elimina la espera en la interfaz gráfica.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'HKEY_CLASSES_ROOT',
      path: 'HKEY_CLASSES_ROOT',
      subkeys: [],
      values: [
        {
          name: '(Default)',
          type: 'REG_SZ',
          data: 'value not set',
          description: 'Vista combinada de asociaciones de archivos de Windows.',
        },
      ],
    },
    { name: 'HKEY_USERS', path: 'HKEY_USERS', subkeys: [] },
    { name: 'HKEY_CURRENT_CONFIG', path: 'HKEY_CURRENT_CONFIG', subkeys: [] },
  ],
};

export const EvoRegistrySandbox: React.FC = () => {
  const [treeData, setTreeTreeData] = useState<RegistryKeyNode>(INITIAL_REGISTRY_TREE);
  const [selectedKey, setSelectedKey] = useState<RegistryKeyNode>(
    INITIAL_REGISTRY_TREE.subkeys![0].subkeys![0].subkeys![0].subkeys![0].subkeys![0].subkeys![0] // Run
  );

  const [initialSnapshot, setInitialSnapshot] = useState<DiffItem[]>([
    {
      id: 'd1',
      category: 'Registry',
      key: 'HKLM\\...\\Policies\\System\\EnableLUA',
      beforeValue: '0x00000001 (1)',
      afterValue: '0x00000001 (1)',
      status: 'unchanged',
      provenance: 'SIMULATED',
      simulatedEffect: 'UAC Activo y protegiendo elevaciones a Ring 0.',
    },
    {
      id: 'd2',
      category: 'Registry',
      key: 'HKCU\\Control Panel\\Desktop\\MenuShowDelay',
      beforeValue: '400',
      afterValue: '400',
      status: 'unchanged',
      provenance: 'SIMULATED',
      simulatedEffect: 'Retardo de despliegue de submenú estándar de Windows (400ms).',
    },
  ]);

  const [diffItems, setDiffItems] = useState<DiffItem[]>(initialSnapshot);

  // Form states for creating / editing
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingValueName, setEditingValueName] = useState<string>('');
  const [valueType, setValueType] = useState<'REG_SZ' | 'REG_DWORD' | 'REG_QWORD' | 'REG_BINARY'>('REG_DWORD');
  const [valueData, setValueData] = useState<string>('');

  const handleSelectKey = (key: RegistryKeyNode) => {
    setSelectedKey(key);
    setIsEditing(false);
  };

  const handleModifyValue = (val: RegistryValue) => {
    setEditingValueName(val.name);
    setValueType(val.type);
    setValueData(val.data);
    setIsEditing(true);
  };

  const handleSaveValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingValueName.trim()) return;

    const keyPath = `${selectedKey.path}\\${editingValueName}`;
    const beforeItem = diffItems.find((d) => d.key === keyPath);
    const beforeVal = beforeItem ? beforeItem.beforeValue : 'No existía (NUEVO)';

    // Update diff engine
    const newDiffItem: DiffItem = {
      id: `diff_${Date.now()}`,
      category: 'Registry',
      key: keyPath,
      beforeValue: beforeVal,
      afterValue: valueData,
      status: beforeVal === 'No existía (NUEVO)' ? 'added' : 'modified',
      provenance: 'SIMULATED',
      simulatedEffect: `Ajuste simulado en ${selectedKey.name}: Modificado a ${valueData}.`,
    };

    setDiffItems((prev) => [newDiffItem, ...prev.filter((p) => p.key !== keyPath)]);

    // Update in local tree view
    if (selectedKey.values) {
      const existingIdx = selectedKey.values.findIndex((v) => v.name === editingValueName);
      if (existingIdx >= 0) {
        selectedKey.values[existingIdx].data = valueData;
        selectedKey.values[existingIdx].type = valueType;
      } else {
        selectedKey.values.push({
          name: editingValueName,
          type: valueType,
          data: valueData,
          description: 'Valor creado en sesión simulada.',
        });
      }
    } else {
      selectedKey.values = [
        {
          name: editingValueName,
          type: valueType,
          data: valueData,
          description: 'Valor creado en sesión simulada.',
        },
      ];
    }

    setIsEditing(false);
    setEditingValueName('');
    setValueData('');
  };

  const handleDeleteValue = (valName: string) => {
    const keyPath = `${selectedKey.path}\\${valName}`;
    const beforeItem = selectedKey.values?.find((v) => v.name === valName);

    const newDiffItem: DiffItem = {
      id: `diff_${Date.now()}`,
      category: 'Registry',
      key: keyPath,
      beforeValue: beforeItem?.data || 'Existente',
      afterValue: 'ELIMINADO',
      status: 'removed',
      provenance: 'SIMULATED',
      simulatedEffect: `Valor ${valName} eliminado de la colmena.`,
    };

    setDiffItems((prev) => [newDiffItem, ...prev.filter((p) => p.key !== keyPath)]);

    if (selectedKey.values) {
      selectedKey.values = selectedKey.values.filter((v) => v.name !== valName);
    }
  };

  const handleRestoreSnapshot = () => {
    setTreeTreeData(INITIAL_REGISTRY_TREE);
    setDiffItems(initialSnapshot);
    alert('Restaurado el Registro al Estado A original (Snapshot base restablecido).');
  };

  // Helper render for recursive tree nodes
  const renderTreeNode = (node: RegistryKeyNode, depth: number = 0) => {
    const isSelected = selectedKey.path === node.path;

    return (
      <div key={node.path} className="space-y-0.5">
        <button
          type="button"
          onClick={() => handleSelectKey(node)}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          className={`w-full py-1 pr-2 rounded text-left font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
            isSelected
              ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/50'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          {isSelected ? (
            <FolderOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          ) : (
            <Folder className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          )}
          <span className="truncate">{node.name}</span>
        </button>

        {node.subkeys && node.subkeys.map((sub) => renderTreeNode(sub, depth + 1))}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#05080E] border border-cyan-900/80 rounded-2xl p-4 sm:p-5 space-y-5 shadow-[0_0_50px_rgba(0,210,255,0.1)] font-mono-tech">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-950 pb-3">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              EVO REGISTRY SANDBOX // EDITOR DE REGISTRO SIMULADO
            </h3>
            <span className="text-[10px] text-zinc-500">
              EXPLORACIÓN SEGURA DE COLMENAS, VALORES DWORD/SZ Y SNAPSHOTS DE ROLLBACK
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ProvenanceBadge provenance="SIMULATED" />
          <button
            type="button"
            onClick={handleRestoreSnapshot}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>RESTAURAR ESTADO A</span>
          </button>
        </div>
      </div>

      {/* Main Regedit Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[360px]">
        {/* Left Col: Registry Tree Hierarchy */}
        <div className="bg-[#020408] border border-cyan-950 rounded-xl p-3 overflow-y-auto max-h-[380px] space-y-1">
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2 border-b border-zinc-900 pb-1">
            JERARQUÍA DE COLMENAS (HIVES):
          </div>
          {renderTreeNode(treeData, 0)}
        </div>

        {/* Right 2 Cols: Selected Key Values Table */}
        <div className="lg:col-span-2 bg-[#020408] border border-cyan-950 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
              <div className="truncate text-xs font-bold text-cyan-300">
                RUTA: <span className="text-white font-mono">{selectedKey.path}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingValueName('NuevoValor');
                  setValueType('REG_DWORD');
                  setValueData('0x00000001 (1)');
                  setIsEditing(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>NUEVO VALOR</span>
              </button>
            </div>

            {/* Values Table */}
            <div className="overflow-x-auto rounded-lg border border-cyan-950 bg-black">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-zinc-950 text-cyan-400 text-[10.5px] uppercase border-b border-cyan-950">
                  <tr>
                    <th className="p-2">NOMBRE</th>
                    <th className="p-2">TIPO</th>
                    <th className="p-2">DATOS</th>
                    <th className="p-2 text-right">ACCIONES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300 text-[11px]">
                  {selectedKey.values && selectedKey.values.length > 0 ? (
                    selectedKey.values.map((v) => (
                      <tr key={v.name} className="hover:bg-cyan-950/20">
                        <td className="p-2 font-bold text-white flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{v.name}</span>
                        </td>
                        <td className="p-2 text-cyan-400 text-[10px]">{v.type}</td>
                        <td className="p-2 text-zinc-300 font-bold truncate max-w-[180px]">{v.data}</td>
                        <td className="p-2 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleModifyValue(v)}
                              className="p-1 rounded bg-zinc-900 hover:bg-cyan-950 text-cyan-300 transition-all cursor-pointer"
                              title="Modificar valor"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteValue(v.name)}
                              className="p-1 rounded bg-zinc-900 hover:bg-rose-950 text-rose-400 transition-all cursor-pointer"
                              title="Eliminar valor"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-zinc-500 font-sans-editorial text-xs">
                        Esta clave no contiene valores asignados explícitos (Default value not set).
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Value Edit / Add Form */}
          {isEditing && (
            <form onSubmit={handleSaveValue} className="p-3 rounded-xl bg-black border border-cyan-800 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                <span>EDITAR VALOR EN REGISTRO SIMULADO:</span>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-zinc-500 hover:text-white text-[11px] underline"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1 uppercase">NOMBRE DEL VALOR:</label>
                  <input
                    type="text"
                    value={editingValueName}
                    onChange={(e) => setEditingValueName(e.target.value)}
                    className="w-full bg-zinc-950 border border-cyan-900 rounded px-2.5 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1 uppercase">TIPO DE DATO:</label>
                  <select
                    value={valueType}
                    onChange={(e: any) => setValueType(e.target.value)}
                    className="w-full bg-zinc-950 border border-cyan-900 rounded px-2.5 py-1.5 text-cyan-300 font-mono text-xs focus:outline-none"
                  >
                    <option value="REG_DWORD">REG_DWORD (Entero 32-bit)</option>
                    <option value="REG_SZ">REG_SZ (Cadena de texto)</option>
                    <option value="REG_QWORD">REG_QWORD (Entero 64-bit)</option>
                    <option value="REG_BINARY">REG_BINARY (Datos hexadecimales)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1 uppercase">VALOR NUEVO:</label>
                  <input
                    type="text"
                    value={valueData}
                    onChange={(e) => setValueData(e.target.value)}
                    className="w-full bg-zinc-950 border border-cyan-900 rounded px-2.5 py-1.5 text-emerald-400 font-mono text-xs focus:outline-none focus:border-cyan-400 font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  APLICAR CAMBIO SIMULADO →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Evo Diff Viewer displaying changes */}
      <EvoDiffViewer items={diffItems} onRestoreSnapshot={handleRestoreSnapshot} />
    </div>
  );
};
