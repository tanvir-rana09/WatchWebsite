

const BuyDetail = ({icon,text}) => {
  return (
	<div>
		<div className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 duration-300">
			<div>
				<img className="xl:w-20 md:w-14 w-10 " src={icon} alt="icon" />
			</div>
			<div className="text-xs text-center md:text-sm lg:text-lg hover:text-secondry">{text}</div>
		</div>
	</div>
  )
}

export default BuyDetail