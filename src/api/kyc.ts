import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import {
  ICreateUserAccountRequestData,
  IInitiateKYCResponseData,
  IVerifyUploadedDocRequestData,
  IVerifyUploadedDocResponseData,
} from '../types/kyc';

import { ENVIRONMENT_DEV } from '../constants/env';
import axios from 'axios';

const isDev = process.env.REACT_APP_ENV === ENVIRONMENT_DEV;

export const createUserKYCDetails = (data: ICreateUserAccountRequestData) => {
  const functions = getFunctions();
  // isDev && connectFunctionsEmulator(functions, 'localhost', 5001);
  const createUserAccount = httpsCallable(functions, 'createUserAccount');
  // TODO: this is incorrect interface correct it
  return createUserAccount(data) as unknown as Promise<ICreateUserAccountRequestData>;
};

export const initiateKYC = async (): Promise<IInitiateKYCResponseData> => {
  const functions = getFunctions();
  isDev && connectFunctionsEmulator(functions, 'localhost', 5001);
  const initiateKYCFunction = httpsCallable(functions, 'initiateKYC');
  return initiateKYCFunction() as unknown as Promise<IInitiateKYCResponseData>;
};

export const uploadFile = (url: string, file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('image', file);
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const verifyDoc = async (
  payload: IVerifyUploadedDocRequestData,
): Promise<IVerifyUploadedDocResponseData> => {
  const functions = getFunctions();
  isDev && connectFunctionsEmulator(functions, 'localhost', 5001);
  const verifyUploadedKYCDoc = httpsCallable(functions, 'verifyUploadedKYCDoc');
  return verifyUploadedKYCDoc(payload) as unknown as Promise<IVerifyUploadedDocResponseData>;
};
