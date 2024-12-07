import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import useGetAllProductQuery from './useGetAllProductQuery';

export type ProductRequest = {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  image_url: string;
};

export default function useAddProductMutation() {
  const { refetch } = useGetAllProductQuery();

  const { mutate } = useMutation({
    mutationFn: async (data: ProductRequest) => {
      return api.post('/product', data);
    },
    onSuccess: () => {
      toast.success('Add product success');
      refetch();
    },
    onError: () => {
      toast.error('Add product failed');
    },
  });

  return { mutate };
}
