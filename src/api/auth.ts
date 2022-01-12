import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logout,
  // connectAuthEmulator,
  UserCredential,
  User,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
// import { devAppConfig } from '../config/dev';
// import { ENVIRONMENT_DEV } from '../constants/env';

// const isDev = process.env.REACT_APP_ENV === ENVIRONMENT_DEV;

export const signUp = (email: string, password: string): Promise<UserCredential> => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string): Promise<UserCredential> => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = (): Promise<void> => {
  const auth = getAuth();
  return logout(auth);
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const _auth = getAuth();
    onAuthStateChanged(_auth, (user) => {
      setLoading(true);
      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  return { loading, loggedIn, user };
};

export const sendVerificationEmail = (user: User): Promise<void> => {
  return sendEmailVerification(user);
};
