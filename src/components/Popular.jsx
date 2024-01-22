import Slickcaousel from "./Slickcaousel"
import image from '../assets/P_details/top'
import Heading from "./Heading"

const Popular = () => {
  return (
	<div >
		<Heading text='Our Most Popular Models' link='allwatches'/>
		<div className="2xl:px-[15%]">

		<Slickcaousel images={image} />
		</div>
	</div>
  )
}

export default Popular