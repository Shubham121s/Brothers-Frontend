import React from "react";
import { toggleInvoiceDialog } from "../store/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import ForeignInvoice from "../../../Invoice/Dispatch/Foreign";
import { Dialog } from "../../../../../components/ui";
import PatternInvoice from "../../../Invoice/Dispatch/Pattern";

const InvoiceDialog = () => {
  const dispatch = useDispatch();

  const invoiceDialog = useSelector(
    (state) => state.pattern_invoice.state.invoiceDialog
  );
  const selectedInvoice = useSelector(
    (state) => state.pattern_invoice.state.selectedInvoice
  );

  const onDialogClose = () => {
    dispatch(toggleInvoiceDialog(false));
  };

  return (
    <Dialog
      width={600}
      isOpen={invoiceDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <div className="flex flex-col h-full justify-between">
        <h3 className="mb-4 text-center">Print Pattern Invoice</h3>
        <PatternInvoice
          pattern_invoice_id={selectedInvoice?.pattern_invoice_id}
        />
      </div>
    </Dialog>
  );
};

export default InvoiceDialog;
