import React, { useMemo } from "react";
import { dispatchList } from "../utils/dispatchList";

const WeightDetails = ({ data }) => {
  const grossWeight = dispatchList(data?.DispatchLocations)?.reduce(
    (sum, item) => sum + item.item_quantity * item.item_weight,
    0
  );
  const boxWeight = data?.DispatchBoxLists?.reduce(
    (sum, item) => sum + item.tare_weight,
    0
  );

  return (
    <div className="h-full">
      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          PACKING DETAILS
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">Wooden Box</p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">NO OF BOX</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.DispatchBoxLists?.length}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">NET WEIGHT</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {(boxWeight + grossWeight)?.toFixed(3)} kg
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          GROSS WEIGHT
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {grossWeight?.toFixed(3)} kg
        </p>
      </div>
      {/* <div className='flex gap-1  justify-start capitalize'>
                <p className='text-gray-700 font-semibold print:text-sm'>TARE WEIGHT</p>
                <p className='text-gray-700 print:text-sm'>-</p>
                <p className='text-gray-500 font-medium print:text-sm'>{boxWeight?.toFixed(3)} kg</p>
            </div> */}
    </div>
  );
};

export default WeightDetails;
