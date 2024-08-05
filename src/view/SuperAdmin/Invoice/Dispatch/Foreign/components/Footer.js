import React from 'react'
import WeightDetails from './WeightDetails'
import ShippingDetails from './ShippingDetails'
import BankDetails from './BankDetails'
import Signature from './Signature'
import Note from './Note'

const Footer = ({ data }) => {
    return (
        <>
            <div className='grid grid-cols-6' style={{ borderBottom: '1px dashed lightGray' }}>
                <div className='col-span-2 h-full p-2' >
                    <div className='h-full' style={{ borderRight: '1px dashed lightGray' }}>
                        <WeightDetails data={data} />
                    </div>
                </div>
                <div className='col-span-2 h-full p-2' >
                    <div className='h-full' style={{ borderRight: '1px dashed lightGray' }}>
                        <ShippingDetails data={data?.DispatchShippingAndOtherDetail} />
                    </div>
                </div>
                <div className='col-span-2 h-full p-2' >
                    <div className='h-full'>
                        <BankDetails data={data?.DispatchBankDetail} />
                    </div>
                </div>
            </div>
            <div className=' grid grid-cols-6' style={{ borderBottom: '1px dashed lightGray' }}>
                <div className='col-span-4 h-full p-2' >
                    <div className='h-full' style={{ borderRight: '1px dashed lightGray' }}>
                        <Note data={data?.DispatchNote} />
                    </div>
                </div>
                <div className='col-span-2 h-full p-2' >
                    <div className='h-full'>
                        <Signature />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer