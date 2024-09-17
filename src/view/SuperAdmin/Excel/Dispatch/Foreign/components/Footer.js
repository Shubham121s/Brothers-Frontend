export const WeightDetails = ({ worksheet, data, lastRowNumber }) => {
  worksheet.mergeCells(`A${lastRowNumber + 6}:B${lastRowNumber + 6}`)
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
      text: '8\n',
      font: { size: 15 }
    },
    {
      text: 'NET WEIGHT - ',
      font: { bold: true, size: 15 }
    },
    {
      text: '25 Kg\n',
      font: { size: 15 }
    },
    {
      text: 'GROSS WEIGHT - ',
      font: { bold: true, size: 15 }
    },
    {
      text: '26.00 Kg\n',
      font: { size: 15 }
    }
  ]
  worksheet.getCell(`A${lastRowNumber + 6}`).value = { richText: richText7 }
  worksheet.getRow(`${lastRowNumber + 6}`).height = 118
  worksheet.getCell(`A${lastRowNumber + 6}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  worksheet.getCell(`A${lastRowNumber + 6}`).border = {
    bottom: { style: 'mediumDashDot' },
    left: { style: 'medium' },
    right: { style: 'mediumDashDot' }
  }
}

export const ShippingDetails = ({ worksheet, data, lastRowNumber }) => {
  worksheet.mergeCells(`C${lastRowNumber + 6}:F${lastRowNumber + 6}`)
  const richText8 = [
    {
      text: 'FRIEGHT -',
      font: { bold: true, size: 15 }
    },
    {
      text: 'PRE-PAID\n',
      font: { size: 15 }
    },
    {
      text: 'EXCISE DOCUMENT - ',
      font: { bold: true, size: 15 }
    },
    {
      text: '\n',
      font: { size: 15 }
    },
    {
      text: 'SHIPPING TERMS - ',
      font: { bold: true, size: 15 }
    },
    {
      text: 'CIF\n',
      font: { size: 15 }
    },
    {
      text: 'SHIPPING LINE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: 'BY AIR\n',
      font: { size: 15 }
    },
    {
      text: 'INSURANCE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: 'BROTHER INDUSTRIES\n',
      font: { size: 15 }
    }
  ]
  worksheet.getCell(`C${lastRowNumber + 6}`).value = { richText: richText8 }
  worksheet.getCell(`C${lastRowNumber + 6}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  worksheet.getCell(`C${lastRowNumber + 6}`).border = {
    bottom: { style: 'mediumDashDot' },
    right: { style: 'mediumDashDot' }
  }
}

export const BankDetails = ({ worksheet, data, lastRowNumber }) => {
  worksheet.mergeCells(`G${lastRowNumber + 6}:J${lastRowNumber + 6}`)
  const richText9 = [
    {
      text: 'BENEFICIARY NAME -',
      font: { bold: true, size: 15 }
    },
    {
      text: 'BROTHER INDUSTRIES\n',
      font: { size: 15 }
    },
    {
      text: 'BANK NAME - ',
      font: { bold: true, size: 15 }
    },
    {
      text: 'BANK OF MAHARASTRA\n',
      font: { size: 15 }
    },
    {
      text: 'BANK ACCOUNT NO - ',
      font: { bold: true, size: 15 }
    },
    {
      text: '60262968113\n',
      font: { size: 15 }
    },
    {
      text: 'IFSC CODE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: 'MAHBOOOOO3O\n',
      font: { size: 15 }
    },
    {
      text: 'SWIFT CODE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: 'MAHBINBBKOL\n',
      font: { size: 15 }
    },
    {
      text: 'BANK AD CODE - ',
      font: { bold: true, size: 15 }
    },
    {
      text: '02300676000009',
      font: { size: 15 }
    }
  ]
  worksheet.getCell(`G${lastRowNumber + 6}`).value = { richText: richText9 }
  worksheet.getCell(`G${lastRowNumber + 6}`).alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true,
    shrinkToFit: true,
    indent: 1
  }
  worksheet.getCell(`G${lastRowNumber + 6}`).border = {
    bottom: { style: 'mediumDashDot' },
    right: { style: 'medium' }
  }
}

export const NoteDetails = ({ worksheet, data, lastRowNumber }) => {}

export const SignatureDetails = ({ worksheet, data, lastRowNumber }) => {}
