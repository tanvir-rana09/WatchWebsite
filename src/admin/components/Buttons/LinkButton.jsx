import { Link } from "react-router-dom";

const LinkButton = ({ label='', Icon = null, url, className = "" }) => {
	const baseStyles = 'px-4 py-3 rounded text-white flex items-center justify-center bg-blue hover:bg-blue/95  focus:outline-none transition-all duration-200';
	return (
		<Link className={` ${className} ${baseStyles}`} to={url}>
			{Icon && <Icon className="mr-2" />}
			{label}
		</Link>
	);
}

export default LinkButton;
