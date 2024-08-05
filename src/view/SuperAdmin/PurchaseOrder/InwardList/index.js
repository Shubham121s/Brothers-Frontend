import React from "react";
import { injectReducer } from "../../../../store";
import PoTable from "./components/PoTable";
import poReducer from "./store";
import { Card } from "../../../../components/ui";
import PoTableTools from "./components/PoTableTools";

injectReducer("inward_list", poReducer);

const PoList = () => {
  return (
    <>
      <PoTableTools />
      <Card>
        <PoTable />
      </Card>
    </>
  );
};

export default PoList;
