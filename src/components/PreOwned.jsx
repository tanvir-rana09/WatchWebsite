import video from '../assets/Images/BannerImg/video00.mp4'
import HeroText from './HeroText'
const PreOwned = () => {
	return (
		<div className='relative overflow-hidden xl:h-[44rem] lg:h-[35rem] h-[30rem] w-full lg:mb-10  '>
			<div>
				<div className='w-full h-full '>
					<video className="w-full" loop autoPlay muted >
						<source src={video} type="video/mp4" />
					</video>

				</div>

			</div>
			<div className='absolute 2xl:top-[-5rem] xl:top-[-10rem] lg:top-[-14rem] md:top-[-10rem] sm:top-[-8rem] top-[-14rem] left-0 w-full '>
				<HeroText heading='Pre-Owned Watches' pText='Shop luxury pre-owned watches' pLast='authenticated by our expert team of watchmakers.' css='text-white' />
			</div>
		</div>
	)
}

export default PreOwned