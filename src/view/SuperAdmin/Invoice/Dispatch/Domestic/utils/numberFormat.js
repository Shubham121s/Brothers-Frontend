import { NumericFormat } from "react-number-format"

const NumberFormat = ({ value = 0, fixedDigit = 2, prefix = '', suffix = '' }) => {
    return (
        <NumericFormat
            displayType="text"
            value={(Number(value)).toFixed(fixedDigit)}
            prefix={prefix}
            suffix={suffix}
            thousandSeparator={true}
            thousandsGroupStyle='lakh'
        />
    )
}


export default NumberFormat