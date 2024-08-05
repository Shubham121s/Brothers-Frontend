import React from 'react'
import PatternTable from './components/PatternTable'
import { injectReducer } from '../../../../../store'
import patternReducer from './store'
import PatternTableTools from './components/PatternTableTools'
import PatternNewFormDialog from './components/PatternNewFormDialog'

injectReducer('pattern', patternReducer)

const Pattern = () => {
    return (
        <>
            <div className="lg:flex items-center justify-between">
                <h4>Patterns</h4>
                <PatternTableTools />
            </div>
            <PatternTable />
            <PatternNewFormDialog />
        </>
    )
}

export default Pattern