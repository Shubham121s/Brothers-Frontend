import React, { memo, useEffect, useState } from 'react'
import { Button, Card, FormItem, Input, InputGroup } from '../../../../../../../components/ui'
import { Field } from 'formik'
import { HiMinus, HiPlus } from 'react-icons/hi'

const getAllPoList = (dispatchList = []) => {
    return dispatchList?.reduce((allPoList, item) => {
        return allPoList?.concat(item.poList);
    }, []);
};

const ItemQuantityInformationFields = (props) => {
    const { errors, values, touched, poList, dispatchList } = props
    const [value, setValue] = useState(values || 0)
    const [pendingQuantity, setPendingQuantity] = useState(parseInt(poList?.quantity) - parseInt(getAllPoList(dispatchList)?.filter((item) => item?.PoList?.po_list_id === poList?.po_list_id)?.reduce((sum, po) => sum + parseInt(po?.quantity), 0)) || 0)


    useEffect(() => {
        setPendingQuantity(parseInt(poList?.quantity) - parseInt(getAllPoList(dispatchList)?.filter((item) => item?.PoList?.po_list_id === poList?.po_list_id)?.reduce((sum, po) => sum + parseInt(po?.quantity), 0)) || 0)
    }, [poList])

    return (
        <FormItem
            label="Quantity"
            className='mb-4'
            invalid={errors && touched}
            errorMessage={errors}
        >
            <Field name='quantity'
            >
                {({ field, form }) => (
                    <div className='grid grid-cols-4 gap-1'>
                        <div className='col-span-1'>
                            <Button className='w-full' style={{ borderRadius: '5px 0px 0px 5px' }} type='button' icon={<HiMinus />} disabled={values < 1} onClick={() => {
                                setValue(+parseInt(value || 0) - 1)
                                form.setFieldValue(
                                    field.name,
                                    (+parseInt(values || 0) - 1)
                                )
                            }}></Button>
                        </div>
                        <div className='col-span-2 grid grid-cols-2 gap-1'>
                            <Card className='flex justify-center items-center' bodyClass='p-0 flex justify-center item-center'>{pendingQuantity}</Card>
                            <Input
                                className='w-full'
                                field={field}
                                form={form}
                                type="number"
                                autoComplete="off"
                                value={value || ''}
                                onChange={(event) => {
                                    if (event.target.value > pendingQuantity || event.target.value === '' || event.target.value < 0) {
                                        setValue(0)
                                        return form.setFieldValue(
                                            field.name,
                                            0
                                        )
                                    }
                                    setValue(parseInt(event.target.value))
                                    form.setFieldValue(
                                        field.name,
                                        +parseInt(event.target.value)
                                    )

                                }}
                            />
                        </div>
                        <div className='col-span-1'>
                            <Button className='w-full' style={{ borderRadius: '0px 5px 5px 0px' }} disabled={value === pendingQuantity} icon={<HiPlus />} type='button' onClick={() => {
                                form.setFieldValue(
                                    field.name,
                                    (+parseInt(value || 0) + 1)
                                )
                                setValue(+parseInt(value || 0) + 1)
                            }}></Button>
                        </div>
                    </div>
                )}
            </Field>
        </FormItem>
    )
}

export default memo(ItemQuantityInformationFields)