import React, { memo } from 'react'
import { FormItem, Select } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { FREIGHT } from '../../constant'

const FreightInformationFields = (props) => {
    const { errors, values, touched } = props

    const FreightData = FREIGHT.map((item) => {
        return { label: item, value: item }
    })

    return (
        <FormItem
            className='mb-4'
            label="Freight"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="DispatchShippingAndOtherDetails.freight">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={FreightData}
                        value={FreightData.filter(
                            (freight) =>
                                freight.value === values
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

export default memo(FreightInformationFields)