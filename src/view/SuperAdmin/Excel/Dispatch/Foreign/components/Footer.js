import { dispatchList } from '../../../../Invoice/Dispatch/Foreign/utils/dispatchList'
export const WeightDetails = (worksheet, LastRowNumber, data) => {
  const netWeight = dispatchList(data?.DispatchLocations)?.reduce(
    (sum, item) => sum + item.item_quantity * item.item_weight,
    0
  )
  const boxWeight = data?.DispatchBoxLists?.reduce(
    (sum, item) => sum + item.tare_weight,
    0
  )

  worksheet.mergeCells(`A${LastRowNumber + 6}:B${LastRowNumber + 6}`)
  const richText7 = [
    {
      text: 'PACKING DETAILS -',
      font: { bold: true, size: 15 }
    },
    {
      text: 'WOODEN BOX\n',
      font: { size: 15 }
    },
    {
      text: 'NO OF BOX - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchBoxLists?.length + '\n',
      font: { size: 15 }
    },
    {
      text: 'NET WEIGHT - ',
      font: { bold: true, size: 15 }
    },
    {
      text: netWeight?.toFixed(3) + 'Kg\n',
      font: { size: 15 }
    },
    {
      text: 'GROSS WEIGHT - ',
      font: { bold: true, size: 15 }
    },
    {
      text: (boxWeight + netWeight)?.toFixed(3) + 'Kg',
      font: { size: 15 }
    }
  ]
  worksheet.getCell(`A${LastRowNumber + 6}`).value = { richText: richText7 }
  worksheet.getRow(`${LastRowNumber + 6}`).height = 118
  worksheet.getCell(`A${LastRowNumber + 6}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  worksheet.getCell(`A${LastRowNumber + 6}`).border = {
    bottom: { style: 'mediumDashDot' },
    left: { style: 'medium' },
    right: { style: 'mediumDashDot' }
  }
}

export const ShippingDetails = (worksheet, LastRowNumber, data) => {
  worksheet.mergeCells(`C${LastRowNumber + 6}:F${LastRowNumber + 6}`)
  const richText8 = [
    {
      text: 'FRIEGHT -',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAndOtherDetail?.freight + '\n',
      font: { size: 15 }
    },
    {
      text: 'EXCISE DOCUMENT - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAndOtherDetail?.excise_document + '\n',
      font: { size: 15 }
    },
    {
      text: 'SHIPPING TERMS - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAndOtherDetail?.shipping_term + '\n',
      font: { size: 15 }
    },
    {
      text: 'SHIPPING LINE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAndOtherDetail?.shipping_line + '\n',
      font: { size: 15 }
    },
    {
      text: 'INSURANCE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchShippingAndOtherDetail?.shipping_insurance,
      font: { size: 15 }
    }
  ]
  worksheet.getCell(`C${LastRowNumber + 6}`).value = { richText: richText8 }
  worksheet.getCell(`C${LastRowNumber + 6}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  worksheet.getCell(`C${LastRowNumber + 6}`).border = {
    bottom: { style: 'mediumDashDot' },
    right: { style: 'mediumDashDot' }
  }
}

export const BankDetails = (worksheet, LastRowNumber, data) => {
  worksheet.mergeCells(`G${LastRowNumber + 6}:J${LastRowNumber + 6}`)
  const richText9 = [
    {
      text: 'BENEFICIARY NAME -',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchBankDetail?.beneficiary_name + '\n',
      font: { size: 15 }
    },
    {
      text: 'BANK NAME - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchBankDetail?.bank_name + '\n',
      font: { size: 15 }
    },
    {
      text: 'BANK ACCOUNT NO - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchBankDetail?.account_no + '\n',
      font: { size: 15 }
    },
    {
      text: 'IFSC CODE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchBankDetail?.ifsc_code + '\n',
      font: { size: 15 }
    },
    {
      text: 'SWIFT CODE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchBankDetail?.swift_code + '\n',
      font: { size: 15 }
    },
    {
      text: 'BANK AD CODE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: data?.DispatchBankDetail?.bank_ad_code,
      font: { size: 15 }
    }
  ]
  worksheet.getCell(`G${LastRowNumber + 6}`).value = { richText: richText9 }
  worksheet.getCell(`G${LastRowNumber + 6}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  worksheet.getCell(`G${LastRowNumber + 6}`).border = {
    bottom: { style: 'mediumDashDot' },
    right: { style: 'medium' }
  }
  return LastRowNumber + 10
}

export const NoteDetails = (worksheet, LastRowNumber, data) => {}

export const SignatureDetails = (worksheet, LastRowNumber, data) => {}
