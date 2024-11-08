
const Button = ({text,background='hover:text-white hover:bg-[#030712] bg-white'}) => {
  return (
	<div>
		<button className={`uppercase rounded-sm font-semibold leading-2 tracking-widest px-3 lg:px-10 lg:py-[14px] py-2 text-xs duration-300 ${background}`}> {text}</button>
	</div>
  )
}

export default Button