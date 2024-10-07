import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../components/ui'
import { toggleNewDialog, setSelectedAnnual } from '../store/stateSlice'
import { getAnnual } from '../store/dataSlice'
import CalibrationForm from './calibrationForm'
import { postAnnual } from '../store/dataSlice'

const pushNotification = (message, type, title) => {
  return Toast.push(
    <Notification
      title={title}
      type={type}
      duration={2500}
    >
      {message}
    </Notification>,
    {
      placement: 'top-center'
    }
  )
}

const NewCalibrationDialog = () => {
  const dispatch = useDispatch()

  const newCalibrationDialog = useSelector(
    (state) => state.annual.state.addDialog
  )

  const tableData = useSelector((state) => state.annual.data.tableData)
  const instruments = useSelector((state) => state.annual.data.instruments)

  const InstrumentOption = useMemo(() => {
    return instruments.map((inst) => ({
      label: inst.instrument_name,
      value: { ...inst }
    }))
  }, [instruments])

  const onDialogClose = () => {
    dispatch(toggleNewDialog(false))
    dispatch(setSelectedAnnual({}))
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await dispatch(postAnnual(values))
    setSubmitting(false)
    if (action?.payload.status === 201) {
      dispatch(getAnnual(tableData))
      pushNotification(
        action?.payload?.data?.message,
        'success',
        'Successfully added'
      )
      return onDialogClose()
    }
    return pushNotification(
      action?.payload?.data?.message,
      'danger',
      'Unsuccessfully'
    )
  }

  return (
    <Dialog
      isOpen={newCalibrationDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <CalibrationForm
        type="new"
        InstrumentOption={InstrumentOption}
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
      />
    </Dialog>
  )
}

export default NewCalibrationDialog
