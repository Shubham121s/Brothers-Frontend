import React, { forwardRef } from "react";
import {
  FormContainer,
  Button,
  Card,
  Upload,
  FormItem,
} from "../../../../../components/ui";
import { StickyFooter } from "../../../../../components/shared";
import { Field, Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import DrawingFields from "./DrawingFields";

const validationSchema = Yup.object().shape({
  raw_weight: Yup.number().required("Required"),
  revision_number: Yup.string().required("Required"),
  scrap_weight: Yup.number(),
  finish_weight: Yup.number()
    .test((weight, ctx) => {
      if (weight === 0) {
        return false;
      }
      if (weight > ctx.parent.raw_weight) {
        ctx.parent.scrap_weight = 0;
        return ctx.createError({
          message: `Greater than Raw Weight ${ctx.parent.raw_weight} ${
            ctx.parent.product_um ? ctx.parent.product_um : ""
          }`,
        });
      }
      return true;
    })
    .required("Required"),
  
});

const DrawingForm = forwardRef((props, ref) => {
  const { data, initialData, onFormSubmit, onDiscard,type } = props;

  const onSetFormFile = (form, field, file) => {
    console.log(file);
    form.setFieldValue(field.name, file[0]);
  };

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={{
          ...initialData,
          ...data,
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
              <div className="max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 gap-2 p-2">
                  <DrawingFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                  <FormItem
                    className="mb-4"
                    label="Process Sheet"
                    
                  >
                    <Field name="process_attachment">
                      {({ field, form }) => (
                        <Upload
                          draggable
                          showList={true}
                          className="cursor-pointer h-[100px]"
                          onChange={(files) =>
                            onSetFormFile(form, field, files)
                          }
                          onFileRemove={(files) =>
                            onSetFormFile(form, field, files)
                          }
                          uploadLimit={1}
                        >
                          <div className="text-center">
                            <p className="font-semibold">
                              <span className="text-gray-800 dark:text-white">
                                Drop your pdf here, or{" "}
                              </span>
                              <span className="text-blue-500">browse</span>
                            </p>
                            <p className="mt-1 opacity-60 dark:text-white">
                              Support: pdf
                            </p>
                          </div>
                        </Upload>
                      )}
                    </Field>
                  </FormItem>

                  <FormItem
                    className="mb-4"
                    label="Raw Attachment"
                    
                  >
                    <Field name="raw_attachment">
                      {({ field, form }) => (
                        <Upload
                          draggable
                          showList={true}
                          className="cursor-pointer"
                          onChange={(files) =>
                            onSetFormFile(form, field, files)
                          }
                          onFileRemove={(files) =>
                            onSetFormFile(form, field, files)
                          }
                          uploadLimit={1}
                        >
                          <div className="text-center">
                            <p className="font-semibold">
                              <span className="text-gray-800 dark:text-white">
                                Drop your pdf here, or{" "}
                              </span>
                              <span className="text-blue-500">browse</span>
                            </p>
                            <p className="mt-1 opacity-60 dark:text-white">
                              Support: pdf
                            </p>
                          </div>
                        </Upload>
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    label="Finish Attachment"
                   
                  >
                    <Field name="finish_attachment">
                      {({ field, form }) => (
                        <Upload
                          draggable
                          showList={true}
                          className="cursor-pointer"
                          onChange={(files) =>
                            onSetFormFile(form, field, files)
                          }
                          onFileRemove={(files) =>
                            onSetFormFile(form, field, files)
                          }
                          uploadLimit={1}
                        >
                          <div className="text-center">
                            <p className="font-semibold">
                              <span className="text-gray-800 dark:text-white">
                                Drop your pdf here, or{" "}
                              </span>
                              <span className="text-blue-500">browse</span>
                            </p>
                            <p className="mt-1 opacity-60 dark:text-white">
                              Support: pdf
                            </p>
                          </div>
                        </Upload>
                      )}
                    </Field>
                  </FormItem>
                </div>
              </div>
              <StickyFooter
                className="flex bg-white items-center justify-end pt-2"
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
                    icon={<AiOutlineSave />}
                    type="submit"
                  >
                    {type==="new" ? "Add" : "Update"}
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

DrawingForm.defaultProps = {
  initialData: {
    Product: {
      drawing_number: "",
    },
    product_id: "",
    raw_weight: "",
    drawing_number: "",
    finish_weight: "",
    drawing_revision_number: "",
    raw_attachment: "",
    finish_attachment: "",
    process_attachment: "",
  },
};

export default DrawingForm;
