import { useQuery } from '@tanstack/react-query';
import request from '../config/api.service';

const getWalletQuery = () => {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => request.get('/wallet'),
  });
};

export default getWalletQuery;
