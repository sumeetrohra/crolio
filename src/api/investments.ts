import { getAPIClient } from './ApiClient';

export const investMoney = async (payload: { portfolioId: string; amount: number }) => {
  const server = await getAPIClient();
  const data = await server.post('/investments/invest', payload);
  return data;
};

export const getInvestments = async () => {
  const server = await getAPIClient();
  const data = await server.get('/investments');
  return data;
};
