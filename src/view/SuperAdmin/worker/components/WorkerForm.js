import React, { forwardRef } from "react";
import {
  FormContainer,
  Button,
  FormItem,
  Input,
  Select,
  Toast,
  Notification,
  Upload,
} from "../../../../components/ui";
import { Field, Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import { worker_status } from "./../constant";

const validationSchemaNew = Yup.object().shape({
  worker_name: Yup.string().required("Worker Name Required"),
  worker_mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  worker_address: Yup.string().required("Address Required"),
  worker_adhaar: Yup.string()
    .matches(/^\d{12}$/, "must be 12 digits")
    .required("Aadhaar number is required"),
  worker_dob: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
    .required("DOB required"),
  worker_blood_group: Yup.string(),
  worker_pan: Yup.string().optional(),
});
const validationSchemaEdit = Yup.object().shape({
  worker_name: Yup.string().required("Worker Name Required"),
  worker_mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  worker_status: Yup.boolean().required("Status Required"),
  worker_address: Yup.string().required("Address Required"),
  worker_adhaar: Yup.string()
    .matches(/^\d{12}$/, "must be 12 digits")
    .required("Aadhaar number is required"),
  worker_dob: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
    .required("DOB is required"),
  worker_blood_group: Yup.string(),
  worker_pan: Yup.string().optional(),
});

const WorkerForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard } = props;

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSetFormFile = async (form, field, file) => {
    const maxSize = Math.round(40 * 1024);
    if (file[0].type.startsWith("image/") && file[0].size <= maxSize) {
      form.setFieldValue(field.name, await convertToBase64(file[0]));
    } else {
      Toast.push(
        <Notification title="Image Error" type="danger" duration={3500}>
          Image Size Should Be Less than 40 KB, and the file must be an image.
        </Notification>
      );
    }
  };

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={{
          ...initialData,
        }}
        validationSchema={
          type === "new" ? validationSchemaNew : validationSchemaEdit
        }
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-2 gap-3">
                {type === "edit" && (
                  <FormItem
                    label="Status"
                    className="mb-2"
                    invalid={errors.worker_status && touched.worker_status}
                    errorMessage={errors.worker_status}
                  >
                    <Field name="worker_status">
                      {({ field, form }) => (
                        <Select
                          placeholder="Status"
                          field={field}
                          className="text-left"
                          form={form}
                          options={worker_status}
                          value={worker_status.filter(
                            (status) => status.value === values.worker_status
                          )}
                          onChange={(status) => {
                            form.setFieldValue(field.name, status.value);
                          }}
                        />
                      )}
                    </Field>
                  </FormItem>
                )}

                <FormItem label="HR Image">
                  <Field name="worker_image" className="mt-4">
                    {({ field, form }) => {
                      const avatarProps = field.value
                        ? { src: field.value }
                        : {};
                      return (
                        <>
                          <div className="flex gap-2">
                            {avatarProps?.src && (
                              <img src={avatarProps?.src} width="50" />
                            )}
                            <Upload
                              className="cursor-pointer"
                              onChange={(files) =>
                                onSetFormFile(form, field, files)
                              }
                              onFileRemove={(files) =>
                                onSetFormFile(form, field, files)
                              }
                              showList={false}
                              uploadLimit={1}
                            >
                              {/* <Avatar
                                className="border-2 border-white dark:border-gray-800 shadow-lg"
                                size={80}
                                icon={<BsImage />}
                                {...avatarProps}
                              /> */}
                              <Button variant="" type="button">
                                Upload
                              </Button>
                            </Upload>
                          </div>
                        </>
                      );
                    }}
                  </Field>
                </FormItem>
                <FormItem
                  className="mb-2"
                  label="Name"
                  invalid={errors.worker_name && touched.worker_name}
                  errorMessage={errors.worker_name}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="worker_name"
                    placeholder="HR Name"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-2"
                  label="Mobile"
                  invalid={errors.worker_mobile && touched.worker_mobile}
                  errorMessage={errors.worker_mobile}
                >
                  <Field
                    type="number"
                    autoComplete="off"
                    name="worker_mobile"
                    placeholder="HR Mobile"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-2"
                  label="Adhaar"
                  invalid={errors.worker_adhaar && touched.worker_adhaar}
                  errorMessage={errors.worker_adhaar}
                >
                  <Field
                    type="number"
                    autoComplete="off"
                    name="worker_adhaar"
                    placeholder="HR Adhaar"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-2"
                  label="PAN"
                  invalid={errors.worker_pan && touched.worker_pan}
                  errorMessage={errors.worker_pan}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="worker_pan"
                    placeholder="HR PAN"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-2"
                  label="DOB"
                  invalid={errors.worker_dob && touched.worker_dob}
                  errorMessage={errors.worker_dob}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="worker_dob"
                    placeholder="YYYY-MM-DD"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-2"
                  label="Blood Group"
                  invalid={
                    errors.worker_blood_group && touched.worker_blood_group
                  }
                  errorMessage={errors.worker_blood_group}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="worker_blood_group"
                    placeholder="HR Blood Group"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  className="mb-2"
                  label="Address"
                  invalid={errors.worker_address && touched.worker_address}
                  errorMessage={errors.worker_address}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="worker_address"
                    placeholder="HR Address"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div className="flex items-center gap-2 mt-3 justify-end">
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
                  {type === "new" ? "Create" : "Save"}
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
});

WorkerForm.defaultProps = {
  type: "edit",
  initialData: {
    worker_id: "",
    worker_name: "",
    worker_mobile: "",
    worker_status: true,
    worker_address: "",
    worker_adhaar: "",
    worker_pan: "",
    worker_dob: "",
    worker_image: "",
    worker_blood_group: "",
  },
};

export default WorkerForm;
