import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglDeleteConfirmationDialog } from "../store/stateSlice";
import { Notification, Toast } from "../../../../../../components/ui";
import { deleteEnquiry, getAllEnquiry } from "../store/dataSlice";
import { ConfirmDialog } from "../../../../../../components/shared";

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

const DeleteQuotationConfirmationDialog = () => {
  const [loading, setLoading] = useState(false);

  const tableData = useSelector((state) => state.quotation.data.tableData);

  const dispatch = useDispatch();
  const selectedEnquiry = useSelector(
    (state) => state.quotation.state.selectedEnquiry
  );
  const deleteDialog = useSelector(
    (state) => state.quotation.state.deleteConfirmation
  );

  const onDialogClose = () => {
    dispatch(togglDeleteConfirmationDialog(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteEnquiry({
        enquiry_id: selectedEnquiry?.enquiry_id,
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
      dispatch(getAllEnquiry(tableData));
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
      title="Delete Enquiry"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Deleting..."}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Enquiry? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  );
};

export default DeleteQuotationConfirmationDialog;
