// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import Home from './pages/Home.jsx'
// import Products from './pages/Products.jsx'
// import Blog from './pages/Blog.jsx'
// import About from './pages/About.jsx'
// import Contact from './pages/Contact.jsx'
// import Cart from './pages/Cart.jsx'
// import SearchItems from './pages/SearchItems.jsx'
// import Product from './components/Product.jsx'
// import './index.css'
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
// import { WatchContextProvider } from './context/Context.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
    
//     <Route path='/' element={<App />}>
//       <Route path='' element={<Home />} />
//       <Route path='product' element={<Product />}>
//         <Route path=':productId' element={<Product />} />
//       </Route>
//       <Route path='allwatches' element={<Products category='allwatches' />} />
//       <Route path='men' element={<Products category='men' />} />
//       <Route path='women' element={<Products category='women' />} />
//       <Route path='clock' element={<Products category='clock' />} />
//       <Route path='blog' element={<Blog />} />
//       <Route path='about' element={<About />} />
//       <Route path='cart' element={<Cart />} />
//       <Route path='contact' element={<Contact />} />
//       <Route path='searchitems' element={<SearchItems />} />
//     </Route>
//   )
// )

// ReactDOM.createRoot(document.getElementById('root')).render(

//   <React.StrictMode>
//     <WatchContextProvider>
//       <RouterProvider router={router} />
//     </WatchContextProvider>
//   </React.StrictMode>
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Blog from './pages/Blog.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import SearchItems from './pages/SearchItems.jsx';
import Product from './components/Product.jsx';
import './index.css';
import { WatchContextProvider } from './context/Context.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="product" element={<Product />}>
        <Route path=":productId" element={<Product />} />
      </Route>
      <Route path="allwatches" element={<Products category="allwatches" />} />
      <Route path="men" element={<Products category="men" />} />
      <Route path="women" element={<Products category="women" />} />
      <Route path="clock" element={<Products category="clock" />} />
      <Route path="blog" element={<Blog />} />
      <Route path="about" element={<About />} />
      <Route path="cart" element={<Cart />} />
      <Route path="contact" element={<Contact />} />
      <Route path="searchitems" element={<SearchItems />} />
    </Route>
  </Routes>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WatchContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </WatchContextProvider>
  </React.StrictMode>
);
