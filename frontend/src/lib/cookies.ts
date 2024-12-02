import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = (): string => cookies.get('@reynaldineo/token');

export const setToken = (token: string) => {
  cookies.set('@reynaldineo/token', token, { path: '/' });
};

export const removeToken = () =>
  cookies.remove('@reynaldineo/token', { path: '/' });
