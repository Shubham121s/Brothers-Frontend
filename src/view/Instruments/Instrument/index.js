import React from 'react'
import InstrumentTableTools from './components/InstrumentsTableTools'
import { injectReducer } from '../../../store'
import InstrumentTable from './components/InstrumentTable'
import InstrumentReducer from './store'
import { Card } from '../../../components/ui'
// import CustomerStatistic from './components/CustomerStatistic';

injectReducer('instrument', InstrumentReducer)

const InstrumentList = () => {
  return (
    <>
      {/* <CustomerStatistic /> */}
      <Card className="bg-purple-50">
        <div className="flex justify-between mb-1">
          <h3>Instruments/Gauges</h3>
          <InstrumentTableTools />
        </div>

        <InstrumentTable />
      </Card>
    </>
  )
}

export default InstrumentList
