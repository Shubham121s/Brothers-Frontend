import React from 'react'
import { Input, FormItem } from '../../../../../components/ui'
import { Field } from 'formik'


const DrawingFields = (props) => {
    const { values, touched, errors } = props
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormItem
                    className='mb-4'
                    label="Drawing Revision Number"
                    invalid={errors.revision_number && touched.revision_number}
                    errorMessage={errors.revision_number}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name='revision_number'
                        placeholder="Drawing Revision Number"
                        component={Input}
                        prefix={values.Product.drawing_number && `${values.Product?.drawing_number} -`}
                    />
                </FormItem>
                <FormItem
                    className='mb-4'
                    label="Raw weight"
                    invalid={errors.raw_weight && touched.raw_weight}
                    errorMessage={errors.raw_weight}
                >
                    <Field
                        type="number"
                        autoComplete="off"
                        name='raw_weight'
                        placeholder="Raw weight"
                        suffix='Kg'
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    className='mb-4'
                    label="Finish weight"
                    invalid={errors.finish_weight && touched.finish_weight}
                    errorMessage={errors.finish_weight}
                >
                    <Field
                        type="number"
                        autoComplete="off"
                        name='finish_weight'
                        placeholder="Finish weight"
                        suffix='Kg'
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    className='mb-4'
                    label="Scrap weight"
                >
                    <Field
                        type="text"
                        disabled={true}
                        autoComplete="off"
                        placeholder="Scrap weight"
                        suffix='Kg'
                        component={Input}
                        value={(values.raw_weight && values.finish_weight) ? (values.raw_weight < values.finish_weight) ? 0 : (values.raw_weight - values.finish_weight) : ''}
                    />
                </FormItem>
            </div>
        </>
    )
}

export default DrawingFields
