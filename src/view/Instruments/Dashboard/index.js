import React, { useEffect } from 'react'
import { Loading } from '../../../components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { injectReducer } from '../../../store'
import instrumentDashboardReducer from './store'
import CalibrationNearToDate from './components/calibrationNearToDate'
import { Card } from '../../../components/ui'

injectReducer('instrument_dashboard', instrumentDashboardReducer)

const Dashboard = () => {
  return (
    <Loading loading={false}>
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SalesReport data={data?.chartData?.[0]} className="col-span-2 bg-slate-50" />
                <Statistic data={data?.statisticData} />
                
            </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card>
          <CalibrationNearToDate />
        </Card>
        {/* <LatestDispatch data={data?.dispatchList} className="lg:col-span-2 h-max" /> */}
      </div>
    </Loading>
  )
}

export default Dashboard
