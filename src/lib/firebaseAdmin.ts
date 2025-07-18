import { getApps, initializeApp, cert, App, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

if (!getApps().length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON) {
    const key = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON);
    adminApp = initializeApp({ credential: cert(key) });
  } else {
    // On Cloud Run: uses service account identity (no key file)
    adminApp = initializeApp({ credential: applicationDefault() });
  }
} else {
  adminApp = getApps()[0];
}

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
