import React, { memo } from 'react'
import { Card, FormItem, Input } from '../../../../../../components/ui'
import { Field } from 'formik'

const InvoiceNumberField = (props) => {
  const {
    errors,
    touched,
    debouncedHandleCheck,
    isPOExist = false,
    values = '',
    handleChange
  } = props
  const handleFieldChange = (e) => {
    handleChange(e)

    debouncedHandleCheck(e)
  }
  return (
    <FormItem
      className="mb-0 h-max"
      label=""
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field
        name="invoice_no"
        placeholder="Invoice No."
        component={Input}
        onChange={handleFieldChange}
      />
    </FormItem>
  )
}

export default memo(InvoiceNumberField)
