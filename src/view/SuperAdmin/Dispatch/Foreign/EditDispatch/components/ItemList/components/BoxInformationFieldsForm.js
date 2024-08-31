import React, { memo, useMemo } from "react";
import { FormItem, Select } from "../../../../../../../../components/ui";
import { Field } from "formik";

const BoxInformationFieldsForm = (props) => {
  const { errors, touched, values, boxes = [] } = props;

  const boxData = useMemo(() => {
    return boxes.map((_, index) => {
      return { label: `BOX NO ${index + 1}`, value: index + 1 };
    });
  }, [boxes]);

  return (
    <FormItem label="Box No" invalid={errors && touched} errorMessage={errors}>
      <Field name="box_no">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={boxData}
            value={boxData.filter((box) => box.value === values)}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
          />
        )}
      </Field>
    </FormItem>
  );
};

export default memo(BoxInformationFieldsForm);
