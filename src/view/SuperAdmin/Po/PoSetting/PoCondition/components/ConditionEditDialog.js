import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../../components/ui";
import { toggleEditCategoryDialog } from "../store/stateSlice";
import { updateCondition,getAllCategories } from "../store/dataslice";
import ConditionForm from "./ConditionForm";

const ConditionEditDialog = () => {
  const dispatch = useDispatch();

  const editCategoryDialog = useSelector(
    (state) => state.condition.state.editCategoryDialog
  );
  const initialData = useSelector(
    (state) => state.condition.state.selectedCategory
  );

  const tableData = useSelector((state) => state.condition.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleEditCategoryDialog(false));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(updateCondition(values));
    setSubmitting(false);
    if (action.payload.status < 300) {
      dispatch(getAllCategories(tableData));
      Toast.push(
        <Notification
          title={"Successfully updated"}
          type="success"
          duration={2500}
        >
          Condition successfully updated
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
      <ConditionForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
        initialData={initialData}
      />
    </Dialog>
  );
};

export default ConditionEditDialog;
