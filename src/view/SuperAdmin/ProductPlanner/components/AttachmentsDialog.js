import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notification, Toast, Upload, Button } from "../../../../components/ui";
import { ConfirmDialog } from "../../../../components/shared";
import {
  deleteAttachment,
  getAllPoLists,
  putAttachment,
  toggleAttachmentDialog,
} from "../store/dataSlice";
import FormData from "form-data";

const pushNotification = (title, type, message) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

const AttachmentDialog = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const attachmentDialog = useSelector(
    (state) => state.poList.data.attachmentDialog
  );

  const selectedPO = useSelector((state) => state.poList.data.selectedPOList);
  const TableData = useSelector((state) => state.poList.data.tableData);

  const onDialogClose = () => {
    dispatch(getAllPoLists(TableData));
    dispatch(toggleAttachmentDialog(false));
  };

  const onSetFormFile = async (field, file) => {
    const formData = new FormData();
    formData.append("fileName", field);
    formData.append("po_list_id", selectedPO?.po_list_id);
    formData.append("file", file[0]);
    const action = await dispatch(putAttachment(formData));

    if (action.payload.status < 300) {
      pushNotification(
        "Success",
        "success",
        `Successfully uploaded ${field.toUpperCase()}`
      );
    } else {
      pushNotification(
        "Failed",
        "danger",
        `Failed To upload ${field.toUpperCase()}`
      );
    }
  };

  const onDeleteFormFile = async (field, file) => {
    const action = await dispatch(
      deleteAttachment({ po_list_id: selectedPO?.po_list_id, fileName: field })
    );

    if (action.payload.status < 300) {
      pushNotification(
        "Success",
        "success",
        `Successfully Deleted ${field.toUpperCase()}`
      );
    } else {
      pushNotification(
        "Failed",
        "danger",
        `Failed To Delete ${field.toUpperCase()}`
      );
    }
  };
  const onDelete = async () => {
    onDialogClose();
  };

  return (
    <ConfirmDialog
      isOpen={attachmentDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="success"
      title="Upload Attachments"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={"Done"}
      confirmButtonColor="purple-600"
      width={800}
    >
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Upload
            size="sm"
            showList={true}
            className="cursor-pointer h-[15px]"
            onChange={(files) => onSetFormFile("internal_inspection", files)}
            onFileRemove={(files) =>
              onDeleteFormFile("internal_inspection", files)
            }
            uploadLimit={1}
          >
            <Button variant="" type="button" size="sm">
              Internal Inspection
            </Button>
          </Upload>
        </div>
        <div>
          <Upload
            size="sm"
            showList={true}
            className="cursor-pointer h-[15px]"
            onChange={(files) => onSetFormFile("material_tc_verify", files)}
            onFileRemove={(files) =>
              onDeleteFormFile("material_tc_verify", files)
            }
            uploadLimit={1}
          >
            <Button variant="" type="button" size="sm">
              Material TC Verify
            </Button>
          </Upload>
        </div>
        <div>
          <Upload
            size="sm"
            showList={true}
            className="cursor-pointer h-[15px]"
            onChange={(files) => onSetFormFile("ndt_requirement", files)}
            onFileRemove={(files) => onDeleteFormFile("ndt_requirement", files)}
            uploadLimit={1}
          >
            <Button variant="" type="button" size="sm">
              NDT Requirement
            </Button>
          </Upload>
        </div>
        <div>
          <Upload
            size="sm"
            showList={true}
            className="cursor-pointer h-[15px]"
            onChange={(files) => onSetFormFile("final_inspection", files)}
            onFileRemove={(files) =>
              onDeleteFormFile("final_inspection", files)
            }
            uploadLimit={1}
          >
            <Button variant="" type="button" size="sm">
              Final Inspection
            </Button>
          </Upload>
        </div>
        <div>
          <Upload
            size="sm"
            showList={true}
            className="cursor-pointer h-[15px]"
            onChange={(files) => onSetFormFile("heat_treatment", files)}
            onFileRemove={(files) => onDeleteFormFile("heat_treatment", files)}
            uploadLimit={1}
          >
            <Button variant="" type="button" size="sm">
              Heat Treatment
            </Button>
          </Upload>
        </div>
        <div>
          <Upload
            size="sm"
            showList={true}
            className="cursor-pointer h-[15px]"
            onChange={(files) => onSetFormFile("other", files)}
            onFileRemove={(files) => onDeleteFormFile("other", files)}
            uploadLimit={1}
          >
            <Button variant="" type="button" size="sm">
              Other Specified Requirement
            </Button>
          </Upload>
        </div>
      </div>
    </ConfirmDialog>
  );
};

export default AttachmentDialog;
