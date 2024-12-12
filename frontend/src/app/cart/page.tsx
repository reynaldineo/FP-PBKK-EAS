'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';

import withAuth from '@/components/hoc/withAuth';
import Loading from '@/components/Loading';
import Layout from '@/layouts/Layout';

import AddToOrderModal from './components/AddToOrderModal';
import CartProduct from './components/CartProduct';
import useGetAllMyCartProduct from './hooks/useGetAllMyCartProduct';

export default withAuth(CartPage, 'user');
function CartPage() {
  const { data, isPending } = useGetAllMyCartProduct();
  const [cartProducts, setCartProducts] = useState(data?.data.products || []);

  const isCartEmpty = cartProducts.length === 0; // Check if cart is empty

  const taxPrice = 10;
  const discountPrice = 39;

  const originalPrice = useMemo(() => {
    return (
      cartProducts?.reduce(
        (total, product) => total + product.price * product.buy_quantity,
        0
      ) ?? 0
    );
  }, [cartProducts]);

  const totalPrice = originalPrice + taxPrice - discountPrice;

  // Handlers for increment, decrement, and remove
  const handleIncrement = (id: string) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, buy_quantity: product.buy_quantity + 1 }
          : product
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === id && product.buy_quantity > 1
          ? { ...product, buy_quantity: product.buy_quantity - 1 }
          : product
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartProducts((prev) => prev.filter((product) => product.id !== id));
  };

  if (isPending) {
    return <Loading />;
  }

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
                {cartProducts.length > 0 ? (
                  cartProducts.map((product) => (
                    <CartProduct
                      product={product}
                      key={product.id}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                      onRemove={handleRemove}
                    />
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

                      {originalPrice > 0 && (
                        <>
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
                        </>
                      )}
                    </div>

                    <dl className='flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700'>
                      <dt className='text-base font-bold text-gray-900 dark:text-white'>
                        Total
                      </dt>
                      <dd className='text-base font-bold text-gray-900 dark:text-white'>
                        ${originalPrice > 0 ? totalPrice : 0}
                      </dd>
                    </dl>
                  </div>

                  {/* Only show Proceed to Checkout if cart is not empty */}
                  {/* Kondisi untuk tombol Proceed to Checkout */}
                  {!isCartEmpty && data?.data.cart_id ? (
                    <AddToOrderModal cartId={data.data.cart_id} />
                  ) : (
                    <div className='text-center'>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Your cart is empty. Please add products.
                      </p>
                    </div>
                  )}

                  <div className='flex items-center justify-center gap-2'>
                    {isCartEmpty ? (
                      <Link
                        href='/'
                        className='inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500'
                      >
                        Continue Shopping
                      </Link>
                    ) : (
                      <p className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                        Proceed to checkout or continue shopping.
                      </p>
                    )}
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
