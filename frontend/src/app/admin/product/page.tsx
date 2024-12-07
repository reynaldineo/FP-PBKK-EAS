import { Metadata } from 'next';

import AdminProductPage from './container/AdminProductPage';

export const metadata: Metadata = {
  title: 'Admin Product',
};

export default function AdminProductMainPage() {
  return (
    <main>
      <AdminProductPage />
    </main>
  );
}
