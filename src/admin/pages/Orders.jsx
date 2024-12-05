import { message } from "antd";
import useApi from "../../utils/useApi";
import { useEffect, useState } from "react";
import TableSkeleton from "../components/Loading/TableSkeleton";
import AntdPagination from "../components/antd/Pagination";
import AntdTable from "../components/antd/Table";

const Orders = () => {
  const { callApi, loading } = useApi(`/category`, "GET");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchProducts = async () => {
    try {
      const result = await callApi({
        page: currentPage,
        per_page: pageSize,
      });
      setTotal(result?.total || 0);
      setData(
        result?.data?.map((item, i) => ({
          key: `parent-${item.id}`,
          id: item.id,
          name: item.name,
          create_at: item.create_at,
          date: item.formatted_created_at,
          children: item.subcategory?.map((subcategory, subIndex) => ({
            key: `child-${subcategory.id}-${i}-${subIndex}`,
            id: subcategory.id,
            name: subcategory.name,
            create_at: subcategory.create_at,
            date: subcategory.formatted_created_at,
          })) || [],
        }))
      );
    } catch {
      message.error("Failed to fetch categories. Please try again.");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize]);
  return (
    <div className="adminlayout">
      <div className="categoriesTable mt-5">
        {loading ? (
          <TableSkeleton />
        ) : (
          <AntdTable
              data={data}
              columns={columns}
              loading={loading}
              method={'delete'}
              endpoint={'/product/delete'}
              reCall={fetchProducts}
            />
        )}
        <div className="pagination-container mt-5 pt-2">
          <AntdPagination
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={(page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Orders