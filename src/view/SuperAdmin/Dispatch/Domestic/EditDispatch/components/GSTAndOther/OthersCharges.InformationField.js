import React, { memo } from "react";
import { FormItem, Input } from "../../../../../../../components/ui";

const OtherChargesInformationField = ({ setOther, other }) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <strong>OTHER CHARGES</strong>
      </div>
      <Input
        type="text"
        placeholer="Other Charges"
        value={other}
        onChange={(e) => setOther(e.target.value)}
      />
    </div>
  );
};

export default memo(OtherChargesInformationField);
