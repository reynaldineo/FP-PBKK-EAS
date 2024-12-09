import { useQuery } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api';

export interface IOrderProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  image_url: string;
  buy_quantity: number;
  order_status: string;
}

export interface IOrder {
  id: string;
  status: 'pending' | 'paid' | 'sent' | 'done';
  order_product: IOrderProduct[];
}

interface IGetMyOrderQuery {
  orders: IOrder[];
}

export default function useGetMyOrderQuery() {
  const { data, refetch, isPending } = useQuery<ApiResponse<IGetMyOrderQuery>>({
    queryKey: ['/order'],
  });

  return { data, refetch, isPending };
}
