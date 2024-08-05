import React, { useEffect } from 'react'
import { Card, Avatar } from '../../../../../components/ui'
import { MediaSkeleton, Loading } from '../../../../../components/shared'
import {
    HiUserGroup, HiUsers,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { getCustomerStatistic } from '../store/dataSlice'
import { AiOutlineUserSwitch } from 'react-icons/ai'

const StatisticCard = (props) => {
    const { icon, avatarClass, label, value, loading, cardClass } = props

    const avatarSize = 55

    return (
        <Card bordered className={cardClass}>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
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
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                <NumericFormat
                                    displayType="text"
                                    value={value}
                                    thousandSeparator
                                />
                            </h3>
                        </div>
                    </div>
                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = () => {
    const dispatch = useDispatch()

    const statisticData = useSelector(
        (state) => state.customer.data.statisticData
    )
    const loading = useSelector(
        (state) => state.customer.data.statisticLoading
    )

    useEffect(() => {
        dispatch(getCustomerStatistic())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <StatisticCard
                icon={<HiUserGroup />}
                avatarClass="bg-gray-500"
                cardClass="bg-gray-50"
                label="Total"
                value={statisticData?.total || 0}
                loading={loading}
            />
            <StatisticCard
                icon={<HiUsers />}
                avatarClass="bg-red-500"
                cardClass="bg-red-50"
                label="Total Customers"
                value={statisticData?.customers || 0}
                loading={loading}
            />
            <StatisticCard
                icon={<HiUsers />}
                avatarClass="bg-emerald-500"
                cardClass="bg-emerald-50"
                label="Total Suppliers"
                value={statisticData?.suppliers || 0}
                loading={loading}
            />
            <StatisticCard
                icon={<AiOutlineUserSwitch />}
                cardClass="bg-yellow-50"
                avatarClass="bg-yellow-500"
                label="Total Customer/Supplier"
                value={statisticData?.both || 0}
                loading={loading}
            />
        </div>
    )
}

export default CustomerStatistic
