import * as dotenv from 'dotenv';
dotenv.config();

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

async function main() {
  const email = process.env.EVO_OWNER_EMAIL?.trim();
  const password = process.env.EVO_OWNER_PASSWORD?.trim();

  if (!email || !password) {
    console.error('ERROR: Variables de entorno requeridas faltantes.');
    console.error('Debe definir EVO_OWNER_EMAIL y EVO_OWNER_PASSWORD en las variables de entorno del servidor.');
    console.error('Ejemplo: EVO_OWNER_EMAIL="owner@evolabs.com" EVO_OWNER_PASSWORD="PasswordSeguro123" npm run admin:create-owner');
    process.exit(1);
  }

  // 1. Inicializar Firebase Admin
  let adminApp;
  let projectId = 'gen-lang-client-0109963225';

  if (getApps().length > 0) {
    adminApp = getApps()[0];
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      projectId = serviceAccount.project_id || projectId;
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId,
        storageBucket: `${projectId}.firebasestorage.app`,
      });
    } catch (err) {
      console.error('ERROR: No se pudo parsear FIREBASE_SERVICE_ACCOUNT_JSON:', err.message);
      process.exit(1);
    }
  } else {
    try {
      adminApp = initializeApp({
        projectId,
        storageBucket: `${projectId}.firebasestorage.app`,
      });
    } catch (err) {
      console.error('ERROR: No se pudo inicializar Firebase Admin:', err.message);
      process.exit(1);
    }
  }

  const adminAuth = getAuth(adminApp);

  try {
    // 3. Buscar usuario por email
    let userRecord;
    try {
      userRecord = await adminAuth.getUserByEmail(email);
      // 5. Usuario existente: actualizar password y asegurar emailVerified
      await adminAuth.updateUser(userRecord.uid, {
        password,
        emailVerified: true,
      });
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        // 4. No existe: crear usuario
        userRecord = await adminAuth.createUser({
          email,
          password,
          emailVerified: true,
        });
      } else {
        throw err;
      }
    }

    // 6. Asignar Custom Claims preservando claims existentes
    const existingClaims = userRecord.customClaims || {};
    const updatedClaims = {
      ...existingClaims,
      role: 'owner',
    };

    await adminAuth.setCustomUserClaims(userRecord.uid, updatedClaims);

    // 7. Verificar al final
    const verifiedUser = await adminAuth.getUser(userRecord.uid);
    const verifiedRole = verifiedUser.customClaims?.role;

    if (verifiedRole === 'owner') {
      console.log('EMAIL: configurado');
      console.log(`UID: ${verifiedUser.uid}`);
      console.log('ROLE: owner');
      console.log('OWNER CLAIM: PASS');
    } else {
      console.error('ERROR: El claim role: "owner" no pudo ser verificado.');
      console.log('OWNER CLAIM: FAIL');
      process.exit(1);
    }
  } catch (error) {
    console.error('ERROR en operación de usuario admin:', error.message || error);
    process.exit(1);
  }
}

main();
