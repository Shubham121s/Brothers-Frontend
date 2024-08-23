import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui";

const PackingChargesInformationField = ({ setCharges, charges }) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <strong>P & F Charges</strong>
      </div>
      <Input
        type="text"
        placeholer="Packing Charges"
        value={charges}
        onChange={(e) => setCharges(e.target.value)}
      />
    </div>
  );
};

export default memo(PackingChargesInformationField);
