import React, { Suspense } from "react";
import LedgerTable from "./components/LedgerTable";
import LedgerTableTools from "./components/LedgerTableTools";
import { injectReducer } from "../../../store";
import ShopProfile from "./components/ShopProfile";
import retailerReducer from "./store/index";
import { Loading } from "../../../components/shared";
import ledgerDetailReducer from "./store";
import RetailerOrdersTable from "./components/OrdersTable";
import { Card } from "../../../components/ui";
import DownloadPannel from "./components/buttons";
import LedgerTab from "./components/LedgerTab";

injectReducer("retailerLedgerList", ledgerDetailReducer);
injectReducer("retailer", retailerReducer);

const ExecutiveLedgerDetails = () => {
  return (
    <Suspense fallback={<Loading loading={true} />}>
      <div className="md:grid grid-cols-3 gap-3 mb-5">
        <div className="col-span-2">
          <Card>
            <div className="mb-4">
              <h5>Retailer Ledger</h5>
            </div>
            <LedgerTableTools />
            <DownloadPannel />
            {/* <LedgerTable /> */}
          </Card>
        </div>
        <div className="col-span-1">
          <ShopProfile />
        </div>
      </div>
      {/* <RetailerOrdersTable /> */}
      <LedgerTab/>
    </Suspense>
  );
};

export default ExecutiveLedgerDetails;
