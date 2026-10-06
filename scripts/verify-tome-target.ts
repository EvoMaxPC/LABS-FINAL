import { getTomeNumberFromTarget, resolveTomeViewOrDossier } from '../src/utils/evoTomeTargetRouter';
import type { PublicNavigationTarget } from '../src/components/public/PublicShell';

console.log('=== TEST RECORRIDO REAL: PUBLICSHELL -> GET_TOME_NUMBER_FROM_TARGET -> RESOLVE ===\n');

interface ExpectedResolution {
  input: PublicNavigationTarget;
  expectedTomeNumber: string | null;
  expectedKind: 'reader' | 'dossier' | null;
  expectedDest: string | null;
}

const testCases: ExpectedResolution[] = [
  // 1. EXACT OBJECTS EMITTED BY PUBLICSHELL ('01' to '10')
  { input: { type: 'TOME', tomeNumber: '01' }, expectedTomeNumber: '01', expectedKind: 'reader', expectedDest: 'cover' },
  { input: { type: 'TOME', tomeNumber: '02' }, expectedTomeNumber: '02', expectedKind: 'reader', expectedDest: 'tomo-02' },
  { input: { type: 'TOME', tomeNumber: '03' }, expectedTomeNumber: '03', expectedKind: 'reader', expectedDest: 'tomo-03' },
  { input: { type: 'TOME', tomeNumber: '04' }, expectedTomeNumber: '04', expectedKind: 'reader', expectedDest: 'tomo-04' },
  { input: { type: 'TOME', tomeNumber: '05' }, expectedTomeNumber: '05', expectedKind: 'dossier', expectedDest: 'tomo-05' },
  { input: { type: 'TOME', tomeNumber: '06' }, expectedTomeNumber: '06', expectedKind: 'dossier', expectedDest: 'tomo-06' },
  { input: { type: 'TOME', tomeNumber: '07' }, expectedTomeNumber: '07', expectedKind: 'dossier', expectedDest: 'tomo-07' },
  { input: { type: 'TOME', tomeNumber: '08' }, expectedTomeNumber: '08', expectedKind: 'reader', expectedDest: 'tomo-08' },
  { input: { type: 'TOME', tomeNumber: '09' }, expectedTomeNumber: '09', expectedKind: 'dossier', expectedDest: 'tomo-09' },
  { input: { type: 'TOME', tomeNumber: '10' }, expectedTomeNumber: '10', expectedKind: 'dossier', expectedDest: 'tomo-10' },

  // 2. COMPATIBILITY & EDGE CASES
  { input: { type: 'TOME', tomeNumber: '2' }, expectedTomeNumber: '02', expectedKind: 'reader', expectedDest: 'tomo-02' },
  { input: { type: 'TOME', tomeNumber: 'tomo-03' }, expectedTomeNumber: '03', expectedKind: 'reader', expectedDest: 'tomo-03' },
  { input: { type: 'TOME', tomeNumber: 'invalid' } as any, expectedTomeNumber: null, expectedKind: null, expectedDest: null },
  { input: { type: 'TOME', tomeNumber: '99' }, expectedTomeNumber: null, expectedKind: null, expectedDest: null },
  { input: { type: 'BOOT_LAB' }, expectedTomeNumber: null, expectedKind: null, expectedDest: null },
];

let allPassed = true;

for (const tc of testCases) {
  const extractedNum = getTomeNumberFromTarget(tc.input);
  const resolved = extractedNum ? resolveTomeViewOrDossier(extractedNum) : null;
  const actualKind = resolved ? resolved.kind : null;
  const actualDest = resolved ? (resolved.kind === 'reader' ? resolved.view : resolved.dossierId) : null;

  const numPass = extractedNum === tc.expectedTomeNumber;
  const kindPass = actualKind === tc.expectedKind;
  const destPass = actualDest === tc.expectedDest;
  const casePass = numPass && kindPass && destPass;

  if (!casePass) allPassed = false;

  const status = casePass ? '✓ PASS' : '✗ FAIL';
  const label = JSON.stringify(tc.input);
  console.log(`${status} | Input: ${label.padEnd(36)} -> Num: ${String(extractedNum).padEnd(4)} | Kind: ${String(actualKind).padEnd(7)} | Dest: ${actualDest}`);
}

console.log('\n-------------------------------------------------------------');
if (allPassed) {
  console.log('RESULTADO FINAL: 15/15 CASOS VERIFICADOS CON ÉXITO');
} else {
  console.error('RESULTADO FINAL: FALLARON PRUEBAS');
  process.exit(1);
}
