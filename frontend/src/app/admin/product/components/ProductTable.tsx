'use client';

import { useEffect, useMemo, useState } from 'react';

import Table from '../components/Table';
import useGetAllProductQuery from '../hooks/useGetAllProductQuery';

export interface IProductTable {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  image_url: string;
}

const itemsPerPage = 10;

const ProductTable: React.FC = () => {
  const { data } = useGetAllProductQuery();

  const allData = useMemo(() => data?.data || [], [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<IProductTable[]>([]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentData(allData.slice(startIdx, endIdx));
  }, [currentPage, allData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='container mx-auto p-6'>
      <Table
        data={currentData}
        totalItems={allData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductTable;
