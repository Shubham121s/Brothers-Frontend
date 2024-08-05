import React, { useEffect } from "react";
import { Avatar, Card, Button } from "../../../../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { HiPhone } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import IconText from "../../../../components/shared/IconText";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPersonFill } from "react-icons/bs";
//import { getShopDetailsByShopId } from "../store/dataSlice";
import useQuery from "../../../../utils/hooks/useQuery";
import defaultShop from "./defaultShop.jpg";

const ShopProfile = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const serviceId = query.get("id");
  const navigate = useNavigate();
  const data = useSelector((state) => state.retailerLedgerList.data.breakdownList);
  console.log(data);

  let totalCost = 0;
let totalSpareCost = 0;
if (data) {
  totalCost = data.reduce((total, item) => total + Number(item.cost), 0);
  totalSpareCost = data.reduce((total, item) => total + Number(item.spare_cost), 0);
}
let totalExpense = totalCost + totalSpareCost;
let machineDetails;
if (data) {
  machineDetails = data.map(({ machine: { machine_name, machine_type, machine_model } }) => {
    return { machine_name, machine_type, machine_model };
  });
}
let uniqueMachineNames = [...new Set(machineDetails.map(item => item.machine_name))];
let uniqueMachineTypes = [...new Set(machineDetails.map(item => item.machine_type))];
let uniqueMachineModels = [...new Set(machineDetails.map(item => item.machine_model))];

console.log('Unique Machine Names:', uniqueMachineNames);
console.log('Unique Machine Types:', uniqueMachineTypes);
console.log('Unique Machine Models:', uniqueMachineModels);
 


  // const selectedRetailer = useSelector(
  //   (state) => state.retailerLedgerList.data.retailerDetails
  // );
  // const PendingAmount = useSelector(
  //   (state) => state.retailerLedgerList.data.retailerPendingAmount
  // );

  return (
    <>
      <Card>
        <h3 className="mb-4">Total Expense</h3>
        <div className="md:grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <h1>
              <NumericFormat
                value={totalExpense}
                co
                displayType="text"
                prefix="₹"
                thousandSeparator=","
                thousandsGroupStyle="lakh"
              />
            </h1>
          </div>
        </div>
        <hr className="my-5" />
        <h3 className="mb-4">Machine Details -</h3>
        
    <div>Machine Name: {uniqueMachineNames}</div>
    <div>Machine Type: {uniqueMachineTypes}</div>
    <div>Machine Model: {uniqueMachineModels}</div>
 

       


        <div className="flex items-center gap-3">
          {/* <Avatar shape="square" src={appConfig.apiPrefix + data?.image} size={80} /> */}
       

          <div className="ltr:ml-2 rtl:mr-2">
            <h4 className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
              {/* {selectedRetailer?.retailer_name} */}
            </h4>
          
          </div>
        </div>
        <hr className="my-5" />
     
  
       
      
      </Card>
    </>
  );
};

export default ShopProfile;
