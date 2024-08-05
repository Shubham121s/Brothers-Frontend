import React from 'react'


const PortDetails = ({data}) => {
    return (
        <div className='h-full'>
            <div className='flex gap-1 justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>PRE-CARRIEGE BY</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 print:text-xs'>{data?.pre_carriage_by}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>PLACE OF RECEIPT</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 print:text-xs'>{data?.place_of_receipt}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>VESSEL / FLIGHT NO</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 print:text-xs'>GNX 200</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>PORT OF DISCHARGE</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 print:text-xs'>{data?.port_of_discharge}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>NOTIFY</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 print:text-xs'>BUYER/APPLICANT MENTIONED ABOVE</p>
            </div>
        </div>
    )
}

export default PortDetails