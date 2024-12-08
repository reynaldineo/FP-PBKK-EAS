import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

export type CartRequest = {
  product_id: string;
  quantity: number;
};

export default function useAddCartMutation() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CartRequest[]) => {
      return api.post('/cart', data);
    },
    onSuccess: () => {
      toast.success('Add to cart success');
      router.push('/cart');
    },
    onError: () => {
      toast.error('Add to cart failed');
    },
  });

  return { mutate, isPending };
}
