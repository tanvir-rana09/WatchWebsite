import { NavLink } from "react-router-dom";
import Logo from "./Logo"
import Navlist from "./Navlist"
import { MdClose } from "react-icons/md";

const Sidenavbar = ({ togglesidenav }) => {
	return (
		<div className=" h-screen bg-white fixed w-4/5">
			<div className=" bg-white relative shadow-md">
				<div className="w-full flex justify-center py-3">
					<Logo />
				</div>
				<div>
					<Navlist zero='0' child='border border-b-0 border-x-0 p-2 py-4 after:h-[0px]' lastchild='border p-2 py-4 after:h-[0px]' />
					<div className="bg-black py-4 text-white font-extendfont2 text-center font-semibold">
						<NavLink to='/contact'>
							<button>Contact Us</button>
						</NavLink>
					</div>
				</div>
				<div
					onClick={togglesidenav}
					className="absolute top-3 right-2 cursor-pointer px-2 py-2 hover:bg-gray-100 rounded-full"><MdClose size={30} /></div>
			</div>
		</div>
	)
}

export default Sidenavbar