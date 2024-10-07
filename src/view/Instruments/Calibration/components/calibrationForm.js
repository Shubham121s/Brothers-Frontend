import React, { forwardRef } from 'react'
import {
  FormContainer,
  Button,
  FormItem,
  Input,
  Select,
  DatePicker,
  Card
} from '../../../../components/ui'
import { isEmpty } from 'lodash'
import { Field, Form, Formik } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  instrument_name: Yup.string().required('Required'),

  instrument_make: Yup.string().required('Required'),

  instrument_no: Yup.string().required('Required'),

  instrument_size: Yup.string().required('Required'),

  instrument_lc: Yup.string().required('Required'),

  instrument_cal_frq: Yup.number().required('Required')
})

const CalibrationForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard, InstrumentOption } = props
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
                  <h4>Calibration Information</h4>
                  <p className="mb-6">
                    Section to config basic Calibration information
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <FormItem
                        className="mb-1"
                        label="Instrument"
                        invalid={errors.type && touched.type}
                        errorMessage={errors.type}
                      >
                        <Field name="instrument_id">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              size="sm"
                              options={InstrumentOption}
                              value={InstrumentOption.filter(
                                (type) =>
                                  type.value.instrument_id ===
                                  values.instrument_id.instrument_id
                              )}
                              onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItem>
                      {!isEmpty(values.instrument_id) ? (
                        <div className=" gap-2 mt-2 h-max">
                          <Card
                            bodyClass="p-4"
                            className="bg-purple-50"
                          >
                            <div className="flex justify-between">
                              <strong>Maker :</strong>{' '}
                              <span>
                                {values?.instrument_id.instrument_make || '-'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <strong>ID No. :</strong>{' '}
                              <span>
                                {values?.instrument_id.instrument_no || '-'}
                              </span>
                            </div>
                            <div className="flex justify-between capitalize">
                              <strong>Size :</strong>{' '}
                              <span>
                                {values?.instrument_id.instrument_size || '-'}
                              </span>
                            </div>
                            <div className="flex justify-between capitalize">
                              <strong>Freq :</strong>{' '}
                              <span>
                                {values?.instrument_id.instrument_cal_frq ||
                                  '-'}{' '}
                                Year
                              </span>
                            </div>
                          </Card>
                        </div>
                      ) : null}
                    </div>
                    <FormItem
                      className="mb-1"
                      label="Calibration Date"
                      invalid={
                        errors.calibration_date && touched.calibration_date
                      }
                      error={errors.calibration_date}
                    >
                      <Field
                        name="calibration_date"
                        placeholder="Calibration Date"
                      >
                        {({ field, form }) => (
                          <DatePicker
                            size="sm"
                            field={field}
                            form={form}
                            value={values.calibration_date}
                            onChange={(date) => {
                              form.setFieldValue(field.name, date)
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem
                      label="Next Due Date"
                      className="mb-1"
                      invalid={errors.next_due_date && touched.next_due_date}
                      errorMessage={errors.next_due_date}
                    >
                      <Field
                        name="next_due_date"
                        placeholder="Next_Due_Date"
                      >
                        {({ field, form }) => (
                          <DatePicker
                            field={field}
                            size="sm"
                            form={form}
                            value={values.next_due_date}
                            onChange={(date) => {
                              form.setFieldValue(field.name, date)
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>
                    <FormItem
                      label="Certificate No."
                      className="mb-1"
                      invalid={
                        errors.calibration_result && touched.calibration_result
                      }
                      errorMessage={errors.calibration_result}
                    >
                      <Field
                        type="text"
                        name="calibration_report_no"
                        values={values.calibration_result}
                        placeholder="Certificate No."
                        size="sm"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Status"
                      className="mb-1"
                      invalid={
                        errors.calibration_result && touched.calibration_result
                      }
                      errorMessage={errors.calibration_result}
                    >
                      <Field
                        type="text"
                        name="calibration_result"
                        values={values.calibration_result}
                        placeholder="Cal Result"
                        size="sm"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Description"
                      invalid={
                        errors.calibration_description &&
                        touched.calibration_description
                      }
                      errorMessage={errors.calibration_description}
                      className="mb-4"
                    >
                      <Field
                        size="sm"
                        type="text"
                        name="calibration_description"
                        values={values.calibration_description}
                        placeholder="Description"
                        component={Input}
                      />
                    </FormItem>
                  </div>
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

CalibrationForm.defaultProps = {
  type: 'new',
  initialData: {
    calibration_description: '',
    calibration_date: '',
    calibration_result: '',
    calibration_report_no: '',
    next_due_date: '',
    instrument_id: ''
  }
}

export default CalibrationForm
