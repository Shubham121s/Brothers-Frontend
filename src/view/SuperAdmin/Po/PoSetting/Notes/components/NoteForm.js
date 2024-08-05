import React, { forwardRef } from "react";
import {
  FormContainer,
  Button,
  FormItem,
  Input,
  Select,
} from "../../../../../../components/ui";
import { Field, Form, Formik, FieldArray } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";

const categoryStatus = [
  { label: "Active", value: true },
  { label: "In-Active", value: false },
];

const validationSchema = Yup.object().shape({
  status: Yup.boolean().required("Status Required"),
  name: Yup.string().required("Name Required"),
});

const NoteForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard } = props;

  return (
    <>
      <div style={{ overflowY: "auto", maxHeight: "500px" }}>
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
                <div className="">
                  <h4>
                    {type === "edit" ? "Update" : "Add"} Notes Information
                  </h4>
                  <p className="mb-6">
                    Section to config basic Notes information
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <FormItem
                      label="Note Name"
                      invalid={errors.name && touched.name}
                      errorMessage={errors.name}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="name"
                        placeholder="Name"
                        component={Input}
                      />
                    </FormItem>
                  </div>
                  <FieldArray name="notes">
                    {({ push, remove }) => (
                      <>
                        {values.notes.length > 0
                          ? values.notes.map((note, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                              >
                                <FormItem label={`Note Label ${index + 1}`}>
                                  <Field
                                    type="text"
                                    autoComplete="off"
                                    name={`notes[${index}].label`}
                                    placeholder="Label"
                                    component={Input}
                                  />
                                </FormItem>

                                <FormItem label={`Note Value ${index + 1}`}>
                                  <Field
                                    type="text"
                                    autoComplete="off"
                                    name={`notes[${index}].value`}
                                    placeholder="Value"
                                    component={Input}
                                  />
                                </FormItem>

                                <Button
                                  type="button"
                                  className="mt-6 bg-red-500"
                                  onClick={() => remove(index)}
                                >
                                  -
                                </Button>
                              </div>
                            ))
                          : null}
                        <div className="flex justify-end items-center">
                          <Button
                            type="button"
                            className="mb-3"
                            onClick={() => push({ label: "", value: "" })}
                          >
                            Add Note
                          </Button>
                        </div>
                      </>
                    )}
                  </FieldArray>
                </div>

                <div className="flex gap-4 justify-end">
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
      </div>
    </>
  );
});

NoteForm.defaultProps = {
  type: "edit",
  initialData: {
    name: "",
    notes: [{ label: "", value: "" }],
  },
};

export default NoteForm;
