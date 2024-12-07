'use client';

import { useState } from 'react';

import ProductTable from '../components/ProductTable';
import ProductFormModal from './AddProductModal';

export default function AdminProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className='min-h-screen bg-gray-50 px-6 py-8 dark:bg-gray-800'>
      <div className='mx-auto max-w-7xl'>
        {/* Page Header */}
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-3xl font-semibold text-gray-900 dark:text-white'>
            Product Management
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Add New Product
          </button>
        </div>

        <ProductFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Table Section */}
        <div className='overflow-hidden rounded-lg bg-white shadow-md'>
          <div className='p-6'>
            <h2 className='mb-4 text-xl font-semibold text-gray-800 dark:text-white'>
              Product List
            </h2>
            <ProductTable />
          </div>
        </div>
      </div>
    </section>
  );
}
