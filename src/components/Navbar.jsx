import cart from '../assets/Images/BannerImg/cart.png'
import { IoIosMail } from "react-icons/io";
import Sidenavbar from './Sidenavbar'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import Search from './Search';
import Logo from './Logo';
import Navlist from './Navlist';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { WatchContext } from '../context/Context';
import { getLocalStorageItem } from '../utils/setWithExpire';

const Navbar = () => {
	const [fixedNav, setFixedNav] = useState(false)
	const [sidenav, setSidenav] = useState(false)
	const { getTotalCartItems } = useContext(WatchContext)
	const user = getLocalStorageItem('user');
	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 0) {
				setFixedNav(true)
			} else {
				setFixedNav(false)
			}
		})
	}, [])

	const togglesidenav = () => {
		setSidenav(!sidenav)
	}


	return (
		<div className={`z-[100] w-full transition-all ease-in-out border-b duration-1000 bg-white ${fixedNav ? 'fixed top-0 ' : 'top-[-5rem]'}`}>
			<nav className=' relative '>
				<div className='flex justify-between py-3 items-center px-2  sm:px-10 border-b border-gray-300 2xl:px-[15%]'>
					<div className='flex'>
						<button >
							<NavLink className='contact py-2' to='/contact'>
								<IoIosMail size={20} /> Contact us
							</NavLink>
						</button>
						<div
							onClick={togglesidenav}
							className='lg:hidden cursor-pointer px-2 hover:bg-gray-100 rounded-full py-2'>
							<HiMiniBars3CenterLeft size={28} />
						</div>
					</div>
					<div>
						<Logo />
					</div>
					<div className='flex items-center'>
						<NavLink to='/cart'>
							<div className='flex items-center gap-1 relative cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-full'>
								<button className='font-semibold font-extendfont2'>Cart</button>
								<img className='w-5' src={cart} />
								<div className='cart text-xs'>{getTotalCartItems()}</div>
							</div>
						</NavLink>
						{
							user ? <span className="h-8 w-8 rounded-full overflow-hidden">
								<img src={user.profile} alt="User" />
							</span> :
								<NavLink className='contact py-2' to='/signin'>
									Signin
								</NavLink>
						}
					</div>
				</div>
				<div className='flex justify-center items-center gap-4 py-3 '>
					<Navlist hidden='hidden' zero='0' />
					<div className='lg:w-[25rem] w-4/5'>
						<Search />
					</div>
				</div>
			</nav>
			<div
				className={`z-[999] h-screen w-full absolute top-0 lg:hidden bg-black/10 ${sidenav ? "opacity-100 left-[0] duration-500" : "opacity-0 left-[-65rem] duration-500"}`}>
				<Sidenavbar togglesidenav={togglesidenav} />
			</div>
		</div>
	)
}

export default Navbar