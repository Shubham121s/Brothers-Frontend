export const TableData = ({ worksheet, data }) => {
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

  invoiceData.items.forEach((item) => {
    const row = worksheet.addRow([
      item.projectNo,
      item.serialNo,
      item.deliveryDate,
      item.productName,
      item.itemCode,
      item.hsnCode,
      item.boxNo,
      item.qty,
      item.rate,
      item.total
    ])

    row.eachCell((cell, index) => {
      cell.font = itemStyle
      cell.alignment = itemAlignment
      cell.border = {
        left: { style: 'medium' },
        right: { style: 'medium' },
        top: { style: 'medium' },
        bottom: { style: 'medium' }
      }
    })
    //last row count
  })
}

export const TableFooter = ({ worksheet, data }) => {
  worksheet.mergeCells(`A${lastRowNumbers + 1}:B${lastRowNumbers + 1}`)
  worksheet.getCell(`A${lastRowNumbers + 1}`).value = '1 USE = 82 INR'

  // TOTAL Page 1

  worksheet.mergeCells(`F${lastRowNumbers + 1}:G${lastRowNumbers + 1}`)
  worksheet.getCell(`F${lastRowNumbers + 1}`).value = 'TOTAL (PAGE 1)'

  //TOTAL QUNTITY PAGE 1
  worksheet.getCell(`H${lastRowNumbers + 1}`).value = '4'

  //TOTAL AMOUNT PAGE 1
  worksheet.getCell(`J${lastRowNumbers + 1}`).value = 100.2369

  //TOTAL PAGE 1 TO 1
  worksheet.mergeCells(`E${lastRowNumbers + 2}:G${lastRowNumbers + 2}`)
  worksheet.getCell(`E${lastRowNumbers + 2}`).value = 'TOTAL (PAGE 1 TO 9)'

  //TOTAL QUANTITY PAGE 1 to 9
  worksheet.getCell(`H${lastRowNumbers + 2}`).value = 30

  //TOTAL AMOUNT PAGE 1 TO 0
  worksheet.getCell(`J${lastRowNumbers + 2}`).value = 25368.0258

  //IGST
  worksheet.getCell(`H${lastRowNumbers + 3}`).value = 'IGST'
  //IGST VALUE
  worksheet.getCell(`I${lastRowNumbers + 3}`).value = '18%'
  //IGST AMOUNT
  worksheet.getCell(`J${lastRowNumbers + 3}`).value = 5000.123

  //GRAND TOTAL
  worksheet.getCell(`I${lastRowNumbers + 4}`).value = 'GRAND TOTAL'
  //GRAND TOTAL AMOUNT
  worksheet.getCell(`J${lastRowNumbers + 4}`).value = 5025.123

  //AMOUNT IN WORDS
  worksheet.mergeCells(`A${lastRowNumbers + 5}:B${lastRowNumbers + 5}`)
  worksheet.getCell(`A${lastRowNumbers + 5}`).value = 'AMOUNT IN WORDS'

  //AMOUNT WORDS
  worksheet.mergeCells(`C${lastRowNumbers + 5}:J${lastRowNumbers + 5}`)
  worksheet.getCell(`C${lastRowNumbers + 5}`).value = 'SIXTY ONE THOUSAND'
}
