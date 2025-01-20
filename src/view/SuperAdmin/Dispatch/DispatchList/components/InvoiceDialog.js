import React, { useState, useCallback, useMemo, useEffect } from "react";
import { toggleInvoiceDialog } from "../store/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import ForeignInvoice from "../../../Invoice/Dispatch/Foreign";
import { Dialog, Input } from "../../../../../components/ui";
import DomesticInvoice from "../../../Invoice/Dispatch/Domestic";

const InvoiceDialog = () => {
  const dispatch = useDispatch();
  const [rowCount, setRowCount] = useState(8);
  const [changeCount, setChangeCount] = useState(8);

  const invoiceDialog = useSelector(
    (state) => state.dispatch_invoice.state.invoiceDialog
  );
  const selectedInvoice = useSelector(
    (state) => state.dispatch_invoice.state.selectedInvoice
  );

  useEffect(() => {
    if (invoiceDialog) {
      setChangeCount(8);
      setRowCount(8);
    }
  }, [invoiceDialog]);

  // Close dialog handler
  const onDialogClose = useCallback(() => {
    dispatch(toggleInvoiceDialog(false));
  }, [dispatch]);

  // Update rowCount handler
  const handleRowCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRowCount(value);
  };

  const handleChangeCount = (e) => {
    const value = parseInt(e.target.value);
    setChangeCount(value);
  };

  // Memoized rendering of the invoice
  const InvoiceComponent = useMemo(() => {
    return selectedInvoice?.invoice_type === "domestic" ? (
      <DomesticInvoice
        dispatch_invoice_id={selectedInvoice?.dispatch_invoice_id}
        TABLE_ROW_COUNT={Number(rowCount)}
      />
    ) : (
      <ForeignInvoice
        dispatch_invoice_id={selectedInvoice?.dispatch_invoice_id}
        TABLE_ROW_COUNT={Number(rowCount)}
      />
    );
  }, [selectedInvoice, rowCount]);

  return (
    <Dialog
      width={1000}
      isOpen={invoiceDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      {selectedInvoice?.invoice_type === "domestic" ? (
        <h3 className="mb-4 text-center">Print Domestic Invoice</h3>
      ) : (
        <h3 className="mb-4 text-center">Print Foreign Invoice</h3>
      )}
      <div className="flex justify-end items-center">
        <p className="mr-1">Products/Page : </p>
        <Input
          type="number"
          value={changeCount}
          style={{ width: "50px" }}
          size="sm"
          onBlur={handleRowCountChange}
          onChange={handleChangeCount}
        />
      </div>

      <div className="flex flex-col h-full justify-between mt-2">
        {InvoiceComponent}
      </div>
    </Dialog>
  );
};

export default InvoiceDialog;
