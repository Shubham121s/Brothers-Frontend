import React, { memo } from 'react'
import { FormItem, Select } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { SHIPPING_LINE } from '../../constant'

const TransportModeInformationFields = (props) => {
    const { values, errors, touched } = props

    const shippingLineData = SHIPPING_LINE.map((line) => {
        return { label: line, value: line }
    })

    return (
        <FormItem
            className='mb-4'
            label="Transport Mode"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="DispatchShippingAndOtherDetails.shipping_line">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={shippingLineData}
                        value={shippingLineData.filter(
                            (shippingLine) =>
                                shippingLine.value === values
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

export default memo(TransportModeInformationFields)