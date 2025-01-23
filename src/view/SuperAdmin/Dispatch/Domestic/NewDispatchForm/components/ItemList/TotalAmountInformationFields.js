import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui";
import { Field } from "formik";

const TotalAmountInformationFields = (props) => {
  const {
    quantity = 0,
    row_charges = 0,
    machining_charges = 0,
    currency,
    unitPrice = 0,
  } = props;
  return (
    <FormItem label="Total Amount" className="mb-4">
      <Field
        disabled={true}
        placeholder="Total Amount"
        prefix={currency}
        value={(
          Number(unitPrice) * Number(quantity) +
          Number(row_charges) +
          Number(machining_charges)
        ).toFixed(2)}
        component={Input}
      />
    </FormItem>
  );
};

export default memo(TotalAmountInformationFields);
