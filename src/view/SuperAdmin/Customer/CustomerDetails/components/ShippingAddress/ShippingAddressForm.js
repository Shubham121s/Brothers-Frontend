import React, { forwardRef } from "react";
import {
  FormContainer,
  Button,
  FormItem,
  Input,
} from "../../../../../../components/ui";
import { StickyFooter } from "../../../../../../components/shared";
import { Field, Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip_code: Yup.number().required("Required"),
  country: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  contact_person: Yup.string().required("Required"),
  contact_phone: Yup.number().required("Required"),
});

const ShippingAddressForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard } = props;

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
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-2 gap-2">
                <FormItem
                  className="mb-4"
                  label="Contact Person"
                  invalid={errors.contact_person && touched?.contact_person}
                  errorMessage={errors.contact_person}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="contact_person"
                    placeholder="Contact Person"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-4"
                  label="Contact Phone"
                  invalid={errors.contact_phone && touched?.contact_phone}
                  errorMessage={errors.contact_phone}
                >
                  <Field
                    type="number"
                    autoComplete="off"
                    name="contact_phone"
                    placeholder="Contact Phone"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div>
                <FormItem
                  className="mb-4"
                  label="Full Address"
                  invalid={errors.address && touched?.address}
                  errorMessage={errors.address}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="address"
                    placeholder="Full Address"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormItem
                  className="mb-4"
                  label="Country"
                  invalid={errors.country && touched?.country}
                  errorMessage={errors.country}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="country"
                    placeholder="Country"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-4"
                  label="State"
                  invalid={errors.state && touched?.state}
                  errorMessage={errors.state}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="state"
                    placeholder="State"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-4"
                  label="State Code"
                  // invalid={errors.city && touched?.city}
                  // errorMessage={errors.city}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="state_code"
                    placeholder="Sate Code"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-4"
                  label="City"
                  invalid={errors.city && touched?.city}
                  errorMessage={errors.city}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="city"
                    placeholder="City"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-4"
                  label="ZIP code"
                  invalid={errors.zip_code && touched?.zip_code}
                  errorMessage={errors.zip_code}
                >
                  <Field
                    type="number"
                    autoComplete="off"
                    name="zip_code"
                    placeholder="PIN/ZIP Code"
                    component={Input}
                  />
                </FormItem>
              </div>
              <StickyFooter
                className="flex items-center justify-end pt-2"
                stickyClass="border-t bg-white border-gray-200"
              >
                <div className="md:flex items-center">
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
                    icon={<AiOutlineSave className="mr-1" />}
                    type="submit"
                  >
                    {type === "edit" ? "Update" : "Save"}
                  </Button>
                </div>
              </StickyFooter>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
});

ShippingAddressForm.defaultProps = {
  type: "edit",
  initialData: {
    address_id: "",
    address: "",
    contact_person: "",
    contact_phone: "",
    country: "",
    city: "",
    zip_code: "",
    state: "",
    state_code: "",
  },
};

export default ShippingAddressForm;
