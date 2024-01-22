import style2 from '../assets/Images/BannerImg/style (2).jpg'
import style3 from '../assets/Images/BannerImg/style (3).jpg'
import style4 from '../assets/Images/BannerImg/style (4).jpg'
import style5 from '../assets/Images/BannerImg/style (5).jpg'
import style6 from '../assets/Images/BannerImg/style (6).jpg'
import style7 from '../assets/Images/BannerImg/style (7).jpg'
import style8 from '../assets/Images/BannerImg/style (8).jpg'
import style9 from '../assets/Images/BannerImg/style (9).jpg'
import style10 from '../assets/Images/BannerImg/style (10).jpg'
import React, { Component } from "react";
import Slider from "react-slick";
const Style = () => {
	const styles = [
		style2,
		style3,
		style4,
		style5,
		style6,
		style7,
		style8,
		style9,
		style10,
	]

	var settings = {
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true
	};
	return (
		<div className='flex flex-col gap-5 my-10'>
			<div >
				<h1 className=' 2xl:text-4xl text-xl text-center uppercase tracking-widest font-extendfont7 font-semibold bg-primary py-3 2xl:px-[15%]'>Our Watch On You</h1>
			</div>
			<div className='forhide 2xl:px-[15%]'>
				<Slider {...settings}>
					{
						styles.map((img, i) => {
							return <div key={i}>
								<img className='w-full h-full cursor-pointer hover:scale-105 duration-500 ' src={img} alt="style" />
							</div>
						})
					}
				</Slider>
			</div>
		</div>
	)
}

export default Style