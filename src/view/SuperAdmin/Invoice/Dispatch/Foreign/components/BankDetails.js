import React from 'react'

const BankDetails = ({ data }) => {
    return (
        <div className='h-full'>
            <div className='flex gap-1 justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>BENEFICIARY NAME</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.beneficiary_name}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>BANK NAME</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.bank_name}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>BANK ACCOUNT NO</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.account_no}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>IFSC CODE</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.ifsc_code}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>SWIFT CODE</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.swift_code}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>BANK AD CODE</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.bank_ad_code}</p>
            </div>
        </div>
    )
}

export default BankDetails