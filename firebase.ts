import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "bodik-75ffc.firebaseapp.com",
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: "bodik-75ffc",
  storageBucket: "bodik-75ffc.appspot.com",
  messagingSenderId: "904451021821",
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database
export const REALTIME_DATABASE = getDatabase(app);
export const RD_PROJECT_NAME = "/app_1/items/";

// Firestore Database
export const FIRESTORE_DATABASE = getFirestore(app);
export const FIRESTORE_COLLECTION = "items";
