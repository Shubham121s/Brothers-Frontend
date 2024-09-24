import React, { memo } from 'react'
import { FormItem, Input } from '../../../../../../../components/ui'

const FrightChargesInformationField = ({ setFright, fright }) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <strong>Fright Charges</strong>
      </div>
      <Input
        type="text"
        placeholer="Fright Charges"
        value={fright}
        onChange={(e) => setFright(e.target.value)}
      />
    </div>
  )
}

export default memo(FrightChargesInformationField)
