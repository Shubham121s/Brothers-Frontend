import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../../components/ui'
import { Field } from 'formik'

const VehicleInformationFields = (props) => {
    const { errors, touched } = props
    return (
        <FormItem
            className='mb-4'
            label="Vehicle No"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field
                placeholder="Vehicle Number"
                name="DispatchShippingAndOtherDetails.vehicle_no"
                component={Input}
            />
        </FormItem>
    )
}

export default memo(VehicleInformationFields)