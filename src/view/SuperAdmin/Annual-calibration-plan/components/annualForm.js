import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  FormContainer,
  Input,
  FormItem,
  DatePicker,
  Toast,
  Notification
} from '../../../../components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { toggleNewDialog } from '../store/stateSlice'
import { postAnnual, updateAnnual } from '../store/dataSlice'

const AnnualForm = () => {
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()
  const [annualData, setAnnualData] = useState(null)
  const dialog = useSelector((state) => state.annual.state.newDialog)
  const selectedAnnual = useSelector(
    (state) => state.annual.state.selectedAnnual
  )

  const onDialogClose = (e) => {
    dispatch(toggleNewDialog(false))
  }

  const onDialogOk = (e) => {
    console.log('onDialogOk', e)
    dispatch(toggleNewDialog(false))
  }
  const validationSchema = Yup.object().shape({
    calibration_description: Yup.string().required('Required'),
    calibration_code_no: Yup.string().required('Required'),
    calibration_serial_no: Yup.string().required('Required'),
    calibration_maker: Yup.string().required('Required'),
    calibration_range: Yup.string().required('Required'),
    calibration_frequency: Yup.string().required('Required'),
    calibration_date: Yup.string().required('Required'),
    calibration_agency: Yup.string().required('Required'),
    calibration_result: Yup.string().required('Required'),
    calibration_report_no: Yup.string().required('Required'),
    next_due_date: Yup.string().required('Required')
  })

  useEffect(() => {
    if (selectedAnnual) {
      setEdit(true)
      // setValues(selectedAnnual)
      console.log('hi')
      setAnnualData({
        ...selectedAnnual,
        calibration_date: new Date(selectedAnnual.calibration_date),
        next_due_date: new Date(selectedAnnual.next_due_date)
      })
    } else {
      setEdit(false)
      setAnnualData({
        calibration_description: '',
        calibration_date: '',
        calibration_result: '',
        calibration_certificate_no: '',
        next_due_date: '',
        instrument_id: ''
      })
    }
  }, [selectedAnnual])
  const handleSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = edit
      ? await dispatch(updateAnnual(values))
      : await dispatch(postAnnual(values))
    console.log(action.payload.status)
    if (action.payload.status < 300) {
      setSubmitting(false)

      dispatch(toggleNewDialog(false))
    } else {
    }
  }
  return (
    <>
      <Dialog
        className="w-[60%]"
        isOpen={dialog}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        width={750}
      >
        <Formik
          enableReinitialize={true}
          initialValues={annualData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting)
          }}
        >
          {({ values, touched, errors, isSubmitting }) => {
            return (
              <Form className=" ">
                <h4 className=" mb-4 text-center">Add data</h4>
                <FormContainer>
                  <div className="grid grid-cols-3 gap-4">
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
                      className="mb-1"
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
                  <div className="flex justify-end gap-4 items-center">
                    <Button
                      type="button"
                      className="ltr:mr-2 rtl:ml-2"
                      variant=""
                      size="sm"
                      onClick={onDialogClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      type="submit"
                      size="sm"
                      loading={isSubmitting}
                    >
                      Okay
                    </Button>
                  </div>
                </FormContainer>
              </Form>
            )
          }}
        </Formik>
      </Dialog>
    </>
  )
}

export default AnnualForm
