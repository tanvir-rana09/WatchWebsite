import React from 'react'
import { toast } from 'react-toastify'

const AdminProducts = () => {
  return (
	<div onClick={()=>toast.success("hello")}>AdminProducts</div>
  )
}

export default AdminProducts