import React from 'react'
import { Card } from '../../../../../../../components/ui'

const TransportDetails = (props) => {
  const { data } = props
  return (
    <Card bodyClass='pt-2' className='h-max'>
      <h6 className='font-normal text-center text-gray-500 uppercase mb-1'>Transport Details</h6>
      <div className='flex justify-between'><strong>Payment terms :</strong> <span>{data?.place_of_receipt || '-'}</span></div>
      <div className='flex justify-between'><strong>Transport Mode :</strong> <span>{data?.port_of_discharge || '-'}</span></div>
      <div className='flex justify-between'><strong>Vehicle No :</strong> <span>{data?.port_of_loading || '-'}</span></div>
    </Card>
  )
}

export default TransportDetails