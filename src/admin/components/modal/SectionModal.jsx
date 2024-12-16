import { Modal } from "antd";
import Button from "../Buttons/Button";
import InputField from "../Inputs/Input";
import AntSelect from "../antd/Select";
import { useEffect, useState } from "react";
import apiCall from "../../../utils/apiCall";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FileInputField from "../Inputs/FileInput";

const SectionModal = ({ onClose, visible, id, data, recall }) => {
	const { control, handleSubmit, reset, setValue } = useForm();
	const [apiErrors, setApiErrors] = useState({});
	useEffect(() => {
		if (id?.id) {
			setValue("name", id.name);
			setValue("_method", "PUT");
		}
	}, [id, setValue]);

	const addCategory = async (formData) => {
		try {
			const url = id?.id ? `/section/update/${id.id}` : `/section/add`;
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

			width={800}
			open={visible}
			onCancel={onClose}
			footer={null}
		>
			<form onSubmit={handleSubmit(addCategory)}>
				<div className="grid grid-cols-1 md:grid-cols-7 md:gap-5 w-full">
					<div className="col-span-3">
						<FileInputField error={apiErrors?.images} label="Section images" name="file" control={control} />
					</div>
					<div className="w-full md:col-span-4 flex flex-col justify-between">
						<InputField
							required
							label="Category name"
							name="name"
							type="text"
							control={control}
							placeholder="Category name"
						/>
						<InputField
							required
							label="Button Text"
							name="button_text"
							type="text"
							control={control}
							placeholder="Button text"
						/>
						<InputField
							required
							label="Button Link"
							name="button_link"
							type="text"
							control={control}
							placeholder="Button Link"
						/>
					</div>
				</div>
				<InputField
					required
					label="Description"
					name="description"
					type="textarea"
					control={control}
					placeholder="Description"
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

export default SectionModal;
