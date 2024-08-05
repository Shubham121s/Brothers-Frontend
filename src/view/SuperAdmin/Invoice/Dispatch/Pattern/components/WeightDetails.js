import React, { useMemo } from 'react'
import { dispatchList } from '../utils/dispatchList'

const WeightDetails = ({ data }) => {


    const grossWeight = dispatchList(data?.DispatchLocations)?.reduce((sum, item) => sum + (item.item_quantity * item.item_weight), 0)
    const boxWeight = data?.DispatchBoxLists?.reduce((sum, item) => sum + item.tare_weight, 0)

    return (
        <div className='h-full'>
            <div className='flex gap-1 justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>PACKING DETAILS</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.DispatchShippingAndOtherDetail?.packing_details}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>NO OF BOX</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{data?.DispatchBoxLists?.length}</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>NET WEIGHT</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{(boxWeight + grossWeight)?.toFixed(3)} kg</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>GROSS WEIGHT</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{grossWeight?.toFixed(3)} kg</p>
            </div>
            <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-xs'>TARE WEIGHT</p>
                <p className='text-gray-700 print:text-xs'>-</p>
                <p className='text-gray-500 font-medium print:text-xs'>{boxWeight?.toFixed(3)} kg</p>
            </div>
        </div>
    )
}

export default WeightDetails