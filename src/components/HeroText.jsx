import { Link } from "react-router-dom";
import Button from "./Button";

const HeroText = ({ pText, pLast = null, heading, headingLast, css = 'text-[#030712]' }) => {
	return (
		<div>
			<div className="absolute lg:top-96 md:top-72 top-64 left-4 md:left-10 flex flex-col 2xl:px-[15%]">
				<p className={`tracking-widest text-sm xl:text-xl ${css}`}>{pText} <br /> {pLast}</p>
				<h1 className={`lg:text-6xl font-extendfont7 font-semibold uppercase lg:mb-5 mb-2 lg:mt-2 text-3xl ${css}`}>{heading} <br /> {headingLast}</h1>
				<div className="flex lg:gap-8 gap-4 lg:mt-5">
					<Link to='allwatches'>
						<Button text='order now' />
					</Link>
					<Link to='/about'>
						<Button text='Learn more' background='bg-[#030712] text-white hover:text-black hover:bg-white' />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default HeroText;