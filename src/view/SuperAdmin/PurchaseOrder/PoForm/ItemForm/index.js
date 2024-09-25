import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Dialog,
  FormContainer,
  FormItem,
  Input,
  Select
} from '../../../../../components/ui'
import { toggleNewPoItemDialog } from '../../NewPo/store/stateSlice'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import InputInformationFields from './components/InputInformationFields'
import DatePickerInformationFields from './components/DatePickerInformationFields'
import ProductInformationFields from './components/ProductInformationFields'
import { toggleEditPoItemDialog } from '../../EditPo/store/stateSlice'

const validationSchema = Yup.object().shape({
  remarks: Yup.string().required('Required'),
  Product: Yup.object().required('Required'),
  revision_number: Yup.string()
    .required('Required')
    .test((drawing, ctx) => {
      if (
        !ctx.parent?.Product?.Drawings.some(
          (drawingRevision) => drawingRevision.revision_number === drawing
        )
      )
        return ctx.createError({ message: 'Not Matched' })
      return true
    }),
  delivery_date: Yup.date().required('Required'),
  quantity: Yup.number()
    .required('Required')
    .test((Quantity, ctx) => {
      if (Quantity < 1) {
        return ctx.createError({ message: 'Quantity should be minimum 1' })
      }
      return true
    }),
  price: Yup.number()
    .typeError('Must be number')
    .required('Required')
    .test((price, ctx) => {
      if (price < 1) {
        return ctx.createError({ message: 'Price should be minimum 1 Rs.' })
      }
      return true
    }),
  gst_type: Yup.string().required('Required'),
  gst: Yup.number().required('Required')
})

const ItemForm = forwardRef((props, ref) => {
  const {
    handleOnAddItem,
    initialData,
    currency_type,
    products = [],
    category,
    mode,
    setItem,
    type,
    setType
  } = props
  const dispatch = useDispatch()

  const newPoItemDialog = useSelector((state) =>
    mode === 'edit'
      ? state.edit_porder.state.editPoItemDialog
      : state.new_po.state.newPoItemDialog
  )
  const onDialogClose = () => {
    if (mode === 'edit') {
      dispatch(toggleEditPoItemDialog(false))
      setItem({})
      setType(false)
    } else {
      dispatch(toggleNewPoItemDialog(false))
      setItem({})
      setType(false)
    }
  }

  const gstOptions = [
    { label: 'GST', value: 'GST' },
    { label: 'NON-GST', value: 'NGST' }
  ]

  //  console.log(products);

  return (
    <Dialog
      isOpen={newPoItemDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <Formik
        innerRef={ref}
        initialValues={{
          ...initialData
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleOnAddItem?.(values)
          resetForm()
          if (mode === 'edit') {
            dispatch(toggleEditPoItemDialog(false))
          } else {
            dispatch(toggleNewPoItemDialog(false))
          }
        }}
      >
        {({ values, touched, errors }) => {
          let total_amount = 0

          if (
            values.gst_type === 'GST' &&
            values.gst &&
            values.price &&
            values.quantity
          ) {
            let gstAmount = 0
            gstAmount =
              (parseFloat(values?.price) *
                parseFloat(values?.quantity) *
                parseFloat(values?.gst)) /
              100

            const totalWithoutGST =
              parseFloat(values?.price) * parseFloat(values?.quantity)

            total_amount = (
              parseFloat(gstAmount) + parseFloat(totalWithoutGST)
            ).toFixed(2)
          }
          if (values.gst_type === 'NGST' && values.price && values.quantity) {
            const totalWithoutGST =
              parseFloat(values?.price) * parseFloat(values?.quantity)

            total_amount = parseFloat(totalWithoutGST).toFixed(2)
          }

          return (
            <Form>
              <FormContainer>
                <div className="flex flex-col h-full justify-between">
                  <h4>New Item Information</h4>
                  <p className="mb-4">Section to config new item information</p>
                  <div className="grid grid-cols-2 gap-2"></div>
                  <div className="grid grid-cols-1 gap-2">
                    <ProductInformationFields
                      errors={errors.Product}
                      touched={touched.Product}
                      values={values.Product}
                      products={products}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <InputInformationFields
                      errors={errors.revision_number}
                      touched={touched.revision_number}
                      className={
                        values.Product?.Drawings?.some(
                          (drawingRevision) =>
                            drawingRevision.revision_number ===
                            values?.revision_number
                        ) && 'bg-emerald-100'
                      }
                      name="revision_number"
                      label="Drawing Revision Number"
                      placeholder="Drawing Revision Number"
                    />
                    <DatePickerInformationFields
                      errors={errors.delivery_date}
                      touched={touched.delivery_date}
                      name="delivery_date"
                      label="PO Delivery Date"
                      placeholder="PO Delivery Date"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <FormItem
                      className="mb-4"
                      label="GST Type"
                      touched={touched.gst_type}
                      errors={errors.gst_type}
                    >
                      <Field name="gst_type">
                        {({ field, form }) => (
                          <Select
                            field={field}
                            form={form}
                            options={gstOptions}
                            value={gstOptions.filter(
                              (gst) => gst?.value === values?.gst_type
                            )}
                            onChange={(option) =>
                              form.setFieldValue(field.name, option.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem>
                    <InputInformationFields
                      touched={touched.gst}
                      errors={errors.gst}
                      type="number"
                      name="gst"
                      label="GST(%)"
                      placeholder="GST %"
                      Product={values.Product}
                    />
                    <InputInformationFields
                      touched={touched.price}
                      errors={errors.price}
                      name="price"
                      label="Price"
                      placeholder="Price"
                      Product={values.gst}
                    />
                    <InputInformationFields
                      errors={errors.quantity}
                      touched={touched.quantity}
                      name="quantity"
                      type="number"
                      placeholder="Quantity"
                      label="Quantity"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <FormItem
                      className="mb-4"
                      label="Amount"
                    >
                      <Field
                        disabled={true}
                        type="text"
                        autoComplete="off"
                        placeholder="Net Amount"
                        prefix={currency_type}
                        value={total_amount ? total_amount : 0}
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-4"
                      label="Remarks"
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="remarks"
                        placeholder="Remarks"
                        component={Input}
                      />
                    </FormItem>
                  </div>
                </div>
                <div className="flex justify-end px-5 py-2 bg-gray-100 gap-2 rounded-bl-lg rounded-br-lg">
                  <Button
                    size="sm"
                    type="button"
                    variant=""
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                  >
                    {type === 'edit' ? 'Update Item' : 'Add Item'}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
})

ItemForm.defaultProps = {
  initialData: {
    delivery_date: null,
    revision_number: '',
    quantity: '',
    Product: null,
    gst_type: '',
    gst: '',
    price: '',
    remarks: ''
  }
}

export default ItemForm
