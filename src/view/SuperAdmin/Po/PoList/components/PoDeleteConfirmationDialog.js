import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglDeleteConfirmationDialog } from "../store/stateSlice";
import { Notification, Toast } from "../../../../../components/ui";
// import {
//   deleteCustomer,
//   deleteProduct,
//   getCustomersWithPagination,
// } from "../store/dataSlice";
import { ConfirmDialog } from "../../../../../components/shared";
import { deletePo, getAllPoWithPagination } from "../store/dataSlice";

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

const DeletePoConfirmationDialog = () => {
  const [loading, setLoading] = useState(false);

  const tableData = useSelector((state) => state.po_list.data.tableData);

  const dispatch = useDispatch();
  const selectedOrder = useSelector(
    (state) => state.po_list.state.selectedOrder
  );
  const deleteDialog = useSelector(
    (state) => state.po_list.state.deleteConfirmation
  );

  const onDialogClose = () => {
    dispatch(togglDeleteConfirmationDialog(false));
  };

  const onDelete = async () => {
    // setLoading(true);
    const action = await dispatch(
      deletePo({
        po_id: selectedOrder?.po_id,
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
      dispatch(getAllPoWithPagination(tableData));
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
      title="Delete Order"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Deleting..."}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Order? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  );
};

export default DeletePoConfirmationDialog;
