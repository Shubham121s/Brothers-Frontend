import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../../components/ui'
import { Field } from 'formik'

const CurrencyInformationField = (props) => {
    const { errors, touched } = props
    return (
        <FormItem
            className='mb-4'
            label="USD to INR"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field
                component={Input}
                name='DispatchShippingAndOtherDetails.convert_rate'
                type='number'
                placeholder='1 USD = 80.00 INR'
            />
        </FormItem>
    )
}

export default memo(CurrencyInformationField)