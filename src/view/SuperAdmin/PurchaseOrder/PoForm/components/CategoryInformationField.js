import React, { memo, useMemo } from "react";
import { FormItem, Select } from "../../../../../components/ui";
import { Field } from "formik";

const CategoryInformationFields = (props) => {
  const { errors, touched, values, categories = [], type } = props;

  const categoryOption = useMemo(
    () =>
      categories.map((m) => {
        return {
          label: m.name,
          value: m.category_id,
        };
      }),
    [categories]
  );

  return (
    <FormItem
      className="mb-4"
      label="Product Type"
      //   invalid={errors && touched}
      //   errorMessage={errors}
    >
      <Field name="category_id">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={categoryOption}
            value={categoryOption.filter(
              (currency) => currency.value === values
            )}
            disabled={type === "edit" ? true : false}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
          />
        )}
      </Field>
    </FormItem>
  );
};

export default memo(CategoryInformationFields);
