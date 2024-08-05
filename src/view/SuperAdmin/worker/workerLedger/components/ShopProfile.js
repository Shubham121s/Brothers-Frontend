import React, { useEffect } from "react";
import { Avatar, Card, Button } from "../../../../../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { HiPhone } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import IconText from "../../../../../components/shared/IconText";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPersonFill } from "react-icons/bs";
import useQuery from "../../../../../utils/hooks/useQuery";
import defaultShop from "./defaultShop.jpg";

const ShopProfile = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const serviceId = query.get("id");
  const navigate = useNavigate();

  const selectedWorker = useSelector(
    (state) => state.workerLedgerList.data.workerDetails
  );
  const PendingAmount = useSelector(
    (state) => state.workerLedgerList.data.workerPendingAmount
  );

  return (
    <>
      <Card>
        <h5 className="mb-4">Pending Balance</h5>
        <div className="md:grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <h3>
              <NumericFormat
                value={PendingAmount}
                co
                displayType="text"
                prefix="₹"
                thousandSeparator=","
                thousandsGroupStyle="lakh"
              />
            </h3>
          </div>
        </div>
        <hr className="my-5" />
        <h5 className="mb-4">HR Details</h5>

        <div className="flex items-center gap-3">
          {/* <Avatar shape="square" src={appConfig.apiPrefix + data?.image} size={80} /> */}
          <Avatar
            className="bg-emerald-500"
            shape="square"
            icon={<BsFillPersonFill />}
            size={60}
          />

          <div className="ltr:ml-2 rtl:mr-2">
            <h4 className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
              {selectedWorker?.worker_name}
            </h4>
            <span>
              HR ID:{" "}
              <span className="font-semibold">{selectedWorker?.worker_id}</span>
            </span>
          </div>
        </div>
        <hr className="my-5" />
        <IconText
          className="mb-4"
          icon={<HiPhone className="text-xl opacity-70" />}
        >
          <span className="font-semibold">{selectedWorker?.worker_mobile}</span>
        </IconText>
        <IconText icon={<MdHome className="text-xl opacity-70" />}>
          <span className="font-semibold">
            {selectedWorker?.worker_address}
          </span>
        </IconText>
      </Card>
    </>
  );
};

export default ShopProfile;
