import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Card, FormItem, Select } from '../../../../../../components/ui'
import { Field } from 'formik'
import { isEmpty } from 'lodash';
import { getAllPosByCustomerId, getAllShippingAddressByCustomerId, getAllShippingDetailsByCustomerId } from '../../NewDispatch/store/dataSlice';
import { useDispatch } from 'react-redux';

const ConsigneeInformationFields = (props) => {
    const { errors, values, touched, customers = [], setFieldValue } = props
    const dispatch = useDispatch()
    const customerData = useMemo(() => {
        return customers.map((customer) => {
            return { label: customer.name, value: customer }
        })
    }, [customers])

    const fetchPoList = useCallback(async () => {
        setFieldValue?.('DispatchShippingAddress', null)
        setFieldValue?.('DispatchShippingDetails', null)
        if (values) {
            dispatch(getAllPosByCustomerId({ customer_id: values?.customer_id, currency_type: 'USD' }))
            dispatch(getAllShippingDetailsByCustomerId({ customer_id: values?.customer_id || '' }))
            dispatch(getAllShippingAddressByCustomerId({ customer_id: values?.customer_id || '' }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values?.customer_id])

    useEffect(() => {
        fetchPoList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values])


    return (
        <FormItem
            className='mb-5 h-max'
            label="Consignee"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name="DispatchConsignee">
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={customerData}
                        value={customerData.filter(
                            (customer) =>
                                customer.value === values
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
            {!isEmpty(values) ? <Card className='mt-2'>
                <div className='flex justify-between'><strong>Customer Code :</strong> <span>{values?.customer_code || '-'}</span></div>
                <div className='flex justify-between'><strong>Vender Code :</strong> <span>{values?.vender_code || '-'}</span></div>
                <div className='flex justify-between'><strong>Mobile :</strong> <span>{values?.mobile || '-'}</span></div>
                <div className='flex justify-between'><strong>Email :</strong> <span>{values?.email || '-'}</span></div>
                <div className='flex justify-between'><strong>PAN No :</strong> <span>{values?.pan || '-'}</span></div>
                <div className='flex justify-between'><strong>GST No :</strong> <span>{values?.gst_no || '-'}</span></div>
            </Card> : null
            }
        </FormItem>
    )
}

export default memo(ConsigneeInformationFields)