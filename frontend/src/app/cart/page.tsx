'use client';
import Link from 'next/link';
import { useMemo } from 'react';

import withAuth from '@/components/hoc/withAuth';
import Loading from '@/components/Loading';
import Layout from '@/layouts/Layout';

import CartProduct from './components/CartProduct';
import useGetAllMyCartProduct from './hooks/useGetAllMyCartProduct';

export default withAuth(CartPage, 'user');
function CartPage() {
  const { data, isPending } = useGetAllMyCartProduct();

  const cartProducts = data?.data.products;

  if (isPending) {
    <Loading />;
  }

  const taxPrice = 10;
  const discountPrice = 39;
  const originalPrice = useMemo(() => {
    return (
      cartProducts?.reduce(
        (total, product) => total + product.price * product.buy_quantity,
        0,
      ) ?? 0
    );
  }, [cartProducts]);
  const totalPrice = originalPrice + taxPrice - discountPrice;

  return (
    <Layout withFooter withNavbar>
      <section className='bg-white py-8 antialiased dark:bg-gray-900 md:py-16'>
        <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl'>
            Shopping Cart
          </h2>

          <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
            <div className='mx-auto flex w-full flex-none flex-col gap-8 lg:max-w-4xl lg:flex-row xl:max-w-6xl'>
              <div className='space-y-6'>
                {cartProducts ? (
                  cartProducts.map((product) => (
                    <CartProduct product={product} key={product.id} />
                  ))
                ) : (
                  <div className='text-center text-gray-500 dark:text-gray-400 lg:px-52'>
                    <p>Your cart is empty. Add some products to your cart!</p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className='mx-auto mt-6 w-full max-w-3xl flex-1 space-y-6 lg:mt-0 lg:w-full'>
                <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6'>
                  <p className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Order summary
                  </p>

                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <dl className='flex items-center justify-between gap-4'>
                        <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                          Original price
                        </dt>
                        <dd className='text-base font-medium text-gray-900 dark:text-white'>
                          ${originalPrice}
                        </dd>
                      </dl>

                      <dl className='flex items-center justify-between gap-4'>
                        <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                          Savings
                        </dt>
                        <dd className='text-base font-medium text-green-600'>
                          -${discountPrice}
                        </dd>
                      </dl>

                      <dl className='flex items-center justify-between gap-4'>
                        <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                          Tax
                        </dt>
                        <dd className='text-base font-medium text-gray-900 dark:text-white'>
                          ${taxPrice}
                        </dd>
                      </dl>
                    </div>

                    <dl className='flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700'>
                      <dt className='text-base font-bold text-gray-900 dark:text-white'>
                        Total
                      </dt>
                      <dd className='text-base font-bold text-gray-900 dark:text-white'>
                        ${totalPrice}
                      </dd>
                    </dl>
                  </div>

                  <Link
                    href='#'
                    className='flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                  >
                    Proceed to Checkout
                  </Link>

                  <div className='flex items-center justify-center gap-2'>
                    <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                      {' '}
                      or{' '}
                    </span>
                    <Link
                      href='/'
                      className='inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500'
                    >
                      Continue Shopping
                      <svg
                        className='h-5 w-5'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 12H5m14 0-4 4m4-4-4-4'
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
