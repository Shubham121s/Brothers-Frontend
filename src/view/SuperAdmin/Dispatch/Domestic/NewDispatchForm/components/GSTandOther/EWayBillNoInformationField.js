import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../../components/ui'
import { Field } from 'formik'

const EWayBillNoInformationField = (props) => {
    const { errors, touched } = props
    return (
        <FormItem
            className='mb-4'
            label="E-Way Bill No"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field
                component={Input}
                name='DispatchShippingAndOtherDetails.e_way_bill_no'
                placeholder='E-Way Bill No'
            />
        </FormItem>
    )
}

export default memo(EWayBillNoInformationField)