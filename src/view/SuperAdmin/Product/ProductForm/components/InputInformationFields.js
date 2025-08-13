import React, { memo, useEffect } from "react";
import { FormItem, Input } from "../../../../../components/ui";
import { Field, useFormikContext } from "formik";

const InputInformationFields = (props) => {
  const {
    errors,
    touched,
    label,
    name,
    placeholder = "",
    type = "text",
  } = props;

  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (
      ["raw_lead_time", "machine_lead_time", "quality_lead_time"].includes(name)
    ) {
      const rlt = parseFloat(values.raw_lead_time) || 0;
      const mlt = parseFloat(values.machine_lead_time) || 0;
      const qlt = parseFloat(values.quality_lead_time) || 0;
      const slt = rlt + mlt + qlt;

      setFieldValue("standard_lead_time", slt);
    }
  }, [
    values.raw_lead_time,
    values.machine_lead_time,
    values.quality_lead_time,
    setFieldValue,
    name,
  ]);

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (name === "name") {
      newValue = newValue.toUpperCase(); // Convert only Product Name to UPPERCASE
    }

    setFieldValue(name, newValue);
  };
  return (
    <FormItem
      className="mb-4"
      label={label}
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field
        type={type}
        autoComplete="off"
        name={name}
        placeholder={placeholder}
        component={Input}
        value={values[name] || ""}
        onChange={handleChange}
        {...(type === "number" ? { onWheel: (e) => e.target.blur() } : {})}
      />
    </FormItem>
  );
};

export default memo(InputInformationFields);
