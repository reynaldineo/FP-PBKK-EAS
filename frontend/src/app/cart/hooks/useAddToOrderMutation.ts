import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

export type AddOrderRequest = {
  cart_id: string;
};

export default function useAddToOrderMutation() {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (data: AddOrderRequest) => {
      return api.post('/order', data);
    },
    onSuccess: () => {
      toast.success('Add to order success');
      router.push('/order');
    },
    onError: () => {
      toast.error('Add to order failed');
    },
  });

  return { mutate };
}
