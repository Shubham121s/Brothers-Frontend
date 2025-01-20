import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui"; // Adjust the import path as necessary
import { Field } from "formik";

const OtherChargesInformationField = (props) => {
  const { errors, touched } = props;

  return (
    <FormItem className="mb-4" label="OTHER CHARGES">
      <Field
        component={Input}
        name="DispatchShippingAndOtherDetails.other_charges"
        placeholder="OTHER CHARGES"
        error={touched && errors ? errors : undefined}
      />
    </FormItem>
  );
};

export default memo(OtherChargesInformationField);
