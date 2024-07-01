import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA3S-r8NQ3Pemaw8G_kw7bBpPbgPGMbVEw',
  authDomain: 'zenithpayu.firebaseapp.com',
  projectId: 'zenithpayu',
  storageBucket: 'zenithpayu.appspot.com',
  messagingSenderId: '185431841283',
  appId: '1:185431841283:web:68864c19f3d464101bcc36',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
