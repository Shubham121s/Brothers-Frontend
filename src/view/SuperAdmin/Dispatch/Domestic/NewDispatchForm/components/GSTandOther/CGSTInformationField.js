import React, { memo } from 'react'
import { FormItem, Select } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { GST_PERCENTAGE } from '../../constant'

const CGSTInformationFields = (props) => {
    const { errors, values, touched } = props

    const percentageData = GST_PERCENTAGE.map((percentage) => {
        return { label: `${percentage} %`, value: percentage }
    })

    return (
        <FormItem
            className='mb-4'
            label='CGST'
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name='DispatchShippingAndOtherDetails.c_gst'>
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={percentageData}
                        value={percentageData.filter(
                            (percentage) =>
                                percentage.value === values
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

export default memo(CGSTInformationFields)