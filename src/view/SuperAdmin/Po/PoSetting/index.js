import React from "react";
import Notes from "./Notes";
import Condition from "./PoCondition";
import { Card } from "../../../../components/ui";

const PoSetting = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="md:col-span-1">
          <Card className="bg-gray-50">
            <Notes />
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card className="bg-emerald-50">
            <Condition />
          </Card>
        </div>
        {/* <div className="md:col-span-2">
          <Card className="bg-orange-50">
            <Pattern />
          </Card>
        </div> */}
      </div>
    </>
  );
};

export default PoSetting;
