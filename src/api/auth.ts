import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logout,
  // connectAuthEmulator,
  User,
  onAuthStateChanged,
  sendEmailVerification,
  applyActionCode,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
// import { devAppConfig } from '../config/dev';
// import { ENVIRONMENT_DEV } from '../constants/env';

// const isDev = process.env.REACT_APP_ENV === ENVIRONMENT_DEV;

export type UserDetails = User;

export const signUp = async (email: string, password: string): Promise<User> => {
  const auth = getAuth();
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred.user;
};

export const login = async (email: string, password: string): Promise<User> => {
  const auth = getAuth();
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
};

export const signOut = (): Promise<void> => {
  const auth = getAuth();
  return logout(auth);
};

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<UserDetails | null>(null);

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

export const sendVerificationEmail = (user: UserDetails): Promise<void> => {
  return sendEmailVerification(user);
};

export const sendEmailVerificationCode = (code: string): Promise<void> => {
  const auth = getAuth();
  return applyActionCode(auth, code);
};
