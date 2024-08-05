import React, { forwardRef } from 'react'
import { FormContainer, Button, FormItem, Input, Select } from '../../../../../../components/ui'
import { Field, Form, Formik } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

const categoryStatus = [
    { label: 'Active', value: true },
    { label: 'In-Active', value: false }
]


const validationSchema = Yup.object().shape({
    status: Yup.boolean().required('Status Required'),
    name: Yup.string().required('Name Required'),
})


const CategoryForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
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
                            <div>
                                <h4>{type === 'edit' && 'Update'} Category Information</h4>
                                <p className="mb-6">Section to config basic category information</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormItem
                                        label="Category Name"
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
                                        label="Category Status"
                                        invalid={errors.status && touched.status}
                                        errorMessage={errors.status}
                                    >
                                        <Field name="status">
                                            {({ field, form }) => (
                                                <Select
                                                    field={field}
                                                    form={form}
                                                    options={categoryStatus}
                                                    value={categoryStatus.filter(
                                                        (category) =>
                                                            category.value === values.status
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
                                </div>
                            </div>
                            <div className="flex gap-4 justify-end">
                                <Button
                                    size="sm"
                                    className="ltr:mr-3 rtl:ml-3"
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

CategoryForm.defaultProps = {
    type: 'edit',
    initialData: {
        category_id: '',
        name: '',
        status: ''
    },
}

export default CategoryForm
