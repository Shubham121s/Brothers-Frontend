import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { useSelector } from 'react-redux'

const TotalAmountInformationFields = (props) => {
    const { quantity = 0 } = props
    const selectedDispatchItem = useSelector(state => state.edit_domestic_dispatch.state.selectedDispatchItem)
    return (
        <FormItem
            label="Total Amount"
            className='mb-4'
        >
            <Field
                disabled={true}
                placeholder="Total Amount"
                prefix={selectedDispatchItem?.Po?.currency_type}
                value={(Number(selectedDispatchItem?.PoList?.unit_price) * Number(quantity)).toFixed(2)}
                component={Input}
            />
        </FormItem>
    )
}

export default memo(TotalAmountInformationFields)