import Layout from '@/layouts/Layout';

import ProductList from './product/containers/ProductList';

export default function Home() {
  return (
    <Layout withNavbar withFooter>
      <main className='min-h-screen'>
        <ProductList />
      </main>
    </Layout>
  );
}
