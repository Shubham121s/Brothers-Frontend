import React, { forwardRef, useState } from 'react'
import { FormContainer, Button, Card } from '../../../../components/ui'
import { StickyFooter, ConfirmDialog } from '../../../../components/shared'
import { Form, Formik } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import InputInformationFields from './components/InputInformationFields'
import SelectInformationFields from './components/SelectInformationFields'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  code: Yup.string().required('Required'),
  status: Yup.boolean().required('Required'),
  type: Yup.string().required('Required'),
  city: Yup.string(),
  // email: Yup.email().typeError("It should be a email"),
  mobile: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  gst_no: Yup.string(),
  CustomerPermanentAddress: Yup.object().shape({
    address: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    zip_code: Yup.number().required('Required'),
    state: Yup.string().required('Required')
  })
})

export const customerType = [
  { label: 'Customer', value: 'customer' },
  { label: 'Supplier', value: 'supplier' },
  { label: 'Both', value: 'both' }
]
export const customerStatus = [
  { label: 'Active', value: true },
  { label: 'In-Active', value: false }
]

const DeleteProductButton = ({ onDelete, onLoading, type }) => {
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
    onDelete?.({ setDialogOpen, setLoading })
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
        title={<div className="capitalize">Delete {type}</div>}
        loading={loading}
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
        confirmButtonColor="red-600"
      >
        <p>Are you sure you want to delete? This action cannot be undone.</p>
      </ConfirmDialog>
    </>
  )
}

const CustomerForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard, onDelete } = props

  return (
    <Formik
      enableReinitialize={true}
      innerRef={ref}
      initialValues={{
        ...initialData
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const formData = cloneDeep(values)
        onFormSubmit?.(formData, setSubmitting)
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="lg:col-span-1">
                <Card
                  divider
                  className="bg-pink-50 mb-4"
                >
                  <h5>Basic Information</h5>
                  <p className="mb-4">
                    Section to config basic customer/supplier information
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <InputInformationFields
                      errors={errors?.name}
                      touched={touched?.name}
                      placeholder="Customer/Supplier"
                      label="Customer/Supplier"
                      name="name"
                    />
                    <SelectInformationFields
                      errors={errors?.status}
                      touched={touched?.status}
                      name="status"
                      data={customerStatus}
                      values={values.status}
                      label="Status"
                    />
                    <SelectInformationFields
                      errors={errors?.type}
                      touched={touched?.type}
                      name="type"
                      data={customerType}
                      values={values.type}
                      label="Type"
                    />
                    <InputInformationFields
                      errors={errors?.mobile}
                      touched={touched?.mobile}
                      placeholder="Mobile"
                      label="mobile"
                      name="mobile"
                      type="number"
                    />
                    <InputInformationFields
                      errors={errors?.email}
                      touched={touched?.email}
                      placeholder="Email"
                      label="Email"
                      name="email"
                    />
                    <InputInformationFields
                      errors={errors?.phone}
                      touched={touched?.phone}
                      placeholder="Phone"
                      label="Phone"
                      name="phone"
                    />
                    <InputInformationFields
                      errors={errors?.code}
                      touched={touched?.code}
                      placeholder="Customer Code"
                      label="Customer Code"
                      name="code"
                    />
                    <InputInformationFields
                      placeholder="Vender Code"
                      label="Vender Code"
                      name="vender_code"
                    />
                  </div>
                </Card>
                <Card className="bg-emerald-50">
                  <h5>Other Information</h5>
                  <p className="mb-4">Section to config other information</p>
                  <div className="grid grid-cols-2 gap-4">
                    <InputInformationFields
                      errors={errors?.gst_no}
                      touched={touched?.gst_no}
                      placeholder="GST No"
                      label="GST Number"
                      name="gst_no"
                    />
                    <InputInformationFields
                      errors={errors?.pan}
                      touched={touched?.pan}
                      placeholder="PAN Number"
                      label="PAN Number"
                      name="pan"
                    />
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-1">
                <Card className="bg-emerald-50">
                  <h5>Permanent Address Information</h5>
                  <p className="mb-4">
                    Section to config permanent address information
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                      <InputInformationFields
                        errors={errors.CustomerPermanentAddress?.address}
                        touched={touched.CustomerPermanentAddress?.address}
                        placeholder="Full Address"
                        label="Full Address"
                        name="CustomerPermanentAddress.address"
                      />
                    </div>
                    <InputInformationFields
                      errors={errors.CustomerPermanentAddress?.country}
                      touched={touched.CustomerPermanentAddress?.country}
                      placeholder="Country"
                      label="Country"
                      name="CustomerPermanentAddress.country"
                    />
                    <InputInformationFields
                      errors={errors.CustomerPermanentAddress?.state}
                      touched={touched.CustomerPermanentAddress?.state}
                      placeholder="State"
                      label="State"
                      name="CustomerPermanentAddress.state"
                    />
                    <InputInformationFields
                      errors={errors.CustomerPermanentAddress?.state_code}
                      touched={touched.CustomerPermanentAddress?.state_code}
                      placeholder="State Code"
                      label="State Code"
                      name="CustomerPermanentAddress.state_code"
                    />
                    <InputInformationFields
                      errors={errors.CustomerPermanentAddress?.city}
                      touched={touched.CustomerPermanentAddress?.city}
                      placeholder="City"
                      label="City"
                      name="CustomerPermanentAddress.city"
                    />
                    <InputInformationFields
                      errors={errors.CustomerPermanentAddress?.zip_code}
                      touched={touched.CustomerPermanentAddress?.zip_code}
                      placeholder="Zip code"
                      label="Zip code"
                      name="CustomerPermanentAddress.zip_code"
                    />
                  </div>
                </Card>
              </div>
            </div>
            <StickyFooter
              className="-mx-8 px-8 flex items-center justify-between py-4"
              stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              {/* <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete}
                                            type={values.type}
                                        />
                                    )}
                                </div> */}
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
                  {type === 'edit' ? 'Update' : 'Save'}
                </Button>
              </div>
            </StickyFooter>
          </FormContainer>
        </Form>
      )}
    </Formik>
  )
})

CustomerForm.defaultProps = {
  type: 'edit',
  initialData: {
    customer_id: '',
    name: '',
    status: '',
    mobile: '',
    email: '',
    code: '',
    vender_code: '',
    CustomerPermanentAddress: {
      address: '',
      country: '',
      city: '',
      zip_code: '',
      state: '',
      state_code: ''
    },
    gst_no: '',
    pan: '',
    type: ''
  }
}

export default CustomerForm
