import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logout,
  connectAuthEmulator,
  UserCredential,
} from 'firebase/auth';
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
