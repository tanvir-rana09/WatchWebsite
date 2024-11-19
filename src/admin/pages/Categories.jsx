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
import Button from '../components/Buttons/Button.jsx';

const Categories = () => {
  const { callApi, loading } = useApi(`/category`, "GET");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fetchProducts = () => {
    callApi({
      page: currentPage,
      per_page: pageSize,
      name: search,
    })
      .then((result) => {
        setTotal(result?.total || 0);
        const transformedData = result?.data?.map((item, i) => ({
          key: `parent-${item.id}`, // Unique key for parent row
          id: item.id,
          name: item.name,
          create_at: item.create_at,
          date: item.formatted_created_at,
          children: item.subcategory
            ? item.subcategory.map((subcategory, subIndex) => ({
              key: `child-${subcategory.id}-${i}-${subIndex}`, // Unique key for each child
              id: subcategory.id,
              name: subcategory.name,
              create_at: subcategory.create_at,
              date: subcategory.formatted_created_at,

            }))
            : [],
        }));
        setData(transformedData);
      })
      .catch(() => {
        message.error("Failed to fetch categories. Please try again.");
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on search change
    fetchProducts();
  }, [search]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onExpand = (expanded, record) => {
    setExpandedRowKeys((prev) => {
      if (expanded) return [...prev, record.key];
      return prev.filter((key) => key !== record.key);
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      onOk: () => {
        // Call API to delete the category
        apiCall(`/category/delete/${id}`, "DELETE")
          .then(() => {
            message.success("Category deleted successfully.");
            fetchProducts(); // Refresh data
          })
          .catch(() => {
            message.error("Failed to delete category. Please try again.");
          });
      },
    });
  };

  const handleSearch = debounce((value) => setSearch(value), 300);

  const columns = categoryColumns.map((col) => {
    if (col.key == "actions") {
      return {
        ...col,
        render: (text, record) => (
          <div className="flex">
            <Button
              className="!p-2 text-lg !bg-transparent !text-blue"
              onClick={() => { setIsModalVisible(true); setCategory({ id: record.id, name: record.name, sub: false }) }}
            ><MdOutlineEdit size={20} /></Button>
            <Button
              className="!p-2 border-none !bg-transparent !text-red-500"
              onClick={() => handleDelete(record.id)}
            >
              <RiDeleteBin6Line size={20} />
            </Button>
          </div>
        ),
      };
    }
    return { ...col };
  });


  useEffect(() => {
    if (isModalVisible){
      return
    }else{
      setCategory({});
    }
  }, [isModalVisible])

  return (
    <div className="adminlayout">
      <div className="flex items-center justify-between">
        <SearchInput
          className="!py-3 hover:!border-blue"
          placeholder="Search category by name"
          onSearch={handleSearch}
        />
        <div className="flex justify-end gap-5 items-center">
          <Button
            className="!text-black border flex items-center gap-2 !bg-white hover:!bg-black duration-300 hover:!text-white"
            onClick={() => { setIsModalVisible(true); setCategory((prev) => ({ ...prev, sub: true })) }}
          >
            <IoMdAdd />Add sub category
          </Button>
          <Button
            className="!text-black border flex items-center gap-2 !bg-white hover:!bg-black duration-300 hover:!text-white"
            onClick={() => { setIsModalVisible(true); setCategory((prev) => ({ ...prev, sub: false })) }}
          >
            <IoMdAdd />Add main category
          </Button>
          <LinkButton
            className="!text-white border !bg-black hover:!bg-white duration-300 hover:!text-black"
            label="Add product"
            url="/admin/products/add"
            Icon={IoMdAdd}
          />
        </div>
      </div>
      <div className="categoriesTable">
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
              onExpand: onExpand,
              rowExpandable: (record) => record.children && record.children.length > 0,
            }}
          />
        )}
        <div className="pagination-container mt-5 pt-2">
          <AntdPagination
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
        <CategoryModal
          onClose={() => setIsModalVisible(false)}
          visible={isModalVisible}
          id={category}
        // onSubmit={handleAddCategory}
        />
      </div>
    </div>
  );
};

export default Categories;
