import { Route, Routes } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../pages/Home.jsx';
import Products from '../pages/Products.jsx';
import Blog from '../pages/Blog.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Cart from '../pages/Cart.jsx';
import SearchItems from '../pages/SearchItems.jsx';
import Product from '../components/Product.jsx';
import Admin from '../Admin.jsx';
import SignIn from '../pages/Signin.jsx';
import SignUp from '../pages/Signup.jsx';
import Dashboard from '../admin/pages/Dashboard.jsx';
import AdminProducts from '../admin/pages/Products.jsx';
import Orders from '../admin/pages/Orders.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const AppRoutes = () => (
	<Routes>

		<Route path='/signin' element={<SignIn />} />
		<Route path='/signup' element={<SignUp />} />

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
		<Route path="/admin" element={<Admin />}>
			<Route index element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} />
			<Route path="products" element={<ProtectedRoute ><AdminProducts /></ProtectedRoute>} />
			<Route path="orders" element={<ProtectedRoute ><Orders /></ProtectedRoute>} />
			<Route path="categories" element={<ProtectedRoute ><Orders /></ProtectedRoute>} />
		</Route>
	</Routes>
);

export default AppRoutes;