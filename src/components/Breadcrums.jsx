import { Link } from "react-router-dom"
import { SlArrowRight } from "react-icons/sl";

const Breadcrums = ({product}) => {
	// console.log(product)
  return (
	<div className="flex items-center gap-1 p-5 bg-primary">
		<p>
			<Link className="hover:text-secondry" to='/'>Home</Link>
		</p>
		<p className="text-xl"><SlArrowRight /></p>
		<p>
			<Link className="hover:text-secondry" to={`/${product.category}`}>
			{product.category}
			</Link>
		</p>
		<p className="text-xl"><SlArrowRight /></p>
		<p>{product.name}</p>
		
	</div>
  )
}

export default Breadcrums