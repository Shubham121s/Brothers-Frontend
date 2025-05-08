import React, { Suspense, forwardRef, useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { Button, Card, FormContainer } from "../../../../../components/ui";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Loading, StickyFooter } from "../../../../../components/shared";
import cloneDeep from "lodash/cloneDeep";
import ConsigneeInformationFields from "./components/ConsigneeInformationFields";
import BuyerInformationFields from "./components/BuyerInformationFields";
import InvoiceDatePickerFields from "./components/InvoiceDatePickerFields";
import ShippingAddressInformationFields from "./components/ShippingAddressInformationFields";
import ShippingDetailsInformationFields from "./components/ShippingDetailsInformationFields";
import BankInformationFields from "./components/BankAndShipping/BankInformationFields";
import ShippingInsuranceInformationFields from "./components/BankAndShipping/ShippingInsuranceInformationFields";
import ShippingLineInformationFields from "./components/BankAndShipping/ShippingLineInformationFields";
import ShippingTermsInformationFields from "./components/BankAndShipping/ShippingTermsInformationFields";
import BoxTable from "./components/Box/BoxTable";
import {
  toggleAddDispatchItemDialog,
  toggleNewBoxDialog,
  toggleEditDispatchItemDialog,
  setSelectedDispatchItem,
} from "../NewPattern/store/stateSlice";
import NewDispatchItemDialog from "./components/ItemList/NewItemDialog";
import ItemTable from "./components/ItemList/ItemTable";
import LocationCodeFields from "./components/ItemList/LocationCodeFields";
import NoteInformationFields from "./components/NoteInformationFields";
import {
  BANK_LIST,
  DUTY_DRAWBACK_SERIAL_NO,
  GST_IN,
  IEC_CODE,
  ITC_CODE,
  STATE,
  STATE_CODE,
  NOTE_LIST,
  SHIPPING_INSURANCE,
  PAN,
} from "./constant";
import CurrencyAndOtherInformationFields from "./components/CurrencyAndOtherDetails";
import CompanyDetails from "./components/CompanyDetails";
import EditItemDialog from "./components/ItemList/EditItemDialog";
import InvoiceNumberField from "./components/InvoiceNumberField";
import CurrrencyField from "./components/CurrencyAndOtherDetails/CurrrencyField";

const validationSchema = Yup.object().shape({
  DispatchConsignee: Yup.object().required("Required"),
  DispatchBuyer: Yup.object().required("Required"),
  DispatchShippingAddress: Yup.object().required("Required"),
  DispatchShippingDetails: Yup.object().required("Required"),
  DispatchList: Yup.array().required("Required"),
  DispatchCompanyDetails: Yup.object().shape({
    iec_code: Yup.string().required("Required"),
    gstin: Yup.string().required("Required"),
    itc_code: Yup.string().required("Required"),
    duty_drawback_serial_no: Yup.string().required("Required"),
  }),
  invoice_date: Yup.date().required("Required"),
  DispatchBankDetails: Yup.object().required("Required"),
  DispatchShippingAndOtherDetails: Yup.object().shape({
    payment_term: Yup.string().required("Required"),
  }),
  invoice_no: Yup.string().required("Required"),
});

const ForeignDispatchForm = forwardRef((props, ref) => {
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
    const updatedDispatchList = [...dispatchList, newItem];
    setFieldValue("DispatchList", updatedDispatchList);
    dispatch(
      toggleAddDispatchItemDialog({
        option: false,
      })
    );
  };

  const editItemInPoList = (dispatchList, editItem, setFieldValue) => {
    const updatedDispatchList = [...dispatchList];

    const index = updatedDispatchList.findIndex(
      (f) =>
        f?.PoList?.Product?.product_id === editItem?.PoList?.Product?.product_id
    );
    updatedDispatchList[index] = editItem;
    setFieldValue("DispatchList", updatedDispatchList);
    dispatch(
      toggleEditDispatchItemDialog({
        option: false,
      })
    );
  };

  const handleNewBoxAdd = (boxes = [], newBox = {}, setFieldValue) => {
    const updatedBox = [...boxes, newBox];
    setFieldValue?.("DispatchBoxList", updatedBox);
  };

  const handleNewLocationCodeAndPoList = (dispatchList = [], setFieldValue) => {
    const newDispatchList = {
      location_code: "",
      poList: [],
    };
    const updatedDispatchList = [...dispatchList, newDispatchList];
    setFieldValue?.("DispatchList", updatedDispatchList);
  };

  const handleDeleteItemInPoList = (dispatchList, setFieldValue, Index) => {
    const updatedDispatchList = [...dispatchList];
    const filterDispatchList = updatedDispatchList.filter(
      (f, index) => index !== Index
    );
    setFieldValue?.("DispatchList", filterDispatchList);
    dispatch(
      toggleEditDispatchItemDialog({
        option: false,
      })
    );
  };

  const handleEditItemInPoList = (
    dispatchList,
    setFieldValue,
    poIndex,
    Item
  ) => {
    const updatedDispatchList = [...dispatchList];
    dispatch(setSelectedDispatchItem(Item));
    dispatch(
      toggleEditDispatchItemDialog({
        option: true,
      })
    );
    setFieldValue?.("DispatchList", updatedDispatchList);
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
            if (values.DispatchList.length === 0) {
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
                    <Card className="bg-yellow-50" bodyClass="pb-0">
                      <div className="flex justify-between">
                        <span>
                          <h5 className="font-semibold text-gray-700">
                            Consignee & Buyer Information
                          </h5>
                          <p className="mb-2">
                            Section to config consignee & buyer information
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
                            Address & Shipping Information
                          </h5>
                          <p className="mb-2">
                            Section to config address & shipping information
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
                        <ShippingDetailsInformationFields
                          touched={touched?.DispatchShippingDetails}
                          errors={errors?.DispatchShippingDetails}
                          values={values?.DispatchShippingDetails}
                        />
                      </div>
                    </Card>
                    <Card className="bg-blue-50 h-max">
                      <h5 className="font-semibold text-gray-700">
                        Bank & Company Information
                      </h5>
                      <p className="mb-2">
                        Section to config bank & company information
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
                        Shipping & Other Information
                      </h5>
                      <p className="mb-2">
                        Section to config shipping & other information
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <CurrencyAndOtherInformationFields
                          errors={errors?.DispatchShippingAndOtherDetails}
                          touched={touched?.DispatchShippingAndOtherDetails}
                          values={values?.DispatchShippingAndOtherDetails}
                        />
                        <CurrrencyField
                          errors={errors?.DispatchShippingAndOtherDetails}
                          touched={touched?.DispatchShippingAndOtherDetails}
                          values={values?.currency}
                        />
                        <div>
                          {/* <ShippingInsuranceInformationFields
                            touched={
                              touched?.DispatchShippingAndOtherDetails
                                ?.shipping_insurance
                            }
                            errors={
                              errors?.DispatchShippingAndOtherDetails
                                ?.shipping_insurance
                            }
                            values={
                              values?.DispatchShippingAndOtherDetails
                                ?.shipping_insurance
                            }
                          />
                          <ShippingLineInformationFields
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
                          /> */}
                          {/* <ShippingTermsInformationFields
                            touched={
                              touched?.DispatchShippingAndOtherDetails
                                ?.shipping_term
                            }
                            errors={
                              errors?.DispatchShippingAndOtherDetails
                                ?.shipping_term
                            }
                            values={
                              values?.DispatchShippingAndOtherDetails
                                ?.shipping_term
                            }
                          /> */}
                        </div>
                      </div>
                    </Card>
                    {/* <Card className="bg-yellow-50 h-max" bodyClass="pb-0">
                      <div className="flex justify-between items-center">
                        <span>
                          <h5 className="font-semibold text-gray-700">
                            Box Information
                          </h5>
                          <p className="mb-2">
                            Section to config box information
                          </p>
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="solid"
                          onClick={() => {
                            dispatch(toggleNewBoxDialog(true));
                          }}
                        >
                          Add Box
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <BoxTable
                          values={values?.DispatchBoxList}
                          handleNewBoxAdd={handleNewBoxAdd}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    </Card> */}
                  </div>
                  <Card className="my-4">
                    <div className="flex justify-between ">
                      <div>
                        <h5 className="font-semibold text-gray-700">
                          Pattern Information
                        </h5>
                        <p className="mb-3">
                          Section to config Pattern list information
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="solid"
                        color="pink-500"
                        size="sm"
                        onClick={() => {
                          dispatch(
                            toggleAddDispatchItemDialog({
                              option: true,
                            })
                          );
                        }}
                      >
                        Add Item
                      </Button>
                    </div>
                    <div className=" mb-5">
                      {/* {values.DispatchList.length !== 1 && (
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
                              )} */}

                      {/* {values.DispatchList.length !== 1 && (
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
                              )} */}

                      {/* {index === 0 ? (
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
                              ) : null} */}

                      <ItemTable
                        handleDeleteItemInPoList={handleDeleteItemInPoList}
                        handleEditItemInPoList={handleEditItemInPoList}
                        dispatchList={values.DispatchList}
                        currency={values?.currency}
                        setFieldValue={setFieldValue}
                      />
                      <NewDispatchItemDialog
                        setFieldValue={setFieldValue}
                        addNewItemInPoList={addNewItemInPoList}
                        dispatchList={values.DispatchList}
                      />
                      <EditItemDialog
                        setFieldValue={setFieldValue}
                        editItemInPoList={editItemInPoList}
                        dispatchList={values.DispatchList}
                      />
                    </div>
                  </Card>
                  <div className="grid grid-cols-2 gap-4">
                    {/* <Card className="bg-blue-50 h-max">
                      <h5 className="font-semibold text-gray-700">
                        Note Information
                      </h5>
                      <p className="mb-2">Section to config note information</p>
                      <NoteInformationFields
                        touched={touched?.DispatchNote}
                        errors={errors?.DispatchNote}
                        values={values?.DispatchNote}
                      />
                    </Card> */}
                  </div>
                  <StickyFooter
                    className="-mx-8 px-8 flex items-center justify-center p-3"
                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <div className="md:flex items-center">
                      <Button
                        variant="solid"
                        loading={isSubmitting}
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

ForeignDispatchForm.defaultProps = {
  initialData: {
    invoice_type: "pattern",
    currency: "INR",
    invoice_date: new Date(),
    invoice_no: "",
    DispatchConsignee: null,
    DispatchBuyer: null,
    DispatchShippingAddress: null,
    DispatchShippingDetails: null,
    DispatchList: [],
    DispatchCompanyDetails: {
      iec_code: IEC_CODE,
      gstin: GST_IN,
      itc_code: ITC_CODE,
      duty_drawback_serial_no: DUTY_DRAWBACK_SERIAL_NO,
      state: STATE,
      pan: PAN,
      state_code: STATE_CODE,
    },
    DispatchBankDetails: BANK_LIST[0],
  },
};

export default ForeignDispatchForm;
