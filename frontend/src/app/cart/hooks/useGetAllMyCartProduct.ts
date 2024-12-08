import { useQuery } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api';

export interface ICartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  image_url: string;
  buy_quantity: number;
}

interface ICartProductResponse {
  cart_id: string;
  products: ICartProduct[];
}

export default function useGetAllMyCartProduct() {
  const { data, refetch, isPending } = useQuery<
    ApiResponse<ICartProductResponse>
  >({
    queryKey: ['/cart'],
  });

  return { data, refetch, isPending };
}
