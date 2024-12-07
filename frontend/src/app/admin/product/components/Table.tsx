'use client';

import { FC } from 'react';

import Pagination from './Pagination';
import { IProductTable } from './ProductTable';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface TableProps {
  data: IProductTable[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Table: FC<TableProps> = ({
  data,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right'>
        <TableHeader />
        <tbody>
          {data.map((item, index) => (
            <TableRow
              key={item.id}
              item={item}
              index={indexOfFirstItem + index + 1}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;
