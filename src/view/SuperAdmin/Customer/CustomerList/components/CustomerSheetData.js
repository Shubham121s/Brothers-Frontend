import React from 'react'
import { Button } from '../../../../../components/ui'
import { HiDownload } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const CustomerSheetData = () => {
    return (
        <>
            <Link
                to="/data/product-list.csv"
                target="_blank"
                download
            >
                <Button block variant='solid' size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
        </>
    )
}

export default CustomerSheetData
