import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "../../../../../../../components/ui";
import ItemForm from "./ItemForm";
import {
  toggleAddDispatchItemDialog,
  toggleEditDispatchItemDialog,
} from "../../../NewPattern/store/stateSlice";

const EditDispatchItemDialog = (props) => {
  const {
    boxes = [],
    locationIndex,
    setFieldValue,
    dispatchList = [],
    editItemInPoList,
  } = props;
  const dispatch = useDispatch();

  const editDispatchItemDialog = useSelector(
    (state) => state.new_pattern_invoice.state.editDispatchItemDialog
  );

  const selectedDispatchItem = useSelector(
    (state) => state.new_pattern_invoice.state.selectedDispatchItem
  );

  const onDialogClose = () => {
    dispatch(
      toggleEditDispatchItemDialog({ option: false, locationIndex: null })
    );
  };

  const handleEditItem = (values) => {
    editItemInPoList?.(dispatchList, values, setFieldValue);
    // onDialogClose()
  };

  return (
    <Dialog
      isOpen={editDispatchItemDialog.option}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <ItemForm
        boxes={boxes}
        type="edit"
        dispatchList={dispatchList}
        handleFormSubmit={handleEditItem}
        onDiscard={onDialogClose}
        initialData={selectedDispatchItem}
      />
    </Dialog>
  );
};

export default memo(EditDispatchItemDialog);
