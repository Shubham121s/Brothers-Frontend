import React from "react";
import Pattern from "./Pattern";
import Material from "./Material";
import Category from "./Category";
import { Card } from "../../../../components/ui";

const ProductSetting = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="md:col-span-1">
          <Card className="bg-gray-50">
            <Material />
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card className="bg-emerald-50">
            <Category />
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="bg-orange-50">
            <Pattern />
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductSetting;
