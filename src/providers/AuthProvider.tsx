import React from 'react';
import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { onAuthStateChanged, User } from '@firebase/auth';
import { auth } from '../firebase';

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);
  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  )
}
