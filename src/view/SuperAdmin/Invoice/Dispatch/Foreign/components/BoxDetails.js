import React from 'react'


const BoxDetails = ({ data = [] }) => {
    return (
        <div className='h-full'>
            {data.map((box, index) => {
                return (
                    <div className='flex gap-x-1 justify-start capitalize' key={index}>
                        <span className='text-gray-700 font-semibold print:text-xs capitalize'>BOX NO {box?.box_no}</span>
                        <span className='text-gray-700 print:text-xs'>-</span>
                        <span className='text-gray-500 print:text-xs uppercase'>({`${box.box_height}X${box.box_breadth}X${box.box_length}`}){' '}{box.box_size_type}</span>
                        <span className='text-gray-700 print:text-xs'>-</span>
                        <span className='text-gray-500 print:text-xs'>({`${Number(box.tare_weight).toFixed(3)} Kg`}) {(data.length - 1) !== index && ','}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default BoxDetails