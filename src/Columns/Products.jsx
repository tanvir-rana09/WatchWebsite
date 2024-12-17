import { Tag } from "antd";

const columns = [
	{
		title: '#',
		dataIndex: 'key',
		key: 'key',
		width: '4%',
	},
	{
		title: 'Banner',
		dataIndex: 'banner',
		key: 'banner',
		render: (text, record) => <div className="min-w-14"><img src={record?.banner} className="object-cover rounded" alt="product" style={{ width: 60, height: 60 }} /></div>,
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (_, record) => <p className="w-44">{record.name}</p>,
	},
	{
		title: 'Category',
		dataIndex: 'category',
		key: 'category',
		render: (_, record) => <p className="w-44">{record.category}</p>,
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
		render: (_, record) => <p className="w-10">{record.price}</p>,
	},
	{
		title: 'Stock',
		dataIndex: 'stock',
		key: 'stock',
		render: (_, record) => <p className="w-10">{record.stock}</p>,
	},
	{
		title: 'Sells',
		dataIndex: 'sells',
		key: 'sells',
		render: (_, record) => <p className="w-10">{record.sells}</p>,
	},
	{
		title: 'Sizes',
		dataIndex: 'size',
		key: 'size',
		width:'20%',
		render: (_, { size }) => {
			return (
				<ul className="flex flex-wrap gap-1 w-56">
					{size?.length>0 ? size?.map((size, i) => (
						<li className='border rounded-sm bg-gray-50 p-0.5 px-1.5 uppercase text-sm tracking-wide' key={i}>
							{size}
						</li>
					)): <li>-/-</li> }
				</ul>
			);
		}
	},
	{
		title: 'More info',
		dataIndex: 'more_info',
		key: 'more_info',
		width:'500',
		render: (_, { discount, sku, gender }) => {
			return (
				<ul>
					<li>Discount: {discount}%</li>
					<li >SKU: {sku}</li>
					<li >Gender: {gender}</li>
				</ul>
			);
		}
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (_, { status }) => {
			let color = status == 1 ? 'green' : 'volcano';
			return (
				<Tag className="uppercase " color={color} key={status}>
					{status == 1 ? 'Published' : 'Hidden'}
				</Tag>
			);
		}

		,
	},
	{
		title: 'Actions',
		key: 'actions',
		width: '10%',
	},
];

export default columns;