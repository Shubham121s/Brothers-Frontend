import React, { useEffect, useMemo, useRef, useState } from 'react'
import { json, useLocation, useNavigate } from 'react-router-dom'
import { injectReducer } from '../../../../store/index.js'
import { useDispatch, useSelector } from 'react-redux'
import enquiryDetailReducer from './store/index.js'
import {
  PostQuotation,
  getEnquiryDetailsByEnquiryId
} from './store/dataSlice.js'
import {
  Container,
  DoubleSidedImage,
  Loading,
  StickyFooter
} from '../../../../components/shared/index.js'
import { isEmpty } from 'lodash'
import EnquiryListTable from './components/EnquiryTable.js'
import {
  Button,
  Card,
  Toast,
  Notification
} from '../../../../components/ui/index'
import PoDetails from './components/PoDetails.js'
import { useReactToPrint } from 'react-to-print'
import { AiOutlineSave } from 'react-icons/ai'
import SelectedProductTble from './components/SelectedProductTble.js'
import { emptySelectedProduct } from './store/stateSlice.js'

injectReducer('enquiry_detail', enquiryDetailReducer)

const EnquiryDstails = () => {
  const [printLoading, setPrintLoading] = useState(false)
  const componentRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const initialData = useSelector(
    (state) => state.enquiry_detail.data.EnquiryDetails
  )
  const loading = useSelector((state) => state.enquiry_detail.data.loading)

  const data = useSelector(
    (state) => state.enquiry_detail.state.selectedProduct
  )

  const data1 = useMemo(() => {
    const result = {
      circle: [],
      ring: [],
      square: [],
      profile: [],
      fabrication: []
    }

    data?.forEach((m) => {
      if (m.part_type === 'CIRCLE') {
        result.circle.push(m)
      } else if (m.part_type === 'RING') {
        result.ring.push(m)
      } else if (m.part_type === 'SQUARE') {
        result.square.push(m)
      } else if (m.part_type === 'PROFILE DRAWING') {
        result.profile.push(m)
      } else if (m.part_type === 'FABRICATION DRAWING') {
        result.fabrication.push(m)
      }
    })

    result.circle = JSON.stringify(result.circle)
    result.ring = JSON.stringify(result.ring)
    result.square = JSON.stringify(result.square)
    result.profile = JSON.stringify(result.profile)
    result.fabrication = JSON.stringify(result.fabrication)

    return result
  }, [data])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const popNotification = (keyword, type, message) => {
    Toast.push(
      <Notification
        title={keyword}
        type={type}
        duration={2500}
      >
        {message}
      </Notification>,
      {
        placement: 'top-end'
      }
    )
  }

  const onNavigate = async () => {
    const action = await dispatch(
      PostQuotation({ ...data1, enquiry_id: data[0].enquiry_id })
    )
    if (action.payload.status < 300) {
      dispatch(emptySelectedProduct([]))
      popNotification('Success', 'success', 'Quotation Added Successfully')
      navigate('/quotation')
    } else {
      popNotification('Error', 'danger', 'Quotation Not Added')
    }
  }

  const fetchData = async () => {
    const enquiry_id = location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1
    )
    if (enquiry_id) {
      await dispatch(getEnquiryDetailsByEnquiryId({ enquiry_id }))
    }
  }

  const handleDiscard = () => {
    navigate('/enquiry/List')
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `POA-${initialData?.poa}`,
    onAfterPrint: () => {
      setPrintLoading(false)
    },
    onBeforePrint: () => {
      setPrintLoading(true)
    }
  })

  // const PoLists = useMemo(() => {
  //   return initialData?.PoLists?.filter(
  //     (list) => list.list_status === "accepted"
  //   );
  // }, [initialData]);

  return (
    <>
      <Loading loading={loading}>
        {!isEmpty(initialData) && (
          <>
            <Container className="h-full">
              {/* <h3 className="text-gray-600 text-center mb-1 uppercase">
                POA {initialData?.poa}
              </h3> */}
              <PoDetails initialData={initialData} />
              <Card className="bg-slate-50 h-max mb-4">
                <h4 className="mb-4">Enquiry Item List</h4>
                <EnquiryListTable
                  type="edit"
                  data={initialData}
                  currency={initialData}
                  enquiry_id={initialData?.enquiry_id}
                  onDiscard={handleDiscard}
                />
              </Card>
              <Card className="bg-slate-50 h-max">
                <h4 className="mb-4">Quotation List</h4>
                <SelectedProductTble />
              </Card>
              {/* <div style={{ display: "none" }}>
                <div ref={componentRef}>
                  <POInvoice data={initialData} PoLists={PoLists} />
                </div>
              </div> */}
            </Container>
            {/* {PoLists.length > 0 ? (
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-end py-4"
                stickyClass="border-t bg-white border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="solid"
                    icon={<HiOutlinePrinter className="mr-1" />}
                    onClick={handlePrint}
                    loading={printLoading}
                  >
                    Print
                  </Button>
                </div>
              </StickyFooter>
            ) : null} */}
          </>
        )}
        <StickyFooter
          className="-mx-8 px-8 flex items-center justify-end py-4"
          stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <div className="md:flex items-center">
            <Button
              size="sm"
              className="mr-3"
              onClick={onNavigate}
              type="button"
            >
              Discard
            </Button>
            {initialData[0]?.Enquiry?.status === 'PENDING' && (
              <Button
                size="sm"
                variant="solid"
                icon={<AiOutlineSave className="mr-1" />}
                onClick={onNavigate}
                type="button"
              >
                Save
              </Button>
            )}
          </div>
        </StickyFooter>
      </Loading>
      {!loading && isEmpty(initialData) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No PO found!"
          />
          <h3 className="mt-8">No Enquiry found!</h3>
        </div>
      )}
    </>
  )
}

export default EnquiryDstails
