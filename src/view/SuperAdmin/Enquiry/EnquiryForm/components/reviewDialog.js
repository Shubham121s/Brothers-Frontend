import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  Input,
  FormItem,
  Button,
  Checkbox,
  Card,
  Select,
  FormContainer,
  Notification,
  Toast,
} from "../../../../../components/ui";
import cloneDeep from "lodash/cloneDeep";
import {
  toggleReviewDialog,
  toggleSetEnquiryReview,
} from "../store/stateSlice";
import { StickyFooter } from "../../../../../components/shared";
import { Formik, Field, FieldArray, Form } from "formik";
import { postNewEnquiryreview } from "../store/dataSlice";

const ReviewDialog = () => {
  const dispatch = useDispatch();
  const newDialog = useSelector((state) => state.newEnquiry.state.reviewDialog);
  const selectedType = useSelector(
    (state) => state.newEnquiry.state.selectedType
  );

  const onDialogClose = () => {
    dispatch(toggleReviewDialog(false));
  };

  const options = [
    { value: true, label: "YES" },
    { value: false, label: "NO" },
  ];

  const popNotification = (keyword, type, message) => {
    Toast.push(
      <Notification title={keyword} type={type} duration={2500}>
        {message}
      </Notification>,
      {
        placement: "top-end",
      }
    );
  };
  return (
    <Dialog
      isOpen={newDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      width={900}
    >
      <>
        <div className="overflow-y-auto overflow-x-hidden h-[500px] p-3">
          <h5 className="text-center mb-4">Enquiry Form</h5>

          <Formik
            enableReinitialize={true}
            initialValues={{
              review: [
                {
                  type: "Customer Requirements",
                  name: "customer_requirement",
                  items: [
                    {
                      remark: "",
                      label:
                        "Whether latest Drawings/Specifications are available?",
                      value: "",
                    },
                    {
                      remark: "",
                      label: "Is any Customer supplied raw material involved?",
                      value: "",
                    },
                    {
                      remark: "",
                      label:
                        "What is Quality records are to be submitted to the customer",
                      value: "",
                    },
                    {
                      remark: "",
                      label: "Whether the development time is specified?",
                      value: "",
                    },
                    {
                      remark: "",
                      label:
                        "Whether the statutory & regulatory requirement applicable?",
                      value: "",
                    },
                  ],
                },
                {
                  type: "Feasibility",
                  name: "feasibility",
                  items: [
                    {
                      label:
                        "Raw Material Availability ⦿With existing source ⦿New source to be developed",
                      remark: "",
                      value: "",
                    },
                    {
                      label: "Technical specification Feasibility",
                      remark: "",
                      value: "",
                    },
                    {
                      label: "Production Specifications Feasibility",
                      remark: "",
                      value: "",
                    },
                    {
                      label: "Measurement Systems Equipment Adequacy",
                      remark: "",
                      value: "",
                    },
                    {
                      label: "Plant Machinery Equipment Process Adequacy",
                      remark: "",
                      value: "",
                    },
                    {
                      label:
                        "Adequacy of documents ⦿Drawings ⦿Work Instructions",
                      remark: "",
                      value: "",
                    },
                  ],
                },
                {
                  type: "Customer PO Review",
                  name: "customer_po_review",
                  items: [
                    {
                      label:
                        "Is the P.O. In line with Quotation/Negotiations/Drawings",
                      remark: "",
                      value: "",
                    },
                    {
                      label:
                        "Commercial terms ⦿Payment Terms ⦿Mode of Dispatch",
                      remark: "",
                      value: "",
                    },
                    {
                      label: "Is further clarification from customer required?",
                      remark: "",
                      value: "",
                    },
                  ],
                },
              ],
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const action = await dispatch(
                postNewEnquiryreview({
                  ...values,
                  enquiry_list_id: selectedType.enquiry_list_id,
                })
              );

              if (action.payload?.status < 300) {
                popNotification(
                  "Successfully Added",
                  "success",
                  "Review Successfully created"
                );
                dispatch(toggleSetEnquiryReview(selectedType.enquiry_list_id));
                dispatch(toggleReviewDialog(false));
              } else {
                popNotification("Error", "error", "Review not Added");
              }
            }}
          >
            {({ values, errors, touched, isSubmitting }) => {
              console.log(values.review);
              return (
                <Form className=" ">
                  <FormContainer>
                    {values.review.map((section, sectionIndex) => (
                      <Card className="mb-3">
                        <FieldArray
                          key={sectionIndex}
                          name={`review[${sectionIndex}].items`}
                        >
                          {({ form, remove, push }) => (
                            <div>
                              <h6 className=" underline">{section?.type}</h6>
                              {section.items.map((item, index) => (
                                <div key={index}>
                                  <div className="grid grid-cols-3 gap-2 mt-2">
                                    <div className="col-span-2">
                                      <FormItem
                                        label={`${index + 1}. ${item.label}`}
                                      >
                                        <Field
                                          name={`review[${sectionIndex}].items[${index}].value`}
                                        >
                                          {({ field, form }) => (
                                            <Select
                                              field={field}
                                              form={form}
                                              options={options}
                                              value={options.filter(
                                                (item) =>
                                                  item.value ===
                                                  values.review[sectionIndex]
                                                    .items[index].value
                                              )}
                                              onChange={(option) => {
                                                form.setFieldValue(
                                                  field.name,
                                                  option.value
                                                );
                                              }}
                                            />
                                          )}
                                        </Field>
                                      </FormItem>
                                    </div>
                                    <div className="col-span-1">
                                      <FormItem label="Remark">
                                        <Field
                                          placeholder="Remark"
                                          name={`review[${sectionIndex}].items[${index}].remark`}
                                          type="text"
                                          component={Input}
                                        />
                                      </FormItem>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </Card>
                    ))}
                    <div className="md:flex items-center justify-end mt-3">
                      <Button
                        size="sm"
                        className="mr-3"
                        onClick={() => onDialogClose()}
                        type="button"
                      >
                        Discard
                      </Button>
                      <Button
                        size="sm"
                        variant="solid"
                        loading={isSubmitting}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </FormContainer>
                </Form>
              );
            }}
          </Formik>
        </div>
      </>
    </Dialog>
  );
};

export default ReviewDialog;
