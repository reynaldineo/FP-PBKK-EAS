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

export default function useEditProductMutation() {
  const { refetch } = useGetAllProductQuery();

  const { mutate } = useMutation({
    mutationFn: async ({
      productId,
      data,
    }: {
      productId: string;
      data: ProductRequest;
    }) => {
      return api.put(`/product/${productId}`, data);
    },
    onSuccess: () => {
      toast.success('Edit product success');
      refetch();
    },
    onError: () => {
      toast.error('Edit product failed');
    },
  });

  return { mutate };
}
