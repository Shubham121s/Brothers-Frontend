import React, { memo } from 'react'
import { DatePicker, FormItem } from '../../../../../components/ui'
import { Field } from 'formik'

const PoDateInformationFields = (props) => {
    const { errors, touched } = props
    return (
        <FormItem
            className='mb-4'
            label="PO Date"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="date">
                {({ field, form }) => (
                    <DatePicker
                        placeholder='PO Date'
                        field={field}
                        form={form}
                        value={field.value}
                        onChange={(date) => {
                            form.setFieldValue(field.name, date)
                        }}
                    />
                )}
            </Field>
        </FormItem>
    )
}

export default memo(PoDateInformationFields)