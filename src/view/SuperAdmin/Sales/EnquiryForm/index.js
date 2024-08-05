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
} from "../../../../components/ui";
import cloneDeep from "lodash/cloneDeep";
import { StickyFooter } from "../../../../components/shared";
import { AiOutlineSave } from "react-icons/ai";
import { Field, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ProductForm from "./components/ProductInformationField";
import EnquiryFormReducer from "./store";
import { injectReducer } from "../../../../store";

injectReducer("Enquiry_form", EnquiryFormReducer);

const validationSchema = Yup.object().shape({
  customer_id: Yup.string().required("Required"),
  rfq_number: Yup.string().required("Required"),
  enquiry_date: Yup.string().required("Required"),
  hsn_code: Yup.string().required("Required"),
  domestic_export: Yup.string().required("Required"),
  enq_ref: Yup.string().required("Required"),
  part_number: Yup.string().required("Required"),
  part_name: Yup.string().required("Required"),
  part_type: Yup.string().required("Required"),
  quantity: Yup.string().required("Required"),
  drawing_number: Yup.string().required("Required"),
  material_grade_id: Yup.string().required("Required"),
});

const EnquiryForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type, initialData, onFormSubmit, onDiscard, Customers, Products } =
    props;

  const SelectedProducts = useSelector(
    (state) => state.Enquiry_form.state.selectedEnquiryItem
  );

  const CustomerOption = useMemo(
    () =>
      Customers.map((m) => {
        return { label: m.name, value: m.customer_id };
      }),
    [Customers]
  );

  // const Prdoucts = useSelector((state) => state.newEnquiry.data.products);

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
          onSubmit={(values, { setSubmitting }) => {
            const formData = cloneDeep(values);
            onFormSubmit?.(formData);
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
                  <div className="grid grid-cols-2 gap-2">
                    <Card className=" h-max border-rose-800 bg-rose-50">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <FormItem
                            label="Customer"
                            className="mb-2"
                            invalid={
                              errors.domestic_export && touched.domestic_export
                            }
                            errorMessage={errors.domestic_export}
                          >
                            <Field name="customer_id">
                              {({ field, form }) => (
                                <Select
                                  field={field}
                                  form={form}
                                  size="sm"
                                  options={CustomerOption}
                                  value={CustomerOption.filter(
                                    (item) => item.value === values.customer_id
                                  )}
                                  onChange={(option) => {
                                    form.setFieldValue(
                                      field.name,
                                      option.value
                                    );
                                  }}
                                />
                              )}
                            </Field>
                          </FormItem>
                        </div>
                        <FormItem
                          label="Enquiry No."
                          invalid={errors.rfq_number && touched.rfq_number}
                          errorMessage={errors.rfq_number}
                          className="mb-2"
                        >
                          <Field
                            type="text"
                            name="enq_no"
                            size="sm"
                            placeholder="Enquiry Number"
                            component={Input}
                          />
                        </FormItem>

                        <FormItem
                          label="Enquiry Date"
                          invalid={errors.enquiry_date && touched.enquiry_date}
                          errorMessage={errors.enquiry_date}
                          className="mb-2"
                        >
                          <Field name="date" placeholder="Date">
                            {({ field, form }) => (
                              <DatePicker
                                field={field}
                                form={form}
                                value={values.date}
                                size="sm"
                                onChange={(date) => {
                                  form.setFieldValue(field.name, date);
                                }}
                              />
                            )}
                          </Field>
                        </FormItem>
                        <FormItem
                          label="Customer Enquiry No."
                          invalid={errors.rfq_number && touched.rfq_number}
                          errorMessage={errors.rfq_number}
                          className="mb-2"
                        >
                          <Field
                            type="text"
                            name="enq_no"
                            size="sm"
                            placeholder="Enquiry Number"
                            component={Input}
                          />
                        </FormItem>
                        <FormItem
                          label="POC Name"
                          invalid={errors.rfq_number && touched.rfq_number}
                          errorMessage={errors.rfq_number}
                          className="mb-2"
                        >
                          <Field
                            type="text"
                            name="poc_name"
                            size="sm"
                            placeholder="POC Name"
                            component={Input}
                          />
                        </FormItem>
                        <div className="col-span-2">
                          <FormItem
                            label="POC Contact"
                            invalid={errors.rfq_number && touched.rfq_number}
                            errorMessage={errors.rfq_number}
                            className="mb-2"
                          >
                            <Field
                              type="text"
                              name="poc_contact"
                              size="sm"
                              placeholder="POC Contact"
                              component={Input}
                            />
                          </FormItem>
                        </div>
                      </div>
                    </Card>
                    <Card></Card>
                  </div>
                  <ProductForm Products={Products} />
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </div>

      <StickyFooter
        className="-mx-8 px-8 flex items-center justify-end py-4"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <div className="md:flex items-center">
          <Button size="sm" className="mr-3" type="button">
            Discard
          </Button>
          <Button
            size="sm"
            variant="solid"
            icon={<AiOutlineSave className="mr-1" />}
            type="button"
          >
            Done
          </Button>
        </div>
      </StickyFooter>
    </>
  );
});

EnquiryForm.defaultProps = {
  type: "new",
  initialData: {
    customer_id: "",
    enq_no: "",
    date: new Date(),
    poc_name: "",
    poc_contact: "",
    currency: "INR",
  },
};

export default EnquiryForm;
