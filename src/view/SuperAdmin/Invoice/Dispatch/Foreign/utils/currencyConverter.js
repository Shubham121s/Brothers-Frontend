import { ToWords } from 'to-words';

export const currencyToWords = (number)=>{
  const toWords = new ToWords({
    localeCode: 'en-US',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: 'Dollar',
        plural: 'Dollar',
        symbol: '',
        fractionalUnit: {
          name: 'Cents',
          plural: 'Cents',
          symbol: '',
        },
      },
    },
  });

  let word=toWords.convert(number);
  return word
}

export const currencyToINR = (number)=>{
  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: 'Rupee',
        plural: 'Rupees',
        symbol: '',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: '',
        },
      },
    },
  });

  let word=toWords.convert(number);
  return word
}