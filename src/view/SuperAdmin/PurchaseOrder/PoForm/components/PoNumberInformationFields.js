import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../components/ui'
import { Field } from 'formik'

const PoNumberInformationFields = (props) => {
    const { errors, touched } = props
    return (
        <FormItem
            className='mb-4'
            label="PO Number"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field
                type="text"
                autoComplete="off"
                name="number"
                placeholder="PO Number"
                component={Input}
            />
        </FormItem>
    )
}

export default memo(PoNumberInformationFields)