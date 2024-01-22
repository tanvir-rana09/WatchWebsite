import { useContext } from "react"
import { WatchContext } from "../context/Context"
import Slickcaousel from "./Slickcaousel"
import Heading from "./Heading"

const RelatedProducts = ({product}) => {
	const {allProducts} = useContext(WatchContext)
	const productSet = allProducts.filter((e)=>e.category==product.category)
  return (
	<div >
		<div>
			<Heading text='similar Products' link='allwatches'/>
		</div>
		<div className="2xl:px-[15%]">
		<Slickcaousel images={productSet}/>
		</div>
	</div>
  )
}

export default RelatedProducts