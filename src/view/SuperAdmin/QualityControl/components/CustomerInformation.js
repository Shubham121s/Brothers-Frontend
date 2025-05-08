import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Card, FormItem, Select } from "../../../../components/ui";
import { Field } from "formik";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { getProductsByCustomerId, getQualityControl } from "../store/dataSlice";

const CustomerInformation = (props) => {
  const { errors, values, touched, customers = [], setFieldValue } = props;

  const dispatch = useDispatch();

  const customerData = useMemo(() => {
    return customers.map((customer) => {
      return { label: customer.name, value: customer };
    });
  }, [customers]);

  const fetchList = useCallback(async () => {
    if (values) {
      dispatch(
        getProductsByCustomerId({
          customer_id: values?.customer_id,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (values?.customer_id) {
      fetchList();
    }
  }, [values?.customer_id]);

  return (
    <FormItem
      className="mb-5 h-max"
      label={
        <span className="text-gray-600 font-semibold mt-2">
          Customer Information
        </span>
      }
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="CustomerDetails">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={customerData}
            value={customerData.find(
              (customer) => customer.value === field.value
            )}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
            className="text-gray-500 font-regular"
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: "45px", // set desired height
                height: "45px",
                fontFamily: "'Inter', sans-serif",
                color: "#576373",
              }),
              option: (provided, state) => ({
                ...provided,
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                color: "#576373",
                backgroundColor: state.isFocused ? "#F3F4F6" : "white", // Optional hover effect
              }),
              singleValue: (provided) => ({
                ...provided,
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                color: "#576373",
              }),
              menu: (provided) => ({
                ...provided,
                fontFamily: "'Inter', sans-serif",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#576373",
                fontFamily: "'Inter', sans-serif",
              }),
            }}
          />
        )}
      </Field>
      {/* {!isEmpty(values) ? (
        <Card className="mt-2">
          <div className="flex justify-between">
            <strong>Customer Code :</strong>{" "}
            <span>{values?.customer_code || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Vender Code :</strong>{" "}
            <span>{values?.vender_code || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Mobile :</strong> <span>{values?.mobile || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Phone :</strong> <span>{values?.phone || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Email :</strong> <span>{values?.email || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>PAN No :</strong> <span>{values?.pan || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>GST No :</strong> <span>{values?.gst_no || "-"}</span>
          </div>
        </Card>
      ) : null} */}
    </FormItem>
  );
};

export default memo(CustomerInformation);
