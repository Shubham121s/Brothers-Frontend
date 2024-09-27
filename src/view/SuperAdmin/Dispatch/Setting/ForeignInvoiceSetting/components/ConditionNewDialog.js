import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../../../components/ui'
import { toggleNewConditionDialog } from '../store/stateSlice'
import ConditionForm from './ConditionForm'
import { getAllConditions, postNewCondition } from '../store/dataSlice'

const ConditionNewDialog = ({ type }) => {
  const dispatch = useDispatch()

  const newConditionDialog = useSelector(
    (state) => state.condition.state.newConditionDialog
  )

  const tableData = useSelector((state) => state.condition.data.tableData)

  const onDialogClose = () => {
    dispatch(toggleNewConditionDialog(false))
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await dispatch(postNewCondition({ ...values, type }))
    setSubmitting(false)
    if (action.payload.status < 300) {
      dispatch(getAllConditions({ ...tableData, type }))
      Toast.push(
        <Notification
          title={'Successfully added'}
          type="success"
          duration={2500}
        >
          Note successfully added
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
      isOpen={newConditionDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      width={700}
    >
      <ConditionForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
      />
    </Dialog>
  )
}

export default ConditionNewDialog
