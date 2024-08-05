import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Card, FormItem, Select } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

const PoInformationFields = (props) => {
    const { errors, values, touched } = props
    const poList = useSelector(state => state.new_foreign_invoice.data.poList)

    const poListData = useMemo(() => {
        return poList?.map((po) => {
            return { label: po.number, value: po }
        })
    }, [poList])


    return (
        <FormItem
            className='mb-4'
            label="PO Number"
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name='Po'>
                {({ field, form }) => (
                    <Select
                        field={field}
                        form={form}
                        options={poListData}
                        value={poListData.filter(
                            (product) =>
                                product.value?.po_id === values?.po_id
                        )}
                        onChange={(option) => {
                            form.setFieldValue(
                                'PoList',
                                null
                            )
                            form.setFieldValue(
                                field.name,
                                option.value
                            )
                        }
                        }
                    />
                )}
            </Field>
            {!isEmpty(values) ? <Card className='mt-2 bg-emerald-50'>
                <div className='flex justify-between'><strong>PO Number :</strong> <span>{values?.number || '-'}</span></div>
                <div className='flex justify-between'><strong>Currency Type :</strong> <span>{values?.currency_type || '-'}</span></div>
                <div className='flex justify-between'><strong>Po Date :</strong> <span>{dayjs(values?.date).format('DD-MMM-YYYY') || '-'}</span></div>
            </Card> : null
            }
        </FormItem>
    )
}

export default memo(PoInformationFields)