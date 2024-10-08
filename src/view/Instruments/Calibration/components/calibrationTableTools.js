import React from 'react'
import { Button } from '../../../../components/ui'
import { useDispatch } from 'react-redux'
import { toggleNewDialog } from '../store/stateSlice'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'

import CalibrationTableSearch from './calibrationTableSearch'

const CalibrationTableTool = () => {
  const dispatch = useDispatch()
  const onDialog = () => {
    dispatch(toggleNewDialog(true))
  }
  return (
    <div className="md:flex items-center justify-end gap-2 mb-4">
      <CalibrationTableSearch />

      <Button
        onClick={onDialog}
        variant="solid"
        size="sm"
      >
        Add Calibration
      </Button>
    </div>
  )
}

export default CalibrationTableTool
