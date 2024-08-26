import React, { useEffect, useState } from "react";
import {
  Notification,
  Toast,
  Drawer,
  Button,
} from "../../../../../components/ui";
import { injectReducer } from "../../../../../store";
import newEnquiryReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleDrawer } from "../EnquiryList/store/stateSlice";
import { getAllCustomers, getAllProductsWithDrawing } from "./store/dataSlice";
import EnquiryForm from "../EnquiryForm";
import { postNewEnquiry } from "./store/dataSlice";
import { getAllEnquiry } from "../EnquiryList/store/dataSlice";
import { Loading } from "../../../../../components/shared";

injectReducer("enquiry_new", newEnquiryReducer);

const popNotification = (keyword, type, message) => {
  Toast.push(
    <Notification title={keyword} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-end",
    }
  );
};

const NewEnquiry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [size, setSize] = useState(1400);

  const Customers = useSelector((state) => state.enquiry_new.data.customers);
  const Products = useSelector((state) => state.enquiry_new.data.products);
  const loadingStates = useSelector((state) => state.enquiry_new.data.loading);
  const isOpen = useSelector((state) => state.enquiry.state.openDrawer);

  let loading = Object.values(loadingStates);

  useEffect(() => {
    if (isOpen) {
      getWindowSize();
      fetchData();
    }
  }, [isOpen]); // Run the effect only when isOpen changes

  const fetchData = async () => {
    dispatch(getAllCustomers());
    dispatch(getAllProductsWithDrawing());
  };

  const getWindowSize = () => {
    const width = window.innerWidth;
    setSize(width - 250);
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    console.log(values);
    setSubmitting(true);
    const action = await dispatch(postNewEnquiry(values));
    if (action.payload.status < 300) {
      setSubmitting(false);
      popNotification("Successfull", "success", "Enquiry Successfully created");
      onDrawerClose();
      dispatch(getAllEnquiry());
    } else {
      popNotification("Unsuccessful", "error", "Enquiry not created");
      setSubmitting(false);
    }
  };

  const onDrawerClose = () => {
    dispatch(toggleDrawer(false));
  };

  const handleDiscard = () => {
    navigate("/product");
  };

  const Footer = (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={() => onDrawerClose()}>
        Cancel
      </Button>
      <Button size="sm" variant="solid">
        Save
      </Button>
    </div>
  );
  return (
    <>
      <Drawer
        title="New Enquiry"
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        // footer={Footer}
        width={size}
      >
        <Loading loading={!loading.every((e) => e === false)}>
          <EnquiryForm
            type="new"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
            Customers={Customers}
            Products={Products}
          />
        </Loading>
      </Drawer>
    </>
  );
};

export default NewEnquiry;
