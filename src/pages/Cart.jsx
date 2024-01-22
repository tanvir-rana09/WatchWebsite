import { useContext } from "react"
import { WatchContext } from "../context/Context"
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { allProducts, getTotalCartAmount, removefromCart, cartitems } = useContext(WatchContext)
  return (
    <div>
      <div>
        <div>
          <div className="lg:p-5 p-1 xl:px-[15%] pb-64">
            <h1 className="text-2xl my-10 font-medium uppercase font-extendfont7 tracking-widest bg-primary py-3 text-center">Your Cart Items</h1>
            <div className="grid grid-cols-6 font-medium border border-slate-500">
              <p className="border-r text-center border-slate-500 py-2">Products</p>
              <p className="border-r text-center border-slate-500 py-2">Title</p>
              <p className="border-r text-center border-slate-500 py-2">Price</p>
              <p className="border-r text-center border-slate-500 py-2">Quantity</p>
              <p className="border-r text-center border-slate-500 py-2">Total</p>
              <p className=" text-center py-2">Remove</p>
            </div>
            {/* <hr className=" my-2 border-collapse border-x-0 border-b-0 border-slate-500 border "/> */}
            {
              allProducts.map((e, i) => {
                if (cartitems[e.id] > 0) {
                  console.log(cartitems)
                  return (
                    <div key={i}>
                      <div className="grid grid-cols-6 items-center border-t-0  font-medium border border-slate-500 py-3 ">
                        <img src={e.img} className=" w-14 m-auto rounded-sm " />
                        <p className="text-xs w-3/4 text-center ml-5">{e.name}</p>
                        <p className=" text-center">${e.oldPrice}</p>
                        <p className=" text-center ">{cartitems[e.id]}</p>
                        <p className=" text-center">${e.oldPrice * cartitems[e.id]}</p>
                        <i className=" p-2 text-center hover:bg-gray-300 rounded-full w-8 m-auto" onClick={() => { removefromCart(e.id) }}><MdDelete /></i>
                      </div>
                    </div>
                  )
                } else { return null }
              })

            }
            <div className="flex justify-between w-full items-center lg:flex-row flex-col">
              <div className="lg:w-[60%] w-full">
                <div >
                  <h1 className="text-2xl mt-10 font-medium">Cart Totals</h1>
                  <div className="flex justify-between border border-b-1 border-x-0 border-t-0 border-slate-500 py-2">
                    <p>Subtotal</p>
                    <p>${
                      getTotalCartAmount()
                    }</p>
                  </div>
                  <div className="flex justify-between border border-b-1 border-x-0 border-t-0 border-slate-500 py-2">
                    <p>Shipping fee</p>
                    <p>Free</p>

                  </div>
                  <div className="flex justify-between border border-b-1 border-x-0 border-t-0 border-slate-500 py-2">
                    <p>Total</p>
                    <p>${getTotalCartAmount()}</p>
                  </div>
                </div>
                <button className="bg-sky-500 font-medium py-2 px-5 my-5 text-white hover:bg-sky-600">PROCEED TO CHECKOUT</button>
              </div>

              <div className="p-2 lg:w-[40%] w-full flex flex-col gap-5 ml-5">
                <p className="font-medium">If You Have a Promo Code , enter here</p>
                <div className=" flex justify-between shadow-md bg-slate-100 rounded-full">
                  <input className="p-2 rounded-full outline-none pl-4 bg-transparent w-full " type="text " placeholder="Enter Your Code..." />
                  <button className="bg-sky-500 font-medium text-white hover:bg-sky-600 rounded-r-full px-4">Submit</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart