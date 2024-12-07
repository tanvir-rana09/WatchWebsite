import { Input, Row, Col, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Button from "../components/Buttons/Button";
import { useForm } from "react-hook-form";
import InputField from "../components/Inputs/Input";
import { LuPencilLine } from "react-icons/lu";
import { FaSave } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineUpdate } from "react-icons/md";
import { useState } from "react";
import { getLocalStorageItem } from "../../utils/setWithExpire";

const ProfileSettings = () => {
	const { control } = useForm()
	const localUser = getLocalStorageItem("user")
	const handleUpdate = (values) => {
		console.log("Form Data Submitted:", values);
	};

	return (
		<div className="container mx-auto ">
			<h2 className="text-2xl font-semibold pb-2">Profile Setting</h2>
			<p className="text-gray-500 pb-5">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices lectus sem.
			</p>

			<Row gutter={[16, 16]} >
				{/* Account Information Section */}
				<Col xs={24} md={12} >
					<Card>
						<h3 className="text-2xl font-medium">Account Information</h3>
						<p className="text-gray-500 mb-6">Edit your profile quickly</p>

						<div className="mb-6 flex items-center gap-2">
							<div className="relative border-4 border-slate-200 rounded-full">
								{
									localUser?.image ?<img src={localUser?.profile} alt="profile" />:
								<Avatar size={100} icon={<UserOutlined />} />
								}
								<LuPencilLine className="absolute bottom-0 right-2 bg-white p-1 rounded-full border" size={25} />
							</div>
							<div className=" text-base text-gray-500 ">
								<p className="text-xl font-semibold">
									{localUser?.name}
								</p>
								<p>{localUser?.email}</p>
								<p>{localUser?.role}</p>
							</div>
						</div>

						<form>
							<InputField required label={'Full Name'} name={'name'} type={'text'} control={control} placeholder={'Full Name'} />
							<InputField required label={'Email Address'} name={'email'} type={'email'} control={control} placeholder={'Email Address'} />
							<Button variant="primary" type="submit" className="flex items-center gap-2">
							<MdOutlineUpdate size={20} />
							Update Now
							</Button>
						</form>
					</Card>
				</Col>

				{/* Password Section */}
				<Col xs={24} md={12}>
					<Card>
						<h3 className="text-2xl text-gray-600 font-medium mb-4">Password</h3>
						<form>
							<InputField required label={'Current Password'} name={'name'} type={'text'} control={control} placeholder={'********'} />
							<InputField required label={'New Password'} name={'name'} type={'text'} control={control} placeholder={'********'} />
							<InputField required label={'Confirm New Password'} name={'name'} type={'text'} control={control} placeholder={'********'} />

							<Button variant="primary" type="submit"  className="flex items-center gap-2">
							<FaSave />Save
							</Button>
						</form>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ProfileSettings;
