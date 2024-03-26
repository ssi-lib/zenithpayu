import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useFetchUsers = (db) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const userList = [];
    querySnapshot.forEach((doc) => {
      userList.push({ id: doc.id, ...doc.data() });
    });
    setUsers(userList);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const refetch = () => {
    fetchUsers();
  };

  return { users, loading, refetch };
};

// Toggle user status
export const toggleUserStatus = async (db, userId, currentStatus) => {
  const userDocRef = doc(db, 'users', userId);
  const newStatus = currentStatus === 'pending' ? 'confirmed' : 'pending';
  await updateDoc(userDocRef, {
    status: newStatus,
  });
};
