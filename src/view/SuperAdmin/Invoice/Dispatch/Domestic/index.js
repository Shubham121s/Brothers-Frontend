import React, { useEffect, useState } from 'react'
import { apiGetDispatchDomesticInvoiceByInvoiceId } from '../../../../../services/SuperAdmin/Invoice/DispatchServices'
import { Container, DoubleSidedImage, Loading } from '../../../../../components/shared'
import isEmpty from 'lodash/isEmpty';
import DispatchInvoice from './DispatchInvoice';

const DomesticInvoice = ({ dispatch_invoice_id }) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch_invoice_id])

    const fetchData = async () => {
        if (dispatch_invoice_id) {
            setLoading(true)
            const response = await apiGetDispatchDomesticInvoiceByInvoiceId({ dispatch_invoice_id })
            if (response?.data?.success) {
                setData(response.data?.data)
            }
            setLoading(false)
        }
    }

    return (
        <Container className="h-full">
            <Loading loading={loading}>
                {!isEmpty(data) && (
                    <>
                        <div className="w-full flex gap-4 justify-center">
                            <DispatchInvoice data={data} />
                        </div>
                    </>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No invoice found!"
                    />
                    <h3 className="mt-8">No Invoice found!</h3>
                </div>
            )}
        </Container>
    )
}

export default DomesticInvoice