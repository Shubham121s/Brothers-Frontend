import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Card, FormItem, Select } from "../../../../components/ui";
import { Field } from "formik";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { getQualityControl } from "../store/dataSlice";

const ProductInformation = (props) => {
  const { errors, values, touched, products = [], setFieldValue } = props;
  const dispatch = useDispatch();

  console.log("products", products);

  const fetchData = useCallback(async () => {
    dispatch(getQualityControl({ product_id: values?.product_id }));
  });
  const productData = useMemo(() => {
    const productData = [];
    products.forEach((item) => {
      item.Products.forEach((product) => {
        productData.push({
          label: product.name,
          value: product.product_id,
        });
      });
    });

    return productData;
  }, [products]);

  const productCustomerMap = useMemo(() => {
    const map = {};
    products.forEach((item) => {
      const customerId = item.Customer?.customer_id;
      item.Products.forEach((product) => {
        map[product.product_id] = customerId;
      });
    });
    return map;
  }, [products]);

  //   const fetchPoList = useCallback(async () => {
  //     setFieldValue?.("DispatchShippingAddress", null);
  //     setFieldValue?.("DispatchShippingDetails", null);
  //     if (values) {
  //       dispatch(
  //         getAllPosByCustomerId({
  //           customer_id: values?.customer_id,
  //           currency_type: "INR",
  //         })
  //       );
  //       dispatch(
  //         getAllShippingAddressByCustomerId({
  //           customer_id: values?.customer_id || "",
  //         })
  //       );
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [values]);

  //   useEffect(() => {
  //     fetchPoList();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [values]);

  return (
    <FormItem
      className="mb-5 h-max"
      label={
        <span className="text-gray-600 font-semibold mt-2">
          Product Information
        </span>
      }
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="ProductDetails">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={productData}
            value={productData.find((product) => product.value === field.value)}
            onChange={(option) => {
              const customerId = productCustomerMap[option.value];
              form.setFieldValue(field.name, option.value);
              dispatch(
                getQualityControl({
                  product_id: option.value,
                  customer_id: customerId,
                })
              );
            }}
            className="text-gray-500 font-regular"
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: "45px", // set desired height
                height: "45px",
                fontFamily: "'Inter', sans-serif",
                color: "#576373",
              }),
              option: (provided, state) => ({
                ...provided,
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                color: "#576373",
                backgroundColor: state.isFocused ? "#F3F4F6" : "white", // Optional hover effect
              }),
              singleValue: (provided) => ({
                ...provided,
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                color: "#576373",
              }),
              menu: (provided) => ({
                ...provided,
                fontFamily: "'Inter', sans-serif",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#576373",
                fontFamily: "'Inter', sans-serif",
              }),
            }}
          />
        )}
      </Field>
      {/* {!isEmpty(values) ? (
        <Card className="mt-2">
          <div className="flex justify-between">
            <strong>product Code :</strong>{" "}
            <span>{values?.customer_code || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Vender Code :</strong>{" "}
            <span>{values?.vender_code || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Mobile :</strong> <span>{values?.mobile || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Phone :</strong> <span>{values?.phone || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Email :</strong> <span>{values?.email || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>PAN No :</strong> <span>{values?.pan || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>GST No :</strong> <span>{values?.gst_no || "-"}</span>
          </div>
        </Card>
      ) : null} */}
    </FormItem>
  );
};

export default memo(ProductInformation);
