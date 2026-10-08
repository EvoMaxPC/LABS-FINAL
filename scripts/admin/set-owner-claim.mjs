#!/usr/bin/env node
/**
 * EVO LABS — SCRIPT ADMINISTRATIVO DE GESTIÓN DE ROLES Y CLAIMS (SECURITY 2A.7)
 * 
 * PROPÓSITO:
 * Asignar o revocar el rol de OWNER mediante Firebase Admin SDK usando
 * exclusivamente el UID unívoco de Firebase del usuario.
 * 
 * REGLAS DE SEGURIDAD ESTRICTAS:
 * 1. Este script se ejecuta ÚNICAMENTE en entorno de consola administrativo local o servidor seguro.
 * 2. NUNCA está empaquetado en el bundle del cliente Vite ni importado desde /src.
 * 3. NO acepta emails como identificador para prevenir ambigüedades o secuestro de cuentas.
 * 4. Requiere credenciales de Service Account de Firebase/GCP mediante GOOGLE_APPLICATION_CREDENTIALS.
 * 
 * USO:
 *   node scripts/admin/set-owner-claim.mjs <FIREBASE_UID>
 * 
 * REVOCAR (VOLVER A ROL USER NORMAL):
 *   node scripts/admin/set-owner-claim.mjs <FIREBASE_UID> --remove
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import admin from 'firebase-admin';

// Banner
console.log('====================================================');
console.log(' EVO LABS // ADMINISTRACIÓN DE CUSTOM CLAIMS (2A.7) ');
console.log('====================================================\n');

// 1. Parse arguments
const args = process.argv.slice(2);
const uidArg = args.find((a) => !a.startsWith('--'));
const isRemove = args.includes('--remove');

if (!uidArg) {
  console.error('[ERROR] Debe proporcionar el Firebase UID del usuario objetivo.\n');
  console.log('Uso:');
  console.log('  node scripts/admin/set-owner-claim.mjs <FIREBASE_UID>');
  console.log('  node scripts/admin/set-owner-claim.mjs <FIREBASE_UID> --remove\n');
  console.log('Cómo obtener el UID:');
  console.log('  1. Ingrese a Firebase Console > Authentication > Users');
  console.log('  2. Localice al usuario y copie la columna "Identificador de usuario" (UID).');
  console.log('  3. O copie el UID que el usuario visualiza en su modal "MI CUENTA" en la app.\n');
  process.exit(1);
}

// 2. Strict rejection of email addresses
if (uidArg.includes('@')) {
  console.error('[ERROR DE SEGURIDAD] Rechazado: no se permite seleccionar usuario por dirección de email.');
  console.error('El script exige el UID de Firebase exacto (cadena alfanumérica inequívoca).\n');
  process.exit(1);
}

// 3. Resolve service account credentials
let credentialResolved = false;

// Check standard GOOGLE_APPLICATION_CREDENTIALS environment variable
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const credPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  if (fs.existsSync(credPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(credPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      credentialResolved = true;
      console.log(`[AUTH] Credenciales cargadas desde GOOGLE_APPLICATION_CREDENTIALS: ${credPath}`);
    } catch (e) {
      console.error(`[ERROR] Falló al parsear archivo de credenciales en ${credPath}:`, e.message);
      process.exit(1);
    }
  }
}

// Check inline FIREBASE_SERVICE_ACCOUNT_KEY env var (JSON string)
if (!credentialResolved && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    credentialResolved = true;
    console.log('[AUTH] Credenciales cargadas desde variable FIREBASE_SERVICE_ACCOUNT_KEY.');
  } catch (e) {
    console.error('[ERROR] Falló al parsear FIREBASE_SERVICE_ACCOUNT_KEY:', e.message);
    process.exit(1);
  }
}

// Check local service-account.json in scripts/admin (gitignored)
if (!credentialResolved) {
  const localServiceAccountPath = path.resolve(process.cwd(), 'scripts/admin/service-account.json');
  if (fs.existsSync(localServiceAccountPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(localServiceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      credentialResolved = true;
      console.log(`[AUTH] Credenciales cargadas desde archivo local seguro: ${localServiceAccountPath}`);
    } catch (e) {
      console.error(`[ERROR] Falló al parsear ${localServiceAccountPath}:`, e.message);
      process.exit(1);
    }
  }
}

// Fallback to application default credentials if available
if (!credentialResolved) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    credentialResolved = true;
    console.log('[AUTH] Credenciales cargadas mediante Application Default Credentials (ADC).');
  } catch {
    // Expected if not running on Google Cloud or with ADC
  }
}

if (!credentialResolved) {
  console.error('[ERROR DE CREDENCIALES]');
  console.error('No se encontró archivo de credenciales de Firebase Admin SDK.');
  console.error('\nPara ejecutar este script:');
  console.error('1. Descargue la clave de cuenta de servicio de Firebase Console:');
  console.error('   Configuración del proyecto > Cuentas de servicio > Generar nueva clave privada');
  console.error('2. Exporte la variable de entorno:');
  console.error('   export GOOGLE_APPLICATION_CREDENTIALS="/ruta/a/serviceAccountKey.json"');
  console.error('3. Ejecute nuevamente:');
  console.error(`   node scripts/admin/set-owner-claim.mjs ${uidArg}\n`);
  process.exit(1);
}

// 4. Main operation
async function main() {
  const targetUid = uidArg.trim();

  try {
    console.log(`\n[BUSCANDO] Consultando usuario en Firebase Auth: ${targetUid}...`);
    const userRecord = await admin.auth().getUser(targetUid);

    console.log('[USUARIO ENCONTRADO]');
    console.log(`  UID:          ${userRecord.uid}`);
    console.log(`  Email:        ${userRecord.email || '(sin email)'}`);
    console.log(`  Display Name: ${userRecord.displayName || '(sin nombre)'}`);
    console.log(`  Verificado:   ${userRecord.emailVerified ? 'SÍ' : 'NO'}`);
    console.log(`  Claims prev:  ${JSON.stringify(userRecord.customClaims || {})}\n`);

    if (isRemove) {
      console.log(`[REVOCANDO] Removiendo rol owner para ${targetUid}...`);
      await admin.auth().setCustomUserClaims(targetUid, { role: 'user' });
      console.log('----------------------------------------------------');
      console.log('[ÉXITO] Rol OWNER revocado.');
      console.log('Nuevos Claims: { role: "user" }');
      console.log('----------------------------------------------------');
    } else {
      console.log(`[ASIGNANDO] Asignando claim { role: "owner" } para ${targetUid}...`);
      await admin.auth().setCustomUserClaims(targetUid, { role: 'owner' });
      console.log('----------------------------------------------------');
      console.log('[ÉXITO] Rol OWNER asignado satisfactoriamente.');
      console.log('Nuevos Claims: { role: "owner" }');
      console.log('----------------------------------------------------');
    }

    console.log('\n[INSTRUCCIONES PARA EL CLIENTE]');
    console.log('1. El usuario debe refrescar su sesión para recibir los nuevos claims.');
    console.log('2. En la app web, el usuario puede pulsar "ACTUALIZAR TOKEN // REFRESH CLAIM"');
    console.log('   dentro de "MI CUENTA" (llama a getIdToken(true)).');
    console.log('3. O bien cerrar sesión y volver a ingresar.\n');
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`\n[ERROR] No existe ningún usuario con el UID especificado: "${targetUid}".`);
      console.error('Verifique el identificador en Firebase Console > Authentication > Users.\n');
    } else {
      console.error('\n[ERROR DE EJECUCIÓN]', error);
    }
    process.exit(1);
  }
}

main();
