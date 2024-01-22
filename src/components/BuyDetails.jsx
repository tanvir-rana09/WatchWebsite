import detail1 from '../assets/Images/BannerImg/detail (1).png'
import detail2 from '../assets/Images/BannerImg/detail (2).png'
import detail3 from '../assets/Images/BannerImg/detail (3).png'
import detail4 from '../assets/Images/BannerImg/detail (4).png'
import detail5 from '../assets/Images/BannerImg/detail (5).png'
import detail6 from '../assets/Images/BannerImg/detail (6).png'
import BuyDetail from './BuyDetail'


const BuyDetails = () => {
	return (
		<div>
			<div className='grid grid-cols-5 py-5 2xl:px-20 p-2 bg-primary '>
				<BuyDetail icon={detail1} text='3 Years Warrenty' />
				<BuyDetail icon={detail2} text='Ship in 24 hours' />
				<BuyDetail icon={detail3} text='Free Shipping in BD' />
				<BuyDetail icon={detail4} text='100% Original Product' />
				<BuyDetail icon={detail6} text='7 Day Return Policy' />
			</div>
		</div>
	)
}

export default BuyDetails