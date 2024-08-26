import React, { memo, useState } from "react";
import { FormItem, Input, DatePicker } from "../../../../../../components/ui";
import { Field } from "formik";

const DateInformationField = (props) => {
  const {
    errors,
    touched,
    label,
    name,
    placeholder = "",
    type = "text",
    value,
    size = "",
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="datepicker-wrapper"
      style={{ position: "relative", zIndex: 1000 }}
    >
      <FormItem
        label={label}
        // invalid={errors && touched}
        errorMessage={errors}
        className="mb-2"
      >
        <Field name={name} placeholder={placeholder}>
          {({ field, form }) => (
            <DatePicker
              field={field}
              form={form}
              value={value}
              onChange={(date) => {
                form.setFieldValue(field.name, date);
              }}
              size={size}
            />
          )}
        </Field>
      </FormItem>
    </div>
  );
};

export default memo(DateInformationField);
