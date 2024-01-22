import Heading from "./Heading"
import blog1 from '../assets/Images/BannerImg/BlogImg (1).jpg'
import blog2 from '../assets/Images/BannerImg/BlogImg (2).jpg'
import blog3 from '../assets/Images/BannerImg/BlogImg (3).jpg'
import StoryComp from "./StoryComp"


const Blog = () => {
  const blogs = [
    {
      img: blog1,
      head: 'Timeless Elegance: Exploring the Art of Watchmaking',
      bio: `In the intricate world of horology, watches transcend mere timekeeping; they embody craftsmanship and style. From the meticulous assembly of gears to the finest details of dial design, each timepiece is a testament to the art of watchmaking. Precision meets aesthetics as Swiss precision and Japanese innovation converge, shaping the industry's landscape. `
    },
    {
      img: blog2,
      head: 'Wrist Chronicles: A Symphony of Moments on Your Watch',
      bio: `Embark on a wrist-bound journey where time isn't just measured but embraced. Watches, more than accessories, are storytellers. From classic leather straps to modern titanium innovations, each watch narrates a chapter of one's life. Explore the fusion of tradition and technology as watchmakers push boundaries. Uncover the allure of limited editions, where exclusivity meets craftsmanship.`
    },
    {
      img: blog3,
      head: 'Beyond Time: The Fusion of Art and Functionality in Watch Design',
      bio: `In the realm of horological design, watches cease to be mere timekeepers; they metamorphose into wearable art. This exploration delves into the fusion of aesthetics and functionality, where each watch is a canvas for creativity. Discover the avant-garde designs of independent watchmakers pushing the boundaries of convention.`
    },
  ]
  return (
    <div>
      <div>
       
        <Heading text='Latest Blog Posts' link='blog' />
        {
          <div className="grid lg:grid-cols-3 md:grid-cols-2 px-5 gap-5 xl:gap-20 w-full 2xl:px-[15%]">
            {
              blogs.map((texts, i) => {
                return <StoryComp key={i} img={texts.img} heading={texts.head} storyText={texts.bio} />
              })
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Blog