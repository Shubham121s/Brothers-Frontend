import React from 'react'
import { injectReducer } from '../../../../store'
import productReducer from './store'
import ProductTable from './components/ProductsTable';
import { Card } from '../../../../components/ui';
import ProductTableTools from './components/ProductTableTools';

injectReducer('product', productReducer)

const Product = () => {
    return (
        <>
            <Card className="bg-purple-50">
                <ProductTableTools />
                <ProductTable />
            </Card>
        </>
    )
}

export default Product