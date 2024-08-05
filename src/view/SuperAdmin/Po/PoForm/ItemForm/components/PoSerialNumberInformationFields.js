import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../components/ui'
import { Field } from 'formik'

const PoSerialNumberInformationFields = (props) => {
    const { errors, touched } = props
    return (
        <FormItem
            label="PO Serial No."
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field
                type="text"
                autoComplete="off"
                name='serial_number'
                placeholder="PO Serial Number"
                component={Input}
            />
        </FormItem>
    )
}

export default memo(PoSerialNumberInformationFields)