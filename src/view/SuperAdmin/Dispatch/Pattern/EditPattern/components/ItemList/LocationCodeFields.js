import React, { memo, useState } from 'react'
import { FormItem, Input } from '../../../../../../../components/ui'
import { Field, useField } from 'formik'

const LocationCode = (props) => {
    const { index, errors, touched, setFieldValue } = props
    const [form, meta] = useField({ name: `DispatchList[${index}].location_code` })
    
    const [value, setValue] = useState(form.value)

    const handleOnBlur = () => {
        setFieldValue(`DispatchList[${index}].location_code`, value)
    }

    return (
        <FormItem
            className='mb-0'
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field
                name={form.name}
            >
                {({ field, form }) => {
                    return (
                        <Input
                            form={form}
                            field={field}
                            placeholder="Location Code"
                            size='sm'
                            value={value}
                            className='uppercase'
                            onBlur={handleOnBlur}
                            onChange={e => {
                                setValue(e.target.value)
                            }}
                        />
                    )
                }}
            </Field>
        </FormItem>
    )
}

export default memo(LocationCode)