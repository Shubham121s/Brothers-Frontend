import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "../../../../../../../components/ui";
import NewItemForm from "./NewItemForm";
import { toggleAddDispatchItemDialog } from "../../store/stateSlice";

const NewDispatchItemDialog = (props) => {
  const { locationIndex, dispatchList = [], addNewItemInPoList } = props;
  const dispatch = useDispatch();

  const addDispatchItemDialog = useSelector(
    (state) => state.edit_domestic_dispatch.state.addDispatchItemDialog
  );

  const onDialogClose = () => {
    dispatch(
      toggleAddDispatchItemDialog({ option: false, locationIndex: null })
    );
  };

  const handleNewItem = (values, setSubmitting) => {
    addNewItemInPoList?.(dispatchList, values, locationIndex);
    onDialogClose();
  };

  return (
    <Dialog
      isOpen={
        addDispatchItemDialog.option &&
        locationIndex === addDispatchItemDialog.locationIndex
      }
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <NewItemForm
        type="new"
        dispatchList={dispatchList}
        handleFormSubmit={handleNewItem}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default memo(NewDispatchItemDialog);
