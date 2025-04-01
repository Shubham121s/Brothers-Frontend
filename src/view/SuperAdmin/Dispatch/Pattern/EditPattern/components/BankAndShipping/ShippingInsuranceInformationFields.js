import React, { memo } from 'react'
import { FormItem, Select } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { SHIPPING_INSURANCE } from '../../constant'

const ShippingInsuranceInformationFields = (props) => {
    const { errors, values, touched } = props

    const shippingInsuranceData = SHIPPING_INSURANCE.map((insurance) => {
        return { label: insurance, value: insurance }
    })

    return (
        <FormItem
            className='mb-4'
            label="Shipping Insurance"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="DispatchShippingAndOtherDetails.shipping_insurance">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={shippingInsuranceData}
                        value={shippingInsuranceData.filter(
                            (shippingInsurance) =>
                                shippingInsurance.value === values
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

export default memo(ShippingInsuranceInformationFields)