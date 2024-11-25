import React from "react";
import { Card, Dialog, Notification, Toast } from "../../../../components/ui";
import { injectReducer } from "../../../../store";
import taskFormReducer from "./store";
import { toggleNewTaskDialog } from "./store/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import TaskFormDialog from "./components/TaskForm";
import { postTask } from "./store/dataSlice";
import { getAllTask } from "../TaskTable/store/dataSlice";

injectReducer("taskForm", taskFormReducer);

const TaskForm = () => {
  const dispatch = useDispatch();
  const newTaskDialog = useSelector(
    (state) => state.taskForm.state?.newTaskDialog
  );
  const tableData = useSelector((state) => state.taskForm.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleNewTaskDialog(false));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(postTask(values));
    console.log("action", action.payload);
    setSubmitting(false);
    if (action.payload.status === 200) {
      dispatch(getAllTask(tableData));
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
    }
  };

  return (
    <Dialog
      isOpen={newTaskDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      className="mt-12"
    >
      <TaskFormDialog
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default TaskForm;
