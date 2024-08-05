import React from 'react'
import { injectReducer } from '../../../../store'
import dispatchInvoiceReducer from './store'
import { Card } from '../../../../components/ui'
import DispatchInvoiceTableTools from './components/DispatchInvoiceTableTools'
import DispatchInvoiceTable from './components/DispatchInvoiceTable'
import InvoiceDialog from './components/InvoiceDialog'

injectReducer('dispatch_invoice', dispatchInvoiceReducer)

const DispatchList = () => {
  return (
    <>
      <DispatchInvoiceTableTools />
      <Card>
        <DispatchInvoiceTable />
        <InvoiceDialog />
      </Card>
    </>
  )
}

export default DispatchList