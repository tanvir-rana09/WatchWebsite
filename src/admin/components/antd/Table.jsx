import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import LinkButton from '../Buttons/LinkButton';
import { MdOutlineEdit } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from "react-toastify";
import apiCall from '../../../utils/apiCall';

const AntdTable = ({ data, columns: propColumns, endpoint = '', method = '', reCall = null }) => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	// Handle reset
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};

	// Searchable column properties
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({
								closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						Close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1677ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	const handleDelete = (id) => {
		Modal.confirm({
			title: "Are you sure you want to delete this category?",
			onOk: async () => {
				try {
					await apiCall(`${endpoint}/${id}`, method);
					toast.success("Category deleted successfully.");
					reCall()
				} catch {
					toast.error("Failed to delete category. Please try again.");
				}
			},
		});
	};

	const columns = propColumns.map((col) => {
		if (col.key === 'actions') {
			return {
				...col,
				render: (text, record) => (
					<div className="flex">
						<LinkButton url={`update/${record.id}`} className="!p-2 text-lg !bg-transparent !text-blue" Icon={MdOutlineEdit} />
						<Button className="!p-2 !bg-transparent !text-purple border-none" variant="third"><FaRegEye size={20} /></Button>
						<Button onClick={() => handleDelete(record.id)} className="!p-2 border-none !bg-transparent !text-red-500" variant="danger"><RiDeleteBin6Line size={20} /></Button>
					</div>
				),
			};
		}
		return {
			...col,
			...(col.searchable ? getColumnSearchProps(col.dataIndex) : {}),
		};
	});


	return (
		<div>
			<Table
				scroll={{ x: true }}
				columns={columns}
				dataSource={data}
				pagination={false}
			/>
		</div>
	);
};

export default AntdTable;
