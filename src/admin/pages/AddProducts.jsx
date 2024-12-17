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
import { debounce } from "lodash"
import { Switch } from "antd"
import { numericSizes, textSizes, combinedSizes } from "../Static"

const AddProducts = () => {
	const { control, handleSubmit, setValue, reset, watch } = useForm({
		defaultValues: {
			gender: 'men',
			status: 1,
		},
	});
	const [apiErrors, setApiErrors] = useState({});
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [sizes, setSizes] = useState([]);
	const [showSize, setShowSize] = useState(false); // Toggle for size field

	const itemTypes = [
		{ value: 'men', label: 'Men' },
		{ value: 'women', label: 'Women' },
		{ value: 'kid', label: 'Kid' },
		{ value: 'others', label: 'Others' },
	];

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

	const categoryId = watch('category_id');
	useEffect(() => {
		const fetchSubCategories = debounce(async (id) => {
			try {
				const data = await apiCall(`/category?parent_id=${id}`, "get");
				if (data) {
					const apiSubCategory = data.data[0]?.subcategory?.map((category) => ({
						value: category.id,
						label: category.name,
					}));
					setSubCategory((prev) => {
						const isDataChanged = JSON.stringify(prev) !== JSON.stringify(apiSubCategory);
						return isDataChanged ? apiSubCategory : prev;
					});
				}
			} catch (error) {
				console.error("Error fetching subcategories:", error);
			}
		}, 300);
		if (categoryId) {
			fetchSubCategories(categoryId);
		}
		return () => fetchSubCategories.cancel();
	}, [categoryId]);

	const { callApi, error, loading } = useApi('/product/add', 'POST');
	const navigate = useNavigate();
	const onSubmit = async (formdata) => {
		const data = await callApi(formdata);
		if (data?.status == 200) {
			toast.success("Product added successfully", { position: "top-center" });
			reset();
			navigate("/admin/products");
		}
	};

	useEffect(() => {
		if (error?.data?.errors) {
			const errorsFromApi = {};
			Object.entries(error.data.errors).forEach(([field, messages]) => {
				errorsFromApi[field] = messages[0] + '*';
			});
			setApiErrors(errorsFromApi);
		} else setApiErrors({});
	}, [error]);

	
	const clothingSizes = combinedSizes.filter((size) =>
		size.value.startsWith("clothing")
	);
	const shoeSizes = combinedSizes.filter((size) =>
		size.value.startsWith("shoe")
	);

	const groupedOptions = [
		{
			label: <strong>Clothing Sizes</strong>,
			options: clothingSizes.map((size) => ({
				label: size.label,
				value: size.value,
			})),
		},
		{
			label: <strong>Shoe Sizes</strong>,
			options: shoeSizes.map((size) => ({
				label: size.label,
				value: size.value,
			})),
		},
	]; 


	const sizeType = watch('sizeType');
	useEffect(() => {
		let sizes = [];

		switch (sizeType) {
			case 'text':
				sizes = textSizes;
				break;
			case 'numeric':
				sizes = numericSizes;
				break;
			case 'kid':
				sizes = groupedOptions;
				break;
			default:
				sizes = [];
		}
		setSizes(sizes);
		setValue('size', []);
	}, [sizeType, setValue]);


	return (
		<div>
			<form encType="multipart/form-data" className="grid xl:grid-cols-3 gap-5 2xl:gap-10" onSubmit={handleSubmit(onSubmit)}>
				<div className="xl:col-span-2 shadow bg-white p-5 md:p-10 rounded">
					<InputField error={apiErrors?.name} required label={'Product Name'} name={'name'} type={'text'} control={control} placeholder={'Product Name'} />
					<div className="grid grid-cols-3 gap-5">
						<InputField error={apiErrors?.price} required label={'Product Price'} name={'price'} type={'number'} control={control} placeholder={'Product Price'} />
						<InputField error={apiErrors?.stock} required label={'Product Stock'} name={'stock'} type={'number'} control={control} placeholder={'Product Stock'} />
						<InputField error={apiErrors?.discount} label={'Discount %'} name={'discount'} type={'number'} control={control} placeholder={'Discount Percentage'} />
					</div>
					<InputField error={apiErrors?.short_desc} required label={'Short Description'} name={'short_desc'} type={'textarea'} control={control} placeholder={'Short Description'} />
					<InputField error={apiErrors?.long_desc} label={'Long Description'} name={'long_desc'} type={'editor'} control={control} placeholder={'Long Description'} />
					<FileInputField error={apiErrors?.images} label="Product images" multiple name="images[]" control={control} />
				</div>
				<div className="max-h-fit w-full shadow bg-white p-5 md:p-10 rounded space-y-5">
					<CheckboxGroup error={apiErrors?.gender}
						control={control}
						name="gender"
						options={itemTypes}
						setValue={setValue}
						label="Select Item Type"
					/>
					<CheckboxGroup error={apiErrors?.status}
						control={control}
						name="status"
						setValue={setValue}
						options={[
							{ value: 1, label: 'Publish' },
							{ value: 0, label: "Hidden" },
						]}
						label="Select Status"
					/>
					<div className="flex items-center gap-2">
						<Switch className="bg-gray-300" size="small" onClick={() => setShowSize(!showSize)} />
						<label className="font-medium">Add Size</label>
					</div>
					{showSize && (
						<>
							<CheckboxGroup
								error={apiErrors?.sizeType}
								control={control}
								name="sizeType"
								setValue={setValue}
								options={[
									{ value: 'text', label: 'Text Sizes' },
									{ value: 'numeric', label: 'Numeric Sizes' },
									{ value: 'kid', label: 'Kid Sizes' },
								]}
								label="Select Size Type"
							/>
							<AntSelect error={apiErrors?.size}
								label='Select Sizes'
								name={'size'}
								control={control}
								options={sizes}
								multiple
								placeholder="Search to Select"
								width={'100%'}
							/>
						</>
					)}
					<AntSelect error={apiErrors?.category_id}
						label='Select main category'
						required
						name={'category_id'}
						control={control}
						options={category}
						placeholder="Search to Select"
						width={'100%'}
					/>
					<AntSelect error={apiErrors?.subcategory_id}
						label='Select sub category'
						disabled={!subCategory.length}
						name={'subcategory_id'}
						control={control}
						options={subCategory}
						placeholder="Search to Select"
						width={'100%'}
					/>
					<FileInputField error={apiErrors?.banner} required label="Product banner" name="banner" control={control} />
					<Button loading={loading} type="submit" className="flex items-center justify-center gap-2 w-full">
						<IoMdAdd size={20} />
						Add Product
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddProducts;
