import React from "react";
import { Tabs } from "../../../../components/ui";
import DispatchList from "../DispatchList";
import PatternList from "../PatternList";
const { TabNav, TabList, TabContent } = Tabs;
const InvoiceList = () => {
  return (
    <>
      <Tabs defaultValue="tab1">
        <TabList>
          <TabNav value="tab1">Foreign/Domestice</TabNav>
          <TabNav value="tab2">Pattern</TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value="tab1">
            <DispatchList />
          </TabContent>
          <TabContent value="tab2">
            <PatternList />
          </TabContent>
        </div>
      </Tabs>
    </>
  );
};

export default InvoiceList;
