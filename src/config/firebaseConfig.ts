import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? (JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount)
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
  });
}

const firestore = admin.firestore();
export { firestore };
