import React from 'react'

const Note = ({ data }) => {
    return (
        <div className='h-full flex flex-col print:text-xs'>
            <p className='flex break-words font-semibold text-gray-600 mb-1 print:text-xs'>{data?.title}</p>
            <div className='flex flex-col break-words print:text-xs' dangerouslySetInnerHTML={{ __html: data?.note }}></div>
            {/* <p className='flex break-words print:text-xs'>
                I/We, in regard to my/our claim under RoDTEP scheme made in this Shipping Bill or Bill of Export, hereby declare that:
            </p>
            <p className='flex break-words print:text-xs'>
                1. I/ We undertake to abide by the provisions, including conditions, restrictions, exclusions and time-limits as provided under RoDTEP scheme, and relevant notifications, regulations, etc., as amended from time to time.
            </p>
            <p className='flex break-words print:text-xs'>
                2. Any claim made in this shipping bill or bill of export is not with respect to any duties or taxes or levies which are exempted or remitted or credited under any other mechanism outside RoDTEP.
            </p>
            <p className='flex break-words print:text-xs'>
                3. I/We undertake to preserve and make available relevant documents relating to the exported goods for the purposes of audit in the manner and for the time period prescribed in the Customs Audit Regulations, 2018.”
            </p> */}
        </div>
    )
}

export default Note