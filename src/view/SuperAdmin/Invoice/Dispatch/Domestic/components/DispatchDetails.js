import React from 'react'

const Boxes = [
    {
        box_name: "BOX NO 1",
        height: 23,
        breadth: 34,
        length: 12,
        box_size_type: 'INCH',
        tare_weight: 21
    },
    {
        box_name: "BOX NO 2",
        height: 23,
        breadth: 34,
        length: 12,
        box_size_type: 'INCH',
        tare_weight: 21
    },
    {
        box_name: "BOX NO 3",
        height: 23,
        breadth: 34,
        length: 12,
        box_size_type: 'INCH',
        tare_weight: 21
    },
]

const DispatchDetails = () => {
    return (
        <div className='p-1'>
            <div className='grid grid-cols-6 gap-2'>
                <div className='col-span-2' style={{ borderRight: '1px dashed lightGray' }}>
                    <div className='flex gap-2 justify-start capitalize'>
                        <p className='text-gray-700 font-semibold print:text-xs'>PRE-CARRIEGE BY -</p>
                        <p className='text-gray-500 print:text-xs'>BY CIF UPTO PORT</p>
                    </div>
                    <div className='flex gap-2  justify-start capitalize'>
                        <p className='text-gray-700 font-semibold print:text-xs'>PLACE OF RECEIPT -</p>
                        <p className='text-gray-500 print:text-xs'>JNPT NHAVASHEVA</p>
                    </div>
                    <div className='flex gap-2  justify-start capitalize'>
                        <p className='text-gray-700 font-semibold print:text-xs'>VESSEL / FLIGHT NO -</p>
                        <p className='text-gray-500 print:text-xs'>GNX 200</p>
                    </div>
                    <div className='flex gap-2  justify-start capitalize'>
                        <p className='text-gray-700 font-semibold print:text-xs'>PORT OF DISCHARGE -</p>
                        <p className='text-gray-500 print:text-xs'>BUSAN</p>
                    </div>
                    <div className='flex gap-2  justify-start capitalize'>
                        <p className='text-gray-700 font-semibold print:text-xs'>NOTIFY -</p>
                        <p className='text-gray-500 print:text-xs'>BUYER/APPLICANT MENTIONED ABOVE</p>
                    </div>
                </div>
                <div className='col-span-2' style={{ borderRight: '1px dashed lightGray' }}>
                    <div className='flex gap-2 justify-start capitalize'>
                        <p className='text-gray-700 font-semibold print:text-xs'>COUNTRY OF ORIGIN OF GOODS -</p>
                        <p className='text-gray-500 print:text-xs'>INDIA</p>
                    </div>
                    <div className='flex gap-2  justify-start capitalize'>
                        <p className='text-gray-700 font-semibold print:text-xs'>COUNTRY OF FINAL DESTINATION -</p>
                        <p className='text-gray-500 print:text-xs'>KOREA</p>
                    </div>
                    <div className='flex gap-2  justify-start capitalize'>
                        <p className='text-gray-700 font-semibold print:text-xs'>PORT OF LOADING -</p>
                        <p className='text-gray-500 print:text-xs'>JNPT NHAVASHEVA</p>
                    </div>
                    <div className='flex gap-2  justify-start capitalize'>
                        <p className='text-gray-700 font-semibold print:text-xs'>FINAL DESTINATION -</p>
                        <p className='text-gray-500 print:text-xs'>KOREA</p>
                    </div>
                </div>
                <div className='col-span-2'>
                    {Boxes.map((box, index) => {
                        return (
                            <div className='flex gap-2 justify-start capitalize'>
                                <p className='text-gray-700 font-semibold print:text-xs capitalize'>BOX {index + 1} -</p>
                                <p className='text-gray-500 print:text-xs uppercase'>{box.box_name} ({`${box.height}X${box.breadth}X${box.length}`}){' '}{box.box_size_type}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default DispatchDetails