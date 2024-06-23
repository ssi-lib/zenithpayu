import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const fetchUserDetails = (setUserDetail) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const docRef = doc(db, 'users', `${currentUser.uid}`);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      setUserDetail(doc.data());
    });

    return unsubscribe;
  }
  return null;
};
