import React, { forwardRef, useEffect } from "react";
import {
  FormContainer,
  Button,
  FormItem,
  Input,
  Select,
  DatePicker,
} from "../../../../../components/ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/dataSlice";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";

const validationSchema = Yup.object().shape({
  task: Yup.string().required("Task Required"),
  priority: Yup.string().required("Choose Priority"),
  description: Yup.string().required("Description Required"),
  assigned_to: Yup.string().required("Choose a User"),
  date: Yup.string().required("Date Required"),
});

const priorityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const TaskFormDialog = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard } = props;
  console.log("initialData", initialData);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.taskForm.data.userList);

  //   const userID = useSelector((state) => state.auth.user.user_id);

  console.log("userList", userList);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUser());
    };
    fetchData();
  }, []);

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
                <h4 className="mb-4">
                  {type === "edit" ? "Edit Task" : "Add Task"}{" "}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem
                    label="Task"
                    invalid={errors.task && touched.task}
                    errorMessage={errors.task}
                    className="mb-2 col-span-2 md:col-span-2"
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="task"
                      placeholder="Task"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    label="Description"
                    invalid={errors.description && touched.description}
                    errorMessage={errors.description}
                    className="mb-2 col-span-2 md:col-span-2"
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="description"
                      placeholder="Description"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Priority"
                    invalid={errors.priority && touched.priority}
                    errorMessage={errors.priority}
                    className="mb-2"
                  >
                    <Field name="priority">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          form={form}
                          options={priorityOptions}
                          value={priorityOptions.filter(
                            (priority) => priority.value === values.priority
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    label="Assigned To"
                    invalid={errors.assigned_to && touched.assigned_to}
                    errorMessage={errors.assigned_to}
                    className="mb-2"
                  >
                    <Field name="assigned_to">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          form={form}
                          options={userList}
                          value={userList?.filter(
                            (user) => user.value === values.assigned_to
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>

                  <FormItem
                    label="Date"
                    invalid={errors.date && touched.date}
                    errorMessage={errors.date}
                    className="mb-2"
                  >
                    <Field name="date" className="mb-2">
                      {({ field, form }) => (
                        <DatePicker
                          field={field}
                          size="md"
                          placeholder="Date"
                          form={form}
                          value={values.date}
                          onChange={(date) => {
                            form.setFieldValue(field.name, date);
                          }}
                        />
                      )}
                    </Field>
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

TaskFormDialog.defaultProps = {
  type: "edit",
  initialData: {
    task: "",
    description: "",
    priority: "",
    assigned_to: "",
    date: "",
  },
};
export default TaskFormDialog;
