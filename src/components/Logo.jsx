import { NavLink } from 'react-router-dom'
import logo from '../assets/Images/BannerImg/wall-clock.png'

const Logo = ({ white }) => {
	return (
		<div>
			<NavLink to='/'>
				<div className='flex items-center gap-2 cursor-pointer'>
					<img className='w-10' src={white ? white : logo} />
					<div className=''>
						<div className='mt-1 text-2xl uppercase font-extendfont leading-[1rem]'>star watch</div>
						<div className='font-extendfont9 tracking-[0.1rem] text-[30px] leading-[1rem]'>Tanvir Rana</div>
					</div>
				</div>
			</NavLink>
		</div>
	)
}

export default Logo