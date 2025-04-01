import React, { memo, useEffect, useState } from "react";
import {
  Button,
  Card,
  FormItem,
  Input,
} from "../../../../../../../components/ui";
import { Field } from "formik";
import { HiMinus, HiPlus } from "react-icons/hi";

const NoField = (props) => {
  const { errors, values, touched } = props;

  return (
    <FormItem
      label={`No`}
      className="mb-4"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="no">
        {({ field, form }) => (
          <Input
            className="w-full"
            field={field}
            form={form}
            type="number"
            placeholder="Number"
            autoComplete="off"
          />
        )}
      </Field>
    </FormItem>
  );
};

export default memo(NoField);
