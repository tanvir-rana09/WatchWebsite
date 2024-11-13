import { useState } from 'react';
import { GrSearch } from "react-icons/gr";

const SearchInput = ({ onSearch, placeholder = 'Search...', className = '' }) => {
	const [query, setQuery] = useState('');

	const handleInputChange = (e) => {
		setQuery(e.target.value);
		if (onSearch) {
			onSearch(e.target.value);
		}
	};

	return (
		<div className={`relative flex items-center ${className}`}>
			<GrSearch
				className="absolute left-3 w-4 h-4 text-gray-400"
			/>

			<input
				type="text"
				value={query}
				onChange={handleInputChange}
				placeholder={placeholder}
				className="w-full rounded border  border-gray-300 focus:ring-2 ring-blue focus:border-none bg-transparent py-2.5 pl-10 pr-10 outline-none focus:border-blue focus-visible:shadow-none text-gray-700"
			/>
		</div>
	);
};

export default SearchInput;
