import { useQuery } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api';

import { IProductTable } from '../components/ProductTable';

export default function useGetAllProductQuery() {
  const { data, refetch } = useQuery<ApiResponse<IProductTable[]>>({
    queryKey: ['/product'],
  });

  return { data, refetch };
}
