import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
  Toast,
  Notification,
  FormItem,
  Dialog,
  FormContainer,
  Select,
  DatePicker,
} from "../../../../components/ui";
import { Field, Form, Formik } from "formik";
import { toggleAddDialog } from "../store/stateSlice";
import * as Yup from "yup";
import { getAllStock, postStock, putStock } from "../store/dataSlice";
import { getAllProductCodeOption } from "../store/dataSlice";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  vendor_id: Yup.number().required("Vendor is required"),
  category_id: Yup.number().required("Category is required"),
  product_id: Yup.number().required("Product is required"),
  stock_default_mrp: Yup.number().required("Default MRP is required"),
  stock_expiry_date: Yup.date().required("Expiry date is required"),
  stock_retailer_price: Yup.number().required("Retailer price is required"),
  stock_wholesaler_price: Yup.number().required("Wholesaler price is required"),
  stock_purchase_price: Yup.number().required("price is required"),
  stock_discount_type: Yup.string().required("Discount type is required"),
  stock_discount: Yup.number().required("Discount is required"),
});

const statusOption = [
  { label: "Active", value: true },
  { label: "In-Active", value: false },
];

const StockDialogueForm = () => {
  const dispatch = useDispatch();
  const [stock, setStock] = useState({});
  const [edit, SetEdit] = useState(null);

  const dialogOpen = useSelector((state) => state.stock.state.addDialog);
  const selectedStock = useSelector((state) => state.stock.state.selectedStock);
  const productCodes = useSelector((state) => state.stock.data.productCodes);

  const tableData = useSelector((state) => state.stock.tableData);

  useEffect(() => {
    if (Object.keys(selectedStock).length > 0) {
      setStock({
        ...selectedStock,
      });
      SetEdit(true);
    } else {
      setStock({
        product_id: "",
        stock_cost: "",
        stock_status: "",
        stock_quantity: "",
        stock_expiry_date: "",
        stock_storage_location: "",
        stock_entry_date: new Date(),
      });
      SetEdit(false);
    }
  }, [selectedStock]);

  const onDialogClose = () => {
    dispatch(toggleAddDialog(false));
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllProductCodeOption());
    };
    fetchData();
  }, [dispatch]);

  return (
    <Dialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      width={600}
    >
      <Formik
        initialValues={stock}
        enableReinitialize="true"
        // validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          let finalValues = {
            ...values,
            stock_expiry_date: dayjs(values.stock_expiry_date).format(
              "YYYY-MM-DD"
            ),
          };
          try {
            if (edit) {
              const success = await dispatch(putStock(finalValues));
              const successTitle = success?.payload?.data?.success
                ? "Successfully Edited"
                : "Not Edited";
              const successType = success?.payload?.data?.success
                ? "success"
                : "danger";
              const message = success?.payload?.data?.message;
              Toast.push(
                <Notification
                  title={successTitle}
                  type={successType}
                  duration={2500}
                >
                  {message}
                </Notification>
              );
              dispatch(getAllStock(tableData));
              dispatch(toggleAddDialog(!success.data.success));
            } else {
              const success = await dispatch(postStock(finalValues));
              const successTitle = success?.payload?.data?.success
                ? "Successfully Added"
                : "Not Added";
              const successType = success?.payload?.data?.success
                ? "success"
                : "danger";
              const message = success?.payload?.data?.message;
              Toast.push(
                <Notification
                  title={successTitle}
                  type={successType}
                  duration={2500}
                >
                  {message}
                </Notification>
              );
              dispatch(getAllStock(tableData));
              dispatch(toggleAddDialog(!success.data.success));
            }
          } catch (err) {
            const errorTitle = edit ? "Not Edited" : "Not Added";
            const errorType = "danger";
            const errorMessage = err?.response?.data?.message;

            Toast.push(
              <Notification title={errorTitle} type={errorType} duration={2500}>
                {errorMessage}
              </Notification>
            );

            dispatch(toggleAddDialog(true));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, values, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
                <div className="flex items-center justify-center">
                  {edit ? (
                    <h5 className="mb-4 ml-3">Edit Stock</h5>
                  ) : (
                    <h5 className="mb-4 ml-3">New Stock</h5>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 gap-y-0 ml-2 mr-2">
                  {edit && (
                    <FormItem
                      label="Status"
                      className="mb-2"
                      // invalid={errors.worker_status && touched.worker_status}
                      // errorMessage={errors.worker_status}
                    >
                      <Field name="stock_status">
                        {({ field, form }) => (
                          <Select
                            placeholder="Status"
                            field={field}
                            className="text-left"
                            form={form}
                            options={statusOption}
                            value={statusOption.filter(
                              (status) => status.value === values.stock_status
                            )}
                            onChange={(status) => {
                              form.setFieldValue(field.name, status.value);
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>
                  )}
                  <FormItem
                    label="Product Code"
                    // invalid={errors.vendor_id && touched.vendor_id}
                    // errorMessage={errors.vendor_id}
                  >
                    <Field name="product_id">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          form={form}
                          options={productCodes}
                          value={productCodes?.filter(
                            (option) => option.value === values.product_id
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>

                  <FormItem
                    label="Cost"
                    // invalid={
                    //   errors.stock_default_mrp && touched.stock_default_mrp
                    // }
                    // errorMessage={errors.stock_default_mrp}
                  >
                    <Field
                      type="number"
                      name="stock_cost"
                      placeholder="Cost"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Quantity"
                    // invalid={
                    //   errors.stock_default_mrp && touched.stock_default_mrp
                    // }
                    // errorMessage={errors.stock_default_mrp}
                  >
                    <Field
                      type="number"
                      name="stock_quantity"
                      placeholder="Quantity"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Expiry date"
                    invalid={
                      errors.stock_expiry_date && touched.stock_expiry_date
                    }
                    errorMessage={errors.stock_expiry_date}
                  >
                    <Field
                      type="text"
                      name="stock_expiry_date"
                      placeholder="YYYY-MM-DD"
                      value={
                        edit
                          ? dayjs(values.stock_expiry_date).format("YYYY-MM-DD")
                          : values.stock_expiry_date
                      }
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Storage Location"
                    // invalid={
                    //   errors.stock_default_mrp && touched.stock_default_mrp
                    // }
                    // errorMessage={errors.stock_default_mrp}
                  >
                    <Field
                      type="text"
                      name="stock_storage_location"
                      placeholder="Storage Location"
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    className="mb-4"
                    label="Stock Entry Date"
                    // invalid={errors && touched}
                    // errorMessage={errors}
                  >
                    <Field name="stock_entry_date">
                      {({ field, form }) => (
                        <DatePicker
                          placeholder="Stock Entry Date"
                          field={field}
                          form={form}
                          value={field.value}
                          onChange={(date) => {
                            form.setFieldValue(field.name, date);
                          }}
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>

                <div className="justify-end flex gap-2">
                  <Button
                    type="button"
                    variant=""
                    size="sm"
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={onDialogClose}
                  >
                    Discard
                  </Button>
                  <Button
                    variant="solid"
                    loading={isSubmitting}
                    size="sm"
                    className="ml-1"
                    type="submit"
                  >
                    {isSubmitting ? "Please wait" : edit ? "Update" : "Create"}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default StockDialogueForm;
