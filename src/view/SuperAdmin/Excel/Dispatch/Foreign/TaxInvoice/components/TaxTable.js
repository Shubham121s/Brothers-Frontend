import dayjs from 'dayjs'
import { InvoiceQuantity } from '../../../../../Invoice/Dispatch/Foreign/utils/quantity'
import { dispatchList } from '../../../../../Invoice/Dispatch/Foreign/utils/dispatchList'
import { InvoiceTotal } from '../../../../../Invoice/Dispatch/Foreign/utils/amount'
import { currencyToINR } from '../../../../../Invoice/Dispatch/Foreign/utils/currencyConverter'
import NumberFormat from '../../../../../Invoice/Dispatch/Foreign/utils/numberFormat'

export const TableData = (worksheet, data, pageData) => {
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
        Number(item?.PoList?.unit_price) *
        Number(data?.DispatchShippingAndOtherDetail?.convert_rate)
      ).toFixed(2),
      (
        (
          Number(item?.PoList?.unit_price) *
          Number(data?.DispatchShippingAndOtherDetail?.convert_rate)
        )?.toFixed(2) * parseInt(item?.item_quantity)
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
  const footerStyle = { size: 15 }
  const footerAlignment = {
    vertical: 'middle',
    horizontal: 'center',
    wrapText: true
  }
  const footerBorderStyle = {
    left: { style: 'medium' },
    right: { style: 'medium' },
    top: { style: 'medium' },
    bottom: { style: 'medium' }
  }

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
  const GSTAmount = Number(totalAmount * (GST_RATE / 100)).toFixed(2)
  const GrandTotal = Number(totalAmount) + parseFloat(GSTAmount)

  worksheet.mergeCells(`A${lastRowNumbers + 1}:B${lastRowNumbers + 1}`)
  worksheet.getCell(`A${lastRowNumbers + 1}`).value = `1 USD = ${Number(
    convert_rate
  ).toFixed(2)} INR`

  worksheet.getCell(`A${lastRowNumbers + 1}`).font = footerStyle
  worksheet.getCell(`A${lastRowNumbers + 1}`).alignment = footerAlignment
  worksheet.getCell(`A${lastRowNumbers + 1}`).border = footerBorderStyle

  // TOTAL Page 1

  worksheet.mergeCells(`F${lastRowNumbers + 1}:G${lastRowNumbers + 1}`)
  worksheet.getCell(`F${lastRowNumbers + 1}`).value = `TOTAL(page {${1}})`
  worksheet.getCell(`F${lastRowNumbers + 1}`).font = footerStyle
  worksheet.getCell(`F${lastRowNumbers + 1}`).alignment = footerAlignment
  worksheet.getCell(`F${lastRowNumbers + 1}`).border = footerBorderStyle

  //TOTAL QUNTITY PAGE 1
  worksheet.getCell(`H${lastRowNumbers + 1}`).value = pageQuantity
  worksheet.getCell(`H${lastRowNumbers + 1}`).font = footerStyle
  worksheet.getCell(`H${lastRowNumbers + 1}`).alignment = footerAlignment
  worksheet.getCell(`H${lastRowNumbers + 1}`).border = footerBorderStyle

  //TOTAL AMOUNT PAGE 1
  worksheet.getCell(`J${lastRowNumbers + 1}`).value = (
    <NumberFormat value={pageAmount} />
  )
  worksheet.getCell(`J${lastRowNumbers + 1}`).font = footerStyle
  worksheet.getCell(`J${lastRowNumbers + 1}`).alignment = footerAlignment
  worksheet.getCell(`J${lastRowNumbers + 1}`).border = footerBorderStyle

  //TOTAL PAGE 1 TO 1
  worksheet.mergeCells(`E${lastRowNumbers + 2}:G${lastRowNumbers + 2}`)
  worksheet.getCell(`E${lastRowNumbers + 2}`).value = `Total (page 1 to {${1}})`
  worksheet.getCell(`E${lastRowNumbers + 2}`).font = footerStyle
  worksheet.getCell(`E${lastRowNumbers + 2}`).alignment = footerAlignment
  worksheet.getCell(`E${lastRowNumbers + 2}`).border = footerBorderStyle

  //TOTAL QUANTITY PAGE 1 to 9
  worksheet.getCell(`H${lastRowNumbers + 2}`).value = totalQuantity
  worksheet.getCell(`H${lastRowNumbers + 2}`).font = footerStyle
  worksheet.getCell(`H${lastRowNumbers + 2}`).alignment = footerAlignment
  worksheet.getCell(`H${lastRowNumbers + 2}`).border = footerBorderStyle

  //TOTAL AMOUNT PAGE 1 TO 0
  worksheet.getCell(`J${lastRowNumbers + 2}`).value = (
    <NumberFormat value={totalAmount} />
  )
  worksheet.getCell(`J${lastRowNumbers + 2}`).font = footerStyle
  worksheet.getCell(`J${lastRowNumbers + 2}`).alignment = footerAlignment
  worksheet.getCell(`J${lastRowNumbers + 2}`).border = footerBorderStyle

  //IGST
  worksheet.getCell(`H${lastRowNumbers + 3}`).value = 'IGST'
  worksheet.getCell(`H${lastRowNumbers + 3}`).font = footerStyle
  worksheet.getCell(`H${lastRowNumbers + 3}`).alignment = footerAlignment
  worksheet.getCell(`H${lastRowNumbers + 3}`).border = footerBorderStyle
  //IGST VALUE
  worksheet.getCell(`I${lastRowNumbers + 3}`).value = GST_RATE + '%'
  worksheet.getCell(`I${lastRowNumbers + 3}`).font = footerStyle
  worksheet.getCell(`I${lastRowNumbers + 3}`).alignment = footerAlignment
  worksheet.getCell(`I${lastRowNumbers + 3}`).border = footerBorderStyle
  //IGST AMOUNT
  worksheet.getCell(`J${lastRowNumbers + 3}`).value = (
    <NumberFormat value={GSTAmount} />
  )
  worksheet.getCell(`J${lastRowNumbers + 3}`).font = footerStyle
  worksheet.getCell(`J${lastRowNumbers + 3}`).alignment = footerAlignment
  worksheet.getCell(`J${lastRowNumbers + 3}`).border = footerBorderStyle

  //GRAND TOTAL
  worksheet.getCell(`I${lastRowNumbers + 4}`).value = 'GRAND TOTAL'
  worksheet.getCell(`I${lastRowNumbers + 4}`).font = footerStyle
  worksheet.getCell(`I${lastRowNumbers + 4}`).alignment = footerAlignment
  worksheet.getCell(`I${lastRowNumbers + 4}`).border = footerBorderStyle
  //GRAND TOTAL AMOUNT
  worksheet.getCell(`J${lastRowNumbers + 4}`).value = (
    <NumberFormat value={GrandTotal} />
  )
  worksheet.getCell(`J${lastRowNumbers + 4}`).font = footerStyle
  worksheet.getCell(`J${lastRowNumbers + 4}`).alignment = footerAlignment
  worksheet.getCell(`J${lastRowNumbers + 4}`).border = footerBorderStyle

  //AMOUNT IN WORDS
  worksheet.mergeCells(`A${lastRowNumbers + 5}:B${lastRowNumbers + 5}`)
  worksheet.getCell(`A${lastRowNumbers + 5}`).value = 'AMOUNT IN WORDS'
  worksheet.getCell(`A${lastRowNumbers + 5}`).font = footerStyle
  worksheet.getCell(`A${lastRowNumbers + 5}`).alignment = footerAlignment
  worksheet.getCell(`A${lastRowNumbers + 5}`).border = footerBorderStyle

  //AMOUNT WORDS
  worksheet.mergeCells(`C${lastRowNumbers + 5}:J${lastRowNumbers + 5}`)
  worksheet.getCell(`C${lastRowNumbers + 5}`).value = currencyToINR(GrandTotal)
  worksheet.getCell(`C${lastRowNumbers + 5}`).font = footerStyle
  worksheet.getCell(`C${lastRowNumbers + 5}`).alignment = footerAlignment
  worksheet.getCell(`C${lastRowNumbers + 5}`).border = footerBorderStyle
  return lastRowNumbers
}
