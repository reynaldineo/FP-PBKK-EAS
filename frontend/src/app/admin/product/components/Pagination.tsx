import * as React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className='flex flex-col items-center justify-between pt-4 md:flex-row'
      aria-label='Pagination navigation'
    >
      <span className='mb-4 block w-full text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto'>
        Showing{' '}
        <span className='font-semibold text-gray-900'>
          {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{' '}
        of <span className='font-semibold text-gray-900'>{totalItems}</span>
      </span>
      <ul className='inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse'>
        {/* Previous Button */}
        <li>
          <button
            type='button'
            className='flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label='Previous Page'
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <button
              type='button'
              className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === index + 1 ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onClick={() => handlePageChange(index + 1)}
              aria-label={`Go to page ${index + 1}`}
            >
              {index + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            type='button'
            className='flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label='Next Page'
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
