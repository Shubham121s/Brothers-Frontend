import React from 'react'
import { Dialog } from '../../../../../../components/ui'

const InvoiceConfirmationDialog = ({ isDialogOpen = false, setIsDialogOpen, invoiceNo, handleDiscard, timeOutId }) => {

  const handleDialogDiscard = () => {
    setIsDialogOpen?.(false)
    handleDiscard?.()
    clearTimeout(timeOutId)
  }
  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={handleDialogDiscard}
      onRequestClose={handleDialogDiscard}
    >
      <h2 className='text-gray-500 text-center mb-4'>INVOICE NO</h2>
      <h1 className='text-white mb-1 text-center bg-pink-300 p-3 rounded'>#{invoiceNo}</h1>
      <p className='flex justify-end text-blue-500'>Please note this number</p>
    </Dialog >
  )
}

export default InvoiceConfirmationDialog