import React from 'react'
import { toggleInvoiceDialog } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import ForeignInvoice from '../../../Invoice/Dispatch/Foreign'
import { Dialog } from '../../../../../components/ui'
import DomesticInvoice from '../../../Invoice/Dispatch/Domestic'
import InvoiceExcel from '../../../Excel/Excel'

const InvoiceDialog = () => {
  const dispatch = useDispatch()

  const invoiceDialog = useSelector(
    (state) => state.dispatch_invoice.state.invoiceDialog
  )
  const selectedInvoice = useSelector(
    (state) => state.dispatch_invoice.state.selectedInvoice
  )

  const onDialogClose = () => {
    dispatch(toggleInvoiceDialog(false))
  }

  return (
    <Dialog
      width={600}
      isOpen={invoiceDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      {selectedInvoice?.invoice_type === 'domestic' ? (
        <div className="flex flex-col h-full justify-between">
          <h3 className="mb-4 text-center">Print Domestic Invoice</h3>
          <DomesticInvoice
            dispatch_invoice_id={selectedInvoice?.dispatch_invoice_id}
          />
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between">
          <h3 className="mb-4 text-center">Print Foreign Invoice</h3>
          <ForeignInvoice
            dispatch_invoice_id={selectedInvoice?.dispatch_invoice_id}
          />
        </div>
      )}
      {/* <InvoiceExcel /> */}
    </Dialog>
  )
}

export default InvoiceDialog
