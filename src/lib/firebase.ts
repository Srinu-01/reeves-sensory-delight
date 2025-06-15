
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAZ26cJq81LyR7u1BsGbpHNuNh3hS0ZjZs",
  authDomain: "reeves-b7f35.firebaseapp.com",
  databaseURL: "https://reeves-b7f35-default-rtdb.firebaseio.com",
  projectId: "reeves-b7f35",
  storageBucket: "reeves-b7f35.firebasestorage.app",
  messagingSenderId: "695257819712",
  appId: "1:695257819712:web:26d19419227a2a61864da5",
  measurementId: "G-LEWZL1M1T9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
