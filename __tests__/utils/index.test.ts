import { formatNumber, getConverting, roundValue, validate } from '@/utils'

describe('roundValue: ', () => {
  test('should return typeof value string', () => {
    expect(typeof roundValue(1)).toBe('string')
  })
  test('should return 0', () => {
    expect(roundValue(0)).toBe('0')
  })
  test('should return rounded values', () => {
    expect(roundValue(3.1234945344)).toBe('3.1235')
    expect(roundValue(2.0000045344)).toBe('2')
    expect(roundValue(0.0020045344)).toBe('0.0020045')
  })
  test('should return rounded value for very small numbers close to zero', () => {
    expect(roundValue(0.00000047912)).toBe('0.0000005')
    expect(roundValue(4.1912e-7)).toBe('0.0000004')
    expect(roundValue(0.000005103)).toBe('0.000005103')
  })
})

describe('formatNumber: ', () => {
  test('should return typeof value string', () => {
    expect(typeof formatNumber(1)).toBe('string')
  })
  test('should return string with T', () => {
    expect(formatNumber(1234567890123)).toBe('1.23T')
    expect(formatNumber(1204567890123)).toBe('1.20T')
    expect(formatNumber(1205567890123)).toBe('1.21T')
  })
  test('should return string with B', () => {
    expect(formatNumber(1234567890)).toBe('1.23B')
    expect(formatNumber(1204567890)).toBe('1.20B')
    expect(formatNumber(1206567890)).toBe('1.21B')
  })
  test('should return string with M', () => {
    expect(formatNumber(12345670)).toBe('12.35M')
    expect(formatNumber(12303670)).toBe('12.30M')
    expect(formatNumber(12305670)).toBe('12.31M')
  })
  test('should return string with comma separated number', () => {
    expect(formatNumber(123456)).toBe('123,456')
    expect(formatNumber(1230.0393)).toBe('1,230')
    expect(formatNumber(0.012305)).toBe('0.012305')
    expect(formatNumber(0.0123055)).toBe('0.012306')
  })
})

describe('validate: ', () => {
  test('should return typeof value string', () => {
    expect(typeof validate('1')).toBe('string')
  })
  test('should return 0 in front if the first sign is the dot', () => {
    expect(validate('.')).toBe('0.')
  })
  test('should remove other dots if the dot is already', () => {
    expect(validate('0..')).toBe('0.')
    expect(validate('12.34.')).toBe('12.34')
  })
  test('should remove all signs except numbers and dots', () => {
    expect(validate('a')).toBe('')
    expect(validate('a1.')).toBe('1.')
    expect(validate('a.')).toBe('0.')
    expect(validate('+1.-/')).toBe('1.')
  })
})

describe('getConverting: ', () => {
  test('should return typeof value string', () => {
    expect(typeof getConverting(2, 3, '10')).toBe('string')
  })
  test('should return converted value if very small numbers', () => {
    expect(getConverting(3, 0.5, '0.5')).toBe('0.083333')
  })
  test('should return converted value with comma separated number', () => {
    expect(getConverting(1, 1234, '2')).toBe('2,468')
  })
})
