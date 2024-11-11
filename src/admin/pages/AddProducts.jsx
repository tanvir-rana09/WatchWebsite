import { useForm } from "react-hook-form"
import InputField from "../components/Input"
import FileInputField from "../components/FileInput"
import { useEffect, useState } from "react"
import CheckboxGroup from "../components/Radio"
import AntSelect from "../components/Select"
import useApi from "../../utils/useApi"
import apiCall from "../../utils/apiCall"

const AddProducts = () => {
	const { control } = useForm()
	const [selectedValue, setSelectedValue] = useState({
		item_type: '',
		status: null,
		category: null
	});
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const { callApi } = useApi('/category', 'GET');
	const handleChange = (value, name) => {
		setSelectedValue((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const itemTypes = [
		{ value: 'men', label: 'Men' },
		{ value: 'women', label: 'Women' },
		{ value: 'clock', label: 'Clock' },
	];
	const status = [
		{ value: 1, label: 'Publish' },
		{ value: 0, label: "Hidden" },

	];

	useEffect(() => {
		apiCall('/category', "get").then((data) => {
			if (data) {
				console.log(data?.data);
				const apiCategory = data?.data?.map((category) => ({
					value: category?.id, label: category?.name
				}))
				setCategory(apiCategory || [])
			}
		});
	}, [])

	useEffect(() => {
		if (selectedValue.category) {
			apiCall(`/category?parent_id=${selectedValue.category}`, "get").then((data) => {
				if (data) {
					console.log(data?.data);
					const apiCategory = data?.data[0]?.subcategory?.map((category) => ({
						value: category?.id, label: category?.name
					}))
					setSubCategory(apiCategory || [])
				}
			});
		}
	}, [selectedValue.category])


	return (
		<div>
			<InputField name={'name'} type={'text'} control={control} placeholder={'Product Name'} />
			<div>
				<InputField name={'price'} type={'number'} control={control} placeholder={'Product Price'} />
				<InputField name={'stock'} type={'stock'} control={control} placeholder={'Product Stock'} />
			</div>
			<InputField name={'short_desc'} type={'textarea'} control={control} placeholder={'Short Description'} />
			<InputField name={'long_desc'} type={'editor'} control={control} placeholder={'Long Description'} />
			<FileInputField multiple name="images" control={control} />
			<div>
				<div>
					<div>
						<CheckboxGroup
							control={control}
							name="item_type"
							options={itemTypes}
							selectedValue={selectedValue.item_type}
							onChange={(value) => handleChange(value, 'item_type')}
							label="Select item type"
						/>
						<CheckboxGroup
							control={control}
							name="status"
							options={status}
							selectedValue={[selectedValue.status]}
							onChange={(value) => handleChange(value, 'status')}
							label="Select status type"
						/>
					</div>
					<div>
						<p>Select category</p>
						<AntSelect
							name={'category'}
							control={control}
							options={category}
							placeholder="Search to Select"
							width={'100%'}
							onChange={(value) => handleChange(value, 'category')}
						/>
					</div>
					<div>
						<p>Select sub category</p>
						<AntSelect
							name={'sub_category'}
							control={control}
							options={subCategory}
							placeholder="Search to Select"
							width={'100%'}
							onChange={(value) => console.log(value)}
						/>
					</div>
				</div>
			</div>

		</div>
	)
}

export default AddProducts