import { useContext } from "react"
import { WatchContext } from "../context/Context"
import Imgcard from './../components/Imgcard';

const SearchDisplay = () => {
  const {searchvalue,allProducts}=useContext(WatchContext)
  let searchItems = allProducts.filter((e)=>e.name.toLowerCase().includes(searchvalue)) 
  // searchItems += allProducts.filter((e)=>e.category.toLowerCase().includes(searchvalue))

  console.log(searchItems)
  return (
	<div>
    <div className="bg-primary py-4 text-3xl font-extendfont4 italic 2xl:px-[15%]">Your Search Results :</div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:px-[15%] my-20'>
    {
      searchvalue==''?<h1 className="text-center w-full text-3xl">Search Something.......</h1>:searchItems.map((item,i)=>{
        return <Imgcard key={i} img={item.img} price={item.oldPrice} name={item.name} id={item.id}/>
      })
    }
    </div>
  </div>
  )
}

export default SearchDisplay