import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../components/ui'
import { Field } from 'formik'

const NoteInformationFields = (props) => {
  const { errors, touched, values = '' } = props

  return (
    <FormItem
      className="mb-4"
      label=""
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field
        type="text"
        autoComplete="off"
        name="note"
        value={values}
        placeholder="Note"
        component={Input}
      />
    </FormItem>
  )
}

export default memo(NoteInformationFields)
