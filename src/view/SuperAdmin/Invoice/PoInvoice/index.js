import React from 'react'
import Header from './components/Header'
import PoTable from './components/PoTable'
import Footer from './components/Footer'

const POInvoice = (props) => {
  const { data, PoLists = [], TABLE_ROW_COUNT = 8 } = props
  const pages = []
  const PoLength = PoLists?.length || 1

  let pageCount = 0
  pageCount += Math.ceil(PoLength?.length / TABLE_ROW_COUNT)

  let pageNo = 1
  for (let i = 0; i < Math.ceil(PoLength / TABLE_ROW_COUNT); i++)
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
          className="invoice w-full  relative p-3"
          style={{
            border: '1px solid black',
            marginTop: '4px'
          }}
        >
          <Header
            className={'bg-inherit'}
            data={data}
          />
          <PoTable
            className={'bg-inherit print:text-xs'}
            data={PoLists?.slice(
              i * TABLE_ROW_COUNT,
              i * TABLE_ROW_COUNT + TABLE_ROW_COUNT
            )}
            currency_type={data.currency_type}
            Note={data?.note}
          />
          <Footer
            className={'bg-inherit'}
            data={data}
          />
        </div>
      </div>
    )
  return pages
}

export default POInvoice
