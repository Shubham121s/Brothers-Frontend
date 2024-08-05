import React from 'react'

const GstAndOtherDetails = ({ company, shipping }) => {
    return (
        <div className='p-1'>
            <div className='flex gap-1 justify-start uppercase mt-2'>
                <p className='text-gray-700 font-semibold print:text-xs'>IEC CODE</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{company?.iec_code}</p>
            </div>
            <div className='flex gap-1  justify-start uppercase'>
                <p className='text-gray-700 font-semibold print:text-xs'>GSTIN</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{company?.gstin}</p>
            </div>
            <div className='flex gap-1  justify-start uppercase'>
                <p className='text-gray-700 font-semibold print:text-xs'>END USE CODE</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{shipping?.end_use_code}</p>
            </div>
            <div className='flex gap-1  justify-start uppercase'>
                <p className='text-gray-700 font-semibold print:text-xs'>PAYMENT</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{shipping?.payment_term}</p>
            </div>
        </div >
    )
}

export default GstAndOtherDetails