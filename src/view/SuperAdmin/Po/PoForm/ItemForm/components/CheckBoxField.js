import React, { memo } from "react";
import { FormItem, Input, Checkbox } from "../../../../../../components/ui";
import { Field } from "formik";

const CheckBoxField = (props) => {
  const { errors, touched, label, name } = props;
  return (
    <FormItem className="mb-3">
      <Field name={name} component={Checkbox} children={label} />
    </FormItem>
  );
};

export default memo(CheckBoxField);
