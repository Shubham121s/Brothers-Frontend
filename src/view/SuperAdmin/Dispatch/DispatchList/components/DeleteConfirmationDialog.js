import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglDeleteConfirmationDialog } from "../store/stateSlice";
import { Notification, Toast } from "../../../../../components/ui";
import {
  deleteCustomer,
  deleteInvoice,
  deleteProduct,
  getCustomersWithPagination,
  getDispatchInvoiceWithPagination,
} from "../store/dataSlice";
import { ConfirmDialog } from "../../../../../components/shared";

const pushNotification = (title, type, message) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

const DeleteInvoiceConfirmationDialog = () => {
  const [loading, setLoading] = useState(false);

  const tableData = useSelector(
    (state) => state.dispatch_invoice.data.tableData
  );

  const dispatch = useDispatch();
  const selectedInvoice = useSelector(
    (state) => state.dispatch_invoice.state.selectedInvoice
  );
  const deleteDialog = useSelector(
    (state) => state.dispatch_invoice.state.deleteConfirmation
  );

  const onDialogClose = () => {
    dispatch(togglDeleteConfirmationDialog(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteInvoice({
        dispatch_invoice_id: selectedInvoice?.dispatch_invoice_id,
      })
    );
    setLoading(false);
    if (action.payload?.status < 300) {
      pushNotification(
        "Successfully Deleted",
        "success",
        action.payload?.data?.message
      );
      onDialogClose();
      dispatch(getDispatchInvoiceWithPagination(tableData));
    } else {
      return pushNotification(
        "Unsuccessfully",
        "danger",
        action.payload?.data?.message
      );
    }
  };

  return (
    <ConfirmDialog
      isOpen={deleteDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete Invoice"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Deleting..."}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Invoice? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  );
};

export default DeleteInvoiceConfirmationDialog;
