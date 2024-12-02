import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
import toast from 'react-hot-toast';

import api from '@/lib/api';
import { setToken } from '@/lib/cookies';
import useAuthStore from '@/stores/useAuthStore';
import { ApiResponse } from '@/types/api';
import { User } from '@/types/user';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  role: string;
};

export default function useLoginMutation() {
  const { login } = useAuthStore();

  const { mutate, isPending } = useMutation<
    AxiosResponse,
    AxiosError<ApiError>,
    LoginRequest
  >({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post<ApiResponse<LoginResponse>>(
        '/user/login',
        data,
      );
      const { token } = res.data.data;
      setToken(token);

      const user = await api.get<ApiResponse<User>>('/user/me');
      if (user) login({ ...user.data.data, token: token });

      return res;
    },
    onSuccess: () => {
      toast.success('Anda berhasil login');
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message ||
          'Email atau kata sandi salah, silahkan coba lagi',
      );
    },
  });
  return { mutate, isPending };
}
