import { useQuery } from '@tanstack/react-query';
import request from '../config/api.service';
import type { FilterState } from '../context/filter-context';

const getTransactionQuery = (filters?: FilterState) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      const params: Record<string, any> = {};

      if (filters?.startDate) {
        params.startDate = filters.startDate.toISOString().split('T')[0];
      }
      if (filters?.endDate) {
        params.endDate = filters.endDate.toISOString().split('T')[0];
      }
      if (filters?.transactionTypes && filters.transactionTypes.length > 0) {
        params.type = filters.transactionTypes.join(',');
      }
      if (
        filters?.transactionStatuses &&
        filters.transactionStatuses.length > 0
      ) {
        params.status = filters.transactionStatuses.join(',');
      }

      const response = await request.get('/transactions', { params });
      return response.data;
    },
  });
};

export default getTransactionQuery;
