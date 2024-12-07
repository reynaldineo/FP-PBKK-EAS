import DeleteProductModal from '../container/DeleteProductModal';
import EditProductModal from '../container/EditProductModal';
import { IProductTable } from './ProductTable';

interface TableRowProps {
  item: IProductTable;
  index: number;
}

const TableRow: React.FC<TableRowProps> = ({ item, index }) => {
  return (
    <tr className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
      <td
        scope='row'
        className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
      >
        {index}
      </td>
      <th
        scope='row'
        className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
      >
        {item.name}
      </th>
      <td className='px-6 py-4'>{item.description}</td>
      <td className='px-6 py-4'>{item.category}</td>
      <td className='px-6 py-4'>${item.price}</td>
      <td className='px-6 py-4 text-center'>
        <div className='flex justify-center gap-2'>
          <EditProductModal id={item.id} existingProduct={item} />
          <DeleteProductModal id={item.id} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
