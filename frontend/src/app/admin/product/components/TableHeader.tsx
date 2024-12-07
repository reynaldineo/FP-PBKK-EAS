const TableHeader: React.FC = () => {
  return (
    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        <th scope='col' className='px-6 py-3'>
          No
        </th>
        <th scope='col' className='px-6 py-3'>
          Product name
        </th>
        <th scope='col' className='px-6 py-3'>
          Color
        </th>
        <th scope='col' className='px-6 py-3'>
          Category
        </th>
        <th scope='col' className='px-6 py-3'>
          Price
        </th>
        <th scope='col' className='px-6 py-3'>
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
