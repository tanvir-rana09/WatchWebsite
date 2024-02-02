import { Link } from "react-router-dom"
import Newsletter from "./Newsletter"
import { FaFacebook } from "react-icons/fa";
import { GrGithub, GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const Footter = () => {
  return (
    <div className="xl:px-[15%] w-full bg-gray-950 text-white pt-10 pb-5 px-3 flex flex-col gap-10">
      <div>
        <Newsletter />
      </div>
      <div className="flex w-full justify-between py-5 flex-wrap" >
        <div>
          <h2 className="forunderline after:w-28">Connect Us </h2>
          <ul className="flex gap-2 flex-col">
            <li >
              
              <Link to='https://www.facebook.com/tanvir.rana.world?mibextid=ZbWKwL' className="footerli">
                <FaFacebook />
                <p className="text-sm">Facebook</p>
              </Link>
            </li>
            <li>
              <Link to='https://instagram.com/tanvir.rana.soikat?utm_source=qr&igshid=NGExMmI2YTkyZg=='  className="footerli">
                <GrInstagram />
                <p className="text-sm">Instagram</p>
              </Link>
            </li>
            <li >
              <Link to="https://x.com/STaR_TanvirRana?t=1y60I6BgRzE9JZseSZ3AGg&s=09" className="footerli">
                <FaTwitter />
                <p className="text-sm">Twitter</p>
              </Link>
            </li>
            <li >
              <Link to="https://api.whatsapp.com/send?phone=01402434727" className="footerli">
                <IoLogoWhatsapp />
                <p className="text-sm">WhatsApp</p>
              </Link>
            </li>
            <li >
              <Link to='https://github.com/tanvir-rana09' className="footerli">
                <GrGithub />
                <p className="text-sm">Github</p>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="forunderline after:w-16">Explore</h2>
          <ul className="flex flex-col justify-between gap-2">
            <li >
              <Link to='/allwatches'>
                All Watches
              </Link>
            </li>
            <li>
              <Link to='/men'>
                Men
              </Link>
            </li>
            <li>
              <Link to='/women'>
                Women
              </Link>
            </li>
            <li>
              <Link to='/clock'>
                Clock
              </Link>
            </li>
          </ul>

        </div>

        <div>
          <h2 className="forunderline after:w-28">Usefull Links</h2>
          <ul className="flex flex-col justify-between gap-2">
            <li>
              <Link to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/blog'>
                Blog
              </Link>
            </li>
            <li>
              <Link to='/about'>
                About
              </Link>
            </li>
            <li>
              <Link to='/contact'>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="forunderline after:w-48">
            Company Information
          </h1>
          <div className="flex flex-col justify-between gap-2">
            <h3>Address : <br /> Monakhali | Mujibnagor Road | Mujibnagor,Meherpur</h3>
            <h3>
              <Link to='mailto:tanvir.rana.soikat@gmail.com'>
                Email : tanvir.rana.soikat@gmail.com
              </Link>
            </h3>
            <h3> <Link to='telto:01402434727'>Call Us : +8801402434727</Link> </h3>
            <h3>Open in : Monday - Friday: 9:00 AM - 5:30 PM</h3>
            <h3>Close in : Saturday - Sunday: CLOSED</h3>
          </div>
        </div>
      </div>
      <div className="text-center pt-5 border-t-2 border-gray-800 mt-5">
        &copy; 2023, Just Watches, Online Retailer - STAR WATCH By &copy; Tanvir Rana
      </div>
    </div>
  )
}

export default Footter