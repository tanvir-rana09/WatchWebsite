import { Link } from 'react-router-dom'
import banner from '../assets/Images/BannerImg/banner-939948.jpg'
import Button from './Button'
import Logo from './Logo'

const Company = () => {
	return (
		<div className='relative '>
			<div>
				<img className='w-full h-full' src={banner} />
			</div>
			<div className='absolute top-1 left-0 flex flex-col gap-1 items-center w-full h-full justify-center md:gap-5'>
				<div className='hidden md:block'>
					<Logo />
				</div>
				<div className='text-2xl sm:text-3xl font-extendfont2 md:text-4xl xl:text-5xl'>
					Since 1971
				</div>
				<div className='text-center sm:text-sm md:text-xl text-sm px-20 md:px-32 lg:px-44 xl:px-[30%]'>
					Join us in ushering in a new era for watch collectors. Discover our locations, global community, curated collections - both new and collectible pre-owned
				</div>
				<div>
					<Link to='about'>
						<Button text='Learn More' />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Company