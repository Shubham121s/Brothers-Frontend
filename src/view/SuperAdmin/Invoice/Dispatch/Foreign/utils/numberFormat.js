import { NumericFormat } from 'react-number-format'

const NumberFormat = ({
  value = 0,
  fixedDigit = 2,
  prefix = '',
  suffix = ''
}) => {
  return (
    <NumericFormat
      displayType="text"
      value={Number(value).toFixed(fixedDigit)}
      prefix={prefix}
      suffix={suffix}
      thousandSeparator={true}
      thousandsGroupStyle="lakh"
    />
  )
}

export default NumberFormat
export const FormatLakhStyle = (value) => {
  let [integer, decimal] = value.toString().split('.')

  // Format with lakh separator (Indian style)
  let lastThreeDigits = integer.slice(-3)
  let otherDigits = integer.slice(0, -3)

  if (otherDigits !== '') {
    lastThreeDigits = ',' + lastThreeDigits
    integer =
      otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThreeDigits
  } else {
    integer = lastThreeDigits
  }

  // Replace thousand separators for Western style (if needed)
  integer = integer.replace(/,/g, '')

  // Reapply thousand separators to the already formatted lakh style
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Combine integer and decimal part
  return decimal ? `${integer}.${decimal}` : integer
}
