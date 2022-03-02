import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { devAppConfig } from '../config/dev';

export const getAPIClient = async () => {
  const auth = getAuth();
  const idToken = await auth.currentUser?.getIdToken(true);
  return axios.create({
    baseURL: devAppConfig.backendUrl,
    headers: { Authorization: `Bearer ${idToken}` },
  });
};
