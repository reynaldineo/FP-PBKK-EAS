'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import Pagination from '@/app/admin/product/components/Pagination';
import { IProductTable } from '@/app/admin/product/components/ProductTable';
import useGetAllProductQuery from '@/app/admin/product/hooks/useGetAllProductQuery';

const itemsPerPage = 8;

const ProductList = () => {
  const { data } = useGetAllProductQuery();
  const products = useMemo(() => data?.data || [], [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<IProductTable[]>([]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentData(products.slice(startIdx, endIdx));
  }, [currentPage, products]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>

        {currentData.length > 0 ? (
          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {currentData.map((product) => (
              <Link key={product.id} href={product.id}>
                <div className='group'>
                  <Image
                    alt={product.name}
                    src={product.image_url}
                    width={500}
                    height={500}
                    className='aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]'
                  />
                  <h3 className='mt-4 text-sm text-gray-700'>{product.name}</h3>
                  <p className='mt-1 text-lg font-medium text-gray-900'>
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='col-span-full py-16 text-center'>
            <div className='inline-block rounded-lg bg-gray-100 p-8 shadow-md'>
              <p className='text-lg font-semibold text-gray-600'>
                No products available at the moment.
              </p>
              <p className='mt-2 text-sm text-gray-500'>
                We&apos;re working on adding more items. Please check back
                later!
              </p>
            </div>
          </div>
        )}

        <div className='mt-5'>
          <Pagination
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
