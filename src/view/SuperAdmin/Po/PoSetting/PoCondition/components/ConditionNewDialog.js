import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../../components/ui";
import { toggleNewCategoryDialog } from "../store/stateSlice";
import ConditionForm from "./ConditionForm";
import { getAllCategories, postNewCategory } from "../store/dataslice";

const ConditionNewDialog = () => {
  const dispatch = useDispatch();

  const newCategoryDialog = useSelector(
    (state) => state.condition.state.newCategoryDialog
  );

  const tableData = useSelector((state) => state.condition.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleNewCategoryDialog(false));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(postNewCategory(values));
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
      <ConditionForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default ConditionNewDialog;
