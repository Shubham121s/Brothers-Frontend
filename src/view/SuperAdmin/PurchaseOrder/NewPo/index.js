import React, { useEffect } from "react";
import { Toast, Notification } from "../../../../components/ui";
import { useNavigate } from "react-router-dom";
import PoForm from "../PoForm";
import { useDispatch, useSelector } from "react-redux";
import { injectReducer } from "../../../../store";
import newPoReducer from "./store";
import {
  getAllCategories,
  getAllCustomers,
  getAllProductsWithDrawing,
  postNewPoRegister,
} from "./store/dataSlice";

injectReducer("new_po", newPoReducer);

const NewPO = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetch = () => {
    dispatch(getAllCustomers());
    dispatch(getAllCategories());
  };

  useEffect(() => {
    fetch();
  }, []);

  const customers = useSelector((state) => state.new_po.data.customers);
  const categories = useSelector((state) => state.new_po.data.categoryList);
  const products = useSelector((state) => state.new_po.data.products);

  const addPo = async (data) => {
    const action = await dispatch(postNewPoRegister(data));
    return action;
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    console.log(values);
    setSubmitting(true);
    const action = await addPo(values);
    setSubmitting(false);
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          Purchase Order successfully added
        </Notification>,
        {
          placement: "top-center",
        }
      );
      handleDiscard();
    }
  };

  const handleDiscard = () => {
    navigate("/super/admin/purchaseOrder/list");
  };

  return (
    <>
      <PoForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        customers={customers}
        products={products}
        categories={categories}
      />
    </>
  );
};

export default NewPO;
