import { useEffect, useRef, useState } from 'react';
import { Table, Select, Modal, Button, Typography, Checkbox, DatePicker, } from 'antd';
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
import { GrPowerReset } from 'react-icons/gr';

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
  const [status, setStatus] = useState({ payment_status: '', delivery_status: '' })
  const { control } = useForm()
  const [selectedValue, setSelectedValue] = useState({
    delivery_status: '',
    payment_status: '',
    start_date: '',
    end_date: '',
  });
  const selectRef = useRef(null);
  const { RangePicker } = DatePicker;

  const allOrders = () => {
    callApi(selectedValue).then((data) => {
      setOrders(data?.data)
      setTotal(data?.total)
    })
  }

  useEffect(() => {
    allOrders()
  }, [selectedValue])


  const handleStatusChange = (orderId, status, key) => {
    apiCall(`/order/admin/update/${orderId}`, "PUT", { [key]: status }).then((res) => {
      if (res.status == 200) {
        toast.success(key.replace('_', ' ') + ' updated uccessfully', { position: 'top-center' })
        setStatus((prev) => ({ ...prev, [key]: status }))
      }
    })
    setEditableStatus({ payment_status: false, delivery_status: false })
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current &&
        !selectRef.current.contains(event.target) &&
        !document.querySelector('.ant-select-dropdown')?.contains(event.target)) {
        setEditableStatus({ payment_status: false, delivery_status: false });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setEditableStatus]);

  const deleteHanlde = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Order?",
      onOk: async () => {
        try {
          const res = await apiCall(`/order/admin/delete/${id}`, 'DELETE');
          if (res?.status == 200) {
            toast.success('Order Deleted Successfully!', { position: 'top-center' });
            allOrders();
          }
        } catch {
          toast.error("Failed to delete category. Please try again.");
        }
      },
    });
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
        <div className='w-[8rem] xl:w-auto'>
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
        <div className='w-[8rem] xl:w-auto'>
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
        <div className='w-[8rem] xl:w-auto'>
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
          <div ref={selectRef}>
            <Select
              suffixIcon={<MdOutlineKeyboardArrowDown size={20} />}
              value={status.payment_status || record.payment_status}
              onChange={(value) => handleStatusChange(record.id, value, 'payment_status')}
              onBlur={() => setEditableStatus((prev) => ({ ...prev, payment_status: false }))}
              style={{ width: 120 }}
            >
              <Option value="successful">Successful</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </div> : <p
            style={{ width: 120 }}
            className={`border relative justify-center rounded flex items-center gap-2 w-fit text-xs py-[6.5px] px-3 uppercase tracking-wide ${{
              pending: 'bg-orange-50 border-orange-200 text-orange-500',
              successful: 'bg-green-50 border-green-200 text-green-500',
            }[status.payment_status || record.payment_status] || 'bg-gray-50 border-gray-200 text-gray-500'
              }`}
          >
            {status.payment_status || record.payment_status}
            <LuPencilLine onClick={() => setEditableStatus((prev) => ({ ...prev, payment_status: true }))} size={20} className='absolute -right-1.5 -top-2 bg-white text-gray-600 rounded-full p-1 border cursor-pointer' />
          </p>

      },
    },
    {
      title: 'Delivery Status',
      dataIndex: 'deliveryStatus',
      render: (_, record) => {
        return editableStatus.delivery_status ? (
          <div ref={selectRef}>
            <Select
              suffixIcon={<MdOutlineKeyboardArrowDown size={20} />}
              value={status.delivery_status || record.delivery_status}
              onChange={(value) => handleStatusChange(record.id, value, 'delivery_status')}
              style={{ width: 120 }}
            >
              <Option value="pending">Pending</Option>
              <Option value="confirmed">Confirmed</Option>
              <Option value="delivered">Delivered</Option>
              <Option value="canceled">Canceled</Option>
            </Select>
          </div>
        ) : (
          <p
            style={{ width: 120 }}
            onClick={() => setEditableStatus((prev) => ({ ...prev, delivery_status: true }))}
            className={`border justify-between rounded cursor-pointer flex items-center gap-2 w-fit text-xs py-[6.5px] px-3 uppercase tracking-wide ${{
              pending: 'bg-orange-50 border-orange-200 text-orange-500',
              confirmed: 'bg-green-50 border-green-200 text-green-500',
              canceled: 'bg-red-50 border-red-200 text-red-500',
            }[status.delivery_status || record.delivery_status] || 'bg-gray-50 border-gray-200 text-gray-500'
              }`}
          >

            {status.delivery_status || record.delivery_status}
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
          <RiDeleteBin6Line onClick={() => deleteHanlde(record.id)} className='text-red-500 cursor-pointer' size={20} />
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


  const handleChange = (value, name) => {
    setSelectedValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleDateChange = (dates, dateStrings) => {
    setSelectedValue((prevState) => ({
      ...prevState,
      start_date: dateStrings[0],
      end_date: dateStrings[1],
    }));
  }

  console.log(selectedValue);


  return (
    <div className='adminlayout'>
      <div className='flex justify-end items-center mb-8 mt-3 flex-wrap'>
        {/* <SearchInput className='!py-3 hover:!border-blue' placeholder='Search product by name' onSearch={setSearch} /> */}
        <div className='flex items-center gap-5 flex-wrap'>
          {/* {(selectedValue.delivery_status || selectedValue.payment_status || selectedValue.start_date || selectedValue.end_date) && <Button onClick={() => setSelectedValue({})} variant='danger' className='rounded'><GrPowerReset />
            </Button>} */}
          <div className='flex items-center gap-5 -mt-2 flex-wrap'>
            <RangePicker onChange={handleDateChange} className='rounded py-[11px] mt-2' />
            <AntSelect
              control={control}
              name={'payment_status'}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: "successful", label: "Successful" },
              ]}
              placeholder="Select payment status"
              width={250}
              showSearch={false}
              onChange={(value) => handleChange(value, 'payment_status')}
            />
            <AntSelect
              control={control}
              name={'delivery_status'}
              showSearch={false}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'confirmed', label: "Confirmed" },
                { value: 'delivired', label: 'Delivired' },
                { value: 'cancel', label: "Canceled" },
              ]}
              placeholder="Select delivery status"
              width={250}
              onChange={(value) => handleChange(value, 'delivery_status')}
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
