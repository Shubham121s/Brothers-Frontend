import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui";
import { Field } from "formik";

const MachineChargesInformationFields = ({
  label = "Machine Charges",
  name,
}) => {
  return (
    <FormItem label={label} className="mb-4">
      <Field
        name={name}
        placeholder="Enter Machine Charges"
        type="number"
        component={Input}
      />
    </FormItem>
  );
};

export default memo(MachineChargesInformationFields);
