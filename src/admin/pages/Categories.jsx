import useApi from "../../utils/useApi";
import TableSkeleton from "../components/Loading/TableSkeleton";
import AntdTable from "../components/antd/Table";
import columns from "../../Columns/Category";
import AntdPagination from "../components/antd/Pagination";
import { useEffect, useState } from "react";
import SearchInput from "../components/Inputs/Search";

const Categories = () => {
  const { callApi, loading } = useApi(`/category`, 'GET');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const fetchProducts = () => {
    callApi({
      page: currentPage,
      per_page: pageSize,
      name: search,

    }).then((result) => {
      setTotal(result?.total || 0);
      const transformedData = result?.data?.map((item, i) => ({
        key: (currentPage - 1) * pageSize + i + 1,
        id: item.id,
        name: item.name,
        create_at: item.create_at,
        date: item.formatted_created_at
      }));
      setData(transformedData);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize, search]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="adminlayout">
      <div>
        <SearchInput className='!py-3 hover:!border-blue' placeholder='Search product by name' onSearch={setSearch} />
      </div>
      <div>
        {
          loading ? <TableSkeleton /> :
            <AntdTable
              data={data}
              columns={columns}
              loading={loading}
              method={'delete'}
              endpoint={'/product/delete'}
            // reCall={fetchProducts}
            />
        }
        <div className='pagination-container mt-5 pt-2'>
          <AntdPagination
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Categories