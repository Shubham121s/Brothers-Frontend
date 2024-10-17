import React, { forwardRef, useState } from 'react'
import {
  FormContainer,
  Button,
  FormItem,
  Input,
  Select,
  DatePicker,
  Card,
  Upload,
  Toast,
  Notification
} from '../../../../components/ui'
import { isEmpty } from 'lodash'
import { Field, Form, Formik } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import FormData from 'form-data'
import { putAttachment } from '../store/dataSlice'
import { useDispatch } from 'react-redux'

const validationSchema = Yup.object().shape({
  calibration_date: Yup.string().required('Required'),
  calibration_result: Yup.string().required('Required'),
  calibration_report_no: Yup.string().required('Required'),
  next_due_date: Yup.string().required('Required'),
  Instrument: Yup.object().required('Required')
})

const CalibrationForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard, InstrumentOption } = props
  const [showList, setShowList] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const onSetFormFile = async (form, field, file, path) => {
    const formData = new FormData()
    console.log(path)
    if (path) {
      formData.append('filePath', path)
      if (file[0]) {
        formData.append('file', file[0])
      }
    } else {
      if (file[0]) {
        formData.append('file', file[0])
      }
    }
    setLoading(true)
    const action = await dispatch(putAttachment(formData))

    if (action.payload.status < 300) {
      form.setFieldValue(field.name, file[0])
      Toast.push(
        <Notification
          title={'Success'}
          type="success"
          duration={3000}
        >
          {action?.payload?.data?.message}
        </Notification>,
        {
          placement: 'top-center'
        }
      )
      setLoading(false)
      setShowList(true)
      form.setFieldValue('certificate', action.payload.data.path || '')
    } else {
      Toast.push(
        <Notification
          title={'Error'}
          type="danger"
          duration={3000}
        >
          File Not Uploaded
        </Notification>,
        {
          placement: 'top-center'
        }
      )
    }
    setLoading(false)
    form.setFieldValue(field.name, '')
  }

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
                        invalid={errors.instrument_id && touched.instrument_id}
                        errorMessage={errors.instrument_id}
                      >
                        <Field name="Instrument">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              size="sm"
                              options={InstrumentOption}
                              value={InstrumentOption.filter(
                                (type) =>
                                  type.value.instrument_id ===
                                  values?.Instrument?.instrument_id
                              )}
                              onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItem>
                      {!isEmpty(values.Instrument) ? (
                        <div className=" gap-2 mt-2 h-max">
                          <Card
                            bodyClass="p-4"
                            className="bg-purple-50"
                          >
                            <div className="flex justify-between">
                              <strong>Maker :</strong>{' '}
                              <span>
                                {values?.Instrument.instrument_make || '-'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <strong>ID No. :</strong>{' '}
                              <span>
                                {values?.Instrument.instrument_no || '-'}
                              </span>
                            </div>
                            <div className="flex justify-between capitalize">
                              <strong>Size :</strong>{' '}
                              <span>
                                {values?.Instrument.instrument_size || '-'}
                              </span>
                            </div>
                            <div className="flex justify-between capitalize">
                              <strong>Freq :</strong>{' '}
                              <span>
                                {values?.Instrument.instrument_cal_frq || '-'}{' '}
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
                        errors.calibration_report_no &&
                        touched.calibration_report_no
                      }
                      errorMessage={errors.calibration_report_no}
                    >
                      <Field
                        autoComplete="off"
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
                        autoComplete="off"
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
                      className="mb-4"
                    >
                      <Field
                        autoComplete="off"
                        size="sm"
                        type="text"
                        name="calibration_description"
                        values={values.calibration_description}
                        placeholder="Description"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-2"
                      label=""
                    >
                      <Field name={`file`}>
                        {({ field, form }) => (
                          <Upload
                            size="sm"
                            showList={true}
                            className="cursor-pointer h-[15px]"
                            onChange={(files) =>
                              onSetFormFile(
                                form,
                                field,
                                files,
                                values.certificate
                              )
                            }
                            onFileRemove={(files) =>
                              onSetFormFile(
                                form,
                                field,
                                files,
                                values.certificate
                              )
                            }
                            uploadLimit={1}
                          >
                            <Button
                              variant=""
                              type="button"
                              size="sm"
                              style={{ width: '233px' }}
                              loading={loading}
                            >
                              Certificate (upload)
                            </Button>
                          </Upload>
                        )}
                      </Field>
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
                    loading={isSubmitting || loading}
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
    Instrument: '',
    certificate: '',
    file: ''
  }
}

export default CalibrationForm
