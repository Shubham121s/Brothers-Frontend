import React, { useMemo } from "react";
import { Card, FormItem, Select } from "../../../../../components/ui";
import { Field } from "formik";
import { components } from "react-select";
import { isEmpty } from "lodash";

const CustomerInformationFields = (props) => {
  const { touched, errors, customers = [], values } = props;

  const customerData = useMemo(() => {
    return customers.map((customer) => {
      return { label: customer.name, value: customer };
    });
  }, [customers]);

  return (
    <>
      <h5>Customer/Supplier Informations</h5>
      <p className="mb-4">Section to config customer/supplier information</p>
      <FormItem
        className="mb-0"
        label="Customer/Supplier"
        invalid={errors && touched}
        errorMessage={errors}
      >
        <Field name="Customer">
          {({ field, form }) => (
            <Select
              field={field}
              form={form}
              options={customerData}
              value={customerData.filter(
                (customer) =>
                  customer.value?.customer_id === values?.customer_id
              )}
              onChange={(option) =>
                form.setFieldValue(field.name, option.value)
              }
            />
          )}
        </Field>
        {!isEmpty(values) ? (
          <div className="grid grid-cols-2 gap-2 mt-2 h-max">
            <Card bodyClass="p-4" className="bg-emerald-50">
              <div className="flex justify-between">
                <strong>Customer Code :</strong>{" "}
                <span>{values?.customer_code || "-"}</span>
              </div>
              <div className="flex justify-between">
                <strong>Vender Code :</strong>{" "}
                <span>{values?.vender_code || "-"}</span>
              </div>
              <div className="flex justify-between capitalize">
                <strong>Type :</strong> <span>{values?.type || "-"}</span>
              </div>
              <div className="flex justify-between capitalize">
                <strong>Phone :</strong> <span>{values?.phone || "-"}</span>
              </div>
            </Card>
            <Card bodyClass="p-4" className="bg-red-50">
              <div className="flex justify-between">
                <strong>Email :</strong>{" "}
                <span className="lowerCase">{values?.email || "-"}</span>
              </div>
              <div className="flex justify-between">
                <strong>Mobile :</strong> <span>{values?.mobile || "-"}</span>
              </div>
              <div className="flex justify-between">
                <strong>PAN No :</strong> <span>{values?.pan || "-"}</span>
              </div>
              <div className="flex justify-between">
                <strong>GST No :</strong> <span>{values?.gst_no || "-"}</span>
              </div>
            </Card>
          </div>
        ) : null}
      </FormItem>
    </>
  );
};

export default CustomerInformationFields;
