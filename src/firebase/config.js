// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCsA9KBYTcWqO9gtY0rM_8syD_4D0dfqCI",
  authDomain: "gardenmate-a346a.firebaseapp.com",
  projectId: "gardenmate-a346a",
  storageBucket: "gardenmate-a346a.appspot.com",
  messagingSenderId: "243578217043",
  appId: "1:243578217043:web:17f6480f17f840e6f89ca6",
  measurementId: "G-NNKH2N7B3Y"
};

const app = initializeApp(firebaseConfig);

// ✅ Eksportaj auth i db
export const auth = getAuth(app);
export const db = getFirestore(app);