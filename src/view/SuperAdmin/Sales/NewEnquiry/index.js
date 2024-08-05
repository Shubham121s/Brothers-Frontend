import React, { useEffect, useState } from "react";
import EnquiryForm from "../EnquiryForm";
import { Notification, Toast } from "../../../../components/ui";
import { injectReducer } from "../../../../store";
import EnquiryReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
// import {
//   apiPostNewEnquiry,
//   apiPostNewEnquiryList,
// } from "../../../../services/SuperAdmin/Enquiry/enquiry";
// import { toggleSetProduct } from "../EnquiryForm/store/stateSlice";
import { getAllCustomers, getAllProductsWithDrawing } from "./store/dataSlice";

injectReducer("enquiry_new", EnquiryReducer);

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(getAllCustomers());
    dispatch(getAllProductsWithDrawing());
  };

  const Customers = useSelector((state) => state.enquiry_new.data.customers);
  const Products = useSelector((state) => state.enquiry_new.data.products);

  //   const [data, setData] = useState(null);
  //   const [temp, setTemp] = useState(false);

  const handleFormSubmit = async (values) => {
    // const formData = new FormData();
    // if (temp) {
    //   Object.keys(values).forEach((key) => {
    //     formData.append(key, values[key]);
    //   });
    //   formData.append("enquiry_id", data?.enquiry_id);
    //   const res = await apiPostNewEnquiryList(formData);
    //   if (res.data?.success) {
    //     dispatch(toggleSetProduct({ ...data, ...res.data?.data }));
    //     popNotification(
    //       "Successfully Added",
    //       "success",
    //       "Enquiry Successfully created"
    //     );
    //   } else {
    //     popNotification("Unsuccessful", "error", "Enquiry not created");
    //   }
    // } else {
    //   const response = await apiPostNewEnquiry(values);
    //   if (response.data?.success) {
    //     setData(response.data?.data);
    //     setTemp(true);
    //     Object.keys(values).forEach((key) => {
    //       formData.append(key, values[key]);
    //     });
    //     formData.append("enquiry_id", response.data?.data?.enquiry_id);
    //     const res = await apiPostNewEnquiryList(formData);
    //     if (res.data?.success) {
    //       dispatch(
    //         toggleSetProduct({ ...response?.data?.data, ...res.data?.data })
    //       );
    //       popNotification(
    //         "Successfully Added",
    //         "success",
    //         "Enquiry Successfully created"
    //       );
    //     } else {
    //       popNotification("Unsuccessful", "error", "Enquiry not created");
    //     }
    //   }
    // }
  };

  const handleDiscard = () => {
    navigate("/product");
  };

  return (
    <>
      <EnquiryForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        Customers={Customers}
        Products={Products}
      />
    </>
  );
};

export default NewEnquiry;
