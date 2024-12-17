import { Modal } from "antd";
import Button from "../Buttons/Button";
import InputField from "../Inputs/Input";
import { useEffect, useState } from "react";
import apiCall from "../../../utils/apiCall";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FileInputField from "../Inputs/FileInput";

const SectionModal = ({ onClose, visible, id, recall }) => {
	const { control, handleSubmit, reset, setValue, getValues } = useForm({
		defaultValues: {
			name: "",
			description: "",
			button_link: "",
			button_text: "",
			file: null,
		},
	});

	const [initialValues, setInitialValues] = useState({});
	const [apiErrors, setApiErrors] = useState({});

	useEffect(() => {
		if (id) {

			const initValues = {
				name: id.name || "",
				description: id.description || "",
				button_link: id.button_link || "",
				button_text: id.button_text || "",
				file: id.file || null,
			};

			setInitialValues(initValues);
			reset(initValues);

			if (id?.id) {
				setValue("_method", "PUT");
			}
		}
	}, [id, reset, setValue]);

	const addSection = async (formData) => {
		try {

			const changedValues = Object.keys(formData).reduce((acc, key) => {
				if (formData[key] !== initialValues[key]) {
					acc[key] = formData[key];
				}
				return acc;
			}, {});
			const url = id?.id ? `/section/update/${id.id}` : `/section/add`;
			const method = "POST";

			const data = await apiCall(url, method, changedValues);


			if (data) {
				toast.success(`Section ${id?.id ? "updated" : "added"} successfully.`);
				recall();
				reset();
				onClose();
			}
		} catch (error) {
			if (error?.response?.data?.errors) {
				const errorsFromApi = {};
				Object.entries(error?.response?.data?.errors).forEach(([field, messages]) => {
					errorsFromApi[field] = messages[0] + '*';
				});
				setApiErrors(errorsFromApi);
			} else setApiErrors({});
			toast.error("Failed to save section. Please try again.");
		}
	};

	return (
		<Modal
			width={800}
			open={visible}
			onCancel={onClose}
			footer={null}
		>
			<form encType="multipart/form-data" onSubmit={handleSubmit(addSection)}>
				<div className="grid grid-cols-1 md:grid-cols-7 md:gap-5 w-full">
					<div className="col-span-3">
						<FileInputField
							imagePreviews={[id?.file]}
							error={apiErrors?.file}
							label="Section images"
							name="file"
							control={control}
						/>
					</div>
					<div className="w-full md:col-span-4 flex flex-col justify-between">
						<InputField
						error={apiErrors?.name}
							required
							label="Section name"
							name="name"
							type="text"
							control={control}
							placeholder="Section name"
						/>
						<InputField
						error={apiErrors?.button_text}
							required
							label="Button Text"
							name="button_text"
							type="text"
							control={control}
							placeholder="Button text"
						/>
						<InputField
						error={apiErrors?.button_link}
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
				error={apiErrors?.description}
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
						{id?.id ? "Update" : "Add"} Section
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default SectionModal;
