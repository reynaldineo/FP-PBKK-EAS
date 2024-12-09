import React, { useState } from 'react';

import useAddToOrderMutation from '../hooks/useAddToOrderMutation';

interface AddToOrderModalProps {
  cartId: string;
}

const AddToOrderModal: React.FC<AddToOrderModalProps> = ({ cartId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { mutate } = useAddToOrderMutation();

  const onSubmit = () => {
    mutate({ cart_id: cartId });

    closeModal();
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className='mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0'
        title='Add to order'
      >
        Proceed to Checkout
      </button>

      {/* Modal Overlay and Content */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50'>
          <div className='relative w-full max-w-lg rounded-lg bg-white p-4 shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between border-b p-4 dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Confirm Add to Order
              </h3>
              <button
                onClick={closeModal}
                className='inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                <svg
                  className='h-3 w-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            <div className='p-4'>
              <div className='text-center'>
                <h4 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Are you sure you want to add the following item to your order?
                </h4>
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'></p>
              </div>

              {/* Modal Actions */}
              <div className='mt-4 flex justify-between'>
                <button
                  onClick={onSubmit}
                  className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Confirm
                </button>
                <button
                  type='button'
                  onClick={closeModal}
                  className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:outline-none'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToOrderModal;
