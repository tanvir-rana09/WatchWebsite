import { useState } from 'react'
import Sidebar from './admin/components/Sidebar';
import Header from './admin/components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import Loader from './Common/Loading';
import { ToastContainer } from 'react-toastify';
const Admin = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { loading } = useAuth();
	if (loading) {
		return <Loader />;
	}
	return (

		<div className="dark:bg-boxdark-2 dark:text-bodydark bg-[#F1F5F9]">

			<div className="flex h-screen overflow-hidden">

				{/* Sidebar */}
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				{/* Content Area */}
				<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

					{/* Header */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

					{/* Main Content */}
					<main>
						<div className="mx-auto p-4 md:p-6 2xl:p-10">
							<Outlet />
							{/* <ToastContainer
								autoClose={3000}
								hideProgressBar /> */}
						</div>
					</main>

				</div>

			</div>

		</div>

	)
}

export default Admin