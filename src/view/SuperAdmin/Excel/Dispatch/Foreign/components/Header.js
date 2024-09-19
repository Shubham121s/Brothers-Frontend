import { dispatchList } from '../../../../Invoice/Dispatch/Foreign/utils/dispatchList'

export const InvoiceTitle = (
  worksheet,
  PageStart = 1,
  Title = 'INVOICE',
  workbook
) => {
  console.log('header')
}

export const CompanyDetails = (worksheet, PageStart = 1) => {
  worksheet.mergeCells(`A${PageStart + 1}:B${PageStart + 1}`)
  worksheet.getCell(`A${PageStart + 1}`).value = {
    richText: [{ text: 'BROTHERS INDUSTRIES', font: { bold: true, size: 45 } }]
  }
  worksheet.getCell(`A${PageStart + 1}`).alignment = {
    indent: 1
  }
  worksheet.getCell(`A${PageStart + 1}`).border = {
    right: { style: 'mediumDashDot' },
    left: { style: 'medium' }
  }
  worksheet.getRow(PageStart + 1).height = 50

  worksheet.mergeCells(`B${PageStart + 2}:B${PageStart + 6}`)
  worksheet.getCell(`B${PageStart + 2}`).border = {
    right: { style: 'mediumDashDot' },
    bottom: { style: 'mediumDashDot' }
  }
  worksheet.mergeCells(`A${PageStart + 2}:A${PageStart + 6}`)

  worksheet.getRow(PageStart + 6).height = 80
  worksheet.getCell(`A${PageStart + 2}`).value = {
    richText: [
      {
        text: 'GAT NO.882 ,KIRLOSKARWADI ROAD, SAWANTPUR,\n',
        font: { size: 18 }
      },
      { text: 'MAHARASHTRA, INDIA\n', font: { size: 18 } },
      { text: 'PHONE: +91) 7588777800, 9764705724\n', font: { size: 18 } },
      { text: 'EMAIL: brothersindustries07@gmail.com\n', font: { size: 18 } },
      { text: 'WEBSITE: www.brothers.net.in', font: { size: 18 } }
    ]
  }

  worksheet.getCell(`A${PageStart + 2}`).border = {
    left: { style: 'medium' },
    bottom: { style: 'mediumDashDot' }
  }

  worksheet.getCell(`A${PageStart + 2}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  console.log('CompanyDetails')
}

export const InvoiceNumber = (worksheet, PageStart = 1, invoice_no = '') => {
  worksheet.mergeCells(`C${PageStart + 1}:F${PageStart + 1}`)
  worksheet.getCell(`C${PageStart + 1}`).value = {
    richText: [
      { text: 'INVOICE NO - ', font: { size: 18 } }, // Normal text
      { text: invoice_no, font: { bold: true, size: 19 } } // Bold invoice number
    ]
  }
  worksheet.getCell(`C${PageStart + 1}`).border = {
    right: { style: 'mediumDashDot' },
    bottom: { style: 'mediumDashDot' }
  }
  worksheet.getCell(`C${PageStart + 1}`).alignment = {
    vertical: 'middle',
    horizontal: 'center',
    wrapText: true,
    shrinkToFit: true
  }
  console.log('InvoiceNumber')
}

export const InvoiceDate = (worksheet, PageStart = 1, invoice_date = '') => {
  worksheet.mergeCells(`G${PageStart + 1}:J${PageStart + 1}`)
  worksheet.getCell(`G${PageStart + 1}`).value = {
    richText: [
      { text: 'INVOICE Date - ', font: { size: 18 } }, // Normal text
      { text: invoice_date, font: { bold: true, size: 15 } } // Bold invoice number
    ]
  }
  worksheet.getCell(`G${PageStart + 1}`).border = {
    right: { style: 'medium' },
    bottom: { style: 'mediumDashDot' }
  }
  worksheet.getCell(`G${PageStart + 1}`).alignment = {
    vertical: 'middle',
    horizontal: 'center',
    wrapText: true,
    shrinkToFit: true
  }
  console.log('InvoiceDate')
}

export const BuyerOrderDetails = (worksheet, PageStart = 1, data) => {
  const POLists = dispatchList(data?.DispatchLocations)?.map((item) =>
    String(item?.Po?.number)
  )
  const POInvoice = Array.from(new Set(POLists))
  worksheet.getRow(3).height = 20
  worksheet.mergeCells(`C${PageStart + 2}:J${PageStart + 2}`)
  worksheet.getCell(`C${PageStart + 2}`).value = {
    richText: [{ text: 'BUYER ORDER NO', font: { bold: true, size: 18 } }]
  }
  worksheet.getCell(`C${PageStart + 2}`).alignment = {
    vertical: 'center',
    horizontal: 'center',
    wrapText: true,
    shrinkToFit: true
  }
  worksheet.getCell(`C${PageStart + 2}`).border = {
    right: { style: 'medium' },
    bottom: { style: 'mediumDashDot' }
  }
  worksheet.mergeCells(`C${PageStart + 3}:C${PageStart + 6}`)
  worksheet.mergeCells(`D${PageStart + 3}:D${PageStart + 6}`)
  worksheet.mergeCells(`E${PageStart + 3}:E${PageStart + 6}`)
  worksheet.mergeCells(`F${PageStart + 3}:F${PageStart + 6}`)
  worksheet.mergeCells(`G${PageStart + 3}:G${PageStart + 6}`)
  worksheet.mergeCells(`H${PageStart + 3}:H${PageStart + 6}`)
  worksheet.mergeCells(`I${PageStart + 3}:I${PageStart + 6}`)
  worksheet.mergeCells(`J${PageStart + 3}:J${PageStart + 6}`)
  let arr = [
    `C${PageStart + 3}`,
    `D${PageStart + 3}`,
    `E${PageStart + 3}`,
    `F${PageStart + 3}`,
    `G${PageStart + 3}`,
    `H${PageStart + 3}`,
    `I${PageStart + 3}`,
    `J${PageStart + 3}`
  ]

  POInvoice.forEach((order, index) => {
    if (index < arr.length) {
      worksheet.getCell(`${arr[index]}`).value = {
        richText: [
          { text: `${index + 1}: `, font: { size: 16 } },
          { text: `${order}`, font: { bold: true, size: 16 } }
        ]
      }

      worksheet.getCell(`${arr[index]}`).alignment = {
        vertical: 'middle',
        horizontal: 'left',
        wrapText: true
      }

      worksheet.getCell(`${arr[index]}`).border = {
        right: { style: `${arr.length - 1 === index ? 'medium' : ''}` },
        bottom: { style: 'mediumDashDot' }
      }
    }
  })
  console.log('BuyerOrderDetails')
}

export const ConsigneeDetails = (worksheet, PageStart = 1, data) => {
  worksheet.getRow(9).height = 120
  worksheet.mergeCells(`A${PageStart + 7}:B${PageStart + 7}`)
  worksheet.getCell(`A${PageStart + 7}`).value = `CONSIGNEE`
  worksheet.getCell(`A${PageStart + 7}`).alignment = {
    vertical: 'top',
    horizontal: 'center',
    wrapText: true,
    shrinkToFit: true
  }
  worksheet.getCell(`A${PageStart + 7}`).font = {
    bold: true,
    size: 15
  }
  worksheet.getCell(`A${PageStart + 7}`).border = {
    right: { style: 'mediumDashDot' },
    left: { style: 'medium' }
  }

  worksheet.mergeCells(`A${PageStart + 8}:B${PageStart + 8}`)
  const richText2 = [
    {
      text: data?.DispatchConsignee?.name + '\n',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchConsignee?.DispatchConsigneeAddress?.address + ', ',
      font: { size: 15 }
    },
    {
      text: data?.DispatchConsignee?.DispatchConsigneeAddress?.country + ', ',
      font: { size: 15 }
    },
    {
      text: data?.DispatchConsignee?.DispatchConsigneeAddress?.zip_code + '\n',
      font: { size: 15 }
    },
    {
      text: 'EMAIL - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchConsignee?.email,
      font: { size: 15 }
    }
  ]

  worksheet.getCell(`A${PageStart + 8}`).value = { richText: richText2 }

  // Set alignment and wrapping
  worksheet.getCell(`A${PageStart + 8}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  worksheet.getCell(`A${PageStart + 8}`).border = {
    left: { style: 'medium' },
    right: { style: 'mediumDashDot' },
    bottom: { style: 'mediumDashDot' }
  }
  console.log('ConsigneeDetails')
}

export const BuyerDetails = (worksheet, PageStart = 1, data) => {
  worksheet.mergeCells(`C${PageStart + 7}:F${PageStart + 7}`)
  worksheet.getCell(`C${PageStart + 7}`).value = `BUYER`
  worksheet.getCell(`C${PageStart + 7}`).font = { size: 15, bold: true }
  worksheet.getCell(`C${PageStart + 7}`).alignment = {
    vertical: 'top',
    horizontal: 'center',
    wrapText: true,
    shrinkToFit: true
  }
  worksheet.getCell(`C${PageStart + 7}`).border = {
    right: { style: 'mediumDashDot' },
    left: { style: 'medium' }
  }

  worksheet.mergeCells(`C${PageStart + 8}:F${PageStart + 8}`)
  const richText3 = [
    {
      text: data?.DispatchBuyer?.name + '\n',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAddress?.address + ', ',
      font: { size: 15 }
    },
    {
      text: data?.DispatchShippingAddress?.country + ', ',
      font: { size: 15 }
    },
    {
      text: data?.DispatchShippingAddress?.zip_code + '\n',
      font: { size: 15 }
    },
    {
      text: 'CONTACT NAME - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAddress?.contact_person + '\n',
      font: { size: 15 }
    },
    {
      text: 'CONTACT - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAddress?.contact_phone,
      font: { size: 15 }
    }
  ]
  worksheet.getCell(`C${PageStart + 8}`).value = { richText: richText3 }
  worksheet.getCell(`C${PageStart + 8}`).border = {
    right: { style: 'mediumDashDot' },
    bottom: { style: 'mediumDashDot' }
  }
  worksheet.getCell(`C${PageStart + 8}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  console.log('BuyerDetails')
}

export const GSTandOtherDetails = (worksheet, PageStart = 1, data) => {
  worksheet.mergeCells(`G${PageStart + 7}:J${PageStart + 7}`)
  worksheet.getCell(`G${PageStart + 7}`).value = ``
  worksheet.getCell(`G${PageStart + 7}`).alignment = {
    vertical: 'top',
    horizontal: 'center',
    wrapText: true,
    shrinkToFit: true
  }
  worksheet.getCell(`G${PageStart + 7}`).border = {
    right: { style: 'medium' }
  }

  const richText4 = [
    {
      text: 'IEC CODE -',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchCompanyDetail?.iec_code + '\n',
      font: { size: 15 }
    },
    {
      text: 'GSTIN - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchCompanyDetail?.gstin + '\n',
      font: { size: 15 }
    },
    {
      text: 'END USE CODE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAndOtherDetail?.end_use_code + '\n',
      font: { size: 15 }
    },
    {
      text: 'PAYMENT - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAndOtherDetail?.payment_term,
      font: { size: 15 }
    }
  ]
  worksheet.mergeCells(`G${PageStart + 8}:J${PageStart + 8}`)
  worksheet.getCell(`G${PageStart + 8}`).value = { richText: richText4 }
  worksheet.getCell(`G${PageStart + 8}`).border = {
    bottom: { style: 'mediumDashDot' },
    right: { style: 'medium' }
  }
  worksheet.getCell(`G${PageStart + 8}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  console.log('GSTandOtherDetails')
}

export const PortDetails = (worksheet, PageStart = 1, data) => {
  worksheet.getRow(PageStart + 9).height = 125
  worksheet.mergeCells(`A${PageStart + 9}:B${PageStart + 9}`)
  const richText5 = [
    {
      text: 'PRE-CARRIEGE BY -',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingDetail?.pre_carriage_by + '\n',
      font: { size: 15 }
    },
    {
      text: 'PLACE OF RECEIPT - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingDetail?.place_of_receipt + '\n',
      font: { size: 15 }
    },
    {
      text: 'VESSEL / FLIGHT NO - ',
      font: { bold: true, size: 15 }
    },
    {
      text: 'GNX 200\n',
      font: { size: 15 }
    },
    {
      text: 'PORT OF DISCHARGE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingDetail?.port_of_discharge + '\n',
      font: { size: 15 }
    },
    {
      text: 'NOTIFY - ',
      font: { bold: true, size: 15 }
    },
    {
      text: 'BUYER/APPLICANT MENTIONED ABOVE',
      font: { size: 15 }
    }
  ]
  worksheet.getCell(`A${PageStart + 9}`).value = { richText: richText5 }
  worksheet.getCell(`A${PageStart + 9}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  worksheet.getCell(`A${PageStart + 9}`).border = {
    right: { style: 'mediumDashDot' },
    left: { style: 'medium' },
    bottom: { style: 'medium' }
  }
  console.log('PortDetails')
}

export const DestinationDetails = (worksheet, PageStart = 1, data) => {
  worksheet.mergeCells(`C${PageStart + 9}:F${PageStart + 9}`)
  const richText6 = [
    {
      text: 'COUNTRY OF ORIGIN OF GOODS -',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingDetail?.country_of_goods + '\n',
      font: { size: 15 }
    },
    {
      text: 'COUNTRY OF FINAL DESTINATION - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingDetail?.destination + '\n',
      font: { size: 15 }
    },
    {
      text: 'PORT OF LOADING - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingDetail?.port_of_loading + '\n',
      font: { size: 15 }
    },
    {
      text: 'FINAL DESTINATION - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingDetail?.final_destination + '\n',
      font: { size: 15 }
    }
  ]
  worksheet.getCell(`C${PageStart + 9}`).value = { richText: richText6 }
  worksheet.getCell(`C${PageStart + 9}`).border = {
    bottom: { style: 'medium' },
    right: { style: 'mediumDashDot' }
  }
  worksheet.getCell(`C${PageStart + 9}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  console.log('DestinationDetails')
}

export const BoxDetails = (worksheet, PageStart = 1, data) => {
  worksheet.mergeCells(`G${PageStart + 9}:J${PageStart + 9}`)
  let richText = []

  data?.DispatchBoxLists.forEach((box) => {
    richText.push({
      text: `BOX NO ${box.box_no}`,
      font: { bold: true, size: 12 }
    })
    richText.push({
      text: ` - (${box.box_height}X${box.box_breadth}X${
        box.box_length
      }) ${box.box_size_type.toUpperCase()}-(${Number(box.tare_weight).toFixed(
        3
      )} Kg)\n`,
      font: { size: 12 }
    })
  })

  worksheet.getCell(`G${PageStart + 9}`).value = { richText }
  worksheet.getCell(`G${PageStart + 9}`).border = {
    bottom: { style: 'medium' },
    right: { style: 'medium' }
  }
  worksheet.getCell(`G${PageStart + 9}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  console.log('BoxDetails')
}
