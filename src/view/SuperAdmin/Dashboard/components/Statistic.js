import React from 'react'
import { Card } from '../../../../components/ui'
import { NumericFormat } from 'react-number-format'

const StatisticCard = ({ data = 0, label, valuePrefix, className }) => {
  return (
    <Card className={`h-max ${className}`}>
      <h4 className="font-semibold mb-2">{label}</h4>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">
            <NumericFormat
              displayType="text"
              value={data}
              thousandSeparator
              prefix={valuePrefix}
            />
          </h3>
        </div>
      </div>
    </Card>
  )
}

const Statistic = ({ data = {} }) => {
  return (
    <div className="grid grid-cols-2 gap-4 h-max">
      <StatisticCard
        data={data.revenue}
        valuePrefix="₹"
        label="Revenue"
        className="bg-pink-50"
      />
      <StatisticCard
        data={data.TotalOrders}
        label="Orders"
        className="bg-emerald-50"
      />
      <StatisticCard
        data={data.totalInvoice}
        valuePrefix="₹"
        label="Invoices"
        className="bg-rose-50"
      />
      <StatisticCard
        data={data.Purchases}
        valuePrefix="₹"
        label="Purchases"
        className="bg-orange-50"
      />
      <StatisticCard
        data={data.pendingPOs}
        valuePrefix="₹"
        label="Pending PO's"
        className="bg-rose-50"
      />
    </div>
  )
}

export default Statistic
