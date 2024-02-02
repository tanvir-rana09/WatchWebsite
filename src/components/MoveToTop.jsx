import arrow from '../assets/Images/BannerImg/right-arrow.png'


import { useEffect, useState } from "react"

const MoveToTop = () => {
	const [top, setTop] = useState(false)

	useEffect(()=>{
		window.addEventListener('scroll', () => {
			if (window.scrollY > 200) {
				setTop(true)
			} else {
				setTop(false)
			}
		})
	},)

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	}

	return (
		<div className="relative">
			<div className={`goTopStyle0 ${top ? "opacity-100 duration-1000 top-[55rem] md:top-[53rem]" : "opacity-0 duration-1000 -top-44"} `}>
				<div className="goTopStyle1">
					<div
						onClick={goToTop}
						className="goTopStyle2">
						<div className="md:text-2xl text-xl -rotate-90">
							<img className='w-8 md:w-10' src={arrow} alt="arrow" />
							{/* <BsArrowUp /> */}
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}

export default MoveToTop