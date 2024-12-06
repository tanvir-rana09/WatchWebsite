const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (total) => `$${total.toFixed(2)}`,
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (orderStatus, record) => (
        <Select
          defaultValue={orderStatus}
          onChange={(value) => handleStatusChange(value, record.key, 'orderStatus')}
          style={{ width: 120 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Canceled">Canceled</Option>
        </Select>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (paymentStatus, record) => (
        <Select
          defaultValue={paymentStatus}
          onChange={(value) => handleStatusChange(value, record.key, 'paymentStatus')}
          style={{ width: 120 }}
        >
          <Option value="Paid">Paid</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Failed">Failed</Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <a>View</a>
          <a>Cancel</a>
        </Space>
      ),
    },
  ];
