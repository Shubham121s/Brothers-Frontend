export const currencyToWords = (number) => {
  const units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const bigNumbers = [
    "",
    "thousand",
    "lakh",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
  ];

  const words = (n) => {
    if (n < 10) {
      return units[n];
    } else if (n < 20) {
      return teens[n - 10];
    } else if (n < 100) {
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + units[n % 10] : "")
      );
    } else if (n < 1000) {
      return (
        units[Math.floor(n / 100)] +
        " hundred" +
        (n % 100 !== 0 ? " and " + words(n % 100) : "")
      );
    } else {
      return "Number out of range";
    }
  };

  const convertToWords = (number) => {
    if (number === 0) {
      return "zero";
    }
    let word = "";
    let i = 0;
    while (number > 0) {
      if (number % 1000 !== 0) {
        word = words(number % 1000) + " " + bigNumbers[i] + " " + word;
      }
      number = Math.floor(number / 1000);
      i++;
    }
    return word.trim();
  };

  const integerPart = Math.floor(number);
  const fractionalPart = Math.round((number - integerPart) * 100);

  const integerWords = convertToWords(integerPart);
  const fractionalWords =
    fractionalPart > 0 ? words(fractionalPart) + " paise" : "";

  if (integerWords && fractionalWords) {
    return `${integerWords} rupees ${fractionalWords}`;
  } else if (integerWords) {
    return `${integerWords} rupees`;
  } else {
    return "";
  }
};
