import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../components/Inputs/Input";
import FileInputField from "../components/Inputs/FileInput";
import CheckboxGroup from "../components/Inputs/Radio";
import AntSelect from "../components/antd/Select";
import useApi from "../../utils/useApi";
import apiCall from "../../utils/apiCall";
import Button from "../components/Buttons/Button";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

const EditProduct = () => {
	const { control, handleSubmit, setValue, reset, getValues } = useForm();
	const [apiErrors, setApiErrors] = useState({});
	const [selectedValue, setSelectedValue] = useState({
		item_type: 'men',
		status: 1,
		category_id: null,
	});
	const [initialData, setInitialData] = useState({});
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	const { callApi, error, loading } = useApi(`/product/update/${id}`, 'PUT');

	// Fetch categories
	useEffect(() => {
		apiCall('/category', "get").then((data) => {
			if (data) {
				const apiCategory = data?.data?.map((category) => ({
					value: category?.id,
					label: category?.name,
				}));
				setCategory(apiCategory || []);
			}
		});
	}, []);

	// Fetch product data by ID and set as default values
	useEffect(() => {
		apiCall(`/product?id=${id}`, "get").then((data) => {
			if (data?.data) {
				const productData = data.data[0];
				setInitialData(productData);  // Store initial data for change detection
				// Set each field with the product data from the API
				Object.keys(productData).forEach((field) => {
					setValue(field, productData[field]);
				});
				setSelectedValue({
					item_type: productData.item_type,
					status: productData.status,
					category_id: productData.category_id,
				});
			}
		});
	}, [id, setValue]);

	// Fetch subcategories based on selected category
	useEffect(() => {
		if (selectedValue.category_id) {
			apiCall(`/category?parent_id=${selectedValue.category_id}`, "get").then((data) => {
				if (data) {
					const apiSubCategory = data?.data[0]?.subcategory?.map((category) => ({
						value: category?.id,
						label: category?.name,
					}));
					setSubCategory(apiSubCategory || []);
				}
			});
		}
	}, [selectedValue.category_id]);

	// Handle selection changes
	const handleChange = (value, name) => {
		setSelectedValue((prevState) => ({
			...prevState,
			[name]: value,
		}));
		setValue(name, value); // Update form value
	};

	// Form submission handler
	const onSubmit = async (formData) => {
		const changedData = {};
console.log(formData);

		// Compare each form field with initial data to find changes
		Object.keys(formData).forEach((key) => {
			if (formData[key] !== initialData[key]) {
				changedData[key] = formData[key];
			}
		});

		if (Object.keys(changedData).length === 0) {
			toast.info("No changes detected", { position: "top-center" });
			return;
		}

		const data = await callApi(changedData);
		if (data?.status === 200) {
			toast.success("Product updated successfully", { position: "top-center" });
			reset();
			navigate("/admin/products");
		}
	};

	// Handle API errors for form fields
	useEffect(() => {
		if (error?.data?.errors) {
			const errorsFromApi = {};
			Object.entries(error.data.errors).forEach(([field, messages]) => {
				errorsFromApi[field] = messages[0] + '*';
			});
			setApiErrors(errorsFromApi);
		} else setApiErrors({});
	}, [error]);
console.log(getValues());
console.log(selectedValue);

	return (
		<div>
			<form encType="multipart/form-data" className="grid xl:grid-cols-3 gap-5 xl:gap-10" onSubmit={handleSubmit(onSubmit)}>
				<div className="xl:col-span-2 shadow bg-white p-5 md:p-10 rounded">
					<InputField error={apiErrors?.name} required label="Product Name" name="name" type="text" control={control} placeholder="Product Name" />
					<div className="grid grid-cols-2 gap-5">
						<InputField error={apiErrors?.price} required label="Product Price" name="price" type="number" control={control} placeholder="Product Price" />
						<InputField error={apiErrors?.stock} required label="Product Stock" name="stock" type="number" control={control} placeholder="Product Stock" />
					</div>
					<InputField error={apiErrors?.short_desc} required label="Short Description" name="short_desc" type="textarea" control={control} placeholder="Short Description" />
					<InputField error={apiErrors?.long_desc} label="Long Description" name="long_desc" type="editor" control={control} placeholder="Long Description" />
					<FileInputField defaultValue={getValues().images} error={apiErrors?.images} label="Product Images" multiple name="images[]" control={control} />
				</div>
				<div className="max-h-fit w-full shadow bg-white p-5 md:p-10 rounded space-y-5">
					<CheckboxGroup error={apiErrors?.item_type}
						control={control}
						name="item_type"
						options={[
							{ value: 'men', label: 'Men' },
							{ value: 'women', label: 'Women' },
							{ value: 'clock', label: 'Clock' },
						]}
						selectedValue={selectedValue.item_type}
						onChange={(value) => handleChange(value, 'item_type')}
						label="Select Item Type"
					/>
					<CheckboxGroup error={apiErrors?.status}
						control={control}
						name="status"
						options={[
							{ value: 1, label: 'Publish' },
							{ value: 0, label: 'Hidden' },
						]}
						selectedValue={selectedValue.status}
						onChange={(value) => handleChange(value, 'status')}
						label="Select Status Type"
					/>
					<AntSelect error={apiErrors?.category_id}
						label="Select Main Category"
						required
						name="category_id"
						control={control}
						options={category}
						defaultValue={selectedValue.category_id}
						placeholder="Search to Select"
						width="100%"
						onChange={(value) => handleChange(value, 'category_id')}
					/>
					<AntSelect error={apiErrors?.subcategory_id}
						label="Select Sub Category"
						disabled={!subCategory.length}
						name="subcategory_id"
						control={control}
						defaultValue={getValues().subcategory_id}
						options={subCategory}
						placeholder="Search to Select"
						width="100%"
						onChange={(value) => setValue('subcategory_id', value)}
					/>
					<FileInputField defaultValue={[getValues().banner]} error={apiErrors?.banner} required label="Product Banner" name="banner" control={control} />
					<Button loading={loading} type="submit" className="flex items-center justify-center gap-2 w-full">
						<IoMdAdd size={20} />
						Update Product
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EditProduct;
