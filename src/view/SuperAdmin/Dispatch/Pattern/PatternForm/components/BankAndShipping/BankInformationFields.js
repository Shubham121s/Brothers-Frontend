import React, { memo } from "react";
import { Card } from "../../../../../../../components/ui";

const BankInformationFields = (props) => {
  const { values } = props;
  return (
    <Card>
      <div className="flex justify-between">
        <strong>Beneficiary :</strong>{" "}
        <span>{values?.beneficiary_name || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Bank Name :</strong> <span>{values?.bank_name || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Account No :</strong> <span>{values?.account_no || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>IFSC Code :</strong> <span>{values?.ifsc_code || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Swift Code :</strong> <span>{values?.swift_code || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Bank Ad Codes :</strong>{" "}
        <span>{values?.bank_ad_code || "-"}</span>
      </div>
    </Card>
  );
};

export default memo(BankInformationFields);
