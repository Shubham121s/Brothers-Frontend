import React, { forwardRef, useEffect } from "react";
import {
  FormContainer,
  Button,
  FormItem,
  Input,
  Select,
} from "../../../../../../components/ui";
import { Field, Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import { getAllCustomerOption } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const patternStatus = [
  { label: "Active", value: true },
  { label: "In-Active", value: false },
];
const patternAvailability = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const validationSchema = Yup.object().shape({
  status: Yup.boolean().required("Status Required"),
  number: Yup.string().required("Number Required"),
  description: Yup.string().required("Remark Required"),
  customer_id: Yup.string().required("customer Required"),
  storage_location: Yup.string().required("Location Required"),
  availability: Yup.boolean().required("Availability Required"),
});

const PatternForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllCustomerOption());
    };
    fetchData();
  }, []);

  const customrerOption = useSelector(
    (state) => state.pattern.data.customerOption
  );

  return (
    <>
      <Formik
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
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div>
                <h4>{type === "edit" && "Update"} Pattern Informations</h4>
                <p className="mb-6">
                  Section to config basic pattern information
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem
                    label="Pattern Number"
                    invalid={errors.number && touched.number}
                    errorMessage={errors.number}
                    className="mb-2"
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="number"
                      placeholder="Number"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Pattern Status"
                    invalid={errors.status && touched.status}
                    errorMessage={errors.status}
                    className="mb-2"
                  >
                    <Field name="status">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          form={form}
                          options={patternStatus}
                          value={patternStatus.filter(
                            (status) => status.value === values.status
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    label="Remarks"
                    invalid={errors.description && touched.description}
                    errorMessage={errors.description}
                    className="mb-2"
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="description"
                      placeholder="Remark"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Availability"
                    invalid={errors.availability && touched.availability}
                    errorMessage={errors.availability}
                    className="mb-2"
                  >
                    <Field name="availability">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          form={form}
                          options={patternAvailability}
                          value={patternAvailability.filter(
                            (availability) =>
                              availability.value === values.availability
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    label="Customer"
                    invalid={errors.customer_id && touched.customer_id}
                    errorMessage={errors.customer_id}
                    className="mb-2"
                  >
                    <Field name="customer_id">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          form={form}
                          options={customrerOption}
                          value={customrerOption?.filter(
                            (customer) => customer.value === values.customer_id
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    label="Storage Loaction"
                    invalid={
                      errors.storage_location && touched.storage_location
                    }
                    errorMessage={errors.storage_location}
                    className="mb-2"
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="storage_location"
                      placeholder="Storage Location"
                      component={Input}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="flex gap-4 justify-end mt-3">
                <Button
                  size="sm"
                  className="ltr:mr-3 rtl:ml-3"
                  onClick={() => onDiscard?.()}
                  type="button"
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  loading={isSubmitting}
                  icon={<AiOutlineSave className="mr-1" />}
                  type="submit"
                >
                  {type === "edit" ? "Update" : "Save"}
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
});

PatternForm.defaultProps = {
  type: "edit",
  initialData: {
    pattern_id: "",
    customer_id: "",
    storage_location: "",
    status: "",
    number: "",
    description: "",
    availability: "",
  },
};

export default PatternForm;
