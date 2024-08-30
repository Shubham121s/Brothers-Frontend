import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../../components/ui";
import { Field } from "formik";

const TotalAmountInformationFieldsForm = (props) => {
  const { quantity = 0, currency, unitPrice = 0 } = props;
  console.log(quantity);
  return (
    <FormItem label="Total Amount" className="mb-4">
      <Field
        disabled={true}
        placeholder="Total Amount"
        prefix={currency}
        value={(Number(unitPrice) * Number(quantity)).toFixed(2)}
        component={Input}
      />
    </FormItem>
  );
};

export default memo(TotalAmountInformationFieldsForm);
