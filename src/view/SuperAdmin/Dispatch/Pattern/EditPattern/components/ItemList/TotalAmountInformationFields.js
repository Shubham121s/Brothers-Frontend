import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui";
import { Field } from "formik";

const TotalAmountInformationFields = (props) => {
  const { quantity = 0, rate, currency = "INR" } = props;

  console.log("props", props);
  const totalAmount = (Number(rate || 0) * Number(quantity || 0)).toFixed(2);
  console.log(quantity);
  return (
    <FormItem label={`Amount In ${currency}`} className="mb-4">
      <Field
        disabled={true}
        placeholder="Total Amount"
        prefix={currency}
        value={totalAmount}
        component={Input}
      />
    </FormItem>
  );
};

export default memo(TotalAmountInformationFields);
