import hero1 from '../assets/Images/BannerImg/Herosection.jpg'
import hero2 from '../assets/Images/BannerImg/Hero2.jpg'
import hero3 from '../assets/Images/BannerImg/Hero3.jpg'
import hero4 from '../assets/Images/BannerImg/Hero4.jpg'
import hero5 from '../assets/Images/BannerImg/Hero5.jpg'
import hero6 from '../assets/Images/BannerImg/Hero6.jpg'
import { useEffect, useState } from 'react'
import HeroText from './HeroText'

const images = [
	hero1,
	hero2,
	hero3,
	hero4,
	hero5,
	hero6,
	// Add more image URLs as needed
];

const FadeCarousel = () => {
	const [currentImage, setCurrentImage] = useState(0);

	const next = () => {
		setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
	};

	useEffect(() => {
		const intervalId = setInterval(next, 3000);

		return () => clearInterval(intervalId);
	}, []);

	const handleSlideClick = (index) => {
		clearInterval(intervalId); // Pause the carousel when a slide is clicked
		setCurrentImage(index);
	};

	return (
		<div>
			<div className=''>
				<div className="flex overflow-hidden xl:h-[50rem] w-full lg:h-[40rem] md:h-[30rem] h-[20rem] relative">
					{images.map((image, index) => (
						<div
							key={index}
							className={`opacity-0 transition ease-in-out duration-1000 w-full h-full absolute ${index === currentImage ? 'opacity-100' : ''}`}
							onClick={() => handleSlideClick(index)}
						>
							<img className='w-full h-full object-cover' src={image} alt={`Slide ${index + 1}`} />
						</div>
					))}
				</div>
				<div className='flex flex-col gap-2 md:gap-4 absolute right-0 lg:top-[22rem] md:top-[15rem] top-[12rem] px-3 lg:px-5 '>
					{
						images.map((img, i) => {
							return <div
								onClick={() => setCurrentImage(i)}
								key={i} className={`md:h-8 h-6 w-1 ${currentImage == i ? 'bg-gray-700' : 'bg-gray-400'} z-50 rounded-full transition ease-in-out duration-1000 cursor-pointer`}>
									
								</div>
						})
					}
				</div>
			</div>
			<HeroText pText='Available Now' heading={`Coustom Watches`} headingLast='For Any Occasion' />
		</div>
	);
};

export default FadeCarousel;
