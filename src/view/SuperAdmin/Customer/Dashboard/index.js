import React, { useEffect } from 'react'
import { Loading } from '../../../../components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { injectReducer } from '../../../../store'
import customerDashboardReducer from './store'
import CustomerDashboardTable from './components/customerdashboardTable'
import CustomerdashboardTableTools from './components/CustomerdashboardTableTools'
import CustomerMonthWiseSalesChart from './components/CustomerMonthWiseSalesChart'
import CustomerYearWiseSalesChart from './components/CustomerYearWiseSalesChart'
import { Card } from '../../../../components/ui'

injectReducer('customer_dashboard', customerDashboardReducer)

const Dashboard = () => {
  const dispatch = useDispatch()

  return (
    <Loading loading={false}>
      {/* <Statistic data={data} /> */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card className="">
          <CalibrationNearToDate />
        </Card>
        <Card className="col-span-2">
          <CalibrationPieChart data={data?.pieChartData} />
        </Card>
      </div> */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <CustomerYearWiseSalesChart />
        </Card>
        <Card>
          <CustomerMonthWiseSalesChart />
        </Card>
      </div>
      <Card>
        <CustomerdashboardTableTools />
        <CustomerDashboardTable />
      </Card>
    </Loading>
  )
}

export default Dashboard
