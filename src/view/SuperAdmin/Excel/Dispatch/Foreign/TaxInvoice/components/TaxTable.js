import dayjs from 'dayjs'
import { InvoiceQuantity } from '../../../../../Invoice/Dispatch/Foreign/utils/quantity'
import { dispatchList } from '../../../../../Invoice/Dispatch/Foreign/utils/dispatchList'
import { InvoiceTotal } from '../../../../../Invoice/Dispatch/Foreign/utils/amount'
import { currencyToINR } from '../../../../../Invoice/Dispatch/Foreign/utils/currencyConverter'
import NumberFormat from '../../../../../Invoice/Dispatch/Foreign/utils/numberFormat'

export const TableData = (worksheet, data, pageData) => {
  let lastRowNumbers = 0
  const headerRow = worksheet.addRow([
    'PROJECT NO',
    'PO & SERIAL NO',
    'DELIVERY DATE',
    'PRODUCT NAME',
    'ITEM CODE',
    'HSN CODE',
    'BOX NO',
    'QUANTITY',
    'RATE (USD)',
    'TOTAL (USD)'
  ])

  const boldLargeStyle = { bold: true, size: 15 }

  headerRow.eachCell((cell) => {
    cell.border = {
      left: { style: 'medium' },
      right: { style: 'medium' },
      top: { style: 'medium' },
      bottom: { style: 'medium' }
    }
    cell.font = boldLargeStyle
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    }
  })

  const itemStyle = { size: 15 }
  const itemAlignment = {
    vertical: 'middle',
    horizontal: 'left',
    wrapText: true
  }
  const borderStyle = {
    left: { style: 'medium' },
    right: { style: 'medium' },
    top: { style: 'medium' },
    bottom: { style: 'medium' }
  }

  const findBox = (boxArray = [], searchKey, searchValue) => {
    const foundObject = boxArray.find((obj) => obj[searchKey] === searchValue)
    return foundObject
  }

  pageData.forEach((item) => {
    const row = worksheet.addRow([
      item?.PoList?.project_no,
      item?.Po?.number + '-' + item?.PoList?.serial_number,
      dayjs(item?.PoList?.delivery_date).format('DD-MMM-YYYY'),
      item?.item_name,
      item?.item_code,
      item?.hsn_code,
      findBox(
        data.DispatchBoxLists,
        'dispatch_box_list_id',
        item?.dispatch_box_id
      )?.box_no,
      item?.item_quantity,
      (
        parseFloat(item?.PoList?.unit_price) *
        parseFloat(data?.DispatchShippingAndOtherDetail?.convert_rate)
      ).toFixed(2),
      (
        (
          parseFloat(item?.PoList?.unit_price) *
          parseFloat(data?.DispatchShippingAndOtherDetail?.convert_rate)
        )?.toFixed(2) * parseFloat(item?.item_quantity)
      ).toFixed(2)
    ])

    row.eachCell((cell, index) => {
      cell.font = itemStyle
      cell.alignment = itemAlignment
      cell.border = borderStyle
    })
    //last row count
    lastRowNumbers = row.number
  })

  //FOOTER

  const {
    bill_type,
    i_gst = 0,
    convert_rate
  } = data?.DispatchShippingAndOtherDetail
  const GST_RATE = bill_type === 'NON GST' ? 0 : i_gst
  const pageQuantity = InvoiceQuantity(pageData)
  const totalQuantity = InvoiceQuantity(dispatchList(data?.DispatchLocations))
  const totalAmount = InvoiceTotal(
    dispatchList(data?.DispatchLocations),
    convert_rate
  )
  const pageAmount = InvoiceTotal(pageData, convert_rate)
  const GSTAmount = parseFloat(totalAmount * (GST_RATE / 100)).toFixed(2)
  const GrandTotal = parseFloat(totalAmount) + parseFloat(GSTAmount)

  worksheet.mergeCells(`A${lastRowNumbers + 1}:B${lastRowNumbers + 1}`)
  worksheet.getCell(`A${lastRowNumbers + 1}`).value = `1 USD = ${parseFloat(
    convert_rate
  ).toFixed(2)} INR`

  // TOTAL Page 1

  worksheet.mergeCells(`F${lastRowNumbers + 1}:G${lastRowNumbers + 1}`)
  worksheet.getCell(`F${lastRowNumbers + 1}`).value = `TOTAL(page {${1}})`

  //TOTAL QUNTITY PAGE 1
  worksheet.getCell(`H${lastRowNumbers + 1}`).value = pageQuantity

  //TOTAL AMOUNT PAGE 1
  worksheet.getCell(`J${lastRowNumbers + 1}`).value = (
    <NumberFormat value={pageAmount} />
  )

  //TOTAL PAGE 1 TO 1
  worksheet.mergeCells(`E${lastRowNumbers + 2}:G${lastRowNumbers + 2}`)
  worksheet.getCell(`E${lastRowNumbers + 2}`).value = `Total (page 1 to {${1}})`

  //TOTAL QUANTITY PAGE 1 to 9
  worksheet.getCell(`H${lastRowNumbers + 2}`).value = totalQuantity

  //TOTAL AMOUNT PAGE 1 TO 0
  worksheet.getCell(`J${lastRowNumbers + 2}`).value = (
    <NumberFormat value={totalAmount} />
  )

  //IGST
  worksheet.getCell(`H${lastRowNumbers + 3}`).value = 'IGST'
  //IGST VALUE
  worksheet.getCell(`I${lastRowNumbers + 3}`).value = GST_RATE + '%'
  //IGST AMOUNT
  worksheet.getCell(`J${lastRowNumbers + 3}`).value = (
    <NumberFormat value={GSTAmount} />
  )

  //GRAND TOTAL
  worksheet.getCell(`I${lastRowNumbers + 4}`).value = 'GRAND TOTAL'
  //GRAND TOTAL AMOUNT
  worksheet.getCell(`J${lastRowNumbers + 4}`).value = (
    <NumberFormat value={GrandTotal} />
  )

  //AMOUNT IN WORDS
  worksheet.mergeCells(`A${lastRowNumbers + 5}:B${lastRowNumbers + 5}`)
  worksheet.getCell(`A${lastRowNumbers + 5}`).value = 'AMOUNT IN WORDS'

  //AMOUNT WORDS
  worksheet.mergeCells(`C${lastRowNumbers + 5}:J${lastRowNumbers + 5}`)
  worksheet.getCell(`C${lastRowNumbers + 5}`).value = currencyToINR(GrandTotal)
  return lastRowNumbers
}
