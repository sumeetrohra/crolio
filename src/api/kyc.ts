import { getFunctions, httpsCallable } from 'firebase/functions';
import {
  ICreateUserAccountRequestData,
  IInitiateKYCResponseData,
  IVerifyUploadedDocRequestData,
  IVerifyUploadedDocResponseData,
} from '../types/kyc';

import { ENVIRONMENT_DEV } from '../constants/env';
import axios from 'axios';

// const isDev = process.env.REACT_APP_ENV === ENVIRONMENT_DEV;

export const createUserKYCDetails = (data: ICreateUserAccountRequestData) => {
  const functions = getFunctions();
  // isDev && connectFunctionsEmulator(functions, 'localhost', 5001);
  const createUserAccount = httpsCallable(functions, 'createUserAccount');
  // TODO: this is incorrect interface correct it
  return createUserAccount(data) as unknown as Promise<ICreateUserAccountRequestData>;
};

export const initiateKYC = async (): Promise<IInitiateKYCResponseData> => {
  const functions = getFunctions();
  // isDev && connectFunctionsEmulator(functions, 'localhost', 5001);
  const initiateKYCFunction = httpsCallable(functions, 'initiateKYC');
  return initiateKYCFunction() as unknown as Promise<IInitiateKYCResponseData>;
};

export const uploadFile = (url: string, file: File): Promise<any> => {
  return axios.put(
    url,
    { data: file },
    {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    },
  );
};

export const verifyDoc = async (
  payload: IVerifyUploadedDocRequestData,
): Promise<IVerifyUploadedDocResponseData> => {
  const functions = getFunctions();
  // isDev && connectFunctionsEmulator(functions, 'localhost', 5001);
  const verifyUploadedKYCDoc = httpsCallable(functions, 'verifyUploadedKYCDoc');
  return verifyUploadedKYCDoc(payload) as unknown as Promise<IVerifyUploadedDocResponseData>;
};

export const verifySelfie = (): Promise<IVerifyUploadedDocResponseData> => {
  const functions = getFunctions();
  // isDev && connectFunctionsEmulator(functions, 'localhost', 5001);
  const verifyUploadedKYCSelfie = httpsCallable(functions, 'verifyUploadedKYCSelfie');
  return verifyUploadedKYCSelfie() as unknown as Promise<IVerifyUploadedDocResponseData>;
};
