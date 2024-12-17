import useApi from "../../utils/useApi";
import TableSkeleton from "../components/Loading/TableSkeleton";
import categoryColumns from "../../Columns/Category";
import AntdPagination from "../components/antd/Pagination";
import { useEffect, useState } from "react";
import SearchInput from "../components/Inputs/Search";
import { Table, Modal, message } from "antd";
import LinkButton from "../components/Buttons/LinkButton";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import debounce from "lodash/debounce";
import apiCall from "../../utils/apiCall";
import CategoryModal from "../components/modal/CategoryModal";
import Button from "../components/Buttons/Button.jsx";

const Categories = () => {
  const { callApi, loading } = useApi(`/category`, "GET");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const result = await callApi({
        page: currentPage,
        per_page: pageSize,
        name: search,
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
  }, [currentPage, pageSize, search]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      onOk: async () => {
        try {
          await apiCall(`/category/delete/${id}`, "DELETE");
          message.success("Category deleted successfully.");
          fetchProducts();
        } catch {
          message.error("Failed to delete category. Please try again.");
        }
      },
    });
  };

  const columns = categoryColumns.map((col) => ({
    ...col,
    render: col.key === "actions" ? (text, record) => (
      <div className="flex">
        <Button
          className="!p-2 text-lg !bg-transparent !text-blue"
          onClick={() =>
            setIsModalVisible(true) || setCategory({ id: record.id, name: record.name, sub: false })
          }
        >
          <MdOutlineEdit size={20} />
        </Button>
        <Button
          className="!p-2 border-none !bg-transparent !text-red-500"
          onClick={() => handleDelete(record.id)}
        >
          <RiDeleteBin6Line size={20} />
        </Button>
      </div>
    ) : col.render,
  }));

  return (
    <div className="adminlayout">
      <div className="flex items-center justify-between">
        <SearchInput
          className="!py-3 hover:!border-blue"
          placeholder="Search category by name"
          onSearch={debounce(setSearch, 300)}
        />
        <div className="flex justify-end gap-5 items-center">
          {["Add sub category", "Add main category"].map((label, index) => (
            <Button
              key={label}
              className="!text-black border flex items-center gap-2 !bg-white hover:!bg-black duration-300 hover:!text-white"
              onClick={() =>
                setIsModalVisible(true) || setCategory({ sub: index === 0 })
              }
            >
              <IoMdAdd /> {label}
            </Button>
          ))}
          <LinkButton
            className="!text-white border !bg-black hover:!bg-white duration-300 hover:!text-black"
            label="Add product"
            url="/admin/products/add"
            Icon={IoMdAdd}
          />
        </div>
      </div>
      <div className="categoriesTable mt-5">
        {loading ? (
          <TableSkeleton />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: true }}
            pagination={false}
            expandable={{
              expandedRowKeys,
              onExpand: (expanded, record) => {
                setExpandedRowKeys((prev) =>
                  expanded ? [...prev, record.key] : prev.filter((key) => key !== record.key)
                );
              },
              rowExpandable: (record) => record.children?.length > 0,
            }}
            rowKey="key"
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
        {isModalVisible && (
          <CategoryModal
            data={data}
            recall={fetchProducts}
            onClose={() => setIsModalVisible(false)}
            visible={isModalVisible}
            id={category}
          />
        )}
      </div>
    </div>
  );
};

export default Categories;
