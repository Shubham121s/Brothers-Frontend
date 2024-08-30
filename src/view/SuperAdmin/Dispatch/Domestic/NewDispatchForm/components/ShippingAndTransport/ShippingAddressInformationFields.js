import React, { memo, useMemo } from "react";
import { Card, FormItem, Select } from "../../../../../../../components/ui";
import { Field } from "formik";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

const ShippingAddressInformationFields = (props) => {
  const { values, errors, touched } = props;
  const shippingAddress = useSelector(
    (state) => state.new_domestic_invoice.data?.shippingAddressList
  );
  const shippingAddressData = useMemo(() => {
    return shippingAddress.map((address) => {
      return { label: address.address, value: address };
    });
  }, [shippingAddress]);
  console.log(values);
  return (
    <FormItem
      className="mb-5 h-max"
      label="Shipping Address"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="DispatchShippingAddress">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={shippingAddressData}
            value={shippingAddressData.filter(
              (address) =>
                address.value?.shipping_address_id ===
                values?.shipping_address_id
            )}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
          />
        )}
      </Field>
      {!isEmpty(values) ? (
        <Card className="mt-2">
          <div className="flex justify-between">
            <strong>Country :</strong> <span>{values?.country || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>State :</strong> <span>{values?.state || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>City :</strong> <span>{values?.city || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>ZIP Code :</strong> <span>{values?.zip_code || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Contact Person :</strong>{" "}
            <span>{values?.contact_person || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Contact Phone :</strong>{" "}
            <span>{values?.contact_phone || "-"}</span>
          </div>
        </Card>
      ) : null}
    </FormItem>
  );
};

export default memo(ShippingAddressInformationFields);
