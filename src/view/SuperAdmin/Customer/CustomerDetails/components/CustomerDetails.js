import React from 'react'
import { Card } from '../../../../../components/ui'
import { HiOutlinePencil } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import useThemeClass from '../../../../../utils/hooks/useThemeClass'

const statusColor = {
  true: {
    label: 'Active',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-600'
  },
  false: {
    label: 'In-Active',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600'
  }
}


const CustomerDetails = (props) => {
  const { data } = props
  const { textTheme } = useThemeClass()
  return (
    <div className="grid md:grid-cols-3 gap-2">
      <Card className="mt-2 h-max bg-emerald-50">
        <div className="flex justify-between">
          <strong>Customer Name :</strong> <span>{data?.name || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>Customer Code :</strong>{' '}
          <span className="uppercase">{data?.customer_code || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>Vender Code :</strong>{' '}
          <span className="uppercase">{data?.vender_code || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>Type :</strong>{' '}
          <span className="capitalize">{data?.type || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>Status :</strong>
          <span>
            {(
              <span
                className={`ml-2 font-semibold capitalize ${
                  statusColor[data?.status]?.textClass
                }`}
              >
                {statusColor[data?.status]?.label}
              </span>
            ) || '-'}
          </span>
        </div>
      </Card>
      <Card className="mt-2 h-max bg-pink-50">
        <div className="flex justify-between">
          <strong>Mobile :</strong> <span>{data?.mobile || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>Phone :</strong> <span>{data?.phone || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>Email :</strong> <span>{data?.email || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>PAN No :</strong>{' '}
          <span className="uppercase">{data?.pan || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>GST No :</strong>{' '}
          <span className="uppercase">{data?.gst_no || '-'}</span>
        </div>
      </Card>
      <Card className="mt-2 h-max bg-slate-50">
        <div className="flex justify-between">
          <strong>Address :</strong>{' '}
          <span>{data?.CustomerPermanentAddress?.address || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>Country :</strong>{' '}
          <span>{data?.CustomerPermanentAddress?.country || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>State :</strong>{' '}
          <span>{data?.CustomerPermanentAddress?.state || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>City :</strong>{' '}
          <span>{data?.CustomerPermanentAddress?.city || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>Zip Code :</strong>{' '}
          <span>{data?.CustomerPermanentAddress?.zip_code || '-'}</span>
        </div>
        <div className="flex justify-between">
          <strong>edit Customer :</strong>{' '}
          <div className="flex justify-end text-lg">
            <Link
              className={`cursor-pointer hover:${textTheme}`}
              to={`/customer/edit/${data?.customer_id}`}
            >
              <HiOutlinePencil />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CustomerDetails
