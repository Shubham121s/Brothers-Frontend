import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteCategoryDialog,
  toggleDeleteConditionDialog,
} from "../store/stateSlice";
import { Notification, Toast } from "../../../../../../components/ui";
import {
  getAllConditions,
  deleteCondition,
  getAllCategories,
  deleteNotes,
} from "../store/dataSlice";
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

const DeleteNoteDialog = ({ type }) => {
  const [loading, setLoading] = useState(false);

  const tableData = useSelector((state) => state.note.data.tableData);

  const dispatch = useDispatch();
  const selectedNote = useSelector(
    (state) => state.note.state.selectedCategory
  );
  const deleteDialog = useSelector(
    (state) => state.note.state.deleteCategoryDialog
  );

  const onDialogClose = () => {
    dispatch(toggleDeleteCategoryDialog(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteNotes({
        note_id: selectedNote?.note_id,
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
      dispatch(getAllCategories({ ...tableData, type }));
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
      title="Delete Condition"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Deleting..."}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Condition? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  );
};

export default DeleteNoteDialog;
