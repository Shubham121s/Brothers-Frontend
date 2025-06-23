import React, { memo } from "react";
import { DatePicker, FormItem } from "../../../../../../components/ui";
import { Field } from "formik";

const InvoiceDatePickerFields = (props) => {
  const { errors, touched } = props;
  return (
    <FormItem className="mb-0" invalid={errors && touched}>
      <Field name="invoice_date">
        {({ field, form }) => (
          <DatePicker
            style={{ width: "160px" }}
            placeholder="Invoice Date"
            field={field}
            form={form}
            defaultValue={new Date()}
            onChange={(date) => {
              // Fix timezone shift
              const localDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
              form.setFieldValue(field.name, localDate);
            }}
          />
        )}
      </Field>
    </FormItem>
  );
};

export default memo(InvoiceDatePickerFields);
