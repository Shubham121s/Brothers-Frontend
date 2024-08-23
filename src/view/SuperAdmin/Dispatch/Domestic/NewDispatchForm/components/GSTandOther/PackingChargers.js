import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui";
import { Field } from "formik";

const PackingChargesInformationField = (props) => {
  const { errors, touched } = props;
  return (
    <FormItem className="mb-4" label="P & F Charges">
      <Field
        component={Input}
        name="DispatchShippingAndOtherDetails.packing_charges"
        placeholder="P & F Charges"
      />
    </FormItem>
  );
};

export default memo(PackingChargesInformationField);
