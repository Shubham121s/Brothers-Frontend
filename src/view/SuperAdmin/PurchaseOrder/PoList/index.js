import React from "react";
import { injectReducer } from "../../../../store";
import PoTable from "./components/PoTable";
import poReducer from "./store";
import { Card, Tabs, Tag } from "../../../../components/ui";
import PoTableTools from "./components/PoTableTools";

injectReducer("purchase_order_list", poReducer);
const { TabNav, TabList, TabContent } = Tabs;

const PoList = () => {
  return (
    <>
      <Tabs defaultValue="tab1">
        <TabList>
          <TabNav value="tab1">
            <Tag
              className={`bg-blue-100 text-blue-600
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
              Accepted
            </Tag>
          </TabNav>
          <TabNav value="tab3">
            <Tag
              className={`bg-yellow-100 text-yellow-600
              } border-0`}
            >
              Processing
            </Tag>
          </TabNav>
          <TabNav value="tab4">
            <Tag
              className={`bg-red-100 text-red-600
              } border-0`}
            >
              Rejected
            </Tag>
          </TabNav>
          <TabNav value="tab5">
            <Tag
              className={`bg-emerald-100 text-emerald-600
              } border-0`}
            >
              Received
            </Tag>
          </TabNav>
          <TabNav value="tab6">
            <Tag
              className={`bg-purple-100 text-purple-600
              } border-0`}
            >
              Cancelled
            </Tag>
          </TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value="tab1">
            <PoTableTools />
            <Card>
              <PoTable status={"pending"} />
            </Card>
          </TabContent>
          <TabContent value="tab2">
            <PoTableTools />
            <Card>
              <PoTable status={"accepted"} />
            </Card>
          </TabContent>
          <TabContent value="tab3">
            <PoTableTools />
            <Card>
              <PoTable status={"processing"} />
            </Card>
          </TabContent>
          <TabContent value="tab4">
            <PoTableTools />
            <Card>
              <PoTable status={"rejected"} />
            </Card>
          </TabContent>
          <TabContent value="tab5">
            <PoTableTools />
            <Card>
              <PoTable status={"received"} />
            </Card>
          </TabContent>
          <TabContent value="tab6">
            <PoTableTools />
            <Card>
              <PoTable status={"cancelled"} />
            </Card>
          </TabContent>
        </div>
      </Tabs>
    </>
  );
};

export default PoList;
