import React, { memo } from 'react'
import { Card } from '../../../../../../../components/ui'

const CompanyDetails = (props) => {
    const { values } = props
    return (
        <Card className='h-max mb-2'>
            <div className='flex justify-between'><strong>GSTIN :</strong> <span>{values?.gstin || '-'}</span></div>
            <div className='flex justify-between'><strong>PAN :</strong> <span>{values?.pan || '-'}</span></div>
            <div className='flex justify-between'><strong>STATE :</strong> <span>{values?.state || '-'}</span></div>
            <div className='flex justify-between'><strong>STATE CODE :</strong> <span>{values?.state_code || '-'}</span></div>
        </Card>
    )
}

export default memo(CompanyDetails)