import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, FormContainer, FormItem, Notification, Toast } from '../../../../components/ui'
import { togglePasswordDialog } from '../store/stateSlice'
import { putPasswordRetailer } from '../store/dataSlice'
import { Field, Form, Formik } from 'formik'
import { PasswordInput } from '../../../../components/shared'
import { AiOutlineSave } from 'react-icons/ai'
import cloneDeep from 'lodash/cloneDeep';
import * as Yup from 'yup'



const validationSchema = Yup.object().shape({
    admin_password: Yup.string().required('Admin Password Required'),
    password: Yup.string().required('Password Required'),
})

const PasswordUpdateDialog = () => {

    const dispatch = useDispatch()
    const passwordDialog = useSelector(
        (state) => state.worker.state.passwordDialog
    )

    const selectedRetailer = useSelector(state => state.worker.state.selectedRetailer)

    const onDialogClose = () => {
        dispatch(togglePasswordDialog(false))
    }



    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const action = await dispatch(putPasswordRetailer({ retailer_id: selectedRetailer?.retailer_id, ...values }))
        setSubmitting(false)
        if (action.payload.status === 200) {
            Toast.push(
                <Notification
                    title={'Successfully Updated'}
                    type="success"
                    duration={2500}
                >
                    Password successfully updated
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            onDialogClose()
        } else {
            Toast.push(
                <Notification
                    title={'Failed'}
                    type="danger"
                    duration={2500}
                >
                    {action.payload.data?.message}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <Dialog
            isOpen={passwordDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4 className='text-center mb-5'>Update Password</h4>
            <Formik
                initialValues={{
                    admin_password: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    handleFormSubmit(formData, setSubmitting)
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-2 gap-3">
                                <FormItem
                                    className='mb-2'
                                    label="Retailer Password"
                                    invalid={errors.password && touched.password}
                                    errorMessage={errors.password}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Retailer Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                                <FormItem
                                    className='mb-2'
                                    label="Your Password"
                                    invalid={errors.admin_password && touched.admin_password}
                                    errorMessage={errors.admin_password}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="admin_password"
                                        placeholder="Your Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                            </div>
                            <div className="flex items-center gap-2 mt-8 justify-end">
                                <Button
                                    size="sm"
                                    className="ltr:mr-3 rtl:ml-3"
                                    onClick={onDialogClose}
                                    type="button"
                                >
                                    Discard
                                </Button>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    loading={isSubmitting}
                                    icon={<AiOutlineSave className='mr-1' />}
                                    type="submit"
                                >
                                    {isSubmitting ? 'Updating...' : 'Update'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form >
                )}
            </Formik >
        </Dialog >
    )
}

export default PasswordUpdateDialog