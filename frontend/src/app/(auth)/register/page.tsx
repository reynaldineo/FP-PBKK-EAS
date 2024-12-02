import { Metadata } from 'next';

import RegisterForm from './container/RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
