import React from 'react'

const GstAndOtherDetails = ({ data }) => {
    return (
        <div>

            <div className='p-1'>
                <div className='flex gap-1  justify-start capitalize'>
                    <p className='text-gray-700 font-semibold print:text-xs'>GST IN/UIN</p>
                    <p className='text-gray-700 print:text-xs'>-</p>
                    <p className='text-gray-500 font-medium print:text-xs'>{data?.gstin}</p>
                </div>
                <div className='flex gap-1  justify-start capitalize'>
                    <p className='text-gray-700 font-semibold print:text-xs'>PAN</p>
                    <p className='text-gray-700 print:text-xs'>-</p>
                    <p className='text-gray-500 font-medium print:text-xs'>{data?.pan}</p>
                </div>
                <div className='flex gap-1  justify-start capitalize'>
                    <p className='text-gray-700 font-semibold print:text-xs'>STATE</p>
                    <p className='text-gray-700 print:text-xs'>-</p>
                    <p className='text-gray-500 font-medium print:text-xs'>{data?.state}</p>
                </div>
                <div className='flex gap-1  justify-start capitalize'>
                    <p className='text-gray-700 font-semibold print:text-xs'>STATE CODE</p>
                    <p className='text-gray-700 print:text-xs'>-</p>
                    <p className='text-gray-500 font-medium print:text-xs'>{data?.state_code}</p>
                </div>
            </div>
        </div>
    )
}

export default GstAndOtherDetails