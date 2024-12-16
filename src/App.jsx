import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import MoveToTop from './components/MoveToTop'
import { useEffect } from 'react'
import useApi from './utils/useApi'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { callApi } = useApi('track-visit','POST');
  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <Navbar />
      <MoveToTop />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
