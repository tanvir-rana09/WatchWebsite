
import InputField from '../components/Input'
import LinkButton from '../components/Buttons/LinkButton'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useForm } from 'react-hook-form'

const AdminProducts = () => {
  const { control } = useForm()
  return (
    <div className='adminlayout'>
      <div className='flex justify-between items-center'>
        <InputField name={'search'} type={'text'} control={control} placeholder={'Search Product By Name'} />
        <LinkButton label={'Add'} url={'add'} Icon={IoIosAddCircleOutline} />
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default AdminProducts