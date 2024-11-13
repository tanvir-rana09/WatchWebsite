import { useForm } from "react-hook-form"
import InputField from "../components/Inputs/Input"
import FileInputField from "../components/Inputs/FileInput"
import { useEffect, useState } from "react"
import CheckboxGroup from "../components/Inputs/Radio"
import AntSelect from "../components/antd/Select"
import useApi from "../../utils/useApi"
import apiCall from "../../utils/apiCall"
import Button from "../components/Buttons/Button"
import { IoMdAdd } from "react-icons/io"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddProducts = () => {
	const { control, handleSubmit, setValue, reset } = useForm({
		defaultValues: {
			item_type: 'men',
			status: 1,
		},
	})
	const [apiErrors, setApiErrors] = useState({});
	const [selectedValue, setSelectedValue] = useState({
		item_type: 'men',
		status: 1,
		category_id: null
	});
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);

	// Handle selection changes
	const handleChange = (value, name) => {
		setSelectedValue((prevState) => ({
			...prevState,
			[name]: value,
		}));
		setValue(name, value); // Update form value
	};

	// Item types and statuses
	const itemTypes = [
		{ value: 'men', label: 'Men' },
		{ value: 'women', label: 'Women' },
		{ value: 'clock', label: 'Clock' },
	];

	// Fetch categories
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

	// Fetch subcategories based on selected category
	useEffect(() => {
		if (selectedValue.category_id) {
			apiCall(`/category?parent_id=${selectedValue.category_id}`, "get").then((data) => {
				if (data) {
					const apiSubCategory = data?.data[0]?.subcategory?.map((category) => ({
						value: category?.id, label: category?.name
					}));
					setSubCategory(apiSubCategory || []);
				}
			});
		}
	}, [selectedValue.category_id]);
	const { callApi, error,loading } = useApi('/product/add', 'POST');
	const navigate = useNavigate()
	// Form submission handler
	const onSubmit = async (formdata) => {
		console.log("Form Data:", formdata);
		const data = await callApi(formdata);
		if (data?.status == 200) {
			toast.success("Product added successfully", { position: "top-center", })
			reset();
			navigate("/admin/products")

		}
	};
	useEffect(() => {
		if (error?.data?.errors) {
			const errorsFromApi = {};

			Object.entries(error.data.errors).forEach(([field, messages]) => {
				errorsFromApi[field] = messages[0] + '*';
			});

			setApiErrors(errorsFromApi);
		} else setApiErrors({})


	}, [error]);
	console.log(apiErrors);
	return (
		<div>
			<form encType="multipart/form-data" className="grid xl:grid-cols-3 gap-5 xl:gap-10" onSubmit={handleSubmit(onSubmit)}>
				<div className="xl:col-span-2 shadow bg-white p-5 md:p-10 rounded">
					<InputField error={apiErrors?.name} required label={'Product Name'} name={'name'} type={'text'} control={control} placeholder={ 'Product Name'} />
					<div className="grid grid-cols-2 gap-5">
						<InputField error={apiErrors?.price} required label={'Product Price'} name={'price'} type={'number'} control={control} placeholder={ 'Product Price'} />
						<InputField error={apiErrors?.stock} required label={'Product Stock'} name={'stock'} type={'number'} control={control} placeholder={ 'Product Stock'} />
					</div>
					<InputField error={apiErrors?.short_desc} required label={'Short Description'} name={'short_desc'} type={'textarea'} control={control} placeholder={ 'Short Description'} />
					<InputField error={apiErrors?.long_desc} label={'Long Description'} name={'long_desc'} type={'editor'} control={control} placeholder={ 'Long Description'} />
					<FileInputField error={apiErrors?.images} label="Product images" multiple name="images[]" control={control} />
				</div>
				<div className=" max-h-fit w-full shadow bg-white p-5 md:p-10 rounded space-y-5">
					<CheckboxGroup error={apiErrors?.item_type}
						control={control}
						name="item_type"
						options={itemTypes}
						selectedValue={selectedValue.item_type}
						onChange={(value) => handleChange(value, 'item_type')}
						label="Select item type"
					/>
					<CheckboxGroup error={apiErrors?.status}
						control={control}
						name="status"
						options={[
							{ value: 1, label: 'Publish' },
							{ value: 0, label: "Hidden" },
						]}
						selectedValue={selectedValue.status}
						onChange={(value) => handleChange(value, 'status')}
						label="Select status type"
					/>
					<div>

						<AntSelect error={apiErrors?.category_id}
							label='Select main category'
							required
							name={'category_id'}
							control={control}
							options={category}
							placeholder="Search to Select"
							width={'100%'}
							onChange={(value) => handleChange(value, 'category_id')}
						/>
					</div>
					<div>

						<AntSelect error={apiErrors?.subcategory_id}
							label='Select sub category'
							disabled={!subCategory.length}
							name={'subcategory_id'}
							control={control}
							options={subCategory}
							placeholder="Search to Select"
							width={'100%'}
							onChange={(value) => setValue('subcategory_id', value)}
						/>
					</div>
					<FileInputField error={apiErrors?.banner} required label="Product banner" name="banner" control={control} />

					<Button loading={loading} type="submit" className="flex items-center justify-center gap-2 w-full">
						<IoMdAdd size={20} />
						Add Product
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AddProducts;
