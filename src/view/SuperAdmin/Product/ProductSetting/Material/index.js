import React from 'react'
import { injectReducer } from '../../../../../store'
import materialReducer from './store'
import MaterialTable from './components/MaterialTable'
import MaterialTableTools from './components/MaterialTableTools'
import MaterialNewFormDialog from './components/MaterialNewFormDialog'
injectReducer('material', materialReducer)
const Material = () => {
    return (
        <>
            <MaterialTableTools />
            <MaterialTable />
            <MaterialNewFormDialog />
        </>
    )
}

export default Material