import React, { forwardRef } from 'react'
import { FormContainer, Button, FormItem, Input, Select } from '../../../../components/ui'
import { Field, Form, Formik } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { PasswordInput } from '../../../../components/shared'

const userStatus = [
    { label: 'Active', value: true },
    { label: 'In-Active', value: false }
]


const userType = [
    { value: 'super-admin', label: 'Super Admin', color: 'bg-indigo-500' },
    { value: 'executive', label: 'Executive', color: 'bg-green-500' },
]


const validationEditSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email().required('Required'),
    status: Yup.boolean().required('Required'),
    type: Yup.string().required('Required'),
    mobile: Yup.number().required('Required'),
})
const validationNewSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    name: Yup.string().required('Required'),
    status: Yup.boolean().required('Required'),
    type: Yup.string().required('Required'),
    mobile: Yup.number().required('Required'),
    password: Yup.string().required('Required')
})


const UserForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard } = props
    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={type === 'new' ? validationNewSchema : validationEditSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div>
                                <h4>{type === 'edit' && 'Update'} User Information</h4>
                                <p className="mb-6">Section to config basic user information</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormItem
                                        className='mb-4'
                                        label="Name"
                                        invalid={errors.name && touched.name}
                                        errorMessage={errors.name}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="name"
                                            placeholder="Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        className='mb-4'
                                        label="Status"
                                        invalid={errors.status && touched.status}
                                        errorMessage={errors.status}
                                    >
                                        <Field name="status">
                                            {({ field, form }) => (
                                                <Select
                                                    field={field}
                                                    form={form}
                                                    options={userStatus}
                                                    value={userStatus.filter(
                                                        (status) =>
                                                            status.value === values.status
                                                    )}
                                                    onChange={(option) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            option.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        className='mb-4'
                                        label="Type"
                                        invalid={errors.type && touched.type}
                                        errorMessage={errors.type}
                                    >
                                        <Field name="type">
                                            {({ field, form }) => (
                                                <Select
                                                    field={field}
                                                    form={form}
                                                    options={userType}
                                                    value={userType.filter(
                                                        (type) =>
                                                            type.value === values.type
                                                    )}
                                                    onChange={(option) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            option.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        className='mb-4'
                                        label="Mobile"
                                        invalid={errors.mobile && touched.mobile}
                                        errorMessage={errors.mobile}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="mobile"
                                            placeholder="Mobile"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        className='mb-4'
                                        label="Email"
                                        invalid={errors.email && touched.email}
                                        errorMessage={errors.email}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="email"
                                            placeholder="Email"
                                            component={Input}
                                        />
                                    </FormItem>
                                    {
                                        type !== 'edit' && <FormItem
                                            className='mb-4'
                                            label="Password"
                                            invalid={errors.password && touched.password}
                                            errorMessage={errors.password}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="password"
                                                placeholder="Password"
                                                component={PasswordInput}
                                            />
                                        </FormItem>
                                    }
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
                                    icon={<AiOutlineSave className='mr-1' />}
                                    type="submit"
                                >
                                    {type === 'edit' ? 'Update' : 'Save'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

UserForm.defaultProps = {
    type: 'edit',
    initialData: {
        id: '',
        name: '',
        status: '',
        type: '',
        mobile: '',
        email: '',
        password: ''
    },
}

export default UserForm
