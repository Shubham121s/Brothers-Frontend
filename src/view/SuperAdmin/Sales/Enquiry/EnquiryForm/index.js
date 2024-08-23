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
import { AiOutlineSave } from "react-icons/ai";
import { Field, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { StickyFooter } from "../../../../../components/shared";
import ItemForm from "../EnquiryForm/components/ItemForm/ItemForm";
import InputInformationFields from "./components/InputInformationFields";
import SelectInformatinFields from "./components/SelectInformatinFields";
import { EnquiryType } from "./constant";

const validationSchema = Yup.object().shape({
  customer_id: Yup.string().required("Required"),
  enquiry_date: Yup.string().required("Required"),
  enquiry_type: Yup.string().required("Required"),
  enq_number: Yup.string().required("Required"),
  poc_name: Yup.string().required("Required"),
  poc_contact: Yup.string().required("Required"),
  items: Yup.array().of(
    Yup.object().shape({
      Product: Yup.object().required("Required"),
      drawing_revision: Yup.string()
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
      quantity: Yup.string().required("Required"),
      delivery_date: Yup.string()
        .required("Required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "format YYYY-MM-DD"),
    })
  ),
});

const EnquiryForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type, initialData, onFormSubmit, onDiscard, Customers, Products } =
    props;

  const CustomerOption = useMemo(
    () =>
      Customers.map((m) => {
        return { label: m.name, value: m.customer_id };
      }),
    [Customers]
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
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = cloneDeep(values);
            onFormSubmit?.(formData, setSubmitting);
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
            return (
              <Form>
                <FormContainer>
                  <Card className=" h-max border-rose-800 bg-rose-50">
                    <div className="grid grid-cols-7 gap-3">
                      <SelectInformatinFields
                        errors={errors?.customer_id}
                        touched={touched?.customer_id}
                        name="customer_id"
                        data={CustomerOption}
                        values={values.customer_id}
                        label="Customer"
                      />
                      <InputInformationFields
                        errors={errors?.enq_number}
                        touched={touched?.enq_number}
                        placeholder="Enquiry Number"
                        label="Enquiry No."
                        name="enq_number"
                        type="text"
                      />

                      <SelectInformatinFields
                        errors={errors?.enquiry_type}
                        touched={touched?.enquiry_type}
                        name="enquiry_type"
                        data={EnquiryType}
                        values={values.enquiry_type}
                        label="Type"
                      />
                      <FormItem
                        label="Enquiry Date"
                        invalid={errors.enquiry_date && touched.enquiry_date}
                        errorMessage={errors.enquiry_date}
                        className="mb-2"
                      >
                        <Field name="enquiry_date" placeholder="Date">
                          {({ field, form }) => (
                            <DatePicker
                              field={field}
                              form={form}
                              value={values.date}
                              onChange={(date) => {
                                form.setFieldValue(field.name, date);
                              }}
                            />
                          )}
                        </Field>
                      </FormItem>
                      <InputInformationFields
                        placeholder="Customer Enquiry Number"
                        label="Customer Enquiry No."
                        name="customer_enquiry_number"
                        type="text"
                      />
                      <InputInformationFields
                        errors={errors?.poc_name}
                        touched={touched?.poc_name}
                        placeholder="POC Name"
                        label="Person Of Contact Name"
                        name="poc_name"
                        type="text"
                      />
                      <InputInformationFields
                        errors={errors?.poc_contact}
                        touched={touched?.poc_contact}
                        placeholder="POC Contact"
                        label="Person Of Contact Number"
                        name="poc_contact"
                        type="text"
                      />
                    </div>
                  </Card>
                  <div className="mt-4">
                    <ItemForm
                      values={values}
                      Products={Products}
                      errors={errors}
                      touched={touched}
                    />
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
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </StickyFooter>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
});

EnquiryForm.defaultProps = {
  type: "new",
  initialData: {
    customer_id: "",
    enq_number: "",
    enquiry_type: "",
    customer_enquiry_number: "",
    enquiry_date: new Date(),
    poc_name: "",
    poc_contact: "",
    items: [
      {
        Product: null,
        quantity: "",
        delivery_date: "",
        drawing_revision: "",
      },
    ],
  },
};

export default EnquiryForm;
