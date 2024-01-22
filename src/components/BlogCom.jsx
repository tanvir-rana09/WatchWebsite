import blog10 from '../assets/Images/BannerImg/BlogImg (10).jpg'
import blog5 from '../assets/Images/BannerImg/BlogImg (5).jpg'
import blog6 from '../assets/Images/BannerImg/BlogImg (6).jpg'
import blog7 from '../assets/Images/BannerImg/BlogImg (7).jpg'
import blog8 from '../assets/Images/BannerImg/BlogImg (8).jpg'
import blog9 from '../assets/Images/BannerImg/BlogImg (9).jpg'
import StoryComp from './StoryComp'

const BlogCom = () => {
	const blogs = [
		{
			img: blog10,
			head: 'Horological Heritage: Exploring the Art of Watchmaking Through History',
			bio: `ChronoCraft: Mastering the Art of Collecting Rare and Limited Edition Watches. Explore the allure of exclusive timepieces that captivate collectors worldwide, blending innovation with timeless elegance.`
		},
		{
			img: blog5,
			head: 'Luxury on the Wrist: A Guide to High-End Watch Collections',
			bio: `Wristwatch Wisdom: Decoding the Intricacies of Watch Movements. Dive into the mechanical marvels that power your favorite watches, unraveling the precision and craftsmanship beneath the dial.`
		},
		{
			img: blog6,
			head: 'Horological Heritage: Exploring the Art of Watchmaking Through History',
			bio: `Strap Styles: A Comprehensive Guide to Watch Bands. From leather to metal, discover the world of watch straps and find the perfect match for every occasion, elevating your timepiece game.`
		},
		{
			img: blog7,
			head: 'Digital Dials: The Evolution of Smartwatches and Wearable Tech',
			bio: `Hidden Gems: Unearthing Vintage Watches with Character. Embark on a journey through time as we explore the charm and history behind vintage watches, each one telling a unique story.`
		},
		{
			img: blog8,
			head: 'Vintage Vibes: Navigating the World of Classic and Antique Watches',
			bio: `Horological Haute Couture: The Fusion of Fashion and Watch Design. Witness the intersection of style and precision, as luxury brands collaborate with fashion icons to create stunning timekeeping masterpieces.`
		},
		{
			img: blog9,
			head: 'Sports Chronometers: The Perfect Watches for Active Lifestyles',
			bio: `Beyond the Bezel: Exploring Complications in Watchmaking. Delve into the complexities of complications, from tourbillons to perpetual calendars, understanding the intricate features that make watches true marvels of engineering.`
		},
	]
	return (
		<div>
			
			<div>
				<h1 className='bg-primary text-4xl uppercase py-3 tracking-widest px-3 my-20 2xl:px-[15%] text-center'>Preveus Blogs</h1>
			</div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 px-5 xl:gap-20 w-full 2xl:px-[15%] mb-10 gap-5">
				{

					blogs.map((texts, i) => {
						return <StoryComp key={i} img={texts.img} heading={texts.head} storyText={texts.bio} />
					})

				}
			</div>
		</div>
	)
}

export default BlogCom