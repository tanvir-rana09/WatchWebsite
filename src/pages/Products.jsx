import watches from '../assets/P_details/Allproducts'
import Imgcard from '../components/Imgcard'
import bannerWomen from '../assets/Images/BannerImg/bannerWomen.mp4'
import bannerMen from '../assets/Images/BannerImg/bannerMen.mp4'
import bannerClock from '../assets/Images/BannerImg/bannerClock.mp4'
import Allbanner from '../assets/Images/BannerImg/Allbanner.mp4'
import allHeadings from '../assets/P_details/HeadingCategory'
import BuyDetails from '../components/BuyDetails'

const Products = ({ category }) => {
  const banners = [
    1
  ]
  return (
    <div>
      <div className=''>
        <div className=' w-full relative'>
          <div className='h-full w-full'>
          {
            banners.map((vid, i) => {
              if (category === 'allwatches') {
                return <video className='h-full w-full ' key={i} src={Allbanner} type="video/mp4" autoPlay muted loop />
              } else if (category === 'men') {
                return <video className='h-full w-full' key={i} src={bannerMen} type="video/mp4" autoPlay muted loop />
              } else if (category === 'women') {
                return <video className='h-full w-full ' key={i} src={bannerWomen} type="video/mp4" autoPlay muted loop />
              } else if (category === 'clock') {
                return <video className='h-full w-full ' key={i} src={bannerClock} type="video/mp4" autoPlay muted loop />
              }
            })
          }
          </div>
        </div>
        <div>
          <div className=' font-extendfont9 text-lg lg:text-4xl xl:text-5xl flex text-center flex-col w-full  my-20'>
            <li className='font-extendfont7 uppercase tracking-widest text-sm lg:text-lg xl:text-xl list-disc bg-primary py-3'>{category}</li>
            {
              allHeadings.map((heading,i)=>{
                if(heading.cat==category){
                  return <h1 key={i}>{heading.head}</h1>
                }
              })
            }
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:px-[15%] mt-20'>

        {
          watches.map((item, i) => {
            if (item.category == category) {
              return <Imgcard key={i} img={item.img} price={item.oldPrice} name={item.name} id={item.id} category={category}/>
            } else if (category == 'allwatches') {
              return <Imgcard key={i} img={item.img} price={item.oldPrice} name={item.name} id={item.id} category={category}/>
            }
          })
        }
      </div>
      <BuyDetails/>
    </div>
  )
}

export default Products