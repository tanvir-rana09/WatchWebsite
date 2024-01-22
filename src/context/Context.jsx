import { createContext, useState } from "react";
import allProducts from "../assets/P_details/Allproducts";

const WatchContext = createContext(null);

const getDefaultCart = () => {
	let cart = {};
	for (let index = 0; index < allProducts.length + 1; index++) {
		cart[index] = 0
	}
	return cart
}
const WatchContextProvider = ({ children }) => {

  let [cartitems, setCartitems] = useState(getDefaultCart)
  // console.log(cartitems)

  // addtoCart
  const addtoCart = (itemId) => {
    setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  }
  // removefromCart
  const removefromCart = (itemId) => {
    setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartitems) {
      if (cartitems[item] > 0) {
        const iteminfo = allProducts.find((product) => product.id == item)

        totalAmount += iteminfo.oldPrice * cartitems[item];
        // console.log(iteminfo.oldPrice)
        // console.log(cartitems[item])
      }
    }
    // console.log(totalAmount)
    return totalAmount;
  }
//  console.log( getTotalCartAmount())
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartitems) {

      totalItem += cartitems[item];

    }
    // console.log(totalItem)
    return totalItem
  }


  getTotalCartItems()
  const [searchvalue, setSearchvalue] = useState([])
  return (
    <WatchContext.Provider value={{ allProducts, searchvalue, setSearchvalue, addtoCart, removefromCart, getTotalCartItems, getTotalCartAmount,cartitems }}>
      {children}
    </WatchContext.Provider>
  );
}

export { WatchContext, WatchContextProvider }
