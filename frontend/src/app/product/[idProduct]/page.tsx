'use client';

import Image from 'next/image';
import Link from 'next/link';

import withAuth from '@/components/hoc/withAuth';
import NotFoundPage from '@/components/NotFound';
import Layout from '@/layouts/Layout';

import useGetProductByIdQuery from '../hooks/useGetProductByIdQuery';

export default withAuth(DetailProductPage, 'user');
function DetailProductPage({ params }: { params: { idProduct: string } }) {
  const { idProduct } = params;

  const { data } = useGetProductByIdQuery(idProduct);

  const productData = data?.data;

  if (!productData) {
    return <NotFoundPage />;
  }

  return (
    <Layout withFooter withNavbar>
      <section className='bg-white py-8 antialiased dark:bg-gray-900 md:py-16'>
        <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
          <div className='lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16'>
            <div className='mx-auto max-w-md shrink-0 lg:max-w-lg'>
              <Image
                src={productData.image_url}
                alt={productData.name}
                width={500}
                height={500}
                className='w-full dark:hidden'
              />
              <Image
                src={productData.image_url}
                alt={productData.name}
                width={500}
                height={500}
                className='hidden w-full dark:block'
              />
            </div>

            <div className='mt-6 sm:mt-8 lg:mt-0'>
              <h1 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl'>
                {productData.name}
              </h1>
              <div className='mt-4 sm:flex sm:items-center sm:gap-4'>
                <p className='text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl'>
                  ${productData.price}
                </p>

                <div className='mt-2 flex items-center gap-2 sm:mt-0'>
                  <div className='flex items-center gap-1'>
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className='h-4 w-4 text-yellow-300'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
                      </svg>
                    ))}
                    <p className='text-sm font-medium leading-none text-gray-500 dark:text-gray-400'>
                      (5.0)
                    </p>
                    <Link href='#'>345 Reviews</Link>
                  </div>
                </div>
              </div>

              <div className='mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4'>
                <button
                  className='mt-4 flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0'
                  title='Add to cart'
                >
                  <svg
                    className='-ms-2 me-2 h-5 w-5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6'
                    />
                  </svg>
                  Add to cart
                </button>
              </div>

              <hr className='my-6 border-gray-200 dark:border-gray-800 md:my-8' />

              <p className='mb-6 text-gray-500 dark:text-gray-400'>
                {productData.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
