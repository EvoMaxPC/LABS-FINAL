import React from 'react';
import { AlertTriangle, RefreshCw, Trash2, Terminal } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class EvoErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('EVO LABS PERICIAL EXCEPTION:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleResetStorageAndReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = window.location.origin + window.location.pathname;
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090e] text-[#f4f4f6] flex items-center justify-center p-6 font-sans">
          <div className="max-w-2xl w-full bg-[#0c0f17] border border-amber-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden">
            {/* Ambient scanline and top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-cyan-500 to-emerald-500" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                <AlertTriangle className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-amber-400 mb-1">
                  EVO LABS // AUDITORÍA DE EXCEPCIÓN PERICIAL
                </div>
                <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                  ANOMALÍA CRÍTICA EN RENDERIZADO
                </h1>
                <p className="text-zinc-400 text-sm mt-1">
                  Se ha detectado una interrupción en el árbol de componentes del simulador. La pantalla en blanco fue interceptada por el protocolo de seguridad EVO.
                </p>
              </div>
            </div>

            {this.state.error && (
              <div className="mb-6 p-4 rounded-lg bg-[#050608] border border-red-500/30 font-mono text-xs text-red-300 overflow-x-auto">
                <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                  <Terminal className="w-4 h-4" />
                  <span>DIAGNÓSTICO TÉCNICO DE EXCEPCIÓN:</span>
                </div>
                <div className="whitespace-pre-wrap break-all">
                  {this.state.error.toString()}
                </div>
                {this.state.errorInfo && (
                  <div className="mt-2 text-zinc-500 max-h-32 overflow-y-auto">
                    {this.state.errorInfo.componentStack}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800">
              <button
                onClick={this.handleReload}
                className="evo-btn-primary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RECARGAR APLICACIÓN</span>
              </button>

              <button
                onClick={this.handleResetStorageAndReload}
                className="evo-btn-secondary flex items-center gap-2 text-red-400 hover:text-red-300 border-red-500/30 hover:border-red-500/60"
              >
                <Trash2 className="w-4 h-4" />
                <span>RESTABLECER CACHÉ Y REINICIAR</span>
              </button>
            </div>

            <div className="mt-6 text-center text-xs text-zinc-500 font-mono">
              EVO LABS ACADEMIA TÉCNICA // SISTEMA DE RECUPERACIÓN ANTE FALLAS
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
