import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  FormContainer,
  Input,
  FormItem,
} from "../../../../components/ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";
import { postMachine, updateMachine, getMachine } from "../store/dataSlice";

const MachineForm = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [machineData, setMachineData] = useState(null);
  const dialog = useSelector((state) => state.machine.state.newDialog);
  const selectedMachine = useSelector(
    (state) => state.machine.state.selectedMachine
  );

  const onDialogClose = (e) => {
    dispatch(toggleNewDialog(false));
  };

  const onDialogOk = (e) => {
    console.log("onDialogOk", e);
    dispatch(toggleNewDialog(false));
  };
  const validationSchema = Yup.object().shape({
    machine_name: Yup.string().required("Machine Name is required"),
    machine_type: Yup.string().required("Machine Type is required"),
    machine_model: Yup.string().required("Machine Model is required"),
    machine_description: Yup.string().required(
      "Machine Description is required"
    ),
    company_name: Yup.string().required("Company Name is required"),
  });
  useEffect(() => {
    if (Object.keys(selectedMachine).length > 0) {
      setEdit(true);
      setMachineData({
        ...selectedMachine,
      });
    } else {
      setEdit(false);
      setMachineData({
        machine_name: "",
        machine_type: "",
        machine_model: "",
        machine_description: "",
        company_name: "",
      });
    }
  }, [selectedMachine]);
  const handleSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = edit
      ? await dispatch(updateMachine(values))
      : await dispatch(postMachine(values));
    if (action.payload.status < 300) {
      setSubmitting(false);

      dispatch(toggleNewDialog(false));
      dispatch(getMachine());
    } else {
    }
  };
  return (
    <>
      <Dialog
        isOpen={dialog}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        className="w-[80vw]"
      >
        <Formik
          enableReinitialize
          initialValues={machineData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ values, touched, errors, isSubmitting }) => {
            return (
              <Form className="w-full mt-10">
                <FormContainer className="flex justify-between ">
                  <div>
                    <FormItem
                      label="Machine Name"
                      asterisk
                      invalid={errors.machine_name && touched.machine_name}
                      errorMessage={errors.machine_name}
                    >
                      <Field
                        type="text"
                        name="machine_name"
                        placeholder="Machine Name"
                        value={values.machine_name}
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Machine Type"
                      asterisk
                      invalid={errors.machine_type && touched.machine_type}
                      errorMessage={errors.machine_type}
                    >
                      <Field
                        type="text"
                        name="machine_type"
                        placeholder="Machine Type"
                        value={values.machine_type}
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Machine Model"
                      asterisk
                      invalid={errors.machine_model && touched.machine_model}
                      errorMessage={errors.machine_model}
                    >
                      <Field
                        type="text"
                        name="machine_model"
                        placeholder="Machine Model"
                        value={values.machine_model}
                        component={Input}
                      />
                    </FormItem>
                  </div>
                  <div>
                    <FormItem
                      label="Machine Description"
                      asterisk
                      invalid={
                        errors.machine_description &&
                        touched.machine_description
                      }
                      errorMessage={errors.machine_description}
                    >
                      <Field
                        type="text"
                        name="machine_description"
                        placeholder="Machine Description"
                        value={values.machine_description}
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Company Name"
                      asterisk
                      invalid={errors.company_name && touched.company_name}
                      errorMessage={errors.company_name}
                    >
                      <Field
                        type="text"
                        name="company_name"
                        placeholder="Company Name"
                        value={values.company_name}
                        component={Input}
                      />
                    </FormItem>
                    <div className="text-right mt-6">
                      <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        type="button"
                        onClick={onDialogClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="solid"
                        type="submit"
                        loading={isSubmitting}
                      >
                        Okay
                      </Button>
                    </div>
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

export default MachineForm;
