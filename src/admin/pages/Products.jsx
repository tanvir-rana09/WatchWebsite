import { useEffect, useState } from 'react';
import LinkButton from '../components/Buttons/LinkButton';
import { IoMdAdd } from 'react-icons/io';
import AntdTable from '../components/antd/Table';
import useApi from '../../utils/useApi';
import columns from '../../Columns/Products.jsx';
import AntdPagination from '../components/antd/Pagination.jsx';
import TableSkeleton from '../components/Loading/TableSkeleton.jsx';
import SearchInput from '../components/Inputs/Search.jsx';
import AntSelect from '../components/antd/Select.jsx';
import apiCall from '../../utils/apiCall.js';
import { useForm } from 'react-hook-form';
import Button from '../components/Buttons/Button.jsx';
import { GrPowerReset } from 'react-icons/gr';


const AdminProducts = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState([]);
  const { callApi, loading } = useApi(`/product`, 'GET');
  const [selectedValue, setSelectedValue] = useState({
    status: '',
    sort_by: '',
    category_id: ''
  });
  const { control } = useForm()
  const fetchProducts = () => {
    callApi({
      page: currentPage,
      per_page: pageSize,
      name: search,
      sort_by: selectedValue.sort_by,
      category_id: selectedValue.category_id,
      status: selectedValue.status,
    }).then((result) => {
      setTotal(result?.total || 0);
      const transformedData = result?.data?.map((item,i) => ({
        id: (currentPage - 1) * pageSize + i + 1,
        banner: item.banner,
        name: item.name,
        category: item.category?.name || 'N/A',
        price: item.price,
        stock: item.stock,
        sells: item.sells,
        rating: item.rating,
        status: item.status,
      }));
      setData(transformedData);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize, search, selectedValue]);

  useEffect(() => {
    apiCall('/category', "get").then((data) => {
      if (data) {
        const apiCategory = data?.data?.map((category) => ({
          value: category?.id, label: category?.name
        }));
        setCategory(apiCategory || []);
      }
    });
  }, []);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleChange = (value, name) => {
    setSelectedValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(selectedValue);

  return (
    <div className='adminlayout'>
      <div className='flex justify-end gap-5 items-center'>
        <LinkButton className='!text-black border !bg-white hover:!bg-black duration-300 hover:!text-white' label='Add category' url='category/add' Icon={IoMdAdd} />
        <LinkButton className='!text-white border !bg-black hover:!bg-white duration-300 hover:!text-black' label='Add product' url='add' Icon={IoMdAdd} />
      </div>
      <div className='flex justify-between items-center mb-8 mt-3 flex-wrap'>
        <SearchInput className='!py-3 hover:!border-blue' placeholder='Search product by name' onSearch={setSearch} />
        <div className='flex items-center gap-5 flex-wrap'>
          {(selectedValue.category_id ||selectedValue.status ||selectedValue.sort_by ) && <Button onClick={()=>setSelectedValue({})} variant='danger' className='!py-[9px] flex items-center gap-2'><GrPowerReset />
            Reset</Button>}
          <div className='flex items-center gap-5 -mt-2 flex-wrap'>
            <AntSelect
              control={control}
              name={'category_id'}
              options={category}
              placeholder="Search to Select category"
              width={250}
              onChange={(value) => handleChange(value, 'category_id')}
            />
            <AntSelect
              control={control}
              name={'status'}
              options={[
                { value: 1, label: 'Publish' },
                { value: 0, label: "Hidden" },
              ]}
              placeholder="Search to Select status"
              width={250}
              showSearch={false}
              onChange={(value) => handleChange(value, 'status')}
            />
            <AntSelect
              control={control}
              name={'sort_by'}
              showSearch={false}
              options={[
                { value: 'price_asc', label: 'Price low to high' },
                { value: 'price_desc', label: "Price high to low" },
                { value: 'latest', label: 'Oldest product on top' },
                { value: 'rating', label: "Top rated product" },
              ]}
              placeholder="Sort by"
              width={200}
              onChange={(value) => handleChange(value, 'sort_by')}
            />
          </div>
        </div>
      </div>
      <div>
        {
          loading ? <TableSkeleton /> :
            <AntdTable
              data={data}
              columns={columns}
              loading={loading}
            />
        }
      </div>
      <div className='pagination-container mt-5 pt-2'>
        <AntdPagination
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />

      </div>
    </div>
  );
};

export default AdminProducts;
