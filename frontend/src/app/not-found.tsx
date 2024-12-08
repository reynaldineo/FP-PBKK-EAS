import { Metadata } from 'next';
import * as React from 'react';

import NotFoundPage from '@/components/NotFound';

export const metadata: Metadata = {
  title: '404',
};

export default function NotFound() {
  return <NotFoundPage />;
}
