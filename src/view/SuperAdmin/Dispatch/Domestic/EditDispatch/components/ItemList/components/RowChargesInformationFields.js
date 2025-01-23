import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../../components/ui";
import { Field } from "formik";

const RowChargesInformationFields = ({ label = "Row Charges", name }) => {
  return (
    <FormItem label={label} className="mb-4">
      <Field
        name={name}
        placeholder="Enter Row Charges"
        type="number"
        component={Input}
      />
    </FormItem>
  );
};

export default memo(RowChargesInformationFields);
