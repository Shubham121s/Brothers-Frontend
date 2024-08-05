import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../../components/ui'
import { Field } from 'formik'

const ExciseDocumentInformationFields = (props) => {
    const { errors, values, touched } = props
    return (
        <FormItem
            className='mb-4'
            label="Excise document"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field
                name='CurrencyAndOtherDetails.excise_document'
                autoComplete="off"
                placeholder="Excise document"
                component={Input}
            />
        </FormItem>
    )
}

export default memo(ExciseDocumentInformationFields)