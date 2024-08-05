import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../components/ui";
import { toggleEditDialog } from "../store/stateSlice";
import WorkerForm from "./WorkerForm";
import { putUpdateWorker } from "../store/dataSlice";

const WorkerEditDialog = () => {
  const dispatch = useDispatch();

  const editDialog = useSelector((state) => state.worker.state.editDialog);

  const selectedWorker = useSelector(
    (state) => state.worker.state.selectedWorker
  );

  const onDialogClose = () => {
    dispatch(toggleEditDialog(false));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(putUpdateWorker(values));
    setSubmitting(false);
    if (action.payload.status === 200) {
      Toast.push(
        <Notification
          title={"Successfully Updated"}
          type="success"
          duration={2500}
        >
          HR successfully updated
        </Notification>,
        {
          placement: "top-end",
        }
      );
      handleDiscard();
    } else {
      Toast.push(
        <Notification title={"Failed"} type="danger" duration={2500}>
          {action.payload.data?.message}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  const handleDiscard = () => {
    dispatch(toggleEditDialog(false));
  };

  return (
    <Dialog
      isOpen={editDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h4 className="text-center mb-5">Update HR</h4>
      <WorkerForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        initialData={selectedWorker}
      />
    </Dialog>
  );
};

export default WorkerEditDialog;
