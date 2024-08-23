import React, { memo, useMemo } from "react";
import { FormItem, Select } from "../../../../../../components/ui";
import { components } from "react-select";
import { useSelector } from "react-redux";
import { HiCheck } from "react-icons/hi";
import { Field } from "formik";
const { Control } = components;

const CustomControl = ({ children, ...props }) => {
  const selected = props.getValue()[0];
  return (
    <Control {...props}>
      {selected && (
        <span className="ml-2 font-semibold uppercase">
          {selected?.value?.item_code} :
        </span>
      )}
      {children}
    </Control>
  );
};

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 ${
        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      {...innerProps}
    >
      <div className="items-center flex justify-between w-full">
        <div className="ml-2 uppercase">{`${label}`}</div>
        {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
      </div>
    </div>
  );
};

const ProductInformationFields = (props) => {
  const { values, errors, touched, mode } = props;

  const products = useSelector((state) =>
    mode === "edit" ? state.edit_po.data.products : state.new_po.data.products
  );
  const productData = useMemo(() => {
    return products.map((product) => {
      return {
        label: `${product.name} (${product?.item_code})`,
        value: product,
      };
    });
  }, [products]);

  return (
    <FormItem
      className="mb-4"
      label="Product"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="Product">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={productData}
            components={{
              Option: CustomSelectOption,
              Control: CustomControl,
            }}
            value={productData.filter(
              (product) => product.value?.product_id === values?.product_id
            )}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
          />
        )}
      </Field>
    </FormItem>
  );
};

export default memo(ProductInformationFields);
