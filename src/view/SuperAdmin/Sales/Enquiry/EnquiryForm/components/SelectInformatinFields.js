import React, { memo } from "react";
import { FormItem, Select } from "../../../../../../components/ui";
import { Field } from "formik";

const SelectInformationFields = (props) => {
  const { errors, touched, name, data, values, label } = props;
  return (
    <FormItem
      className="mb-3"
      label={label}
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name={name}>
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={data}
            value={data.filter((item) => item.value === values)}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
          />
        )}
      </Field>
    </FormItem>
  );
};

export default memo(SelectInformationFields);
