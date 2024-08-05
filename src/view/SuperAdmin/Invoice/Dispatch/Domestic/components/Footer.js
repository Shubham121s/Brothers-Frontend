import React from 'react'
import BankDetails from '../components/BankDetails'
import Signature from '../components/Signature'
const Footer = ({data}) => {
    return (
        <>
            <div className='grid grid-cols-6 gap-2' style={{ borderBottom: '1px dashed lightGray' }}>
                <div className='col-span-4 h-full p-2' >
                    <div className='h-full' style={{ borderRight: '1px dashed lightGray' }}>
                        <BankDetails data={data?.DispatchBankDetail}/>
                    </div>
                </div>
                <div className='col-span-2 h-full p-2' >
                    <div className='h-full'>
                        <Signature />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-6 gap-2' style={{ borderBottom: '1px dashed lightGray' }}>
                <div className='col-span-6 h-full p-2' >
                    <div className='h-full'>
                        <div className='print:text-sm flex justify-center items-center font-medium'>
                            <span>Certified that the particulars given above are True and Correct. Subject To Palus Jurisdiction</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer