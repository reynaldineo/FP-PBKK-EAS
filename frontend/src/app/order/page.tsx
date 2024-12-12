'use client';

import { useEffect, useMemo, useState } from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/layouts/Layout';

import Pagination from '../admin/product/components/Pagination';
import OrderItem from './components/OrderItem';
import useGetMyOrderQuery, { IOrder } from './hooks/useGetMyOrderQuery';

const itemsPerPage = 5;

export default withAuth(OrderPage, 'user');


function OrderPage() {
  const { data } = useGetMyOrderQuery();
  const orders = useMemo(() => data?.data.orders || [], [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<IOrder[]>([]);
  const [allOrders, setAllOrders] = useState<IOrder[]>(orders); // State tambahan

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentData(allOrders.slice(startIdx, endIdx));
  }, [currentPage, allOrders]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCancelOrder = (orderId: string) => {
    setAllOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return (
    <Layout withFooter withNavbar>
      <section className='min-h-screen bg-white py-8 antialiased dark:bg-gray-900 md:py-16'>
        <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
          <div className='mx-auto max-w-5xl'>
            <div className='gap-4 sm:flex sm:items-center sm:justify-between'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl'>
                My orders
              </h2>
            </div>

            {/* Order Item */}
            <div className='mt-6 flow-root sm:mt-8'>
              {currentData.length > 0 ? (
                currentData.map((order) => (
                  <OrderItem
                    key={order.id}
                    orderId={order.id}
                    date={'2021-10-10'}
                    price={'$100'}
                    status={order.status}
                    onCancel={handleCancelOrder} // Kirim callback
                  />
                ))
              ) : (
                <div className='py-6 text-center text-gray-500 dark:text-gray-400'>
                  <h3 className='text-xl font-semibold'>No orders found</h3>
                  <p className='mt-2'>
                    It looks like you haven&apos;t placed any orders yet.
                  </p>
                </div>
              )}
            </div>

            <div className='mt-5'>
              <Pagination
                totalItems={orders.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
