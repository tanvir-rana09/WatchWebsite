import { Tag } from "antd";

const SectionCol = (currentPage, pageSize) => [
	{
		title: '#',
		dataIndex: 'id',
		key: 'id',
		width: '4%',
		render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
	},
	{
		title: 'File',
		dataIndex: 'file',
		key: 'file',
		render: (text, record) => <div className="min-w-14"><img src={record?.file} className="object-cover rounded" alt="product" style={{ width: 60, height: 60 }} /></div>,
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (_, record) => <p className="w-44">{record.name}</p>,
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		render: (_, record) => <p className="w-56">{record.description}</p>,
	},
	{
		title: 'Button Text',
		dataIndex: 'button_text',
		key: 'button_text',
		render: (_, record) => <p className="w-32">{record.button_text}</p>,
	},
	{
		title: 'Button Link',
		dataIndex: 'button_link',
		key: 'button_link',
		render: (_, record) => <p className="w-32">{record.button_link}</p>,
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
	},
	{
		title: 'Actions',
		key: 'actions',
		width: '10%',
	},
];

export default SectionCol;