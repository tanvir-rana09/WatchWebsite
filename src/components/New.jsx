import Slickcaousel from "./Slickcaousel"
import newImages from '../assets/P_details/new.js'
import Heading from "./Heading.jsx"

const New = () => {
  return (
	<div>
		<div className="sm:-mt-20 -mt-44 md:-mt-1">
			<Heading text='New Added' link='allwatches'/>
			<div className="2xl:px-[15%]">

			<Slickcaousel images={newImages}/>
			</div>
		</div>
	</div>
  )
}

export default New