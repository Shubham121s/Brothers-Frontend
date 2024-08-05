import React, { forwardRef } from "react";
import {
  Dialog,
  FormContainer,
  FormItem,
  Button,
  Input,
  Select,
} from "../../../../../components/ui";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";
import cloneDeep from "lodash/cloneDeep";

const initialDataSchema = Yup.object().shape({
  raw_material_name: Yup.string().required("Required"),
  raw_material_size: Yup.number().required("Required"),
  raw_material_thickness: Yup.number().required("Required"),
  raw_material_length: Yup.number().required("Required"),
  raw_material_width: Yup.number().required("Required"),
  raw_material_price: Yup.number().required("Required"),
});

const RawMaterialDialog = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard } = props;
  const dispatch = useDispatch();

  const typeOption = [
    { label: "Channel", value: "Channel" },
    { label: "Sheet", value: "Sheet" },
    { label: "Angle", value: "Angle" },
  ];

  return (
    <>
      <div className="mx-4">
        <Formik
          innerRef={ref}
          initialValues={{
            ...initialData,
          }}
          validationSchema={initialDataSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = cloneDeep(values);
            onFormSubmit?.(formData, setSubmitting);
          }}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
                  {/* <FormItem
                      className="mb-2"
                      label="Raw Material"
                      // invalid={errors && touched}
                      // errorMessage={errors}
                    >
                      <Field name="raw_material_id">
                        {({ field, form }) => (
                          <Select
                            field={field}
                            form={form}
                            options={typeOption}
                            value={typeOption.filter(
                              (gst) => gst?.value === values?.raw_material_id
                            )}
                            onChange={(option) =>
                              form.setFieldValue(field.name, option.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem> */}
                  <FormItem
                    className="mb-2"
                    label="Name"
                    invalid={
                      errors.raw_material_name && touched.raw_material_name
                    }
                    errorMessage={errors.raw_material_name}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="raw_material_name"
                      placeholder="Name"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    className="mb-2"
                    label="Size"
                    invalid={
                      errors.raw_material_size && touched.raw_material_size
                    }
                    errorMessage={errors.raw_material_size}
                  >
                    <Field
                      type="number"
                      autoComplete="off"
                      name="raw_material_size"
                      placeholder="Size"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    className="mb-2"
                    label="Thickness"
                    invalid={
                      errors.raw_material_thickness &&
                      touched.raw_material_thickness
                    }
                    errorMessage={errors.raw_material_thickness}
                  >
                    <Field
                      type="number"
                      autoComplete="off"
                      name="raw_material_thickness"
                      placeholder="Thickness"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    className="mb-2"
                    label="Length"
                    invalid={
                      errors.raw_material_length && touched.raw_material_length
                    }
                    errorMessage={errors.raw_material_length}
                  >
                    <Field
                      type="number"
                      autoComplete="off"
                      name="raw_material_length"
                      placeholder="Length"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    className="mb-2"
                    label="Width"
                    invalid={
                      errors.raw_material_width && touched.raw_material_width
                    }
                    errorMessage={errors.raw_material_width}
                  >
                    <Field
                      type="number"
                      autoComplete="off"
                      name="raw_material_width"
                      placeholder="Width"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    className="mb-2"
                    label="Price"
                    invalid={
                      errors.raw_material_price && touched.raw_material_price
                    }
                    errorMessage={errors.raw_material_price}
                  >
                    <Field
                      type="number"
                      autoComplete="off"
                      name="raw_material_price"
                      placeholder="Price"
                      component={Input}
                    />
                  </FormItem>
                </div>

                <div className="md:flex items-center justify-end">
                  <Button
                    size="sm"
                    className="mr-3"
                    onClick={() => onDiscard?.()}
                    type="button"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    type="submit"
                  >
                    {type === "new" ? "Submit" : "Update"}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
});

RawMaterialDialog.defaultProps = {
  type: "new",
  initialData: {
    raw_material_id: "",
    raw_material_name: "",
    raw_material_size: "",
    raw_material_thickness: "",
    raw_material_length: "",
    raw_material_width: "",
    raw_material_price: "",
  },
};

export default RawMaterialDialog;
