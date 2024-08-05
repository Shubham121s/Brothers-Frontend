import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui";
import { Field } from "formik";

const TotalAmountInformationFields = (props) => {
  const { quantity = 0, rate, currency = "INR" } = props;
  console.log(quantity);
  return (
    <FormItem label={`Amount In ${currency}`} className="mb-4">
      <Field
        disabled={true}
        placeholder="Total Amount"
        prefix={currency}
        value={(Number(rate) * Number(quantity)).toFixed(2)}
        component={Input}
      />
    </FormItem>
  );
};

export default memo(TotalAmountInformationFields);
