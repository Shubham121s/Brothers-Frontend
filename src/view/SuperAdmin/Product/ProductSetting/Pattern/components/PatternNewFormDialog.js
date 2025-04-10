import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../../components/ui";
import { toggleNewPatternDialog } from "../store/stateSlice";
import { getAllPatterns, postNewPattern } from "../store/dataSlice";
import MaterialForm from "./PatternForm";

const PatternNewFormDialog = () => {
  const dispatch = useDispatch();

  const newPatternDialog = useSelector(
    (state) => state.pattern.state.newPatternDialog
  );

  const tableData = useSelector((state) => state.pattern.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleNewPatternDialog(false));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(postNewPattern(values));
    setSubmitting(false);
    if (action.payload.status === 201) {
      dispatch(getAllPatterns(tableData));
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          Category successfully added
        </Notification>,
        {
          placement: "top-center",
        }
      );
      onDialogClose();
    } else if (action.payload.status === 409) {
      Toast.push(
        <Notification title={"Error"} type="danger" duration={2500}>
          {action.payload.data.message}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  return (
    <Dialog
      isOpen={newPatternDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <MaterialForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default PatternNewFormDialog;
