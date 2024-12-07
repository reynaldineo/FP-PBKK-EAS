import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import useGetAllProductQuery from './useGetAllProductQuery';

export default function useDeleteProductMutation() {
  const { refetch } = useGetAllProductQuery();

  const { mutate } = useMutation({
    mutationFn: async (idProduct: string) => {
      return api.delete(`/product/${idProduct}`);
    },
    onSuccess: () => {
      toast.success('Delete product success');
      refetch();
    },
    onError: () => {
      toast.error('Delete product failed');
    },
  });

  return { mutate };
}
