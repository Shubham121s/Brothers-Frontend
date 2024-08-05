import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Toast,
  Select,
  Badge,
  Notification,
  Dialog,
} from "../../../../../components/ui";
import { components } from "react-select";
import { HiCheck } from "react-icons/hi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  getAllLedgerListByWorkerId,
  postPayLedgerAmountByWorkerId,
} from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import useQuery from "../../../../../utils/hooks/useQuery";
import { payment_options } from "../../constant";
import React, { useState } from "react";

const { Control } = components;

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 cursor-pointer ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
      {...innerProps}
    >
      <div className="flex items-center gap-2">
        <Badge
          className="mr-2 items-center"
          innerClass={data?.color}
          content={data?.content}
          badgeStyle={{
            width: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "19px",
          }}
        />
        <span>{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CustomControl = ({ children, ...props }) => {
  const selected = props.getValue()[0];
  return (
    <Control {...props}>
      {selected && (
        <Badge
          className="ltr:ml-4 rtl:mr-4"
          innerClass={selected.color}
          content={selected?.content}
          badgeStyle={{
            width: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "19px",
          }}
        />
      )}
      {children}
    </Control>
  );
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Required"),
  type: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  payment_type: Yup.string().required("Required"),
});

const data = {
  amount: "",
  type: "",
  description: "",
  payment_type: "",
};

const LedgerForm = () => {
  const dispatch = useDispatch();
  const searchQuery = useQuery();
  const workerId = searchQuery.get("id");

  const { status } = useSelector(
    (state) => state.workerLedgerList.data.filterData
  );
  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.workerLedgerList.data.tableData
  );
  const endDate = useSelector((state) => state.workerLedgerList.state.endDate);
  const startDate = useSelector(
    (state) => state.workerLedgerList.state.startDate
  );

  return (
    <>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const value = { worker_id: Number(workerId), ...values };
          let action = await dispatch(postPayLedgerAmountByWorkerId(value));
          let notificationWithAvatar;
          if (action?.payload?.status < 300) {
            notificationWithAvatar = (
              <Notification title="Payment status" type="success">
                {action?.payload?.data?.message}
              </Notification>
            );
            resetForm(
              ((values.amount = ""),
              (values.payment_type = ""),
              (values.description = ""),
              (values.type = ""))
            );
            dispatch(
              getAllLedgerListByWorkerId({
                worker_id: Number(workerId),
                status,
                pageIndex,
                pageSize,
                startDate,
                endDate,
              })
            );
          } else {
            notificationWithAvatar = (
              <Notification title="Payment status" type="danger">
                {action?.payload?.data?.message}
              </Notification>
            );
          }
          Toast.push(notificationWithAvatar);
          setSubmitting(false);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
                <div className="md:grid grid-cols-6 gap-1 items-center">
                  <div className="col-span-1">
                    <FormItem
                      label="Amount"
                      invalid={errors.amount && touched.amount}
                      errorMessage={errors.amount}
                    >
                      <Field
                        type="number"
                        autoComplete="off"
                        size="sm"
                        name="amount"
                        placeholder="Amount"
                        component={Input}
                      />
                    </FormItem>
                  </div>
                  <div className="col-span-1">
                    <FormItem
                      label="Payment"
                      invalid={errors.payment_type && touched.payment_type}
                      errorMessage={errors.payment_type}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        size="sm"
                        name="payment_type"
                        placeholder="Payment_type"
                        component={Input}
                      />
                    </FormItem>
                  </div>
                  <div className="col-span-1">
                    <FormItem
                      label="Description"
                      invalid={errors.description && touched.description}
                      errorMessage={errors.description}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        size="sm"
                        name="description"
                        placeholder="Description"
                        component={Input}
                      />
                    </FormItem>
                  </div>
                  <div className="col-span-1 mt-6">
                    <FormItem
                      label=""
                      invalid={errors.type && touched.type}
                      errorMessage={errors.type}
                    >
                      <Field name="type">
                        {({ field, form }) => (
                          <Select
                            className="mt-1"
                            size="sm"
                            field={field}
                            form={form}
                            options={payment_options}
                            components={{
                              Option: CustomSelectOption,
                              Control: CustomControl,
                            }}
                            value={payment_options.filter(
                              (option) => option.value === values.type
                            )}
                            onChange={(option) =>
                              form.setFieldValue(field.name, option.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem>
                  </div>
                  <div className="col-span-1">
                    <FormItem className="mt-6">
                      <Button
                        loading={isSubmitting}
                        variant="solid"
                        type="submit"
                        size="sm"
                        className="mt-1"
                        // disabled={PendingAmount === 0}
                      >
                        {isSubmitting ? "Please wait" : "Submit"}
                      </Button>
                    </FormItem>
                  </div>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default LedgerForm;
