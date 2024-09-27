import React, { memo } from 'react'
import { Card, FormItem, Select } from '../../../../../../components/ui'
import { Field } from 'formik'
import { isEmpty } from 'lodash'

const NoteInformationFields = (props) => {
  const { values, errors, touched, conditions } = props

  return (
    <FormItem
      className="mb-0 h-max"
      label="Note Details"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="DispatchNote">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={conditions}
            value={conditions.filter(
              (note) => note.value?.condition_id === values?.condition_id
            )}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
          />
        )}
      </Field>
      {!isEmpty(values) ? (
        <Card className="mt-2">
          <div className="flex justify-between">
            <div dangerouslySetInnerHTML={{ __html: values?.condition }}></div>
          </div>
        </Card>
      ) : null}
    </FormItem>
  )
}

export default memo(NoteInformationFields)
