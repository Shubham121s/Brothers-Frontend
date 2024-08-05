import React, { memo } from 'react'
import { FormItem, Select } from '../../../../../components/ui'
import { Field } from 'formik'



export const poCurrencyType = [
    { label: 'INR', value: 'INR' },
    { label: 'USD', value: 'USD' }
]

const PoCurrencyInformationFields = (props) => {
    const { errors, touched, values } = props
    return (
        <FormItem
            className='mb-4'
            label="Currency"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="currency_type">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={poCurrencyType}
                        value={poCurrencyType.filter(
                            (currency) =>
                                currency.value === values
                        )}
                        onChange={(option) =>
                            form.setFieldValue(
                                field.name,
                                option.value
                            )
                        }
                    />
                )}
            </Field>
        </FormItem>
    )
}

export default memo(PoCurrencyInformationFields)