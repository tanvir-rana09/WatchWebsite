

const StoryComp = ({heading,storyText,img=null}) => {
  return (
	<div>
		<div className="flex flex-col text-justify">
			<img src={img}/>
			<h1 className="text-xl py-2 font-extendfont7 font-semibold">{heading}</h1>
			<p>{storyText}</p>
		</div>
	</div>
  )
}

export default StoryComp