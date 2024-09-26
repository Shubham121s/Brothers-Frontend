import React, { forwardRef } from 'react'
import { Button, FormContainer } from '../../../../../../../components/ui'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import BoxInformationFields from './BoxInformationFields'

const validationSchema = Yup.object().shape({
  box_length: Yup.number().required('Required'),
  box_breadth: Yup.number().required('Required'),
  box_height: Yup.number().required('Required'),
  tare_weight: Yup.number().required('Required'),
  box_size_type: Yup.string().required('Required')
})

const BoxForm = forwardRef((props, ref) => {
  const { initialData, handleFormSubmit, onDiscard, index, type } = props
  return (
    <Formik
      innerRef={ref}
      initialValues={{
        ...initialData
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleFormSubmit?.(values, setSubmitting)
      }}
    >
      {({ values, touched, errors, isSubmitting }) => {
        // values.index = index;
        return (
          <Form>
            <FormContainer>
              <h4>{type === 'new' ? 'New' : 'Update'} Box Information</h4>
              <p className="mb-4">Section to config new box information</p>
              <BoxInformationFields
                index={index}
                values={values}
                errors={errors}
                touched={touched}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  onClick={() => onDiscard?.()}
                  type="button"
                  variant=""
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  type="submit"
                  loading={isSubmitting}
                >
                  {type === 'edit' ? 'Update Box' : 'Add Box'}
                </Button>
              </div>
            </FormContainer>
          </Form>
        )
      }}
    </Formik>
  )
})

BoxForm.defaultProps = {
  type: 'edit',
  initialData: {
    index: '',
    box_length: '',
    box_breadth: '',
    box_height: '',
    box_size_type: '',
    tare_weight: '',
    box_no: ''
  }
}

export default BoxForm
