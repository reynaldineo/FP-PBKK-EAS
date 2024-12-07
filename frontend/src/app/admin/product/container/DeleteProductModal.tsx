import React, { useState } from 'react';

import useDeleteProductMutation from '../hooks/useDeleteProductMutation';

interface DeleteProductModalProps {
  id: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    closeModal();
  };

  const { mutate } = useDeleteProductMutation();

  const handleDelete = () => {
    mutate(id);

    closeModal();
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        onClick={openModal}
        className='block rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
      >
        <svg
          className='h-6 w-6 text-gray-50'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
          />
        </svg>
      </button>

      {/* Modal Overlay and Content */}
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50'
          aria-hidden='true'
        >
          <div className='relative max-h-full w-full max-w-lg rounded-lg bg-white p-4 shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between border-b p-4 dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Confirm Deletion
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

            <div className='space-y-4 p-4'>
              <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
            </div>

            <div className='flex items-center rounded-b border-t p-4 dark:border-gray-600'>
              <button
                onClick={handleDelete}
                className='rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancel}
                className='ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProductModal;
