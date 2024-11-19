import { Modal } from "antd"
import Button from "../Buttons/Button"
import InputField from "../Inputs/Input"
import AntSelect from "../antd/Select"
import { useEffect, useState } from "react"
import apiCall from "../../../utils/apiCall"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import useApi from "../../../utils/useApi"


const CategoryModal = ({
	onClose, visible, id
}) => {
	const { control, handleSubmit, reset, setValue } = useForm({ defaultValues: { _method: 'PUT', name: id.name } })
	const [category, setCategory] = useState([]);
	const { callApi, loading } = useApi(`/category/add`, "POST");
	useEffect(() => {
		apiCall('/category', "get").then((data) => {
			if (data) {
				const apiCategory = data?.data?.map((category) => ({
					value: category?.id, label: category?.name
				}));
				setCategory(apiCategory || []);
			}
		});
	}, []);

	useEffect(() => {
		setValue('name', id.name)
		setValue('_method', 'PUT')
	}, [id])


	const addcategory = async (formdata) => {
		if (id.id) {
			apiCall(`/category/update/${id.id}`, "POST", formdata).then((data) => {
				if (data) {
					toast.success("Category updated successfully", { position: "top-center", })
					reset();
				}
			});
		} else {
			const data = await callApi(formdata);
			if (data?.status == 200) {
				toast.success("Category added successfully", { position: "top-center", })
				reset();
			}
		}

	}
	console.log(id);

	return (
		<Modal width={500} height={500}
			open={visible}
			onCancel={onClose}
			footer={null}
		>
			<form onSubmit={handleSubmit(addcategory)} action="">
				<InputField required label={'Category name'} name={'name'} type={'text'} control={control} placeholder={'Category name'} />
				<AntSelect
					label='Select parent category'
					required
					name={'parent_id'}
					control={control}
					disabled={!id.sub}
					options={category}
					placeholder="Search to Select"
					width={'100%'}
				/>
				<div className="flex justify-end gap-2 mt-5">
					<Button variant="secondary" onClick={onClose}>Cancel</Button>
					<Button loading={loading} type="submit">
						{id.id ? 'Update' : 'Add'} Category
					</Button>
				</div>
			</form>
		</Modal>
	)
}

export default CategoryModal