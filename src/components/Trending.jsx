import Slickcaousel from './Slickcaousel';
import Heading from "./Heading"
import trandy from '../assets/P_details/Trendy';


const Trending = () => {
	return (
		<div>
			<div >
				<Heading text='Most Trending Watches' />
				<div className="2xl:px-[15%]">

				<Slickcaousel  images={trandy} link='allwatches'/>
				</div>
			</div>
		</div>
	)
}

export default Trending