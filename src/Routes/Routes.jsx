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
import NoneProtectedRoute from './NoneProtectedRoute.jsx';
import { AuthProvider } from '../context/AuthProvider.jsx';
import AddProducts from '../admin/pages/AddProducts.jsx';
import EditProduct from '../admin/pages/EditProduct.jsx';

const AppRoutes = () => (
	<AuthProvider>
		<Routes>
			<Route path='/signin' element={<NoneProtectedRoute><SignIn /></NoneProtectedRoute>} />
			<Route path='/signup' element={<NoneProtectedRoute><SignUp /></NoneProtectedRoute>} />

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
				<Route path="/admin/products" element={<ProtectedRoute ><AdminProducts /></ProtectedRoute>} />
				<Route path="/admin/products/add" element={<ProtectedRoute ><AddProducts /></ProtectedRoute>} />
				<Route path="/admin/products/update/:id" element={<ProtectedRoute ><EditProduct /></ProtectedRoute>} />
				<Route path="/admin/orders" element={<ProtectedRoute ><Orders /></ProtectedRoute>} />
				<Route path="/admin/categories" element={<ProtectedRoute ><Orders /></ProtectedRoute>} />
			</Route>
			
		</Routes>
	</AuthProvider>
);

export default AppRoutes;