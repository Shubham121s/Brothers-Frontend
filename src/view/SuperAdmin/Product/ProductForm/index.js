import React, { forwardRef, useMemo, useState } from 'react'
import {
  FormContainer,
  Button,
  Card,
  Badge,
  FormItem,
  Upload
} from '../../../../components/ui'
import { StickyFooter, ConfirmDialog } from '../../../../components/shared'
import { Form, Formik, Field } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { HiCheck, HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import InputInformationFields from './components/InputInformationFields'
import SelectInformationFields from './components/SelectInformationFields'
import { components } from 'react-select'
import DrawingFields from '../Drawing/DrawingForm/DrawingFields'
import { apiIsProductExist } from '../../../../services/SuperAdmin/Product/IndexService'
import { debounce } from 'lodash'
import ItemCodeInformationField from './components/ItemCodeInformationField'
const { Control } = components

var isCodeExixts = false

const validationSchema1 = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  material_grade_id: Yup.string().required('Required'),
  unit_measurement: Yup.string().required('Required'),
  standard_lead_time: Yup.string().required('Required'),
  standard_lead_time_type: Yup.string().required('Required'),
  pattern_id: Yup.string().required('Required'),
  item_code: Yup.string()
    .required('Required')
    .test('isCodeExixts', 'Item Code Already Exists', function (value) {
      return (
        !isCodeExixts ||
        this.createError({ message: 'Item Code Already Exists' })
      )
    }),
  category_id: Yup.string().required('Required'),
  drawing_number: Yup.string().required('Required'),
  raw_weight: Yup.number().required('Required'),
  revision_number: Yup.string().required('Required'),
  scrap_weight: Yup.number(),
  finish_weight: Yup.number()
    .test((weight, ctx) => {
      if (weight === 0) {
        return false
      }
      if (weight > ctx.parent.raw_weight) {
        ctx.parent.scrap_weight = 0
        return ctx.createError({
          message: `Greater than Raw Weight ${ctx.parent.raw_weight} ${
            ctx.parent.product_um ? ctx.parent.product_um : ''
          }`
        })
      }
      return true
    })
    .required('Required')
})

const validationSchema2 = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  material_grade_id: Yup.string().required('Required'),
  unit_measurement: Yup.string().required('Required'),
  standard_lead_time: Yup.string().required('Required'),
  standard_lead_time_type: Yup.string().required('Required'),
  pattern_id: Yup.string().required('Required'),
  item_code: Yup.string().required('Required'),
  category_id: Yup.string().required('Required'),
  drawing_number: Yup.string().required('Required')
})

export const standardLeadTimeType = [
  // { label: 'Days', value: 'days' },
  { label: 'Weeks', value: 'weeks' }
  // { label: 'Months', value: 'months' },
  // { label: 'Years', value: 'years' },
]
export const productUnitMeasurement = [
  { label: 'No', value: 'no' }
  // { label: 'Kg', value: 'kg' },
  // { label: 'MM', value: 'mm' },
]

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 cursor-pointer ${
        isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'
      }`}
      {...innerProps}
    >
      <div className="flex items-center gap-2">
        <Badge
          innerClass={data.availability ? 'bg-emerald-500' : 'br-red-500'}
        />
        <span>{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  )
}

const CustomControl = ({ children, ...props }) => {
  const selected = props.getValue()[0]
  return (
    <Control {...props}>
      {selected && (
        <Badge
          className="ltr:ml-4 rtl:mr-4"
          innerClass={selected.availability ? 'bg-emerald-500' : 'br-red-500'}
        />
      )}
      {children}
    </Control>
  )
}

const DeleteProductButton = ({ onDelete, product_id }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onConfirmDialogOpen = () => {
    setDialogOpen(true)
  }

  const onConfirmDialogClose = () => {
    setDialogOpen(false)
  }

  const handleConfirm = () => {
    setLoading(true)
    onDelete?.({ setDialogOpen, setLoading, product_id })
  }

  return (
    <>
      <Button
        className="text-red-600"
        variant="plain"
        size="sm"
        icon={<HiOutlineTrash className="mr-1" />}
        type="button"
        onClick={onConfirmDialogOpen}
      >
        Delete
      </Button>
      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={onConfirmDialogClose}
        onRequestClose={onConfirmDialogClose}
        type="danger"
        title="Delete Product"
        loading={loading}
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
      </ConfirmDialog>
    </>
  )
}

const ProductForm = forwardRef((props, ref) => {
  const {
    type,
    initialData,
    onFormSubmit,
    onDiscard,
    onDelete,
    categories = [],
    materialGrades = [],
    patterns = []
  } = props

  const categoryData = useMemo(() => {
    return categories.map((category) => {
      return { label: category.name, value: category.category_id }
    })
  }, [categories])

  const materialGradesData = useMemo(() => {
    return materialGrades.map((material) => {
      return { label: material.number, value: material.material_grade_id }
    })
  }, [materialGrades])

  const patternData = useMemo(() => {
    return patterns.map((pattern) => {
      return {
        label: pattern.number,
        value: pattern.pattern_id,
        availability: pattern.availability
      }
    })
  }, [patterns])

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file[0])
  }

  const handleCheck = async (e) => {
    try {
      const response = await apiIsProductExist({ item_code: e.target.value })
      if (response.status == 201) {
        isCodeExixts = false
      }
    } catch (error) {
      isCodeExixts = true
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
        validationSchema={
          type === 'edit' ? validationSchema2 : validationSchema1
        }
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values)
          onFormSubmit?.(formData, setSubmitting)
        }}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="bg-emerald-50 h-max">
                  <h5>Basic Information</h5>
                  <p className="mb-4">
                    Section to config basic product information
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <InputInformationFields
                      errors={errors?.name}
                      touched={touched?.name}
                      placeholder="Product Name"
                      label="Product Name"
                      name="name"
                    />
                    <InputInformationFields
                      errors={errors?.drawing_number}
                      touched={touched?.drawing_number}
                      placeholder="Drawing Number"
                      label="Drawing Number"
                      name="drawing_number"
                    />
                    <ItemCodeInformationField
                      errors={errors?.item_code}
                      touched={touched?.item_code}
                      placeholder="Item Code"
                      label="Item Code"
                      type={type}
                      values={values}
                      handleChange={handleChange}
                      debouncedHandleCheck={debouncedHandleCheck}
                      isCodeExixts={isCodeExixts}
                      name="item_code"
                    />
                    <InputInformationFields
                      errors={errors?.raw_code}
                      touched={touched?.raw_code}
                      placeholder="Raw Code"
                      label="Raw Code"
                      name="row_code"
                    />
                    <InputInformationFields
                      errors={errors?.hsn_code}
                      touched={touched?.hsn_code}
                      placeholder="HSN Code"
                      label="HSN Code"
                      name="hsn_code"
                    />
                    <InputInformationFields
                      errors={errors?.pump_model}
                      touched={touched?.pump_model}
                      placeholder="Pump Model"
                      label="Pump Model"
                      name="pump_model"
                    />
                    <InputInformationFields
                      errors={errors?.description}
                      touched={touched?.description}
                      placeholder="Remarks"
                      label="Remarks"
                      name="description"
                    />
                    {/* <InputInformationFields
                                            errors={errors?.gst_percentage}
                                            touched={touched?.gst_percentage}
                                            placeholder="GST Percentage"
                                            label="GST (%)"
                                            type='number'
                                            name="gst_percentage"
                                        /> */}
                  </div>
                </Card>
                <Card className="bg-blue-50 h-max">
                  <h5>Other Information</h5>
                  <p className="mb-6">Section to config other information</p>
                  <div className="grid grid-cols-2 gap-3">
                    <InputInformationFields
                      errors={errors?.standard_lead_time}
                      touched={touched?.standard_lead_time}
                      name="standard_lead_time"
                      type="number"
                      placeholder="Standard Lead Time"
                      label="SLT"
                    />
                    <SelectInformationFields
                      errors={errors?.standard_lead_time_type}
                      touched={touched?.standard_lead_time_type}
                      name="standard_lead_time_type"
                      data={standardLeadTimeType}
                      values={values.standard_lead_time_type}
                      label="SLT Type"
                    />
                    <SelectInformationFields
                      errors={errors?.unit_measurement}
                      touched={touched?.unit_measurement}
                      name="unit_measurement"
                      data={productUnitMeasurement}
                      values={values.unit_measurement}
                      label="Unit Measurement"
                    />
                    <SelectInformationFields
                      errors={errors?.category_id}
                      touched={touched?.category_id}
                      name="category_id"
                      data={categoryData}
                      values={values.category_id}
                      label="Category"
                    />
                    <SelectInformationFields
                      errors={errors?.material_grade_id}
                      touched={touched?.material_grade_id}
                      name="material_grade_id"
                      data={materialGradesData}
                      values={values.material_grade_id}
                      label="Material Grade"
                    />
                    <SelectInformationFields
                      errors={errors?.pattern_id}
                      touched={touched?.pattern_id}
                      name="pattern_id"
                      data={patternData}
                      values={values.pattern_id}
                      label="Pattern"
                      components={{
                        Option: CustomSelectOption,
                        Control: CustomControl
                      }}
                    />
                  </div>
                </Card>
                {type === 'new' && (
                  <Card className="bg-red-50 h-max">
                    <div className="grid grid-cols-1 gap-2 p-2">
                      <DrawingFields
                        touched={touched}
                        errors={errors}
                        values={values}
                      />
                      <FormItem
                        className="mb-4"
                        label="Process Sheet"
                      >
                        <Field name="process_attachment">
                          {({ field, form }) => (
                            <Upload
                              draggable
                              showList={true}
                              className="cursor-pointer h-[100px]"
                              onChange={(files) =>
                                onSetFormFile(form, field, files)
                              }
                              onFileRemove={(files) =>
                                onSetFormFile(form, field, files)
                              }
                              uploadLimit={1}
                            >
                              <div className="text-center">
                                <p className="font-semibold">
                                  <span className="text-gray-800 dark:text-white">
                                    Drop your pdf here, or{' '}
                                  </span>
                                  <span className="text-blue-500">browse</span>
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  Support: pdf
                                </p>
                              </div>
                            </Upload>
                          )}
                        </Field>
                      </FormItem>

                      <FormItem
                        className="mb-4"
                        label="Raw Attachment"
                      >
                        <Field name="raw_attachment">
                          {({ field, form }) => (
                            <Upload
                              draggable
                              showList={true}
                              className="cursor-pointer"
                              onChange={(files) =>
                                onSetFormFile(form, field, files)
                              }
                              onFileRemove={(files) =>
                                onSetFormFile(form, field, files)
                              }
                              uploadLimit={1}
                            >
                              <div className="text-center">
                                <p className="font-semibold">
                                  <span className="text-gray-800 dark:text-white">
                                    Drop your pdf here, or{' '}
                                  </span>
                                  <span className="text-blue-500">browse</span>
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  Support: pdf
                                </p>
                              </div>
                            </Upload>
                          )}
                        </Field>
                      </FormItem>
                      <FormItem label="Finish Attachment">
                        <Field name="finish_attachment">
                          {({ field, form }) => (
                            <Upload
                              draggable
                              showList={true}
                              className="cursor-pointer"
                              onChange={(files) =>
                                onSetFormFile(form, field, files)
                              }
                              onFileRemove={(files) =>
                                onSetFormFile(form, field, files)
                              }
                              uploadLimit={1}
                            >
                              <div className="text-center">
                                <p className="font-semibold">
                                  <span className="text-gray-800 dark:text-white">
                                    Drop your pdf here, or{' '}
                                  </span>
                                  <span className="text-blue-500">browse</span>
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                  Support: pdf
                                </p>
                              </div>
                            </Upload>
                          )}
                        </Field>
                      </FormItem>
                    </div>
                  </Card>
                )}
              </div>
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
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
                    icon={<AiOutlineSave className="mr-1" />}
                    type="submit"
                  >
                    {type === 'new' ? 'Save' : 'Update'}
                  </Button>
                </div>
              </StickyFooter>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  )
})

ProductForm.defaultProps = {
  type: 'new',
  initialData: {
    product_id: '',
    pattern_id: '',
    category_id: '',
    material_grade_id: '',
    name: '',
    item_code: '',
    row_code: '',
    pump_model: '',
    unit_measurement: 'no',
    hsn_code: '',
    description: '',
    standard_lead_time: '',
    standard_lead_time_type: 'weeks',
    drawing_number: '',
    Product: {
      drawing_number: ''
    },
    raw_weight: '',
    drawing_number: '',
    finish_weight: '',
    drawing_revision_number: '',
    raw_attachment: '',
    finish_attachment: '',
    process_attachment: ''
  }
}

export default ProductForm
