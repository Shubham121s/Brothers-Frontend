import React, { forwardRef, useEffect, useMemo, useState } from "react";
import FormData from "form-data";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  FormItem,
  Card,
  FormContainer,
} from "../../../../../components/ui";
import cloneDeep from "lodash/cloneDeep";
import { StickyFooter } from "../../../../../components/shared";
import { AiOutlineSave } from "react-icons/ai";
import { Field, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { components } from "react-select";
import { HiCheck } from "react-icons/hi";
import SelectedProductTable from "./SelectedProductTable";
import { setSelectedPoItem } from "../store/StateSlice";

const { Control } = components;

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
  Product: Yup.object().required("Required"),
  serial_number: Yup.string().required("Required"),
  revision_number: Yup.string()
    .required("Required")
    .test((drawing, ctx) => {
      if (
        !ctx.parent?.Product?.Drawings.some(
          (drawingRevision) => drawingRevision.revision_number === drawing
        )
      )
        return ctx.createError({ message: "Not Matched" });
      return true;
    }),
  delivery_date: Yup.date().required("Required"),
  quantity: Yup.number()
    .required("Required")
    .test((Quantity, ctx) => {
      if (Quantity < 1) {
        return ctx.createError({ message: "Quantity should be minimum 1" });
      }
      return true;
    }),
  unit_price: Yup.number()
    .typeError("Must be number")
    .required("Required")
    .test((price, ctx) => {
      if (price < 1) {
        return ctx.createError({ message: "Price should be minimum 1 Rs." });
      }
      return true;
    }),
  project_no: Yup.string().required("Required"),
});

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
        <div className="ml-2 uppercase">
          {`${label} ( ${data?.value?.item_code})`}
        </div>
        {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
      </div>
    </div>
  );
};

const ProductForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type, initialData, onFormSubmit, onDiscard, Products } = props;

  //   const products = useSelector((state) => state.new_po.data.products);
  const productData = useMemo(() => {
    return Products.map((product) => {
      return { label: product.name, value: product };
    });
  }, [Products]);

  const SelectedProducts = useSelector(
    (state) => state.Enquiry_form.state.selectedEnquiryItem
  );

  return (
    <>
      <div>
        <Formik
          enableReinitialize={true}
          innerRef={ref}
          initialValues={{
            ...initialData,
          }}
          // validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const formData = cloneDeep(values);
            dispatch(setSelectedPoItem(values));
            resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setErrors,
            handleSubmit,
            resetForm,
          }) => {
            //   const arr = values.products.map((m) => {
            //     const found = Prdoucts?.find((f) => f.part_name === m.name);
            //     if (found) {
            //       return {
            //         drawing_number: found.drawing_number,
            //         name: found.part_name,
            //         cutting_mm: found.cutting_mm,
            //         weight: found.weight,
            //         quantity: m.quantity,
            //       };
            //     }
            //     return {
            //       name: "",
            //       cutting_mm: "",
            //       weight: "",
            //       drawing_number: "",
            //       quantity: "",
            //     };
            //   });

            //   values.products = arr;
            //   console.log(values.products);
            return (
              <Form>
                <FormContainer>
                  <Card className="h-max border-neutral-800 bg-neutral-50 mt-4">
                    <div className="grid grid-cols-5 gap-3 mb-3">
                      <FormItem
                        label="Product"
                        className="mb-2"
                        invalid={
                          errors.domestic_export && touched.domestic_export
                        }
                        errorMessage={errors.domestic_export}
                      >
                        <Field name="Product">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              size="sm"
                              options={productData}
                              components={{
                                Option: CustomSelectOption,
                                Control: CustomControl,
                              }}
                              value={productData.filter(
                                (product) =>
                                  product.value?.product_id ===
                                  values?.Product?.product_id
                              )}
                              onChange={(option) => {
                                form.setFieldValue(field.name, option.value);
                              }}
                            />
                          )}
                        </Field>
                      </FormItem>
                      <FormItem
                        label="Drawing Revision Number"
                        invalid={errors.rfq_number && touched.rfq_number}
                        errorMessage={errors.rfq_number}
                        className="mb-2"
                      >
                        <Field
                          type="text"
                          name="revision_number"
                          size="sm"
                          placeholder="Drawing Rivision Number"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem
                        label="Quantity"
                        invalid={errors.rfq_number && touched.rfq_number}
                        errorMessage={errors.rfq_number}
                        className="mb-2"
                      >
                        <Field
                          type="text"
                          name="quantity"
                          size="sm"
                          placeholder="Quantity"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem
                        label="Expected Delivery Date"
                        invalid={errors.enquiry_date && touched.enquiry_date}
                        errorMessage={errors.enquiry_date}
                        className="mb-2"
                      >
                        <Field name="expected_delivery_date" placeholder="Date">
                          {({ field, form }) => (
                            <DatePicker
                              field={field}
                              form={form}
                              value={values.expected_delivery_date}
                              size="sm"
                              onChange={(date) => {
                                form.setFieldValue(field.name, date);
                              }}
                            />
                          )}
                        </Field>
                      </FormItem>
                      <Button
                        type="button"
                        size="sm"
                        variant="solid"
                        style={{ marginTop: "28px" }}
                        onClick={handleSubmit}
                      >
                        ADD
                      </Button>
                    </div>

                    <SelectedProductTable data={SelectedProducts} />
                  </Card>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
});

ProductForm.defaultProps = {
  type: "new",
  initialData: {
    Product: "",
    quantity: "",
    revision_number: "",
    expected_delivery_date: "",
  },
};

export default ProductForm;
