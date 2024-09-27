import React from 'react'
import ConditionTable from './components/ConditionTable'
import { injectReducer } from '../../../../../store'
import ConditionSettingReducer from './store'
import ConditionTableTools from './components/ConditionTableTools'

injectReducer('condition', ConditionSettingReducer)
const Condition = ({ type = 'foreign' }) => {
  return (
    <>
      <ConditionTableTools type={type} />
      <ConditionTable type={type} />
    </>
  )
}

export default Condition
