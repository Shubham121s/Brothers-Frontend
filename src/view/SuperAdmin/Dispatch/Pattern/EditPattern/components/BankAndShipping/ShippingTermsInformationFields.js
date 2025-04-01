import React, { memo } from 'react'
import { FormItem, Select } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { SHIPPING_TERM } from '../../constant'

const ShippingTermsInformationFields = (props) => {
    const { errors, values, touched } = props

    const shippingTermData = SHIPPING_TERM.map((term) => {
        return { label: term, value: term }
    })

    return (
        <FormItem
            className='mb-4'
            label="Shipping Term"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="DispatchShippingAndOtherDetails.shipping_term">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={shippingTermData}
                        value={shippingTermData.filter(
                            (shippingTerm) =>
                                shippingTerm.value === values
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

export default memo(ShippingTermsInformationFields)