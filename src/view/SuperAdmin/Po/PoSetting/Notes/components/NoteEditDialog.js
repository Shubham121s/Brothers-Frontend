import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../../components/ui";
import { toggleEditCategoryDialog } from "../store/stateSlice";
import { updateCategory, updateNotes } from "../store/dataSlice";
import NoteForm from "./NoteForm";

const NoteEditDialog = () => {
  const dispatch = useDispatch();

  const editCategoryDialog = useSelector(
    (state) => state.category.state.editCategoryDialog
  );
  const initialData = useSelector(
    (state) => state.category.state.selectedCategory
  );

  const onDialogClose = () => {
    dispatch(toggleEditCategoryDialog(false));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(
      updateNotes({ ...values, notes: JSON.stringify(values.notes) })
    );
    setSubmitting(false);
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={"Successfully updated"}
          type="success"
          duration={2500}
        >
          Note successfully updated
        </Notification>,
        {
          placement: "top-center",
        }
      );
      onDialogClose();
    }
  };

  return (
    <Dialog
      isOpen={editCategoryDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <NoteForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
        initialData={initialData}
      />
    </Dialog>
  );
};

export default NoteEditDialog;
