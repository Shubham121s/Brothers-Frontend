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
  pre_carriage_by: Yup.string().required("Required"),
  place_of_receipt: Yup.string().required("Required"),
  port_of_discharge: Yup.string().required("Required"),
  country_of_goods: Yup.string().required("Required"),
  destination: Yup.string().required("Required"),
  port_of_loading: Yup.string().required("Required"),
  final_destination: Yup.string().required("Required"),
});

const ShippingDetailsForm = forwardRef((props, ref) => {
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
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-2 gap-2">
                <FormItem
                  className="mb-3"
                  label="Pre carriage by"
                  invalid={errors.pre_carriage_by && touched?.pre_carriage_by}
                  errorMessage={errors.pre_carriage_by}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="pre_carriage_by"
                    placeholder="Pre carriage by"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-3"
                  label="Place of receipt"
                  invalid={errors.place_of_receipt && touched?.place_of_receipt}
                  errorMessage={errors.place_of_receipt}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="place_of_receipt"
                    placeholder="Place of receipt"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-3"
                  label="Port of discharge"
                  invalid={
                    errors.port_of_discharge && touched?.port_of_discharge
                  }
                  errorMessage={errors.port_of_discharge}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="port_of_discharge"
                    placeholder="Port of discharge"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-3"
                  label="Country of origin of goods"
                  invalid={errors.country_of_goods && touched?.country_of_goods}
                  errorMessage={errors.country_of_goods}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="country_of_goods"
                    placeholder="Country of origin of goods"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-3"
                  label="Country of final destination"
                  invalid={errors.destination && touched?.destination}
                  errorMessage={errors.destination}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="destination"
                    placeholder="Country of origin of destination"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-3"
                  label="Port of loading"
                  invalid={errors.port_of_loading && touched?.port_of_loading}
                  errorMessage={errors.port_of_loading}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="port_of_loading"
                    placeholder="Port of loading"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-3"
                  label="Final destination"
                  invalid={
                    errors.final_destination && touched?.final_destination
                  }
                  errorMessage={errors.final_destination}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="final_destination"
                    placeholder="Final destination"
                    component={Input}
                  />
                </FormItem>
              </div>
              <StickyFooter
                className="flex items-center bg-gray-100 justify-end p-2 mt-3"
                stickyClass="border-t bg-white border-gray-200"
              >
                <div className="md:flex items-center gap-2">
                  <Button size="sm" onClick={() => onDiscard?.()} type="button">
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

ShippingDetailsForm.defaultProps = {
  type: "edit",
  initialData: {
    customer_shipping_details_id: "",
    pre_carriage_by: "",
    place_of_receipt: "",
    port_of_discharge: "",
    country_of_goods: "",
    destination: "",
    port_of_loading: "",
    final_destination: "",
  },
};

export default ShippingDetailsForm;
