import { getAPIClient } from './ApiClient';

// TODO: Sumeet create a User interface
export const getUserDetails = async (uid?: string): Promise<any> => {
  if (!uid) {
    return { exists: false };
  }
  const server = await getAPIClient();
  const data = await server(`/users/${uid}`);
  return data.data;
};
