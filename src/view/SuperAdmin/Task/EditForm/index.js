import React, { useEffect } from "react";
import { Toast, Notification, Dialog } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { getAllTask, getUser } from "../TaskForm/store/dataSlice";
import TaskFormDialog from "../TaskForm/components/TaskForm";
import { putTask } from "../TaskForm/store/dataSlice";
import { toggleEditTaskDialog } from "../TaskTable/store/stateSlice";

const popNotification = (keyword, type, message) => {
  Toast.push(
    <Notification title={keyword} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

const EditTask = () => {
  const dispatch = useDispatch();
  const editTaskDialog = useSelector(
    (state) => state.task.state?.editTaskDialog
  );

  const initialData = useSelector((state) => state.taskForm.data.taskList);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);

    const response = await dispatch(putTask(values));

    if (response.data?.success) {
      popNotification("Successfull", "success", "Product Updated Successfully");
    } else {
      popNotification("Unsuccessful", "danger", "Product not created");
    }
  };

  const onDialogClose = () => {
    console.log("onDialogClose");
    dispatch(toggleEditTaskDialog(false));
  };

  return (
    <>
      <Dialog
        isOpen={editTaskDialog}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        className="mt-12"
      >
        <TaskFormDialog
          type="edit"
          onFormSubmit={handleFormSubmit}
          onDiscard={onDialogClose}
          initialData={initialData}
        />
      </Dialog>
    </>
  );
};

export default EditTask;
