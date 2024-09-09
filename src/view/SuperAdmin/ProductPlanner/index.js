import React from "react";
import { injectReducer } from "../../../store";
import PoListTable from "./components/PoListTable";
import poListReducer from "./store";
import { Card,Tabs,Tag } from "../../../components/ui";
import PoListTableTools from "./components/PoListTableTools";

injectReducer("masterPP", poListReducer);
const { TabNav, TabList, TabContent } = Tabs;

const PoList = () => {
  return (
    <>
    <Tabs defaultValue="tab1">
        <TabList>
          <TabNav value="tab1">
            <Tag
              className={`bg-yellow-100 text-yellow-600
              } border-0`}
            >
              Pending
            </Tag>
          </TabNav>
          <TabNav value="tab2">
            <Tag
              className={`bg-emerald-100 text-emerald-600
              } border-0`}
            >
              Delivered
            </Tag>
          </TabNav>
         
        </TabList>
        <div className="p-4">
          <TabContent value="tab1">
          <PoListTableTools DeliveryStatus={"0"} />
      <Card>
        <PoListTable DeliveryStatus={"0"} />
      </Card>
          </TabContent>
          <TabContent value="tab2">
          <PoListTableTools DeliveryStatus={"1"} />
      <Card>
        <PoListTable DeliveryStatus={"1"} />
      </Card>
          </TabContent>
          </div>
          </Tabs>
     
    </>
  );
};

export default PoList;
