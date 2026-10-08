#!/usr/bin/env node
// ============================================================================
// EVO LABS // SUITE DE PROTECCIÓN ANTI-REGRESIÓN ESTRUCTURAL
// Regla: "Ninguna tarea de UX, refactor, limpieza o rediseño puede eliminar
// contenido o funcionalidad registrada sin autorización explícita del OWNER."
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function assert(condition, message, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ ${message}`);
  } else {
    failedChecks++;
    const errMsg = `✗ REGRESIÓN DETECTADA: ${message}${details ? ` -> ${details}` : ''}`;
    console.error(`  ${errMsg}`);
    failures.push(errMsg);
  }
}

function fileExists(relPath) {
  const fullPath = path.join(ROOT, relPath);
  return fs.existsSync(fullPath);
}

function readFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) return '';
  return fs.readFileSync(fullPath, 'utf8');
}

console.log('\n====================================================================');
console.log('🛡️  EVO LABS // VERIFICACIÓN ANTI-REGRESIÓN ESTRUCTURAL');
console.log('====================================================================\n');

// ----------------------------------------------------------------------------
// 1. LOS 12 TOMOS OFICIALES Y SUS COMPONENTES MAESTROS
// ----------------------------------------------------------------------------
console.log('📦 [1/14] Validando los 12 Tomos Canónicos...');

const canonicalCatalog = readFile('src/data/evoCatalog.ts');
const expandedCatalog = readFile('src/data/evoTomesExpandedData.ts');

const expectedTomes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
let tomesInCatalog = 0;
let tomesInExpanded = 0;

for (const num of expectedTomes) {
  const inCat = canonicalCatalog.includes(`tomoNumber: '${num}'`) || canonicalCatalog.includes(`id: '${num}'`);
  const inExp = expandedCatalog.includes(`number: '${num}'`) || expandedCatalog.includes(`id: 'tomo-${num}'`);
  if (inCat) tomesInCatalog++;
  if (inExp) tomesInExpanded++;
}

assert(tomesInCatalog === 12, `src/data/evoCatalog.ts registra exactamente los 12 Tomos (encontrados: ${tomesInCatalog}/12)`);
assert(tomesInExpanded === 12, `src/data/evoTomesExpandedData.ts registra exactamente los 12 Tomos (encontrados: ${tomesInExpanded}/12)`);

// Componentes maestros por cada tomo
const tomoMasterFiles = [
  { num: '01', path: 'src/components/Chapter01View.tsx' },
  { num: '02', path: 'src/components/tomo02/Tomo02MasterPage.tsx' },
  { num: '03', path: 'src/components/tomo03/Tomo03MasterPage.tsx' },
  { num: '04', path: 'src/components/tomo04/Tomo04MasterPage.tsx' },
  { num: '05', path: 'src/components/tomo05/Tomo05MasterPage.tsx' },
  { num: '06', path: 'src/components/tomo06/Tomo06MasterPage.tsx' },
  { num: '07', path: 'src/components/tomo07/Tomo07MasterPage.tsx' },
  { num: '08', path: 'src/components/tomo08/Tomo08MasterPage.tsx' },
  { num: '09', path: 'src/components/tomo09/Tomo09MasterPage.tsx' },
  { num: '10', path: 'src/components/tomo10/Tomo10MasterPage.tsx' },
  { num: '11', path: 'src/components/tomo11/Tomo11MasterPage.tsx' },
  { num: '12', path: 'src/components/tomo12/Tomo12MasterPage.tsx' },
];

for (const tm of tomoMasterFiles) {
  assert(fileExists(tm.path), `Componente maestro del Tomo ${tm.num} existe (${tm.path})`);
}

// ----------------------------------------------------------------------------
// 2. RUTAS CANÓNICAS /tomo/01 A /tomo/12
// ----------------------------------------------------------------------------
console.log('\n🔗 [2/14] Validando rutas canónicas /tomo/01 a /tomo/12...');

const routerSource = readFile('src/utils/evoToolRouter.ts');
const targetRouterSource = readFile('src/utils/evoTomeTargetRouter.ts');
const publicCatalogSource = readFile('src/components/public/EvoPublicTomosCatalog.tsx');

for (const num of expectedTomes) {
  const routerHasTome = routerSource.includes(`'${num}'`) || targetRouterSource.includes(`'${num}'`);
  assert(routerHasTome, `Ruta y navegación canónica activa para Tomo ${num} (/tomo/${num})`);
}

// ----------------------------------------------------------------------------
// 3. CATÁLOGO MAESTRO DE HERRAMIENTAS (VALIDACIÓN DE CONJUNTO CANÓNICO Y MAPEO ACTIVO)
// ----------------------------------------------------------------------------
console.log('\n🛠️  [3/14] Validando Catálogo Maestro de Herramientas...');

const toolsSource = readFile('src/data/evoToolsData.ts');
const appSource = readFile('src/App.tsx');
const toolsCatalogComponent = readFile('src/components/public/EvoPublicToolsCatalog.tsx');
const masterManifestSource = readFile('docs/EVO_MASTER_MANIFEST.md');

// Conjunto canónico estricto de las 34 herramientas de EVO LABS
const CANONICAL_34_TOOL_IDS = [
  'diag-boot-seq',
  'diag-bsod-decoder',
  'diag-incident-events',
  'diag-bottleneck-calc',
  'diag-autodetect-pc',
  'diag-telemetry-integrity',
  'diag-atx-power-bench',
  'diag-case-resolver',
  'med-latency-calc',
  'med-frametime-analyzer',
  'med-sensors-telemetry',
  'med-dpc-latency',
  'med-stress-stability',
  'med-thermal-history',
  'inv-pcb-schematic',
  'inv-xray-kernel',
  'inv-cache-imc-flow',
  'inv-digital-twin',
  'inv-workstations-sectors',
  'inv-coverage-matrix',
  'rep-windows-repair',
  'rep-windows-install',
  'rep-hotswap-bench',
  'rep-core-repair-view',
  'opt-nt-services',
  'opt-core-optimization',
  'opt-ab-comparison',
  'opt-upgrade-simulator',
  'opt-build-architect',
  'doc-forensic-dossier',
  'doc-evidence-passport',
  'doc-technical-dossier',
  'doc-content-factory',
  'doc-transfer-challenge',
];

// 1. Extraer los IDs reales declarados en src/data/evoToolsData.ts
const toolIdMatches = [...toolsSource.matchAll(/id:\s*'(diag-|med-|inv-|rep-|opt-|doc-)[^']+'/g)]
  .map(m => m[0].replace(/id:\s*'/, '').replace(/'$/, ''));

console.log(`    ℹ️ Herramientas detectadas en src/data/evoToolsData.ts: ${toolIdMatches.length}`);

// 2. Comprobar que no hay IDs canónicos duplicados
const duplicateToolIds = toolIdMatches.filter((id, idx) => toolIdMatches.indexOf(id) !== idx);
assert(duplicateToolIds.length === 0, `No existen IDs de herramientas duplicados en evoToolsData.ts (duplicados: ${duplicateToolIds.join(', ') || 'ninguno'})`);

// 3. Comprobar que todos los 34 IDs canónicos obligatorios están presentes
let missingCanonicalTools = [];
for (const cid of CANONICAL_34_TOOL_IDS) {
  if (!toolIdMatches.includes(cid)) {
    missingCanonicalTools.push(cid);
  }
}
assert(missingCanonicalTools.length === 0, `Todos los 34 IDs canónicos obligatorios están presentes en evoToolsData.ts (faltantes: ${missingCanonicalTools.join(', ') || 'ninguno'})`);

// 4. No bloquear futuras herramientas si se aprueban, pero exigir su registro previo en EVO_MASTER_MANIFEST.md
let unmanifestedTools = [];
for (const tid of toolIdMatches) {
  const inManifest = masterManifestSource.includes(`\`${tid}\``) || masterManifestSource.includes(tid);
  if (!inManifest) {
    unmanifestedTools.push(tid);
  }
}
assert(unmanifestedTools.length === 0, `Toda herramienta registrada en evoToolsData.ts existe en EVO_MASTER_MANIFEST.md (no registradas: ${unmanifestedTools.join(', ') || 'ninguna'})`);

// 5. Validar que la base canónica actual tiene exactamente los 34 IDs (o más sólo si fueron aprobados en el manifest)
assert(toolIdMatches.length >= 34, `Catálogo maestro contiene el conjunto canónico completo de herramientas (encontradas: ${toolIdMatches.length})`);

// 6. Validar que cada herramienta conserva su entrada en TOOL_TARGET_MAP en App.tsx cuando requiere ejecución
assert(appSource.includes('TOOL_TARGET_MAP'), 'App.tsx implementa TOOL_TARGET_MAP con mapeo de herramientas');
let missingTargetMapTools = [];
for (const tid of toolIdMatches) {
  const hasTarget = appSource.includes(`'${tid}':`) || appSource.includes(`"${tid}":`);
  if (!hasTarget) {
    missingTargetMapTools.push(tid);
  }
}
assert(missingTargetMapTools.length === 0, `Todas las herramientas activas conservan su entrada ejecutable en TOOL_TARGET_MAP en App.tsx (faltantes: ${missingTargetMapTools.join(', ') || 'ninguno'})`);

// 7. Componente público de herramientas existe
assert(fileExists('src/components/public/EvoPublicToolsCatalog.tsx'), 'Componente EvoPublicToolsCatalog.tsx existe');

// ----------------------------------------------------------------------------
// 4. LABORATORIOS Y SIMULADORES (BLINDAJE SEMÁNTICO: PÚBLICOS, EMBEBIDOS, HUBS Y ZONAS)
// ----------------------------------------------------------------------------
console.log('\n🔬 [4/14] Validando Laboratorios y Simuladores (Blindaje Semántico)...');

// 4.1 INVENTARIO COMPLETO: Todo laboratorio inventariado en EVO_MASTER_MANIFEST.md sigue existiendo en su archivo real
const fullLabInventory = [
  // Hubs centrales y Core
  { id: 'LAB-CORE', name: 'EVO Lab Core (Universal PC Environment)', path: 'src/components/evoLabCore/EvoLabCore.tsx', role: 'INTERNAL_HUB' },
  { id: 'LAB-MASTER-SUITE', name: 'Evo Master Lab Suite', path: 'src/components/world/labs/EvoMasterLabSuite.tsx', role: 'INTERNAL_HUB' },
  { id: 'LAB-CONSOLE', name: 'Evo Lab Console (Campus Zones Host)', path: 'src/components/world/labs/EvoLabConsole.tsx', role: 'INTERNAL_HUB' },
  { id: 'LAB-HOTSWAP', name: 'Hardware Hot-Swap Lab', path: 'src/components/world/labs/sector02/Sector02HardwareHotSwap.tsx', role: 'INTERNAL_HUB' },
  { id: 'LAB-WINDOWS-MATRIX', name: 'Windows Matrix Lab', path: 'src/components/world/labs/windowsMatrix/EvoWindowsMatrixLab.tsx', role: 'INTERNAL_HUB' },
  { id: 'LAB-BOOT-SEQ', name: 'Boot Sequence Lab', path: 'src/components/tomo08/EvoBootLab.tsx', role: 'INTERNAL_HUB' },

  // Embebidos
  { id: 'LAB-SINGLE-TRUTH', name: 'Single Truth Surface', path: 'src/components/world/labs/ultimateSandbox/EvoSingleTruthSurface.tsx', role: 'EMBEDDED', containerPath: 'src/components/world/labs/ultimateSandbox/EvoUltimateSandbox.tsx', containerRef: 'EvoSingleTruthSurface' },
  { id: 'LAB-SW-HOTSWAP', name: 'Software Hot-Swap Lab', path: 'src/components/world/labs/sector02/Sector02SoftwareHotSwap.tsx', role: 'EMBEDDED', containerPath: 'src/components/world/labs/EvoMasterLabSuite.tsx', containerRef: 'Sector02SoftwareHotSwap' },
  { id: 'LAB-ULTIMATE-SANDBOX', name: 'Ultimate Sandbox', path: 'src/components/world/labs/ultimateSandbox/EvoUltimateSandbox.tsx', role: 'EMBEDDED', containerPath: 'src/components/world/labs/EvoMasterLabSuite.tsx', containerRef: 'EvoUltimateSandbox' },
  { id: 'LAB-WINDOWS-XRAY', name: 'Windows X-Ray Kernel Deep-Dive', path: 'src/components/world/labs/windowsMatrix/EvoWindowsXRayLab.tsx', role: 'EMBEDDED' },

  // Laboratorios específicos por Tomo (embebidos en sus módulos y dossiers)
  { id: 'LAB-NET-FORENSICS', name: 'Network Forensics Lab (Tomo 05)', path: 'src/components/labs/tomo05/EvoNetworkForensicsLab.tsx', role: 'EMBEDDED', containerPath: 'src/components/tomo05/Tomo05MasterPage.tsx', containerRef: 'EvoNetworkForensicsLab' },
  { id: 'LAB-DEFENSIVE-SEC', name: 'Defensive Security Lab (Tomo 06)', path: 'src/components/labs/tomo06/EvoDefensiveSecurityLab.tsx', role: 'EMBEDDED', containerPath: 'src/components/tomo06/Tomo06MasterPage.tsx', containerRef: 'EvoDefensiveSecurityLab' },
  { id: 'LAB-PERF-METROLOGY', name: 'Performance Metrology Lab (Tomo 07)', path: 'src/components/labs/tomo07/EvoPerformanceMetrologyLab.tsx', role: 'EMBEDDED', containerPath: 'src/components/tomo07/Tomo07MasterPage.tsx', containerRef: 'EvoPerformanceMetrologyLab' },
  { id: 'LAB-CODE-ENG', name: 'Code Engineering Lab (Tomo 09)', path: 'src/components/labs/tomo09/EvoCodeEngineeringLab.tsx', role: 'EMBEDDED', containerPath: 'src/components/tomo09/Tomo09MasterPage.tsx', containerRef: 'EvoCodeEngineeringLab' },
  { id: 'LAB-AI-SYSTEMS', name: 'AI Systems Lab (Tomo 10)', path: 'src/components/labs/tomo10/EvoAiSystemsLab.tsx', role: 'EMBEDDED', containerPath: 'src/components/tomo10/Tomo10MasterPage.tsx', containerRef: 'EvoAiSystemsLab' },
  { id: 'LAB-GAME-FORGE', name: 'Game Forge Studio (Tomo 12)', path: 'src/components/game-forge/GameForgeStudio.tsx', role: 'EMBEDDED', containerPath: 'src/components/tomo12/Tomo12MasterPage.tsx', containerRef: 'GameForgeStudio' },

  // Las 8 Zonas Oficiales del Campus
  { id: 'LAB-ZONE-01', name: 'Lab 01: Central de Incidentes', path: 'src/components/world/labs/Lab01CentralIncidentes.tsx', role: 'CAMPUS_ZONE', zoneKey: 'zona-1' },
  { id: 'LAB-ZONE-02', name: 'Lab 02: Taller de Rendimiento', path: 'src/components/world/labs/Lab02TallerRendimiento.tsx', role: 'CAMPUS_ZONE', zoneKey: 'zona-2' },
  { id: 'LAB-ZONE-03', name: 'Lab 03: Archivo EVO', path: 'src/components/world/labs/Lab03ArchivoEvo.tsx', role: 'CAMPUS_ZONE', zoneKey: 'zona-3' },
  { id: 'LAB-ZONE-04', name: 'Lab 04: Cámara de Experimentos', path: 'src/components/world/labs/Lab04CamaraExperimentos.tsx', role: 'CAMPUS_ZONE', zoneKey: 'zona-4' },
  { id: 'LAB-ZONE-05', name: 'Lab 05: Sala de Máquinas', path: 'src/components/world/labs/Lab05SalaMaquinas.tsx', role: 'CAMPUS_ZONE', zoneKey: 'zona-5' },
  { id: 'LAB-ZONE-06', name: 'Lab 06: Zona Restringida', path: 'src/components/world/labs/Lab06ZonaRestringida.tsx', role: 'CAMPUS_ZONE', zoneKey: 'zona-6' },
  { id: 'LAB-ZONE-07', name: 'Lab 07: Mi Laboratorio', path: 'src/components/world/labs/Lab07MiLaboratorio.tsx', role: 'CAMPUS_ZONE', zoneKey: 'zona-7' },
  { id: 'LAB-ZONE-08', name: 'Lab 08: Comunidad EVO', path: 'src/components/world/labs/Lab08ComunidadEvo.tsx', role: 'CAMPUS_ZONE', zoneKey: 'zona-8' },

  // Catálogo Público
  { id: 'PUB-LABS-CATALOG', name: 'Catálogo de Laboratorios de PRACTICAR', path: 'src/components/public/EvoPublicLabsCatalog.tsx', role: 'PUBLIC_CATALOG' },
];

for (const lab of fullLabInventory) {
  assert(fileExists(lab.path), `Laboratorio inventariado existe en archivo real: ${lab.name} (${lab.path})`);
}

// 4.2 LABORATORIOS PÚBLICOS (Visibles en PRACTICAR / EvoPublicLabsCatalog.tsx)
const publicCatalogContent = readFile('src/components/public/EvoPublicLabsCatalog.tsx');
const CANONICAL_PUBLIC_LAB_IDS = [
  'lab-boot-seq',
  'lab-windows-matrix',
  'lab-hardware-hotswap',
  'lab-core-workbench',
  'lab-perf-metrology',
  'lab-cases-resolver',
  'lab-digital-twin',
  'lab-net-forensics',
  'lab-defensive-sec',
  'lab-code-eng',
  'lab-ai-systems',
  'lab-game-forge',
  'lab-eval-transfer',
  'lab-notebook-power',
];

for (const pubId of CANONICAL_PUBLIC_LAB_IDS) {
  assert(publicCatalogContent.includes(pubId), `Laboratorio público '${pubId}' sigue visible en el catálogo de PRACTICAR`);
}

// 4.3 LABORATORIOS EMBEBIDOS (Alcanzables desde su contenedor real)
const embeddedLabsWithContainers = fullLabInventory.filter(l => l.role === 'EMBEDDED' && l.containerPath);
for (const emb of embeddedLabsWithContainers) {
  const containerContent = readFile(emb.containerPath);
  assert(
    containerContent.includes(emb.containerRef),
    `Laboratorio embebido '${emb.name}' es alcanzable desde su contenedor real (${emb.containerPath})`
  );
}

// 4.4 HUBS INTERNOS (Montados donde corresponde)
const worldMapSource = readFile('src/components/world/EvoWorldMap.tsx');
assert(appSource.includes('<EvoLabCore') || appSource.includes('EvoLabCore'), 'Hub interno EvoLabCore está montado en App.tsx');
assert(appSource.includes('<EvoMasterLabSuite') || appSource.includes('EvoMasterLabSuite'), 'Hub interno EvoMasterLabSuite está montado en App.tsx');
assert(worldMapSource.includes('<EvoLabConsole') || worldMapSource.includes('EvoLabConsole'), 'Hub de consola de laboratorio EvoLabConsole está montado en EvoWorldMap.tsx');
assert(appSource.includes('Sector02HardwareHotSwap') || appSource.includes('hotswap-lab'), 'Hub Hardware Hot-Swap está montado en App.tsx');
assert(appSource.includes('EvoWindowsMatrixLab') || appSource.includes('windows-matrix-lab'), 'Hub Windows Matrix Lab está montado en App.tsx');
assert(appSource.includes('EvoBootLab') || appSource.includes('boot-lab'), 'Hub Boot Sequence Lab está montado en App.tsx');

// 4.5 LAS 8 ZONAS DEL CAMPUS (Existen y están montadas en EvoLabConsole)
const labConsoleSource = readFile('src/components/world/labs/EvoLabConsole.tsx');
const campusZones = fullLabInventory.filter(l => l.role === 'CAMPUS_ZONE');
assert(campusZones.length === 8, 'Existen exactamente las 8 zonas registradas del Campus');
for (const zone of campusZones) {
  assert(fileExists(zone.path), `Zona de Campus existe: ${zone.name} (${zone.path})`);
  assert(labConsoleSource.includes(zone.zoneKey), `Zona ${zone.zoneKey} (${zone.name}) está montada en EvoLabConsole.tsx`);
}

// 4.6 BLINDAJE SEMÁNTICO CONTRA CAMBIO SILENCIOSO DE ESTADO
for (const zone of campusZones) {
  assert(!publicCatalogContent.includes(`id: '${zone.id.toLowerCase()}'`), `Zona de campus '${zone.name}' no suplanta silenciosamente una tarjeta pública`);
}
assert(CANONICAL_PUBLIC_LAB_IDS.length === 14, 'El catálogo público de PRACTICAR mantiene exactamente sus 14 laboratorios canónicos');

// ----------------------------------------------------------------------------
// 5. TUTOR EVO
// ----------------------------------------------------------------------------
console.log('\n🧠 [5/14] Validando Tutor EVO...');

const tutorFiles = [
  'src/components/tutor/TutorEvoContext.tsx',
  'src/components/tutor/TutorEvoDrawer.tsx',
  'src/components/tutor/TutorEvoFloatingButton.tsx',
  'src/components/tutor/TutorOnboardingModal.tsx',
  'src/components/tutor/data/tutorGlossary.ts',
  'src/components/tutor/data/tutorAcademyData.ts',
];

for (const tf of tutorFiles) {
  assert(fileExists(tf), `Tutor EVO componente existe: ${tf}`);
}
assert(appSource.includes('<TutorEvoFloatingButton') && appSource.includes('<TutorEvoDrawer'), 'Tutor EVO está montado en App.tsx');

// ----------------------------------------------------------------------------
// 6. ANALIZAR MI PC Y TELEMETRÍA
// ----------------------------------------------------------------------------
console.log('\n💻 [6/14] Validando Analizar mi PC y Gemelo Digital...');

const pcFiles = [
  'src/components/common/EvoAutoDetectPcModal.tsx',
  'src/services/evoInteractiveDigitalTwin.ts',
  'src/components/evoLabCore/components/EvoHardwareDiscoveryModal.tsx',
  'src/components/evoLabCore/services/telemetryIntegrityService.ts',
  'src/components/evoLabCore/components/EvoTelemetryIntegrityModal.tsx',
];

for (const pf of pcFiles) {
  assert(fileExists(pf), `Analizar mi PC módulo existe: ${pf}`);
}

// ----------------------------------------------------------------------------
// 7. MI EVO Y SERVICIOS DE IDENTIDAD
// ----------------------------------------------------------------------------
console.log('\n👤 [7/14] Validando Mi EVO...');

const miEvoFiles = [
  'src/components/world/labs/Lab07MiLaboratorio.tsx',
  'src/components/world/EvoProfileBadge.tsx',
  'src/services/evoTechnicalIdentityEngine.ts',
];

for (const mef of miEvoFiles) {
  assert(fileExists(mef), `Mi EVO componente existe: ${mef}`);
}

// ----------------------------------------------------------------------------
// 8. PROGRESO Y PERSISTENCIA
// ----------------------------------------------------------------------------
console.log('\n📈 [8/14] Validando Progreso...');

const progressFiles = [
  'src/utils/tomo01Progress.ts',
  'src/utils/safeStorage.ts',
  'src/utils/chapterPrerequisites.ts',
  'src/components/tutor/TutorProgressMapModal.tsx',
];

for (const prog of progressFiles) {
  assert(fileExists(prog), `Módulo de progreso existe: ${prog}`);
}

// ----------------------------------------------------------------------------
// 9. EXÁMENES DE LOS 12 TOMOS (CONTEO REAL)
// ----------------------------------------------------------------------------
console.log('\n📝 [9/14] Validando Motor y Bancos de Exámenes...');

assert(fileExists('src/components/exam/EvoTomeExamEngine.tsx'), 'Motor EvoTomeExamEngine.tsx existe');
assert(fileExists('src/components/exam/EvoExamVisualRenderer.tsx'), 'Renderizador EvoExamVisualRenderer.tsx existe');
assert(fileExists('src/components/exam/utils/examStorage.ts'), 'Utilidad de calificaciones examStorage.ts existe');

let examDataCount = 0;
for (const num of expectedTomes) {
  const p = `src/components/exam/data/tomo${num}ExamData.ts`;
  if (fileExists(p)) {
    examDataCount++;
    assert(true, `Banco de preguntas para Tomo ${num} existe (${p})`);
  } else {
    assert(false, `Banco de preguntas para Tomo ${num} existe (${p})`);
  }
}
assert(examDataCount === 12, `Existen los 12 bancos de examen oficiales (encontrados: ${examDataCount}/12)`);

// ----------------------------------------------------------------------------
// 10. EXPEDIENTES Y CASOS
// ----------------------------------------------------------------------------
console.log('\n📁 [10/14] Validando Expedientes y Casos...');

const dossierFiles = [
  'src/components/evoLabCore/services/caseRepository.ts',
  'src/components/chapter06/DiagnosticExpedienteModal.tsx',
  'src/components/chapter07/InheritedEvidenceTracker.tsx',
  'src/services/evoEvidenceEngine.ts',
];

for (const df of dossierFiles) {
  assert(fileExists(df), `Módulo de expedientes existe: ${df}`);
}
assert(appSource.includes('caseHistoryList') && appSource.includes('EXPEDIENTES Y CASOS REGISTRADOS'), 'Historial de expedientes activo en App.tsx');

// ----------------------------------------------------------------------------
// 11. DEMOS Y CONTENIDO GRATUITO
// ----------------------------------------------------------------------------
console.log('\n🎁 [11/14] Validando Demos y Contenido Gratuito...');

const freeFiles = [
  'src/components/public/EvoPublicMagazinesCatalog.tsx',
  'src/components/tomo02/Tomo02MagazineView.tsx',
  'src/components/tomo08/Tomo08MagazineView.tsx',
  'src/components/tomo01/EvoTomo01CompletionScreen.tsx',
];

for (const ff of freeFiles) {
  assert(fileExists(ff), `Contenido demo/gratuito existe: ${ff}`);
}
assert(publicCatalogSource.includes('DEMO // INCLUIDO EN PLAN GRATIS') || publicCatalogSource.includes('ABRIR DEMO (PLAN GRATIS)'), 'Demo de Tomo 01 habilitada en catálogo público');

// ----------------------------------------------------------------------------
// 12. PRICING Y PASARELA COMERCIAL
// ----------------------------------------------------------------------------
console.log('\n💳 [12/14] Validando Pricing y Planes Comerciales...');

const pricingFiles = [
  'src/components/public/EvoPublicPricing.tsx',
  'src/data/evoPricing.ts',
  'src/components/commerce/EvoPlanConfiguratorModal.tsx',
  'src/components/commerce/EvoOrderSummaryModal.tsx',
  'src/components/commerce/EvoPaymentSuccessView.tsx',
  'src/components/common/EvoPaywallModal.tsx',
];

for (const pf of pricingFiles) {
  assert(fileExists(pf), `Módulo de pricing existe: ${pf}`);
}

// ----------------------------------------------------------------------------
// 13. AUTENTICACIÓN Y CONTROL DE ACCESO
// ----------------------------------------------------------------------------
console.log('\n🔐 [13/14] Validando Autenticación y Control de Acceso...');

const authFiles = [
  'src/auth/EvoAuthProvider.tsx',
  'src/auth/EvoAccessContext.tsx',
  'src/components/auth/EvoAuthModal.tsx',
  'src/services/firebase.ts',
];

for (const af of authFiles) {
  assert(fileExists(af), `Módulo de autenticación existe: ${af}`);
}

// ----------------------------------------------------------------------------
// 14. SECCIONES PÚBLICAS: APRENDER, PRACTICAR, HERRAMIENTAS
// ----------------------------------------------------------------------------
console.log('\n🌐 [14/14] Validando Catálogos Públicos (APRENDER, PRACTICAR, HERRAMIENTAS)...');

const navSource = readFile('src/components/public/PublicNavbar.tsx');
const shellSource = readFile('src/components/public/PublicShell.tsx');
const hubSource = readFile('src/components/public/EvoPublicAprenderHub.tsx');
const catalogSource = readFile('src/components/public/EvoPublicTomosCatalog.tsx');

assert(fileExists('src/components/public/EvoPublicAprenderHub.tsx'), 'Catálogo APRENDER (Hub) existe');
assert(fileExists('src/components/public/EvoPublicTomosCatalog.tsx'), 'Catálogo APRENDER (Tomos) existe');
assert(fileExists('src/components/public/EvoPublicLabsCatalog.tsx'), 'Catálogo PRACTICAR (Laboratorios) existe');
assert(fileExists('src/components/public/EvoPublicToolsCatalog.tsx'), 'Catálogo HERRAMIENTAS existe');
assert(navSource.includes('APRENDER') && navSource.includes('PRACTICAR') && navSource.includes('HERRAMIENTAS'), 'PublicNavbar.tsx vincula Aprender, Laboratorios y Herramientas');

// Validaciones de conexión UI activa (RECOVERY 02.5)
assert(shellSource.includes('<EvoPublicAprenderHub') && shellSource.includes('catalogo'), 'EvoPublicAprenderHub está realmente montado en PublicShell');
assert(hubSource.includes('<EvoPedagogicalManifesto') && shellSource.includes('<EvoPublicAprenderHub'), 'EvoPedagogicalManifesto es alcanzable desde APRENDER');
assert(catalogSource.includes('<EvoTomeDetailModal') && fileExists('src/components/public/EvoTomeDetailModal.tsx'), 'EvoTomeDetailModal está realmente usado por EvoPublicTomosCatalog');

// Validaciones de conexión y fidelidad pericial de PRACTICAR / LABORATORIOS (RECOVERY 03)
const labsCatalogSource = readFile('src/components/public/EvoPublicLabsCatalog.tsx');
assert(shellSource.includes('<EvoPublicLabsCatalog') && shellSource.includes('laboratorios'), 'EvoPublicLabsCatalog está montado realmente desde PublicShell');
assert(labsCatalogSource.includes('ABRIR LABORATORIO') && labsCatalogSource.includes('onClick={lab.action}'), 'Cada laboratorio público conserva un CTA funcional');
assert(
  labsCatalogSource.includes('PROBLEMA') &&
  labsCatalogSource.includes('ACCIÓN') &&
  labsCatalogSource.includes('RESULTADO') &&
  labsCatalogSource.includes('EVIDENCIA'),
  'La estructura PROBLEMA / ACCIÓN / RESULTADO / EVIDENCIA existe realmente en la UI pública de PRACTICAR'
);
assert(
  labsCatalogSource.includes('NO ADIVINES. COMPROBALO.') &&
  labsCatalogSource.includes('OBSERVÁ') &&
  labsCatalogSource.includes('INTERVENÍ') &&
  labsCatalogSource.includes('MEDÍ') &&
  labsCatalogSource.includes('COMPARÁ') &&
  labsCatalogSource.includes('COMPROBÁ'),
  'Identidad pedagógica de investigación EVO (OBSERVÁ → INTERVENÍ → MEDÍ...) presente en PRACTICAR'
);

const protectedLabKeys = [
  'lab-boot-seq',
  'lab-windows-matrix',
  'lab-hardware-hotswap',
  'lab-core-workbench',
  'lab-perf-metrology',
  'lab-cases-resolver',
  'lab-digital-twin',
  'lab-net-forensics',
  'lab-defensive-sec',
  'lab-code-eng',
  'lab-ai-systems',
  'lab-game-forge',
  'lab-eval-transfer',
  'lab-notebook-power',
];
let allProtectedLabsFound = true;
for (const pKey of protectedLabKeys) {
  if (!labsCatalogSource.includes(pKey)) {
    allProtectedLabsFound = false;
  }
}
assert(allProtectedLabsFound, 'Ningún laboratorio protegido del manifest desaparece del catálogo público de laboratorios');

// ----------------------------------------------------------------------------
// RESULTADO FINAL
// ----------------------------------------------------------------------------
console.log('\n====================================================================');
console.log(`📊 RESUMEN ANTI-REGRESIÓN: ${passedChecks}/${totalChecks} verificaciones superadas`);
if (failedChecks === 0) {
  console.log('✅ TODAS LAS PROTECCIONES ESTRUCTURALES ESTÁN INTACTAS.');
  console.log('====================================================================\n');
  process.exit(0);
} else {
  console.error(`❌ REGRESIÓN: ${failedChecks} fallas detectadas en la estructura canónica.`);
  console.error('====================================================================\n');
  for (const f of failures) {
    console.error(`  - ${f}`);
  }
  process.exit(1);
}
