import { IoSearch } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { WatchContext } from '../context/Context';
import { useContext } from "react";
const Search = () => {
	const {searchvalue,setSearchvalue}=useContext(WatchContext)
	return (
		<div>
			<div className="bg-gray-100 flex items-center px-2 rounded-sm py-2 mx-auto">
				<input
				onChange={(e)=>setSearchvalue(e.target.value.toLowerCase())}
				value={searchvalue}
				className="bg-transparent outline-none w-full" type="text" name="text" placeholder="Search Your Products... " />
				<NavLink to='/searchitems'>
					<button className="text-2xl pl-2 flex"><IoSearch /></button>
				</NavLink>
			</div>
		</div>
	)
}

export default Search