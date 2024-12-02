import { Metadata } from 'next';

import LoginForm from './container/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
};

export default function RegisterPage() {
  return <LoginForm />;
}
