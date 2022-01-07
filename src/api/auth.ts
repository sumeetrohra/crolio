import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logout,
  connectAuthEmulator,
  UserCredential,
  onAuthStateChanged,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { devAppConfig } from '../config/dev';
import { ENVIRONMENT_DEV } from '../constants/env';

const isDev = process.env.REACT_APP_ENV === ENVIRONMENT_DEV;

export const signUp = (email: string, password: string): Promise<UserCredential> => {
  const auth = getAuth();
  isDev && connectAuthEmulator(auth, devAppConfig.emulatorUrl);
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string): Promise<UserCredential> => {
  const auth = getAuth();
  isDev && connectAuthEmulator(auth, devAppConfig.emulatorUrl);
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = (): Promise<void> => {
  const auth = getAuth();
  isDev && connectAuthEmulator(auth, devAppConfig.emulatorUrl);
  return logout(auth);
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userUID, setUserUID] = useState('');

  useEffect(() => {
    const _auth = getAuth();
    onAuthStateChanged(_auth, (user) => {
      setLoading(true);
      if (user) {
        setLoggedIn(true);
        setUserUID(user.uid);
      } else {
        setLoggedIn(false);
        setUserUID('');
      }
      setLoading(false);
    });
  }, []);

  return { loading, loggedIn, userUID };
};
