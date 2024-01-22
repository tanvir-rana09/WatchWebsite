import StoryComp from "./StoryComp"

const Story = () => {
	const stories = [
		{
			head: 'GLOBAL INVENTORY',
			bio: `We're not a marketplace, we're the market leader. This means we own every watch we sell, allowing us to set superior standards across the globe. With offices in the United States, Hong Kong, Singapore, and beyond, our selection is ever-changing with thousands of luxury watches available at any given time.`
		},
		{
			head: 'EXPERT SERVICE',
			bio: `Our in-house team of Swiss-trained watchmakers and refinishers are among the best in the industry. From routine maintenance to heavy water damage, our team of experts provide full support with factory-sourced parts for first-class service to the secondary marketplace.`
		},
		{
			head: 'INSIDER INSIGHTS',
			bio: `Behind the scenes, there's a team of over 160 watch-lovers ready to share their passion with you. Ask them anything, from watch history to the pulse of the market. We've got a team ready around the world to help you find your dream watch - and they're just a chat, email, or phone call away.`
		},
	]
	return (
		<div >
			<div className="grid place-content-center w-full gap-5 ">
				<h1 className="text-3xl uppercase tracking-widest text-center py-2 bg-primary font-extendfont1">Our Story</h1>
				<div className="grid md:grid-cols-3 px-5 gap-5 xl:gap-20 w-full 2xl:px-[15%]">
					{
						stories.map((texts, i) => {
							return <StoryComp key={i} heading={texts.head} storyText={texts.bio} />
						})
					}
				</div>
			</div>
		</div>
	)
}

export default Story