import { Modal } from "antd";
import Button from "../Buttons/Button";
import InputField from "../Inputs/Input";
import AntSelect from "../antd/Select";
import { useEffect } from "react";
import apiCall from "../../../utils/apiCall";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CategoryModal = ({ onClose, visible, id, data,recall }) => {
	const { control, handleSubmit, reset, setValue } = useForm();

	useEffect(() => {
		if (id?.id) {
			setValue("name", id.name);
			setValue("_method", "PUT");
		}
	}, [id, setValue]);

	const addCategory = async (formData) => {
		try {
			const url = id?.id ? `/category/update/${id.id}` : `/category/add`;
			const method = "POST";
			const data = await apiCall(url, method, formData);

			if (data) {
				toast.success(`Category ${id?.id ? "updated" : "added"} successfully.`);
				recall()
				reset();
				onClose();
			}
		} catch {
			toast.error("Failed to save category. Please try again.");
		}
	};

	return (
		<Modal
			width={500}
			open={visible}
			onCancel={onClose}
			footer={null}
		>
			<form onSubmit={handleSubmit(addCategory)}>
				<InputField
					required
					label="Category name"
					name="name"
					type="text"
					control={control}
					placeholder="Category name"
				/>
				<AntSelect
					label="Select parent category"
					required
					name="parent_id"
					control={control}
					disabled={!id.sub}
					placeholder="Search to Select"
					width="100%"
					options={
						data?.map((category) => ({
							value: category?.id, label: category?.name
						}))
					}
				/>
				<div className="flex justify-end gap-2 mt-5">
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">
						{id?.id ? "Update" : "Add"} Category
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default CategoryModal;
