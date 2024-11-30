import React from "react";
import TaskTable from "./components/TaskTable";
import { Button, Card, Dialog } from "../../../../components/ui";
import { injectReducer } from "../../../../store";
import taskReducer from "./store";
import { toggleNewTaskDialog } from "../TaskForm/store/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "../TaskForm";
import { toggleEyeDialog } from "./store/stateSlice";
import DescriptionModal from "./components/DescriptionModal";
import EditTask from "../EditForm";

injectReducer("task", taskReducer);

const Task = () => {
  const dispatch = useDispatch();

  const onDialogOpen = () => {
    dispatch(toggleNewTaskDialog(true));
  };

  const newEyeDialog = useSelector((state) => state.task.state.newEyeDialog);

  const onDialogClose = () => {
    dispatch(toggleEyeDialog(false));
  };
  return (
    <div>
      <h3 className="mb-4">Task List</h3>
      <div className="w-full flex justify-end mb-4">
        <Button
          className="bg-blue-600 text-blue-100 hover:bg-blue-700 hover:text-blue-100 active:bg-blue-600 focus:bg-blue-600"
          onClick={onDialogOpen}
        >
          Add Task
        </Button>
      </div>
      <TaskForm />

      <Card>
        <TaskTable />
      </Card>

      <Dialog
        isOpen={newEyeDialog}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        className="mt-12"
      >
        <DescriptionModal onDialogClose={onDialogClose} />
      </Dialog>

      <EditTask />
    </div>
  );
};

export default Task;
