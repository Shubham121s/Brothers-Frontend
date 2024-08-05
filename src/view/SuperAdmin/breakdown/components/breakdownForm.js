import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  FormContainer,
  Input,
  FormItem,
  DatePicker,
} from "../../../../components/ui";
import TimeInput from "../../../../components/ui/TimeInput";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";
import { postBreakdown, updateBreakdown } from "../store/dataSlice";

const BreakdownForm = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [breakdownData, setBreakdownData] = useState(null);
  const dialog = useSelector((state) => state.breakdown.state.newDialog);
  const selectedBreakdown = useSelector(
    (state) => state.breakdown.state.selectedBreakdown
  );

  const onDialogClose = () => {
    dispatch(toggleNewDialog(false));
  };

  const validationSchema = Yup.object().shape({
    breakdown_date: Yup.string().required("Required"),
    breakdown_time: Yup.string().required("Required"),
    machine_no: Yup.string().required("Required"),
    machine_problem: Yup.string().required("Required"),
    action_taken: Yup.string().required("Required"),
    maintenance: Yup.string().required("Required"),
    cost: Yup.string().required("Required"),
    responsible_person: Yup.string().required("Required"),
    spare_consumed: Yup.string().required("Required"),
    spare_cost: Yup.string().required("Required"),
    complete_date: Yup.string().required("Required"),
    complete_time: Yup.string().required("Required"),
    total_downtime: Yup.string().required("Required"),
    remarks: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (selectedBreakdown) {
      setEdit(true);
      setBreakdownData({
        ...selectedBreakdown,
        breakdown_date: new Date(selectedBreakdown.breakdown_date),
        complete_date: new Date(selectedBreakdown.complete_date),
      });
    } else {
      setEdit(false);
      setBreakdownData({
        breakdown_date: "",
        breakdown_time: "",
        machine_no: "",
        machine_problem: "",
        action_taken: "",
        maintenance: "",
        cost: "",
        responsible_person: "",
        spare_consumed: "",
        spare_cost: "",
        complete_date: "",
        complete_time: "",
        total_downtime: "",
        remarks: "",
      });
    }
  }, [selectedBreakdown]);

  console.log(breakdownData);
  const handleSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = edit
      ? await dispatch(updateBreakdown(values))
      : await dispatch(postBreakdown(values));
    if (action.payload.status < 200) {
      setSubmitting(false);
      dispatch(toggleNewDialog(false));
    } else {
      // Handle error case if necessary
    }
  };

  return (
    <>
      <Dialog
        isOpen={dialog}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        width={1000}
      >
        <Formik
          enableReinitialize
          initialValues={breakdownData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <>
              <h4 className="text-center mb-4">Add Machine Breakdown</h4>
              <Form>
                <FormContainer>
                  <div className="grid grid-cols-3 gap-4">
                    <FormItem
                      label="Date"
                      invalid={errors.breakdown_date && touched.breakdown_date}
                      errorMessage={errors.breakdown_date}
                      className="mb-3"
                    >
                      <Field name="breakdown_date" placeholder="Date">
                        {({ field, form }) => (
                          <DatePicker
                            size="sm"
                            field={field}
                            form={form}
                            value={values.breakdown_date}
                            onChange={(date) => {
                              form.setFieldValue(field.name, date);
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>
                    <FormItem
                      label="Breakdown Time"
                      className="mb-3"
                      invalid={errors.spare_consumed && touched.spare_consumed}
                      errorMessage={errors.spare_consumed}
                    >
                      <Field
                        type="number"
                        size="sm"
                        name="breakdown_time"
                        placeholder="Breakdown time"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Machine_no"
                      size="sm"
                      className="mb-3"
                      invalid={errors.machine_no && touched.machine_no}
                      errorMessage={errors.machine_no}
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="machine_no"
                        values={values.machine_no}
                        placeholder="Machine_no"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Machine_problem"
                      invalid={
                        errors.machine_problem && touched.machine_problem
                      }
                      errorMessage={errors.machine_problem}
                      className="mb-3"
                    >
                      <Field
                        type="text"
                        size="sm"
                        values={values.machine_problem}
                        name="machine_problem"
                        placeholder="Machine_problem"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-3"
                      label="Action Taken"
                      invalid={errors.action_taken && touched.action_taken}
                      errorMessage={errors.action_taken}
                    >
                      <Field
                        size="sm"
                        type="text"
                        name="action_taken"
                        values={values.action_taken}
                        placeholder="Action Taken"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      className="mb-3"
                      label="Maintenance"
                      invalid={errors.maintenance && touched.maintenance}
                      errorMessage={errors.maintenance}
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="maintenance"
                        values={values.maintenance}
                        placeholder="Maintenance person & firm"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Cost"
                      className="mb-3"
                      invalid={errors.cost && touched.cost}
                      errorMessage={errors.cost}
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="cost"
                        values={values.cost}
                        placeholder="Cost"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-3"
                      label="Responsible Person"
                      invalid={
                        errors.responsible_person && touched.responsible_person
                      }
                      errorMessage={errors.responsible_person}
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="responsible_person"
                        values={values.responsible_person}
                        placeholder="Responsible person(vpi)"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      className="mb-3"
                      label="Spare Consumed"
                      invalid={errors.spare_consumed && touched.spare_consumed}
                      errorMessage={errors.spare_consumed}
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="spare_consumed"
                        values={values.spare_consumed}
                        placeholder="Spare Consumed"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      className="mb-3"
                      label="Spare Cost"
                      invalid={errors.spare_cost && touched.spare_cost}
                      errorMessage={errors.spare_cost}
                    >
                      <Field
                        type="text"
                        name="spare_cost"
                        size="sm"
                        values={values.spare_cost}
                        placeholder="Spare cost"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label="Complete Date"
                      className="mb-3"
                      invalid={errors.complete_date && touched.complete_date}
                      errorMessage={errors.complete_date}
                    >
                      <Field name="complete_date" placeholder="Complete date">
                        {({ field, form }) => (
                          <DatePicker
                            size="sm"
                            field={field}
                            form={form}
                            value={values.complete_date}
                            onChange={(date) => {
                              form.setFieldValue(field.name, date);
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem
                      label="Complete Time"
                      className="mb-3"
                      invalid={errors.spare_consumed && touched.spare_consumed}
                      errorMessage={errors.spare_consumed}
                    >
                      <Field
                        type="number"
                        size="sm"
                        name="complete_time"
                        placeholder="complete time"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label="Total Downtime"
                      className="mb-3"
                      invalid={errors.spare_consumed && touched.spare_consumed}
                      errorMessage={errors.spare_consumed}
                    >
                      <Field
                        type="number"
                        size="sm"
                        name="total_downtime"
                        placeholder="Total Downtime"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label="Remarks"
                      className="mb-3"
                      invalid={errors.remarks && touched.remarks}
                      errorMessage={errors.remarks}
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="remarks"
                        values={values.remarks}
                        placeholder="Remark"
                        component={Input}
                      />
                    </FormItem>
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <Button
                      className="ltr:mr-2 rtl:ml-2"
                      variant=""
                      type="button"
                      size="sm"
                      onClick={onDialogClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      type="submit"
                      size="sm"
                      loading={isSubmitting}
                    >
                      {edit ? "Update" : "Submit"}
                    </Button>
                  </div>

                  {/* Add similar FormItems with specific margins and paddings for other fields */}
                </FormContainer>
              </Form>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default BreakdownForm;
