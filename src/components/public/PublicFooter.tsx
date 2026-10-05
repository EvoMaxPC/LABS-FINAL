import React from 'react';
import { Shield, Sparkles, Terminal, BookOpen, Layers } from 'lucide-react';
import { EvoMundoWordmark } from '../common/EvoMundoWordmark';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#05070a] border-t border-zinc-900 text-zinc-400 font-mono-tech select-none pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Manifesto */}
          <div className="space-y-4">
            <EvoMundoWordmark variant="compact" showUniverseBadge={true} />
            <p className="text-xs font-sans-editorial text-zinc-400 leading-relaxed max-w-sm">
              Plataforma de formación técnica y metrología pericial. Aprendé arquitectura de hardware y sistemas operativos sin dogmas ni placebos.
            </p>
            <div className="text-[10px] text-amber-400/80 font-bold border-l border-amber-400/50 pl-2">
              NO LO CREAS. COMPROBALO.
            </div>
          </div>

          {/* Col 2: Ecosistema Curricular */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              ECOSISTEMA DE TOMOS
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li><span className="text-zinc-500">Tomo 01:</span> Conocé tu PC (Silicio & Buses)</li>
              <li><span className="text-zinc-500">Tomo 02:</span> La Biblia Negra de Windows</li>
              <li><span className="text-zinc-500">Tomo 03:</span> Reparación & Descarte</li>
              <li><span className="text-zinc-500">Tomo 04:</span> Optimización & Gaming</li>
              <li><span className="text-zinc-500">Tomo 08:</span> Secuencia de Arranque</li>
            </ul>
          </div>

          {/* Col 3: Metrología & Laboratorios */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              LABORATORIOS PERICIALES
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>Hot-Swap de Hardware (Latencia ns)</li>
              <li>Matriz de Servicios de Windows</li>
              <li>Simulador de Ensamble y Buses</li>
              <li>Bancos de Diagnóstico Forense</li>
              <li>Expediente Técnico Local</li>
            </ul>
          </div>

          {/* Col 4: Normativa & Estándares */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              ESTÁNDARES & RIGOR
            </span>
            <p className="text-xs font-sans-editorial text-zinc-400 leading-relaxed">
              Modelos conformes a especificaciones JEDEC (JESD79), PCI-SIG (PCI Express) y trazabilidad epistemológica por evidencia.
            </p>
            <div className="text-[10px] text-zinc-500 pt-2 font-mono">
              ESTADO // FASE 01 PUBLIC SHELL
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} EVO LABS. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>METROLOGÍA EMPÍRICA</span>
            <span>•</span>
            <span>EVIDENCIA VERIFICABLE</span>
            <span>•</span>
            <span>ARQUITECTURA DE SILICIO</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
