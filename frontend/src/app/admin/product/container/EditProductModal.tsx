import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useEditProductMutation from '../hooks/useEditProductMutation';

interface EditProductModalProps {
  id: string;
  existingProduct: {
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    category: string;
    image_url: string;
  };
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  id,
  existingProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: existingProduct,
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { mutate } = useEditProductMutation();

  const onSubmit: SubmitHandler<typeof existingProduct> = (data) => {
    mutate({ productId: id, data });

    closeModal();
  };

  // Effect to reset the form if existingProduct changes
  useEffect(() => {
    setValue('name', existingProduct.name);
    setValue('description', existingProduct.description);
    setValue('price', existingProduct.price);
    setValue('stock_quantity', existingProduct.stock_quantity);
    setValue('category', existingProduct.category);
    setValue('image_url', existingProduct.image_url);
  }, [existingProduct, setValue]);

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        onClick={openModal}
        className='block rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
            d='m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z'
          />
        </svg>
      </button>

      {/* Modal Overlay and Content */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50'>
          <div className='relative max-h-full w-full max-w-lg rounded-lg bg-white p-4 shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between border-b p-4 dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Edit Product
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
              {/* Product Name */}
              <div className='flex flex-col'>
                <label
                  htmlFor='name'
                  className='text-gray-700 dark:text-gray-300'
                >
                  Product Name
                </label>
                <input
                  type='text'
                  id='name'
                  {...register('name', {
                    required: 'Product name is required',
                  })}
                  className='mt-1 rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                  placeholder='Enter product name'
                />
                {errors.name && (
                  <p className='text-xs text-red-500'>{errors.name.message}</p>
                )}
              </div>

              {/* Product Description */}
              <div className='flex flex-col'>
                <label
                  htmlFor='description'
                  className='text-gray-700 dark:text-gray-300'
                >
                  Product Description
                </label>
                <textarea
                  id='description'
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  rows={4}
                  className='mt-1 rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                  placeholder='Enter product description'
                />
                {errors.description && (
                  <p className='text-xs text-red-500'>
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Product Image URL */}
              <div className='flex flex-col'>
                <label
                  htmlFor='image_url'
                  className='text-gray-700 dark:text-gray-300'
                >
                  Product Image URL
                </label>
                <input
                  type='text'
                  id='image_url'
                  {...register('image_url', {
                    required: 'Image URL is required',
                  })}
                  className='mt-1 rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                  placeholder='Enter product image URL'
                />
                {errors.image_url && (
                  <p className='text-xs text-red-500'>
                    {errors.image_url.message}
                  </p>
                )}
              </div>

              {/* Product Price */}
              <div className='flex flex-col'>
                <label
                  htmlFor='price'
                  className='text-gray-700 dark:text-gray-300'
                >
                  Product Price
                </label>
                <input
                  type='number'
                  id='price'
                  {...register('price', {
                    required: 'Price is required',
                    valueAsNumber: true,
                  })}
                  className='mt-1 rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                  placeholder='Enter product price'
                />
                {errors.price && (
                  <p className='text-xs text-red-500'>{errors.price.message}</p>
                )}
              </div>

              {/* Product Stock Quantity */}
              <div className='flex flex-col'>
                <label
                  htmlFor='stock_quantity'
                  className='text-gray-700 dark:text-gray-300'
                >
                  Stock Quantity
                </label>
                <input
                  type='number'
                  id='stock_quantity'
                  {...register('stock_quantity', {
                    required: 'Stock quantity is required',
                    valueAsNumber: true,
                  })}
                  className='mt-1 rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                  placeholder='Enter stock quantity'
                />
                {errors.stock_quantity && (
                  <p className='text-xs text-red-500'>
                    {errors.stock_quantity.message}
                  </p>
                )}
              </div>

              {/* Product Category */}
              <div className='flex flex-col'>
                <label
                  htmlFor='category'
                  className='text-gray-700 dark:text-gray-300'
                >
                  Product Category
                </label>
                <input
                  type='text'
                  id='category'
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  className='mt-1 rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                  placeholder='Enter product category'
                />
                {errors.category && (
                  <p className='text-xs text-red-500'>
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Modal Actions */}
              <div className='mt-4 flex justify-between'>
                <button
                  type='submit'
                  className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Save Changes
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

export default EditProductModal;
