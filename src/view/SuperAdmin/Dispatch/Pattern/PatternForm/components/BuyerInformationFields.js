import React, { memo, useMemo } from "react";
import { Card, FormItem, Select } from "../../../../../../components/ui";
import { Field } from "formik";
import { isEmpty } from "lodash";

const BuyerInformationFields = (props) => {
  const { errors, values, touched, customers = [] } = props;

  const buyerData = useMemo(() => {
    return customers.map((customer) => {
      return { label: customer.name, value: customer };
    });
  }, [customers]);

  return (
    <FormItem
      label="Buyer"
      className="mb-5 h-max"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="DispatchBuyer">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={buyerData}
            value={buyerData.filter((customer) => customer.value === values)}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
          />
        )}
      </Field>
      {!isEmpty(values) ? (
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
            <strong>Email :</strong> <span>{values?.email || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>PAN No :</strong> <span>{values?.pan || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>GST No :</strong> <span>{values?.gst_no || "-"}</span>
          </div>
        </Card>
      ) : null}
    </FormItem>
  );
};

export default memo(BuyerInformationFields);
