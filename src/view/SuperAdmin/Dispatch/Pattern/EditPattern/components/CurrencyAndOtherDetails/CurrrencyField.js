import React, { memo } from "react";
import { FormItem, Select } from "../../../../../../../components/ui";
import { Field } from "formik";
import { CURRENCY } from "../../constant";

const PaymentTermInformationFields = (props) => {
  const { errors, values, touched } = props;

  return (
    <FormItem
      className="mb-4"
      label="Currency"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="currency">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={CURRENCY}
            value={CURRENCY.filter((term) => term.value === values)}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
          />
        )}
      </Field>
    </FormItem>
  );
};

export default memo(PaymentTermInformationFields);
