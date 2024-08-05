import React from 'react'

const DestinationDetails = ({data}) => {
    return (
        <div className='h-full'>
            <div className='flex gap-1 justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>COUNTRY OF ORIGIN OF GOODS</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 print:text-xs'>{data?.country_of_goods}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>COUNTRY OF FINAL DESTINATION</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 print:text-xs'>{data?.destination}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>PORT OF LOADING</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 print:text-xs'>{data?.port_of_loading}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>FINAL DESTINATION</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 print:text-xs'>{data?.final_destination}</p>
            </div>
        </div>
    )
}

export default DestinationDetails