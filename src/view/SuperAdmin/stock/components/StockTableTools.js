import React from "react";
import StockTableSearch from "./StockTableSearch";
import StockTableFilter from "./StockTableFilter";
import { Button } from "../../../../components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toggleAddDialog, setSelectedStock } from "../store/stateSlice";

const StockTableTools = () => {
  const dispatch = useDispatch();
  const onAdd = () => {
    dispatch(setSelectedStock({}));
    dispatch(toggleAddDialog(true));
  };
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
      <StockTableSearch />
      {/* <StockTableFilter />
      <Button
        onClick={onAdd}
        variant="solid"
        size="sm"
        icon={<HiPlusCircle className="mr-1" />}
        className="block lg:inline-block md:mb-0 mb-4 h-full"
      >
        Add Stock
      </Button> */}
    </div>
  );
};

export default StockTableTools;
