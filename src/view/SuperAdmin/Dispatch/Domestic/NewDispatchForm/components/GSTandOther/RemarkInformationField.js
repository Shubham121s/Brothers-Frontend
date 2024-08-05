import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../../components/ui'
import { Field } from 'formik'

const RemarkInformationField = (props) => {
    const { errors, touched } = props
    return (
        <FormItem
            className='mb-4'
            label="Remark"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field
                component={Input}
                name='DispatchShippingAndOtherDetails.remark'
                placeholder='Remarks'
            />
        </FormItem>
    )
}

export default memo(RemarkInformationField)