import { useParams } from 'react-router-dom';
import Breadcrumbs from './Breadcrums'; // Corrected typo in the import
import { useContext } from 'react';
import { WatchContext } from '../context/Context';
import WatchDetails from './WatchDetails';
import BuyDetails from './BuyDetails';
import RelatedProducts from './RelatedProducts';

const Products = () => {

  const { productId } = useParams();
  const { allProducts } = useContext(WatchContext)
  const product = allProducts.filter((e) => e.id === Number(productId))[0];
 
// console.log(product)
// console.log(productList)
//   useEffect(()=>{
//     const set = ()=>{
//       // setProductList(product)
//     }
//     set()
    
//   },[productId,product,setProductList,productList])

  return (
    <div className='flex flex-col gap-20'>
      <Breadcrumbs product={product} />
      <WatchDetails product={product}/>
      <RelatedProducts product={product}/>
      <BuyDetails/>
    </div>
  );
}

export default Products;
