import React from 'react'
import CategoryTable from './components/CategoryTable'
import { injectReducer } from '../../../../../store'
import categoryReducer from './store/index';
import CategoryTableTools from './components/CategoryTableTools';
import CategoryNewFormDialog from './components/CategoryNewFormDialog';

injectReducer('category', categoryReducer)
const Category = () => {
    return (
        <>
            <CategoryTableTools />
            <CategoryTable />
            <CategoryNewFormDialog />
        </>
    )
}

export default Category