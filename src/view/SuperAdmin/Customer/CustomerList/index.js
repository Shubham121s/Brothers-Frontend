import React from 'react'
import CustomersTableTools from './components/CustomersTableTools'
import { injectReducer } from '../../../../store'
import CustomerTable from './components/CustomersTable'
import customerReducer from './store'
import { Card } from '../../../../components/ui'
// import CustomerStatistic from './components/CustomerStatistic';

injectReducer('customer', customerReducer)

const CustomerList = () => {
  return (
    <>
      {/* <CustomerStatistic /> */}
      <Card className="bg-purple-50">
        <CustomersTableTools />
        <CustomerTable />
      </Card>
    </>
  )
}

export default CustomerList
