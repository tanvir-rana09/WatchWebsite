import { Link } from 'react-router-dom'
import icon from '../assets/Images/BannerImg/system-solid-161-trending-flat.gif'

const Heading = ({ text,link }) => {
	return (
		<div>
			<Link to={`/${link}`}>
				<div className='flex items-center justify-between my-5 px-2 bg-primary py-2 2xl:px-[15%]'>
					<h1 className="xl:text-3xl  lg:text-2xl uppercase font-extendfont7 font-semibold">{text}</h1>
					<div className='flex items-center cursor-pointer hover:bg-white px-5 py-1 justify-between gap-2 rounded-full jus'>
						<p>See All</p>
						<img className='w-8 ' src={icon} />
					</div>
				</div>
			</Link>
		</div>
	)
}

export default Heading