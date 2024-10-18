import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import FormData from 'form-data'
import {
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  FormItem,
  Card,
  FormContainer
} from '../../../../components/ui'
import cloneDeep from 'lodash/cloneDeep'
import { StickyFooter } from '../../../../components/shared'
import { AiOutlineSave } from 'react-icons/ai'
import { Field, Form, Formik } from 'formik'
import newEnquiryReducer from './store'
import { injectReducer } from '../../../../store'
import { useSelector, useDispatch } from 'react-redux'
import EnquiryDialog from './components/enquiryDialog'
import * as Yup from 'yup'
import { toggleEmptyProduct, toggleNewDialog } from './store/stateSlice'
import SelectedProductTable from './components/ProductTable'
import { useNavigate } from 'react-router-dom'
import {
  getCustomerAsOption,
  getMaterialGradeAsOption,
  getProductsProfile
} from './store/dataSlice'

injectReducer('newEnquiry', newEnquiryReducer)

const refer = [
  { value: 'MAIL', label: 'By Mail' },
  { value: 'WHATSAPP', label: 'By Whatsapp' },
  { value: 'HAND', label: 'By Hand' }
]
const exports = [
  { value: 'FOREIGN', label: 'Foreign' },
  { value: 'DOMESTIC', label: 'Domestic' }
]

const validationSchema = Yup.object().shape({
  customer_id: Yup.string().required('Required'),
  rfq_number: Yup.string().required('Required'),
  enquiry_date: Yup.string().required('Required'),
  hsn_code: Yup.string().required('Required'),
  domestic_export: Yup.string().required('Required'),
  enq_ref: Yup.string().required('Required'),
  part_number: Yup.string().required('Required'),
  part_name: Yup.string().required('Required'),
  part_type: Yup.string().required('Required'),
  quantity: Yup.string().required('Required'),
  drawing_number: Yup.string().required('Required'),
  material_grade_id: Yup.string().required('Required')
})

const EnquiryForm = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const CustomerOption = useSelector((state) => state.newEnquiry.data.customers)

  const { type, initialData, onFormSubmit, onDiscard } = props

  const onDialog = () => {
    dispatch(toggleNewDialog(true))
  }

  const onNavigate = () => {
    dispatch(toggleEmptyProduct())
    navigate('/enquiry/List')
  }

  useEffect(() => {
    dispatch(getCustomerAsOption())
    dispatch(getMaterialGradeAsOption())
    dispatch(getProductsProfile())
  }, [])

  const Prdoucts = useSelector((state) => state.newEnquiry.data.products)

  return (
    <>
      <div>
        <Formik
          enableReinitialize={true}
          innerRef={ref}
          initialValues={{
            ...initialData
          }}
          // validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = cloneDeep(values)
            onFormSubmit?.(formData)
            dispatch(toggleNewDialog(false))
            values.drawing_number = ''
            values.hsn_code = ''
            values.part_number = ''
            values.part_name = ''
            values.part_type = ''
            values.id = ''
            values.length = ''
            values.width = ''
            values.thickness = ''
            values.qap_attachment = ''
            values.drawing_attachment = ''
            values.quantity = ''
            values.od = ''
            values.material_grade_id = ''
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setErrors,
            handleSubmit,
            resetForm
          }) => {
            const arr = values.products.map((m) => {
              const found = Prdoucts?.find((f) => f.part_name === m.name)
              if (found) {
                return {
                  drawing_number: found.drawing_number,
                  name: found.part_name,
                  cutting_mm: found.cutting_mm,
                  weight: found.weight,
                  quantity: m.quantity
                }
              }
              return {
                name: '',
                cutting_mm: '',
                weight: '',
                drawing_number: '',
                quantity: ''
              }
            })

            values.products = arr
            console.log(values.products)
            return (
              <Form>
                <FormContainer>
                  <Card className="bg-emerald-50 h-max">
                    <div className="grid grid-cols-5 gap-2">
                      <FormItem
                        label="RFQ No."
                        invalid={errors.rfq_number && touched.rfq_number}
                        errorMessage={errors.rfq_number}
                      >
                        <Field
                          type="text"
                          value={values.rfq_number}
                          name="rfq_number"
                          placeholder="RFQ No."
                          component={Input}
                        />
                      </FormItem>
                      <FormItem
                        label="Enquiry Date"
                        invalid={errors.enquiry_date && touched.enquiry_date}
                        errorMessage={errors.enquiry_date}
                      >
                        <Field
                          name="enquiry_date"
                          placeholder="Date"
                        >
                          {({ field, form }) => (
                            <DatePicker
                              field={field}
                              form={form}
                              value={values.enquiry_date}
                              onChange={(date) => {
                                form.setFieldValue(field.name, date)
                              }}
                            />
                          )}
                        </Field>
                      </FormItem>
                      <FormItem
                        label="Customer"
                        invalid={
                          errors.domestic_export && touched.domestic_export
                        }
                        errorMessage={errors.domestic_export}
                      >
                        <Field name="customer_id">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={CustomerOption}
                              value={CustomerOption.filter(
                                (item) => item.value === values.customer_id
                              )}
                              onChange={(option) => {
                                form.setFieldValue(field.name, option.value)
                              }}
                            />
                          )}
                        </Field>
                      </FormItem>
                      <FormItem
                        label="Domestic/Export"
                        invalid={
                          errors.domestic_export && touched.domestic_export
                        }
                        errorMessage={errors.domestic_export}
                      >
                        <Field name="domestic_export">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={exports}
                              value={exports.filter(
                                (item) => item.value === values.domestic_export
                              )}
                              onChange={(option) => {
                                form.setFieldValue(field.name, option.value)
                              }}
                            />
                          )}
                        </Field>
                      </FormItem>
                      <FormItem
                        label="Enquiry Reference"
                        invalid={errors.enq_ref && touched.enq_ref}
                        errorMessage={errors.enq_ref}
                      >
                        <Field name="enq_ref">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={refer}
                              value={refer.filter(
                                (item) => item.value === values.enq_ref
                              )}
                              onChange={(option) => {
                                form.setFieldValue(field.name, option.value)
                              }}
                            />
                          )}
                        </Field>
                      </FormItem>

                      {values.enq_ref === 'MAIL' && (
                        <>
                          <FormItem label="Mail">
                            <Field
                              type="text"
                              name="buyer_mail"
                              placeholder="mail"
                              component={Input}
                            />
                          </FormItem>
                        </>
                      )}
                      {values.enq_ref === 'WHATSAPP' && (
                        <>
                          <FormItem label="Name">
                            <Field
                              type="text"
                              name="buyer_name"
                              placeholder="name"
                              component={Input}
                            />
                          </FormItem>
                        </>
                      )}

                      {values.enq_ref === 'HAND' && (
                        <>
                          <FormItem label="name">
                            <Field
                              type="text"
                              name="buyer_name"
                              placeholder="name"
                              component={Input}
                            />
                          </FormItem>
                          <FormItem label="Number">
                            <Field
                              type="text"
                              name="buyer_mobile"
                              placeholder="number"
                              component={Input}
                            />
                          </FormItem>
                        </>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        className="mr-3"
                        variant="solid"
                        onClick={() => onDialog()}
                        type="button"
                      >
                        Add Item
                      </Button>
                    </div>
                  </Card>

                  <EnquiryDialog
                    values={values}
                    errors={errors}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    onFormSubmit={handleSubmit}
                    setErrors={setErrors}
                  />
                </FormContainer>
              </Form>
            )
          }}
        </Formik>
      </div>
      <div className="mt-4">
        <SelectedProductTable />
      </div>
      <StickyFooter
        className="-mx-8 px-8 flex items-center justify-end py-4"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <div className="md:flex items-center">
          <Button
            size="sm"
            className="mr-3"
            onClick={onNavigate}
            type="button"
          >
            Discard
          </Button>
          <Button
            size="sm"
            variant="solid"
            icon={<AiOutlineSave className="mr-1" />}
            onClick={onNavigate}
            type="button"
          >
            Done
          </Button>
        </div>
      </StickyFooter>
    </>
  )
})

EnquiryForm.defaultProps = {
  type: 'new',
  initialData: {
    customer_id: '',
    rfq_number: '',
    enquiry_date: '',
    domestic_export: '',
    enq_ref: '',
    part_number: '',
    part_name: '',
    part_type: '',
    od: '',
    id: '',
    width: '',
    length: '',
    thickness: '',
    quantity: '',
    buyer_name: '',
    drawing_number: '',
    buyer_mail: '',
    buyer_mobile: '',
    qap_attachment: '',
    drawing_attachment: '',
    hsn_code: '',
    material_grade_id: '',
    products: [
      {
        name: '',
        cutting_mm: '',
        weight: '',
        drawing_number: '',
        quantity: ''
      }
    ]
  }
}

export default EnquiryForm
