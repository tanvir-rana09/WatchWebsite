import useApi from "../../utils/useApi";
import TableSkeleton from "../components/Loading/TableSkeleton";
import AntdPagination from "../components/antd/Pagination";
import { useEffect, useState } from "react";
import SearchInput from "../components/Inputs/Search";
import { Table, Modal, message } from "antd";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import debounce from "lodash/debounce";
import apiCall from "../../utils/apiCall";
import Button from "../components/Buttons/Button.jsx";
import SectionCol from "../../Columns/SectionColumn.jsx";
import { FaRegEye } from "react-icons/fa";
import SectionModal from "../components/modal/SectionModal.jsx";

const Section = () => {
	const { callApi, loading } = useApi(`/section`, "GET");
	const [data, setData] = useState([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState({});
	const [isModalVisible, setIsModalVisible] = useState(false);

	const fetchProducts = async () => {
		try {
			const result = await callApi({
				page: currentPage,
				per_page: pageSize,
				name: search,
			});
			setTotal(result?.total || 0);
			setData(result?.data)
		} catch {
			message.error("Failed to fetch Sections. Please try again.");
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [currentPage, pageSize, search]);

	const handleDelete = (id) => {
		Modal.confirm({
			title: "Are you sure you want to delete this category?",
			onOk: async () => {
				try {
					await apiCall(`/section/delete/${id}`, "DELETE");
					message.success("Category deleted successfully.");
					fetchProducts();
				} catch {
					message.error("Failed to delete category. Please try again.");
				}
			},
		});
	};

	const columns = SectionCol(currentPage, pageSize).map((col) => ({
		...col,
		render: col.key === "actions" ? (text, record) => (
			<div className="flex">
				<Button
					className="!p-2 text-lg !bg-transparent !text-blue"
					onClick={() =>
						setIsModalVisible(true) || setCategory({ id: record.id, name: record.name, sub: false })
					}
				>
					<MdOutlineEdit size={20} />
				</Button>
				<Button className="!p-2 !bg-transparent !text-purple border-none" variant="third"><FaRegEye size={20} /></Button>
				<Button
					className="!p-2 border-none !bg-transparent !text-red-500"
					onClick={() => handleDelete(record.id)}
				>
					<RiDeleteBin6Line size={20} />
				</Button>
			</div>
		) : col.render,
	}));

	return (
		<div className="adminlayout">
			<div className="flex items-center justify-between">
				<SearchInput
					className="!py-3 hover:!border-blue"
					placeholder="Search Section by name"
					onSearch={debounce(setSearch, 300)}
				/>
				<div className="flex justify-end gap-5 items-center">
					<Button
						key={'Add Section'}
						className="!text-black border flex items-center gap-2 !bg-white hover:!bg-black duration-300 hover:!text-white"
						onClick={() => setIsModalVisible(true)}
					>
						<IoMdAdd /> Add Section
					</Button>
				</div>
			</div>
			<div className=" mt-5">
				{loading ? (
					<TableSkeleton />
				) : (
					<Table
						scroll={{ x: true }}
						columns={columns}
						dataSource={data}
						pagination={false}
					/>
				)}
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
				{isModalVisible && (
					<SectionModal
						data={data}
						recall={fetchProducts}
						onClose={() => setIsModalVisible(false)}
						visible={isModalVisible}
						id={category}
					/>
				)}
			</div>
		</div>
	);
};

export default Section;
