import React from 'react'
import { Card } from '../../../../../../../components/ui'

const ShippingAddress = (props) => {
  const { data } = props
  return (
    <Card className='h-full' bodyClass='pt-2'>
      <h6 className='font-normal text-center text-gray-500 uppercase mb-1'>Shipping Address</h6>
      <div className='flex justify-between'><strong>Country :</strong> <span>{data?.country || '-'}</span></div>
      <div className='flex justify-between'><strong>State :</strong> <span>{data?.state || '-'}</span></div>
      <div className='flex justify-between'><strong>City :</strong> <span>{data?.city || '-'}</span></div>
      <div className='flex justify-between'><strong>ZIP Code :</strong> <span>{data?.zip_code || '-'}</span></div>
      <div className='flex justify-between'><strong>Contact Person :</strong> <span>{data?.contact_person || '-'}</span></div>
      <div className='flex justify-between'><strong>Contact Phone :</strong> <span>{data?.contact_phone || '-'}</span></div>
    </Card>
  )
}

export default ShippingAddress