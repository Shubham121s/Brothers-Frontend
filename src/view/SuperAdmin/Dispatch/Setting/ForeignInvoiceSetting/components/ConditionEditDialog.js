import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../../../components/ui'
import { toggleEditConditionDialog } from '../store/stateSlice'
import { updateCondition, getAllConditions } from '../store/dataSlice'
import ConditionForm from './ConditionForm'

const ConditionEditDialog = ({ type }) => {
  const dispatch = useDispatch()

  const editConditionDialog = useSelector(
    (state) => state.condition.state.editConditionDialog
  )
  const initialData = useSelector(
    (state) => state.condition.state.selectedCondition
  )

  const tableData = useSelector((state) => state.condition.data.tableData)

  const onDialogClose = () => {
    dispatch(toggleEditConditionDialog(false))
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await dispatch(updateCondition({ ...values, type }))
    setSubmitting(false)
    if (action.payload.status < 300) {
      dispatch(getAllConditions({ ...tableData, type }))
      Toast.push(
        <Notification
          title={'Successfully updated'}
          type="success"
          duration={2500}
        >
          Condition successfully updated
        </Notification>,
        {
          placement: 'top-center'
        }
      )
      onDialogClose()
    }
  }

  return (
    <Dialog
      isOpen={editConditionDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <ConditionForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
        initialData={initialData}
      />
    </Dialog>
  )
}

export default ConditionEditDialog
