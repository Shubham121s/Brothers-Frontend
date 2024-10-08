import React from 'react'

import CalibrationTable from './components/calibrationTable.js'
import { injectReducer } from '../../../store/index.js'
import calibrationReducer from './store'
import CalibrationTableTool from './components/calibrationTableTools.js'
import { Card } from '../../../components/ui/index.js'

injectReducer('annual', calibrationReducer)
const Calibration = () => {
  return (
    <>
      <Card className="bg-orange-50">
        <div className="flex justify-between mb-1">
          <h3>Calibration</h3>
          <CalibrationTableTool />
        </div>

        <CalibrationTable />
      </Card>
    </>
  )
}

export default Calibration
