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
import { debounce } from "lodash";

const EditProduct = () => {
	const { control, handleSubmit, setValue, reset, watch, getValues } = useForm();
	const [apiErrors, setApiErrors] = useState({});
	const [initialData, setInitialData] = useState({});
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	const { callApi, error, loading } = useApi(`/product/update/${id}`, 'POST');

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
		const fetchProductData = async () => {
			try {
				const data = await apiCall(`/product?id=${id}`, "get");

				if (data?.data) {
					const productData = data.data[0];


					const obj = {
						name: productData?.name || null,
						price: productData?.price || null,
						stock: productData?.stock || null,
						short_desc: productData?.short_desc || null,
						long_desc: productData?.long_desc || null,
						images: productData?.images || [],
						item_type: productData?.item_type || null,
						status: productData?.status || null,
						category_id: productData?.category_id || null,
						subcategory_id: productData?.subcategory_id || null,
						banner: productData?.banner || null
					};
					setInitialData(obj)
					Object.keys(obj).forEach((field) => {
						setValue(field, productData[field]);
					});

				}
			} catch (error) {
				console.error("Error fetching product data:", error);
			}
		};

		fetchProductData();
	}, [id, setValue, setInitialData]);

	const categoryId = watch('category_id');
	useEffect(() => {
		// Define a debounced API call
		const fetchSubCategories = debounce(async (id) => {
			try {
				const data = await apiCall(`/category?parent_id=${id}`, "get");
				if (data) {
					const apiSubCategory = data.data[0]?.subcategory?.map((category) => ({
						value: category.id,
						label: category.name,
					}));

					// Update state only if data is different
					setSubCategory((prev) => {
						const isDataChanged = JSON.stringify(prev) !== JSON.stringify(apiSubCategory);
						return isDataChanged ? apiSubCategory : prev;
					});
				}
			} catch (error) {
				console.error("Error fetching subcategories:", error);
			}
		}, 300); // Adjust the debounce time as needed

		// Fetch data only if categoryId is defined
		if (categoryId) {
			fetchSubCategories(categoryId);
		}

		// Cleanup debounce on unmount
		return () => fetchSubCategories.cancel();
	}, [categoryId]);


	const onSubmit = async (formData) => {
		const changedData = { _method: 'PUT' };

		// Compare each form field with initial data to find changes
		Object.keys(formData).forEach((key) => {
			if (JSON.stringify(formData[key]) !== JSON.stringify(initialData[key])) {
				changedData[key] = formData[key];
			}
		});

		if (Object.keys(changedData).length == 0) {
			toast.info("No changes detected", { position: "top-center" });
			return;
		}

		console.log(changedData);
		


		const data = await callApi(changedData);
		if (data?.status == 200) {
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

console.log(watch('images'));


	return (
		<div>
			<form encType="multipart/form-data" className="grid xl:grid-cols-3 gap-5 2xl:gap-10" onSubmit={handleSubmit(onSubmit)}>
				<div className="xl:col-span-2 shadow bg-white p-5 md:p-10 rounded">
					<InputField error={apiErrors?.name} required label="Product Name" name="name" type="text" control={control} placeholder="Product Name" />
					<div className="grid grid-cols-2 gap-5">
						<InputField error={apiErrors?.price} required label="Product Price" name="price" type="number" control={control} placeholder="Product Price" />
						<InputField error={apiErrors?.stock} required label="Product Stock" name="stock" type="number" control={control} placeholder="Product Stock" />
					</div>
					<InputField error={apiErrors?.short_desc} required label="Short Description" name="short_desc" type="textarea" control={control} placeholder="Short Description" />
					<InputField error={apiErrors?.long_desc} label="Long Description" name="long_desc" type="editor" control={control} placeholder="Long Description" />
					<FileInputField imagePreviews={watch('images')} error={apiErrors?.images} label="Product Images" multiple name="images[]" control={control} />
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
						setValue={setValue}
						label="Select Item Type"
					/>
					<CheckboxGroup error={apiErrors?.status}
						control={control}
						name="status"
						options={[
							{ value: 1, label: 'Publish' },
							{ value: 0, label: 'Hidden' },
						]}
						setValue={setValue}
						label="Select Status Type"
					/>
					<AntSelect error={apiErrors?.category_id}
						label="Select Main Category"
						required
						name="category_id"
						control={control}
						options={category}
						placeholder="Search to Select"
						width="100%"
					/>
					<AntSelect error={apiErrors?.subcategory_id}
						label="Select Sub Category"
						disabled={!subCategory.length}
						name="subcategory_id"
						control={control}
						options={subCategory}
						placeholder="Search to Select"
						width="100%"
					/>
					<FileInputField imagePreviews={[watch('banner')]} error={apiErrors?.banner} required label="Product Banner" name="banner" control={control} />

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
