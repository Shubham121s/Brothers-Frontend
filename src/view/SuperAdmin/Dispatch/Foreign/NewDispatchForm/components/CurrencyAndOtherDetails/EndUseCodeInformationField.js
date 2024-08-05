import React, { memo } from 'react'
import { FormItem, Select } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { END_USE_CODE } from '../../constant'

const EndUseCodeInformationFields = (props) => {
    const { errors, values, touched } = props

    const EndUseCode = END_USE_CODE.map((end_use_code) => {
        return { label: end_use_code, value: end_use_code }
    })

    return (
        <FormItem
            className='mb-4'
            label="End Use Code"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="DispatchShippingAndOtherDetails.end_use_code">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={EndUseCode}
                        value={EndUseCode.filter(
                            (end_use_code) =>
                                end_use_code.value === values
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

export default memo(EndUseCodeInformationFields)