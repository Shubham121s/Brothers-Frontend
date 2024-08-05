import React from 'react'
import { Card } from '../../../../../components/ui'
import dayjs from 'dayjs'


const statusColor = {
  delivered: {
    label: 'Delivered',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-600',
  },
  rejected: {
    label: 'Rejected',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
  },
  processing: {
    label: 'Processing',
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-600',
  },
  pending: {
    label: 'Pending',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-600',
  }
}

const PoDetails = ({ initialData }) => {
  return (
    <div className='grid md:grid-cols-3 gap-2 mb-3'>
      <Card className='mt-2 bg-emerald-50'>
        <div className='flex justify-between'><strong>Customer Name :</strong> <span className='uppercase'>{initialData?.Customer?.name || '-'}</span></div>
        <div className='flex justify-between'><strong>Customer Code :</strong> <span className='uppercase'>{initialData?.Customer?.customer_code || '-'}</span></div>
        <div className='flex justify-between'><strong>Vender Code :</strong> <span className='uppercase'>{initialData?.Customer?.vender_code || '-'}</span></div>
        <div className='flex justify-between'><strong>Type :</strong> <span className='uppercase'>{initialData?.Customer?.type || '-'}</span></div>
      </Card>
      <Card className='mt-2 bg-pink-50'>
        <div className='flex justify-between'><strong>Mobile :</strong> <span className='uppercase'>{initialData?.Customer?.mobile || '-'}</span></div>
        <div className='flex justify-between'><strong>Email :</strong> <span className='uppercase'>{initialData?.Customer?.email || '-'}</span></div>
        <div className='flex justify-between'><strong>PAN No :</strong> <span className='uppercase'>{initialData?.Customer?.pan || '-'}</span></div>
        <div className='flex justify-between'><strong>GST No :</strong> <span className='uppercase'>{initialData?.Customer?.gst_no || '-'}</span></div>
      </Card>
      <Card className={`mt-2 ${statusColor[initialData?.status]?.bgClass}`}>
        <div className='flex justify-between'><strong>PO Number :</strong> <span>{initialData?.number || '-'}</span></div>
        <div className='flex justify-between'><strong>Currency :</strong> <span>{initialData?.currency_type || '-'}</span></div>
        <div className='flex justify-between'><strong>Status :</strong>
          <span>
            {
              <span className={`ml-2 font-semibold capitalize ${statusColor[initialData?.status]?.textClass}`}>
                {statusColor[initialData?.status]?.label}
              </span> || '-'
            }
          </span>
        </div>
        <div className='flex justify-between'><strong>PO Date :</strong> <span>{dayjs(initialData?.date).format('DD-MMM-YYYY') || '-'}</span></div>
      </Card>
    </div>
  )
}

export default PoDetails