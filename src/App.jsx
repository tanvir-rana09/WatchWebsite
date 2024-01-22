import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import MoveToTop from './components/MoveToTop'
function App() {
  return  (
    <>
    <Navbar/>
    <MoveToTop/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
