import React, { forwardRef, useState, useEffect } from 'react'
import {
  FormContainer,
  Button,
  Card,
  Toast,
  Notification,
  FormItem,
  Select
} from '../../../../components/ui'
import { StickyFooter } from '../../../../components/shared'
import { Form, Formik, Field } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import CustomerInformationFields from './components/CustomerInformationFields'
import ItemTable from './components/ItemTable'
import { useDispatch } from 'react-redux'
import { toggleNewPoItemDialog } from '../NewPo/store/stateSlice'
import { toggleEditPoItemDialog } from '../EditPo/store/stateSlice'
import PoNumberInformationFields from './components/PoNumberInformationFields'
import PoDateInformationFields from './components/PoDateInformationFields'
import PoCurrencyInformationFields from './components/PoCurrencyInformationFields'
import ItemForm from './ItemForm'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import { apiIsPONumberExists } from '../../../../services/SuperAdmin/Po/PoService'
import { debounce } from 'lodash'

var isPOExist = false

const validationSchema = Yup.object().shape({
  Customer: Yup.object().required('Required'),
  number: Yup.string()
    .required('Required')
    .test('isPOExist', 'PO Number Already Exists', function (value) {
      return (
        !isPOExist || this.createError({ message: 'PO Number Already Exists' })
      )
    }),
  date: Yup.date().required('Required'),
  currency_type: Yup.string().required('Required')
})

const PoForm = forwardRef((props, ref) => {
  const {
    initialData,
    onFormSubmit,
    onDiscard,
    customers = [],
    products = [],
    type,
    number = '',
    Notes = [],
    Condition = []
  } = props
  const dispatch = useDispatch()
  const [data, setData] = useState(() => {
    if (type === 'edit' && initialData && initialData.PoLists) {
      return initialData.PoLists
    }
    return []
  })
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    if (type === 'edit' && initialData && initialData.PoLists) {
      setData(initialData.PoLists)
    }
  }, [type, initialData])

  const [item, setItem] = useState({})
  const [itemtype, setType] = useState(false)

  const toggleAddBtn = () => {
    if (type === 'edit') {
      dispatch(toggleEditPoItemDialog(true))
    } else {
      dispatch(toggleNewPoItemDialog(true))
    }
  }

  const handleOnAddItem = (item) => {
    if (itemtype) {
      console.log(item)
      setData((data) =>
        data.map((f, Index) =>
          Index === index
            ? { ...f, ...item, delivery_date: new Date(item?.delivery_date) }
            : f
        )
      )
      setIndex(-1)
    } else {
      setData((data) => [...data, item])
    }
    setItem({})
    setType(false)
  }

  const onRemoveItem = (index) => {
    let array = [...data]
    let indexValue = array.indexOf(index)
    if (indexValue === -1) {
      array.splice(index, 1)
      setData(array)
      setItem({})
      setType(false)
    }
  }

  const onEditItem = (data, index) => {
    if (type === 'edit') {
      dispatch(toggleEditPoItemDialog(true))
    } else {
      dispatch(toggleNewPoItemDialog(true))
    }
    setIndex(index)
    setItem(data)
    setType(true)
  }

  const handleCheck = async (e) => {
    try {
      const response = await apiIsPONumberExists({ number: e.target.value })
      if (response.status === 200) {
        isPOExist = false
      }
    } catch (error) {
      isPOExist = true
    }
  }

  const debouncedHandleCheck = debounce(handleCheck, 500)
  return (
    <>
      <Formik
        enableReinitialize={true}
        innerRef={ref}
        initialValues={{
          ...initialData
        }}
        validateOnBlur={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep({ ...values, items: [...data] })
          if (data.length === 0) {
            setSubmitting(false)
            return Toast.push(
              <Notification
                title={'Required'}
                type="danger"
                duration={2500}
              >
                PO List Required
              </Notification>,
              {
                placement: 'top-center'
              }
            )
          }
          onFormSubmit?.(formData, setSubmitting)
        }}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => {
          return (
            <Form>
              <FormContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="lg:col-span-1">
                    <Card className="bg-gray-50">
                      <CustomerInformationFields
                        touched={touched.Customer}
                        errors={errors.Customer}
                        values={values.Customer}
                        customers={customers}
                      />
                    </Card>
                  </div>
                  <div className="lg:col-span-1">
                    <Card className="bg-green-50">
                      <h5>Sale Order Information</h5>
                      <p className="mb-4">Section to config PO information</p>
                      <div className="grid grid-cols-2 gap-2">
                        <PoNumberInformationFields
                          errors={errors.number}
                          touched={touched.number}
                          type={type}
                          debouncedHandleCheck={debouncedHandleCheck}
                          isPOExist={isPOExist}
                          values={values.number}
                          handleChange={handleChange}
                        />
                        <PoDateInformationFields
                          errors={errors.date}
                          touched={touched.date}
                        />
                        <PoCurrencyInformationFields
                          errors={errors.currency_type}
                          touched={touched.currency_type}
                          values={values.currency_type}
                        />
                      </div>
                    </Card>
                  </div>
                  <div className="lg:col-span-2">
                    <Card className="h-max bg-pink-50">
                      <div className="flex justify-between items-center mb-5">
                        <div>
                          <h5>Sale Order List</h5>
                          <p>Section to config list information</p>
                        </div>
                        <Button
                          size="sm"
                          variant="solid"
                          type="button"
                          onClick={toggleAddBtn}
                        >
                          Add Item
                        </Button>
                      </div>
                      <ItemTable
                        currency={values.currency_type}
                        products={products}
                        data={data}
                        onRemoveItem={onRemoveItem}
                        onEditItem={onEditItem}
                      />
                      <ItemForm
                        handleOnAddItem={handleOnAddItem}
                        currency_type={values.currency_type}
                        initialData={
                          itemtype
                            ? {
                                ...item,
                                delivery_date: new Date(item.delivery_date)
                              }
                            : {}
                        }
                        type={itemtype ? 'edit' : 'new'}
                        mode={type}
                        setItem={setItem}
                        setType={setType}
                      />
                    </Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Card className="bg-blue-50 h-max">
                        <h5 className="font-semibold text-gray-700">
                          Note Information
                        </h5>
                        <p className="mb-2">
                          Section to config note information
                        </p>
                        <FormItem
                          className="mb-0"
                          label=""
                          // invalid={errors && touched}
                          // errorMessage={errors}
                        >
                          <Field name="Note">
                            {({ field, form }) => (
                              <Select
                                field={field}
                                form={form}
                                options={Notes}
                                value={Notes.filter(
                                  (customer) =>
                                    customer.value?.note_id ===
                                    values?.Note?.note_id
                                )}
                                onChange={(option) =>
                                  form.setFieldValue(field.name, option.value)
                                }
                              />
                            )}
                          </Field>
                          {!isEmpty(values?.Note) ? (
                            <Card className="mt-2">
                              <div className="flex flex-col">
                                {values.Note?.notes.map((n, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between"
                                  >
                                    <div>
                                      {index + 1}. <strong>{n.label}:</strong>{' '}
                                      <span>{n.value || '-'}</span>
                                    </div>
                                    <br />
                                  </div>
                                ))}
                              </div>
                            </Card>
                          ) : null}
                        </FormItem>
                      </Card>
                      <Card className="bg-blue-50 h-max">
                        <h5 className="font-semibold text-gray-700">
                          Condition Information
                        </h5>
                        <p className="mb-2">
                          Section to config condition information
                        </p>
                        <FormItem
                          className="mb-0"
                          label=""
                          // invalid={errors && touched}
                          // errorMessage={errors}
                        >
                          <Field name="Condition">
                            {({ field, form }) => (
                              <Select
                                field={field}
                                form={form}
                                options={Condition}
                                value={Condition.filter(
                                  (customer) =>
                                    customer.value?.condition_id ===
                                    values?.Condition?.condition_id
                                )}
                                onChange={(option) =>
                                  form.setFieldValue(field.name, option.value)
                                }
                              />
                            )}
                          </Field>
                          {!isEmpty(values?.Condition?.condition) ? (
                            <Card className="mt-2">
                              <div className="flex justify-between">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: values?.Condition?.condition
                                  }}
                                ></div>
                              </div>
                            </Card>
                          ) : null}
                        </FormItem>
                      </Card>
                    </div>
                  </div>
                </div>
                <StickyFooter
                  className="-mx-8 px-8 flex items-center justify-between py-4"
                  stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <h5 className="flex gap-1 items-center text-gray-600">
                    Total{' '}
                    <h4 className="text-blue-500">
                      {Array.isArray(data) ? data.length : 0}
                    </h4>{' '}
                    {data.length === 1 ? 'item' : 'items'} in list
                  </h5>
                  <div className="md:flex items-center">
                    <Button
                      size="sm"
                      className="mr-3"
                      onClick={() => onDiscard?.()}
                      type="button"
                    >
                      Discard
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      loading={isSubmitting}
                      icon={<AiOutlineSave />}
                      type="submit"
                    >
                      {type === 'edit' ? 'Update' : 'Save'}
                    </Button>
                  </div>
                </StickyFooter>
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </>
  )
})

PoForm.defaultProps = {
  type: 'new',
  initialData: {
    po_id: '',
    date: new Date(),
    number: '',
    Customer: null,
    currency_type: '',
    Note: null,
    Condition: null
  }
}

export default PoForm
