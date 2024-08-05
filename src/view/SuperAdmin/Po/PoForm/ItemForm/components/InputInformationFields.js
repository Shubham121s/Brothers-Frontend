import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../components/ui'
import { Field } from 'formik'

const InputInformationFields = (props) => {
    const { errors, touched, label, name, placeholder = "", type = "text", className, suffix, prefix, value } = props
    return (
        <FormItem
            className='mb-4'
            label={label}
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field
                type={type}
                className={className}
                autoComplete="off"
                name={name}
                suffix={suffix}
                prefix={prefix}
                placeholder={placeholder}
                component={Input}
            />
        </FormItem>
    )
}

export default memo(InputInformationFields)