import React from 'react'

const TransportAndPaymentTerms = () => {
    return (
        <div className='w-full grid grid-cols-4 gap-x-2'>
            <div className='col-span-1'>
                <div className='flex w-full gap-1 justify-start'>
                    <p className='text-gray-700 font-semibold print:text-xs'>TRANSPORT MODE</p>
                    <p className='text-gray-700 font-semibold print:text-xs'>-</p>
                    <p className='text-gray-500 font-medium print:text-xs uppercase'>By Road</p>
                </div>
            </div>
            <div className='col-span-1'>
                <div className='flex w-full gap-1 justify-start'>
                    <p className='text-gray-700 font-semibold print:text-xs'>VEHICLE NO</p>
                    <p className='text-gray-700 font-semibold print:text-xs'>-</p>
                    <p className='text-gray-500 font-medium print:text-xs uppercase'>up34ty2344</p>
                </div>
            </div>
            <div className='col-span-2'>
                <div className='flex w-full gap-1 justify-start'>
                    <p className='text-gray-700 font-semibold print:text-xs'>PAYMENT TERMS</p>
                    <p className='text-gray-700 font-semibold print:text-xs'>-</p>
                    <p className='text-gray-500 font-medium print:text-xs uppercase'>From Date of Invoice</p>
                </div>
            </div>
        </div >
    )
}

export default TransportAndPaymentTerms