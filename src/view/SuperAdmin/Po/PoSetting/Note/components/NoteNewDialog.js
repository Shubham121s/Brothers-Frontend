import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../../components/ui";
import { toggleNewCategoryDialog } from "../store/stateSlice";
import NoteForm from "./NoteForm";
import { getAllCategories, postNewCategory } from "../store/dataSlice";

const NoteNewDialog = () => {
  const dispatch = useDispatch();

  const newCategoryDialog = useSelector(
    (state) => state.note.state.newCategoryDialog
  );

  const tableData = useSelector((state) => state.note.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleNewCategoryDialog(false));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(
      postNewCategory({ ...values, notes: JSON.stringify(values.notes) })
    );
    setSubmitting(false);
    if (action.payload.status < 300) {
      dispatch(getAllCategories(tableData));
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          Note successfully added
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
      isOpen={newCategoryDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      width={700}
    >
      <NoteForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default NoteNewDialog;
