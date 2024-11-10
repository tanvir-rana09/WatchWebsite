import Slider from 'react-slick';
import Imgcard from './Imgcard'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

const Slickcaousel = ({ images }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const calculateSlidesToShow = (width) => {
		if (width > 1200) {
			return 4; // Number of slides to show on large screens
		} else if (width > 992) {
			return 3; // Number of slides to show on medium-sized screens
		} else if (width > 768) {
			return 2; // Number of slides to show on smaller medium-sized screens
		} else {
			return 1; // Number of slides to show on small screens
		}
	};

	const settings = {
		infinite: true,
		slidesToShow: calculateSlidesToShow(windowWidth),
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		speed: 500,
		prevArrow: <MdOutlineArrowBackIosNew />,
		nextArrow: <MdOutlineArrowForwardIos />

	};


	return (
		<div >
			<Slider {...settings}>
				{
					images?.map((img, i) => {
						return <Imgcard key={i} img={img.img} name={img.name} price={img.oldPrice} id={img.id} />
					})
				}
			</Slider>
		</div>
	);
};

export default Slickcaousel;
