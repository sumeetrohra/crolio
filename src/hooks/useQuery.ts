import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const queryArray = useLocation().search ? useLocation().search.split('?')[1].split('&') : [];
  const queryParams: { [key: string]: string } = {};
  for (let i = 0; i < queryArray.length; i++) {
    const [key, val] = queryArray[i].split('=');
    queryParams[key] = val ? val : '';
  }
  return queryParams;
};

export default useQuery;
