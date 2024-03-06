import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB5cmbqHaJGTr5UmRFHUHRMbcjRXOteZkE',
  authDomain: 'swiftpayu.firebaseapp.com',
  projectId: 'swiftpayu',
  storageBucket: 'swiftpayu.appspot.com',
  messagingSenderId: '1068836775117',
  appId: '1:1068836775117:web:7dbc990fd9be37893f3584',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
