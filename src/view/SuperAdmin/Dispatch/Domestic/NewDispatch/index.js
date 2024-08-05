import React, { useEffect, useState } from 'react'
import { Toast, Notification } from '../../../../../components/ui'
import { getAllCustomers, postNewDispatchDomesticInvoice } from './store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import NewDispatchForeignReducer from './store'
import { injectReducer } from '../../../../../store'
import NewDispatchForm from '../NewDispatchForm'
import { useNavigate } from 'react-router-dom'
import InvoiceConfirmationDialog from './components/InvoiceConfirmationDialog'

injectReducer('new_domestic_invoice', NewDispatchForeignReducer)

const pushNotification = (message, type, title) => {
    return (
        Toast.push(
            <Notification
                title={title}
                type={type}
                duration={2500}
            >
                {message}
            </Notification>,
            {
                placement: 'top-end',
            }
        )
    )
}

const NewDispatch = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [invoiceNo, setInvoiceNo] = useState(null)
    const [timeOutId, setTimeOutId] = useState(null)

    useEffect(() => {
        dispatch(getAllCustomers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const customers = useSelector(state => state.new_domestic_invoice.data.customerList)

    const addDomesticInvoice = async (data) => {
        const action = await dispatch(postNewDispatchDomesticInvoice(data))
        return action
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        const action = await addDomesticInvoice(values)
        setSubmitting(false)
        if (action?.payload?.status === 200) {
            setIsDialogOpen(true)
            setInvoiceNo(action.payload?.data?.invoice_no)
            const timeOut = setTimeout(() => {
                setIsDialogOpen(false)
            }, 60000);
            setTimeOutId(timeOut)
            return pushNotification(action?.payload?.data?.message, "success", "Successfully added")
        }
        return pushNotification(action?.payload?.data?.message, "danger", "Unsuccessfully")
    }

    const handleDiscard = () => {
        navigate('/super/admin/dispatch-list')
    }

    return (
        <>
            <NewDispatchForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
                customers={customers}
                pushNotification={pushNotification}
            />
            <InvoiceConfirmationDialog
                handleDiscard={handleDiscard}
                isDialogOpen={isDialogOpen}
                invoiceNo={invoiceNo}
                setIsDialogOpen={setIsDialogOpen}
                timeOutId={timeOutId}
            />
        </>
    )
}

export default NewDispatch
