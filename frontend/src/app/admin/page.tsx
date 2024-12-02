'use client';

import withAuth from '@/components/hoc/withAuth';
import Typography from '@/components/Typography';

export default withAuth(page, 'admin');
function page() {
  return (
    <section className='min-h-screen'>
      <Typography variant='h1' className='text-white'>
        Admin Page
      </Typography>
    </section>
  );
}
