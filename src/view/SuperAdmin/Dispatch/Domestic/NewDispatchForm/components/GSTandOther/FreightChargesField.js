import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../../components/ui'
import { Field } from 'formik'

const FreightChargesField = (props) => {
  const { errors, touched } = props
  return (
    <FormItem
      className="mb-4"
      label="Fright Charges"
    >
      <Field
        component={Input}
        name="DispatchShippingAndOtherDetails.fright_charges"
        placeholder="Fright Charges"
      />
    </FormItem>
  )
}

export default memo(FreightChargesField)
