import React, { useEffect, useMemo } from "react";
import { Toast, Notification } from "../../../../components/ui";
import { useNavigate } from "react-router-dom";
import PoForm from "../PoForm";
import { useDispatch, useSelector } from "react-redux";
import { injectReducer } from "../../../../store";
import newPoReducer from "./store";
import {
  getAllCondition,
  getAllCustomers,
  getAllNotes,
  getAllProductsWithDrawing,
  getUniquePoNumber,
  postNewPoRegister,
} from "./store/dataSlice";

injectReducer("new_po", newPoReducer);

const NewPO = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetch = () => {
    dispatch(getAllCustomers());
    dispatch(getAllProductsWithDrawing());
    dispatch(getUniquePoNumber());
    dispatch(getAllNotes());
    dispatch(getAllCondition());
  };

  useEffect(() => {
    fetch();
  }, []);

  const customers = useSelector((state) => state.new_po.data.customers);
  const products = useSelector((state) => state.new_po.data.products);
  const number = useSelector((state) => state.new_po.data.number);
  const Notes = useSelector((state) => state.new_po.data.notes);
  const Condition = useSelector((state) => state.new_po.data.condition);

  const noteOption = useMemo(() => {
    return Notes?.map((m) => {
      return { label: m.name, value: { note_id: m.note_id, notes: m.notes } };
    });
  }, [Notes]);

  const conditionOption = useMemo(() => {
    return Condition?.map((m) => {
      return {
        label: m.name,
        value: { condition_id: m.condition_id, condition: m.condition },
      };
    });
  }, [Notes]);

  const addPo = async (data) => {
    const action = await dispatch(postNewPoRegister(data));
    return action;
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    console.log(values);
    setSubmitting(true);
    const action = await addPo(values);
    setSubmitting(false);
    if (action.payload.status === 200) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          Po successfully added
        </Notification>,
        {
          placement: "top-center",
        }
      );
      handleDiscard();
    }
  };

  const handleDiscard = () => {
    navigate("/super/admin/po/list");
  };

  return (
    <>
      <PoForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        customers={customers}
        products={products}
        number={number}
        Notes={noteOption}
        Condition={conditionOption}
      />
    </>
  );
};

export default NewPO;
