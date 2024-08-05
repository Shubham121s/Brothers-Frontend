import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import {
  Dialog,
  Notification,
  Toast,
  FormContainer,
  Button,
  FormItem,
  Input,
} from "../../../../../components/ui";
import cloneDeep from "lodash/cloneDeep";
import { toggleDetailDialog, setSelectedInvoice } from "../store/stateSlice";
import {
  getDispatchInvoiceWithPagination,
  addDetails,
} from "../store/dataSlice";
import { useNavigate } from "react-router-dom";

const DetailDialog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [details, setDetais] = useState({});

  const onDialogClose = () => {
    dispatch(setSelectedInvoice({}));
    dispatch(toggleDetailDialog(false));
  };

  const detailDialog = useSelector(
    (state) => state.dispatch_invoice.state.detailDialog
  );

  const selectedInvoice = useSelector(
    (state) => state.dispatch_invoice.state.selectedInvoice
  );

  const tableData = useSelector(
    (state) => state.dispatch_invoice.data.tableData
  );

  useEffect(() => {
    if (selectedInvoice) {
      setDetais({
        bl: selectedInvoice.bl,
        cefa: selectedInvoice.cefa,
        coo: selectedInvoice.coo,
        dispatch_invoice_id: selectedInvoice.dispatch_invoice_id,
      });
    } else {
      setDetais({
        bl: "",
        cefa: "",
        coo: "",
      });
    }
  }, [selectedInvoice]);

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(addDetails(values));
    setSubmitting(false);
    if (action.payload.status < 300) {
      Toast.push(
        <Notification title={"Success"} type="success" duration={2500}>
          {action?.payload?.data?.message}
        </Notification>,
        {
          placement: "top-end",
        }
      );
      handleDiscard();
      dispatch(getDispatchInvoiceWithPagination(tableData));
    } else {
      Toast.push(
        <Notification title={"Failed"} type="danger" duration={2500}>
          {action.payload.data?.message}
        </Notification>,
        {
          placement: "top-end",
        }
      );
    }
  };

  const handleDiscard = () => {
    dispatch(setSelectedInvoice({}));
    dispatch(toggleDetailDialog(false));
  };

  return (
    <Dialog
      isOpen={detailDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      width={800}
    >
      <h4 className="text-center mt-2 mb-3">Details</h4>
      <Formik
        initialValues={details}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values);
          handleFormSubmit(formData, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-3 gap-4 ">
                <FormItem label="BL Details">
                  <Field
                    type="text"
                    name="bl"
                    placeholder="BL Details"
                    component={Input}
                  />
                </FormItem>

                <FormItem label="CEFA Details">
                  <Field
                    type="text"
                    name="cefa"
                    placeholder="CEFA Details"
                    component={Input}
                  />
                </FormItem>
                <FormItem label="COO Details">
                  <Field
                    type="text"
                    name="coo"
                    placeholder="COO Details"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div className="flex items-center gap-2 mt-3 justify-end">
                <Button
                  size="sm"
                  className="ltr:mr-3 rtl:ml-3"
                  onClick={() => handleDiscard()}
                  type="button"
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  loading={isSubmitting}
                  type="submit"
                >
                  Add
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default DetailDialog;
