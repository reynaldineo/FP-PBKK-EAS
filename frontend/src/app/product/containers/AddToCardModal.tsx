import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useAddCartMutation, { CartRequest } from '../hooks/useAddCartMutation';

interface CartForm {
  quantity: number;
}
interface CartFormModalProps {
  productId: string;
}

const CartFormModal: React.FC<CartFormModalProps> = ({ productId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CartForm>({
    mode: 'onTouched',
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { mutate } = useAddCartMutation();

  // Handle form submission
  const onSubmit: SubmitHandler<CartForm> = (data) => {
    const cartPayload: CartRequest[] = [
      {
        product_id: productId,
        quantity: data.quantity,
      },
    ];

    mutate(cartPayload);

    closeModal();
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={openModal}
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

      {/* Modal Overlay and Content */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50'>
          <div className='relative max-h-full w-full max-w-lg rounded-lg bg-white p-4 shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between border-b p-4 dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Enter Quantity
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

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 p-4'>
              {/* Quantity Input */}
              <div className='flex flex-col'>
                <label
                  htmlFor='quantity'
                  className='text-gray-700 dark:text-gray-300'
                >
                  Quantity
                </label>
                <input
                  type='number'
                  id='quantity'
                  {...register('quantity', {
                    required: 'Quantity is required',
                    min: {
                      value: 1,
                      message: 'Quantity must be at least 1',
                    },
                    valueAsNumber: true,
                  })}
                  className='mt-1 rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                  placeholder='Enter quantity'
                />
                {errors.quantity && (
                  <p className='text-xs text-red-500'>
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Modal Actions */}
              <div className='mt-4 flex justify-between'>
                <button
                  type='submit'
                  className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Add to Cart
                </button>
                <button
                  type='button'
                  onClick={closeModal}
                  className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:outline-none'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CartFormModal;
