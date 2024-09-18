import React, { useRef } from 'react'
import { Button } from '../../../../../../components/ui'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { TABLE_ROW_COUNT } from '../constant'
import {
  InvoiceTitle,
  CompanyDetails,
  InvoiceNumber,
  InvoiceDate,
  BuyerOrderDetails,
  ConsigneeDetails,
  BuyerDetails,
  GSTandOtherDetails,
  PortDetails,
  DestinationDetails,
  BoxDetails
} from '../components/Header'
import { TableData } from './components/TaxTable'
import {
  WeightDetails,
  ShippingDetails,
  BankDetails,
  NoteDetails,
  SignatureDetails
} from '../components/Footer'

const TaxInvoiceExcel = () => {
  const data = {
    dispatch_invoice_id: '98672b7d-773e-452a-b3e5-030a0a886eef',
    invoice_date: '2024-09-12',
    invoice_no: 'BI24-25/202',
    invoice_type: 'foreign',
    status: 'pending',
    createdAt: '2024-09-12T11:34:18.000Z',
    DispatchConsignee: {
      dispatch_consignee_id: '306897ef-98b9-4270-a2f1-4740a4e95758',
      customer_id: '8',
      vender_code: null,
      name: 'HYOSUNG GOODSPRINGS',
      mobile: null,
      phone: null,
      email: 'chulmin424@hyosang.com',
      pan: 'CWQPS2369C',
      gst_no: '123',
      DispatchConsigneeAddress: {
        dispatch_address_id: 'e657adcc-2075-4a5b-b907-35a359b6dba5',
        address_id: '8',
        address:
          '43-1,UNGNAM-DONG,SEONGSAN-GU,CHANGWON-SI,GYEONGSANGNAM-DO,KOREA',
        city: 'GYEONGSANGNAM-DO',
        zip_code: 51559,
        state: 'SEONGSAN-GU',
        country: 'KOREA'
      }
    },
    DispatchBuyer: {
      dispatch_buyer_id: 'dccb271b-d6d3-400f-9ad6-ae321b9bdb9d',
      customer_id: '8',
      vender_code: null,
      name: 'HYOSUNG GOODSPRINGS',
      mobile: null,
      phone: null,
      email: 'chulmin424@hyosang.com',
      pan: 'CWQPS2369C',
      gst_no: '123'
    },
    DispatchShippingAddress: {
      dispatch_shipping_address_id: '4fdf5036-281a-4107-b756-01515a603dde',
      shipping_address_id: '8',
      address: '43-1, UNGNAM-DONG, CHANGWON-SI, SEONGSAN-GU,',
      city: 'GYEONGSANGNAM-DO',
      zip_code: 51559,
      state: 'SEONGSAN-GU,',
      country: 'KOREA',
      contact_person: 'BAE CHUL MIN',
      contact_phone: null
    },
    DispatchBoxLists: [
      {
        dispatch_box_list_id: 'c1f12d62-1e3b-4b85-b8cb-b166b4c29c6e',
        box_no: 1,
        box_length: 31,
        box_height: 30,
        box_breadth: 17,
        box_size_type: 'inch',
        tare_weight: 0
      }
    ],
    DispatchLocations: [
      {
        dispatch_location_id: '05e81a71-5bae-438b-b954-952d7dfa8ba3',
        location_code: null,
        DispatchLists: [
          {
            dispatch_list_id: '4bb97dda-44fe-40fc-8bd7-47933915f80c',
            item_quantity: 2,
            item_weight: 14,
            dispatch_location_id: '05e81a71-5bae-438b-b954-952d7dfa8ba3',
            dispatch_box_id: 'c1f12d62-1e3b-4b85-b8cb-b166b4c29c6e',
            product_id: '141fc219-3a35-491d-a16d-dff759cebc99',
            item_name: 'BEARING HOUSING',
            item_code: 'DPEH140060GAA',
            pump_model: null,
            unit_measurement: 'no',
            hsn_code: '84139190',
            description: null,
            gst_percentage: 0,
            Po: {
              po_id: 'b09e411b-fb93-43fb-80de-363c5ce6eea6',
              number: 'E02024010049',
              date: '2024-01-11',
              currency_type: 'USD'
            },
            PoList: {
              po_list_id: 'a32cd088-fb9e-4c1c-8052-6baacdef6171',
              project_no: '2353008-021',
              serial_number: '36',
              quantity: 2,
              unit_price: 917,
              net_amount: 0,
              delivery_date: '2024-07-04',
              description: 'NA',
              accept_delivery_date: '2024-07-04',
              accept_description: 'OK'
            }
          },
          {
            dispatch_list_id: '7d258595-6d02-494c-9ab6-4d3d23482c2f',
            item_quantity: 1,
            item_weight: 14,
            dispatch_location_id: '05e81a71-5bae-438b-b954-952d7dfa8ba3',
            dispatch_box_id: 'c1f12d62-1e3b-4b85-b8cb-b166b4c29c6e',
            product_id: '9f201505-6a86-4ac0-b83f-f52c8a08db04',
            item_name: 'BEARING END COVER',
            item_code: 'DPHH200052GAA',
            pump_model: null,
            unit_measurement: 'no',
            hsn_code: '84139190',
            description: null,
            gst_percentage: 0,
            Po: {
              po_id: '05c31520-8a81-4abb-94a3-64984164ac8f',
              number: '1-EO2023120118',
              date: '2023-12-27',
              currency_type: 'USD'
            },
            PoList: {
              po_list_id: 'e83fad32-be5b-4541-8d65-cbc8a37de803',
              project_no: '2352056-004',
              serial_number: '27',
              quantity: 1,
              unit_price: 188,
              net_amount: 0,
              delivery_date: '2024-08-13',
              description: 'NA',
              accept_delivery_date: '2024-08-13',
              accept_description: 'OK'
            }
          },
          {
            dispatch_list_id: '91c10661-3512-42ee-b520-ef40a5e65aef',
            item_quantity: 1,
            item_weight: 14,
            dispatch_location_id: '05e81a71-5bae-438b-b954-952d7dfa8ba3',
            dispatch_box_id: 'c1f12d62-1e3b-4b85-b8cb-b166b4c29c6e',
            product_id: '9f201505-6a86-4ac0-b83f-f52c8a08db04',
            item_name: 'BEARING END COVER',
            item_code: 'DPHH200052GAA',
            pump_model: null,
            unit_measurement: 'no',
            hsn_code: '84139190',
            description: null,
            gst_percentage: 0,
            Po: {
              po_id: '05c31520-8a81-4abb-94a3-64984164ac8f',
              number: '1-EO2023120118',
              date: '2023-12-27',
              currency_type: 'USD'
            },
            PoList: {
              po_list_id: '57215044-138b-496b-aecc-3f9cf4e3dcbb',
              project_no: '2352056-003',
              serial_number: '26',
              quantity: 1,
              unit_price: 188,
              net_amount: 0,
              delivery_date: '2024-07-24',
              description: 'NA',
              accept_delivery_date: '2024-07-24',
              accept_description: 'OK'
            }
          }
        ]
      }
    ],
    DispatchNote: {
      dispatch_note_id: 'eb31e113-7dc4-4f75-bd04-0536ffa2459b',
      id: 1,
      title: 'SUPPLY MEANT FOR EXPORT ON PAYMENT OF IGST – DUTY PAID EXPORTS',
      note: '<p>I/We, in regard to my/our claim under RoDTEP scheme made in this Shipping Bill or Bill of Export, hereby declare that:</p><ol><li>1. I/ We undertake to abide by the provisions, including conditions, restrictions, exclusions and time-limits as provided under RoDTEP scheme, and relevant notifications, regulations, etc., as amended from time to time.</li><li>2. Any claim made in this shipping bill or bill of export is not with respect to any duties or taxes or levies which are exempted or remitted or credited under any other mechanism outside RoDTEP.</li><li>3. I/We undertake to preserve and make available relevant documents relating to the exported goods for the purposes of audit in the manner and for the time period prescribed in the Customs Audit Regulations, 2018.</li></ol>'
    },
    DispatchBankDetail: {
      dispatch_bank_id: '7a576e4a-67c2-495d-b718-e444cad652eb',
      beneficiary_name: 'BROTHER INDUSTRIES',
      branch_name: null,
      bank_name: 'BANK OF MAHARASTRA',
      account_no: 60262968113,
      ifsc_code: 'MAHBOOOOO3O',
      swift_code: 'MAHBINBBKOL',
      bank_ad_code: '0230067-6000009'
    },
    DispatchShippingDetail: {
      dispatch_shipping_details_id: '642dc8a0-4463-4517-aecf-b56af3f2897c',
      pre_carriage_by: 'BY CIF UPTO PORT',
      place_of_receipt: 'NHAVA SHEVA',
      port_of_discharge: 'PUSAN',
      country_of_goods: 'INDIA',
      destination: 'KOREA',
      port_of_loading: 'NHAVA SHEVA',
      final_destination: 'KOREA'
    },
    DispatchCompanyDetail: {
      dispatch_company_details_id: 'f6b2626b-c219-4cdc-8872-bd10fd04b8bb',
      iec_code: 'GZUPS0011Q ',
      gstin: '27GZUPS0011Q1ZK',
      itc_code: '84139190',
      duty_drawback_serial_no: '8413B'
    },
    DispatchShippingAndOtherDetail: {
      dispatch_shipping_and_other_details_id:
        '82443218-6f7c-4097-a54c-4227ea1ebc3f',
      end_use_code: 'GNX 200',
      packing_details: '',
      bill_type: 'GST',
      payment_term: 'BY 30 DAYS T/T',
      i_gst: 18,
      remark: '',
      vehicle_no: '',
      excise_document: '',
      freight: 'PRE-PAID',
      shipping_term: 'CIF',
      shipping_line: 'BY SEA',
      shipping_insurance: 'BROTHER INDUSTRIES',
      convert_rate: 82.85
    }
  }
  const RenderPages = () => {
    const pages = []
    let pageCount = 0

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Invoice', {
      pageSetup: {
        paperSize: 9,
        orientation: 'landscape',
        fitToPage: true,
        fitToHeight: 1,
        fitToWidth: 1
      }
    })
    worksheet.pageSetup.margins = {
      left: 0.25,
      right: 0.25,
      top: 0.25,
      bottom: 0.25,
      header: 0.3,
      footer: 0.3
    }
    worksheet.pageSetup.printArea = 'A1:J30'
    worksheet.views = [{ state: 'normal', zoomScale: 70 }]

    if (data) {
      const dispatchLocationsLength = data?.DispatchLocations?.length || 1

      for (let i = 0; i < dispatchLocationsLength; i++) {
        const { DispatchLists = [] } = data?.DispatchLocations?.[i]
        pageCount += Math.ceil(DispatchLists?.length / 8)
      }

      let pageNo = 1
      let PageStart = 1
      let LastRowNumber = 0
      for (let i = 0; i < dispatchLocationsLength; i++) {
        const { location_code = '', DispatchLists = [] } =
          data?.DispatchLocations?.[i]
        const dispatchListLength = DispatchLists?.length
        for (let i = 0; i < Math.ceil(dispatchListLength / 8); i++) {
          InvoiceTitle(worksheet, 'TAX INVOICE', PageStart)
          CompanyDetails(worksheet, PageStart)
          InvoiceNumber(worksheet, PageStart, data?.invoice_no)
          InvoiceDate(worksheet, PageStart, data?.invoice_date)
          BuyerOrderDetails(worksheet, PageStart, data)
          ConsigneeDetails(worksheet, PageStart, data)
          BuyerDetails(worksheet, PageStart, data)
          GSTandOtherDetails(worksheet, PageStart, data)
          PortDetails(worksheet, PageStart, data)
          DestinationDetails(worksheet, PageStart, data)
          BoxDetails(worksheet, PageStart, data)
          LastRowNumber = TableData(
            worksheet,
            data,
            DispatchLists?.slice(i * 8, i * 8 + 8)
          )
          WeightDetails(worksheet, LastRowNumber)
          ShippingDetails(worksheet, LastRowNumber)
          PageStart = BankDetails(worksheet, LastRowNumber)
          LastRowNumber = 0
          // pageNo += 1
        }
      }
    }
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      saveAs(blob, `Invoice-${12345}.xlsx`)
    })
  }

  return (
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
}

export default TaxInvoiceExcel
