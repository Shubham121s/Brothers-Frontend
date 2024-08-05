import React, { memo, useEffect, useState } from "react";
import {
  Button,
  Card,
  FormItem,
  Input,
} from "../../../../../../../components/ui";
import { Field } from "formik";
import { HiMinus, HiPlus } from "react-icons/hi";

const RateFields = (props) => {
  const { errors, values, touched, currency = "INR" } = props;

  return (
    <FormItem
      label={`Rate In ${currency}`}
      className="mb-4"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="rate">
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

export default memo(RateFields);
