import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../../../../../../../components/ui'
import dayjs from 'dayjs';

const PoInformationFields = () => {
    const selectedDispatchItem = useSelector(state => state.edit_foreign_dispatch.state.selectedDispatchItem)

    return (
        <Card className='mt-2 bg-emerald-50'>
            <div className='flex justify-between'><strong>PO Number :</strong> <span>{selectedDispatchItem?.Po?.number || '-'}</span></div>
            <div className='flex justify-between'><strong>Currency Type :</strong> <span>{selectedDispatchItem?.Po?.currency_type || 'USD'}</span></div>
            <div className='flex justify-between'><strong>Po Date :</strong> <span>{dayjs(selectedDispatchItem?.Po?.date).format('DD-MMM-YYYY') || '-'}</span></div>
        </Card>
    )
}

export default memo(PoInformationFields)