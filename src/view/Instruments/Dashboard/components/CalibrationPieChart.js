import React from 'react'
import { Chart } from '../../../../components/shared'
import { COLORS } from '../../../../constants/chart.constant'

const CalibrationPieChart = ({ data }) => {
  return (
    <Chart
      options={{
        colors: COLORS,
        labels: ['Upcomming Calibration', 'Calibration OverDue', 'Up to Date'],
        responsive: [
          {
            breakpoint: 580,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }}
      series={data}
      height={200}
      type="pie"
    />
  )
}

export default CalibrationPieChart
