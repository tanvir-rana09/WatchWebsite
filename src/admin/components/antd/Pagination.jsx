import { Pagination } from 'antd';
import { IoIosArrowDown } from 'react-icons/io';

const AntdPagination = ({
  total,
  current,
  pageSize,
  pageSizeOptions = ['10', '20', '50', '100'],
  onPageChange,
}) => {
  // Handle page change
  const handlePageChange = (page, pageSize) => {
    if (onPageChange) {
      onPageChange(page, pageSize);
    }
  };
 
  return (
    <Pagination
      align='center'
      current={current}  // Synchronize with AdminProducts component
      pageSize={pageSize}
      total={total}
      showSizeChanger
      pageSizeOptions={pageSizeOptions}
      onChange={handlePageChange}
      onShowSizeChange={handlePageChange}
      style={{ marginTop: 20, textAlign: 'center' }}
      itemRender={(page, type, originalElement) => {
        if (type === 'prev') {
          return <IoIosArrowDown className='rotate-90 text-gray-500 hover:bg-gray-100 rounded-md p-2 ' style={{ fontSize: '35px' }} />;
        } else if (type === 'next') {
          return <IoIosArrowDown className='-rotate-90 text-gray-500 hover:bg-gray-100 rounded-md p-2' style={{ fontSize: '35px' }} />;

        }
        return originalElement;
      }}
    />
  );
};

export default AntdPagination;
