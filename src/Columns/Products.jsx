import { Tag } from "antd";
import Button from "../admin/components/Buttons/Button";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import LinkButton from "../admin/components/Buttons/LinkButton";

const columns = [
	{
		title: '#',
		dataIndex: 'id',
		key: 'id',
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
		// render: (status) => (status == 1 ? 'Published' : 'Hidden'),
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
		render: (text, record) => (
			<div className="flex">
				<LinkButton url={`update/${record.id}`} className="!p-2 text-lg !bg-transparent !text-blue" Icon={MdOutlineEdit} />
				<Button className="!p-2 !bg-transparent !text-purple" variant="third"><FaRegEye size={20} /></Button>
				<Button className="!p-2 !bg-transparent !text-red-500" variant="danger"><RiDeleteBin6Line size={20} /></Button>
			</div>
		),
	},
];

export default columns;