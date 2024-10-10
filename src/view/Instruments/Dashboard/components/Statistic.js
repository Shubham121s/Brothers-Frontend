import React from 'react'
import { Card } from '../../../../components/ui'
import { NumericFormat } from 'react-number-format'
import { MediaSkeleton, Loading } from '../../../../components/shared'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { Avatar } from '../../../../components/ui'

// const StatisticCardd = ({ data = 0, label, valuePrefix, className }) => {
//   return (
//     <Card className={`h-max ${className}`}>
//       <h4 className="font-semibold mb-2">{label}</h4>
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-bold">
//             <NumericFormat
//               displayType="text"
//               value={data}
//               thousandSeparator
//               prefix={valuePrefix}
//             />
//           </h3>
//         </div>
//       </div>
//     </Card>
//   )
// }

const StatisticCard = (props) => {
  const { icon, avatarClass, label, value, valuePrefix } = props

  const avatarSize = 55

  return (
    <Card bordered>
      <Loading
        loading={false}
        customLoader={
          <MediaSkeleton
            avatarProps={{
              className: 'rounded',
              width: avatarSize,
              height: avatarSize
            }}
          />
        }
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar
              className={avatarClass}
              size={avatarSize}
              icon={icon}
              shape="circle"
            />
            <div>
              <span>{label}</span>
              <h3>
                <NumericFormat
                  displayType="text"
                  value={value}
                  thousandSeparator
                  prefix={valuePrefix}
                />
              </h3>
            </div>
          </div>
        </div>
      </Loading>
    </Card>
  )
}

const Statistic = ({ data }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 h-max">
      <StatisticCard
        icon={<HiOutlineUserGroup />}
        avatarClass="!bg-indigo-600"
        label="Instruments"
        value={data?.totalInstrument}
        valuePrefix=""
      />
      <StatisticCard
        icon={<HiOutlineUserGroup />}
        avatarClass="!bg-blue-500"
        label="Overdue"
        value={data?.totalOverDue}
        valuePrefix=""
      />
      <StatisticCard
        icon={<HiOutlineUserGroup />}
        avatarClass="bg-pink-500"
        label="Calibrations"
        value={data?.totalCalibrations}
        valuePrefix=""
      />
      {/* <StatisticCard
        data={data.revenue}
        valuePrefix="₹"
        label="Instruments"
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
      /> */}
    </div>
  )
}

export default Statistic
