import React, { memo } from "react";
import { Input, FormItem, Select } from "../../../../../../../components/ui";
import { Field } from "formik";

const boxSize = [
  { label: "MILLIMETER (MM)", value: "mm" },
  { label: "CENTIMETER (CM)", value: "cm" },
  { label: "INCH (INCH)", value: "inch" },
  { label: "METER (M)", value: "m" },
];

const BoxInformationFields = (props) => {
  const { touched, errors, values, index } = props;
  return (
    <div className="grid grid-cols-2 gap-2">
      <FormItem className="mb-4" label="Box no">
        <Field
          type="text"
          disabled={true}
          value={`BOX NO ${values?.index || index}`}
          placeholder="No of box"
          component={Input}
        />
      </FormItem>
      <FormItem
        className="mb-4"
        label="Box size type"
        invalid={errors?.box_size_type && touched?.box_size_type}
        errorMessage={errors?.box_size_type}
      >
        <Field name="box_size_type">
          {({ field, form }) => (
            <Select
              field={field}
              form={form}
              options={boxSize}
              value={boxSize.filter(
                (customer) => customer.value === values.box_size_type
              )}
              onChange={(option) =>
                form.setFieldValue(field.name, option.value)
              }
            />
          )}
        </Field>
      </FormItem>
      <FormItem
        className="mb-4"
        label="Length"
        invalid={errors?.box_length && touched?.box_length}
        errorMessage={errors?.box_length}
      >
        <Field
          type="number"
          name="box_length"
          placeholder="Box Length"
          component={Input}
          suffix={values.box_size_type}
        />
      </FormItem>
      <FormItem
        className="mb-4"
        label="Breadth"
        invalid={errors?.box_breadth && touched?.box_breadth}
        errorMessage={errors?.box_breadth}
      >
        <Field
          type="number"
          name="box_breadth"
          placeholder="Box Breadth"
          component={Input}
          suffix={values.box_size_type}
        />
      </FormItem>
      <FormItem
        className="mb-4"
        label="Height"
        invalid={errors?.box_height && touched?.box_height}
        errorMessage={errors?.box_height}
      >
        <Field
          type="number"
          name="box_height"
          placeholder="Box Height"
          component={Input}
          suffix={values.box_size_type}
        />
      </FormItem>
      <FormItem
        className="mb-4"
        label="Tare weight"
        invalid={errors?.tare_weight && touched?.tare_weight}
        errorMessage={errors?.tare_weight}
      >
        <Field
          type="number"
          name="tare_weight"
          placeholder="Box tare weight"
          component={Input}
          suffix="Kg"
        />
      </FormItem>
    </div>
  );
};

export default memo(BoxInformationFields);
