import React, { memo, useEffect } from "react";
import { FormItem, Input } from "../../../../../../../../components/ui";
import { Field } from "formik";

const WeightInformationFieldsForm = (props) => {
  const { errors, touched, values } = props;
  useEffect(() => {
    if (values.PoList) {
      values.weight = values?.PoList?.Product?.Drawings[0].finish_weight;
    }
  }, [values.PoList]);
  return (
    <FormItem label="Weight" invalid={errors && touched} errorMessage={errors}>
      <Field
        type="number"
        name="weight"
        autoComplete="off"
        placeholder="Individual Weight"
        value={values.weight}
        disabled={true}
        component={Input}
      />
    </FormItem>
  );
};

export default memo(WeightInformationFieldsForm);
