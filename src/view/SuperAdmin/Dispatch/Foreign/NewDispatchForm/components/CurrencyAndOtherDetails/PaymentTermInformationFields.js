import React, { memo } from 'react'
import { FormItem, Select } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { PAYMENT_TERMS } from '../../constant'

const PaymentTermInformationFields = (props) => {
    const { errors, values, touched } = props

    const PaymentTermData = PAYMENT_TERMS.map((term) => {
        return { label: term, value: term }
    })

    return (
        <FormItem
            className='mb-4'
            label="Payment Terms"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="DispatchShippingAndOtherDetails.payment_term">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={PaymentTermData}
                        value={PaymentTermData.filter(
                            (term) =>
                                term.value === values
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

export default memo(PaymentTermInformationFields)