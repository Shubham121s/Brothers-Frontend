import React, { Suspense, forwardRef } from "react";
import { Form, Formik } from "formik";
import { Button, Card, FormContainer } from "../../../../../components/ui";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Loading, StickyFooter } from "../../../../../components/shared";
import cloneDeep from "lodash/cloneDeep";
import ConsigneeInformationFields from "./components/ConsigneeInformationFields";
import BuyerInformationFields from "./components/BuyerInformationFields";
import InvoiceDatePickerFields from "./components/InvoiceDatePickerFields";
import ShippingAddressInformationFields from "./components/ShippingAndTransport/ShippingAddressInformationFields";
import BankInformationFields from "./components/BankAndCompany/BankInformationFields";
import TransportModeInformationField from "./components/ShippingAndTransport/TransportModeInformationFields";
import { toggleAddDispatchItemDialog } from "../NewDispatch/store/stateSlice";
import NewDispatchItemDialog from "./components/ItemList/NewItemDialog";
import ItemTable from "./components/ItemList/ItemTable";
import LocationCodeFields from "./components/ItemList/LocationCodeFields";
import { BANK_LIST, GST_IN, PAN, STATE, STATE_CODE } from "./constant";
import CompanyDetails from "./components/BankAndCompany/CompanyDetails";
import PaymentTermInformationFields from "./components/ShippingAndTransport/PaymentTermInformationFields";
import VehicleInformationFields from "./components/ShippingAndTransport/VehicleInformationFields";
import RemarkInformationField from "./components/GSTandOther/RemarkInformationField";
import EWayBillNoInformationField from "./components/GSTandOther/EWayBillNoInformationField";
import BillTypeInformationField from "./components/GSTandOther/BillTypeInformationField";
import CGSTInformationField from "./components/GSTandOther/CGSTInformationField";
import IGSTInformationField from "./components/GSTandOther/IGSTInformationField";
import SGSTInformationField from "./components/GSTandOther/SGSTInformationField";
import InvoiceNumberField from "./components/invoiceNumberField";

const validationSchema = Yup.object().shape({
  DispatchConsignee: Yup.object().required("Required"),
  invoice_no: Yup.string().required("Required"),
  DispatchBuyer: Yup.object().required("Required"),
  DispatchShippingAddress: Yup.object().required("Required"),
  DispatchList: Yup.array(
    Yup.object({
      location_code: Yup.string().test((data, ctx) => {
        if (ctx.options.context.DispatchList.length === 1) return true;
        else if (data === undefined || data === null || data === "")
          return ctx.createError({ message: "Required" });
        else return true;
      }),
    })
  ),
  DispatchCompanyDetails: Yup.object().shape({
    gstin: Yup.string().required("Required"),
  }),
  invoice_date: Yup.date().required("Required"),
  DispatchBankDetails: Yup.object().required("Required"),
  DispatchShippingAndOtherDetails: Yup.object().shape({
    payment_term: Yup.string().required("Required"),
    shipping_line: Yup.string().required("Required"),
    bill_type: Yup.string().required("Required"),
    c_gst: Yup.number().test((data, ctx) => {
      if (ctx.parent?.bill_type === "GST") {
        if (!data) {
          return ctx.createError({ message: "Required" });
        }
        return true;
      }
      return true;
    }),
    s_gst: Yup.number().test((data, ctx) => {
      if (ctx.parent?.bill_type === "GST") {
        if (!data) {
          return ctx.createError({ message: "Required" });
        }
        return true;
      }
      return true;
    }),
    i_gst: Yup.number().test((data, ctx) => {
      if (ctx.parent?.bill_type === "IGST") {
        if (!data) {
          return ctx.createError({ message: "Required" });
        }
        return true;
      }
      return true;
    }),
  }),
});

const NewDomesticForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { initialData, onFormSubmit, customers = [], pushNotification } = props;

  const handleRemoveLocationCodeAndPoList = (
    dispatchList = [],
    indexToRemove,
    setFieldValue
  ) => {
    const updatedTableData = dispatchList.filter(
      (_, index) => index !== indexToRemove
    );
    setFieldValue?.("DispatchList", updatedTableData);
  };

  const addNewItemInPoList = (dispatchList, newItem, index, setFieldValue) => {
    const updatedDispatchList = [
      ...dispatchList.slice(0, index),
      {
        ...dispatchList[index],
        poList: [...dispatchList[index].poList, newItem],
      },
      ...dispatchList.slice(index + 1),
    ];
    setFieldValue("DispatchList", updatedDispatchList);
  };

  const handleNewLocationCodeAndPoList = (dispatchList = [], setFieldValue) => {
    const newDispatchList = {
      location_code: "",
      poList: [],
    };
    const updatedDispatchList = [...dispatchList, newDispatchList];
    setFieldValue?.("DispatchList", updatedDispatchList);
  };

  const handleDeleteItemInPoList = (
    dispatchList,
    locationIndex,
    setFieldValue,
    poIndex
  ) => {
    const updatedDispatchList = [...dispatchList];
    const filterDispatchList = updatedDispatchList.map((list, index) => {
      if (index === locationIndex) {
        return {
          ...list,
          poList: list.poList.filter((_, index) => index !== poIndex),
        };
      }
      return list;
    });
    setFieldValue?.("DispatchList", filterDispatchList);
  };

  return (
    <>
      <Suspense fallback={<Loading loading={true} />}>
        <Formik
          innerRef={ref}
          initialValues={{
            ...initialData,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const isDispatchListEmpty = values.DispatchList.filter(
              (item) => item.poList.length === 0
            );
            if (isDispatchListEmpty.length > 0) {
              setSubmitting(false);
              return pushNotification?.(
                "Add items in list",
                "danger",
                "Required"
              );
            }
            const formData = cloneDeep({ ...values });
            onFormSubmit?.(formData, setSubmitting);
          }}
        >
          {({ values, touched, errors, setFieldValue, isSubmitting }) => {
            return (
              <Form key="invoiceForm">
                <FormContainer key="invoiceFormContainer">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card className="bg-yellow-50 h-max" bodyClass="pb-0">
                      <div className="flex justify-between">
                        <span>
                          <h5 className="font-semibold text-gray-700">
                            Receiver & Recipient Information
                          </h5>
                          <p className="mb-2">
                            Section to config receiver & recipient information
                          </p>
                        </span>
                        <InvoiceDatePickerFields
                          touched={touched?.invoice_date}
                          errors={errors?.invoice_date}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <ConsigneeInformationFields
                          touched={touched?.DispatchConsignee}
                          errors={errors?.DispatchConsignee}
                          values={values?.DispatchConsignee}
                          customers={customers}
                          setFieldValue={setFieldValue}
                        />
                        <BuyerInformationFields
                          touched={touched?.DispatchBuyer}
                          errors={errors?.DispatchBuyer}
                          values={values?.DispatchBuyer}
                          customers={customers}
                        />
                      </div>
                    </Card>
                    <Card className="bg-blue-50 h-max" bodyClass="pb-0">
                      <div className="flex justify-between">
                        <span>
                          <h5 className="font-semibold text-gray-700">
                            Shipping & Transport Information
                          </h5>
                          <p className="mb-2">
                            Section to config shipping & transport information
                          </p>
                        </span>
                        <InvoiceNumberField
                          touched={touched?.invoice_no}
                          errors={errors?.invoice_no}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <ShippingAddressInformationFields
                          touched={touched?.DispatchShippingAddress}
                          errors={errors?.DispatchShippingAddress}
                          values={values?.DispatchShippingAddress}
                        />
                        <div className="h-full">
                          <PaymentTermInformationFields
                            errors={
                              errors?.DispatchShippingAndOtherDetails
                                ?.payment_term
                            }
                            touched={
                              touched?.DispatchShippingAndOtherDetails
                                ?.payment_term
                            }
                            values={
                              values?.DispatchShippingAndOtherDetails
                                ?.payment_term
                            }
                          />
                          <TransportModeInformationField
                            touched={
                              touched?.DispatchShippingAndOtherDetails
                                ?.shipping_line
                            }
                            errors={
                              errors?.DispatchShippingAndOtherDetails
                                ?.shipping_line
                            }
                            values={
                              values?.DispatchShippingAndOtherDetails
                                ?.shipping_line
                            }
                          />
                          <VehicleInformationFields
                            touched={
                              touched?.DispatchShippingAndOtherDetails
                                ?.vehicle_no
                            }
                            errors={
                              errors?.DispatchShippingAndOtherDetails
                                ?.vehicle_no
                            }
                            values={
                              values?.DispatchShippingAndOtherDetails
                                ?.vehicle_no
                            }
                          />
                        </div>
                      </div>
                    </Card>
                    <Card className="bg-blue-50 h-max">
                      <h5 className="font-semibold text-gray-700">
                        Bank & Company Information
                      </h5>
                      <p className="mb-2">
                        Section to config shipping & other information
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <BankInformationFields
                          touched={touched?.DispatchBankDetails}
                          errors={errors?.DispatchBankDetails}
                          values={values?.DispatchBankDetails}
                        />
                        <CompanyDetails
                          values={values?.DispatchCompanyDetails}
                        />
                      </div>
                    </Card>
                    <Card className="bg-blue-50 h-max">
                      <h5 className="font-semibold text-gray-700">
                        GST & Other Information
                      </h5>
                      <p className="mb-2">
                        Section to config GST & other information
                      </p>
                      <div className="grid gap-2 md:grid-cols-5">
                        <div
                          className={`${
                            values?.DispatchShippingAndOtherDetails
                              ?.bill_type === "IGST"
                              ? "col-span-2 grid gap-2 grid-cols-2"
                              : values?.DispatchShippingAndOtherDetails
                                  ?.bill_type === "GST"
                              ? "md:col-span-3 grid md:grid-cols-3 gap-2"
                              : "col-span-2"
                          }`}
                        >
                          <BillTypeInformationField
                            errors={
                              errors?.DispatchShippingAndOtherDetails?.bill_type
                            }
                            touched={
                              touched?.DispatchShippingAndOtherDetails
                                ?.bill_type
                            }
                            values={
                              values?.DispatchShippingAndOtherDetails?.bill_type
                            }
                          />
                          {values?.DispatchShippingAndOtherDetails
                            ?.bill_type === "IGST" ? (
                            <IGSTInformationField
                              errors={
                                errors?.DispatchShippingAndOtherDetails?.i_gst
                              }
                              touched={
                                touched?.DispatchShippingAndOtherDetails?.i_gst
                              }
                              values={
                                values?.DispatchShippingAndOtherDetails?.i_gst
                              }
                            />
                          ) : values?.DispatchShippingAndOtherDetails
                              ?.bill_type === "GST" ? (
                            <>
                              <SGSTInformationField
                                errors={
                                  errors?.DispatchShippingAndOtherDetails?.s_gst
                                }
                                touched={
                                  touched?.DispatchShippingAndOtherDetails
                                    ?.s_gst
                                }
                                values={
                                  values?.DispatchShippingAndOtherDetails?.s_gst
                                }
                              />
                              <CGSTInformationField
                                errors={
                                  errors?.DispatchShippingAndOtherDetails?.c_gst
                                }
                                touched={
                                  touched?.DispatchShippingAndOtherDetails
                                    ?.c_gst
                                }
                                values={
                                  values?.DispatchShippingAndOtherDetails?.c_gst
                                }
                              />
                            </>
                          ) : null}
                        </div>
                        <div
                          className={`${
                            values?.DispatchShippingAndOtherDetails
                              ?.bill_type === "IGST"
                              ? "md:col-span-3"
                              : values?.DispatchShippingAndOtherDetails
                                  ?.bill_type === "GST"
                              ? "col-span-2"
                              : "md:col-span-3"
                          }`}
                        >
                          <EWayBillNoInformationField
                            errors={
                              errors?.DispatchShippingAndOtherDetails
                                ?.e_way_bill
                            }
                            touched={
                              touched?.DispatchShippingAndOtherDetails
                                ?.e_way_bill
                            }
                          />
                        </div>
                      </div>
                      <RemarkInformationField
                        errors={errors?.DispatchShippingAndOtherDetails?.remark}
                        touched={
                          touched?.DispatchShippingAndOtherDetails?.remark
                        }
                      />
                    </Card>
                  </div>
                  <Card className="my-4">
                    {values.DispatchList.map((list, index) => {
                      return (
                        <div
                          className={
                            values.DispatchList.length - 1 === index
                              ? ""
                              : "mb-5"
                          }
                        >
                          <div className="flex justify-between">
                            {index === 0 ? (
                              <div>
                                <h5 className="font-semibold text-gray-700">
                                  POs Information
                                </h5>
                                <p className="mb-3">
                                  Section to config POs list information
                                </p>
                              </div>
                            ) : (
                              <div></div>
                            )}
                            <div className="flex gap-2 justify-end mb-5">
                              {values.DispatchList.length !== 1 && (
                                <LocationCodeFields
                                  setFieldValue={setFieldValue}
                                  index={index}
                                  errors={
                                    errors?.DispatchList?.[index]?.location_code
                                  }
                                  touched={
                                    errors?.DispatchList?.[index]?.location_code
                                  }
                                />
                              )}

                              {values.DispatchList.length !== 1 && (
                                <Button
                                  type="button"
                                  variant="solid"
                                  color="red-500"
                                  size="sm"
                                  onClick={() => {
                                    handleRemoveLocationCodeAndPoList?.(
                                      values.DispatchList,
                                      index,
                                      setFieldValue
                                    );
                                  }}
                                >
                                  Remove
                                </Button>
                              )}
                              <Button
                                type="button"
                                variant="solid"
                                color="pink-500"
                                size="sm"
                                onClick={() => {
                                  dispatch(
                                    toggleAddDispatchItemDialog({
                                      option: true,
                                      locationIndex: index,
                                    })
                                  );
                                }}
                              >
                                Add Item
                              </Button>
                              {index === 0 ? (
                                <Button
                                  type="button"
                                  variant="solid"
                                  size="sm"
                                  onClick={() => {
                                    handleNewLocationCodeAndPoList?.(
                                      values?.DispatchList,
                                      setFieldValue
                                    );
                                  }}
                                >
                                  New Location
                                </Button>
                              ) : null}
                            </div>
                          </div>
                          <ItemTable
                            handleDeleteItemInPoList={handleDeleteItemInPoList}
                            locationIndex={index}
                            initialData={list.poList}
                            dispatchList={values.DispatchList}
                            setFieldValue={setFieldValue}
                          />
                          <NewDispatchItemDialog
                            boxes={values.DispatchBoxList}
                            locationIndex={index}
                            setFieldValue={setFieldValue}
                            addNewItemInPoList={addNewItemInPoList}
                            dispatchList={values.DispatchList}
                          />
                        </div>
                      );
                    })}
                  </Card>
                  <StickyFooter
                    className="-mx-8 px-8 flex items-center justify-center p-3"
                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <div className="md:flex items-center">
                      <Button
                        variant="solid"
                        loading={isSubmitting}
                        // icon={<AiOutlineSave className='mr-1' />}
                        type="submit"
                      >
                        DISPATCH ORDER
                      </Button>
                    </div>
                  </StickyFooter>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </Suspense>
    </>
  );
});

NewDomesticForm.defaultProps = {
  initialData: {
    invoice_no: "",
    invoice_type: "domestic",
    invoice_date: new Date(),
    DispatchConsignee: null,
    DispatchBuyer: null,
    DispatchShippingAddress: null,
    DispatchList: [
      {
        location_code: "",
        poList: [],
      },
    ],
    DispatchCompanyDetails: {
      iec_code: "",
      gstin: GST_IN,
      itc_code: "",
      duty_drawback_serial_no: "",
      state: STATE,
      pan: PAN,
      state_code: STATE_CODE,
    },
    DispatchBankDetails: BANK_LIST[0],
    DispatchShippingAndOtherDetails: {
      end_use_code: "",
      packing_details: "",
      excise_document: "",
      freight: "",
      shipping_term: "",
      payment_term: "",
      shipping_line: "",
      shipping_insurance: "",
      vehicle_no: "",
      bill_type: "NON GST",
      c_gst: "",
      s_gst: "",
      i_gst: "",
      e_way_bill_no: "",
      remark: "",
      convert_rate: "",
    },
  },
};

export default NewDomesticForm;
