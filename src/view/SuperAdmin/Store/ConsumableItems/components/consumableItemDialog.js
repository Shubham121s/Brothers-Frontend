import React, { forwardRef } from "react";
import {
  FormContainer,
  FormItem,
  Button,
  Input,
  Select,
} from "../../../../../components/ui";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";

const validationSchema = Yup.object().shape({
  Customer: Yup.object().required("Required"),
  number: Yup.string().required("Required"),
  date: Yup.date().required("Required"),
  currency_type: Yup.string().required("Required"),
});

const ConsumableItemDialog = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard } = props;
  const dispatch = useDispatch();

  const dialog = useSelector(
    (state) => state.finish_goods.state.goodsNewDialog
  );

  const typeOption = [
    { label: "RING", value: "RING" },
    { label: "CIRCLE", value: "CIRCLE" },
    { label: "SQUARE", value: "SQUARE" },
    { label: "OTHER", value: "OTHER" },
  ];

  return (
    <>
      <div className="mx-4">
        <Formik
          innerRef={ref}
          initialValues={{
            ...initialData,
          }}
          // validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = cloneDeep(values);

            onFormSubmit?.(formData, setSubmitting);
          }}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
                  <FormItem
                    className="mb-2"
                    label="Material"
                    // invalid={errors && touched}
                    // errorMessage={errors}
                  >
                    <Field name="part_type">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          form={form}
                          options={typeOption}
                          value={typeOption.filter(
                            (gst) => gst?.value === values?.part_type
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  {/* <FormItem className="mb-2" label="Name">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="name"
                        placeholder="name"
                        component={Input}
                      />
                    </FormItem> */}
                  {values.part_type === "CIRCLE" && (
                    <>
                      <FormItem label="OD" className="mb-2">
                        <Field
                          type="number"
                          name="od"
                          placeholder="OD"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem label="Thickness" className="mb-2">
                        <Field
                          type="number"
                          name="thickness"
                          placeholder="Thickness"
                          component={Input}
                        />
                      </FormItem>
                    </>
                  )}
                  {values.part_type === "RING" && (
                    <>
                      <FormItem label="OD" className="mb-2">
                        <Field
                          type="number"
                          name="od"
                          placeholder="OD"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem label="ID" className="mb-2">
                        <Field
                          type="number"
                          name="id"
                          placeholder="ID"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem label="Thickness" className="mb-2">
                        <Field
                          type="number"
                          name="thickness"
                          placeholder="Thickness"
                          component={Input}
                        />
                      </FormItem>
                    </>
                  )}
                  {values.part_type === "SQUARE" && (
                    <>
                      <FormItem label="Length" className="mb-2">
                        <Field
                          type="number"
                          name="length"
                          placeholder="Length"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem label="Width" className="mb-2">
                        <Field
                          type="number"
                          name="width"
                          placeholder="Width"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem label="Thickness" className="mb-2">
                        <Field
                          type="number"
                          name="thickness"
                          placeholder="Thickness"
                          component={Input}
                        />
                      </FormItem>
                    </>
                  )}

                  {values.part_type === "OTHER" && (
                    <>
                      <FormItem label="Size" className="mb-2">
                        <Field
                          type="number"
                          name="size"
                          placeholder="Size"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem label="Length" className="mb-2">
                        <Field
                          type="number"
                          name="length"
                          placeholder="Length"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem label="Width" className="mb-2">
                        <Field
                          type="number"
                          name="width"
                          placeholder="Width"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem label="Thickness" className="mb-2">
                        <Field
                          type="number"
                          name="thickness"
                          placeholder="Thickness"
                          component={Input}
                        />
                      </FormItem>
                    </>
                  )}

                  <FormItem className="mb-2" label="Quantity">
                    <Field
                      type="number"
                      autoComplete="off"
                      name="quantity"
                      placeholder="Quantity"
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

ConsumableItemDialog.defaultProps = {
  type: "new",
  initialData: {
    raw_material_id: "",
    quantity: "",
    part_type: "",
    od: "",
    thickness: "",
    id: "",
    length: "",
    width: "",
    size: "",
  },
};

export default ConsumableItemDialog;
