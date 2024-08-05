import React from "react";
import { Tabs } from "../../../components/ui";
import FinishGood from "./FinishedGoods";
import UnUsedItems from "./ConsumableItems";
const { TabNav, TabList, TabContent } = Tabs;

const Store = () => {
  return (
    <Tabs defaultValue="tab1">
      <TabList>
        <TabNav value="tab1">Finish Goods</TabNav>
        <TabNav value="tab2">UnUsed Items</TabNav>
      </TabList>
      <div className="p-4">
        <TabContent value="tab1">
          <FinishGood />
        </TabContent>
        <TabContent value="tab2">
          <UnUsedItems />
        </TabContent>
      </div>
    </Tabs>
  );
};
export default Store;
