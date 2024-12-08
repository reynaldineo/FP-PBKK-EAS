import { useQuery } from '@tanstack/react-query';

import { IProductTable } from '@/app/admin/product/components/ProductTable';
import { ApiResponse } from '@/types/api';

export default function useGetProductByIdQuery(idProduct: string) {
  const { data, refetch } = useQuery<ApiResponse<IProductTable>>({
    queryKey: ['/product/' + idProduct],
  });

  return { data, refetch };
}
