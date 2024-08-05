import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../components/ui";
import { toggleNewDialog } from "../store/stateSlice";
import WorkerForm from "./WorkerForm";
import { postAddWorker } from "../store/dataSlice";

const WorkerNewDialog = () => {
  const dispatch = useDispatch();

  const newDialog = useSelector((state) => state.worker.state.newDialog);

  const onDialogClose = () => {
    dispatch(toggleNewDialog(false));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(postAddWorker(values));
    setSubmitting(false);
    console.log(action);
    if (action.payload.status === 201) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          HR successfully added
        </Notification>,
        {
          placement: "top-center",
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
    dispatch(toggleNewDialog(false));
  };

  return (
    <Dialog
      isOpen={newDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h4 className="text-center mb-5">New HR</h4>
      <WorkerForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
      />
    </Dialog>
  );
};

export default WorkerNewDialog;
