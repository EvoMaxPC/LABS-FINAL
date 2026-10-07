import React, { useState } from 'react';
import { useEvoAuth } from '../../auth/EvoAuthProvider';
import { X, Lock, Mail, User as UserIcon, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface EvoAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'LOGIN' | 'REGISTER' | 'RESET_PASSWORD';

export const EvoAuthModal: React.FC<EvoAuthModalProps> = ({ isOpen, onClose }) => {
  const { user, emailVerified, login, register, resetPassword, sendVerification, loading: authLoading } = useEvoAuth();

  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      setLoading(true);
      if (mode === 'LOGIN') {
        if (!email.trim() || !password) {
          throw new Error('Por favor completá email y contraseña.');
        }
        await login(email.trim(), password);
        onClose();
      } else if (mode === 'REGISTER') {
        if (!displayName.trim()) {
          throw new Error('Por favor ingresá tu nombre o alias.');
        }
        if (!email.trim() || !password) {
          throw new Error('Por favor completá email y contraseña.');
        }
        if (password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }
        if (password !== confirmPassword) {
          throw new Error('Las contraseñas no coinciden.');
        }
        await register(email.trim(), password, displayName.trim());
        setSuccessMessage('Cuenta creada. Revisá tu correo para verificarla.');
      } else if (mode === 'RESET_PASSWORD') {
        if (!email.trim()) {
          throw new Error('Por favor ingresá tu correo electrónico.');
        }
        await resetPassword(email.trim());
        setSuccessMessage('Si la dirección es válida, recibirás instrucciones para restablecer tu contraseña.');
      }
    } catch (err: any) {
      console.error('[EvoAuthModal] Error:', err);
      let msg = err instanceof Error ? err.message : 'Ocurrió un error inesperado.';
      if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password') || msg.includes('auth/user-not-found')) {
        msg = 'Credenciales inválidas. Verificá tu email y contraseña.';
      } else if (msg.includes('auth/email-already-in-use')) {
        msg = 'Ya existe una cuenta registrada con este correo.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerification = async () => {
    setError(null);
    setSuccessMessage(null);
    try {
      setLoading(true);
      await sendVerification();
      setSuccessMessage('Correo de verificación reenviado con éxito.');
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Error al enviar verificación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-mono-tech select-none">
      <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1 pr-8">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>EVO LABS // AUTENTICACIÓN SEGURA</span>
          </div>
          <h2 className="text-2xl font-display font-black text-white uppercase">
            {user ? 'MI SESIÓN' : mode === 'LOGIN' ? 'INICIAR SESIÓN' : mode === 'REGISTER' ? 'REGISTRO DE USUARIO' : 'RECUPERAR CONTRASEÑA'}
          </h2>
        </div>

        {/* If user is logged in */}
        {user ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
              <div>
                <span className="text-zinc-500 uppercase block">Usuario / Email:</span>
                <span className="text-white font-bold">{user.email}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase block">Nombre / Alias:</span>
                <span className="text-amber-300 font-bold">{user.displayName || 'Sin nombre configurado'}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase block">Estado de Verificación:</span>
                <span className={`font-bold ${emailVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {emailVerified ? 'VERIFICADO' : 'PENDIENTE DE VERIFICACIÓN'}
                </span>
              </div>
            </div>

            {!emailVerified && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/50 space-y-3 text-xs">
                <p className="text-amber-200">Tu correo todavía no está verificado.</p>
                <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={loading}
                  className="w-full py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black uppercase text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'ENVIANDO...' : 'REENVIAR VERIFICACIÓN'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Form for Login / Register / Reset */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {mode === 'REGISTER' && (
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-400 block">Nombre / Alias</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Tu nombre o nick"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-400 block">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@dominio.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {mode !== 'RESET_PASSWORD' && (
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-400 block">Contraseña</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>
            )}

            {mode === 'REGISTER' && (
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-400 block">Confirmar Contraseña</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || authLoading}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? 'PROCESANDO...' : mode === 'LOGIN' ? 'INICIAR SESIÓN' : mode === 'REGISTER' ? 'CREAR CUENTA' : 'ENVIAR INSTRUCCIONES'}
            </button>

            {/* Mode switch buttons */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-900 text-zinc-400">
              {mode === 'LOGIN' ? (
                <>
                  <button
                    type="button"
                    onClick={() => { setMode('RESET_PASSWORD'); setError(null); setSuccessMessage(null); }}
                    className="hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('REGISTER'); setError(null); setSuccessMessage(null); }}
                    className="text-amber-400 font-bold hover:underline cursor-pointer"
                  >
                    Crear cuenta
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => { setMode('LOGIN'); setError(null); setSuccessMessage(null); }}
                    className="text-amber-400 font-bold hover:underline cursor-pointer"
                  >
                    ← Volver al login
                  </button>
                  {mode === 'REGISTER' && (
                    <span className="text-zinc-500">¿Ya tenés cuenta?</span>
                  )}
                </>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
