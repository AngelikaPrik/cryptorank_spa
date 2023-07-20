export const roundValue = (value: number): string => {
  const roundedValue = +value.toPrecision(5)
  if (roundedValue === 0) return '0'
  else if (Math.abs(roundedValue) < 1e-6) return roundedValue.toFixed(7)
  return roundedValue.toString()
}

export const separateNumberWithComma = (value: number): string => {
  if (value >= 1e3) {
    const rounded = Math.round(value)
    const formattedValue = new Intl.NumberFormat('en-US').format(rounded)
    return formattedValue
  } else {
    return roundValue(value)
  }
}

export const formatNumber = (value: number): string => {
  if (value >= 1e12) {
    const formattedValue = (value / 1e12).toFixed(2)
    return `${parseFloat(formattedValue).toFixed(2)}T`
  }
  if (value >= 1e9) {
    const formattedValue = (value / 1e9).toFixed(2)
    return `${parseFloat(formattedValue).toFixed(2)}B`
  }
  if (value >= 1e6) {
    const formattedValue = (value / 1e6).toFixed(2)
    return `${parseFloat(formattedValue).toFixed(2)}M`
  }
  if (value >= 1e3) {
    return separateNumberWithComma(value)
  }
  if (value <= 1e3) {
    return roundValue(value)
  }
  return value.toString()
}

export const validate = (value: string): string => {
  let sanitizedValue = value
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*)\./g, '$1')
    .replace(/^(-?\.\d+)/, '0$1')
    .replace(/^(-?\d*\.\d{0,1})\..*/g, '$1')

  if (sanitizedValue === '.') sanitizedValue = '0.'

  return sanitizedValue
}

export const getConverting = (
  from: number,
  to: number,
  amount: string
): string => {
  const convertedAmount = (+amount / from) * to
  return separateNumberWithComma(convertedAmount)
}
