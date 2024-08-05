import React, { forwardRef, useEffect, useMemo, useState } from "react";
import {
  FormContainer,
  Button,
  Card,
  Toast,
  FormItem,
  Select,
  Notification,
} from "../../../../components/ui";
import { StickyFooter } from "../../../../components/shared";
import { Form, Formik, Field } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import CustomerInformationFields from "./components/CustomerInformationFields";
import ItemTable from "./components/ItemTable";
import { useDispatch } from "react-redux";
import { toggleNewPoItemDialog } from "../NewPo/store/stateSlice";
import PoNumberInformationFields from "./components/PoNumberInformationFields";
import PoDateInformationFields from "./components/PoDateInformationFields";
import PoCurrencyInformationFields from "./components/PoCurrencyInformationFields";
import CategoryInformationField from "./components/CategoryInformationField";
import ItemForm from "./ItemForm";
import { apiGetAllProductsCategoryId } from "../../../../services/SuperAdmin/Product/IndexService";
import { toggleEditPoItemDialog } from "../EditPo/store/stateSlice";
// import { apiGetAllProductByCategorySelected } from "../../../../services/SuperAdmin/PurchaseOrder/PurchaseOrderService";

const validationSchema = Yup.object().shape({
  Customer: Yup.object().required("Required"),
  number: Yup.string().required("Required"),
  date: Yup.date().required("Required"),
  currency_type: Yup.string().required("Required"),
});

const PoForm = forwardRef((props, ref) => {
  const {
    initialData,
    onFormSubmit,
    onDiscard,
    customers = [],
    categories = [],
    productsData = [],
    type,
  } = props;
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const [data, setData] = useState(() => {
    if (type === "edit" && initialData && initialData.PurchaseOrderLists) {
      return initialData.PurchaseOrderLists;
    }
    return [];
  });

  console.log(initialData);

  useEffect(() => {
    if (type === "edit" && initialData && initialData.PurchaseOrderLists) {
      setData(initialData.PurchaseOrderLists);
    }
  }, [type, initialData]);

  const [item, setItem] = useState({});
  const [itemtype, setType] = useState(false);

  const toggleAddBtn = () => {
    if (type === "edit") {
      dispatch(toggleEditPoItemDialog(true));
    } else {
      dispatch(toggleNewPoItemDialog(true));
    }
  };

  const handleOnAddItem = (item) => {
    if (itemtype) {
      setData((data) =>
        data.map((f) =>
          f.Product.product_id === item.Product?.product_id
            ? { ...f, ...item, delivery_date: new Date(f.delivery_date) }
            : f
        )
      );
    } else {
      setData((data) => [...data, item]);
    }
    setItem({});
    setType(false);
  };

  const onRemoveItem = (index) => {
    let array = [...data];
    let indexValue = array.indexOf(index);
    if (indexValue === -1) {
      array.splice(index, 1);
      setData(array);
    }
  };

  const onEditItem = (data) => {
    if (type === "edit") {
      dispatch(toggleEditPoItemDialog(true));
    } else {
      dispatch(toggleNewPoItemDialog(true));
    }
    setItem(data);
    setType(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetAllProductsCategoryId({
        category_id: category,
      });

      setProducts(response?.data?.data);
    };
    fetchData();
  }, [category]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        innerRef={ref}
        initialValues={{
          ...initialData,
        }}
        // validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep({ ...values, items: [...data] });
          if (data.length === 0) {
            setSubmitting(false);
            return Toast.push(
              <Notification title={"Required"} type="danger" duration={2500}>
                PO List Required
              </Notification>,
              {
                placement: "top-center",
              }
            );
          }
          onFormSubmit?.(formData, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          if (values.category_id !== category && type !== "edit") {
            setCategory(values.category_id);
          }
          return (
            <Form>
              <FormContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="lg:col-span-1">
                    <Card className="bg-gray-50">
                      <CustomerInformationFields
                        touched={touched.Customer}
                        errors={errors.Customer}
                        values={values.Customer}
                        customers={customers}
                      />
                    </Card>
                  </div>
                  <div className="lg:col-span-1">
                    <Card className="bg-green-50">
                      <h5>Purchase Order Information</h5>
                      <p className="mb-4">Section to config PO information</p>
                      <div className="grid grid-cols-2 gap-2">
                        <CategoryInformationField
                          errors={errors.currency_type}
                          touched={touched.currency_type}
                          values={values.category_id}
                          categories={categories}
                          type={type}
                        />
                        <PoDateInformationFields
                          errors={errors.date}
                          touched={touched.date}
                        />
                        <PoNumberInformationFields
                          errors={errors.number}
                          touched={touched.number}
                        />
                        <PoCurrencyInformationFields
                          errors={errors.currency_type}
                          touched={touched.currency_type}
                          values={values.currency_type}
                        />
                      </div>
                    </Card>
                  </div>
                  <div className="lg:col-span-2">
                    <Card className="h-max bg-pink-50">
                      <div className="flex justify-between items-center mb-5">
                        <div>
                          <h5>Purchase Order List</h5>
                          <p>Section to config list information</p>
                        </div>
                        <Button
                          size="sm"
                          variant="solid"
                          type="button"
                          onClick={toggleAddBtn}
                        >
                          Add Item
                        </Button>
                      </div>
                      <ItemTable
                        currency={values.currency_type}
                        products={products}
                        data={data}
                        category={category}
                        onRemoveItem={onRemoveItem}
                        onEditItem={onEditItem}
                      />
                      <ItemForm
                        handleOnAddItem={handleOnAddItem}
                        currency_type={values.currency_type}
                        products={type === "edit" ? productsData : products}
                        initialData={
                          itemtype
                            ? {
                                ...item,
                                delivery_date: new Date(item.delivery_date),
                              }
                            : {}
                        }
                        type={itemtype ? "edit" : "new"}
                        mode={type}
                        setItem={setItem}
                        setType={setType}
                      />
                    </Card>
                  </div>
                </div>
                <StickyFooter
                  className="-mx-8 px-8 flex items-center justify-between py-4"
                  stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <h5 className="flex gap-1 items-center text-gray-600">
                    Total <h4 className="text-blue-500">{data.length}</h4>{" "}
                    {data.length === 1 ? "item" : "items"} in list
                  </h5>
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
                      {type === "edit" ? "Update" : "Save"}
                    </Button>
                  </div>
                </StickyFooter>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
});

PoForm.defaultProps = {
  type: "new",
  initialData: {
    purchase_order_id: "",
    date: new Date(),
    number: "",
    Customer: null,
    currency_type: "INR",
    category_id: "",
  },
};

export default PoForm;
