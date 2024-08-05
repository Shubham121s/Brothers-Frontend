import React, { memo } from 'react'
import { Card } from '../../../../../../components/ui'

const CompanyDetails = (props) => {
    const { values } = props
    return (
        <Card className='h-max'>
            <div className='flex justify-between'><strong>IEC CODE :</strong> <span>{values?.iec_code || '-'}</span></div>
            <div className='flex justify-between'><strong>GSTIN :</strong> <span>{values?.gstin || '-'}</span></div>
            <div className='flex justify-between'><strong>ITC CODE :</strong> <span>{values?.itc_code || '-'}</span></div>
            <div className='flex justify-between'><strong>DUTY DRAWBACK SERIAL NO :</strong> <span>{values?.duty_drawback_serial_no || '-'}</span></div>
        </Card>
    )
}

export default memo(CompanyDetails)