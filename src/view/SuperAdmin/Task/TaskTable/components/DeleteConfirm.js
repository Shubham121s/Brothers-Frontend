import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteTaskDialog } from "../store/stateSlice";
import { deleteTask } from "../store/dataSlice";
import { Notification, Toast } from "../../../../../components/ui";
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

const DeleteConfirm = ({ fetchData }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.task.state.selectedTask);
  const deleteTaskDialog = useSelector(
    (state) => state.task.state.deleteTaskDialog
  );

  const onDialogClose = () => {
    dispatch(toggleDeleteTaskDialog(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteTask({
        task_id: selectedTask?.task_id,
      })
    );
    setLoading(false);
    if (action.payload?.status === 200) {
      pushNotification(
        "Successfully Deleted",
        "success",
        action.payload?.data?.message
      );
      fetchData?.();
      return onDialogClose();
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
      isOpen={deleteTaskDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete Task"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Deleting..."}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Product? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  );
};

export default DeleteConfirm;
