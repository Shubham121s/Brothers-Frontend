import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui";
import { Field } from "formik";

const FreightChargesField = (props) => {
  const { errors, touched } = props;
  return (
    <FormItem className="mb-4" label="FREIGHT CHARGES">
      <Field
        component={Input}
        name="DispatchShippingAndOtherDetails.fright_charges"
        placeholder="FREIGHT CHARGES"
      />
    </FormItem>
  );
};

export default memo(FreightChargesField);
