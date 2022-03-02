import { getFunctions, httpsCallable } from 'firebase/functions';
import {
  ICreateUserAccountRequestData,
  IInitiateKYCResponseData,
  IRequestInstantKYCApprovalResponseData,
  IVerifyUploadedDocRequestData,
  IVerifyUploadedDocResponseData,
} from '../types/kyc';

// import { ENVIRONMENT_DEV } from '../constants/env';
import axios from 'axios';
import { getAPIClient } from './ApiClient';

// const isDev = process.env.REACT_APP_ENV === ENVIRONMENT_DEV;

export const createUserKYCDetails = async (payload: ICreateUserAccountRequestData) => {
  const server = await getAPIClient();
  const data = await server.post('/users', payload);
  return data.data;
};

export const initiateKYC = async (): Promise<IInitiateKYCResponseData> => {
  const server = await getAPIClient();
  const data = await server.get('/kyc/initiateKYC');
  return data;
};

export const uploadFile = async (url: string, file: File): Promise<any> => {
  return axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

export const verifyDoc = async (
  payload: IVerifyUploadedDocRequestData,
): Promise<IVerifyUploadedDocResponseData> => {
  const server = await getAPIClient();
  const data = await server.post('/kyc/verify_doc', payload);
  return data;
};

export const verifySelfie = async (): Promise<IVerifyUploadedDocResponseData> => {
  const server = await getAPIClient();
  const data = await server.post('/kyc/verify_selfie');
  return data;
};

export const requestInstantKYCApproval =
  async (): Promise<IRequestInstantKYCApprovalResponseData> => {
    const server = await getAPIClient();
    const data = await server.post('/kyc/request_kyc_approval');
    return data;
  };
