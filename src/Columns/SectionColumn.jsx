import { Tag } from "antd";

const SectionCol =(currentPage, pageSize)=> [
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
		render: (text, record) => <img src={record?.file} className="object-cover rounded" alt="product" style={{ width: 50, height: 50 }} />,
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Button Text',
		dataIndex: 'button_text',
		key: 'button_text',
	},
	{
		title: 'Button Link',
		dataIndex: 'button_link',
		key: 'button_link',
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

export default SectionCol;