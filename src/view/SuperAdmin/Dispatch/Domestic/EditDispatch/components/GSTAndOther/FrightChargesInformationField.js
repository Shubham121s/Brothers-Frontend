import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui";

const FrightChargesInformationField = ({ setFright, fright }) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <strong>FREIGHT CHARGES</strong>
      </div>
      <Input
        type="text"
        placeholer="Freight Charges"
        value={fright}
        onChange={(e) => setFright(e.target.value)}
      />
    </div>
  );
};

export default memo(FrightChargesInformationField);
