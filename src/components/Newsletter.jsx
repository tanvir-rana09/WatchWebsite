import Logo from './Logo'
import WhiteLogo from '../assets/Images/BannerImg/wall-clock white.png'
const Newsletter = () => {
  return (
	<div>
		<div className='flex flex-col gap-10 w-full items-center p-2'>
        <div className='text-white'>
          <Logo white={WhiteLogo} />
        </div>
        <div className='flex flex-col items-center w-full '>
          <h1 className='md:text-4xl text-2xl font-extendfont2 text-center'>ENDLESS DISCOVERY IN YOUR INBOX</h1>
          <p className='text-sm tracking-wider md:px-20 text-center'>Join our mailing list to receive insider updates on our latest collections, invites to private events, and other personalized offerings.</p>
        </div>
        <div className='bg-gray-800 rounded-full overflow-hidden w-full md:w-3/5 flex'>
          <input className='text-black px-5 py-3 w-full outline-none' type="text" placeholder='Enter Your Email...' />
          <button className='px-6 text-lg'>Subscribe</button>
        </div>
      </div>
	</div>
  )
}

export default Newsletter