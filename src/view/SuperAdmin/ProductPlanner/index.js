import React from "react";
import { injectReducer } from "../../../store";
import PoListTable from "./components/PoListTable";
import poListReducer from "./store";
import { Card } from "../../../components/ui";
import PoListTableTools from "./components/PoListTableTools";

injectReducer("poList", poListReducer);

const PoList = () => {
  return (
    <>
      <PoListTableTools />
      <Card>
        <PoListTable />
      </Card>
    </>
  );
};

export default PoList;
