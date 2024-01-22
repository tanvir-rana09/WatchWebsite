import { NavLink } from "react-router-dom"


const Navlist = ({
	hidden,
	zero,
	child,
	lastchild,
}) => {
	return (
		<div>
			<ul className={`lg:flex justify-center gap-4 ${hidden}`} >
			<li className={child}>
					<NavLink to='/'
					className={({ isActive }) =>` ${isActive?'actives':'list'}  `}
					>
						Home
					</NavLink>
				</li>
				<li className={child}>
					<NavLink to='/allwatches'
					className={({ isActive }) =>` ${isActive?'actives':'list'} `}
					>
						All Watch
					</NavLink>
				</li>
				<li className={child}>
					<NavLink to='/men'
					className={({ isActive }) =>` ${isActive?'actives':'list'}`}
					>
						Men
					</NavLink>
				</li>
				<li className={child}>
					<NavLink to='/women'
					className={({ isActive }) =>` ${isActive?'actives':'list'}`}
					>
						Women
					</NavLink>
				</li>
				<li className={child}>
					<NavLink to='/clock'
					className={({ isActive }) =>` ${isActive?'actives':'list'} `}
					>
						Clock
					</NavLink>
				</li>
				<li className={child}>
					<NavLink to='/blog'
					className={({ isActive }) =>` ${isActive?'actives':'list'} `}
					>
						Blog
					</NavLink>
				</li>
				<li className={child}>
					<NavLink to='/about'
					className={({ isActive }) =>` ${isActive?'actives':'list'}`}
					>
						About
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default Navlist