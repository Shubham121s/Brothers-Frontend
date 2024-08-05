import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "../../../../../../../components/ui";
import { toggleEditBoxDialog } from "../../../NewPattern/store/stateSlice";
import BoxForm from "./BoxForm";

const EditBoxDialog = (props) => {
  const { handleNewBox, boxNo = 1 } = props;
  const dispatch = useDispatch();

  const editBoxDialog = useSelector(
    (state) => state.new_pattern_invoice.state.editBoxDialog
  );
  const initialData = useSelector(
    (state) => state.new_pattern_invoice.state.selectedBox
  );
  console.log(initialData);
  const onDialogClose = () => {
    dispatch(toggleEditBoxDialog(false));
  };

  return (
    <Dialog
      isOpen={editBoxDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <BoxForm
        index={boxNo}
        type="edit"
        initialData={initialData}
        handleFormSubmit={handleNewBox}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default EditBoxDialog;
