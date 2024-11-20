import React, { memo } from "react";
import { FormItem, Input, Checkbox } from "../../../../../../components/ui";
import { Field } from "formik";

const CheckBoxField = (props) => {
  const { errors, touched, label, name, value } = props;
  const isChecked = value === 1;
  return (
    <FormItem className="mb-3">
      <Field name={name}>
        {({ field, form }) => (
          <Checkbox
            {...field}
            checked={isChecked}
            onChange={(...args) => {
              const [checked] = args;
              form.setFieldValue(name, checked ? 1 : 0);
            }}
          >
            {label}
          </Checkbox>
        )}
      </Field>
    </FormItem>
  );
};

export default memo(CheckBoxField);
