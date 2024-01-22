import BlogCom from "../components/BlogCom"
import Blogs from '../components/Blogs'
import banner from '../assets/Images/BannerImg/BlogBanner.jpg'
const Blog = () => {
  return (
    <div>
      <div>
      <div className="">
          <div className="relative h-full w-full">
            <img className="h-full  w-full" src={banner} />
          </div>
        </div>
        <Blogs />
        <BlogCom />
      </div>
    </div>
  )
}

export default Blog