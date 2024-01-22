import Imgcard from './Imgcard'
import Trendy from '../assets/P_details/Trendy'
import { useState } from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";


const Carousel = ()=> {

	const [currentImg, setCurrentImg] = useState(0)

	const prev = () => {
		setCurrentImg((previmg) => (currentImg == 0 ? Trendy.length - 1 : previmg - 1))
	}
	const next = () => {
		setCurrentImg((previmg) => (previmg == Trendy.length - 1 ? 0 : previmg + 1))
	}

	return(
		<div  className = 'relative overflow-hidden w-full' >
			<div className='flex gap-5 overflow-hidden snap-center'>
					{
						Trendy.map((img, i) => {
							return <Imgcard key={i} img={img.img} name={img.name} price={img.oldPrice} currentImg={currentImg} id={img.id} />
						})
					}
			</div>
			<div className='absolute w-full top-44 px-5'>
				<div>
					<div className="w-full flex justify-between">
						<div
							onClick={prev}
							className="bg-forth px-4 rounded-full text-white flex py-4 items-center hover:bg-primary hover:text-black text-xl shadow-xl cursor-pointer" ><MdOutlineArrowBackIos /></div>
						<div
							onClick={next}
							className="bg-forth px-4 rounded-full text-white flex py-4 items-center hover:bg-primary hover:text-black text-xl shadow-xl  cursor-pointer" ><MdArrowForwardIos /></div>
					</div>
				</div>
			</div>
			
		</div>
	)
}
export default Carousel