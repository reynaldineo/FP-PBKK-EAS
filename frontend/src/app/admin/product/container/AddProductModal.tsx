import { SubmitHandler, useForm } from 'react-hook-form';

import useAddProductMutation, {
  ProductRequest,
} from '../hooks/useAddProductMutation';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductRequest>({
    mode: 'onTouched',
  });

  const { mutate } = useAddProductMutation();

  const onSubmit: SubmitHandler<ProductRequest> = (data) => {
    mutate(data);

    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75'>
          <div className='relative max-h-full w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700'>
            <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Add New Product
              </h3>
              <button
                type='button'
                className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                onClick={onClose}
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
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 p-4 md:p-5'
            >
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

              <div className='mt-4 flex justify-between'>
                <button
                  type='submit'
                  className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Save Product
                </button>
                <button
                  type='button'
                  onClick={onClose}
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

export default ProductFormModal;
