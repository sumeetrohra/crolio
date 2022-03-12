import { getAPIClient } from './ApiClient';

export const getAllPortfolios = async () => {
  const server = await getAPIClient();
  const data = await server.get('/portfolios');
  return data;
};

export const getPortfolioDetails = async (id: string) => {
  const server = await getAPIClient();
  const data = await server.get(`/portfolios/${id}`);
  return data;
};
