import React, { forwardRef } from 'react'
import {
  FormContainer,
  Button,
  FormItem,
  Input,
  Select
} from '../../../../components/ui'
import { Field, Form, Formik } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { Locations, In_USE, frequencyType } from '../constant'

const validationSchema = Yup.object().shape({
  instrument_name: Yup.string().required('Required'),

  instrument_make: Yup.string().required('Required'),

  instrument_no: Yup.string().required('Required'),

  instrument_size: Yup.string().required('Required'),

  instrument_lc: Yup.string().required('Required'),

  instrument_cal_frq: Yup.number().required('Required'),
  instrument_freq_type: Yup.string().required('Required'),
  in_use: Yup.string().required('Required'),
  location: Yup.string().required('Required')
})

const InstrumentForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard } = props
  return (
    <>
      <Formik
        innerRef={ref}
        enableReinitialize={true}
        initialValues={{
          ...initialData
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values)
          onFormSubmit?.(formData, setSubmitting)
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
                <div>
                  <h4>Instrument Information</h4>
                  <p className="mb-6">
                    Section to config basic Instrument information
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <FormItem
                      className="mb-4"
                      label="Instrument"
                      invalid={
                        errors.instrument_name && touched.instrument_name
                      }
                      errorMessage={errors.instrument_name}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="instrument_name"
                        placeholder="Name"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-4"
                      label="Maker"
                      //   invalid={
                      //     errors.instrument_make && touched.instrument_make
                      //   }
                      //   errorMessage={errors.instrument_make}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="instrument_make"
                        placeholder="Make"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-4"
                      label="Location"
                      invalid={errors.location && touched.location}
                      errorMessage={errors.location}
                    >
                      <Field name="location">
                        {({ field, form }) => (
                          <Select
                            field={field}
                            form={form}
                            options={Locations}
                            value={Locations.filter(
                              (type) => type.value === values.location
                            )}
                            onChange={(option) =>
                              form.setFieldValue(field.name, option.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem
                      className="mb-4"
                      label="ID No."
                      invalid={errors.instrument_no && touched.instrument_no}
                      errorMessage={errors.instrument_no}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="instrument_no"
                        placeholder="ID No."
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-4"
                      label="Size"
                      invalid={
                        errors.instrument_size && touched.instrument_size
                      }
                      errorMessage={errors.instrument_size}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="instrument_size"
                        placeholder="Size"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-4"
                      label="L.C"
                      invalid={errors.instrument_lc && touched.instrument_lc}
                      errorMessage={errors.instrument_lc}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="instrument_lc"
                        placeholder="L.C"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-4"
                      label="In Use"
                      invalid={errors.in_use && touched.in_use}
                      errorMessage={errors.in_use}
                    >
                      <Field name="in_use">
                        {({ field, form }) => (
                          <Select
                            field={field}
                            form={form}
                            options={In_USE}
                            value={In_USE.filter(
                              (type) => type.value === values.in_use
                            )}
                            onChange={(option) =>
                              form.setFieldValue(field.name, option.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem>
                    <FormItem
                      className="mb-4"
                      label="Calibration Frequency"
                      invalid={
                        errors.instrument_cal_frq && touched.instrument_cal_frq
                      }
                      errorMessage={errors.instrument_cal_frq}
                    >
                      <div className="flex gap-2">
                        <Field
                          type="number"
                          autoComplete="off"
                          name="instrument_cal_frq"
                          placeholder="Calibration Frequency/Year"
                          component={Input}
                          style={{ width: '100px' }}
                        />
                        <Field name="instrument_freq_type">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={frequencyType}
                              value={frequencyType.filter(
                                (type) =>
                                  type.value === values.instrument_freq_type
                              )}
                              onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </FormItem>
                  </div>
                  <FormItem
                    className="mb-4"
                    label="Remark"
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="remark"
                      placeholder="Remark"
                      component={Input}
                    />
                  </FormItem>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    onClick={() => onDiscard?.()}
                    type="button"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    icon={<AiOutlineSave className="mr-1" />}
                    type="submit"
                  >
                    {type === 'edit' ? 'Update' : 'Save'}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </>
  )
})

InstrumentForm.defaultProps = {
  type: 'new',
  initialData: {
    instrument_name: '',
    instrument_make: '',
    instrument_no: '',
    instrument_size: '',
    instrument_lc: '',
    instrument_cal_frq: '',
    instrument_freq_type: '',
    location: '',
    in_use: '',
    remark: ''
  }
}

export default InstrumentForm
