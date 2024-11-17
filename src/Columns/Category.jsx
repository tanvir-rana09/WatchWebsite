const columns = [
	{
		title: '#',
		dataIndex: 'key',
		key: 'key',
		width: '4%',
		
	},
	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
		width:'15%',
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		searchable: true,
	},
	{
		title: 'Actions',
		key: 'actions',
		width: '10%',
	},
];

export default columns;