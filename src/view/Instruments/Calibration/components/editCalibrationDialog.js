import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../components/ui'
import { toggleEditDialog, setSelectedAnnual } from '../store/stateSlice'
import { getAnnual } from '../store/dataSlice'
import CalibrationForm from './calibrationForm'
import { updateAnnual } from '../store/dataSlice'

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

const EditCalibrationDialog = () => {
  const dispatch = useDispatch()

  const editCalibrationDialog = useSelector(
    (state) => state.annual.state.editDialog
  )
  const selectedCalibration = useSelector(
    (state) => state.instrument.state.selectedAnnual
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
    dispatch(toggleEditDialog(false))
    dispatch(setSelectedAnnual({}))
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await dispatch(updateAnnual(values))
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
      isOpen={editCalibrationDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <CalibrationForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
        initialData={{
          ...selectedCalibration
        }}
        InstrumentOption={InstrumentOption}
      />
    </Dialog>
  )
}

export default EditCalibrationDialog
