import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

export type RegisterRequest = {
  name: string;
  telp_number: string;
  email: string;
  password: string;
};

export default function useRegisterMutation() {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      return api.post('/user/register', data);
    },
    onSuccess: () => {
      // Redirect to login page
      toast.success('Register success, please login');
      router.replace('/login');
    },
    onError: () => {
      toast.error('Register failed');
    },
  });

  return { mutate };
}
