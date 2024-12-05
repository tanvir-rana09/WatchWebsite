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
		render: (text, record) => <img src={record.banner} className="object-cover rounded" alt="product" style={{ width: 50, height: 50 }} />,
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		width: '20%',
		searchable: true,
	},
	{
		title: 'Category',
		dataIndex: 'category',
		key: 'category',
		searchable: true,
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: 'Stock',
		dataIndex: 'stock',
		key: 'stock',
		sorter: (a, b) => a.stock - b.stock,
	},
	{
		title: 'Sells',
		dataIndex: 'sells',
		key: 'sells',
		sorter: (a, b) => a.sells - b.sells,
	},
	{
		title: 'Rating',
		dataIndex: 'rating',
		key: 'rating',
		sorter: (a, b) => a.rating - b.rating,
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (_, { status }) => {
			let color = status == 1 ? 'green' : 'volcano';
			return (
				<Tag className="uppercase" color={color} key={status}>
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