import { Suspense, useEffect, useMemo, useState } from "react";
import { Loading, StickyFooter } from "../../../components/shared";
import { Form, Formik } from "formik";
import { Button, Card } from "antd";
import { FormContainer, Input } from "../../../components/ui";
import CustomerInformation from "./components/CustomerInformation";
import ProductInformation from "./components/ProductInformation";
import { useDispatch, useSelector } from "react-redux";
import qualityReducer from "./store";
import { injectReducer } from "../../../store";
import * as Yup from "yup";
import { getAllCustomers } from "./store/dataSlice";
import QualityItemDialog from "./components/QualityItemDialog";
import ItemTable from "./components/ItemTable";

injectReducer("quality", qualityReducer);

const validationSchema = Yup.object().shape({
  CustomerDetails: Yup.object().required("Required"),
  ProductDetails: Yup.object().required("Required"),
});

const QualityControl = () => {
  const dispatch = useDispatch();
  const [qualityDialogOpen, setQualityDialogOpen] = useState(false);
  const [qualityItems, setQualityItems] = useState([]);

  console.log("qualityItems", qualityItems);

  const customers = useSelector((state) => state.quality.data?.customersList);
  const products = useSelector((state) => state.quality.data?.productsList);
  const qualityData = useSelector((state) => state.quality.data?.qualityLists);

  const dummyData = [
    {
      product_id: "d59a0d7f-0577-4a89-b5cf-f306c8c6bca1",
      customer_id: "e5e50d3a-01a2-408d-b7b7-20d33e22d017",
      material_grade_id: "e2e6901f-df8e-4799-9238-bab23be5f1ea",
      po_list_id: "17cb3a72-fc88-4c8f-849e-6f6c37b02b29",
      serial_number: 11,
      quantity: 1,
      delivery_date: "2025-07-15",
      accept_delivery_date: "2025-06-10",
      list_status: "accepted",
      project_no: "679119",
      product_name: "BEARING COVER;MACH;3VG",
      drawing_number: "3-204502283-001",
      revision_number: "g",
      material_grade: "GC300",
      item_code: "204502283002",
      number: "4502307091",
      status: "processing",
      DATE: "2025-04-12",
      poa: "25041802",
      customer_name: "SULZER PUMPS INDIA PVT LTD",
      material_tc_verify: null,
      internal_inspection: null,
      ndt_requirement: null,
      final_inspection: null,
      heat_treatment: null,
      other: null,
      item_quantity: 0,
      material_tc_verify_check: 1,
      internal_inspection_check: 1,
      ndt_requirement_check: 0,
      final_inspection_check: 1,
      heat_treatment_check: 0,
      other_check: 0,
      pending_quantity: 1,
      invoice_date: null,
      invoice_no: null,
      raw_lead_time: 2,
      raw_lead_time_type: "weeks",
      machine_lead_time: 2,
      machine_lead_time_type: "weeks",
      quality_lead_time: 2,
      quality_lead_time_type: "weeks",
      standard_lead_time: 6,
      standard_lead_time_type: "weeks",
      actual_raw_date: null,
      actual_quality_date: null,
      actual_machine_date: null,
    },
    {
      product_id: "d60a8d0c-1c75-426b-b6fc-07953bb92c2b",
      customer_id: "f9b3a107-4f6e-41c1-b4a9-d6b9d6491d4c",
      material_grade_id: "1c869990-d13b-4296-8614-d85f2e0c00f3",
      po_list_id: "299b7f61-8490-4c5d-961b-356fa2f963fc",
      serial_number: 12,
      quantity: 2,
      delivery_date: "2025-08-20",
      accept_delivery_date: "2025-07-18",
      list_status: "pending",
      project_no: "679120",
      product_name: "BEARING COVER;MACH;3VG",
      drawing_number: "3-204502283-002",
      revision_number: "h",
      material_grade: "GC350",
      item_code: "204502283003",
      number: "4502307091",
      status: "processing",
      DATE: "2025-04-13",
      poa: "25041803",
      customer_name: "SULZER PUMPS INDIA PVT LTD",
      material_tc_verify: null,
      internal_inspection: null,
      ndt_requirement: null,
      final_inspection: null,
      heat_treatment: null,
      other: null,
      item_quantity: 0,
      material_tc_verify_check: 1,
      internal_inspection_check: 1,
      ndt_requirement_check: 0,
      final_inspection_check: 1,
      heat_treatment_check: 0,
      other_check: 0,
      pending_quantity: 2,
      invoice_date: null,
      invoice_no: null,
      raw_lead_time: 2,
      raw_lead_time_type: "weeks",
      machine_lead_time: 2,
      machine_lead_time_type: "weeks",
      quality_lead_time: 2,
      quality_lead_time_type: "weeks",
      standard_lead_time: 6,
      standard_lead_time_type: "weeks",
      actual_raw_date: null,
      actual_quality_date: null,
      actual_machine_date: null,
    },
  ];

  useEffect(() => {
    dispatch(getAllCustomers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddItem = (newItem) => {
    const exists = qualityItems.some(
      (item) =>
        item.Po?.number === newItem.po_number &&
        item.PoList?.serial_number === newItem.po_serial_number
    );

    if (exists) return;

    const mappedItem = {
      Po: { number: newItem.po_number },
      PoList: {
        serial_number: newItem.po_serial_number,
        quantity: newItem.quantity,
      },
      project_no: newItem.project_number,
      drawing_number: newItem.drawing_number,
    };

    setQualityItems((prev) => [...prev, mappedItem]);
  };

  // const handleAddItem = (newItem) => {
  //   console.log("New Item:", newItem);
  //   setQualityItems((prevItems) => {
  //     const exists = prevItems.some(
  //       (item) =>
  //         item.po_number === newItem.po_number &&
  //         item.po_serial_number === newItem.po_serial_number
  //     );

  //     if (exists) return prevItems; // Skip if duplicate
  //     return [...prevItems, newItem];
  //   });
  // };

  // const mappedData = useMemo(() => {
  //   return qualityItems.map((item) => ({
  //     Po: { number: item.po_number },
  //     PoList: {
  //       serial_number: item.po_serial_number,
  //       quantity: item.quantity,
  //     },
  //     project_no: item.project_number,
  //     drawing_number: item.drawing_number,
  //   }));
  // }, [qualityItems]);

  return (
    <>
      <Suspense fallback={<Loading loading={true} />}>
        <Formik
          initialValues={{
            CustomerDetails: null,
            ProductDetails: null,

            // Add other initial values if needed
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Handle form submission
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ values, touched, errors, setFieldValue, isSubmitting }) => {
            console.log("values");
            return (
              <Form key="">
                <FormContainer key="">
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                    <Card className="bg-yellow-50 h-max" bodyClass="pb-0">
                      <div className="flex justify-between">
                        <span>
                          <h5 className="font-semibold text-gray-700">
                            Customer and Product Information
                          </h5>
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <CustomerInformation
                          touched={touched?.CustomerDetails}
                          errors={errors?.CustomerDetails}
                          values={values?.CustomerDetails}
                          customers={customers}
                          setFieldValue={setFieldValue}
                        />
                        <ProductInformation
                          touched={touched?.ProductDetails}
                          errors={errors?.ProductDetails}
                          values={values?.ProductDetails}
                          setFieldValue={setFieldValue}
                          products={products}
                        />

                        <div className="flex flex-col justify-center">
                          <label
                            htmlFor="total-quantity"
                            className="text-gray-700 text-sm font-medium mb-2"
                            style={{ marginTop: "-15px" }}
                          >
                            Total Qty
                          </label>
                          <Input
                            id="total-quantity"
                            type="number"
                            value={qualityItems.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}
                            inputProps={{ readOnly: true }}
                            style={{
                              width: "100%",
                              fontSize: "0.95rem",
                            }}
                            className="text-gray-600"
                            disableUnderline
                            readOnly
                          />
                        </div>
                      </div>
                    </Card>

                    <Card>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="solid"
                          // color="pink-500
                          className="bg-pink-500 text-white py-5 text-base mb-4"
                          onClick={() => setQualityDialogOpen(true)}
                        >
                          Add Item
                        </Button>
                      </div>
                      <QualityItemDialog
                        isOpen={qualityDialogOpen}
                        onClose={() => setQualityDialogOpen(false)}
                        data={dummyData}
                        onSubmit={handleAddItem}
                      />

                      <ItemTable
                        initialData={qualityItems}
                        setQualityItems={setQualityItems}
                      />
                    </Card>
                  </div>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </Suspense>
    </>
  );
};

export default QualityControl;
