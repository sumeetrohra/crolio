import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logout,
  User,
  onAuthStateChanged,
  sendEmailVerification,
  applyActionCode,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getUserDetails } from './user';

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
  const [isKYCDone, setIsKYCDone] = useState<boolean>(false);
  const [kycStatus, setKycStatus] = useState();

  useEffect(() => {
    const _auth = getAuth();
    onAuthStateChanged(_auth, async (user) => {
      setLoading(true);
      if (user) {
        setLoggedIn(true);
        setUser(user);
        const userData = await getUserDetails(user.uid);
        if (userData) {
          setKycStatus(userData.data.kycStatus);
          setIsKYCDone(userData.data.kycStatus.isKYCDone);
        }
      } else {
        setLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {}, []);

  return { loading, loggedIn, user, isKYCDone, kycStatus };
};

export const sendVerificationEmail = (user: UserDetails): Promise<void> => {
  return sendEmailVerification(user);
};

export const sendEmailVerificationCode = (code: string): Promise<void> => {
  const auth = getAuth();
  return applyActionCode(auth, code);
};

export const sendPasswordResetLink = (email: string): Promise<void> => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

export const resetPassword = (oobCode: string, newPassword: string): Promise<void> => {
  const auth = getAuth();
  return confirmPasswordReset(auth, oobCode, newPassword);
};
