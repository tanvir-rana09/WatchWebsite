import { useContext } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { WatchContext } from "../context/Context";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Slice";

const WatchDetails = ({ product }) => {
	const { addtoCart } = useContext(WatchContext)
	const dispatch = useDispatch()
	const handleCart = (product) => {
		addtoCart(product.id);
		dispatch(addToCart(product));
	}

	return (
		<div className='2xl:px-[15%] md:p-5 p-3 flex flex-col gap-10'>
			<div className='grid grid-cols-1 md:grid-cols-2 place-content-center  '>
				<div className='bg-primary lg:w-[30rem] h-full m-auto flex items-center'>
					<img src={`../${product.img}`} />
				</div>
				<div className='flex flex-col md:px-5 lg:px-0'>
					<h1 className='lg:text-4xl text-3xl font-extendfont7'>{product.name}</h1>
					<p className='font-semibold py-5 '>{product.oldPrice}$</p>
					<p className=' border-b font-semibold py-3 pb-8 flex items-center gap-1'>Rating : {product.rating} <span className="text-yellow-500"> <FaStar /></span></p>
					<p className='pt-5 opacity-70 hover:opacity-100 cursor-pointer'>
						It seems like your question is a bit unclear. If you're asking about information related to a "watch" and "text" in some specific context, could you please provide more details or clarify your question? Are you interested in the history of watches, how to read a watch, or something else? Additionally, what do you mean by "watch text"? Any additional information you can provide will help me give you a more accurate and relevant response.
					</p>

					<div className='flex gap-5 py-5'>
						<div className='border p-2 px-4 flex items-center gap-5'>
							<button>-</button>
							<span>1</span>
							<button>+</button>
						</div>
						<div className=''>

							<button
								onClick={() => handleCart(product)}
								className='bg-forth text-white uppercase text-sm py-3 px-12 font-semibold duration-300 hover:bg-white hover:text-black border'>add to cart</button>

						</div>
					</div >

				</div>
			</div>
			<div className="flex flex-col gap-10 ">
				<div >
					<h1 className='my-5 font-extendfont4 text-xl uppercase py-3 bg-primary'>Details </h1>
					<div>
						<p className=' border-y font-semibold py-3'>In Stock</p>
						<p className=' border-b font-semibold py-3'>Manufactured In : USA</p>
						<p className=' border-b font-semibold py-3 capitalize'>For : {product.category}</p>
						<p className=' border-b font-semibold py-3 '>Box : <span className='text-green-500'>Yes</span></p>
					</div>
				</div>
				<div className='flex flex-col py-5 '>
					<h1 className=' font-extendfont4 text-xl uppercase py-3 bg-primary'>About {product.name}</h1>
					<div className='grid grid-cols-3 py-5 lg:h-[20rem]'>
						<div className='flex flex-col gap-5 col-span-2'>
							<p>Looking back over the last 50 years of watch design, we’ve taken notes from classic design principles to create this collection, both understated in silhouette and colour palette.</p>

							<p>
								The 7mm case is the thinnest in our collection and is proportionally balanced by an acutely tapered crown. The watch features some of our core branding elements: a red accent on the second hand and modest logo on the face and buckle.
							</p>
						</div>
						<div className='lg:h-[20rem]'>
							<img className='lg:h-full' src={`../${product.img}`} />
						</div>
					</div>

				</div>
				<div className="mt-5">
					<h1 className=' font-extendfont4 text-xl uppercase py-3 bg-primary'>How to preservation</h1>
					<ul className=" pt-4">
						<li>• Duis felis neque porta sed elit</li>
						<li>• Class aptent taciti sociosqu torquent conubia</li>
						<li>• Etiam gravida quis magna posue tincidunt</li>
					</ul>
				</div>
			</div>

		</div>
	)
}

export default WatchDetails