import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../store/Context';

function Error() {
  const navigate = useNavigate();
  const { userDetail } = useGlobalStore;

  // useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         const uid = user.uid;
  //         const docRef = doc(db, 'users', `${uid}`);

  //         const unsubscribe = onSnapshot(docRef, (doc) => {
  //           setUserDetail(doc.data());
  //         });

  //         return () => unsubscribe();
  //       } else {
  //         setUserDetail({});
  //       }
  //     });
  //   }, [db, auth]);

  //   useEffect(() => {
  //     if (!userDetail) {
  //       navigate('/');
  //     }
  //   }, [userDetail, navigate]);

  return (
    <div>
      <p>Error</p>
    </div>
  );
}

export default Error;
