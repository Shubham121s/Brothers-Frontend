import React, { memo } from "react";
import { DatePicker, FormItem } from "../../../../../../components/ui";
import { Field } from "formik";

const DatePickerInformationFields = (props) => {
  const { label, errors, touched, placeholder = "", name } = props;
  return (
    <FormItem
      className="mb-4"
      label={label}
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name={name}>
        {({ field, form }) => (
          <DatePicker
            placeholder={placeholder}
            field={field}
            form={form}
            value={field.value}
            onChange={(date) => {
              const utcDate = new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
              );
              form.setFieldValue(field.name, utcDate);
            }}
          />
        )}
      </Field>
    </FormItem>
  );
};

export default memo(DatePickerInformationFields);
