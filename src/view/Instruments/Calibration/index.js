import React from 'react'

import CalibrationTable from './components/calibrationTable.js'
import { injectReducer } from '../../../store/index.js'
import calibrationReducer from './store'
import CalibrationTableTool from './components/calibrationTableTools.js'

injectReducer('annual', calibrationReducer)
const Calibration = () => {
  return (
    <>
      <div className="flex justify-between mb-1">
        <h4>Calibration</h4>
        <CalibrationTableTool />
      </div>

      <CalibrationTable />
    </>
  )
}

export default Calibration
