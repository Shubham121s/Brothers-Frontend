import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  FormContainer,
  Input,
  FormItem,
  DatePicker,
  Toast,
  Notification,
} from "../../../../components/ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";
import { postAnnual, updateAnnual } from "../store/dataSlice";

const AnnualForm = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [annualData, setAnnualData] = useState(null);
  const dialog = useSelector((state) => state.annual.state.newDialog);
  const selectedAnnual = useSelector(
    (state) => state.annual.state.selectedAnnual
  );

  const onDialogClose = (e) => {
    dispatch(toggleNewDialog(false));
  };

  const onDialogOk = (e) => {
    console.log("onDialogOk", e);
    dispatch(toggleNewDialog(false));
  };
  const validationSchema = Yup.object().shape({
    calibration_description: Yup.string().required("Required"),
    calibration_code_no: Yup.string().required("Required"),
    calibration_serial_no: Yup.string().required("Required"),
    calibration_maker: Yup.string().required("Required"),
    calibration_range: Yup.string().required("Required"),
    calibration_frequency: Yup.string().required("Required"),
    calibration_date: Yup.string().required("Required"),
    calibration_agency: Yup.string().required("Required"),
    calibration_result: Yup.string().required("Required"),
    calibration_report_no: Yup.string().required("Required"),
    next_due_date: Yup.string().required("Required"),
    // Calibration_Date_02: Yup.string().required('Required'),
    // Calibration_Agency: Yup.string().required('Required'),
    // Cal_Result: Yup.string().required('Required'),
    // Cal_Report_No: Yup.string().required('Required'),
    // Next_Due_Date: Yup.string().required('Required'),
    // Calibration_Date_03: Yup.string().required('Required'),
    // Calibration_Agency: Yup.string().required('Required'),
    // Cal_Result: Yup.string().required('Required'),
    // Cal_Report_No: Yup.string().required('Required'),
    // Next_Due_Date: Yup.string().required('Required'),
  });

  useEffect(() => {
    if (selectedAnnual) {
      setEdit(true);
      // setValues(selectedAnnual)
      console.log("hi");
      setAnnualData({
        ...selectedAnnual,
        calibration_date: new Date(selectedAnnual.calibration_date),
        next_due_date: new Date(selectedAnnual.next_due_date),
      });
    } else {
      setEdit(false);
      setAnnualData({
        calibration_description: "",
        calibration_code_no: "",
        calibration_serial_no: "",
        calibration_maker: "",
        calibration_range: "",
        calibration_frequency: "",
        calibration_date: "",
        calibration_agency: "",
        calibration_result: "",
        calibration_report_no: "",
        next_due_date: "",
      });
    }
  }, [selectedAnnual]);
  const handleSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = edit
      ? await dispatch(updateAnnual(values))
      : await dispatch(postAnnual(values));
    console.log(action.payload.status);
    if (action.payload.status < 300) {
      setSubmitting(false);

      dispatch(toggleNewDialog(false));
    } else {
    }
  };
  return (
    <>
      <Dialog
        className="w-[60%]"
        isOpen={dialog}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        width={750}
      >
        <Formik
          enableReinitialize={true}
          initialValues={annualData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ values, touched, errors, isSubmitting }) => {
            return (
              <Form className=" ">
                <h4 className=" mb-4 text-center">Add data</h4>
                <FormContainer>
                  <div className="grid grid-cols-3 gap-4">
                    <FormItem
                      label="Description"
                      invalid={
                        errors.calibration_description &&
                        touched.calibration_description
                      }
                      errorMessage={errors.calibration_description}
                      className="mb-3"
                    >
                      <Field
                        size="sm"
                        type="text"
                        name="calibration_description"
                        values={values.calibration_description}
                        placeholder="Description"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Code No."
                      invalid={
                        errors.calibration_code_no &&
                        touched.calibration_code_no
                      }
                      errorMessage={errors.calibration_code_no}
                      className="mb-3"
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="calibration_code_no"
                        values={values.calibration_code_no}
                        placeholder="Code No"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Serial No."
                      invalid={
                        errors.calibration_serial_no &&
                        touched.calibration_serial_no
                      }
                      errorMessage={errors.calibration_serial_no}
                      className="mb-3"
                    >
                      <Field
                        type="text"
                        size="sm"
                        values={values.calibration_serial_no}
                        name="calibration_serial_no"
                        placeholder="Serial No"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Maker"
                      className="mb-3"
                      invalid={
                        errors.calibration_maker && touched.calibration_maker
                      }
                      errorMessage={errors.calibration_maker}
                    >
                      <Field
                        size="sm"
                        type="text"
                        name="calibration_maker"
                        values={values.calibration_maker}
                        placeholder="Maker"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label="Range"
                      className="mb-3"
                      invalid={
                        errors.calibration_range && touched.calibration_range
                      }
                      errorMessage={errors.calibration_range}
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="calibration_range"
                        values={values.calibration_range}
                        placeholder="Range"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      className="mb-3"
                      label="Frequancy"
                      invalid={
                        errors.calibration_frequency &&
                        touched.calibration_frequency
                      }
                      errorMessage={errors.calibration_frequency}
                    >
                      <Field
                        type="number"
                        size="sm"
                        name="calibration_frequency"
                        values={values.calibration_frequency}
                        placeholder="Calibration Frequency"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      className="mb-3"
                      label="Calibration Date 01"
                      invalid={
                        errors.calibration_date && touched.calibration_date
                      }
                      error={errors.calibration_date}
                    >
                      <Field
                        name="calibration_date"
                        placeholder="Calibration Date 01"
                      >
                        {({ field, form }) => (
                          <DatePicker
                            size="sm"
                            field={field}
                            form={form}
                            value={values.calibration_date}
                            onChange={(date) => {
                              form.setFieldValue(field.name, date);
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem
                      className="mb-3"
                      label="Agency"
                      invalid={
                        errors.calibration_agency && touched.calibration_agency
                      }
                      errorMessage={errors.calibration_agency}
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="calibration_agency"
                        values={values.calibration_agency}
                        placeholder="Calibration Agency"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label="Result"
                      className="mb-3"
                      invalid={
                        errors.calibration_result && touched.calibration_result
                      }
                      errorMessage={errors.calibration_result}
                    >
                      <Field
                        type="text"
                        name="calibration_result"
                        values={values.calibration_result}
                        placeholder="Cal Result"
                        size="sm"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label="Report No."
                      className="mb-3"
                      invalid={
                        errors.calibration_report_no &&
                        touched.calibration_report_no
                      }
                      errorMessage={errors.calibration_report_no}
                    >
                      <Field
                        type="text"
                        size="sm"
                        name="calibration_report_no"
                        values={values.calibration_report_no}
                        placeholder="Cal Report No"
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label="Next Due Date"
                      className="mb-3"
                      invalid={errors.next_due_date && touched.next_due_date}
                      errorMessage={errors.next_due_date}
                    >
                      <Field name="next_due_date" placeholder="Next_Due_Date">
                        {({ field, form }) => (
                          <DatePicker
                            field={field}
                            size="sm"
                            form={form}
                            value={values.next_due_date}
                            onChange={(date) => {
                              form.setFieldValue(field.name, date);
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>
                    {/* <FormItem
                                    label="Calibration Date 02"
                                    asterisk
                                        invalid={
                                            errors.Calibration_Date_02 &&
                                            touched.Calibration_Date_02
                                        }
                                        error={errors.Calibration_Date_02}
                                    >
                                        <Field
                                            name="Calibration_Date_02"
                                            placeholder="Calibration Date 02"
                                        >
                                            {({ field, form }) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={
                                                        values.Calibration_Date_02
                                                    }
                                                    onChange={(date) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            date
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        invalid={errors.Calibration_Agency && touched.Calibration_Agency}
                                        errorMessage={errors.Calibration_Agency}
                                    >
                                        <Field
                                            type="text"
                                            name="Calibration_Agency"
                                            values={values.Calibration_Agency}
                                            placeholder="Calibration Agency"
                                            component={Input}
                                        />
                                    </FormItem>
                                   
                                    <FormItem
                                        invalid={errors.Cal_Result && touched.Cal_Result}
                                        errorMessage={errors.Cal_Result}
                                    >
                                        <Field
                                            type="text"
                                            name="Cal_Result"
                                            values={values.Cal_Result}
                                            placeholder="Cal Result"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        invalid={errors.Cal_Report_No && touched.Cal_Report_No}
                                        errorMessage={errors.Cal_Report_No}
                                    >
                                        <Field
                                            type="text"
                                            name="Cal_Report_No"
                                            values={values.Cal_Report_No}
                                            placeholder="Cal Report No"
                                            component={Input}
                                        />
                                    </FormItem>
                                    </div>
                                    <div className=''>
                                    <FormItem
                                    label="Next Due Date"
                                    asterisk
                                        invalid={
                                            errors.Next_Due_Date &&
                                            touched.Next_Due_Date
                                        }
                                        errorMessage={errors.Next_Due_Date}
                                    >
                                        <Field
                                            name="Next_Due_Date"
                                            placeholder="Next_Due_Date"
                                        >
                                            {({ field, form }) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={
                                                        values.Next_Due_Date
                                                    }
                                                    onChange={(date) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            date
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                    label="Calibration Date 03"
                                    asterisk
                                        invalid={
                                            errors.Calibration_Date_03 &&
                                            touched.Calibration_Date_03
                                        }
                                        error={errors.Calibration_Date_03}
                                    >
                                        <Field
                                            name="Calibration_Date_03"
                                            placeholder="Calibration Date 03"
                                        >
                                            {({ field, form }) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={
                                                        values.Calibration_Date_03
                                                    }
                                                    onChange={(date) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            date
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        invalid={errors.Calibration_Agency && touched.Calibration_Agency}
                                        errorMessage={errors.Calibration_Agency}
                                    >
                                        <Field
                                            type="text"
                                            name="Calibration_Agency"
                                            values={values.Calibration_Agency}
                                            placeholder="Calibration Agency"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        invalid={errors.Cal_Result && touched.Cal_Result}
                                        errorMessage={errors.Cal_Result}
                                    >
                                        <Field
                                            type="text"
                                            name="Cal_Result"
                                            values={values.Cal_Result}
                                            placeholder="Cal Result"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        invalid={errors.Cal_Report_No && touched.Cal_Report_No}
                                        errorMessage={errors.Cal_Report_No}
                                    >
                                        <Field
                                            type="text"
                                            name="Cal_Report_No"
                                            values={values.Cal_Report_No}
                                            placeholder="Cal Report No"
                                            component={Input}
                                        />
                                    </FormItem>
                                    
                                    <FormItem
                                    label="Next Due Date"
                                    asterisk
                                        invalid={
                                            errors.Next_Due_Date &&
                                            touched.Next_Due_Date
                                        }
                                        errorMessage={errors.Next_Due_Date}
                                    >
                                        <Field
                                            name="Next_Due_Date"
                                            placeholder="Next_Due_Date"
                                        >
                                            {({ field, form }) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={
                                                        values.Next_Due_Date
                                                    }
                                                    onChange={(date) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            date
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem> */}
                  </div>
                  <div className="flex justify-end gap-4 items-center">
                    <Button
                      type="button"
                      className="ltr:mr-2 rtl:ml-2"
                      variant=""
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
                      Okay
                    </Button>
                  </div>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
};

export default AnnualForm;
