import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../components/ui'
import { Field } from 'formik'

const PoNumberInformationFields = (props) => {
  const {
    errors,
    touched,
    type,
    debouncedHandleCheck,
    isPOExist = false,
    values = '',
    handleChange
  } = props
  const handleFieldChange = (e) => {
    handleChange(e)
    if (type === 'new') {
      debouncedHandleCheck(e)
    }
  }
  return (
    <FormItem
      className="mb-4"
      label="PO Number"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field
        type="text"
        autoComplete="off"
        name="number"
        value={values}
        placeholder="PO Number"
        component={Input}
        disabled={type === 'edit'}
        onChange={handleFieldChange}
      />
    </FormItem>
  )
}

export default memo(PoNumberInformationFields)
