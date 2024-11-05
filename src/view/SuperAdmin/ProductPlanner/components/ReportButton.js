import React, { useState } from 'react'
import { Button } from '../../../../components/ui'
import axios from 'axios'
import appConfig from '../../../../configs/app.config'
import { PERSIST_STORE_NAME } from '../../../../constants/app.constant'
import deepParseJson from '../../../../utils/deepParseJson'
import { MdOutlineSimCardDownload } from 'react-icons/md'
import { useSelector } from 'react-redux'

const ReportButton = ({ DeliveryStatus }) => {
  const tableData = useSelector((state) => state.masterPP.data.tableData)
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadExcel = async () => {
    setIsDownloading(true)

    try {
      const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
      const persistData = deepParseJson(rawPersistData)

      let accessToken = persistData.auth.session.token
      const response = await axios.post(
        `${appConfig.apiPrefix}v1/web/company/reports/master/PP`,
        { ...tableData, DeliveryStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          responseType: 'blob'
        }
      )
      setIsDownloading(false)
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'masterPP.xlsx' // The name of the downloaded file
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      setIsDownloading(false)
      console.error('Error downloading the file:', error)
    }
  }

  return (
    <>
      <Button
        size="sm"
        onClick={downloadExcel}
        loading={isDownloading}
        icon={<MdOutlineSimCardDownload />}
      >
        {isDownloading ? 'Preparing To Download' : 'Excel'}
      </Button>
    </>
  )
}

export default ReportButton
