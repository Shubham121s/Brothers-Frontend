import React, { useRef } from 'react'
import { Button } from '../../../../../../components/ui'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { TABLE_ROW_COUNT } from '../constant'

const TaxInvoiceExcel = ({ data }) => {
  const RenderPages = ({ data }) => {
    const pages = []
    let pageCount = 0
    if (data) {
      const dispatchLocationsLength = data?.DispatchLocations?.length || 1

      for (let i = 0; i < dispatchLocationsLength; i++) {
        const { DispatchLists = [] } = data?.DispatchLocations?.[i]
        pageCount += Math.ceil(DispatchLists?.length / TABLE_ROW_COUNT)
      }

      let pageNo = 1
      for (let i = 0; i < dispatchLocationsLength; i++) {
        const { location_code = '', DispatchLists = [] } =
          data?.DispatchLocations?.[i]
        const dispatchListLength = DispatchLists?.length
        for (
          let i = 0;
          i < Math.ceil(dispatchListLength / TABLE_ROW_COUNT);
          i++
        ) {
          pages.push(
            <div
              key={`page-${pageNo}`}
              className="page"
              style={{
                height: 'calc(1130px - 50px)',
                paddingLeft: '6%',
                paddingRight: '2%'
              }}
            >
              <div
                className="invoice w-full  relative"
                style={{
                  border: '1px solid black',
                  marginTop: '4px'
                }}
              >
                {/* <div className='w-full h-full absolute top-0' style={{ opacity: .15 }}>
                  <img src='http://www.brothers.net.in/img/logoBrother.png' className='w-full h-full' style={{ objectFit: 'contain', objectPosition: 'center' }}></img>
                </div> */}
                <Header
                  data={data}
                  pageNo={pageNo}
                  pageCount={pageCount}
                  location_code={location_code}
                  invoice_type="TAX INVOICE"
                />
                <TableData
                  pageNo={pageNo}
                  data={data}
                  boxes={data?.DispatchBoxLists}
                  pageData={DispatchLists?.slice(
                    i * TABLE_ROW_COUNT,
                    i * TABLE_ROW_COUNT + TABLE_ROW_COUNT
                  )}
                  pageCount={pageCount}
                />
                <Footer data={data} />
              </div>
            </div>
          )
          pageNo += 1
        }
      }
    }
    return pages
  }

  return (
    data && (
      <>
        <Button
          variant="solid"
          color="blue-500"
          onClick={RenderPages}
        >
          Tax Invoice
        </Button>
      </>
    )
  )
}

export default TaxInvoiceExcel
