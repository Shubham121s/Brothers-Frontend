import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Card, FormItem, Select } from "../../../../../../components/ui";
import { Field } from "formik";
import { isEmpty } from "lodash";

const ShippingDetailsInformationFields = (props) => {
  const { values, errors, touched } = props;
  const shippingDetails = useSelector(
    (state) => state.new_pattern_invoice.data?.shippingDetailsList
  );

  const shippingDetailsData = useMemo(() => {
    return shippingDetails.map((shipping) => {
      return { label: shipping?.pre_carriage_by, value: shipping };
    });
  }, [shippingDetails]);

  return (
    <FormItem
      className="mb-5 h-max"
      label="Shipping Details"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="DispatchShippingDetails">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={shippingDetailsData}
            value={shippingDetailsData.filter(
              (shippingDetails) => shippingDetails.value === values
            )}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
          />
        )}
      </Field>
      {!isEmpty(values) ? (
        <Card className="mt-2">
          <div className="flex justify-between">
            <strong>Place of receipt :</strong>{" "}
            <span>{values?.place_of_receipt || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Port of discharge :</strong>{" "}
            <span>{values?.port_of_discharge || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Port of loading :</strong>{" "}
            <span>{values?.port_of_loading || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Country of goods :</strong>{" "}
            <span>{values?.country_of_goods || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Country of destination :</strong>{" "}
            <span>{values?.country_of_destination || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Final destination :</strong>{" "}
            <span>{values?.final_destination || "-"}</span>
          </div>
        </Card>
      ) : null}
    </FormItem>
  );
};

export default memo(ShippingDetailsInformationFields);
