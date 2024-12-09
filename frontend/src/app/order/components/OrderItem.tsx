import React from 'react';

export interface OrderItemProps {
  orderId: string;
  date: string;
  price: string;
  status: 'pending' | 'paid' | 'sent' | 'done';
}

const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  date,
  price,
  status,
}) => {
  const statusColors: { [key in OrderItemProps['status']]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-blue-100 text-blue-800',
    sent: 'bg-purple-100 text-purple-800',
    done: 'bg-green-100 text-green-800',
  };

  const getStatusStyle = () =>
    statusColors[status] || 'bg-gray-100 text-gray-800';

  return (
    <div className='flex flex-wrap items-center gap-y-4 border-b border-gray-200 py-6 dark:border-gray-700'>
      <dl className='w-1/2 sm:w-1/4 lg:w-auto lg:flex-1'>
        <dt className='text-base font-medium text-gray-500 dark:text-gray-400'>
          Order ID:
        </dt>
        <dd className='mt-1.5 text-base font-semibold text-gray-900 dark:text-white'>
          <a href='#' className='hover:underline'>
            {orderId.slice(0, 13)}
          </a>
        </dd>
      </dl>

      <dl className='w-1/2 sm:w-1/4 lg:w-auto lg:flex-1'>
        <dt className='text-base font-medium text-gray-500 dark:text-gray-400'>
          Date:
        </dt>
        <dd className='mt-1.5 text-base font-semibold text-gray-900 dark:text-white'>
          {date}
        </dd>
      </dl>

      <dl className='w-1/2 sm:w-1/4 lg:w-auto lg:flex-1'>
        <dt className='text-base font-medium text-gray-500 dark:text-gray-400'>
          Price:
        </dt>
        <dd className='mt-1.5 text-base font-semibold text-gray-900 dark:text-white'>
          {price}
        </dd>
      </dl>

      <dl className='w-1/2 sm:w-1/4 lg:w-auto lg:flex-1'>
        <dt className='text-base font-medium text-gray-500 dark:text-gray-400'>
          Status:
        </dt>
        <dd
          className={`me-2 mt-1.5 inline-flex items-center rounded ${getStatusStyle()} px-2.5 py-0.5 text-xs font-medium`}
        >
          <svg
            className='me-1 h-3 w-3'
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
              d='M5 11.917 9.724 16.5 19 7.5'
            />
          </svg>
          {status}
        </dd>
      </dl>

      <div className='grid w-full gap-4 sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end'>
        {status !== 'done' && (
          <button
            type='button'
            // onClick={onCancel}
            className='w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto'
          >
            Cancel order
          </button>
        )}
        {status === 'done' && (
          <button
            type='button'
            // onClick={onOrderAgain}
            className='w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto'
          >
            Order again
          </button>
        )}
        <a
          href='#'
          // onClick={onViewDetails}
          className='inline-flex w-full justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto'
        >
          View details
        </a>
      </div>
    </div>
  );
};

export default OrderItem;
