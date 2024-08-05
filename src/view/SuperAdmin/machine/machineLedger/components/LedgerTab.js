import React,{useEffect, useMemo} from "react";
import { Tabs } from "components/ui";
import DataTable from "components/shared/DataTable";
import { useSelector ,useDispatch} from "react-redux";
import { getBreakdown } from "../store/dataSlice";
import { getMachineById } from "../store/dataSlice";
import { getAnnual } from "../store/dataSlice";
import { useParams } from "react-router-dom";
import CalibrationTable from "./CalibrationTable";
import BreakdownTable from "./BreakdownTable";
const { TabNav, TabList, TabContent } = Tabs;


const LedgerTab = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    console.log(id)
   
  
  

    
  
    useEffect(()=>{
        dispatch(getMachineById({machine_id:id}))
        // dispatch(getBreakdown())
    },[])
    
   
  return (
    <>
      <div>
        <Tabs defaultValue="tab1" variant="pill">
          <TabList>
            <TabNav value="tab1">calibration</TabNav>
            <TabNav value="tab2">breakdown</TabNav>
          </TabList>
          <div className="p-4">
            <TabContent value="tab1">
              {/* table calibration */}
              <CalibrationTable/>
             
            </TabContent>
            <TabContent value="tab2">
                {/* table breakdown */}
                <BreakdownTable/>
          
            </TabContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default LedgerTab;
