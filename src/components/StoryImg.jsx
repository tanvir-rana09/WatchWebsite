import repair from '../assets/Images/BannerImg/Repair.jpg'

const StoryImg = () => {
	return (
		<div>
			<div className='grid md:grid-cols-2 grid-cols-1 2xl:px-[15%] grid-rows-2 md:grid-rows-1'>
				<div className='bg-[#050604] text-white grid place-content-center text-center capitalize gap-5 px-3 lg:px-24 md:px-5'>
					<h1 className='font-semibold font-extendfont7 lg:text-4xl text-xl'>Star Watch the world’s leading watch house.</h1>
					<p className='text-sm'>
						We’re more than connoisseurs - we are collectors too. We would never tell you to buy a watch we would not buy ourselves first.

					</p>
				</div>
				<div>
					<img src={repair} alt="watch repair" />
				</div>
			</div>
		</div>
	)
}

export default StoryImg