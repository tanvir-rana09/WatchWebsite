import categoryMen from '../assets/Images/BannerImg/category (1).png'
import categoryWomen from '../assets/Images/BannerImg/category (2).png'
import categoryClock from '../assets/Images/BannerImg/category (3).png'
import { MdOutlineWatchLater } from "react-icons/md";
import { GiWatch } from "react-icons/gi";
import { Link } from 'react-router-dom';
const Category = () => {

	return (
		<div className='w-full lg:px-5'>
			<h1 className='text-center lg:text-2xl 2xl:text-4xl md:text-xl  m-auto  uppercase tracking-widest font-extendfont7 mb-5 font-semibold bg-primary py-3'>Category</h1>
			<div className='grid grid-cols-3 md:gap-5 lg:gap-10 gap-3 2xl:px-[15%] px-3'>
				<div className=' cursor-pointer bg-primary  relative active overflow-hidden' >
					<img className='w-full h-full p-5 ' src={categoryMen} />
					<Link to='men'>
						<div className='absolute opacity-0 top-0 left-0 bg-black w-full h-full activetop transition ease-in-out duration-500 grid place-content-center text-2xl text-white'>
							<div className='text-center flex items-center justify-center text-4xl'>
								<GiWatch />
							</div>
							Men
						</div>
					</Link>
				</div>
				<div className=' cursor-pointer bg-primary  relative active overflow-hidden ' >
					<img className='w-full h-full p-5 ' src={categoryWomen} />
					<Link to='women'>
						<div className='absolute opacity-0 top-0 left-0 bg-black w-full h-full activetop transition ease-in-out duration-500 grid place-content-center text-2xl text-white'>
							<div className='text-center flex items-center justify-center text-4xl'>
								<GiWatch />
							</div>
							Women
						</div>
					</Link>
				</div>
				<div className=' cursor-pointer bg-primary relative active overflow-hidden'>
					<img className='w-full h-full p-5 ' src={categoryClock} />
					<Link to='clock'>
						<div className='absolute opacity-0 top-0 left-0 bg-black w-full h-full activetop transition ease-in-out duration-500 grid place-content-center text-2xl text-white'>
							<div className='text-center flex items-center justify-center text-4xl'>
								<MdOutlineWatchLater />
							</div>
							Clock
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Category