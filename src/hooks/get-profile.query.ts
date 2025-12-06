import { useQuery } from '@tanstack/react-query';
import request from '../config/api.service';

const getProfileQuery = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => request.get('/user'),
  });
};

export default getProfileQuery;
