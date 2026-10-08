# EVO LABS — Administración Segura de Roles y Custom Claims (SECURITY 2A.7)

Este directorio contiene herramientas administrativas fuera del bundle del cliente web para la gestión criptográficamente segura de privilegios de usuario.

---

## 1. Principio Rector de Seguridad

1. **NO CLIENT-SIDE PRIVILEGES**: Ningún usuario puede autoasignarse privilegios de `OWNER` modificando variables de estado, `localStorage`, `sessionStorage`, cookies o código en DevTools (F12).
2. **CUSTOM CLAIMS IN SERVER TOKEN**: El rol `OWNER` proviene exclusivamente de los **Custom Claims** inyectados por Firebase Admin SDK en el ID Token JWT del usuario (`tokenResult.claims.role === 'owner'`).
3. **NO EMAIL LOOKUP**: El script exige **estrictamente el UID de Firebase**. No permite buscar ni asignar privilegios mediante correo electrónico para evitar ataques de homógrafos, colisiones o cuentas no verificadas.
4. **CREDENTIAL ISOLATION**: Este script y el paquete `firebase-admin` se ejecutan **únicamente** en la máquina del administrador o servidor seguro. **NUNCA** se importan desde `src/` ni se incluyen en los artefactos de Vite generados para el navegador.

---

## 2. Requisitos Previos y Credenciales

Para interactuar con Firebase Auth de forma administrativa se requiere una clave privada de Cuenta de Servicio (Service Account) con rol de *Firebase Admin* o *Editor*.

### Cómo obtener la clave:
1. Abra la consola de Firebase: [https://console.firebase.google.com](https://console.firebase.google.com)
2. Ingrese a su proyecto EVO LABS.
3. Vaya a **Configuración del proyecto** (icono de engranaje) > **Cuentas de servicio**.
4. Haga clic en **Generar nueva clave privada** y descargue el archivo JSON.
5. Guarde el archivo en una ruta segura fuera del repositorio o configúrelo como variable de entorno.

### Configurar la variable de entorno:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/ruta/absoluta/a/serviceAccountKey.json"
```

Alternativamente, puede colocar el archivo JSON localmente como `scripts/admin/service-account.json` (el cual está estrictamente listado en `.gitignore` para prevenir filtraciones).

---

## 3. Cómo Obtener el UID del Usuario Correcto

### Método A: Desde Firebase Console
1. Vaya a **Firebase Console > Authentication > Users**.
2. Busque la fila del usuario correspondiente.
3. Copie el valor de la columna **Identificador de usuario (User UID)** (ejemplo: `9xK2LmPQ89Z40rTy1aB...`).

### Método B: Desde la Aplicación Web (Modal "MI CUENTA")
1. El usuario inicia sesión en la plataforma.
2. Hace clic en su avatar/nombre en la barra superior.
3. Selecciona **MI CUENTA**.
4. Hace clic en el botón **COPIAR UID** junto al campo *FIREBASE UID (IDENTIFICADOR ÚNICO)* y lo suministra al administrador.

---

## 4. Comandos de Ejecución

### Asignar rol de OWNER:
```bash
node scripts/admin/set-owner-claim.mjs <FIREBASE_UID>
```

**Salida esperada:**
```text
====================================================
 EVO LABS // ADMINISTRACIÓN DE CUSTOM CLAIMS (2A.7) 
====================================================

[AUTH] Credenciales cargadas desde GOOGLE_APPLICATION_CREDENTIALS: /ruta/a/key.json

[BUSCANDO] Consultando usuario en Firebase Auth: 9xK2LmPQ89Z40rTy1aB...
[USUARIO ENCONTRADO]
  UID:          9xK2LmPQ89Z40rTy1aB...
  Email:        zudoka@email.com
  Display Name: Zudoka
  Verificado:   SÍ
  Claims prev:  {}

[ASIGNANDO] Asignando claim { role: "owner" } para 9xK2LmPQ89Z40rTy1aB...
----------------------------------------------------
[ÉXITO] Rol OWNER asignado satisfactoriamente.
Nuevos Claims: { role: "owner" }
----------------------------------------------------
```

---

### Revocar rol de OWNER (volver a usuario estándar FREE):
```bash
node scripts/admin/set-owner-claim.mjs <FIREBASE_UID> --remove
```

**Salida esperada:**
```text
[REVOCANDO] Removiendo rol owner para 9xK2LmPQ89Z40rTy1aB...
----------------------------------------------------
[ÉXITO] Rol OWNER revocado.
Nuevos Claims: { role: "user" }
----------------------------------------------------
```

---

## 5. Propagación al Cliente Web (Token Refresh)

Una vez que el script asigna el claim en los servidores de Firebase:
- Firebase no actualiza automáticamente los tokens emitidos previamente de inmediato.
- Para reflejar el cambio en la aplicación web del usuario sin esperar la expiración natural del token (1 hora), el usuario tiene dos opciones:
  1. Abrir su menú de usuario > **MI CUENTA** y pulsar **"ACTUALIZAR TOKEN // REFRESH CLAIM"** (ejecuta `auth.currentUser.getIdToken(true)`).
  2. O seleccionar **CERRAR SESIÓN** y volver a iniciar sesión.

Inmediatamente, la UI transicionará de `PLAN GRATIS` a `OWNER` y todas las comprobaciones de `canAccess()` quedarán autorizadas.
