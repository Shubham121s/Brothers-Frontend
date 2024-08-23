import React, { useMemo, useEffect, useState } from "react";
import DataTable from "../../../../../components/shared/DataTable";
import {
  Card,
  Input,
  Table,
  Button,
  Upload,
  FormItem,
  Notification,
  Toast,
  FormContainer,
} from "../../../../../components/ui";
import { Formik, Field, FieldArray, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setPurchaseOrderListData, setReports } from "../store/stateSlice";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { StickyFooter } from "../../../../../components/shared";
import cloneDeep from "lodash/cloneDeep";
import { PutAttachment } from "../store/dataSlice";
import FormData from "form-data";

const { Tr, Th, Td, THead, TBody } = Table;

const InwardTable = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const [PoData, setPoData] = useState([]);

  const data = useSelector((state) => state.inward.state.purchaseOrderList);

  useEffect(() => {
    let podata = [...data];
    setPoData(podata);
  }, [data]);

  const onSetFormFile = async (form, field, file, index) => {
    form.setFieldValue(field.name, file[0]);

    let name = field.name.substring(8);
    const formData = new FormData();
    if (file[0]) {
      formData.append("file", file[0]);
    } else {
      let path = PoData[index][name];
      formData.append("filePath", path);
    }

    const action = await dispatch(PutAttachment(formData));

    if (action.payload.status < 300) {
      Toast.push(
        <Notification title={"Success"} type="success" duration={3000}>
          {action?.payload?.data?.message}
        </Notification>,
        {
          placement: "top-center",
        }
      );
      console.log(action.payload.data.path);
      let dataa = PoData.map((item, idx) =>
        idx === index
          ? { ...item, [name]: file[0] ? action?.payload?.data?.path : null }
          : item
      );
      console.log(dataa);
      setPoData(dataa);
    } else {
      Toast.push(
        <Notification title={"Error"} type="danger" duration={3000}>
          File Not Uploaded
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          data: data,
        }}
        onSubmit={(values, { setSubmitting }) => {
          let arr = values.data.filter(
            (f) => f.quantity !== "" && Number(f.quantity) !== 0
          );
          arr = PoData.map((m, index) => {
            return {
              ...m,
              rejected_quantity: values.data[index].rejected_quantity,
              actual_quantity: values.data[index].actual_quantity,
              comments: values.data[index].comments,
              heat_treatment: m.heat_treatment,
              invoice: m.invoice,
              inward_inspection: m.inward_inspection,
              material_tc: m.material_tc,
            };
          });

          if (arr.filter((f) => Number(f.quantity) > 0).length === 0) {
            return Toast.push(
              <Notification title={"Required"} type="danger" duration={2500}>
                Please Fill Any Ones Quantity
              </Notification>,
              {
                placement: "top-end",
              }
            );
          }
          console.log(arr);
          handleSubmit?.(arr, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
                <div>
                  <FieldArray name="data">
                    {({ form, remove, push }) => (
                      <div className="grid grid-cols-3 gap-4">
                        {values.data && values.data.length > 0
                          ? values.data.map((_, index) => {
                              return (
                                <div key={index}>
                                  <Card className="bg-orange-100">
                                    <div className="flex justify-between">
                                      <strong>Product Code :</strong>{" "}
                                      <span className="uppercase">
                                        {
                                          values.data[index].Product
                                            ?.product_code
                                        }
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <strong>Part name :</strong>{" "}
                                      <span className="uppercase">
                                        {values.data[index].Product?.name}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <strong>Remarks :</strong>{" "}
                                      <span className="uppercase">
                                        {values.data[index]?.remarks}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <strong>PO quantity :</strong>{" "}
                                      <span className="uppercase">
                                        {values.data[index]?.quantity}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <strong>Received :</strong>{" "}
                                      <span className="uppercase">
                                        {values.data[index]?.received_quantity}
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-3">
                                      <FormItem
                                        label="Actual Quantity"
                                        className="mb-2"
                                      >
                                        <Field
                                          placeholder="Actual Quantity"
                                          name={`data[${index}].actual_quantity`}
                                          type="text"
                                          component={Input}
                                          size="sm"
                                        />
                                      </FormItem>
                                      <FormItem
                                        label="Rejected Quantity"
                                        className="mb-2"
                                      >
                                        <Field
                                          placeholder="Rejected Quantity"
                                          name={`data[${index}].rejected_quantity`}
                                          type="text"
                                          component={Input}
                                          size="sm"
                                        />
                                      </FormItem>
                                      <FormItem
                                        label="Comment"
                                        className="mb-2"
                                      >
                                        <Field
                                          placeholder="Comment"
                                          name={`data[${index}].comments`}
                                          type="text"
                                          component={Input}
                                          size="sm"
                                        />
                                      </FormItem>
                                    </div>

                                    <div className="grid grid cols-2">
                                      <FormItem className="mb-2" label="">
                                        <Field
                                          name={`data[${index}].material_tc`}
                                        >
                                          {({ field, form }) => (
                                            <Upload
                                              size="sm"
                                              showList={true}
                                              className="cursor-pointer h-[15px]"
                                              onChange={(files) =>
                                                onSetFormFile(
                                                  form,
                                                  field,
                                                  files,
                                                  index
                                                )
                                              }
                                              onFileRemove={(files) =>
                                                onSetFormFile(
                                                  form,
                                                  field,
                                                  files,
                                                  index
                                                )
                                              }
                                              uploadLimit={1}
                                            >
                                              <Button
                                                variant=""
                                                type="button"
                                                size="sm"
                                                style={{ width: "149px" }}
                                              >
                                                Material TC
                                              </Button>
                                            </Upload>
                                          )}
                                        </Field>
                                      </FormItem>
                                      <FormItem className="mb-2" label="">
                                        <Field
                                          name={`data[${index}].inward_inspection`}
                                        >
                                          {({ field, form }) => (
                                            <Upload
                                              size="sm"
                                              showList={true}
                                              className="cursor-pointer h-[15px]"
                                              onChange={(files) =>
                                                onSetFormFile(
                                                  form,
                                                  field,
                                                  files,
                                                  index
                                                )
                                              }
                                              onFileRemove={(files) =>
                                                onSetFormFile(
                                                  form,
                                                  field,
                                                  files,
                                                  index
                                                )
                                              }
                                              uploadLimit={1}
                                            >
                                              <Button
                                                variant=""
                                                type="button"
                                                size="sm"
                                              >
                                                Inward Inspection
                                              </Button>
                                            </Upload>
                                          )}
                                        </Field>
                                      </FormItem>
                                      <FormItem className="mb-2" label="">
                                        <Field name={`data[${index}].invoice`}>
                                          {({ field, form }) => (
                                            <Upload
                                              size="sm"
                                              showList={true}
                                              className="cursor-pointer h-[15px]"
                                              onChange={(files) =>
                                                onSetFormFile(
                                                  form,
                                                  field,
                                                  files,
                                                  index
                                                )
                                              }
                                              onFileRemove={(files) =>
                                                onSetFormFile(
                                                  form,
                                                  field,
                                                  files,
                                                  index
                                                )
                                              }
                                              uploadLimit={1}
                                            >
                                              <Button
                                                variant=""
                                                type="button"
                                                size="sm"
                                                style={{ width: "149px" }}
                                              >
                                                Invoice
                                              </Button>
                                            </Upload>
                                          )}
                                        </Field>
                                      </FormItem>
                                      <FormItem className="mb-2" label="">
                                        <Field
                                          name={`data[${index}].heat_treatment`}
                                        >
                                          {({ field, form }) => (
                                            <Upload
                                              size="sm"
                                              showList={true}
                                              className="cursor-pointer h-[15px]"
                                              onChange={(files) =>
                                                onSetFormFile(
                                                  form,
                                                  field,
                                                  files,
                                                  index
                                                )
                                              }
                                              onFileRemove={(files) =>
                                                onSetFormFile(
                                                  form,
                                                  field,
                                                  files,
                                                  index
                                                )
                                              }
                                              uploadLimit={1}
                                            >
                                              <Button
                                                variant=""
                                                type="button"
                                                size="sm"
                                                style={{ width: "149px" }}
                                              >
                                                Heat Treatment
                                              </Button>
                                            </Upload>
                                          )}
                                        </Field>
                                      </FormItem>
                                    </div>
                                  </Card>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    )}
                  </FieldArray>
                </div>
                <StickyFooter
                  className="-mx-8 px-8 flex items-center justify-end py-4"
                  stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <div className="md:flex items-center">
                    <Button size="sm" className="mr-3" type="button">
                      Discard
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      loading={isSubmitting}
                      type="submit"
                    >
                      save
                    </Button>
                    {/* <Progress variant="circle" width={40} percent={40} /> */}
                  </div>
                </StickyFooter>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default InwardTable;
