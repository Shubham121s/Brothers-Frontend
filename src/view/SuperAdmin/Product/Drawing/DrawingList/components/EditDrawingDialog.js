import React from "react";
import { Dialog, Notification, Toast } from "../../../../../../components/ui";
import DrawingForm from "./../../DrawingForm";
import { apiUpdateDrawingByDrawingId } from "../../../../../../services/SuperAdmin/Product/DrawingService";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditDrawingDialog } from "../store/stateSlice";

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


const EditDrawingDialog = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editDrawingDialog = useSelector(
    (state) => state.product_details.state.editDrawingDialog
  );
  const selectedDrawing = useSelector(
    (state) => state.product_details.state.selectedDrawing
  );

  const handleFormSubmit = async (values, setSubmitting) => {
try{
    setSubmitting(true);
    const formData = new FormData();
    formData.append("process_attachment", values.process_attachment);
    formData.append("raw_attachment", values.raw_attachment);
    formData.append("finish_attachment", values.finish_attachment);
    formData.append("revision_number", values.revision_number);
    formData.append("raw_weight", values.raw_weight);
    formData.append("finish_weight", values.finish_weight);
    formData.append("drawing_id", values.drawing_id);
    const response = await apiUpdateDrawingByDrawingId(formData);
    if (response.data?.success) {
      setSubmitting(false);
      popNotification(
        "Successfully updated",
        "success",
        "Drawing Successfully Updated"
      );
      onDialogClose();
      handleDiscard();
    } else {
      setSubmitting(false);
      popNotification("Unsuccessful", "danger", "Product not updated");
    }
  }
  catch(error){
    setSubmitting(false);
    popNotification("Unsuccessful", "danger", "Product not updated");
  }
    
  };

  const handleDiscard = () => {
    navigate("/super/admin/product/list");
  };

  const onDialogClose = () => {
    dispatch(toggleEditDrawingDialog(false));
  };

  return (
    <Dialog
      width={600}
      isOpen={editDrawingDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <div className="flex flex-col h-full justify-between">
        <h5>Update Drawing Revision</h5>
        <p className="mb-6">Section to config drawing revision number</p>
        <DrawingForm
          type="edit"
          data={{
            Product: {
              ...data,
            },
          }}
          initialData={selectedDrawing}
          onDiscard={onDialogClose}
          onFormSubmit={handleFormSubmit}
        />
      </div>
    </Dialog>
  );
};

export default EditDrawingDialog;
