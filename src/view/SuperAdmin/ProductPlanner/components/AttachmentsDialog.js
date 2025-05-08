import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Notification,
  Toast,
  Upload,
  Button,
  Table,
} from "../../../../components/ui";
import { ConfirmDialog } from "../../../../components/shared";
import {
  deleteAttachment,
  getAllPoLists,
  getPoListById,
  putAttachment,
  toggleAttachmentDialog,
} from "../store/dataSlice";
import FormData from "form-data";
import { MdOutlineSimCardDownload } from "react-icons/md";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import { Loading } from "../../../../components/shared";

const { Tr, Th, Td, THead, TBody } = Table;

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

const ActionColumn = ({ url }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();

  const onView = () => {
    // console.log(url);
    const splitString = url?.split("/uploads/");
    const transformedString = `https://mastererp.5techg.com/api/static/${splitString[1]}`;
    window.open(transformedString, "_blank");
  };

  return url ? (
    <div className="flex justify-center text-lg gap-x-4">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onView}>
        <MdOutlineSimCardDownload />
      </span>
    </div>
  ) : null;
};

const NameColumn = ({ url }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const splitString = url?.split("/uploads/PoListAttachment/") || "-";
  const transformedString = splitString[1] || "-";

  return url ? (
    <div className="flex justify-center text-lg gap-x-4">
      <p>{transformedString}</p>
    </div>
  ) : null;
};

const AttachmentDialog = () => {
  const [loading, setLoading] = useState(true);

  const [fetchTrigger, setFetchTrigger] = useState(false);

  const fetchData = () => {
    setFetchTrigger((prev) => !prev);
  };
  const selectedPO = useSelector((state) => state.masterPP.data.selectedPOList);
  useEffect(() => {
    if (selectedPO?.po_list_id) {
      dispatch(getPoListById({ po_list_id: selectedPO?.po_list_id }));
      setLoading(false);
    }
  }, [fetchTrigger, selectedPO]);

  const dispatch = useDispatch();

  const attachmentDialog = useSelector(
    (state) => state.masterPP.data.attachmentDialog
  );

  const poListData = useSelector((state) => state.masterPP.data.poListData);
  const TableData = useSelector((state) => state.masterPP.data.tableData);

  const onDialogClose = () => {
    dispatch(getAllPoLists(TableData));
    dispatch(toggleAttachmentDialog(false));
  };

  const onSetFormFile = async (field, file) => {
    const formData = new FormData();
    formData.append("fileName", field);
    formData.append("po_list_id", poListData?.po_list_id);
    formData.append("file", file[0]);
    const action = await dispatch(putAttachment(formData));

    if (action.payload.status < 300) {
      fetchData();
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
      deleteAttachment({ po_list_id: poListData?.po_list_id, fileName: field })
    );

    if (action.payload.status < 300) {
      fetchData();
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

  const style = {
    textAlign: "center",
    border: ".2px dashed lightGray",
    width: "200px",
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
      <Loading loading={loading}>
        <Table className="relative" compact={true}>
          <THead className="sticky" style={{ top: "-.2px" }}>
            <Tr>
              <Th style={style}>Name</Th>
              <Th style={style}>Upload</Th>
              <Th style={style}>Filename</Th>
              <Th
                style={{
                  textAlign: "center",
                  border: ".2px dashed lightGray",
                  width: "100px",
                }}
              >
                Action
              </Th>
            </Tr>
          </THead>
          <TBody>
            {poListData?.internal_inspection_check && (
              <Tr>
                <Td style={style}>Internal Inspection</Td>
                <Td style={style}>
                  <Upload
                    size="sm"
                    showList={true}
                    className="cursor-pointer h-[15px]"
                    onChange={(files) =>
                      onSetFormFile("internal_inspection", files)
                    }
                    onFileRemove={(files) =>
                      onDeleteFormFile("internal_inspection", files)
                    }
                    uploadLimit={1}
                  >
                    <Button variant="" type="button" size="sm">
                      Upload
                    </Button>
                  </Upload>
                </Td>
                <Td style={style}>
                  <NameColumn url={poListData?.internal_inspection} />
                </Td>
                <Td style={style}>
                  <ActionColumn url={poListData?.internal_inspection} />
                </Td>
              </Tr>
            )}
            {poListData?.material_tc_verify_check && (
              <Tr>
                <Td style={style}>Material TC</Td>
                <Td style={style}>
                  <Upload
                    size="sm"
                    showList={true}
                    className="cursor-pointer h-[15px]"
                    onChange={(files) =>
                      onSetFormFile("material_tc_verify", files)
                    }
                    onFileRemove={(files) =>
                      onDeleteFormFile("material_tc_verify", files)
                    }
                    uploadLimit={1}
                  >
                    <Button variant="" type="button" size="sm">
                      Upload
                    </Button>
                  </Upload>
                </Td>
                <Td style={style}>
                  <NameColumn url={poListData?.material_tc_verify} />
                </Td>
                <Td style={style}>
                  <ActionColumn url={poListData?.material_tc_verify} />
                </Td>
              </Tr>
            )}
            {poListData?.ndt_requirement_check && (
              <Tr>
                <Td style={style}>NDT Requirement</Td>
                <Td style={style}>
                  <Upload
                    size="sm"
                    showList={true}
                    className="cursor-pointer h-[15px]"
                    onChange={(files) =>
                      onSetFormFile("ndt_requirement", files)
                    }
                    onFileRemove={(files) =>
                      onDeleteFormFile("ndt_requirement", files)
                    }
                    uploadLimit={1}
                  >
                    <Button variant="" type="button" size="sm">
                      Upload
                    </Button>
                  </Upload>
                </Td>
                <Td style={style}>
                  <NameColumn url={poListData?.ndt_requirement} />
                </Td>
                <Td style={style}>
                  <ActionColumn url={poListData?.ndt_requirement} />
                </Td>
              </Tr>
            )}
            {poListData?.final_inspection_check && (
              <Tr>
                <Td style={style}>Final Inspection</Td>
                <Td style={style}>
                  <Upload
                    size="sm"
                    showList={true}
                    className="cursor-pointer h-[15px]"
                    onChange={(files) =>
                      onSetFormFile("final_inspection", files)
                    }
                    onFileRemove={(files) =>
                      onDeleteFormFile("final_inspection", files)
                    }
                    uploadLimit={1}
                  >
                    <Button variant="" type="button" size="sm">
                      Upload
                    </Button>
                  </Upload>
                </Td>
                <Td style={style}>
                  <NameColumn url={poListData?.final_inspection} />
                </Td>
                <Td style={style}>
                  <ActionColumn url={poListData?.final_inspection} />
                </Td>
              </Tr>
            )}
            {poListData?.heat_treatment_check && (
              <Tr>
                <Td style={style}>Heat Treatment</Td>
                <Td style={style}>
                  <Upload
                    size="sm"
                    showList={true}
                    className="cursor-pointer h-[15px]"
                    onChange={(files) => onSetFormFile("heat_treatment", files)}
                    onFileRemove={(files) =>
                      onDeleteFormFile("heat_treatment", files)
                    }
                    uploadLimit={1}
                  >
                    <Button variant="" type="button" size="sm">
                      Upload
                    </Button>
                  </Upload>
                </Td>
                <Td style={style}>
                  <NameColumn url={poListData?.heat_treatment} />
                </Td>
                <Td style={style}>
                  <ActionColumn url={poListData?.heat_treatment} />
                </Td>
              </Tr>
            )}
            {poListData?.other_check && (
              <Tr>
                <Td style={style}>Other</Td>
                <Td style={style}>
                  <Upload
                    size="sm"
                    showList={true}
                    className="cursor-pointer h-[15px]"
                    onChange={(files) => onSetFormFile("other", files)}
                    onFileRemove={(files) => onDeleteFormFile("other", files)}
                    uploadLimit={1}
                  >
                    <Button variant="" type="button" size="sm">
                      Upload
                    </Button>
                  </Upload>
                </Td>
                <Td style={style}>
                  <NameColumn url={poListData?.other} />
                </Td>
                <Td style={style}>
                  <ActionColumn url={poListData?.other} />
                </Td>
              </Tr>
            )}
          </TBody>
        </Table>
      </Loading>
    </ConfirmDialog>
  );
};

export default AttachmentDialog;
