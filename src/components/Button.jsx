
const Button = ({text,background='hover:text-white hover:bg-[#030712] bg-white'}) => {
  return (
	<div>
		<button className={`uppercase leading-2 tracking-widest px-3 lg:px-10 lg:py-3 py-1 text-xs duration-300 ${background}`}> {text}</button>
	</div>
  )
}

export default Button