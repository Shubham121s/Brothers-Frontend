import React, { memo } from 'react'
import PaymentTermInformationFields from './PaymentTermInformationFields'
import EndUseCodeInformationField from './EndUseCodeInformationField'
import ExciseDocumentInformationFields from './ExciseDocumentInformationFields'
import CurrencyInformationField from './CurrencyInformationField'
import FreightInformationFields from './FreightInformationFields'

const CurrencyAndOtherInformationFields = (props) => {
    const { touched, errors, values } = props
    return (
        <div>
            <PaymentTermInformationFields
                errors={errors?.payment_term}
                touched={touched?.payment_term}
                values={values?.payment_term}
            />
            <FreightInformationFields
                errors={errors?.freight}
                touched={touched?.freight}
                values={values?.freight}
            />
            <div className='grid grid-cols-2 gap-2'>
                <EndUseCodeInformationField
                    errors={errors?.end_use_code}
                    touched={touched?.end_use_code}
                    values={values?.end_use_code}
                />
                <CurrencyInformationField
                    errors={errors?.convert_rate}
                    touched={touched?.convert_rate}
                    values={values?.convert_rate}
                />
            </div>
        </div>
    )
}

export default memo(CurrencyAndOtherInformationFields)
