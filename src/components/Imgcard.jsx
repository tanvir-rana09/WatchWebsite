import { NavLink } from "react-router-dom";

const Imgcard = ({ img, price, name ,id}) => {

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	}
	return (
		<NavLink to={`/product/${id}`}>
			<div
			onClick={goToTop}
			className='flex flex-col items-center gap-5 cursor-pointer transition w-full ease-in-out duration-1000 '>
				<div className='bg-primary w-72 h-80 flex overflow-hidden items-center justify-center'>
					<img className=' hover:scale-110 duration-700' src={`../${img}`} alt={`Product: ${name}`} />
				</div>
				<div className='text-center uppercase tracking-widest flex flex-col gap-2'>
					<p className='hover:text-secondry font-extendfont5'>{name}</p>
					<p className='hover:text-secondry font-semibold'>{price}$</p>
				</div>
			</div>
		</NavLink>
	);
};

export default Imgcard;