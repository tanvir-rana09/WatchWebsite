import Company from "../components/Company"
import Hero2 from "../components/Hero2"
import New from "../components/New"
import PreOwned from "../components/PreOwned"
import Style from "../components/Style"
import Trending from "../components/Trending"
import Category from "../components/Category"
import BuyDetails from "../components/BuyDetails"
import Popular from "../components/Popular"
import Story from "../components/Story"
import Blogs from "../components/Blogs"
import StoryImg from "../components/StoryImg"

const Home = () => {
  return (
	<div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
		<Hero2/>
		<Trending/>
		<PreOwned/>
		<New/>
		<Company/>
		<Style/>
		<StoryImg/>
		<Category/>
		<Popular/>
		<Story/>
		<Blogs/>
		<BuyDetails/>
	</div>
  )
}

export default Home