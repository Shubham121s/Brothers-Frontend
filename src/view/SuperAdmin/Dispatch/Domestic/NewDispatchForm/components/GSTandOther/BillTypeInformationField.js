import React, { memo } from 'react'
import { FormItem, Select } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { BILL_TYPE } from '../../constant'

const BillTypeInformationFields = (props) => {
    const { errors, values, touched } = props

    const billTypeData = BILL_TYPE.map((type) => {
        return { label: type, value: type }
    })

    return (
        <FormItem
            className='mb-4'
            label="Bill Type"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="DispatchShippingAndOtherDetails.bill_type">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={billTypeData}
                        value={billTypeData.filter(
                            (billType) =>
                                billType.value === values
                        )}
                        onChange={(option) => {
                            form.setFieldValue(
                                field.name,
                                option.value
                            )
                            form.setFieldValue(
                                'DispatchShippingAndOtherDetails.c_gst',
                                ''
                            )
                            form.setFieldValue(
                                'DispatchShippingAndOtherDetails.s_gst',
                                ''
                            )
                            form.setFieldValue(
                                'DispatchShippingAndOtherDetails.i_gst',
                                ''
                            )
                        }
                        }
                    />
                )}
            </Field>
        </FormItem>
    )
}

export default memo(BillTypeInformationFields)