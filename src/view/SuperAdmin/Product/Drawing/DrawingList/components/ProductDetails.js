import React from "react";
import { Card } from "../../../../../../components/ui";

const ProductDetail = (props) => {
  const { data } = props;
  return (
    <div className="grid md:grid-cols-3 gap-2 mb-4">
      <Card className="mt-2 bg-emerald-50">
        <div className="flex justify-between">
          <strong>Product Name :</strong>{" "}
          <span className="uppercase">{data?.name || "-"}</span>
        </div>
        <div className="flex justify-between">
          <strong>Product Code :</strong>{" "}
          <span className="uppercase">{data?.product_code || "-"}</span>
        </div>
        <div className="flex justify-between">
          <strong>Item Code :</strong>{" "}
          <span className="uppercase">{data?.item_code || "-"}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-between">
            <strong>SLT :</strong>{" "}
            <span className="uppercase">
              {`${data?.standard_lead_time} ${data?.standard_lead_time_type}` ||
                "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>Unit M. :</strong>{" "}
            <span className="uppercase">{data?.unit_measurement || "-"}</span>
          </div>
        </div>
      </Card>
      <Card className="mt-2 bg-pink-50">
        <div className="flex justify-between">
          <strong>Pump Model :</strong>{" "}
          <span className="uppercase">{data?.pump_model || "-"}</span>
        </div>
        <div className="flex justify-between">
          <strong>Raw Code :</strong>{" "}
          <span className="uppercase">{data?.row_code || "-"}</span>
        </div>
        <div className="flex justify-between">
          <strong>HSN Code :</strong>{" "}
          <span className="uppercase">{data?.hsn_code || "-"}</span>
        </div>
      </Card>
      <Card className="mt-2 bg-slate-50">
        <div className="flex justify-between">
          <strong>Material Grade :</strong>{" "}
          <span className="uppercase">
            {data?.MaterialGrade?.number || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <strong>Pattern :</strong>{" "}
          <span className="uppercase">{data?.Pattern?.number || "-"}</span>
        </div>
        <div className="flex justify-between">
          <strong>Category :</strong>{" "}
          <span className="uppercase">{data?.Category?.name || "-"}</span>
        </div>
        <div className="flex justify-between">
          <strong>Remark :</strong>{" "}
          <span className="uppercase">{data?.description || "-"}</span>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
