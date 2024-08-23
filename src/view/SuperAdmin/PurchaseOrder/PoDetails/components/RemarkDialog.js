import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notification, Toast, Input } from "../../../../../components/ui";
import { ConfirmDialog } from "../../../../../components/shared";
import { toggleRemarkDialog } from "../store/stateSlice";
import { updatePurchaseOrderStatus } from "../store/dataSlice";

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

const StatusDialog = ({ status, setPOStatus, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [remark, setRemark] = useState(null);

  const dispatch = useDispatch();

  const RemarkDialog = useSelector(
    (state) => state.accept_po.state.remarkDialog
  );

  const onDialogClose = () => {
    dispatch(toggleRemarkDialog(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      updatePurchaseOrderStatus({
        status: status,
        purchase_order_id: initialData.purchase_order_id,
        status_remark: remark,
      })
    );
    setLoading(false);
    if (action.payload?.status < 300) {
      setPOStatus(status);
      pushNotification(
        "Successfully Deleted",
        "success",
        `Successfully ${status.toUpperCase()}`
      );
      onDialogClose();
    } else {
      return pushNotification("Unsuccessfully", "danger", "Error");
    }
  };

  return (
    <ConfirmDialog
      isOpen={RemarkDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="Success"
      title="Remark"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Saving..."}
      confirmButtonColor={`${
        status === "accepted"
          ? "emerald-500"
          : status === "cancelled"
          ? "yellow-500"
          : "red-500"
      }`}
    >
      <Input
        value={remark}
        placeholder="Add Remark"
        onChange={(e) => setRemark(e.target.value)}
        style={{ width: "430px" }}
      />
    </ConfirmDialog>
  );
};

export default StatusDialog;
