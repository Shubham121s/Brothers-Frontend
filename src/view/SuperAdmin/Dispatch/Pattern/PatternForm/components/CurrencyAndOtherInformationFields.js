import React, { memo } from "react";
import { Input, FormItem } from "../../../../../../components/ui";
import { Field } from "formik";

const CurrencyAndOtherInformationFields = (props) => {
  const { touched, errors } = props;
  return (
    <div>
      <FormItem
        className="mb-4"
        label="Excise document"
        invalid={errors?.excise_document && touched?.excise_document}
        errorMessage={errors?.excise_document}
      >
        <Field
          name="CurrencyAndOtherDetails.excise_document"
          autoComplete="off"
          placeholder="Excise document"
          component={Input}
        />
      </FormItem>
      <FormItem
        className="mb-4"
        label="Freight"
        invalid={errors?.freight && touched?.freight}
        errorMessage={errors?.freight}
      >
        <Field
          component={Input}
          name="CurrencyAndOtherDetails.freight"
          placeholder="Freight"
        />
      </FormItem>
      <FormItem
        className="mb-4"
        label="USD to INR"
        invalid={errors?.usd_to_inr && touched?.usd_to_inr}
        errorMessage={errors?.usd_to_inr}
      >
        <Field
          component={Input}
          name="CurrencyAndOtherDetails.usd_to_inr"
          type="number"
          placeholder="Convert USD to INR (1USD = 80INR)"
        />
      </FormItem>
    </div>
  );
};

export default memo(CurrencyAndOtherInformationFields);
