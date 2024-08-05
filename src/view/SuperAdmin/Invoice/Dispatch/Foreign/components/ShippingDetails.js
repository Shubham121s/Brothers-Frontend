import React from 'react'

const ShippingDetails = ({data}) => {
    return (
        <div className='h-full'>
            <div className='flex gap-1 justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>FREIGHT</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.freight}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>EXCISE DOCUMENT</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.excise_document}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>SHIPPING TERMS</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.shipping_term}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>SHIPPING LINE</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.shipping_line}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>INSURANCE BY</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.shipping_insurance}</p>
            </div>
        </div>
    )
}

export default ShippingDetails