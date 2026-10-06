import type { PublicNavigationTarget } from '../components/public/PublicShell';

/**
 * Helper canonical para extraer y normalizar el número de Tomo ('01'..'10') desde PublicNavigationTarget.
 * Lee tomeNumber primero, admite id por compatibilidad, elimina prefijos como 'tomo-'
 * y valida que esté estrictamente en el rango 1 a 10.
 * Devuelve null si no es un target válido.
 */
export function getTomeNumberFromTarget(
  target: PublicNavigationTarget | null | undefined
): string | null {
  if (!target || target.type !== 'TOME') return null;

  const candidate =
    'tomeNumber' in target && typeof target.tomeNumber === 'string'
      ? target.tomeNumber
      : 'id' in target && typeof (target as { id?: unknown }).id === 'string'
        ? (target as { id: string }).id
        : null;

  if (!candidate) return null;
  const cleaned = candidate.replace(/^tomo-/i, '').trim();
  const parsed = parseInt(cleaned, 10);
  if (isNaN(parsed) || parsed < 1 || parsed > 10) return null;
  return String(parsed).padStart(2, '0');
}

export type ResolvedTomeTarget =
  | { kind: 'reader'; view: 'cover' | 'tomo-02' | 'tomo-03' | 'tomo-04' | 'tomo-08'; tomoNumber: string }
  | { kind: 'dossier'; dossierId: string; tomoNumber: string };

export function resolveTomeViewOrDossier(num: string): ResolvedTomeTarget | null {
  switch (num) {
    case '01':
      return { kind: 'reader', view: 'cover', tomoNumber: '01' };
    case '02':
      return { kind: 'reader', view: 'tomo-02', tomoNumber: '02' };
    case '03':
      return { kind: 'reader', view: 'tomo-03', tomoNumber: '03' };
    case '04':
      return { kind: 'reader', view: 'tomo-04', tomoNumber: '04' };
    case '08':
      return { kind: 'reader', view: 'tomo-08', tomoNumber: '08' };
    case '05':
    case '06':
    case '07':
    case '09':
    case '10':
      return { kind: 'dossier', dossierId: `tomo-${num}`, tomoNumber: num };
    default:
      return null;
  }
}
