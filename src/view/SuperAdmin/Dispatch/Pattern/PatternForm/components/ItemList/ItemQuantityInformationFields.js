import React, { memo, useEffect, useState } from "react";
import {
  Button,
  Card,
  FormItem,
  Input,
} from "../../../../../../../components/ui";
import { Field } from "formik";
import { HiMinus, HiPlus } from "react-icons/hi";

const ItemQuantityInformationFields = (props) => {
  const { errors, values, touched } = props;

  return (
    <FormItem
      label="Quantity In Sets."
      className="mb-4"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="quantity">
        {({ field, form }) => (
          <Input
            className="w-full"
            field={field}
            form={form}
            type="number"
            autoComplete="off"
          />
        )}
      </Field>
    </FormItem>
  );
};

export default memo(ItemQuantityInformationFields);
