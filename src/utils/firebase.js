import admin from 'firebase-admin';
import serviceAccount from '../firebaseServiceAccount.json' assert { type: "json" }; // path to your key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project-id.appspot.com', // Replace with your bucket
});

const bucket = admin.storage().bucket();

export { bucket };
