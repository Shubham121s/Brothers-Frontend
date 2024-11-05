import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from '../../../../../constants/chart.constant'
import { useDispatch, useSelector } from 'react-redux'
import { getYarlySales } from '../store/dataSlice'
import { Select } from '../../../../../components/ui'

const CustomerYearWiseSalesChart = () => {
  const [customer, setCustomer] = useState(null)
  const [customerName, setCustomerName] = useState(null)
  const dispatch = useDispatch()

  const yearlySales = useSelector(
    (state) => state.customer_dashboard.data.yearlySales
  )
  const CustomerOption = useSelector(
    (state) => state.customer_dashboard.data.customers
  )
  const data = [
    {
      name: 'Net Profit ₹ ',
      data: yearlySales.revenue || []
    }
  ]

  useEffect(() => {
    fetchData()
  }, [customer])

  const fetchData = async () => {
    dispatch(getYarlySales({ customer_id: customer }))
  }

  const handleChange = (e) => {
    setCustomer(e.value)
    setCustomerName(e.label)
  }

  return (
    <>
      <div className="grid grid-cols-3 mb-4">
        <Select
          placeholder="Select customer"
          size="sm"
          options={CustomerOption}
          value={CustomerOption.filter((cust) => cust.value === customer)}
          onChange={handleChange}
        />
        <div></div>
      </div>
      <Chart
        options={{
          dataLabels: {
            offsetY: -25,
            style: {
              fontSize: '12px'
            }
          },
          chart: {
            stacked: true,
            toolbar: {
              show: true,
              tools: {
                download: false,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
              }
            },
            zoom: {
              enabled: true
            }
          },
          colors: ['#DA70D6'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: 'round',
              borderRadius: 8
            }
          },
          xaxis: {
            categories: yearlySales.years || []
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          },
          title: {
            text: `${
              customer ? `${customerName}` : 'All Customers'
            } Yearly Sales`,
            align: 'center',
            style: {
              fontSize: '20px',
              fontWeight: 'normal',
              color: '#263238'
            }
          }
        }}
        series={data}
        type="bar"
        height={300}
      />
    </>
  )
}

export default CustomerYearWiseSalesChart
