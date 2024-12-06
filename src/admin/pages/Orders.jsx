import { useEffect, useState } from 'react';
import { Table, Select, Modal, Button, Typography, Tag } from 'antd';
import useApi from '../../utils/useApi';
import TableSkeleton from '../components/Loading/TableSkeleton';
import AntdPagination from '../components/antd/Pagination';
import apiCall from '../../utils/apiCall';
import { toast } from 'react-toastify';
import { FaRegEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { LuPencilLine } from "react-icons/lu";
import AntSelect from '../components/antd/Select';
import { useForm } from 'react-hook-form';
import SearchInput from '../components/Inputs/Search';

const { Option } = Select;
const { Text } = Typography;

const AdminOrders = () => {
  const { callApi, loading } = useApi(`/order/admin/all-orders`, "GET");
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState([])
  const [editableStatus, setEditableStatus] = useState({ payment_status: false, delivery_status: false })
  const { control } = useForm()

  const allOrders = () => {
    callApi({
      page: currentPage,
      per_page: pageSize
    }).then((data) => {
      setOrders(data?.data)
      setTotal(data?.total)
      setEditableStatus({ payment_status: false, delivery_status: false })
    })
  }

  useEffect(() => {
    allOrders()
  }, [])


  const handleStatusChange = (orderId, status, key) => {
    apiCall(`/order/admin/update/${orderId}`, "PUT", { [key]: status }).then((res) => {
      if (res.status == 200) {
        toast.success(key.replace('_', ' ') + 'updated successfully', { position: 'top-center' })
        allOrders();
      }
    })
  };


  // Handle View Products Modal
  const handleViewProducts = async (order) => {
    const data = await apiCall(`/order/order-items/${order.id}`)
    if (data.status == 200) {
      setProducts(
        data.data.map((item, index) => ({
          id: index + 1, // Prefer item's unique ID if available
          banner: item?.product?.banner || "No Image", // Fallback for missing data
          name: item?.product?.name || "Unnamed Product",
          quantity: item?.quantity || 0,
          price: item?.price || 0,
          subtotal: (item?.quantity || 0) * (item?.price || 0), // Handle missing values
          coupon_code: order.coupon_code,
          order_notes: order.order_notes
        }))
      );
    }
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Table Columns
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Order Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => (<Text> {record.created_at} </Text>)
    },
    {
      title: 'Customer Info',
      dataIndex: 'customerInfo',

      render: (_, record) => (
        <div>
          <Text strong>{record.shipping_address.name}</Text> <br />
          <Text> {record.shipping_address.email} </Text><br />
          <Text> {record.shipping_address.phone} </Text><br />
          <Text> {record.shipping_address.address}, {record.shipping_address.city}, {record.shipping_address.postal_code}</Text>
        </div>
      ),
    },
    {
      title: 'Amount Info',
      dataIndex: 'amountInfo',

      render: (_, record) => (
        <div className='w-[8rem] lg:w-auto'>
          <Text>Subtotal: {record.subtotal}</Text> <br />
          <Text>Discount: {record.discount_amount}</Text> <br />
          <Text>Shipping Cost: {record.shipping_cost}</Text> <br />
          <Text>Total: {record.total_price}</Text>
        </div>
      ),
    },
    {
      title: 'Payment Info',
      dataIndex: 'paymentInfo',

      render: (_, record) => (
        <div className='w-[8rem] lg:w-auto'>
          <Text>Method: {record.payment_method}</Text> <br />
          <Text>Trx ID: {record.trx_id || 'N/A'}</Text> <br />
          <Text>Coupon: <span className='border rounded-sm bg-gray-50 p-0.5 px-1.5 uppercase text-xs tracking-wide'>{record.coupon_code}</span></Text>
        </div>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      render: (_, record) => {
        return editableStatus.payment_status ?
          <Select
            suffixIcon={<MdOutlineKeyboardArrowDown size={20} />}
            value={record.payment_status}
            onChange={(value) => handleStatusChange(record.id, value, 'payment_status')}
            style={{ width: 120 }}
          >
            <Option value="successful">Successful</Option>
            <Option value="pending">Pending</Option>
          </Select> : <p style={{ width: 120 }} onClick={() => setEditableStatus((prev) => ({ ...prev, payment_status: true }))} className={`border justify-between rounded cursor-pointer flex items-center gap-2 w-fit text-xs py-[6.5px] px-3 uppercase  tracking-wide ${record.payment_status == 'pending' ? 'bg-orange-50 border-orange-200 text-orange-500' : 'bg-green-50 border-green-200 text-green-500'} `}>
            {record.payment_status}
            <LuPencilLine />
          </p>

      },
    },
    {
      title: 'Delivery Status',
      dataIndex: 'deliveryStatus',
      render: (_, record) => {
        return editableStatus.delivery_status ? (
          <Select

            suffixIcon={<MdOutlineKeyboardArrowDown size={20} />}
            value={record.delivery_status}
            onChange={(value) => handleStatusChange(record.id, value, 'delivery_status')}
            style={{ width: 120 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="canceled">Canceled</Option>
          </Select>
        ) : (
          <p
            style={{ width: 120 }}
            onClick={() => setEditableStatus((prev) => ({ ...prev, delivery_status: true }))}
            className={`border justify-between rounded cursor-pointer flex items-center gap-2 w-fit text-xs py-[6.5px] px-3 uppercase tracking-wide ${record.delivery_status == 'pending'
                ? 'bg-orange-50 border-orange-200 text-orange-500'
                : record.delivery_status == 'confirmed'
                  ? 'bg-green-50 border-green-200 text-green-500'
                  : record.delivery_status == 'canceled'
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
              }`}
          >
            {record.delivery_status}
            <LuPencilLine />
          </p>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '5%',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <FaRegEye className='text-blue cursor-pointer' onClick={() => handleViewProducts(record)} size={20} />
          <RiDeleteBin6Line className='text-red-500 cursor-pointer' size={20} />
        </div>
      ),
    },
  ];

  const productColumns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'banner',
      key: 'banner',
      render: (_, record) => <img src={record.banner} className="object-cover rounded" alt="product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price',

    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
  ];

  return (
    <div className='adminlayout'>
       <div className='flex justify-between items-center mb-8 mt-3 flex-wrap'>
        <SearchInput className='!py-3 hover:!border-blue' placeholder='Search product by name' onSearch={setSearch} />
        <div className='flex items-center gap-5 flex-wrap'>
          {(selectedValue.category_id || selectedValue.status || selectedValue.sort_by) && <Button onClick={() => setSelectedValue({})} variant='danger' className='!py-[9px] flex items-center gap-2'><GrPowerReset />
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
      {
        loading ? <TableSkeleton /> :

          <Table
            columns={columns}
            scroll={{ x: true }}
            pagination={false}
            dataSource={orders}
            rowKey="id"
          />
      }

      <Modal
        width={1000}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        <p className='text-base flex items-center text-gray-400 gap-2 mb-5'><IoMdInformationCircleOutline size={20} />
          Order notes: <span >{products[0]?.order_notes}</span></p>

        {products ? (
          <Table
            columns={productColumns}
            dataSource={products}
            rowKey="product_id"
            scroll={{ x: true }}
            pagination={false}
          />
        ) : (
          <TableSkeleton />
        )}
        <p className='text-gray-400'>Total items: {products?.length}</p>
      </Modal>
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
  );
};

export default AdminOrders;
