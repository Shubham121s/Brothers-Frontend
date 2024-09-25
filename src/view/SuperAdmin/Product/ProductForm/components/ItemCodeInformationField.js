import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../components/ui'
import { Field } from 'formik'

const ItemCodeInformationField = (props) => {
  const {
    errors,
    touched,
    label,
    name,
    placeholder = '',
    type = 'text',
    isCodeExixts = false,
    debouncedHandleCheck,
    handleChange,
    values = ''
  } = props
  const handleFieldChange = (e) => {
    handleChange(e)
    if (type == 'new') {
      debouncedHandleCheck(e)
    }
  }

  return (
    <FormItem
      className="mb-4"
      label={label}
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field
        type="text"
        autoComplete="off"
        name={name}
        placeholder={placeholder}
        component={Input}
        onChange={(e) => {
          handleFieldChange(e)
        }}
      />
    </FormItem>
  )
}

export default memo(ItemCodeInformationField)
