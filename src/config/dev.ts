export const devAppConfig = {
  firebaseConfig: {
    apiKey: process.env.REACT_APP_FIREBASE_DEV_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DEV_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_DEV_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_DEV_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_DEV_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_DEV_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_DEV_MEASUREMENT_ID,
  }
};